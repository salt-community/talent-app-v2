import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  const decodedUrl = decodeURIComponent(imageUrl);

  let adjustedUrl = decodedUrl;

  if (decodedUrl.includes("files.slack.com")) {
    adjustedUrl = `${decodedUrl}?w=1200&h=1200`;
  }

  if (decodedUrl.includes("slack-edge.com")) {
    const sizeRegex = /-(\d+)$/;
    adjustedUrl = decodedUrl.replace(sizeRegex, "-512");
  }

  try {
    const response = await fetch(adjustedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; YourApp/1.0)",
      },
    });

    if (!response.ok) {
      console.error("Fetch failed with status:", response.status);
      return NextResponse.json(
        { error: "Fetch failed", status: response.status },
        { status: response.status }
      );
    }

    console.log(
      "Fetch successful, content-type:",
      response.headers.get("content-type")
    );
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
