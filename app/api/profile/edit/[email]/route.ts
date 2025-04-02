import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: { email: string } }) {
  const { email } = context.params;
  
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: Request, context: { params: { email: string } }) {
  const { email } = context.params;
  const { fullName, bio, imageUrl } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        bio,
        image: imageUrl,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error while updating profile." }, { status: 500 });
  }
}
