import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.POSTGRES_URL;
const pool = new Pool({ connectionString });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { task } = req.body;

    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE todo SET task = $1 WHERE id = $2 RETURNING *",
        [task, id],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
