import { useState } from 'react'
import { useOptimalCharging } from '@/hooks/useOptimalCharging'

export function ChargingWindow() {
  const [hours, setHours] = useState(2)
  const { loading, findOptimalWindow } = useOptimalCharging()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    findOptimalWindow(hours)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <div>
        <p className="text-sm font-semibold text-gray-800">Optimal EV Charging Window</p>
        <p className="text-xs text-gray-400 mt-0.5">Find the cleanest time to charge your electric vehicle.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="space-y-1">
          <label htmlFor="hours-input" className="text-xs font-medium text-gray-600">
            Charging duration
          </label>
          <input
            id="hours-input"
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="block w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mb-5 rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Searching...' : 'Find Best Window'}
        </button>
      </form>
    </div>
  )
}
