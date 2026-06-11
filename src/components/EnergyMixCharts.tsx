import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEnergyMix } from '@/hooks/useEnergyMix'
import type { DailyEnergyMix } from '@/api/types'

const DAY_LABELS = ['Today', 'Tomorrow', 'Day After Tomorrow']

function DayCard({ day, index }: { day: DailyEnergyMix; index: number }) {
  const chartData = day.averageMix.map((fm) => ({ name: fm.fuel, value: fm.perc }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-sm font-semibold text-gray-800">{DAY_LABELS[index] ?? day.date}</p>
          <p className="text-xs text-gray-400">{day.date}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
          {day.cleanEnergyPercentage.toFixed(1)}% clean
        </span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={55}
            outerRadius={95}
            dataKey="value"
            paddingAngle={2}
          />
          <Tooltip />
          <Legend iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EnergyMixCharts() {
  const { data } = useEnergyMix()

  if (!data) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((day, i) => <DayCard key={day.date} day={day} index={i} />)}
    </div>
  )
}
