'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

export function CarbonCard({ totalGCo2, dailyAverage, weeklyAverage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <CardTitle>Karbon Ayak İzi</CardTitle>
          </div>
          <CardDescription>Günlük ve haftalık karbon tüketiminiz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-primary">
                {totalGCo2.toFixed(0)} g
              </div>
              <p className="text-sm text-muted-foreground">Haftalık Toplam</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xl font-semibold">{dailyAverage.toFixed(0)} g</div>
                <p className="text-xs text-muted-foreground">Günlük Ortalama</p>
              </div>
              <div>
                <div className="text-xl font-semibold">{weeklyAverage.toFixed(0)} g</div>
                <p className="text-xs text-muted-foreground">Haftalık Ortalama</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

