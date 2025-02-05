"use client";
import React from "react";

// Define the prop types for the Card component
interface CardProps {
  title: string;
  content: string;
  author: string;
  date: string;
}

// Ensure the component correctly receives props
const Card: React.FC<CardProps> = ({ title, content, author, date }) => {
  return (
    <div className="max-w-sm bg-gray-800 text-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{content}</p>
      <div className="flex justify-between text-gray-400 text-xs">
        <span>By: {author}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default Card;
