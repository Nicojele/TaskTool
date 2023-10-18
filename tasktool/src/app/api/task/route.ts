
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(
  req: NextRequest
) {
  const data = await req.json()
  console.log(data);

  const res = await prisma.task.create({
    data: {
      category: data.category,
      createtAt: data.createdAt,
      description: data.description,
      finishedAt: data.finishedAt,
      finished: data.finished,
    }
  })

  return NextResponse.json({ res });
}

export async function GET(
  req: NextRequest
) {
  const res = await prisma.task.findMany();

  return NextResponse.json({ res });
}
