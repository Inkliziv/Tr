import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface Params {
  params: { id: string }
}

// POST /api/topics/:id/autosave — lightweight autosave endpoint
export async function POST(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions as any)
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

