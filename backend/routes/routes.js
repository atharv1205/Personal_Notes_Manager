import User from "../model/schema.js";

export const POST = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json(newUser);
    } catch(err){
        console.log(err);
        return res.status(500).json({error : err});
    }
}

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