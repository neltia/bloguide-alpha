"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function Feedback() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedbackType, setFeedbackType] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, feedback_type: feedbackType, message }),
      })

      if (response.ok) {
        // Reset form
        setName("")
        setEmail("")
        setFeedbackType("")
        setMessage("")
        alert("피드백이 성공적으로 제출되었습니다. 감사합니다!")
      } else {
        throw new Error("피드백 제출에 실패했습니다.")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert(error instanceof Error ? error.message : "피드백 제출 중 오류가 발생했습니다. 다시 시도해 주세요.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">피드백 및 제안</h1>
      <p className="mb-8 text-lg">
        BloGuide를 개선하는 데 도움이 되는 여러분의 의견을 기다립니다. 피드백이나 새로운 기능 제안을 아래 양식을 통해
        보내주세요.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>피드백 양식</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                이름
              </label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="홍길동" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                피드백 유형
              </label>
              <Select value={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger>
                  <SelectValue placeholder="피드백 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">버그 리포트</SelectItem>
                  <SelectItem value="feature">새 기능 제안</SelectItem>
                  <SelectItem value="improvement">개선 제안</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                메시지
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="여기에 자세한 피드백이나 제안을 적어주세요."
                rows={5}
              />
            </div>
            <Button type="submit">제출하기</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

