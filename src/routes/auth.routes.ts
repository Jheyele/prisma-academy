import { Router } from "express";
import { AuthController } from "../modules/auth/AuthController";

const authRoute = Router();
const auth = new AuthController();

authRoute.use("/", auth.authenticate);

export { authRoute }


