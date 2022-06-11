import { Router } from "express";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/user/useCases/deleteUser/DeleteUserController";
import { FindAllUsersController } from "../modules/user/useCases/findAllUsers/FindAllUserController";
import { FindOneUserController } from "../modules/user/useCases/findOneUser/FindOneUserController";
import { UpdateUserController } from "../modules/user/useCases/updateUser/UpdateUserController";

const userRoutes = Router();

const createUser = new CreateUserController();
const findAllUser = new FindAllUsersController();
const findOneUser = new FindOneUserController();
const deleteUser = new DeleteUserController();
const updateUser = new UpdateUserController();

// create user
userRoutes.post("/", createUser.handle);

// get all users
userRoutes.get("/", ensureAuthenticated, findAllUser.handle);

// get user
userRoutes.get("/:id", ensureAuthenticated, findOneUser.handle);

// delete user
userRoutes.delete("/:id", ensureAuthenticated, ensureAdmin, deleteUser.handle);

// update user
userRoutes.put("/:id", ensureAuthenticated, ensureAdmin, updateUser.handle);



export { userRoutes };