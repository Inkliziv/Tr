import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    }

    const systemPrompt = `Siz TATU universitetining 'Ta'limiy resurslarni ishlab chiqish' kursi bo'yicha ta'lim yordamchisisiz. Talabaga ${context || 'umumiy'} mavzusida yordam bering. Javoblaringiz: qisqa (max 200 so'z), amaliy, o'zbek tilida. Misollar keltiring. Savolni javoblab berishdan ko'ra yo'naltiring.`

    // Standard Anthropic Messages API format
    const anthropicMessages = messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }))

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: anthropicMessages,
      })
    })

    if (!res.ok) {
      const errorData = await res.text()
      console.error("Claude API Error:", errorData)
      return NextResponse.json({ message: "AI bilan ulanishda xatolik yuz berdi." }, { status: 500 })
    }

    const data = await res.json()
    const answer = data.content[0].text

    return NextResponse.json({ message: answer })
  } catch (error) {
    console.error("AI_CHAT_ERROR", error)
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 })
  }
}
