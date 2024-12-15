import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  const candidates = await client.candidates.findMany();
  return NextResponse.json({ candidates });
}
