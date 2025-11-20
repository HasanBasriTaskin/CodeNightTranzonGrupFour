'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export default function Leaderboard() {
  const queryClient = useQueryClient()
  const { data: leaderboard, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => api.getLeaderboard(),
    refetchInterval: 30000,
    retry: 2,
    retryDelay: 1000,
  })

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
      case 2:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800'
      case 3:
        return 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
      default:
        return 'bg-card border-border'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-destructive mb-2 text-lg font-semibold">Veri yüklenirken bir hata oluştu</p>
          <p className="text-muted-foreground mb-4 text-sm">
            {error.message || 'Backend sunucusuna bağlanılamıyor. Lütfen backend\'in çalıştığından emin olun.'}
          </p>
          <Button 
            onClick={() => queryClient.refetchQueries({ queryKey: ['leaderboard'] })}
            className="mr-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Tekrar Dene
          </Button>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard'a Dön</Button>
          </Link>
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
              <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-2">
                <Trophy className="h-8 w-8" />
                Green Leaderboard
              </h1>
              <p className="text-muted-foreground">
                En düşük karbon ayak izine sahip ekipler
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard'a Dön</Button>
            </Link>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Grup Sıralaması</CardTitle>
              <CardDescription>
                Haftalık ortalama karbon tüketimine göre sıralama
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!leaderboard?.teams || leaderboard.teams.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Henüz grup bulunmuyor
                </p>
              ) : (
                <div className="space-y-4">
                  {leaderboard.teams.map((team, index) => (
                    <motion.div
                      key={team.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${getRankColor(team.rank)} transition-all hover:shadow-md`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankIcon(team.rank)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{team.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {team.members} üye
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {team.avgGCo2.toFixed(0)} g
                          </div>
                          <p className="text-xs text-muted-foreground">Ortalama CO₂</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                💡 <strong>Not:</strong> Sıralama, ekiplerin haftalık ortalama karbon tüketimine göre yapılmaktadır. 
                En düşük ortalama değere sahip ekip birinci sırada yer alır.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

