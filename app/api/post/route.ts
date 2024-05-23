import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        const res = await prisma.post.findMany();

        return NextResponse.json(res, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}