import { NextResponse } from 'next/server'
import { removeTokenCookie } from '../../../lib/auth/auth-cookies'

let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:' + (process.env.PORT || 3001)
} else {
  baseUrl = 'https://satellitedx.fly.dev'
}

export async function GET(req) {
  const res = NextResponse.redirect(baseUrl, { status: 302})
  removeTokenCookie(res)
  return res
}
