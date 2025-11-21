'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'

const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Bugün']

// Mock data - in production, this would come from props
const mockData = [
  { day: 'Pzt', value: 1.0 },
  { day: 'Sal', value: 1.3 },
  { day: 'Çar', value: 0.9 },
  { day: 'Per', value: 1.8 }, // Highlighted in yellow
  { day: 'Cum', value: 1.1 },
  { day: 'Cmt', value: 0.8 },
  { day: 'Bugün', value: 1.2 }, // Darker green for today
]

export function SevenDayTrend({ data = mockData }) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">7 Günlük Trend</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 10 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 10 }}
              />
              <Bar 
                dataKey="value" 
                radius={[8, 8, 0, 0]}
              >
                {data.map((entry, index) => {
                  // Thursday (Per) should be yellow, Today (Bugün) should be darker green
                  let fill = '#86efac' // Light green default
                  if (entry.day === 'Per') {
                    fill = '#fbbf24' // Yellow for Thursday
                  } else if (entry.day === 'Bugün') {
                    fill = '#22c55e' // Darker green for today
                  }
                  return <Cell key={`cell-${index}`} fill={fill} />
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

