'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { CarbonCard } from '@/components/dashboard/CarbonCard'
import { GoalProgress } from '@/components/dashboard/GoalProgress'
import { Recommendations } from '@/components/dashboard/Recommendations'
import { CarbonChart } from '@/components/dashboard/CarbonChart'
import { SetGoalForm } from '@/components/dashboard/SetGoalForm'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Trophy, RefreshCw } from 'lucide-react'
import Link from 'next/link'

// Mock user ID - in production, this would come from auth
const USER_ID = 1

export default function Dashboard() {
  const queryClient = useQueryClient()

  const { data: summary, isLoading, error } = useQuery({
    queryKey: ['userSummary', USER_ID],
    queryFn: () => api.getUserSummary(USER_ID),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const redeemMutation = useMutation({
    mutationFn: () => api.redeemTokens(USER_ID),
    onSuccess: (data) => {
      if (data.tokens > 0) {
        toast.success(`${data.tokens.toFixed(0)} Yeşil Jeton kazandınız! 🎉`)
      } else {
        toast.info('Hedefinize henüz ulaşmadınız. Devam edin!')
      }
      queryClient.invalidateQueries({ queryKey: ['userSummary', USER_ID] })
    },
    onError: () => {
      toast.error('Jeton alınırken bir hata oluştu')
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Veri yüklenirken bir hata oluştu</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['userSummary', USER_ID] })}>
            Tekrar Dene
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                🌱 GreenConnect
              </h1>
              <p className="text-muted-foreground">
                Yeşil yaşam takip sisteminiz
              </p>
            </div>
            <Link href="/leaderboard">
              <Button variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                Liderlik Tablosu
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CarbonCard
              totalGCo2={summary?.totalGCo2 || 0}
              dailyAverage={summary?.dailyAverage || 0}
              weeklyAverage={summary?.weeklyAverage || 0}
            />
            <CarbonChart />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <GoalProgress
              goalProgress={summary?.goalProgress || 0}
              ecoLevel={summary?.ecoLevel || 'Bronze'}
              weeklyGoalG={summary?.weeklyGoalG || 500}
            />
            <SetGoalForm userId={USER_ID} currentGoal={summary?.weeklyGoalG || 500} />
            <Button
              onClick={() => redeemMutation.mutate()}
              disabled={redeemMutation.isPending}
              className="w-full"
              variant="secondary"
            >
              {redeemMutation.isPending ? 'İşleniyor...' : 'Yeşil Jeton Al'}
            </Button>
          </div>
        </div>

        {/* Recommendations */}
        <Recommendations recommendations={summary?.recommendations || []} />
      </div>
    </div>
  )
}

