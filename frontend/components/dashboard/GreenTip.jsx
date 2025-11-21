'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function GreenTip({ tip, onComplete }) {
  return (
    <Card className="bg-blue-50 border-blue-200 shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3">Bugünün Yeşil İpucu</h3>
        <p className="text-xs sm:text-sm text-blue-800 mb-4 leading-relaxed">{tip}</p>
        <Button
          onClick={onComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          Bunu Yaptım!
        </Button>
      </CardContent>
    </Card>
  )
}

