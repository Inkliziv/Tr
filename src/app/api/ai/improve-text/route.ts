import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { action, text } = await req.json()

    if (!text) {
      return NextResponse.json({ message: "Matn kiritilmadi" }, { status: 400 })
    }

    let prompt = ""
    if (action === "improve") {
      prompt = `Siz tahrirchisiz. Ushbu matnni pedagogik jihatdan yaxshilang, o'zbek tilida aniq, tushunarli va xatosiz qilib qayta yozib bering. Faqat tahrirlangan matnni qaytaring, boshqa izohsiz. Matn:\n${text}`
    } else if (action === "summary") {
      prompt = `Ushbu matnning qisqacha mazmunini (xulosasini) 2-3 jumlada yozib bering. Matn:\n${text}`
    } else if (action === "examples") {
      prompt = `Ushbu matndagi nazariy fikrlar uchun 2 ta hayotiy, talabalarga tushunarli va qiziqarli misol o'ylab toping. O'zbek tilida qisqa javob bering. Matn:\n${text}`
    } else if (action === "readability") {
      prompt = `Ushbu matnning o'qilishi qay darajada oson ekanligini baholang (1 dan 10 gacha) va matnni qanday qilib soddalashtirish mumkinligi haqida 2 ta amaliy maslahat bering. Qisqa javob bering. Matn:\n${text}`
    } else {
      prompt = `Ushbu matnni yaxshilang: ${text}`
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
        max_tokens: 1000,
        system: "Siz TATU universitetining 'Ta'limiy resurslarni ishlab chiqish' kursi yordamchisisiz. Faqat o'zbek tilida, professional va aniq javob bering.",
        messages: [{ role: "user", content: prompt }],
      })
    })

    if (!res.ok) {
      return NextResponse.json({ message: "AI bilan ulanishda xatolik yuz berdi." }, { status: 500 })
    }
    
    const data = await res.json()
    return NextResponse.json({ result: data.content[0].text })
  } catch (error) {
    console.error("IMPROVE_TEXT_ERROR", error)
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 })
  }
}
