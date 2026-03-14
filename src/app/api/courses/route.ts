import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

// GET /api/courses — list teacher's courses
export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  const courses = await prisma.course.findMany({
    where: { teacherId: user.id },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(courses)
}

// POST /api/courses — create new course
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  const body = await req.json()
  const { title, description, category, level, language } = body

  if (!title || !description) {
    return NextResponse.json({ message: "Majburiy maydonlar to‘ldirilmagan." }, { status: 400 })
  }

  const course = await prisma.course.create({
    data: {
      title,
      description,
      teacherId: user.id,
      // extra meta could be stored via separate model or JSON if needed
    },
  })

  return NextResponse.json(course, { status: 201 })
}

