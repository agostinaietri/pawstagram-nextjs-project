"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <Link href="/" className="flex items-center space-x-2 text-black">
        <h1 className="text-2xl font-bold">zoo</h1>
        <Image src="/paw-solid.svg" alt="paw" width={24} height={24} />
        <h1 className="text-2xl font-bold">miez</h1>
      </Link>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        {user ? (
          <Link href={`/profile/${user.primaryEmailAddress?.emailAddress}`}>
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
