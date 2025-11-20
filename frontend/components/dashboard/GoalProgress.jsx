'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

export function GoalProgress({ goalProgress, ecoLevel, weeklyGoalG }) {
  const progressColor = goalProgress > 100 ? 'bg-destructive' : 'bg-primary'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle>Hedef İlerlemesi</CardTitle>
            </div>
            <Badge variant="secondary">{ecoLevel}</Badge>
          </div>
          <CardDescription>Haftalık hedef: {weeklyGoalG.toFixed(0)} g CO₂</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>İlerleme</span>
                <span className="font-semibold">{goalProgress.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(goalProgress, 100)} className="h-3" />
            </div>
            {goalProgress < 100 && (
              <p className="text-sm text-muted-foreground">
                Hedefinize ulaşmak için {Math.max(0, (weeklyGoalG - (weeklyGoalG * goalProgress / 100))).toFixed(0)} g daha azaltmanız gerekiyor.
              </p>
            )}
            {goalProgress >= 100 && (
              <p className="text-sm text-green-600 font-medium">
                🎉 Tebrikler! Hedefinizi aştınız!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

