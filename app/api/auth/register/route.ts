import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import { hashSync } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import { User } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    // Validate name
    if (!name || name.length < 3) {
      return NextResponse.json("Name must be at least 3 characters", {
        status: 400,
      });
    }

    // Validate Email
    if (!email) {
      return NextResponse.json("Email is required!", {
        status: 400,
      });
    } else {
      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

      if (!isValidEmail) {
        return NextResponse.json("Please enter a valid email!", {
          status: 400,
        });
      }
    }

    // Validate password
    if (!password) {
      return NextResponse.json("Password is required!", {
        status: 400,
      });
    } else {
      const isValidPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        );

      if (!isValidPassword) {
        return NextResponse.json(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
          {
            status: 400,
          }
        );
      }
    }

    // Check if use already exists
    const existingUser: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json("User already exists, please LogIn!", {
        status: 409,
      });
    }

    // Hash the password
    const hashedPassword = hashSync(password, 10);
    // Create a new user
    const newAuthor = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Sign a token
    const token = sign(
      { name, email, id: newAuthor.id },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: '10d'
      }
    );

    return NextResponse.json({ token }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
