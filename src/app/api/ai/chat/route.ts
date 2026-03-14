import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { callGroqChat } from "@/lib/groq"

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { courseName, summary, question, lang } = await req.json()

  const system = `You are a helpful and encouraging teaching assistant for the course '${courseName}'. Course summary: ${summary}.
Rules: 1) Answer ONLY based on course content 2) If unsure, say 'This topic needs teacher clarification' 3) Always respond in the student's language 4) Use simple, clear language 5) Never give direct answers to assessment questions — guide instead.`

  try {
    const answer = await callGroqChat({
      messages: [
        { role: "system", content: system },
        { role: "user", content: question },
      ],
      maxTokens: 800,
    })

    return NextResponse.json({ answer })
  } catch (error) {
    console.error("AI_CHAT_ERROR", error)
    return NextResponse.json({ message: "AI xatosi" }, { status: 500 })
  }
}

