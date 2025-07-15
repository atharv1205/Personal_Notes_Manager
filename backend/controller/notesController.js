import express, { Router } from "express";
import { updateNote, deleteNote, getNotes, createNote } from "../routes/notesRoutes.js";

const noteRoutes = express.Router();

noteRoutes.get('/', getNotes);
noteRoutes.post('/', createNote);
noteRoutes.delete('/:id', deleteNote);
noteRoutes.put('/:id', updateNote);

export default noteRoutes;
