"use server";

import { PrismaClient } from "@prisma/client";
import { getPayloadInfo } from "@/app/_lib/cookies";
import { v4 as uuidv4 } from "uuid";

const client = new PrismaClient();

export async function roleInput(prevState: any, formData: any) {
  const payloadInfo: any = await getPayloadInfo();

  const name = formData.get("name") as string;
  const skills = formData.get("skills") as string;
  const experience = parseInt(formData.get("experience")) as number;
  const minATS = parseInt(formData.get("minATS")) as number;
  const createdBy = payloadInfo.userId.adminId;

  if (
    typeof name !== "string" ||
    typeof skills !== "string" ||
    typeof experience !== "number" ||
    typeof minATS !== "number"
  ) {
    return { message: "Invalid form submission." };
  }

  const role = await client.roles.create({
    data: {
      id: uuidv4(),
      name,
      skills,
      experience,
      minATS,
      createdBy,
    },
  });
}