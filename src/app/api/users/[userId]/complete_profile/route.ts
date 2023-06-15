// 648b755c5094e603955e32b4


import dbConnect from '@/app/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/app/lib/models/User'

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

export async function POST(request: NextRequest, {params}: {params: { userId: string }}) {

  await dbConnect()

  try {
    const user = await User.findById(params.userId)
    if (!user) {
      return NextResponse.json({ error: 'not_found'}, {status: 404})
    }

    // { profiles: ['operation_profile', 'credit_profile']}
    console.log('got user', user._id)
    const json = await request.json()
    const profiles = json.profiles || []
    if (profiles.length < 1) {
      return NextResponse.json({ error: 'missing_profiles'}, {status: 400})
    }
    console.log('got profiles', json)

    const reqData = {
      custom_data: 'sat-' + params.userId,
      profiles: (json.profiles || []).map((p: any) => {
        return { type: p, requested: true }
      }),
      flow_redirect_url: baseUrl + '/api/callback/flow',
      cancel_redirect_url: baseUrl + '/api/callback/cancel',
    }

      const resp = await fetch(apiUrl + '/api/verification_sessions', {
        method: 'POST',
        body: JSON.stringify(reqData),
        headers: {
          'content-type': 'application/json'
        },
      })
      if (resp.status >= 300) {
        console.error("failed to reach API", resp.body)
        return NextResponse.json({ error: 'internal_error'}, { status: 500 })
      } else {
        const respJson = await resp.json()
        // const url = respJson.verification_session_url
        console.log('created session', respJson)
        return NextResponse.json(respJson)
      }
    

    // return NextResponse.json(user.toObject())
  } catch (e) {
    console.error('Failed to create verification session', e);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
