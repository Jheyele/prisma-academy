import { Router } from "express";
import { authRoute } from "./auth.routes";
import { classRoutes } from "./class.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/api/v1/classes", classRoutes);
routes.use("/api/v1/users", userRoutes);
routes.use("/api/v1/login", authRoute)

export { routes };
