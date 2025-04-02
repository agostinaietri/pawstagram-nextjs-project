import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
  fileUrl: string;
  likes: number;
  comments: number;
  id: string;
}

export default function PostCard({ fileUrl, likes, comments, id }: PostCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col items-center mb-4 w-full max-w-md">
      <Link href={`/post/${id}`}>
        <img
          src={fileUrl || "/placeholder.jpg"}
          alt="post content"
          className="w-full h-auto rounded-lg mb-4 cursor-pointer"
        />
      </Link>
      <div className="flex items-center justify-around w-full mt-2">
        <div className="flex items-center space-x-1">
          <Image src="/heart-regular.svg" alt="like button" width={24} height={24} />
          <p className="text-gray-600 text-sm">{likes || 0}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Image src="/comment-regular.svg" alt="comment button" width={24} height={24} />
          <p className="text-gray-600 text-sm">{comments || 0}</p>
        </div>
      </div>
    </div>
  );
}
