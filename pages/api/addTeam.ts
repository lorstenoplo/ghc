// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import "dotenv/config";
import { InsertOneResult } from "mongodb";
import connectToDatabase from "@/utils/server/connectToDb"

export default async function register(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { teamName,mem1,mem2,mem3,mem4 } = JSON.parse(req.body);

    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URL || "")

    const team = {
        teamName,mem1,mem2,mem3,mem4
    };

    let savedTeam: InsertOneResult<any>;
    let teamId;

    try {
        savedTeam = await db.collection("teams").insertOne(team);
        teamId = savedTeam.insertedId.toString()
    } catch (error) {
        res.status(500).json({
            error,
        });
        return;
    }

    res.status(200).send({
       team,
       teamId
    });
}
