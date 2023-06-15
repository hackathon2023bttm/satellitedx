import dbConnect from '@/app/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/app/lib/models/User'
// import { pick } from 'lodash';

export async function GET(request: NextRequest, {params}: {params: { userId: string }}) {

  await dbConnect()

  try {
    const user = await User.findById(params.userId)
    if (!user) {
      return NextResponse.json({ error: 'not_found'}, {status: 404})
    }

    return NextResponse.json(user.toObject())
  } catch (e) {
    console.error('Failed to create verification session', e);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
