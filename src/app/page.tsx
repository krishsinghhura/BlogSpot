"use client";
import Navbar from "@/components/NavBar";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Post {
  _id: Int32Array;
  title: string;
  content: string;
  author: string;
  date: string;
  user: string;
}

export default function Home() {
  const [data, setData] = useState<Post[]>([]);

  const getData = async () => {
    try {
      const posts = await axios.get("/api/users/feed");
      console.log(posts.data);

      setData(posts.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-900">
      <Navbar />
      <Link href="/add-post">
        <button className=" p-2 text-white bg-green-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-400 mt-5 h-10 ml-5">
          Add post
        </button>
      </Link>
      <div className="flex flex-wrap gap-6 justify-center items-center min-h-screen bg-gray-900 p-6">
        {data.map((post) => (
          <Card
            key={post._id.toString()}
            title={post.title}
            content={post.content}
            author={post.author}
            date={new Date(post.date).toLocaleDateString()} // Formatting date
          />
        ))}
      </div>
    </div>
  );
}
