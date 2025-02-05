import Image from "next/image";
import Navbar from "@/components/NavBar";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap gap-6 justify-center items-center min-h-screen bg-gray-900 p-6">
        <Card
          title="Next.js & Tailwind"
          content="Learn how to build UI components with Next.js and Tailwind CSS. This card component demonstrates styling and structure."
          author="John Doe"
          date="Feb 5, 2025"
        />
        <Card
          title="React Best Practices"
          content="Explore best coding practices in React for better performance, maintainability, and scalability."
          author="Jane Smith"
          date="Jan 20, 2025"
        />
      </div>
    </>
  );
}
