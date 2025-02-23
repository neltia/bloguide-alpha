import { NextResponse } from "next/server"

const FASTAPI_BASE_URL = process.env.FASTAPI_URL || "http://localhost:8000"

async function fetchFastAPIData(endpoint: string) {
  try {
    const response = await fetch(`${FASTAPI_BASE_URL}/api/${endpoint}`)
    if (!response.ok) {
      throw new Error(`FastAPI request failed: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching from FastAPI (${endpoint}):`, error)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "7d"

  try {
    // Fetch data from different sources in parallel
    const [toolsResponse, searchData, feedbackData] = await Promise.all([
      // Tools data from Next.js API
      fetch(`${request.url.split("/dashboard")[0]}/tools?period=${period}`),
      // Search analytics from FastAPI
      fetchFastAPIData("search/analytics"),
      // Feedback data from FastAPI
      fetchFastAPIData("feedback/analytics"),
    ])

    const toolsData = toolsResponse.ok ? await toolsResponse.json() : null

    // Combine all data
    const dashboardData = {
      tools: {
        data: toolsData?.data || [],
        error: !toolsData ? "Tools data unavailable" : null,
      },
      search: {
        data: searchData || [],
        error: !searchData ? "Search data unavailable" : null,
      },
      feedback: {
        data: feedbackData || [],
        error: !feedbackData ? "Feedback data unavailable" : null,
      },
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Error fetching dashboard data" }, { status: 500 })
  }
}

