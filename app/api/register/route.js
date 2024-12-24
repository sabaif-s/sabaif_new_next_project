import { NextResponse } from "next/server";
import sequelize from "@/app/lib/database";
import bcrypt from "bcrypt";
import User from "@/models/user";

export async function GET(req) {
  const url = new URL(req.url);
  console.log(url);
  return NextResponse.json({ message: `register api ${url}` });
}

export async function POST(req) {
  const body = await req.json();
  const { email, username, password } = body;

  // Check if required fields are provided
  if (!email || !username || !password) {
    return NextResponse.json(
      { message: "Please provide all fields", ok: false },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const findUser = await User.findOne({ where: { email } });
    if (findUser) {
      return NextResponse.json(
        { message: "User already registered", ok: false },
        { status: 409 } // 409 Conflict for existing user
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 2);

    // Create the new user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser, ok: true },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors || [];
      const emailError = errors.find((item) => item.validatorKey === "isEmail");
      const lengthError = errors.find((item) => item.validatorKey === "len");

      if (emailError) {
        return NextResponse.json(
          { message: "Invalid email credentials", ok: false },
          { status: 400 }
        );
      }

      if (lengthError) {
        return NextResponse.json(
          { message: "Username should be between 3-30 characters", ok: false },
          { status: 400 }
        );
      }
    }

    console.error("Internal server error:", error);
    return NextResponse.json(
      { message: "Internal server error", ok: false },
      { status: 500 }
    );
  }
}
