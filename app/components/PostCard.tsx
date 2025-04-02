"use client";
import Image from "next/image";

type PostProps = {
  fileUrl?: string;
  likes?: number;
  comments?: number;
};

export default function PostCard({ fileUrl, likes = 0, comments = 0 }: PostProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col items-center mb-4 w-full max-w-md">
      <img
        src={fileUrl || "/placeholder.jpg"}
        alt="post content"
        className="w-full h-auto rounded-lg mb-4"
      />
      <div className="flex items-center justify-around w-full mt-2">
        <div className="flex items-center space-x-1">
          <Image src="/heart-regular.svg" alt="like button" width={24} height={24} />
          <p className="text-gray-600 text-sm">{likes}</p>
        </div>

        <div className="flex items-center space-x-1">
          <Image src="/comment-regular.svg" alt="comment button" width={24} height={24} />
          <p className="text-gray-600 text-sm">{comments}</p>
        </div>
      </div>
    </div>
  );
}
