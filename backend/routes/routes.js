import User from "../model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/authMiddleware.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({ error: "User not found!" });
        return res.json(user);
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Something went Wrong!' });
    }
};

export const POST = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, profilePicture: req.file ? `/uploads/${req.file.filename}` : null, });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};


export const GET = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch(err){
        console.log(err);
        return res.status(500).json({error : err});
    }
}

export const PUT = async (req, res) => {
    try {
        const { id } = req.params;
        const userExisits = await User.findById(id);
        if(userExisits){
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {new : true});
            return res.status(201).json(updatedUser);
        }
        return res.status(404).json({error : "User not found!"});
    } catch(err){
        console.log(err);
        return res.status(500).json({error : err});
    }
}

export const DELETE = async (req, res) => {
    try {
        const { id } = req.params;
        const userExisits = await User.findById(id);
        if(userExisits){
            await User.findByIdAndDelete(id);
            return res.status(201).json({ message: "Succesfully Deleted the User!" });
        }
        return res.status(404).json({error : "User Not FOund"});
    } catch(err){
        console.log(err);
        return res.status(500).json({error : err});
    }
}

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
