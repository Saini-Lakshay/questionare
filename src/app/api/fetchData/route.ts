// @ts-check
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";

function getAllUrlParams(url: string) {
  return {};
  // var queryString = url.split("?")[1];
  // var obj = {};
  // if (queryString) {
  //   queryString = queryString.split("#")[0];
  //   var arr = queryString.split("&");
  //   for (var i = 0; i < arr.length; i++) {
  //     var a = arr[i].split("=");
  //     var paramName = a[0];
  //     var paramValue = typeof a[1] === "undefined" ? true : a[1];
  //     paramName = paramName.toLowerCase();
  //     if (typeof paramValue === "string") paramValue = paramValue.toLowerCase();
  //     if (paramName.match(/\[(\d+)?\]$/)) {
  //       var key = paramName.replace(/\[(\d+)?\]/, "");
  //       // @ts-ignore
  //       if (!obj[key]) obj[key] = [];
  //       if (paramName.match(/\[\d+\]$/)) {
  //         // @ts-ignore
  //         var index = /\[(\d+)\]/.exec(paramName)[1];
  //         // @ts-ignore
  //         obj[key][index] = paramValue;
  //       } else {
  //         // @ts-ignore
  //         obj[key].push(paramValue);
  //       }
  //     } else {
  //       // @ts-ignore
  //       if (!obj[paramName]) {
  //         // @ts-ignore
  //         obj[paramName] = paramValue;
  //         // @ts-ignore
  //       } else if (obj[paramName] && typeof obj[paramName] === "string") {
  //         // @ts-ignore
  //         // @ts-ignore
  //         obj[paramName] = [obj[paramName]];
  //         // @ts-ignore
  //         obj[paramName].push(paramValue);
  //       } else {
  //         // otherwise add the property
  //         // @ts-ignore
  //         obj[paramName].push(paramValue);
  //       }
  //     }
  //   }
  // }

  // return obj;
}

export async function GET(request: Request) {
  await dbConnect(); // db connection
  try {
    const objs = getAllUrlParams(request.url) as any;

    const email = objs?.email;
    const userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      return NextResponse.json(
        {
          success: true,
          message: "Success",
          data: userByEmail,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Some error occured",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    toast.error("Error while fetching data!");
  }
}
