import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getCollections } from "@/lib/connect";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { ref, email } = await req.json();
    const { users, transactions } = await getCollections();

    console.log("entered", ref, email);

    const user = await users.findOne({ email });
    const transaction = await transactions.findOne(
      { reference: ref, email },
      { sort: { createdAt: -1 } }
    );

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // if (transaction)
    //   return NextResponse.json({ error: "Already verified" }, { status: 400 });

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` },
      }
    );

    const data = response.data.data;

    const id = new ObjectId().toString();

    const obj = {
      email,
      amount: data.amount,
      _id: id,
      reference: ref,
      status: data.status,
      paidAt: data.paidAt,
      createdAt: data.createdAt,
    };
    await transactions.insertOne(obj);

    return NextResponse.json(obj);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
