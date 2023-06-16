import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import { createEdgeRouter } from 'next-connect'
import passport from 'passport'
import { setLoginSession } from '../../../lib/auth/auth'
import usernameStrategy from '../../../lib/auth/username-strategy'

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
 * Async Login
 */
router
  .post(async (req) => {
    try {
      await dbConnect()
      console.log('request', req.body)
      const res = NextResponse.json({
        done: true, //message: "User has been created",
      });

      const user = await authenticate('username', req, res)
      const session = { ...user }
      
      await setLoginSession(res, session)

      return res
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: 'invalid' }, { status: 401})
    }
  })

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
