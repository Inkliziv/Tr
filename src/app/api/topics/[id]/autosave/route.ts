import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface Params {
  params: Promise<{ id: string }>
}

// POST /api/topics/:id/autosave — lightweight autosave endpoint
export async function POST(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const { id } = await params

  await prisma.topic.update({
    where: { id },
    data: {
      content: body.content,
    },
  })

  return NextResponse.json({ ok: true })
}

