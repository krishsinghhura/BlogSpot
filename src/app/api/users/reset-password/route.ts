import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { password, token } = await req.json(); // Extract request body

    // Find user with valid reset token
    const user = await userModel.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password & clear reset token
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
