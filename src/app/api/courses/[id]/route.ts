import { NextResponse } from "next/server"
import { auth } from "@/auth"

interface Params {
  params: { id: string }
}

// GET /api/courses/:id — course with modules/topics
export async function GET(_req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          topics: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  })

  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 })
  }

  return NextResponse.json(course)
}

// PUT /api/courses/:id — update basic course data
export async function PUT(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const course = await prisma.course.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      license: body.license,
    },
  })

  return NextResponse.json(course)
}

// DELETE /api/courses/:id
export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  await prisma.course.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}

