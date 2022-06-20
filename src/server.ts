import express from "express";
import { routes } from "./routes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log("Server is running"));
