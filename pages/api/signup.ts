// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RegisterInput, User } from "@/types/rgister-input"
import bcrypt from "bcryptjs";
import "dotenv/config";
import { InsertOneResult } from "mongodb";
import connectToDatabase from "@/utils/server/connectToDb"
import generateToken from "@/utils/server/generateToken"

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password }: RegisterInput = JSON.parse(req.body);
  console.log(username)

  if (username.length <= 2) {
    res.json({
      errors: [
        {
          field: "username",
          message: "Username should be atleast 3 charecters long",
        },
      ],
    });
    return;
  }

  if (password.length <= 5) {
    res.json({
      errors: [
        {
          field: "password",
          message: "Password should be atleast 6 charecters long",
        },
      ],
    });
    return;
  }

  const db = await connectToDatabase(process.env.MONGO_CONNECTION_URL || "")
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createdAt = Date.now().toString();
  const user: User = {
    username,
    password: hashedPassword,
    createdAt,
  };
  let savedUser: InsertOneResult<any>;
  try {
    savedUser = await db.collection("users").insertOne(user);
  } catch (error) {
    res.status(500).json({
      error,
    });
    return;
  }
  const token = generateToken(user);

  res.status(200).send({
    user,
    token,
  });
}
