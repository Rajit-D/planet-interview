"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getPayloadInfo() {
  const cookieStore = await cookies();
  const payloadCookie = cookieStore.get("activeuser");

  if (!payloadCookie) {
    throw new Error("No active user cookie found");
  }

  const payloadInfo = jwtDecode(payloadCookie.value);
  return payloadInfo;
}