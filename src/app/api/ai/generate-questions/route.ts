import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ message: "Text is required" }, { status: 400 })
    }

    const systemPrompt = `You are an assessment expert. Generate 5 multiple-choice questions from this text. 
    Return ONLY a JSON array with this exact structure, nothing else: 
    [{"question":"Text of question here?", "options":["A", "B", "C", "D"], "correct_index":0, "explanation":"Why this is correct", "bloom_level":"Tushunish", "difficulty":"O'rta"}]
    The language must be Uzbek. Text: ${text}`

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: "Savollarni yaratib bering." }],
      })
    })

    if (!res.ok) {
      const errorData = await res.text()
      console.error("Claude API Error:", errorData)
      return NextResponse.json({ message: "AI bilan ulanishda xatolik yuz berdi." }, { status: 500 })
    }

    const data = await res.json()
    let answerText = data.content[0].text
    
    // Attempt to extract JSON if it was wrapped in markdown blocks
    if (answerText.includes('```json')) {
      answerText = answerText.split('```json')[1].split('```')[0].trim()
    } else if (answerText.includes('```')) {
      answerText = answerText.split('```')[1].split('```')[0].trim()
    }

    const parsedJson = JSON.parse(answerText)
    return NextResponse.json(parsedJson)
  } catch (error) {
    console.error("GENERATE_QUESTIONS_ERROR", error)
    return NextResponse.json({ message: "Server xatosi yoki JSON parsing xatosi." }, { status: 500 })
  }
}
