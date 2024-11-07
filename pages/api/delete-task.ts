import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Please add your PostgreSQL URI to .env.local");
}

let cachedClient: Client | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new Client({
    connectionString,
  });

  await client.connect();
  cachedClient = client;
  return client;
}

export default async function deleteTask(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;

  try {
    const client = await connectToDatabase();
    const result = await client.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
