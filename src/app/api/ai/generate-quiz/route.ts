import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { callGroqChat } from "@/lib/groq"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { text, count, difficulty } = await req.json()

  const system = `You are an expert in educational assessment design. You follow Bloom's taxonomy and best practices for test item writing.`
  const user = `Generate ${count || 10} assessment questions from this educational text.
Difficulty distribution: 40% Easy, 40% Medium, 20% Hard.
Bloom's levels: Remember, Understand, Apply.
Return ONLY valid JSON array, no markdown:
[{ "question": string, "options": [4 items], "correct_index": number, "explanation": string, "difficulty": "EASY" | "MEDIUM" | "HARD", "bloom_level": string }]
Text:
${text}`

  try {
    const raw = await callGroqChat({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      maxTokens: 2000,
    })

    const parsed = JSON.parse(raw)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error("AI_GENERATE_QUIZ_ERROR", error)
    return NextResponse.json({ message: "AI xatosi" }, { status: 500 })
  }
}

