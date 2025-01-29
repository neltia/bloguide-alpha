import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "BloGuide의 알파 버전이란 무엇인가요?",
      answer:
        "BloGuide의 알파 버전은 초기 개발 단계의 서비스입니다. 아직 테스트와 개선이 필요한 상태입니다. 사용자 여러분의 피드백을 바탕으로 서비스를 발전시켜 나갈 예정입니다.",
    },
    {
      question: "알파 버전 사용 중 발견한 문제는 어떻게 보고하나요?",
      answer:
        "문제를 발견하셨다면 '피드백 및 제안' 페이지를 이용해 주세요. 문제 상황을 자세히 설명해 주시면 큰 도움이 됩니다.",
      action: {
        text: "피드백 및 제안 페이지로 이동",
        link: "/feedback",
      },
    },
    {
      question: "향후 기능 출시 일정은 어떻게 되나요?",
      answer:
        "현재 개발 단계에 있습니다. 정확한 일정은 개발 진행 상황에 따라 변경될 수 있으며, 주요 업데이트 내용은 공지사항을 통해 안내해 드리겠습니다.",
    },
    {
      question: "알파 테스트 기간 동안 어떻게 지원을 받을 수 있나요?",
      answer:
        "알파 테스트 기간 동안 지원이 필요하시면 오픈채팅방을 이용해 주세요. 실시간 채팅 지원을 위해 카카오톡 오픈채팅방을 운영하고 있습니다.",
      action: {
        text: "오픈채팅방 바로가기",
        link: "https://open.kakao.com/me/neltia",
      },
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">자주 묻는 질문 (FAQ)</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {faq.answer.split("\n").map((paragraph, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {paragraph}
                </p>
              ))}
              {faq.action && (
                <div className="mt-4">
                  <Link href={faq.action.link} passHref>
                    <Button variant="outline">{faq.action.text}</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

