import { NextResponse } from "next/server";
import { deleteSession } from "@/app/_lib/session";
import { redirect } from "next/navigation";

export async function GET() {
  await deleteSession();
  return NextResponse.json({ success: true });
}