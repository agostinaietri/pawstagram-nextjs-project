"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PostProps {
  id: string;
  fileUrl: string;
  likes: number;
  comments: number;
  caption: string;
  user: any;
  createdAt: string;
}

export default function PostCard({ id, fileUrl, likes = 0, comments = 0, caption, user, createdAt }: PostProps) {
  const [commentText, setCommentText] = useState("");
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [liked, setLiked] = useState(false);

  async function addComment(text: string, postId: string, userId: string) {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, postId, userId }),
    });

    if (!response.ok) {
      throw new Error("Error adding comment");
    }

    return response.json();
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addComment(commentText, id, "USER_ID_AQUI");
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setCurrentLikes((prev) => prev + 1);

    try {
      await fetch(`/api/posts/${id}/like`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error al dar like", error);
      setLiked(false);
      setCurrentLikes((prev) => prev - 1);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col items-center mb-4 w-full max-w-md">
      {user && (
        <div className="flex items-center space-x-3 mb-2">
          <p className="text-gray-800 font-semibold">
            {user.username} {" "}
            <Link href={`/post/${id}`} className="text-blue-500 hover:underline text-sm">
              • {formattedDate}
            </Link>
          </p>
        </div>
      )}

      <img src={fileUrl || "/placeholder.jpg"} alt="post content" className="w-full h-auto rounded-lg mb-4" />
      {caption && <p className="text-gray-800 text-sm mb-2 px-4">{caption}</p>}

      <div className="flex justify-items p-2 space-x-4">
        <button className="flex items-center space-x-1" onClick={handleLike}>
          <Image src={liked ? "/heart-solid.svg" : "/heart-regular.svg"} alt="like button" width={24} height={24} />
          <p className="text-gray-600 text-sm">{currentLikes}</p>
        </button>

        <div className="flex items-center space-x-1">
          <Image src="/comment-regular.svg" alt="comment button" width={24} height={24} />
          <p className="text-gray-600 text-sm">{comments}</p>
        </div>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 w-full">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Escribe un comentario..."
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
          Comentar
        </button>
      </form>
    </div>
  );
}
