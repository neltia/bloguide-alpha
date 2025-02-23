"use client"

import { DetailedAnalytics } from "@/components/admin/detailed-analytics"
import { FeedbackList } from "@/components/admin/feedback-list"
import { PageVisits } from "@/components/admin/page-visits"
import { SearchAnalytics } from "@/components/admin/search-analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, MousePointerClick, Search, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="analytics">상세 분석</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 방문자 수</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">전월 대비 +20.1%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">검색어 입력 수</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">890</div>
                <p className="text-xs text-muted-foreground">전월 대비 +10.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">피드백 수</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">전월 대비 +35.2%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">도구 사용 수</CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">전월 대비 +12.3%</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>페이지별 방문 통계</CardTitle>
                <CardDescription>최근 30일간의 페이지별 방문자 수</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PageVisits />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>인기 검색어</CardTitle>
                <CardDescription>최근 7일간 가장 많이 검색된 키워드</CardDescription>
              </CardHeader>
              <CardContent>
                <SearchAnalytics />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>최근 피드백</CardTitle>
              <CardDescription>최근 접수된 피드백 목록</CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <DetailedAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

