import express from "express";
import { updateNote, deleteNote, getNotes, createNote } from "../routes/notesRoutes.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const noteRoutes = express.Router();

noteRoutes.get('/', verifyToken, getNotes);
noteRoutes.post('/', verifyToken, createNote);
noteRoutes.delete('/:id', verifyToken, deleteNote);
noteRoutes.put('/:id', verifyToken, updateNote);

export default noteRoutes;
