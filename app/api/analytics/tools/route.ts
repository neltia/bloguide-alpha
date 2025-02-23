import { NextResponse } from "next/server"

// Simulated tools usage data - in production, this would come from a database
const toolsUsageData = new Map([
  ["url-encoder", { visits: 0, usageCount: 0, averageTime: 0 }],
  ["percent-calculator", { visits: 0, usageCount: 0, averageTime: 0 }],
  ["base64", { visits: 0, usageCount: 0, averageTime: 0 }],
  ["d-day", { visits: 0, usageCount: 0, averageTime: 0 }],
])

// Record tool usage
export async function POST(request: Request) {
  try {
    const { tool, duration } = await request.json()

    if (!toolsUsageData.has(tool)) {
      return NextResponse.json({ error: "Invalid tool" }, { status: 400 })
    }

    const data = toolsUsageData.get(tool)!
    data.visits++
    data.usageCount++
    data.averageTime = (data.averageTime * (data.usageCount - 1) + duration) / data.usageCount

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording tool usage:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Get tools analytics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "7d" // Default to 7 days

    // In production, this would query a database with the specified time period
    const analytics = Array.from(toolsUsageData.entries()).map(([tool, data]) => ({
      tool,
      ...data,
    }))

    return NextResponse.json({ data: analytics })
  } catch (error) {
    console.error("Error fetching tools analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

