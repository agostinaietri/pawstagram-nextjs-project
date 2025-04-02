import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({ keyFilename: "key.json" });

export async function POST(req: Request) {
  try {
    const { bucketName } = await req.json();
    if (!bucketName) {
      return NextResponse.json({ error: "Bucket name is required" }, { status: 400 });
    }

    await storage.createBucket(bucketName);
    return NextResponse.json({ message: `Bucket ${bucketName} created.` });
  } catch (error) {
    console.error("Error creating bucket:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
