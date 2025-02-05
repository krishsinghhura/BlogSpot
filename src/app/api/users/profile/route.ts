import { connect } from "@/dbConfig/dbConfig";
import userModel from "../../../../models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    const user = await userModel.findOne({ email });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
