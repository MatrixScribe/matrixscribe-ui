import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET!;
  const body = await req.text();

  const hash = crypto
    .createHmac("sha512", secret)
    .update(body)
    .digest("hex");

  const signature = req.headers.get("x-paystack-signature");

  if (hash !== signature) {
    return NextResponse.json({ status: "invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    // TODO: Save to DB, update wallet, etc.
  }

  return NextResponse.json({ status: "ok" });
}
