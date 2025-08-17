import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/connect";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params;
    const { users, transactions } = await getCollections();

    // check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // get all transactions for this user, newest first
    const history = await transactions
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(history);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
