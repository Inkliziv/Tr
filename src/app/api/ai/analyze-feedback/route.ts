import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json()

    if (!text) {
      return NextResponse.json({ message: "Matn kiritilmadi" }, { status: 400 })
    }

    let prompt = ""
    if (type === "forum_prompt") {
      prompt = `Siz pedagog-ekspertsiz. Quyida o'qituvchi tomonidan yaratilgan forum muhokamasi uchun savol (yoki mavzu) keltirilgan.
Buni "Netiquette" qoidalari va o'quvchilarni chuqur o'ylashga (tanqidiy fikrlashga) undashi nuqtai nazaridan tahlil qiling.
Agar savol faqat "ha/yo'q" tipida bo'lsa yoki juda yopiq bo'lsa, uni qanday qilib ochiq savolga aylantirish bo'yicha maslahat bering. Qisqa va aniq (max 150 so'z) o'zbek tilida fikr bildiring.

Matn:
${text}`
    } else if (type === "moderation") {
      prompt = `Siz onlayn ta'lim moderatorisiz. Tasavvur qiling, o'quvchi forumda agressiv yoki noo'rin xabar qoldirdi. O'qituvchi unga quyidagicha javob yozdi:
"${text}"
O'qituvchining javobini professionallik, "Netiquette", va mojaroni to'g'ri hal qilish (de-eskalatsiya) bo'yicha baholang. Javob to'g'rimi yoki his-tuyg'uga berilganmi? Maslahat bering (max 150 so'z) o'zbek tilida.`
    } else {
      prompt = `Ushbu matnni pedagogik jihatdan tahlil qiling: ${text}`
    }

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
    console.error("ANALYZE_FEEDBACK_ERROR", error)
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 })
  }
}
