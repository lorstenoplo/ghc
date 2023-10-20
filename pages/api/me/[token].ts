import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from "@/utils/server/connectToDb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.query;
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URL||"");
    const decodedUser = jwt.decode(token as string);
    const uid = (decodedUser as any)?.id;
    console.log(uid);
    const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(uid as string) });
    console.log(user);
    if (!user) {
        res.status(500).json({
            user: null,
        });
    } else res.json({ user });
}