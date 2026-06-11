import { useEffect, useState } from 'react'
import { getEnergyMix } from '@/api/energyApi'
import type { DailyEnergyMix } from '@/api/types'

export function useEnergyMix() {
  const [data, setData] = useState<DailyEnergyMix[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getEnergyMix()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
