import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1]; // Get last part of URL as ID
    const reqBody = await req.json();
    const { title, content, Otitle, Ocontent } = reqBody;

    const post = await Post.findById(id);

    post.title = title || Otitle;
    post.content = content || Ocontent;
    await post.save();
    return NextResponse.json({ message: "Editing done" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
