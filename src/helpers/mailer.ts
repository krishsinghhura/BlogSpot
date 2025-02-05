import nodemailer from "nodemailer";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Creating hashed user
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Update user model with the respective token and expiry
    if (emailType === "VERIFY") {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await userModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    // Setting up the email transport using Gmail
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Email content based on the emailType
    const mailOptions = {
      from: "krishhura72@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.</p>`
          : `<p>If you didn't request a password reset, please ignore this email.</p>
           <p>Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">here</a> to reset your password.</p>`,
    };

    // Send the email
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
