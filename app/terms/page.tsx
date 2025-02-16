"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from "react"

export default function TermsOfService() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-8">이용약관 및 개인정보 처리방침</h1>

          <div className="prose prose-sm prose-quoteless max-w-none">
            <section id="chapter1" className="mb-8">
              <h2 id="chapter1" className="text-2xl font-bold mb-4">
                제1장 총칙
              </h2>

              <h3 id="section1" className="text-xl font-semibold mb-3">
                제1조 목적
              </h3>
              <p className="mb-4">
                이 약관은 블로가이드(이하 &quot;BloGuide&quot;)가 온라인으로 제공하는 모든 서비스 및 이에
                부수하는 네트워크, 웹 사이트, 기타 서비스(이하 &quot;서비스&quot;라 합니다) 이용에 대한
                &quot;BloGuide&quot;와 서비스 이용자의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
                합니다.
              </p>

              <h3 id="section2" className="text-xl font-semibold mb-3">
                제2조 용어의 정의
              </h3>
              <p className="mb-2">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
              <ol className="list-decimal list-inside mb-4 pl-4">
                <li className="mb-2">
                  &quot;BloGuide&quot;라 함은 온라인을 통하여 특정 콘텐츠를 제공하는 플랫폼을 의미합니다.
                </li>
                <li className="mb-2">
                  &quot;사용자&quot;란 이 약관에 따라 콘텐츠를 제공받는 서비스를 이용하는 자를 의미합니다.
                </li>
                <li className="mb-2">
                  &quot;모든 서비스&quot;라 함은 &quot;BloGuide&quot;가 제공하는 서비스의 하나로, 사용자가 웹 사이트에서
                  실행하는 모든 서비스 및 이에 부수하는 서비스를 의미합니다.
                </li>
              </ol>

              <h3 id="section3" className="text-xl font-semibold mb-3">
                제3조 정보 등의 제공
              </h3>
              <p className="mb-4">
                &quot;BloGuide&quot;는 다음과 같은 정보를 서비스 이용자에게 제공합니다. 단, 개인정보보호법과 약관은
                회원의 연령화면을 통하여 볼 수 있도록 할 수 있습니다.
              </p>

              <h3 id="section4" className="text-xl font-semibold mb-3">
                제4조 약관 외 준칙
              </h3>
              <p className="mb-4">
                이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 「전자상거래 등에서의 소비자보호에 관한
                법률」, 「약관의 규제에 관한 법률」, 「모든 서비스선진흥에 관한 법률」, 「정보통신망이용촉진 및 정보보호
                등에 관한 법률」, 「콘텐츠산업진흥법」등 관련 법령 또는 상 관례에 따릅니다.
              </p>
            </section>

            <section id="chapter2" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">서비스 약관 및 개인정보 보호정책</h2>

              <h3 id="section5" className="text-xl font-semibold mb-3">
                제5조 서비스의 제공
              </h3>
              <p className="mb-4">① &quot;BloGuide&quot;는 다음과 같은 서비스를 제공합니다:</p>
              <ul className="list-disc list-inside mb-4 pl-4">
                <li>블로그 작성 및 관리 도구</li>
                <li>블로그 분석 도구</li>
                <li>콘텐츠 최적화 도구</li>
                <li>기타 블로그 운영에 필요한 부가 서비스</li>
              </ul>
              <p className="mb-4">
                ② &quot;BloGuide&quot;는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 이러한 경우 사전에
                공지합니다.
              </p>

              <h3 id="section6" className="text-xl font-semibold mb-3">
                제6조 서비스 이용 시간
              </h3>
              <p className="mb-4">
                ① 서비스 이용은 &quot;BloGuide&quot;의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간
                운영을 원칙으로 합니다.
              </p>
              <p className="mb-4">
                ② 제1항의 이용 시간은 정기점검 등의 필요로 인하여 &quot;BloGuide&quot;가 정한 날이나 시간에 대해서는
                예외적으로 적용되지 않을 수 있습니다.
              </p>
            </section>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <Card className="sticky top-4">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">목차</h3>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <nav className="space-y-2">
                  {[
                    {
                      id: "chapter1",
                      title: "제1장 총칙",
                      subsections: [
                        { id: "section1", title: "제1조 목적" },
                        { id: "section2", title: "제2조 용어의 정의" },
                        { id: "section3", title: "제3조 정보 등의 제공" },
                        { id: "section4", title: "제4조 약관 외 준칙" },
                      ],
                    },
                    {
                      id: "chapter2",
                      title: "서비스 약관 및 개인정보 보호정책",
                      subsections: [
                        { id: "section5", title: "제5조 서비스의 제공" },
                        { id: "section6", title: "제6조 서비스 이용 시간" },
                      ],
                    },
                  ].map((chapter) => (
                    <div key={chapter.id}>
                      <a
                        href={`#${chapter.id}`}
                        className="block text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      >
                        {chapter.title}
                      </a>
                      <div className="pl-4 space-y-2 mt-2">
                        {chapter.subsections.map((subsection) => (
                          <a
                            key={subsection.id}
                            href={`#${subsection.id}`}
                            className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                          >
                            {subsection.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

