import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const networks = await prisma.network.findMany({
      include: { dataPlans: true },
    })
    return NextResponse.json(networks, { status: 200 })
  } catch (err) {
    console.error("GET /api/data/networks error:", err)
    return NextResponse.json({ error: "Failed to load networks" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
