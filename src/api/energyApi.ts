import type { DailyEnergyMix } from './types'

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/Energy`
  : 'http://localhost:5197/api/Energy'

export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
  const res = await fetch(`${BASE_URL}/mix`)
  if (!res.ok) throw new Error('Failed to fetch energy mix')
  return res.json() as Promise<DailyEnergyMix[]>
}
