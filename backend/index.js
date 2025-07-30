import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./controller/controller.js";
import noteRoutes from "./controller/notesController.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { urlencoded } from "express";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

mongoose.connect(URL)
    .then(() => console.log(`Connected to DB!`))
    .catch((err) => console.log(err));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded());
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Backend!</h1>')
})
app.use('/api/users', routes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT}`);
})