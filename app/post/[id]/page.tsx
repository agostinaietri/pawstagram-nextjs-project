"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface PostProps {
  id: string;
  fileUrl: string;
  likes: number;
  comments: number;
  caption: string;
  user: any;
  createdAt: string;
}

export default function PostDetailPage() {
  const { id } = useParams() ?? {};

  const [post, setPost] = useState<PostProps | null>(null);
  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(0);

  useEffect(() => {
    console.log("ID del post:", id);
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos recibidos:", data);
          setPost(data);
          setCurrentLikes(data.likes);
        })
        .catch((err) => console.error("Error fetching post", err));
    }
  }, [id]);
  

  const handleLike = async () => {
    if (liked || !post) return;

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

  if (!post) return <p className="text-center text-gray-600">Cargando...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center mb-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <p className="text-gray-800 font-semibold">
          {post.user.username} • {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      <Image
        src={post.fileUrl || "/placeholder.jpg"}
        alt="post content"
        width={600}
        height={600}
        className="w-full h-auto rounded-lg mb-6"
      />

      {post.caption && <p className="text-gray-800 text-base mb-4 px-6">{post.caption}</p>}

      <div className="flex justify-around w-full p-2 space-x-4">
        <button className="flex items-center space-x-1" onClick={handleLike}>
          <Image src={liked ? "/heart-solid.svg" : "/heart-regular.svg"} alt="like button" width={32} height={32} />
          <p className="text-gray-600 text-lg">{currentLikes}</p>
        </button>

        <div className="flex items-center space-x-1">
          <Image src="/comment-regular.svg" alt="comment button" width={32} height={32} />
          <p className="text-gray-600 text-lg">{post.comments}</p>
        </div>
      </div>
    </div>
  );
}
