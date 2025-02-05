import { connect } from "@/dbConfig/dbConfig";
import userModel from "../../../../models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exists" },
        { status: 400 }
      );
    }

    var token = jwt.sign({ id: user._id, email }, process.env.TOKEN_SECRET!);

    const check = bcrypt.compareSync(password, user.password);
    if (check) {
      return NextResponse.json({
        message: "login successfull",
        token,
        isVerfied: user.isVerfied,
      });
    } else {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
