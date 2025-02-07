"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

interface data {
  name: string;
  id: string;
}
const PostForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = () => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode<data>(token);
      setAuthor(decoded.name);
      setId(decoded.id);
    } else {
      console.log("token is not avilable");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("/api/users/add-post", {
      title,
      content,
      author,
      userId: id,
    });
    setLoading(false);
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-800 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-black">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Create a Post
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter post content"
                rows={5}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Submit Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostForm;
