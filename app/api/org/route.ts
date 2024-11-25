import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  const orgs = await client.organisation.findMany();
  return NextResponse.json({orgs});
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await client.organisation.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      adminNos: body.adminNos,
      orgAvatarImg: body.orgAvatarImg,
    },
  });
  return NextResponse.json({
    name: body.name,
    email: body.email,
    password: body.password,
    adminNos: body.adminNos,
    orgAvatarImg: body.orgAvatarImg,
  });
}
