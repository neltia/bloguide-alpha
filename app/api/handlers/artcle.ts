import { fetchFromAPI } from "../utils"

export async function articleHandler(id: string) {
  const articleData = await fetchFromAPI(`article/${id}`, {})
  const profileData = await fetchFromAPI(`profile/${articleData.authorId}`, {})
  return { article: articleData, profile: profileData }
}

