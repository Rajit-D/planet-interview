"use server";

import { adminLoginInSchema } from "../_lib/definitions";
import { PrismaClient } from "@prisma/client";
import { createSession } from "../_lib/session";

const client = new PrismaClient();

export async function adminLogin(prevState: any, formData: any) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (typeof email !== "string" || typeof password !== "string") {
    return { message: "Invalid form submission." };
  }

  const validationResult = adminLoginInSchema.safeParse({ email, password });

  const errorMessage = { message: "Invalid login credentials." };
  if (!validationResult.success)
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };

  const admin = await client.admins.findUnique({
    where: {
      email,
      password,
    },
  });
  const org = await client.organisations.findUnique({
    where: {
      id: admin?.organisation,
    },
  });
  const roles = await client.roles.findMany({
    where: {
      createdBy: admin?.id,
    },
  });
  if (!admin) {
    return errorMessage;
  }

  const payloadData = {
    adminId: admin.id,
    adminName: admin.name,
    adminEmail: admin.email,
    adminAvatar: admin.avatar,
    adminPosition: admin.position,
    rolesByAdmin: roles,
    orgId: admin.organisation,
    orgName: org?.name,
    orgEmail: org?.email,
    orgAvatar: org?.avatar,
  };

  await createSession(payloadData);
}
