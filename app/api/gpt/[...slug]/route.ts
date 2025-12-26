import { NextRequest, NextResponse } from 'next/server'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const url = `https://oai.hconeai.com/${slug.join('/')}`

  const body = await req.json()

  const headers: Record<string, string> = {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
    'Content-Type': 'application/json',
  }

  const authorization = req.headers.get('authorization')
  if (authorization) {
    headers['Authorization'] = authorization
  }

  console.log(url, headers, body)

  try {
    const proxyRes = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const data = await proxyRes.json()
    console.log(data)

    return NextResponse.json(data, { status: proxyRes.status })
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const url = `https://oai.hconeai.com/${slug.join('/')}`

  const headers: Record<string, string> = {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
  }

  const authorization = req.headers.get('authorization')
  if (authorization) {
    headers['Authorization'] = authorization
  }

  try {
    const proxyRes = await fetch(url, {
      method: 'GET',
      headers,
    })

    const data = await proxyRes.json()
    return NextResponse.json(data, { status: proxyRes.status })
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
