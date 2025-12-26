import { NextRequest } from 'next/server'

const maxEvent = 5

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()
  let eventCount = 0

  const stream = new ReadableStream({
    start(controller) {
      const timer = setInterval(() => {
        eventCount++
        if (eventCount > maxEvent) {
          clearInterval(timer)
          controller.enqueue(encoder.encode('event: end\n\n'))
          controller.close()
          return
        }
        controller.enqueue(
          encoder.encode(`data: ${eventCount} => ${new Date().toUTCString()}\n\n`)
        )
      }, 1000)
    },
  })

  return new Response(stream, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/event-stream;charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      'Content-Encoding': 'none',
      Connection: 'keep-alive',
    },
  })
}
