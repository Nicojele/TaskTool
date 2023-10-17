
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(
  req: NextRequest
) {
  const data = await req.json()

  const res = await prisma.task.create({
    data: {
      category: data.category,
      createtAt: data.createtAt,
      description: data.description,
      finished: data.finished,
      finishedAt: data.finishedAt,
    }
  })

  return NextResponse.json({ res });
}
