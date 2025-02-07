import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
