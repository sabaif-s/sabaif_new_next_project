import {uploadToCloudinary} from "@/app/lib/uploadCloudinary"; // Adjust the import path if needed
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Perform your authentication check here if required

    const formData = await req.formData();
    const file = formData.get("file");
    console.log("form data:",formData);

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    // Construct the file URI for uploading
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    // Upload the file to Cloudinary
    const res = await uploadToCloudinary(fileUri, file.name);

    if (res.success && res.result) {
      return NextResponse.json({
        message: "success",
        imgUrl: res.result.secure_url,
      });
    } else {
      return NextResponse.json({ message: "failure" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
