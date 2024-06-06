import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect(); // db connection
  try {
    const requestBody = await request.formData();
    // const { email, password } = await request.json();
    const email = requestBody.get("email");
    const password = requestBody.get("password");
    console.log(email, "Email");
    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter password",
        },
        {
          status: 500,
        }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      // already exists
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 500,
        }
      );
    } else {
      const hashPassword = await bcrypt.hash(password as string, 10);
      const newUser = new UserModel({
        email: email,
        password: hashPassword,
      });
      await newUser.save();
    }
    return NextResponse.json(
      {
        success: true,
        message: "User successfully registered",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error regestering user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error regestering user",
      },
      {
        status: 500,
      }
    );
  }
}
