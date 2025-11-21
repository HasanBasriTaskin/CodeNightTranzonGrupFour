'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Trophy, Leaf, Calendar, Search, UserPlus, Users, Award, Zap, X, Recycle, Bike, Droplet, TreePine, Smartphone, Gift, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

export default function LeaguePage() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [copied, setCopied] = useState(false)

  // Mock data
  const userData = {
    name: 'Ahmet Yılmaz',
    team: 'Eco-Warriors',
    points: 1250
  }

  // TODO: Backend'den davet kodunu al
  // Her takım için backend'den 6 haneli davet kodu gelecek
  const getInviteCode = (teamName) => {
    // Mock data - Backend'den gelecek
    // API call: GET /api/teams/{teamId}/invite-code
    return Math.random().toString().slice(2, 8).toUpperCase()
  }

  const handleInviteClick = (team) => {
    setSelectedTeam(team)
    setInviteDialogOpen(true)
    setCopied(false)
  }

  const handleCopyCode = () => {
    if (selectedTeam) {
      const code = getInviteCode(selectedTeam.name)
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const leaderboard = [
    { rank: 1, team: 'Carbon Crushers', members: 7, avgCO2: 2.4, isUserTeam: false },
    { rank: 2, team: 'Eco-Warriors', members: 4, avgCO2: 2.7, isUserTeam: true },
    { rank: 3, team: 'Planet Protectors', members: 8, avgCO2: 2.8, isUserTeam: false },
    { rank: 4, team: 'Green Giants', members: 5, avgCO2: 3.1, isUserTeam: false },
    { rank: 5, team: 'Sustainability Squad', members: 6, avgCO2: 3.4, isUserTeam: false },
  ]

  const teams = [
    { name: 'Eco-Warriors', avgCO2: 2.7, members: 4, maxMembers: 10, isUserTeam: true, avatars: ['A', 'B', 'C', 'D'] },
    { name: 'Carbon Crushers', avgCO2: 2.4, members: 7, maxMembers: 10, isUserTeam: false, avatars: ['E', 'F', 'G', 'H', '+4'] },
  ]

  const badges = [
    { name: 'Eko Başlangıç', icon: Leaf, earned: true },
    { name: 'Enerji Tasarrufçusu', icon: Zap, earned: true },
    { name: 'Dijital Temizleyici', icon: X, earned: false },
    { name: 'Geri Dönüşüm Şampiyonu', icon: Recycle, earned: false },
    { name: 'Yeşil Yolcu', icon: Bike, earned: false },
    { name: 'Su Bilinci', icon: Droplet, earned: false },
  ]

  const rewards = [
    { 
      title: 'TEMA ile Ağaç Dik', 
      description: 'Puanlarınızı kullanarak adınıza bir ağaç diktirin.',
      cost: 2000,
      icon: TreePine
    },
    { 
      title: '1GB Yeşil Veri Paketi', 
      description: 'Turkcell tarafından finanse edilen karbon dengelemesi ile 1GB mobil veri alın.',
      cost: 1000,
      icon: Smartphone
    },
    { 
      title: 'Sürdürülebilir Teknoloji İndirimi', 
      description: 'Çevre dostu aksesuarlar için %15 indirim kuponu alın.',
      cost: 1500,
      icon: Gift
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Yeşil Aksiyonlar ve Ödüller</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">{userData.name}</span>
              <span className="text-xs text-gray-600">{userData.team}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
              <Leaf className="h-4 w-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">{userData.points.toLocaleString()} Puan</span>
            </div>
          </div>
        </div>

        {/* Join the Green Movement Section */}
        <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 sm:p-8 border border-green-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Yeşil Hareket'e Katıl</h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Diğerleriyle yarışın, puan kazanın ve gezegenimize yardımcı olan gerçek dünya ödüllerini talep edin!
          </p>
        </div>

        {/* Green Leaderboard Section */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Yeşil Liderlik Tablosu</h2>
              <p className="text-gray-600 text-sm">
                En düşük haftalık ortalama karbon tüketimine sahip takımlar. Düşük olan daha iyidir!
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Bu Hafta</span>
            </div>
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
                {leaderboard.map((team) => (
                  <tr 
                    key={team.rank}
                    className={`border-b border-gray-100 ${team.isUserTeam ? 'bg-green-50' : ''}`}
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

          <Link href="/dashboard/league/teams" className="mt-6 inline-block w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center">
            Tüm Takımları Görüntüle
          </Link>
        </div>

        {/* Team Hub Section */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Takım Merkezi</h2>
              <p className="text-gray-600 text-sm">Yeşil Takımlar</p>
              <p className="text-gray-500 text-xs mt-1">Takımları keşfedin, toplu ilerlemelerini görüntüleyin ve etkilerini görün.</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Takım ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map((team, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl border-2 ${team.isUserTeam ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {team.name} {team.isUserTeam && <span className="text-green-600 text-sm">(Takımınız)</span>}
                    </h3>
                    <p className="text-sm text-gray-600">Ort. CO2: {team.avgCO2} kg</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Üyeler ({team.members}/{team.maxMembers})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {team.avatars.map((avatar, i) => (
                      <div 
                        key={i}
                        className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-xs font-semibold text-green-700 border-2 border-white"
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>
                </div>

                {team.isUserTeam && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleInviteClick(team)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <UserPlus className="h-4 w-4" />
                      Davet Et
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* My Badge Collection Section */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rozet Koleksiyonum</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {badges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-2 ${
                    badge.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className={`text-xs text-center ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
                    {badge.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Redeem Your Green Points Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yeşil Puanlarınızı Kullanın</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward, index) => {
              const Icon = reward.icon
              return (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg mb-4 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">{reward.cost.toLocaleString()} Puan</span>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Kullan
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Invite Code Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-green-50">
          {selectedTeam && (
            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Davet Kodu</h3>
              <div className="flex items-center justify-center gap-3">
                <code className="text-4xl font-bold text-green-700 tracking-wider">
                  {getInviteCode(selectedTeam.name)}
                </code>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  title="Kopyala"
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

