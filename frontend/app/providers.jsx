'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          // Connection errors should not retry (mock data will be used)
          if (error?.message?.includes('fetch') || 
              error?.message?.includes('ERR_CONNECTION_REFUSED') ||
              error?.message?.includes('Failed to fetch')) {
            return false;
          }
          // Other errors retry up to 2 times
          return failureCount < 2;
        },
        retryDelay: 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  )
}

