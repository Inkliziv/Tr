import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ message: "Matn kiritilmadi" }, { status: 400 })
    }

    const prompt = `Siz multimedia ekspertisiz. Quyidagi video subtitr matnini o'qib chiqing va tahlil qiling.
Mezonlar: 
1. Ekrandagi o'qiluvchanlik (bitta kadrga sig'adimi?)
2. Matn zichligi (juda tez o'qishga to'g'ri kelmaydimi?)
3. Grammatika va tushunarlilik.

Qisqa, aniq va amaliy maslahat bering (max 150 so'z). Javobingiz faqat o'zbek tilida bo'lsin.
Subtitr matni:\n${text}`

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: "Siz TATU universitetining 'Ta'limiy resurslarni ishlab chiqish' kursi yordamchisisiz.",
        messages: [{ role: "user", content: prompt }],
      })
    })

    if (!res.ok) {
      return NextResponse.json({ message: "AI bilan ulanishda xatolik yuz berdi." }, { status: 500 })
    }
    
    const data = await res.json()
    return NextResponse.json({ result: data.content[0].text })
  } catch (error) {
    console.error("CHECK_CAPTIONS_ERROR", error)
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 })
  }
}
