import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { TopicType } from "@prisma/client"

interface Params {
  params: Promise<{ id: string }>
}

// POST /api/modules/:id/topics — add topic
export async function POST(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { title, type } = body as { title: string; type: TopicType }

  if (!title || !type) {
    return NextResponse.json({ message: "Mavzu nomi va turi talab qilinadi." }, { status: 400 })
  }

  const { id } = await params
  const maxOrder = await prisma.topic.aggregate({
    _max: { order: true },
    where: { moduleId: id },
  })

  const topic = await prisma.topic.create({
    data: {
      title,
      type,
      moduleId: id,
      order: (maxOrder._max.order || 0) + 1,
      content: {},
    },
  })

  return NextResponse.json(topic, { status: 201 })
}
