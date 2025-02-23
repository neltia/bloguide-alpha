"use client"

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "메인",
    visits: 4000,
    uniqueVisitors: 2400,
  },
  {
    name: "도구",
    visits: 3000,
    uniqueVisitors: 1398,
  },
  {
    name: "URL 인코더",
    visits: 2000,
    uniqueVisitors: 980,
  },
  {
    name: "퍼센트 계산기",
    visits: 2780,
    uniqueVisitors: 1908,
  },
  {
    name: "Base64",
    visits: 1890,
    uniqueVisitors: 800,
  },
  {
    name: "D-Day",
    visits: 2390,
    uniqueVisitors: 1200,
  },
]

export function PageVisits() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="visits" name="총 방문수" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="uniqueVisitors" name="순 방문자" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

