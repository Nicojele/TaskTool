
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(
  req: NextRequest
) {
  const data = await req.json()

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

export async function DELETE(
  req: NextRequest
) {

  const data = await req.json();

  const res = await prisma.task.delete({
    where: {
      id: data.id
    }
  })

  return NextResponse.json({ res })
}

export async function PUT(
  req: NextRequest
) {
  
  const data = await req.json();

  const res = await prisma.task.update({
    where: {
      id: data.id,
    },
    data: {
      finished: true,
      finishedAt: new Date()
    }
  })

  return NextResponse.json({ res })
}
