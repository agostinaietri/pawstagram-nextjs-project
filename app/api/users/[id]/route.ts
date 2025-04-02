import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
    const params = await context.params;
    const { id } = params;

  try {
    console.log("Searching user with:", id);

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ id }, { email: id }, { clerkId: id }],
      },
    });

    console.log("Search results:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in query:", error);
    return NextResponse.json(
      { error: "Error in query", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { email: string } }) {
    try {
      const { email } = params;
      const { fullName, bio, imageUrl } = await req.json();
  
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          bio,
          image: imageUrl,
        },
      });
  
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error while updating user" }, { status: 500 });
    }
  }