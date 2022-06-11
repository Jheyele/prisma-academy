import { Router } from "express";
import { CreateClassController } from "../modules/class/useCases/createClass/CreateClassController";
import { DeleteClassController } from "../modules/class/useCases/deleteClass/DeleteClassController";
import { FindAllClassController } from "../modules/class/useCases/findAllClass/FindAllClassController";

const classRoutes = Router();

const createClass = new CreateClassController();
const findAllClass = new FindAllClassController();
const deleteClass = new DeleteClassController();

// create class
classRoutes.post("/", createClass.handle);

// get all classes
classRoutes.get("/", findAllClass.handle);

// delete class
classRoutes.delete("/:id", deleteClass.handle);

export { classRoutes };