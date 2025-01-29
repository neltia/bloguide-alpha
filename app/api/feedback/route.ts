import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, feedbackType, message } = await request.json()
    const body = JSON.stringify({ name, email, feedback_type: feedbackType, message })

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })

    // Forward the status code from the FastAPI backend
    if (response.ok) {
      return new NextResponse(null, { status: response.status })
    } else {
      return new NextResponse(null, { status: response.status })
    }
  } catch (error) {
    console.error("Error processing feedback:", error)
    return new NextResponse(null, { status: 500 })
  }
}

