import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { initAuth } from "@/lib/auth";
import { getCollections } from "@/lib/connect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Please enter valid inputs" });

  const { users } = await getCollections();

  const user = await users.findOne({ email });

  if (
    !user ||
    !(await bcrypt.compare(password, user.hashed_password as string))
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const lucia = await initAuth();
  const session = await lucia.createSession(user._id.toString(), {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  res.setHeader("Set-Cookie", sessionCookie.serialize());
  return res.status(200).end();
}
