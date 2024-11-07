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

export default async function addTask(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id, task, status, date } = req.body;

  if (
    typeof task !== "string" ||
    typeof status !== "boolean" ||
    typeof date !== "string"
  ) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  try {
    const client = await connectToDatabase();
    const result = await client.query(
      "INSERT INTO todo (id, task, status, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, task, status, date],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
}
