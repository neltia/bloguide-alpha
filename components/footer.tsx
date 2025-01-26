import { BookOpen, Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">BloGuide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">블로그 작성 및 관리를 위한 종합 플랫폼</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/notice" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  공지사항
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">법적 고지</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  서비스 이용약관
                </Link>
              </li>
              <li>
                <Link href="/open-source" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  오픈 소스
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} BloGuide. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://blog.naver.com/dsz08082"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Naver Blog</span>
                <BookOpen className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/neltia"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

