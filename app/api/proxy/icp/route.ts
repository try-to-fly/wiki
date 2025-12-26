import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const domain = searchParams.get('domain')

  const url = `https://phehmt.laf.run/icp?token=637e79b77fd9b2915dfb7e6c&url=${domain}&whois=1&dns=1&icp=1`

  console.log('icp proxy url')
  console.log(url)

  const response = await fetch(url)
  const data = await response.json()

  return NextResponse.json(data)
}
