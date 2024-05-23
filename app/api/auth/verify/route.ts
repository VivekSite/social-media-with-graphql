import { Secret, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json("Token is required!", { status: 400 });
    }
    const decoded = verify(token, process.env.JWT_SECRET as Secret);

    return NextResponse.json(decoded, { status: 200 });
  } catch (error: any) {
    if (error.message.includes("jwt expired")) {
      return NextResponse.json("Token is expired, please LogIn again", {
        status: 401,
      });
    }
    return NextResponse.json(error.message, { status: 500 });
  }
};
