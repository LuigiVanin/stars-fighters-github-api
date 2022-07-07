import db from "../database";

class FightRepository {
    static insertFighter = async (username: string) => {
        await db.query(
            `
        insert into fighters (username, wins, losses, draws)
        values ($1, 0, 0, 0)
        `,
            [username]
        );
    };

    static getFighter = async (username: string) => {
        const fighter = await db.query(
            `
        select * from fighters
        where username = $1
        `,
            [username]
        );
        return fighter;
    };

    static updateDrawsFighter = async (
        username1: string,
        username2: string
    ) => {
        await db.query(
            `
                update fighters
                set draws = draws + 1
                where username = $1 or username = $2
            `,
            [username1, username2]
        );
        return;
    };

    static updateFighter = async (
        username: string,
        status: "wins" | "losses"
    ) => {
        await db.query(
            `
        update fighters
        set ${status} = ${status} + 1
        where username = $1
        `,
            [username]
        );
    };

    static getRanking = async () => {
        const ranking = await db.query(`
        select * from fighters
        order by wins desc
        `);
        return ranking;
    };
}

export default FightRepository;
