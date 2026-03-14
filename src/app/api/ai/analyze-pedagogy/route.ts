import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { problem } = await req.json()

    if (!problem) {
      return NextResponse.json({ message: "Muammo matni kiritilmadi" }, { status: 400 })
    }

    const prompt = `Siz ta'lim sifatini nazorat qiluvchi ekspertsiz. O'qituvchi quyidagi muammoga duch keldi: 
"${problem}"

Ushbu muammoni hal qilish uchun Demingning PDCA (Plan-Do-Check-Act) halqasi asosida qisqa (max 150 so'z), aniq va amaliy yechim taklif qiling. Yechim formati:
- Plan (Rejalashtirish): Nima qilish kerak?
- Do (Bajarish): Qanday amalga oshiriladi?
- Check (Tekshirish): Natija qanday o'lchanadi?
- Act (Harakat/Xulosa): Standartlashtirish yoki o'zgartirish.

Faqat o'zbek tilida javob bering.`

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
    console.error("ANALYZE_PEDAGOGY_ERROR", error)
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 })
  }
}
