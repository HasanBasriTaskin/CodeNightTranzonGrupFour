'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Trees, Droplet, Recycle } from 'lucide-react'

const impactItems = [
  {
    icon: Trees,
    label: 'Bu Ay Kurtarılan Ağaç',
    value: 3,
    unit: '',
    color: 'text-green-600',
  },
  {
    icon: Droplet,
    label: 'Su Tasarrufu',
    value: 150,
    unit: 'L',
    color: 'text-green-600',
  },
  {
    icon: Recycle,
    label: 'Dijital Atık Azaltıldı',
    value: 5,
    unit: 'kg',
    color: 'text-green-600',
  },
]

export function ImpactSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {impactItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`${item.color} flex-shrink-0`}>
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    <strong>{item.value}</strong>
                    {item.unit && <span className="text-base sm:text-lg ml-1 font-normal">{item.unit}</span>}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

