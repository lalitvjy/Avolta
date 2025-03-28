/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Optional: Basic validation
    const { email, name, purpose, objects } = body;
    if (!email || !name || !purpose) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, or purpose." },
        { status: 400 }
      );
    }

    const payload: any = { email, name, purpose };

    // Only include 'objects' if it's passed and is an array
    if (Array.isArray(objects) && objects.length > 0) {
      payload.objects = objects;
    }

    const response = await fetch("https://glass-tryon.mirrar.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");
    const responseBody = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    return NextResponse.json({ data: responseBody }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
