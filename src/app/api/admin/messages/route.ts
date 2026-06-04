import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import { verifyToken } from "@/lib/jwt";
import fs from "fs";
import path from "path";

// Helper to authenticate admin request
async function authenticateAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  const decoded = verifyToken(token);
  return decoded !== null;
}

export async function GET() {
  try {
    const isAuthenticated = await authenticateAdmin();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    let messages = [];
    try {
      await dbConnect();
      messages = await Message.find({}).sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn("MongoDB connection failed, retrieving fallback local files.");
      const filePath = path.join(process.cwd(), "messages-fallback.json");
      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, "utf8");
          messages = JSON.parse(fileData);
          // Sort by date desc
          messages.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } catch (e) {
          messages = [];
        }
      }
    }

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("GET messages error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthenticated = await authenticateAdmin();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required" },
        { status: 400 }
      );
    }

    if (id.startsWith("local_")) {
      const filePath = path.join(process.cwd(), "messages-fallback.json");
      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, "utf8");
          let existingMessages = JSON.parse(fileData);
          existingMessages = existingMessages.filter((msg: any) => msg._id !== id);
          fs.writeFileSync(filePath, JSON.stringify(existingMessages, null, 2), "utf8");
          return NextResponse.json({ success: true, message: "Local message purged successfully" });
        } catch (e) {
          return NextResponse.json({ success: false, error: "Failed to modify fallback database" }, { status: 500 });
        }
      }
      return NextResponse.json({ success: false, error: "Fallback database not found" }, { status: 404 });
    }

    await dbConnect();
    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("DELETE message error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
