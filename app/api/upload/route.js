import { uploadToCloudinary } from "@/app/lib/uploadCloudinary"; // Adjust the import path if needed
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";

// Save user data to the database
const SaveToDatabase = async (formData, imgUrl) => {
  try {
     const hashedPassword = await bcrypt.hash(formData.get('password'), 2);
    const user = await User.create({
      email: formData.get("email"),
      username: formData.get("username"),
      password: hashedPassword,
      imageUrl: imgUrl,
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving to database:", error);
    return { success: false, error: error.message };
  }
};

export async function POST(req) {
  try {
    // Authentication check (if required)

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Convert the file to a base64 URI
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    // Upload the file to Cloudinary
    const res = await uploadToCloudinary(fileUri, file.name);

    if (res.success && res.result) {
      // Save form data and uploaded image URL to the database
      const dbResponse = await SaveToDatabase(formData, res.result.secure_url);
      
      if (dbResponse.success) {
        return NextResponse.json({
          message: "success",
          imgUrl: res.result.secure_url,
        });
      } else {
        return NextResponse.json(
          { message: "Database save failed", error: dbResponse.error },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ message: "File upload failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
