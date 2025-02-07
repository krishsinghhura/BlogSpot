"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";

const EditPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id"); // Extract ID from URL params

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3000/api/users/edit/${id}`, {
        title,
        content,
        Otitle: data.title,
        Ocontent: data.content,
      });
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/users/get-post?id=${id}`
    );
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">
          Edit Post with title- {data.title}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 m-2 w-full max-w-md bg-gray-800 text-white border-gray-700"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 m-2 w-full max-w-md bg-gray-800 text-white border-gray-700"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPage;
