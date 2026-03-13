import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Barcha maydonlarni to‘ldiring." }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: "Bu email bilan foydalanuvchi allaqachon mavjud." }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error("REGISTER_ERROR", error)
    return NextResponse.json({ message: "Server xatosi." }, { status: 500 })
  }
}

