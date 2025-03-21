// app/api/apply-glasses/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://glass-tryon.mirrar.com/apply-glasses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");

    let responseBody;
    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    return NextResponse.json({ data: responseBody }, { status: 200 });
  } catch (error) {
    console.error("Error fetching from apply-glasses backend:", error);
    return NextResponse.json(
      { error: "Failed to fetch from apply-glasses backend" },
      { status: 500 }
    );
  }
}
