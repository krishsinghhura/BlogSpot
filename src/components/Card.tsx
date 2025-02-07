import React from "react";

interface Card {
  title: string;
  content: string;
  author: string;
  date: string;
}
const Card: React.FC<Card> = ({ title, content, author, date }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white mb-4">{content}</p>
      <div className="text-sm text-gray-500">
        <p>Author: {author}</p>
        <p>Date: {date}</p>
      </div>
    </div>
  );
};

export default Card;
