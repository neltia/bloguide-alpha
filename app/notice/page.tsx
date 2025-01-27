"use client"

import { ErrorDisplay } from "@/components/error-display"
import { NoticeBoard } from "@/components/notice-board"
import { useEffect, useState } from "react"

export default function NoticePage() {
  const [notices, setNotices] = useState([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notice/list")
        if (!response.ok) {
          throw new Error("Failed to fetch notices")
        }
        const data = await response.json()
        setNotices(data)
      } catch (error) {
        console.error("Error fetching notices:", error)
        setError("공지사항을 불러오는 데 실패했습니다. 테스트 데이터를 표시합니다.")
        // Use test data if API call fails
        setNotices(sampleNotices)
      }
    }

    fetchNotices()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">공지사항</h1>
      <p className="text-gray-600 mb-6">BloGuide의 최신 소식과 업데이트를 확인하세요.</p>
      {error && (
        <div className="mb-6">
          <ErrorDisplay message={error} />
        </div>
      )}
      <NoticeBoard notices={notices} />
    </div>
  )
}

// Sample notices data (moved from NoticeBoard component)
const sampleNotices = [
  {
    id: 1,
    title: "BloGuide 베타 서비스 오픈",
    date: "2023-06-20",
    author: "관리자",
    content: "BloGuide 베타 서비스가 오픈되었습니다. 많은 관심과 피드백 부탁드립니다.",
    isImportant: true,
  },
  {
    id: 2,
    title: "6월 업데이트 안내",
    date: "2023-06-15",
    author: "개발팀",
    content: "6월 중 예정된 업데이트 내용을 안내드립니다. 주요 기능 개선 및 버그 수정이 포함되어 있습니다.",
    isImportant: false,
  },
  {
    id: 3,
    title: "커뮤니티 가이드라인 개정",
    date: "2023-06-10",
    author: "운영팀",
    content: "커뮤니티 가이드라인이 개정되었습니다. 모든 사용자들은 개정된 가이드라인을 숙지해주시기 바랍니다.",
    isImportant: true,
  },
  {
    id: 4,
    title: "신규 기능 제안 받습니다",
    date: "2023-06-05",
    author: "기획팀",
    content: "사용자 여러분의 의견을 듣고 싶습니다. BloGuide에 추가되었으면 하는 기능을 제안해주세요.",
    isImportant: false,
  },
  {
    id: 5,
    title: "서비스 점검 안내",
    date: "2023-06-01",
    author: "기술지원팀",
    content: "6월 5일 오전 2시부터 4시까지 서비스 점검이 예정되어 있습니다. 이용에 참고 부탁드립니다.",
    isImportant: true,
  },
]

