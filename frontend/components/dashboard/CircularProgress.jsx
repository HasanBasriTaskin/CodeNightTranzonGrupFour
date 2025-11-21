'use client'

import { Card, CardContent } from '@/components/ui/card'

export function CircularProgress({ value, max, unit = 'kg', label = 'CO2' }) {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <Card className="bg-white border-gray-200 shadow-sm h-full">
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Bugünün Karbon Ayak İzi</h3>
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52">
            {/* Background circle */}
            <svg className="transform -rotate-90 w-44 h-44 sm:w-52 sm:h-52" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#22c55e"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-bold text-green-600">{value.toFixed(1)}</span>
              <span className="text-sm text-gray-500 mt-1">{label}</span>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-gray-600">
              Günlük Hedef: <span className="font-semibold">{max.toFixed(1)} {unit}</span>. Günlük hedefinize ulaşmak için doğru yoldasınız. Devam edin!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

