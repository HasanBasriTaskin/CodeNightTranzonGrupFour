'use client'

import { Header } from '@/components/dashboard/Header'
import { CircularProgress } from '@/components/dashboard/CircularProgress'
import { WeeklyProgress } from '@/components/dashboard/WeeklyProgress'
import { GreenTip } from '@/components/dashboard/GreenTip'
import { ImpactSummary } from '@/components/dashboard/ImpactSummary'
import { SevenDayTrend } from '@/components/dashboard/SevenDayTrend'
import { toast } from 'sonner'

export default function Dashboard() {
  const handleTipComplete = () => {
    toast.success('Harika! Yeşil ipucunu tamamladınız 🌱')
  }

  // Mock data - in production, this would come from API
  const todayCarbon = 1.2
  const dailyGoal = 2.0
  const weeklyCurrent = 10.5
  const weeklyTotal = 14.0
  const greenTip = "HD'den SD'ye video akış kalitesini bir cihazda bir saat boyunca düşürerek 0.5 kg CO2'ye kadar tasarruf edin."

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Message */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Tekrar hoş geldin, Elif!</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 max-w-5xl mx-auto">
          {/* Left Column - Top */}
          <div>
            <CircularProgress 
              value={todayCarbon}
              max={dailyGoal}
              unit="kg"
              label="CO2"
            />
          </div>

          {/* Right Column - Top */}
          <div>
            <WeeklyProgress 
              current={weeklyCurrent}
              total={weeklyTotal}
              unit="kg"
            />
          </div>
        </div>

        {/* Green Tip Card */}
        <div className="mb-6 max-w-5xl mx-auto">
          <GreenTip 
            tip={greenTip}
            onComplete={handleTipComplete}
          />
        </div>

        {/* Impact Summary */}
        <div className="mb-6 max-w-5xl mx-auto">
          <ImpactSummary />
        </div>

        {/* 7-Day Trend */}
        <div className="max-w-5xl mx-auto">
          <SevenDayTrend />
        </div>
      </div>
    </div>
  )
}
