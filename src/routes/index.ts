import { Router } from "express";
import { authRoute } from "./auth.routes";
import { classRoutes } from "./class.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/classes", classRoutes);
routes.use("/users", userRoutes);
routes.use("/authenticate", authRoute)

export { routes };
