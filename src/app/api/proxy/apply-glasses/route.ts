import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const response = await fetch("http://34.27.51.74:5000/apply-glasses", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    // Try parsing the response as JSON or text
    const contentType = response.headers.get("Content-Type");

    let responseBody;
    if (contentType?.includes("application/json")) {
      responseBody = await response.json(); // If it's JSON
    } else {
      responseBody = await response.text(); // If it's plain text or an error message
    }

    console.log("Response from backend:", responseBody);

    return NextResponse.json({ data: responseBody }, { status: 200 });
  } catch (error) {
    console.error("Error fetching from backend:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 }
    );
  }
}
