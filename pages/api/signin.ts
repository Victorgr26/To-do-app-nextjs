import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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
      // Check if the user exists
      const result = await client.query(
        "SELECT * FROM todo_users WHERE email = $1",
        [email],
      );
      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result.rows[0];

      // Compare the password with the stored hash
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash,
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        },
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error during sign-in:", error); // Log the error
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
