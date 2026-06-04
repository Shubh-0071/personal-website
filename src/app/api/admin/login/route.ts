import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (password !== EXPECTED_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Access Denied: Invalid Credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signToken({ username: "admin" });

    // Create the response and set HTTP-only cookie
    const response = NextResponse.json({ success: true, message: "Authentication successful" });
    
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
