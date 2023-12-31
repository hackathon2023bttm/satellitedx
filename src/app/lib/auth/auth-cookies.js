import { serialize, parse } from 'cookie'

const TOKEN_NAME = 'token'

export const MAX_AGE = 60 * 60 * 8 // 8 hours

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: true, //process.env.NODE_ENV !== 'production',
    path: '/',
    sameSite: 'lax',
  })

  res.headers.set('Set-Cookie', cookie)
  // res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.headers.set('Set-Cookie', cookie)
  // res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req) {
  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) {
    if (req.cookies.get(TOKEN_NAME)) {
      return req.cookies.get(TOKEN_NAME).value;
    }
    // return req.cookies.get(TOKEN_NAME)
  }
  // For pages we do need to parse the cookies.
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}
