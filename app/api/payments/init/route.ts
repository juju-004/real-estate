import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getCollections } from "@/lib/connect";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount } = body; // ✅ get userId from token/session in real app

    if (!email || !amount) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack uses kobo
        callback_url: `https://rent-itt.vercel.app/verify`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      authorization_url: response.data.data.authorization_url,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
