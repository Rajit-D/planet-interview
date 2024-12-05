import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getPayloadInfo } from "@/app/_lib/cookies";

const client = new PrismaClient();

export async function GET() {
  const roles = await client.roles.findMany();
  return NextResponse.json({ roles });
}

export async function POST(req: NextRequest) {
  const payloadInfo: any = await getPayloadInfo();
  const body = await req.json();
  await client.roles.create({
    data: {
      id: body.id,
      name: body.name,
      skills: body.skills,
      experience: body.experience,
      minATS: body.minATS,
      createdBy: payloadInfo.userId.adminId,
    },
  });
  return NextResponse.json({
    id: body.id,
    name: body.name,
    skills: body.skills,
    experience: body.experience,
    minATS: body.minATS,
    createdBy: payloadInfo.userId.adminId,
  });
}
