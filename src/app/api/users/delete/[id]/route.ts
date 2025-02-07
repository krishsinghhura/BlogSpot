import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig"; // Database connection
import Post from "@/models/postModel";

// Ensure the database connection
connect();

export async function DELETE(req: NextRequest) {
  try {
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1]; // Get last part of URL as ID

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
