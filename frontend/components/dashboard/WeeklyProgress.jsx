'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function WeeklyProgress({ current, total, unit = 'kg' }) {
  const percentage = Math.min((current / total) * 100, 100)

  return (
    <Card className="bg-white border-gray-200 shadow-sm h-full">
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Haftalık İlerlemeniz</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-600">
              {current.toFixed(1)} {unit} / {total.toFixed(1)} {unit}
            </span>
            <span className="text-sm sm:text-base font-semibold text-green-600">{Math.round(percentage)}%</span>
          </div>
          <Progress 
            value={percentage} 
            className="h-3 sm:h-4 bg-gray-200"
          />
        </div>
      </CardContent>
    </Card>
  )
}

