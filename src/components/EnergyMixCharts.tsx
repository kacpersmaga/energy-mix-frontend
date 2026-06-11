import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEnergyMix } from '@/hooks/useEnergyMix'

export function EnergyMixCharts() {
  const { data } = useEnergyMix()

  if (!data) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((day) => (
        <div key={day.date} className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-800">{day.date}</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={day.averageMix.map((fm) => ({ name: fm.fuel, value: fm.perc }))}
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
      ))}
    </div>
  )
}
