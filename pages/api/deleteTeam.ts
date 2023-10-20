// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import "dotenv/config";
import connectToDatabase from "@/utils/server/connectToDb"

export default async function deleteTeam(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { teamId } = JSON.parse(req.body);

    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URL || "");
    const deletedTeam = await db.collection("teams").deleteOne({_id:teamId});

    if (!deletedTeam) {
        res.status(500).json({
            deletedTeam: null,
        });
        return;
    }

    res.json({ deletedTeam: true });

  
}
