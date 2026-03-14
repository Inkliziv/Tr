import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { attention, interest, desire, action } = await req.json()

    if (!attention || !interest || !desire || !action) {
      return NextResponse.json({ message: "Barcha maydonlar to'ldirilmagan" }, { status: 400 })
    }

    const prompt = `Siz malakali SMM va Copywriting mutaxassisisiz. 
Men o'zimning yangi ta'lim kursim/mahsulotimni sotmoqchiman. Buning uchun AIDA modeli asosida ma'lumotlarni yig'dim:

1. Diqqatni tortish: ${attention}
2. Qiziqish uyg'otish: ${interest}
3. Xohish yaratish: ${desire}
4. Harakatga undash: ${action}

Ushbu ma'lumotlarni birlashtirib, ijtimoiy tarmoqlar (Telegram yoki Instagram) uchun chiroyli, emotsiyaga boy va o'quvchini jalb qiluvchi bitta yaxlit, jozibali reklama postini yaratib bering. Format sifatida emoji'lardan foydalaning va faqat o'zbek tilida yozing.`

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        system: "Siz SMM, marketing va reklama bo'yicha kuchli ekspert-kopiraytersiz. Har bir so'zingiz 'sotadi'.",
        messages: [{ role: "user", content: prompt }],
      })
    })

    if (!res.ok) {
      return NextResponse.json({ message: "AI bilan ulanishda xatolik yuz berdi." }, { status: 500 })
    }
    
    const data = await res.json()
    return NextResponse.json({ result: data.content[0].text })
  } catch (error) {
    console.error("GENERATE_MARKETING_ERROR", error)
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 })
  }
}
