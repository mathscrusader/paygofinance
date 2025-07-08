import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { planId, phoneNumber, userId } = await req.json()

  if (!planId || !phoneNumber || !userId) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
  }

  try {
    // Load user balance and plan details (including network name)
    const [user, plan] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.dataPlan.findUnique({ where: { id: planId }, include: { network: true } }),
    ])

    if (!user || !plan) {
      return NextResponse.json({ message: "User or plan not found" }, { status: 404 })
    }
    if (user.walletBalance < plan.price) {
      return NextResponse.json({ message: "Insufficient wallet balance." }, { status: 400 })
    }

    // Deduct the Pay ID balance and record the transaction atomically
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { payIdBalance: user.payIdBalance - plan.price },
      }),
      prisma.transaction.create({
        data: {
          type: "Data",
          amount: -plan.price,
          status: "Completed",
          network: plan.network.name,
          userId: userId,
          receiptUrl: null,
        },
      }),
    ])

    return NextResponse.json({ message: "Purchase successful" }, { status: 200 })
  } catch (error) {
    console.error("POST /api/data/purchase error:", error)
    return NextResponse.json({ message: "Purchase failed" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
