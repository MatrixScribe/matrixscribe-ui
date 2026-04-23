import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  const secret = process.env.PAYSTACK_SECRET_KEY!;

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    }
  );

  const data = await response.json();

  if (data.status && data.data.status === "success") {
    return NextResponse.json({
      status: "success",
      amount: data.data.amount,
    });
  }

  return NextResponse.json({ status: "failed" });
}
