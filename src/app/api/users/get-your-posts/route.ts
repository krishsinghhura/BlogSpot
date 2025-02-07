import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userId } = reqBody;

    const user = await User.findById(userId).populate("posts");

    return NextResponse.json(user.posts);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
