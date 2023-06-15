import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import User from '../../../lib/models/User'
import { redirect } from 'next/navigation';

let baseUrl: string
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:' + (process.env.PORT || 3001)
} else {
  baseUrl = 'https://satellitedx.fly.dev'
}

let apiUrl: string
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:3000'
} else {
  apiUrl = 'https://chaseid.fly.dev'
}

  // { params } : { params: { id : string }}
export async function GET(request: NextRequest) {

  await dbConnect()

  const vsid = request.nextUrl.searchParams.get('verification_session_id')
  const resp = await fetch(apiUrl + '/api/verification_sessions/' + vsid)
  const json = await resp.json()
  const userId = (json.custom_data || '').replace('sat-', '')
  const user = await User.findById(userId)
  
  // const profiles = json.profiles
  console.log(json)
  json.profiles.forEach((p: any) => {
    if (p.status === 'complete' && p.type === 'credit_profile') {
      user.creditProfileComplete = true
    }
    if (p.status === 'complete' && p.type === 'operation_profile') {
      user.operationProfileComplete = true
    }
  })
  await user.save()
  redirect(baseUrl + '/user2/' + user._id)

  // res.redirect('')


  // try {
  //   request.get('verification_session_url')
  //   const user = await User.findById(params.id)
  //   if (!user) {
  //     return NextResponse.json({ error: 'not_found' }, { status: 404})
  //   }
  //   return NextResponse.json(user)
  // } catch (err: any) {
  //   return NextResponse.json({ error: err.message })
  // }
}

