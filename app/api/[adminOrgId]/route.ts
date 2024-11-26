import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  const admins = await client.orgadmin.findMany();
  return NextResponse.json({ admins });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await client.orgadmin.create({
    data: {
      id: body.id,
      name: body.name,
      email: body.email,
      password: body.password,
      orgId: body.orgId,
      adminAvatarImg: body.adminAvatarImg,
    },
  });
  return NextResponse.json({
    id: body.id,
    name: body.name,
    email: body.email,
    password: body.password,
    orgId: body.orgId,
    adminAvatarImg: body.adminAvatarImg,
  });
}
