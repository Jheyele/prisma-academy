import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const authRoute = Router();
const auth = new AuthController();

authRoute.use("/", auth.authenticate);

export { authRoute }


