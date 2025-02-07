import Post from "@/models/postModel";
import userModel from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { title, content, author, userId } = reqBody;

    const newPost = await Post.create({
      user: userId,
      title,
      content,
      author,
      date: Date.now(),
    });

    const savedPost = await newPost.save();

    const user = await userModel.findOne({ _id: userId });
    user.posts.push(newPost._id);

    await user.save();

    return NextResponse.json({ newPost, succes: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
