"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        bio: (user.publicMetadata?.bio as string) || "",
        imageUrl: user.imageUrl || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const res = await fetch(`/api/users/${user.primaryEmailAddress?.emailAddress}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Profile successfully updated");
      router.push(`/profile/${user.primaryEmailAddress?.emailAddress}`);
    } else {
      alert("Error updating profile");
    }
  };

  if (!user) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">Edit profile</h2>

        <img
          src={formData.imageUrl || "/default-avatar.png"}
          alt="profile picture"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="username"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="bio"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="profile picture url"
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
