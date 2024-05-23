import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

export const POST = async (req: Request) => {
  try {
    const { title, message, tags, authorId, image } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title must be of atleast 3 characters long" },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { message: "Message must be of atleast 30 characters long" },
        { status: 400 }
      );
    }

    if (!tags) {
      return NextResponse.json(
        { message: "Tags can not be empty!" },
        { status: 400 }
      );
    }

    if (!authorId) {
      return NextResponse.json(
        { message: "Post must have a valid author!" },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { message: "Image is required!" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        message,
        tags,
        authorId,
        image,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error creating post", { status: 500 });
  }
};
