import { Router } from "express";
import { UserController } from "../controllers/UserController";
import ensureAdmin from "../middlewares/ensureAdmin";


const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.findAllUsers);
userRoutes.get("/:id", userController.findOneUser);
userRoutes.delete("/:id", ensureAdmin, userController.deleteUser);
userRoutes.put("/:id", userController.updateUser);
userRoutes.post("/link-user-to-class", userController.linkUserToClassController);

export { userRoutes };