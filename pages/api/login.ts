import type { NextApiRequest, NextApiResponse } from 'next'
import { LoginInput } from "@/types/login-input";
import connectToDatabase from "@/utils/server/connectToDb";
import generateToken from "@/utils/server/generateToken";
import bcrypt from "bcryptjs";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { username, password }: LoginInput = JSON.parse(req.body);
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URL || "");
    const user = await db
        .collection("users")
        .findOne({ username: username });

    if (!user) {
        res.status(500).json({
            errors: [
                {
                    field: "username",
                    message: "A user with that username does not exist",
                },
            ],
        });
    } else {
        const valid = await bcrypt.compare(password, (user as any).password);

        if (!valid) {
            res.status(500).json({
                errors: [
                    {
                        field: "password",
                        message: "Incorrect password",
                    },
                ],
            });
            console.log("incorrect creds");
        } else {
            const token = generateToken(user);
            res.send({ user, token });
        }
    }
}