import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  const orgs = await client.organisations.findMany();
  return NextResponse.json({ orgs });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await client.organisations.create({
    data: {
      id: body.id,
      name: body.name,
      email: body.email,
      password: body.password,
      adminNo: body.adminNo,
      avatar: body.avatar,
    },
  });
  return NextResponse.json({
    id: body.id,
    name: body.name,
    email: body.email,
    password: body.password,
    adminNo: body.adminNo,
    avatar: body.avatar,
  });
}
