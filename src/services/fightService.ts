import axios from "axios";
import FightRepository from "../repositories/fightRepository";
import HttpError from "../utils/exceptions";

const battleService = async (user1: string, user2: string) => {
    if (user1 === user2)
        throw new HttpError(
            401,
            "O nome de usuário não pode ser o mesmo",
            undefined
        );
    for (const user of [user1, user2]) {
        const fighter = await FightRepository.getFighter(user);
        if (!fighter.rowCount) {
            await FightRepository.insertFighter(user);
        }
    }
    const [dataUser1, dataUser2] = await Promise.all([
        axios.get(`https://api.github.com/users/${user1}/repos`),
        axios.get(`https://api.github.com/users/${user2}/repos`),
    ]);
    const { data: reposUser1 } = dataUser1;
    const { data: reposUser2 } = dataUser2;

    const users = [
        { user: user1, starCount: countStars(reposUser1) },
        { user: user2, starCount: countStars(reposUser2) },
    ];
    if (users[0].starCount === users[1].starCount) {
        await FightRepository.updateDrawsFighter(users[0].user, users[1].user);
        return { user: null };
    }
    const [winner, loser] =
        users[0].starCount > users[1].starCount ? users : [users[1], users[0]];

    console.log(winner);
    await Promise.all([
        FightRepository.updateFighter(winner.user, "wins"),
        FightRepository.updateFighter(loser.user, "losses"),
    ]);
    return winner;
};

const getRankingService = async () => {
    const rankingResult = await FightRepository.getRanking();
    return rankingResult.rows;
};

const countStars = (repos: any[]) => {
    let count = 0;
    repos.forEach((repo) => {
        count += repo.stargazers_count;
    });
    return count;
};

export { battleService, getRankingService };
