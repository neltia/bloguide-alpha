const API_BASE_URL = "/api"

export async function fetchFromAPI(endpoint: string, params: Record<string, string>) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }
  return response.json()
}

