'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/dashboard/Header'
import { api } from '@/lib/api'
import { Progress } from '@/components/ui/progress'
import { Target, Trophy, Coins, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

export default function GoalsPage() {
  const [userSummary, setUserSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [goalInput, setGoalInput] = useState('')
  const [isSettingGoal, setIsSettingGoal] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [showGoalForm, setShowGoalForm] = useState(false)

  useEffect(() => {
    fetchUserSummary()
  }, [])

  const fetchUserSummary = async () => {
    try {
      const userDataStr = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null
      const userData = userDataStr ? JSON.parse(userDataStr) : null
      const userId = userData?.id || 1

      const summary = await api.getUserSummary(userId)
      setUserSummary(summary)
      setGoalInput(summary.weeklyGoalG?.toString() || '500')
    } catch (error) {
      console.error('Error fetching user summary:', error)
      toast.error('Veriler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSetGoal = async () => {
    const goalValue = parseInt(goalInput)
    
    if (isNaN(goalValue) || goalValue < 50 || goalValue > 2000) {
      toast.error('Hedef 50-2000 g CO₂ arasında olmalıdır')
      return
    }

    setIsSettingGoal(true)
    try {
      const userDataStr = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null
      const userData = userDataStr ? JSON.parse(userDataStr) : null
      const userId = userData?.id || 1

      await api.setWeeklyGoal(userId, goalValue)
      toast.success('Hedef başarıyla güncellendi!')
      setShowGoalForm(false)
      await fetchUserSummary()
    } catch (error) {
      console.error('Error setting goal:', error)
      toast.error('Hedef güncellenirken bir hata oluştu')
    } finally {
      setIsSettingGoal(false)
    }
  }

  const handleRedeemTokens = async () => {
    setIsRedeeming(true)
    try {
      const userDataStr = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null
      const userData = userDataStr ? JSON.parse(userDataStr) : null
      const userId = userData?.id || 1

      const result = await api.redeemTokens(userId)
      
      if (result.tokens > 0) {
        toast.success(`🎉 Tebrikler! ${result.tokens} Yeşil Jeton kazandınız!`)
        await fetchUserSummary()
      } else {
        toast.info(result.message || 'Hedefinize henüz ulaşmadınız')
      }
    } catch (error) {
      console.error('Error redeeming tokens:', error)
      toast.error('Jeton alınırken bir hata oluştu')
    } finally {
      setIsRedeeming(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-600">Yükleniyor...</div>
          </div>
        </div>
      </div>
    )
  }

  const progress = userSummary?.goalProgress || 0
  const weeklyGoalG = userSummary?.weeklyGoalG || 500
  const weeklyAverage = userSummary?.weeklyAverage || 0
  const isGoalCompleted = progress >= 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Yeşil Hedefler
          </h1>
          <p className="text-gray-600">
            Haftalık karbon ayak izi hedefinizi belirleyin ve takip edin
          </p>
        </div>

        {/* Current Goal Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Bu Hafta &lt; {weeklyGoalG} g CO₂
              </h2>
            </div>
            <button
              onClick={() => setShowGoalForm(!showGoalForm)}
              className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              {showGoalForm ? 'İptal' : 'Hedef Değiştir'}
            </button>
          </div>

          {/* Goal Form */}
          {showGoalForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Haftalık Hedef (g CO₂)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  min="50"
                  max="2000"
                  step="10"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="500"
                />
                <button
                  onClick={handleSetGoal}
                  disabled={isSettingGoal}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSettingGoal ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Minimum 50g, maksimum 2000g
              </p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Günlük Artış
              </span>
              <span className="text-lg font-semibold text-green-600">
                %{Math.round(progress)} doldu
              </span>
            </div>
            <Progress 
              value={Math.min(progress, 100)} 
              className="h-4 bg-gray-200"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {weeklyAverage.toFixed(1)}g / {weeklyGoalG}g CO₂
              </span>
              {isGoalCompleted && (
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Hedef Tamamlandı!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Token Reward Card */}
        {isGoalCompleted && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-sm border border-green-200 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-full p-3">
                <Coins className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🎉 Hedefinizi Tamamladınız!
                </h3>
                <p className="text-gray-700 mb-4">
                  Haftalık hedefinize ulaştığınız için Yeşil Jeton kazanabilirsiniz. 
                  Jetonlarınızı lig sisteminde kullanabilirsiniz.
                </p>
                <button
                  onClick={handleRedeemTokens}
                  disabled={isRedeeming}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Trophy className="h-5 w-5" />
                  {isRedeeming ? 'Jeton Alınıyor...' : 'Yeşil Jeton Al'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Info Card */}
        {!isGoalCompleted && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Hedefinize Ulaşmak İçin
                </h3>
                <p className="text-gray-700">
                  Hedefinize ulaşmak için{' '}
                  <span className="font-semibold text-green-600">
                    {Math.max(0, weeklyGoalG - weeklyAverage).toFixed(1)}g
                  </span>{' '}
                  daha az CO₂ üretmeniz gerekiyor. Öneriler sayfasından size özel 
                  tavsiyeleri inceleyebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Haftalık Ortalama</div>
            <div className="text-2xl font-bold text-gray-900">
              {weeklyAverage.toFixed(1)}g
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Haftalık Hedef</div>
            <div className="text-2xl font-bold text-green-600">
              {weeklyGoalG}g
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">İlerleme</div>
            <div className="text-2xl font-bold text-blue-600">
              %{Math.round(progress)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

