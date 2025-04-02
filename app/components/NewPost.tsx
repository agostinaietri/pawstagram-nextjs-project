"use client";

import { useState } from "react";

export default function NewPostForm() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Post created successfully");
      setCaption("");
      setFile(null);
    } else {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
      <textarea
        placeholder="Type a comment..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border rounded-lg p-2"
      />
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}
