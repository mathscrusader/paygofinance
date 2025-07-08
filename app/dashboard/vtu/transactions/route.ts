import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const txs = await prisma.transaction.findMany({
    where: { type: { in: ["Airtime", "Data"] } },
    orderBy: { createdAt: "desc" },
    take: 10,
  })
  return NextResponse.json(txs)
}
