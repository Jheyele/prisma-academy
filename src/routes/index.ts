import { Router } from "express";
import { authRoute } from "./AuthRoutes";
import { classRoutes } from "./ClassRoutes";
import { userRoutes } from "./UserRoutes";

const routes = Router();

routes.use("/api/v1/classes", classRoutes);
routes.use("/api/v1/users", userRoutes);
routes.use("/api/v1/login", authRoute)

export { routes };
