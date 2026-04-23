import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, timestamp, country, operator, product, amount, total } = body;

    if (!country || !operator || !product || !amount) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    // 🔥 Replace with your real backend URL
    const backendUrl = "https://your-backend.com/topup";

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    return NextResponse.json({
      status: "success",
      backendResponse: data,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Topup failed", details: String(err) },
      { status: 500 }
    );
  }
}
