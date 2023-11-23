import express, { Application } from "express";
const app: Application = express();
import cors from "cors";

//parser
app.use(cors());
app.use(express.json());

export default app;
