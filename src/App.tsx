import { EnergyMixCharts } from './components/EnergyMixCharts'
import { ChargingWindow } from './components/ChargingWindow'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">UK Energy Mix</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time and forecast data from Carbon Intensity API</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            3-Day Energy Mix Forecast
          </h2>
          <EnergyMixCharts />
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Smart Charging Planner
          </h2>
          <ChargingWindow />
        </section>
      </main>
    </div>
  )
}
