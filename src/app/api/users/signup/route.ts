import { connect } from "../../../../dbConfig/dbConfig";
import userModel from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    //checking if the user exists or not
    const check = await userModel.findOne({ email });
    if (check) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    //hashing password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const newUser = await new userModel({
      username,
      email,
      password: hash,
    });
    const savedUser = await newUser.save();

    var token = jwt.sign(
      { id: savedUser._id, email },
      process.env.TOKEN_SECRET!
    );

    //send Verification Email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      isVerfied: savedUser.isVerfied,
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
