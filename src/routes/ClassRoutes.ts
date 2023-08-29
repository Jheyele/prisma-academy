import { Router } from "express";
import  ClassController  from "../controllers/ClassController";

const classRoutes = Router();

const classController = new ClassController();

classRoutes.post("/", classController.createClass);
classRoutes.get("/", classController.findAllClass);
classRoutes.delete("/:id", classController.deleteClass);

export { classRoutes };