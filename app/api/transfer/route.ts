import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { fromEmail, toEmail, amount } = await req.json()
    if (!fromEmail || !toEmail || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 })
    }
    if (fromEmail === toEmail) {
      return NextResponse.json({ error: "Cannot transfer to yourself." }, { status: 400 })
    }

    // Check sender and recipient
    const sender = await prisma.user.findUnique({ where: { email: fromEmail } })
    const recipient = await prisma.user.findUnique({ where: { email: toEmail } })
    if (!sender || !recipient) {
      return NextResponse.json({ error: "User not found." }, { status: 404 })
    }
    if (sender.balance < amount) {
      return NextResponse.json({ error: "Insufficient balance." }, { status: 400 })
    }

    // Transaction: subtract from sender, add to recipient, log both
    await prisma.$transaction([
      prisma.user.update({
        where: { email: fromEmail },
        data: {
          balance: { decrement: amount },
          transactions: {
            create: {
              type: "Transfer Out",
              amount: -amount,
              status: "Completed",
              network: "PAYGO",
            },
          },
        },
      }),
      prisma.user.update({
        where: { email: toEmail },
        data: {
          balance: { increment: amount },
          transactions: {
            create: {
              type: "Transfer In",
              amount: amount,
              status: "Completed",
              network: "PAYGO",
            },
          },
        },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Transfer failed." }, { status: 500 })
  }
}
