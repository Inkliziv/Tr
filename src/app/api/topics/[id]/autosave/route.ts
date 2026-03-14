import { NextResponse } from "next/server"
import { auth } from "@/auth"

interface Params {
  params: { id: string }
}

// POST /api/topics/:id/autosave — lightweight autosave endpoint
export async function POST(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  await prisma.topic.update({
    where: { id: params.id },
    data: {
      content: body.content,
    },
  })

  return NextResponse.json({ ok: true })
}

