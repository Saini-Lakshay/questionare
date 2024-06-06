import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect(); // db connection
  try {
    const requestBody = await request.formData();
    const email = requestBody.get("email");
    const questions = JSON.parse(requestBody.get("questions") as string);
    console.log("-----------++++++++++++++++++++++ ", questions);
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      const updateResp = await UserModel.findByIdAndUpdate(
        existingUserByEmail._id,
        { questions: questions }
      );
      console.log(updateResp, "..............-----------------");
      return NextResponse.json(
        {
          success: true,
          message: "Update successfull",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Error occured",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("Error updating questions", error);
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
