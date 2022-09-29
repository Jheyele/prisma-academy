import { Router } from "express";
import  ClassController  from "../controller/ClassController";

const classRoutes = Router();

const classController = new ClassController();


classRoutes.post("/", classController.CreateClass);

classRoutes.get("/", classController.FindAllClass);

classRoutes.delete("/:id", classController.DeleteClass);

export { classRoutes };