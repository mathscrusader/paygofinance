import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import path from "path"
import fs from "fs/promises"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await req.formData()
    const email = formData.get("email") as string
    const packageId = formData.get("packageId") as string
    const amount = parseInt(formData.get("amount") as string)
    const file = formData.get("receipt") as File

    if (!email || !packageId || !amount || !file || !file.size) {
      return NextResponse.json({ error: "Missing required data." }, { status: 400 })
    }

    // Save the uploaded file (to /public/uploads)
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadDir, { recursive: true })

    const ext = file.name.split(".").pop()
    const fileName = `receipt_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const filePath = path.join(uploadDir, fileName)

    // Read and save the file buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)
    const receiptUrl = `/uploads/${fileName}`

    // Create pending transaction in DB (no balance update yet)
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 })

    const transaction = await prisma.transaction.create({
      data: {
        type: "Wallet Upgrade",
        amount: amount,
        status: "Pending",
        network: "PAYGO",
        timestamp: new Date(),
        userId: user.id,
        // Store file path as proof, add extra field in schema if needed (e.g., receiptUrl)
        // If not in your model, add: receiptUrl String? to Transaction in schema.prisma
        ...(receiptUrl && { receiptUrl }),
        // You can also record packageId if desired
        // packageId: parseInt(packageId), // If this field exists
      },
    })

    return NextResponse.json({ success: true, transaction })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: "Failed to submit wallet funding." }, { status: 500 })
  }
}
