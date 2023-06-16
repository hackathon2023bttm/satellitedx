// 648b755c5094e603955e32b4


import dbConnect from '@/app/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/app/lib/models/User'

export async function POST(request: NextRequest, {params}: {params: { userId: string }}) {

  await dbConnect()

  try {
    const json = await request.json()
    const inc = json.inc || json.amount || 1000;
    console.log('mine', params.userId, inc, json)

    const user = await User.findOneAndUpdate({ _id: params.userId }, {
      $inc: { balance: inc }
    }, { new: true });
    if (!user) {
      return NextResponse.json({ error: 'not_found'}, {status: 404})
    }
    return NextResponse.json(user.toObject())
  } catch (e) {
    console.error('Failed to mine', e);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
