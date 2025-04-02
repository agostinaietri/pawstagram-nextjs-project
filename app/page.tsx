"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Navbar from "./components/navbar";
import Feed from "./feed/page";
export default function Home() {
  return (
    <main className="relative bg-pawstagram-pattern min-h-screen flex flex-col items-center justify-center text-white">
      
      <Navbar />

      <SignedOut>
        <div className="flex flex-col items-center gap-6 mt-10">
          <h1 className="text-3xl font-bold">zoomies 🐾</h1>
          <p className="text-lg text-gray-300">where cuteness meets fun</p>
          <div className="flex gap-3">
            <div className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600">
              <SignUpButton />
            </div>
            <div className="bg-gray-500 px-4 py-2 rounded-md text-white hover:bg-gray-600">
              <SignInButton />
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <Feed />
      </SignedIn>

    </main>
  );
}
