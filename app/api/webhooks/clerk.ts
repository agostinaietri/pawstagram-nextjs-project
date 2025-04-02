import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type === "user.created") {
      const { id, email_addresses, username, image_url } = body.data;

      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          username: username || `user_${Math.random().toString(36).substring(7)}`,
          image: image_url,
        },
      });
    }
    console.log(body);


    return NextResponse.json({ message: "User synced" }, { status: 200 });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
