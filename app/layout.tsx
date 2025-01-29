import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from 'next'
import "./globals.css"
import "./styles/custom.css"

export const metadata: Metadata = {
  title: 'bloguide alpha',
  description: 'BloGuide는 블로그 작성, 관리, 그리고 분석을 위한 종합 플랫폼입니다.',
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

