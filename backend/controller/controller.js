import express from "express";
import { POST, GET, DELETE, PUT } from "../routes/routes.js";

const routes = express.Router();

routes.get('/', GET);
routes.post('/', POST);
routes.put('/:id', PUT);
routes.delete('/:id', DELETE);

export default routes;