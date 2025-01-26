import { fetchFromAPI } from "../utils"

export async function imageSearchHandler(searchParams: URLSearchParams) {
  return await fetchFromAPI("image-search", {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
  })
}

