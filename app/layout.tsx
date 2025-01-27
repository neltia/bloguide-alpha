import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import "./styles/custom.css"

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

