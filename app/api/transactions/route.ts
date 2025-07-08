// app/api/transactions/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { timestamp: "desc" },
  })
  return NextResponse.json(transactions)
}
