import { NextResponse } from "next/server"
import { auth } from "@/auth"

// This endpoint receives internal quiz JSON and converts it
// to Zukkoo-compatible format:
// { questions:[{text, options:[4], correct_index, time_limit}] }

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { questions } = await req.json()

  const { id } = await params
  const zukkoo = {
    quizId: id,
    questions: (questions || []).map((q: any) => ({
      text: q.question,
      options: q.options || [],
      correct_index: q.correct_index ?? 0,
      time_limit: q.time_limit ?? 30,
    })),
  }

  // Here you can optionally sign or encode this JSON and
  // redirect/open Zukkoo.uz with query param, depending on their API.
  return NextResponse.json(zukkoo)
}

