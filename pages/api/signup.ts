import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.POSTGRES_URL;
const client = new Client({
  connectionString,
});

client.connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const userCheck = await client.query(
        "SELECT * FROM todo_users WHERE email = $1",
        [email],
      );
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      await client.query(
        "INSERT INTO todo_users (email, password_hash) VALUES ($1, $2)",
        [email, passwordHash],
      );

      res.status(200).json({ message: "Sign-up successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
