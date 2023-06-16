import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import { createEdgeRouter } from 'next-connect'
import passport from 'passport'
import { setLoginSession } from '../../../lib/auth/auth'
import usernameStrategy from '../../../lib/auth/username-strategy'

let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:' + (process.env.PORT || 3001)
} else {
  baseUrl = 'https://satellitedx.fly.dev'
}

passport.use(usernameStrategy)

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

const router = createEdgeRouter();

/**
 * Login with redirect
 */
router
  .post(async (req) => {
    try {
      await dbConnect()
      console.log('request', req.body)

      const res = NextResponse.redirect(baseUrl, { status: 302});

      const user = await authenticate('username', req, res)
      console.log('authenticated user', user)
      const session = { ...user }
      console.log('session', user)

      await setLoginSession(res, session)

      return res;
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: 'invalid' }, { status: 401})
    }
  })

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
