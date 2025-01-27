"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface CalculatorState {
  totalValue1: string
  percentage1: string
  result1: number | null
  totalValue2: string
  partialValue2: string
  result2: number | null
  baseValue3: string
  changePercentage3: string
  result3: number | null
  baseValue4: string
  newValue4: string
  result4: number | null
}

export default function PercentCalculator() {
  const [values, setValues] = useState<CalculatorState>({
    totalValue1: "",
    percentage1: "",
    result1: null,
    totalValue2: "",
    partialValue2: "",
    result2: null,
    baseValue3: "",
    changePercentage3: "",
    result3: null,
    baseValue4: "",
    newValue4: "",
    result4: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const calculatePercentage = () => {
    const total = Number.parseFloat(values.totalValue1)
    const percent = Number.parseFloat(values.percentage1)
    if (!isNaN(total) && !isNaN(percent)) {
      setValues({ ...values, result1: (total * percent) / 100 })
    }
  }

  const calculatePartialPercentage = () => {
    const total = Number.parseFloat(values.totalValue2)
    const partial = Number.parseFloat(values.partialValue2)
    if (!isNaN(total) && !isNaN(partial) && total !== 0) {
      setValues({ ...values, result2: (partial / total) * 100 })
    }
  }

  const calculateChangeResult = () => {
    const base = Number.parseFloat(values.baseValue3)
    const change = Number.parseFloat(values.changePercentage3)
    if (!isNaN(base) && !isNaN(change)) {
      setValues({ ...values, result3: base * (1 + change / 100) })
    }
  }

  const calculateChangePercentage = () => {
    const base = Number.parseFloat(values.baseValue4)
    const newVal = Number.parseFloat(values.newValue4)
    if (!isNaN(base) && !isNaN(newVal) && base !== 0) {
      setValues({ ...values, result4: ((newVal - base) / base) * 100 })
    }
  }

  const formatResult = (result: number | null): string => {
    return result !== null ? result.toFixed(2) : ""
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">퍼센트 계산기</h1>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="space-y-10 pt-6">
          <div>
            <Label className="text-xl font-semibold mb-2 block">비율 계산</Label>
            <p className="text-sm text-gray-500 mb-4">전체 값의 특정 비율을 계산합니다.</p>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto] gap-2 items-center mb-2">
              <Input
                type="number"
                name="totalValue1"
                value={values.totalValue1}
                onChange={handleInputChange}
                placeholder="전체 값"
              />
              <span>의</span>
              <Input
                type="number"
                name="percentage1"
                value={values.percentage1}
                onChange={handleInputChange}
                placeholder="비율 (%)"
              />
              <span>% =</span>
              <Input type="number" value={formatResult(values.result1)} readOnly />
              <Button onClick={calculatePercentage}>계산</Button>
            </div>
            <p className="text-sm text-gray-500">예: 100의 20%는 20입니다.</p>
          </div>

          <div>
            <Label className="text-xl font-semibold mb-2 block">부분값 계산</Label>
            <p className="text-sm text-gray-500 mb-4">전체 값 중 일부 값이 차지하는 비율을 계산합니다.</p>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto] gap-2 items-center mb-2">
              <Input
                type="number"
                name="partialValue2"
                value={values.partialValue2}
                onChange={handleInputChange}
                placeholder="일부 값"
              />
              <span>÷</span>
              <Input
                type="number"
                name="totalValue2"
                value={values.totalValue2}
                onChange={handleInputChange}
                placeholder="전체 값"
              />
              <span>× 100 =</span>
              <Input type="number" value={formatResult(values.result2)} readOnly />
              <Button onClick={calculatePartialPercentage}>계산</Button>
            </div>
            <p className="text-sm text-gray-500">예: 20은 100의 20%입니다.</p>
          </div>

          <div>
            <Label className="text-xl font-semibold mb-2 block">증감 계산</Label>
            <p className="text-sm text-gray-500 mb-4">기준 값에서 특정 비율만큼 증가 또는 감소한 결과를 계산합니다.</p>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto] gap-2 items-center mb-2">
              <Input
                type="number"
                name="baseValue3"
                value={values.baseValue3}
                onChange={handleInputChange}
                placeholder="기준 값"
              />
              <span>→</span>
              <Input
                type="number"
                name="changePercentage3"
                value={values.changePercentage3}
                onChange={handleInputChange}
                placeholder="변경 비율 (%)"
              />
              <span>=</span>
              <Input type="number" value={formatResult(values.result3)} readOnly />
              <Button onClick={calculateChangeResult}>계산</Button>
            </div>
            <p className="text-sm text-gray-500">
              예: 100에서 20% 증가하면 120입니다. (계산: 100 × (1 + 20% ÷ 100) = 120)
            </p>
          </div>

          <div>
            <Label className="text-xl font-semibold mb-2 block">변화율 계산</Label>
            <p className="text-sm text-gray-500 mb-4">기준 값에서 변경 값으로의 변화율을 계산합니다.</p>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto] gap-2 items-center mb-2">
              <Input
                type="number"
                name="baseValue4"
                value={values.baseValue4}
                onChange={handleInputChange}
                placeholder="기준 값"
              />
              <span>→</span>
              <Input
                type="number"
                name="newValue4"
                value={values.newValue4}
                onChange={handleInputChange}
                placeholder="변경 값"
              />
              <span>=</span>
              <Input type="number" value={formatResult(values.result4)} readOnly placeholder="결과 (%)" />
              <Button onClick={calculateChangePercentage}>계산</Button>
            </div>
            <p className="text-sm text-gray-500">
              예: 100에서 120으로 변경되면 20% 증가입니다. (계산: (120 - 100) ÷ 100 × 100 = 20%)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

