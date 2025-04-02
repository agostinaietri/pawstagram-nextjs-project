"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from '@headlessui/react'


export default function ProfilePage() {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;

      if (userEmail) {

        fetch(`/api/users/${userEmail}`)
          .then((res) => res.json())
          .then((data) => setUserData(data))
          .catch((err) => console.error("Error fetching user data:", err));
      }
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  const userEmail = user.primaryEmailAddress?.emailAddress;

  const handleEditProfile = () => {
    router.push(`/profile/edit`);
  };

  return (
    <div className="flex justify-center min-h-screen bg-pawstagram-pattern p-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center sticky top-20 h-fit">
        <img
          src={user.imageUrl}
          alt="Profile picture"
          className="w-80 h-70 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl text-black font-semibold">{user.fullName || "no username"}</h2>
        <p className="text-gray-600">{userEmail}</p>
        <p className="text-gray-600">{userData?.bio || "No bio available"}</p>
        <p className="text-gray-600">
          {userData?.followers || 0} followers | {userData?.following || 0} following
        </p>
        <Link href={`/profile/edit`}>
          <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
            edit profile
          </Button>
        </Link>
      </div>

      <div className="ml-10 w-[500px]">
        <h2 className="text-black text-3xl font-bold mb-4">posts</h2>

        {userData?.posts?.length > 0 ? (
          userData.posts.map((post: any, i: number) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col items-center mb-4">
              <img
                src={post.fileUrl || "/post-placeholder.jpg"}
                alt="post content"
                className="w-full h-auto rounded-lg mb-4"
              />
              <div className="flex items-center justify-around w-full mt-2">
                <div className="flex items-center space-x-1">
                  <Image
                    src="/heart-regular.svg"
                    alt="like button"
                    width={24}
                    height={24}
                    className="text-black dark:text-white"
                  />
                  <p className="text-gray-600 text-sm">{post.likes || 0}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src="/comment-regular.svg"
                    alt="comment button"
                    width={24}
                    height={24}
                    className="text-black dark:text-white"
                  />
                  <p className="text-gray-600 text-sm">{post.comments || 0}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No posts available</p>
        )}
      </div>
    </div>
  );
}
