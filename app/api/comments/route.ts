import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { text, postId, userId } = await req.json();

    if (!text || !postId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        text,
        postId,
        userId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Error adding comment" }, { status: 500 });
  }
}
