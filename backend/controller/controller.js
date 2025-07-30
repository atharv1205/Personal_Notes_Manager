import express from "express";
import { POST, GET, DELETE, PUT, loginUser, logoutUser, getUserById } from "../routes/routes.js";
import upload from "../upload.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get('/', verifyToken, GET);
routes.post('/', upload.single('image') ,POST);
routes.put('/:id', verifyToken, PUT);
routes.delete('/:id', verifyToken, DELETE);
routes.post('/login', loginUser);
routes.post('/logout', logoutUser);
routes.get('/me', verifyToken, getUserById);

export default routes;