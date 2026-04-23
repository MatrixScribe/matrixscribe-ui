import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { amount } = body;

  const secret = process.env.PAYSTACK_SECRET_KEY!;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount * 100, // Paystack uses kobo
      email: "wallet@matrixscribe.com",
      callback_url: `${baseUrl}/wallet/success`,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data.data);
}
