import { NextResponse } from 'next/server'
import { getLoginSession } from '@/app/lib/auth/auth'
import User from '../../../lib/models/User'
import dbConnect from '../../../lib/mongodb'

export async function GET(req) {
  try {
    await dbConnect()

    const session = await getLoginSession(req)
    const maybeUserDoc = session && session._doc
    console.log('auth user', maybeUserDoc)

    const user = (maybeUserDoc && await User.findById(maybeUserDoc._id)) || null

    console.log('authsession', user.toObject())

    return NextResponse.json({ user })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401})
  }
}