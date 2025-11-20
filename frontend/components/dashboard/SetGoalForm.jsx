'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { Target } from 'lucide-react'

const goalSchema = z.object({
  weeklyGoalG: z.number().min(50, 'Minimum 50g olmalı').max(2000, 'Maximum 2000g olmalı'),
})

export function SetGoalForm({ userId, currentGoal }) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      weeklyGoalG: currentGoal || 500,
    },
  })

  const mutation = useMutation({
    mutationFn: (data) => api.setWeeklyGoal(userId, data.weeklyGoalG),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSummary', userId] })
      toast.success('Hedef başarıyla güncellendi!')
      setIsOpen(false)
    },
    onError: (error) => {
      toast.error('Hedef güncellenirken bir hata oluştu')
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full">
        <Target className="h-4 w-4 mr-2" />
        Hedef Belirle
      </Button>
    )
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Haftalık Hedef Belirle</CardTitle>
        <CardDescription>Karbon ayak izi hedefinizi güncelleyin</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Haftalık Hedef (g CO₂)
            </label>
            <input
              type="number"
              {...form.register('weeklyGoalG', { valueAsNumber: true })}
              className="w-full px-3 py-2 border rounded-md"
              min="50"
              max="2000"
              step="10"
            />
            {form.formState.errors.weeklyGoalG && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.weeklyGoalG.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={mutation.isPending} className="flex-1">
              {mutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              İptal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

