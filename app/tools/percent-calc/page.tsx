"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function PercentCalculator() {
  // State for the first calculation
  const [totalValue1, setTotalValue1] = useState("")
  const [percentage1, setPercentage1] = useState("")
  const [result1, setResult1] = useState<number | null>(null)

  // State for the second calculation
  const [totalValue2, setTotalValue2] = useState("")
  const [partialValue2, setPartialValue2] = useState("")
  const [result2, setResult2] = useState<number | null>(null)

  // State for the third calculation
  const [baseValue3, setBaseValue3] = useState("")
  const [changePercentage3, setChangePercentage3] = useState("")
  const [result3, setResult3] = useState<number | null>(null)

  // State for the fourth calculation
  const [baseValue4, setBaseValue4] = useState("")
  const [newValue4, setNewValue4] = useState("")
  const [result4, setResult4] = useState<number | null>(null)

  const calculatePercentage = () => {
    const total = Number.parseFloat(totalValue1)
    const percent = Number.parseFloat(percentage1)
    if (!isNaN(total) && !isNaN(percent)) {
      setResult1((total * percent) / 100)
    } else {
      setResult1(null)
    }
  }

  const calculatePartialPercentage = () => {
    const total = Number.parseFloat(totalValue2)
    const partial = Number.parseFloat(partialValue2)
    if (!isNaN(total) && !isNaN(partial) && total !== 0) {
      setResult2((partial / total) * 100)
    } else {
      setResult2(null)
    }
  }

  const calculateChangeResult = () => {
    const base = Number.parseFloat(baseValue3)
    const change = Number.parseFloat(changePercentage3)
    if (!isNaN(base) && !isNaN(change)) {
      setResult3(base * (1 + change / 100))
    } else {
      setResult3(null)
    }
  }

  const calculateChangePercentage = () => {
    const base = Number.parseFloat(baseValue4)
    const newVal = Number.parseFloat(newValue4)
    if (!isNaN(base) && !isNaN(newVal) && base !== 0) {
      setResult4(((newVal - base) / base) * 100)
    } else {
      setResult4(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>퍼센트 계산기</CardTitle>
          <CardDescription>다양한 퍼센트 계산을 수행합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calc1">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="calc1">비율 계산</TabsTrigger>
              <TabsTrigger value="calc2">부분값 계산</TabsTrigger>
              <TabsTrigger value="calc3">증감 계산</TabsTrigger>
              <TabsTrigger value="calc4">변화율 계산</TabsTrigger>
            </TabsList>
            <TabsContent value="calc1">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="totalValue1">전체 값</Label>
                  <Input
                    id="totalValue1"
                    type="number"
                    value={totalValue1}
                    onChange={(e) => setTotalValue1(e.target.value)}
                    placeholder="전체 값을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="percentage1">비율 (%)</Label>
                  <Input
                    id="percentage1"
                    type="number"
                    value={percentage1}
                    onChange={(e) => setPercentage1(e.target.value)}
                    placeholder="비율을 입력하세요"
                  />
                </div>
                <Button onClick={calculatePercentage}>계산</Button>
                {result1 !== null && (
                  <div className="mt-4">
                    <Label>결과</Label>
                    <p className="text-2xl font-bold">{result1.toFixed(2)}</p>
                    <p>
                      {totalValue1}에서 {percentage1}%는 {result1.toFixed(2)}입니다.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="calc2">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="totalValue2">전체 값</Label>
                  <Input
                    id="totalValue2"
                    type="number"
                    value={totalValue2}
                    onChange={(e) => setTotalValue2(e.target.value)}
                    placeholder="전체 값을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="partialValue2">일부 값</Label>
                  <Input
                    id="partialValue2"
                    type="number"
                    value={partialValue2}
                    onChange={(e) => setPartialValue2(e.target.value)}
                    placeholder="일부 값을 입력하세요"
                  />
                </div>
                <Button onClick={calculatePartialPercentage}>계산</Button>
                {result2 !== null && (
                  <div className="mt-4">
                    <Label>결과</Label>
                    <p className="text-2xl font-bold">{result2.toFixed(2)}%</p>
                    <p>
                      {totalValue2}에서 {partialValue2}는 {result2.toFixed(2)}%입니다.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="calc3">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="baseValue3">기준 값</Label>
                  <Input
                    id="baseValue3"
                    type="number"
                    value={baseValue3}
                    onChange={(e) => setBaseValue3(e.target.value)}
                    placeholder="기준 값을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="changePercentage3">변경 비율 (%)</Label>
                  <Input
                    id="changePercentage3"
                    type="number"
                    value={changePercentage3}
                    onChange={(e) => setChangePercentage3(e.target.value)}
                    placeholder="변경 비율을 입력하세요"
                  />
                </div>
                <Button onClick={calculateChangeResult}>계산</Button>
                {result3 !== null && (
                  <div className="mt-4">
                    <Label>결과</Label>
                    <p className="text-2xl font-bold">{result3.toFixed(2)}</p>
                    <p>
                      {baseValue3}에서 {changePercentage3}% 만큼 변경되면 {result3.toFixed(2)}입니다.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="calc4">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="baseValue4">기준 값</Label>
                  <Input
                    id="baseValue4"
                    type="number"
                    value={baseValue4}
                    onChange={(e) => setBaseValue4(e.target.value)}
                    placeholder="기준 값을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="newValue4">변경 값</Label>
                  <Input
                    id="newValue4"
                    type="number"
                    value={newValue4}
                    onChange={(e) => setNewValue4(e.target.value)}
                    placeholder="변경 값을 입력하세요"
                  />
                </div>
                <Button onClick={calculateChangePercentage}>계산</Button>
                {result4 !== null && (
                  <div className="mt-4">
                    <Label>결과</Label>
                    <p className="text-2xl font-bold">{result4.toFixed(2)}%</p>
                    <p>
                      {baseValue4}에서 {newValue4}로 변경되면 {result4 > 0 ? "증가" : "감소"}율은{" "}
                      {Math.abs(result4).toFixed(2)}%입니다.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

