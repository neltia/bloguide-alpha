import { testArticleData, testProfileData } from "@/app/utils/testData"
import { NextResponse } from "next/server"

const routeHandlers: Record<string, (params: any) => Promise<any>> = {
  search: async (searchParams: URLSearchParams) => {
    // Implement search logic here
    throw new Error("Search not implemented")
  },
  article: async (id: string) => {
    // Simulating API call with test data
    return { article: testArticleData, profile: testProfileData }
  },
  "image-search": async (searchParams: URLSearchParams) => {
    // Implement image search logic here
    throw new Error("Image search not implemented")
  },
}

export async function GET(request: Request, { params }: { params: { slug: string[] } }) {
  const { slug } = params
  const { searchParams } = new URL(request.url)

  try {
    const handler = routeHandlers[slug[0]]
    if (!handler) {
      throw new Error(`Invalid API route: ${slug[0]}`)
    }

    let data
    if (slug[0] === "article" && slug[1]) {
      data = await handler(slug[1])
    } else {
      data = await handler(searchParams)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}

