import { NextResponse } from "next/server"
import { auth } from "@/auth"

interface Params {
  params: { id: string }
}

// PUT /api/topics/:id — update topic content / meta
export async function PUT(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const topic = await prisma.topic.update({
    where: { id: params.id },
    data: {
      title: body.title,
      content: body.content,
      duration: body.duration,
      order: body.order,
    },
  })

  return NextResponse.json(topic)
}

