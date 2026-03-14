import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { topic, subject } = await req.json()

    if (!topic) {
      return NextResponse.json({ message: "Mavzu kiritilmadi" }, { status: 400 })
    }

    const prompt = `Siz tajribali pedagog-metodistsiz. "${subject || 'Umumiy foydalanish'}" fani doirasida "${topic}" mavzusida amaliy (yoki laboratoriya) mashg'uloti uchun qadam-baqadam yoriqnoma (instruksiya) yaratib bering.
Instruksiya Kolb sikli (Konkret tajriba, Kuzatish, Abstrakt xulosa, Faol tajriba) bosqichlariga mos ravishda mantiqan davom etishi kerak.
Shuningdek, talabalarni baholash uchun qisqacha rubrika (Mezon va ball) jadvalini ham qo'shing.
Javob faqat o'zbek tilida, aniq va tushunarli bo'lsin.`

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
        system: "Siz TATU universitetining 'Ta'limiy resurslarni ishlab chiqish' kursi yordamchisisiz. Har doim pedogogik mezonlarga amal qiling.",
        messages: [{ role: "user", content: prompt }],
      })
    })

    if (!res.ok) {
      return NextResponse.json({ message: "AI bilan ulanishda xatolik yuz berdi." }, { status: 500 })
    }
    
    const data = await res.json()
    return NextResponse.json({ result: data.content[0].text })
  } catch (error) {
    console.error("GENERATE_LAB_ERROR", error)
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 })
  }
}
