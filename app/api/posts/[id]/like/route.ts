import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de tener configurado Prisma

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;

  if (!postId) return NextResponse.json({ error: "ID de post requerido" }, { status: 400 });

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Error al dar like" }, { status: 500 });
  }
}
