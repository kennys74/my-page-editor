import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data = await req.json();
    const page = await prisma.page.create({ data });
    return NextResponse.json(page);
}