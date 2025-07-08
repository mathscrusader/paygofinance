// app/api/user/settings/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const userId = req.nextUrl.searchParams.get("userId")
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true, email: true, phone: true,
      country: true, language: true, avatarUrl: true,
      twoFactor: true,
      notifyEmail: true, notifySms: true,
      notifyPush: true, notifyMarketing: true,
      currencyCode: true,
    },
  })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Split full name into first + last
  const [firstName, ...rest] = (user.name || "").split(" ")
  const lastName = rest.join(" ")

  return NextResponse.json({
    firstName,
    lastName,
    email:     user.email,
    phone:     user.phone,
    country:   user.country,
    language:  user.language,
    avatarUrl: user.avatarUrl,
    twoFactor: user.twoFactor,
    notifyEmail:     user.notifyEmail,
    notifySms:       user.notifySms,
    notifyPush:      user.notifyPush,
    notifyMarketing: user.notifyMarketing,
    currencyCode:    user.currencyCode,
  })
}

export async function PATCH(req: Request) {
  const {
    userId,
    firstName,
    lastName,
    email,
    phone,
    country,
    language,
    avatarUrl,
    twoFactor,
    notifyEmail,
    notifySms,
    notifyPush,
    notifyMarketing,
    currencyCode,
  } = await req.json()

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  // Re-combine first+last into the single `name` column
  const name = [firstName, lastName].filter(Boolean).join(" ").trim()

  const data: any = { name, email, phone, country, language, avatarUrl,
    twoFactor, notifyEmail, notifySms, notifyPush, notifyMarketing, currencyCode
  }
  // strip undefined
  Object.keys(data).forEach(k => data[k] === undefined && delete data[k])

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
