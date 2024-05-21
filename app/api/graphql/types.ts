import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export type serverContext = {
    req: NextRequest,
    res: NextResponse,
    prisma: PrismaClient
}