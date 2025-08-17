import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { initAuth } from "@/lib/auth";
import { getCollections } from "@/lib/connect";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter valid inputs" });
  }

  const { users } = await getCollections();

  // Check if shortcode already exists
  const existing = await users.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "This emaiil already exists" });
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const userId = new ObjectId().toString();

  await users.insertOne({ _id: userId, email, hashed_password });

  const lucia = await initAuth();
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  res.setHeader("Set-Cookie", sessionCookie.serialize());
  return res.status(200).end();
}
