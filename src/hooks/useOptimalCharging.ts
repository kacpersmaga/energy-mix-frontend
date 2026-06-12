import { useState } from 'react'
import { getChargingWindow } from '@/api/energyApi'
import type { OptimalChargingWindow } from '@/api/types'

export function useOptimalCharging() {
  const [result, setResult] = useState<OptimalChargingWindow | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function findOptimalWindow(hours: number) {
    setLoading(true)
    setError(null)
    try {
      const data = await getChargingWindow(hours)
      setResult(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { result, loading, error, findOptimalWindow }
}
