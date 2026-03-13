import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST /api/webhooks/zukkoo
// Expected payload example:
// { quizId, courseId, results: [{ email, score, maxScore }] }

export async function POST(req: Request) {
  const body = await req.json()

  // TODO: verify webhook signature if Zukkoo provides one

  const { courseId, results } = body

  // Example: here you could upsert enrollment progress or store scores
  // For now we just log and return OK.
  console.log("ZUKKOO_WEBHOOK", body)

  // You can extend Prisma schema with a QuizResult model and save here.

  return NextResponse.json({ ok: true })
}

