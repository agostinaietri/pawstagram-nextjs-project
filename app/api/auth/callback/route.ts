import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { userId, sessionClaims } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { email_addresses, username, image_url } = sessionClaims as unknown as { email_addresses: { email_address: string }[], username: string, image_url: string };

  let user = await prisma.user.findUnique({ where: { clerkId: userId } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: email_addresses[0]?.email_address,
        username: username || `user_${Math.floor(Math.random() * 10000)}`,
        image: image_url,
      },
    });
  }

  return NextResponse.json({ user });
}
