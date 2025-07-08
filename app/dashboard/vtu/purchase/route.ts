import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId, type, network, amount } = await req.json()
  if (!userId || !type || !network || !amount) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.payIdBalance < amount) {
    return NextResponse.json({ message: "Insufficient balance" }, { status: 402 })
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { payIdBalance: user.payIdBalance - amount },
    }),
    prisma.transaction.create({
      data: {
        type,
        amount: -amount,
        status: "Completed",
        network,
        userId,
      },
    }),
  ])

  return NextResponse.json({ message: "OK" })
}
