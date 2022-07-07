import express from "express";
import cors from "cors";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import fightRouter from "./routers/fightRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fightRouter);
app.use(errorHandler);

export default app;
