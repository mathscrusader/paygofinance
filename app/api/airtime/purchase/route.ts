import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"

import { getCurrentUser } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { network, amount, phoneNumber, discount } = await req.json()
    const cost = amount - (amount * discount) / 100

    // Verify user balance
    if (user.payIdBalance < cost) {
      return NextResponse.json(
        { error: 'Insufficient PAY ID balance' }, 
        { status: 400 }
      )
    }

    // Create transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { payIdBalance: { decrement: cost } }
      }),
      prisma.airtimeTransaction.create({
        data: {
          userId: user.id,
          network,
          amount,
          phoneNumber,
          discount,
          cost,
          status: 'COMPLETED'
        }
      })
    ])

    return NextResponse.json({ 
      message: 'Airtime purchased successfully',
      newBalance: user.payIdBalance - cost
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}