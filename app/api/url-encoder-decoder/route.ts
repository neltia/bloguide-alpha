import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { input, action } = await req.json()

  let result: string

  if (action === "encode") {
    result = encodeURIComponent(input)
  } else if (action === "decode") {
    result = decodeURIComponent(input)
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  return NextResponse.json({ result })
}

