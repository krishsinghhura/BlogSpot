import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send password reset email
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Password reset email sent successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
