import { NextRequest, NextResponse } from 'next/server'

import mongoose from '../../../lib/mongodb'
import Foo from '../../../lib/models/Foo'
import dbConnect from '../../../lib/mongodb'

export async function GET(request: NextRequest,
  { params } : { params: { fooId : string }}) {

    await dbConnect()

  try {
    const fooId = params.fooId
    const foo = await Foo.findById(params.fooId)
    if (!foo) {
      return NextResponse.json({ error: 'not_found' }, { status: 404})
    }
    return NextResponse.json({ id: fooId, name: foo.name })
  } catch (err: any) {
    return NextResponse.json({ error: err.message })
  }
  // return NextResponse.json({ id: fooId })
}
