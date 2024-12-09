"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getPayloadInfo() {
  const cookieStore = await cookies();
  const payloadCookie = cookieStore.get("activeuser");

  if (!payloadCookie) {
    redirect("/adminauth");
  }

  const payloadInfo = jwtDecode(payloadCookie.value);
  return payloadInfo;
}

export async function getBackendCookie() {
  const cookieStore = await cookies();
  const backendCookie = cookieStore.get("kunalsession");

  if (!backendCookie) {
    throw new Error("No active user cookie found");
  }

  return backendCookie.value;
}
