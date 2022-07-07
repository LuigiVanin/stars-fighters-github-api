import { Request, Response } from "express";
import { battleService, getRankingService } from "../services/fightService";

const createBattle = async (req: Request, res: Response) => {
    const { firstUser, secondUser } = req.body;
    const status = await battleService(
        firstUser.toLowerCase(),
        secondUser.toLowerCase()
    );
    return res.status(201).send(status);
};

const getRanking = async (_: Request, res: Response) => {
    const users = await getRankingService();
    return res.status(200).send({ fighters: users });
};

export { createBattle, getRanking };
