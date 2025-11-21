'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/dashboard/Header'
import { api } from '@/lib/api'
import { Lightbulb, TrendingDown, CheckCircle2 } from 'lucide-react'

export default function RecommendationsPage() {
  const [userData, setUserData] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user ID from localStorage
        const userDataStr = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null
        const userData = userDataStr ? JSON.parse(userDataStr) : null
        const userId = userData?.id || 1

        const data = await api.getUserData(userId)
        setUserData(data)
        
        // Generate recommendations based on user data
        const recs = generateRecommendations(data)
        setRecommendations(recs)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const generateRecommendations = (data) => {
    const recs = []

    // Internet data usage recommendation
    if (data?.internet_gb > 10) {
      const savings = Math.round((data.internet_gb - 10) * 55) // 55g per GB over 10
      recs.push({
        id: 'internet',
        title: 'Veri kullanımını azalt',
        description: `Günlük veri kullanımınız ${data.internet_gb} GB. Veri kullanımınızı azaltarak ${savings}g CO₂ tasarruf edebilirsin.`,
        savings: savings,
        category: 'İnternet',
        icon: '📱',
      })
    }

    // Electricity usage recommendation
    if (data?.electricity_kwh > 100) {
      const savings = Math.round((data.electricity_kwh - 100) * 5) // 5g per kWh over 100
      recs.push({
        id: 'electricity',
        title: 'Elektrik kullanımını azalt',
        description: `Aylık elektrik kullanımınız ${data.electricity_kwh} kWh. Enerji tasarrufu yaparak ${savings}g CO₂ tasarruf edebilirsin.`,
        savings: savings,
        category: 'Enerji',
        icon: '⚡',
      })
    }

    // Transportation recommendation
    if (data?.transportation_km > 30) {
      const savings = Math.round((data.transportation_km - 30) * 20) // 20g per km over 30
      recs.push({
        id: 'transportation',
        title: 'Toplu taşıma kullan',
        description: `Günlük ulaşım mesafeniz ${data.transportation_km} km. Toplu taşıma kullanarak ${savings}g CO₂ tasarruf edebilirsin.`,
        savings: savings,
        category: 'Ulaşım',
        icon: '🚌',
      })
    }

    // Water usage recommendation
    if (data?.water_liters > 150) {
      const savings = Math.round((data.water_liters - 150) * 0.5) // 0.5g per liter over 150
      recs.push({
        id: 'water',
        title: 'Su kullanımını azalt',
        description: `Günlük su kullanımınız ${data.water_liters} litre. Su tasarrufu yaparak ${savings}g CO₂ tasarruf edebilirsin.`,
        savings: savings,
        category: 'Su',
        icon: '💧',
      })
    }

    // Sort by savings (highest first)
    return recs.sort((a, b) => b.savings - a.savings)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Öneriler
          </h1>
          <p className="text-gray-600">
            Karbon ayak izinizi azaltmak için size özel öneriler
          </p>
        </div>

        {/* Recommendations List */}
        {recommendations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Harika! 🎉
            </h3>
            <p className="text-gray-600">
              Şu anda size özel bir öneri bulunmuyor. Karbon ayak iziniz iyi durumda!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-4xl">{rec.icon}</div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="h-5 w-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {rec.title}
                          </h3>
                        </div>
                        <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded">
                          {rec.category}
                        </span>
                      </div>
                      
                      {/* Savings Badge */}
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-600">
                          {rec.savings}g CO₂
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

