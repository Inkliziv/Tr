import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { callGroqChat } from "@/lib/groq"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { text, level, lang } = await req.json()

  const system = `You are an educational content writing expert specializing in university-level Uzbek-language e-learning materials. You follow Bloom's taxonomy and cognitive load theory principles.`
  const user = `Improve the following educational text for clarity and pedagogical effectiveness. The target audience is ${level || "university"} students. Keep the same language (${lang || "uz"}). Return JSON: { "improved": string, "changes": string[], "readability_score": number }. Text:\n\n${text}`

  try {
    const raw = await callGroqChat({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      maxTokens: 1200,
    })

    // Model should already return JSON, but we guard just in case
    const parsed = JSON.parse(raw)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error("AI_IMPROVE_TEXT_ERROR", error)
    return NextResponse.json({ message: "AI xatosi" }, { status: 500 })
  }
}

