import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import { compareSync } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // Validate Email
    if (!email) {
      return NextResponse.json("Email is required!", {
        status: 400,
      });
    }

    if (!password) {
      return NextResponse.json("Password is required!", {
        status: 400,
      });
    }

    // Check if use already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(`User not found with email: ${email}`, {
        status: 404,
      });
    }

    // Hash the password
    const isPasswordIsCurrect = compareSync(password, existingUser.password);

    // Check if the password is correct
    if (!isPasswordIsCurrect) {
      return NextResponse.json("Wrong Password", { status: 401 });
    }

    // Sign a token
    const token = sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser.id,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "10d",
      }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
