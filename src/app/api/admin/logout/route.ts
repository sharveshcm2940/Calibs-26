import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ message: "Admin logged out successfully." });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
