import { NextResponse } from "next/server"

// Sample data generator for testing
function generateSampleData(days: number) {
  const data = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.floor(Math.random() * 100),
    })
  }
  return data
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get("keyword")
  const timeframe = searchParams.get("timeframe")

  if (!keyword) {
    return NextResponse.json({ error: "키워드를 입력해주세요." }, { status: 400 })
  }

  if (!timeframe) {
    return NextResponse.json({ error: "기간을 선택해주세요." }, { status: 400 })
  }

  try {
    // In a real application, you would call your actual trends API here
    // For now, we'll generate sample data based on the timeframe
    const days = timeframe === "now 7-d" ? 7 : timeframe === "now 30-d" ? 30 : 90
    const data = generateSampleData(days)

    return NextResponse.json({
      keyword,
      timeframe,
      data,
    })
  } catch (error) {
    console.error("Error fetching trend data:", error)
    return NextResponse.json({ error: "트렌드 데이터를 불러오는 중 오류가 발생했습니다." }, { status: 500 })
  }
}

