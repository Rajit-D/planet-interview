"use server";

import { getPayloadInfo } from "@/app/_lib/cookies";
import { useRoleStore } from "@/app/_lib/roleStore";
import { v4 as uuidv4 } from "uuid";

export async function roleInput(prevState: any, formData: any) {
  const payloadInfo: any = await getPayloadInfo();
  const addRole=useRoleStore((state)=>state.addRole)

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

  const roleData = {
    id: uuidv4(),
    name,
    skills,
    experience,
    minATS,
    createdBy,
  };

  return roleData;
}
