import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); // Extract query parameters
    const id = searchParams.get("id"); // Get the 'id' from the query string

    console.log(id);

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
