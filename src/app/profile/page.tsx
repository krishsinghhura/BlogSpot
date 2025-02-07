"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

// Define the structure of the decoded JWT token
interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
}

export default function Profile() {
  const [data, setData] = useState<any>({}); // User data (including posts)
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<any[]>([]); // Posts array
  const router = useRouter();

  // Fetch user profile data and posts
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode<MyJwtPayload>(token);
        setEmail(decoded.email); // Set email state

        // Fetch user profile data
        const userResponse = await axios.post("/api/users/profile", {
          email: decoded.email,
        });
        setData(userResponse.data);

        // Fetch posts for the logged-in user
        const postsResponse = await axios.post("/api/users/get-your-posts", {
          userId: decoded.id,
        });
        setPosts(postsResponse.data); // Set posts to state
      } else {
        console.log("No token found");
      }
    };
    fetchData();
  }, []);

  // Logout function
  const logout = () => {
    Cookies.set("token", "");
    router.push("/login");
  };

  const deletePost = async (id: string) => {
    await axios.delete(`/api/users/delete/${id}`);
    window.location.reload();
  };

  const editPost = async (id: string) => {
    router.push(`/edit?id=${id}`);
  };
  return (
    <>
      <Navbar />
      <div className=" min-h-screen bg-gray-900 mt-4">
        <div className="max-w-4xl p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg m-10">
          {/* Profile Section */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-3xl font-semibold text-center text-white">
              User Profile
            </h2>
            <div className="flex flex-col items-center space-y-4 mt-4">
              <h3 className="text-xl font-semibold text-white">
                {data.username}
              </h3>
              <p className="text-gray-400">{data.email}</p>
            </div>
            {message && (
              <p className="text-green-500 text-center mt-4">{message}</p>
            )}
            <div className="flex justify-center mt-6">
              <button
                className="w-full p-3 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Posts Section */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your Posts
            </h2>
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-gray-700 p-4 rounded-md shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{post.content}</p>
                    <p className="text-gray-500 mt-2">
                      Posted by: {post.author}
                    </p>
                    <p className="text-gray-400 mt-1">
                      Date: {new Date(post.date).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => deletePost(post._id)} // Trigger delete function on click
                      className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editPost(post._id)} // Trigger delete function on click
                      className="bg-gray-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600 ml-4"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You have not posted anything yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
