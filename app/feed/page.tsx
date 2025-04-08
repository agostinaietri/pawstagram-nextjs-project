"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import SyncButton from "../components/SyncButton";
import PostCard from "../components/PostCard";
import NewPostForm from "../components/NewPost";

export default function Feed() {
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Función para obtener los posts
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Función para cerrar el modal al hacer click fuera de él
  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowForm(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 transition"
      >
        {showForm ? "Cancel" : "Add post"}
      </button>

      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">New post</h2>
            <NewPostForm
              onPostCreated={() => {
                setShowForm(false);
                fetchPosts(); // Actualizar lista de posts después de agregar uno
              }}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <SyncButton />

      {posts.length > 0 ? (
      posts.map((post) => (
        <PostCard
          id={post.id} // ✅ Pass the id property
          key={post.id}
          fileUrl={post.fileUrl}
          likes={post.likes}
          comments={post.comments}
          caption={post.caption}
          user={post.user} // ✅ Pasamos el usuario
          createdAt={post.createdAt} // ✅ Pasamos la fecha de creación
        />
      ))
    ) : (
      <p className="text-lg">No posts yet. Create one!</p>
    )}

    </div>
  );
}
