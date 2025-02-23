export async function trackToolUsage(tool: string, duration: number) {
    try {
      const response = await fetch("/api/analytics/tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tool, duration }),
      })

      if (!response.ok) {
        throw new Error("Failed to track tool usage")
      }
    } catch (error) {
      console.error("Error tracking tool usage:", error)
      // Don't throw error to prevent disrupting user experience
    }
  }

