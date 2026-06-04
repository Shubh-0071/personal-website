import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    let newMessage;
    let fallback = false;

    try {
      await dbConnect();
      newMessage = await Message.create({
        name,
        email,
        message,
      });
    } catch (dbErr) {
      console.warn("MongoDB connection failed, falling back to local file storage.");
      fallback = true;

      const filePath = path.join(process.cwd(), "messages-fallback.json");
      let existingMessages = [];

      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, "utf8");
          existingMessages = JSON.parse(fileData);
        } catch (e) {
          existingMessages = [];
        }
      }

      newMessage = {
        _id: `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      };

      existingMessages.push(newMessage);
      fs.writeFileSync(filePath, JSON.stringify(existingMessages, null, 2), "utf8");
    }

    return NextResponse.json(
      { success: true, data: newMessage, fallback },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
