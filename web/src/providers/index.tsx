import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { queryClient } from '../services/react-query'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
