'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Trophy, Leaf, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function TeamsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // 20 grup için mock data oluştur
  const allTeams = Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    team: [
      'Karbon Avcıları',
      'Eko Savaşçılar',
      'Gezegen Koruyucuları',
      'Yeşil Devler',
      'Sürdürülebilirlik Takımı',
      'Doğa Dostları',
      'Çevre Kahramanları',
      'Yeşil Yıldızlar',
      'Temiz Hava Timi',
      'Enerji Tasarrufçuları',
      'Geri Dönüşüm Uzmanları',
      'Su Koruyucuları',
      'Orman Bekçileri',
      'İklim Savunucuları',
      'Yeşil Gelecek',
      'Eko İnovasyon',
      'Sürdürülebilir Yaşam',
      'Doğa Sevdalıları',
      'Çevre Bilinci',
      'Yeşil Adımlar'
    ][i] || `Takım ${i + 1}`,
    members: Math.floor(Math.random() * 10) + 1,
    avgCO2: (Math.random() * 2 + 1.5).toFixed(1),
    isUserTeam: i === 1, // İkinci takım kullanıcının takımı
  }))

  const totalPages = Math.ceil(allTeams.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTeams = allTeams.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link 
              href="/dashboard/league" 
              className="text-green-600 hover:text-green-700 text-sm font-medium mb-2 inline-block"
            >
              ← Lig Sistemine Dön
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Tüm Takımlar</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Bu Hafta</span>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Yeşil Liderlik Tablosu</h2>
            <p className="text-gray-600 text-sm">
              En düşük haftalık ortalama karbon tüketimine sahip takımlar. Düşük olan daha iyidir!
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sıra</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Takım</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Üyeler</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Ort. CO2</th>
                </tr>
              </thead>
              <tbody>
                {currentTeams.map((team) => (
                  <tr 
                    key={team.rank}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${team.isUserTeam ? 'bg-green-50' : ''}`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {team.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                        {team.rank === 2 && <Trophy className="h-5 w-5 text-gray-400" />}
                        {team.rank === 3 && <Trophy className="h-5 w-5 text-amber-600" />}
                        {team.rank > 3 && <span className="text-gray-500 font-medium">{team.rank}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {team.isUserTeam && <Leaf className="h-4 w-4 text-green-600" />}
                        <span className="font-medium text-gray-900">
                          {team.team} {team.isUserTeam && <span className="text-green-600 text-sm">(Takımınız)</span>}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{team.members}</td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">{team.avgCO2} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600">
            Toplam <span className="font-semibold text-gray-900">{allTeams.length}</span> takımdan{' '}
            <span className="font-semibold text-gray-900">{startIndex + 1}</span> -{' '}
            <span className="font-semibold text-gray-900">
              {Math.min(endIndex, allTeams.length)}
            </span>{' '}
            arası gösteriliyor
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // İlk sayfa, son sayfa, mevcut sayfa ve yakındaki sayfaları göster
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-green-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-400">...</span>
                }
                return null
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

