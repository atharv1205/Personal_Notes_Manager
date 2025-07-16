import express from "express";
import { POST, GET, DELETE, PUT, loginUser, logoutUser } from "../routes/routes.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get('/', verifyToken, GET);
routes.post('/', POST);
routes.put('/:id', verifyToken, PUT);
routes.delete('/:id', verifyToken, DELETE);
routes.post('/login', loginUser);
routes.post('/logout', logoutUser);

export default routes;