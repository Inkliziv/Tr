import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface Params {
  params: Promise<{ id: string }>
}

// POST /api/courses/:id/modules — add module
export async function POST(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { title } = body

  if (!title) {
    return NextResponse.json({ message: "Modul nomi talab qilinadi." }, { status: 400 })
  }

  const { id } = await params
  const maxOrder = await prisma.module.aggregate({
    _max: { order: true },
    where: { courseId: id },
  })

  const module = await prisma.module.create({
    data: {
      title,
      courseId: id,
      order: (maxOrder._max.order || 0) + 1,
    },
  })

  return NextResponse.json(module, { status: 201 })
}

