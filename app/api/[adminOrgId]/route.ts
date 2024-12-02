import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  const admins = await client.admins.findMany();
  return NextResponse.json({ admins });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await client.admins.create({
    data: {
      id: body.id,
      name: body.name,
      email: body.email,
      password: body.password,
      organisation: body.organisation,
      avatar: body.avatar,
      position: body.position,
    },
  });
  return NextResponse.json({
    id: body.id,
    name: body.name,
    email: body.email,
    password: body.password,
    organisation: body.organisation,
    avatar: body.avatar,
    position: body.position,
  });
}
