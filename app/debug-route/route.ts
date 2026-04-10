import { NextResponse } from "next/server";
import { getTree } from "next/dist/server/lib/router-utils/tree";

export async function GET() {
  try {
    // @ts-ignore
    const tree = getTree();
    return NextResponse.json(tree);
  } catch (e) {
    return NextResponse.json({ error: String(e) });
  }
}
