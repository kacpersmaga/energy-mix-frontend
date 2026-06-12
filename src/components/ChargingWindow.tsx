import { useState, type SubmitEvent } from 'react'
import { useOptimalCharging } from '@/hooks/useOptimalCharging'

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ChargingWindow() {
  const [hours, setHours] = useState(2)
  const { result, loading, error, findOptimalWindow } = useOptimalCharging()

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
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
            min={1}
            max={6}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="block w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-gray-400">1 – 6 hours</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mb-5 rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Searching...' : 'Find Best Window'}
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Best window found</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400">Start</p>
              <p className="text-sm font-semibold text-gray-800">{formatDateTime(result.start)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">End</p>
              <p className="text-sm font-semibold text-gray-800">{formatDateTime(result.end)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Avg. clean energy</p>
              <p className="text-2xl font-bold text-emerald-600">{result.averageCleanEnergy.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
