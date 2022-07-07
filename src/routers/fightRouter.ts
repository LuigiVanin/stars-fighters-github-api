import { Router } from "express";
import { createBattle, getRanking } from "../controllers/fightController";

const fightRouter = Router();

fightRouter.post("/battle", createBattle);
fightRouter.get("/ranking", getRanking);

export default fightRouter;
