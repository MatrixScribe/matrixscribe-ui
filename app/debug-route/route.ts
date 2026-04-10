import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const appDir = path.join(process.cwd(), "app");
    const tree = await readTree(appDir, "app");
    return NextResponse.json(tree);
  } catch (e) {
    return NextResponse.json({ error: String(e) });
  }
}

async function readTree(dir: string, prefix: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const result: any = {};

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const key = `${prefix}/${entry.name}`;

    if (entry.isDirectory()) {
      result[key] = await readTree(full, key);
    } else {
      result[key] = "file";
    }
  }

  return result;
}
