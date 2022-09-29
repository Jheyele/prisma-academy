import { Router } from "express";
import { UserController } from "../controller/UserController";

import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";


const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.CreateUser);

userRoutes.get("/", userController.FindAllUsers);

userRoutes.get("/:id", userController.findOneUser);

userRoutes.delete("/:id", ensureAuthenticated, ensureAdmin, userController.DeleteUser);

userRoutes.put("/:id", userController.UpdateUser);

userRoutes.post("/link-user-to-class", userController.LinkUserToClassController);


export { userRoutes };