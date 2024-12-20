"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies(); 
    const sessionToken = cookieStore.get("activeuser");

    if (!sessionToken) {
      return NextResponse.json(
        { message: "No active session" },
        { status: 401 }
      );
    }
    const isValid = jwtDecode(sessionToken.value);

    if (!isValid) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    return NextResponse.json({ message: "Session is valid" }, { status: 200 });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
