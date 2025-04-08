"use client";

import { useState } from "react";

interface NewPostFormProps {
  onPostCreated?: () => void; // Prop opcional para actualizar la lista
}

export default function NewPostForm({ onPostCreated }: NewPostFormProps) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // Vista previa de la imagen

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Post created successfully!");
        setCaption("");
        setFile(null);
        setPreview(null); // Elimina la vista previa

        // Limpia el input de archivo
        (document.getElementById("file-input") as HTMLInputElement).value = "";

        // Llamar la función de actualización si está definida
        onPostCreated?.();
      } else {
        alert("Error creating post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4"
    >
      <textarea
        placeholder="Type a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border rounded-lg p-2"
      />

      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border p-2 rounded-lg"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full max-h-64 object-cover rounded-lg"
        />
      )}

      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
