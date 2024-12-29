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
async function imageUrlToFile(imageUrl, filename) {
  try {
    // Fetch the image data as a Blob
    const response = await fetch(imageUrl);
    
    // Ensure the response is valid
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    // Convert the response to a Blob (Binary Large Object)
    const blob = await response.blob();
    
    // Convert Blob to a File object
    const file = new File([blob], filename+Date.now(), { type: blob.type });

    // Now you can use the file object
    console.log("File created:", file);
    return file;
  } catch (error) {
    console.error("Error converting image URL to file:", error);
  }
}

export async function POST(req) {
  try {
    // Authentication check (if required)

    // Parse form data
    
    const formData = await req.formData();
    console.log("form data:",formData);
  
    let file = formData.get("file");
    if (file instanceof File) {
      console.log("The variable is a File!");
    } else {
      console.log("The variable is NOT a File.");
            file=await imageUrlToFile(file,"image.jpg");

    }

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
