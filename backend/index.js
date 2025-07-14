import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

mongoose.connect(URL)
    .then(() => console.log(`Connected to DB!`))
    .catch((err) => console.log(err));

app.use(express.json());
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Backend!</h1>')
})

app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT}`);
})