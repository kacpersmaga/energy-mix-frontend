import { render, screen } from '@testing-library/react'
import { EnergyMixCharts } from '@/components/EnergyMixCharts'
import * as useEnergyMixModule from '@/hooks/useEnergyMix'
import type { DailyEnergyMix } from '@/api/types'

vi.mock('recharts', () => ({
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const mockDay: DailyEnergyMix = {
  date: '2026-06-13',
  averageMix: [
    { fuel: 'wind', perc: 40 },
    { fuel: 'gas', perc: 35 },
    { fuel: 'nuclear', perc: 25 },
  ],
  cleanEnergyPercentage: 65,
}

describe('EnergyMixCharts', () => {
  it('shows loading state', () => {
    vi.spyOn(useEnergyMixModule, 'useEnergyMix').mockReturnValue({ data: null, loading: true, error: null })
    render(<EnergyMixCharts />)
    expect(screen.getByText('Wczytywanie danych...')).toBeInTheDocument()
  })

  it('shows error state', () => {
    vi.spyOn(useEnergyMixModule, 'useEnergyMix').mockReturnValue({ data: null, loading: false, error: 'Failed' })
    render(<EnergyMixCharts />)
    expect(screen.getByText('Błąd: Failed')).toBeInTheDocument()
  })

  it('renders Today label for first day', () => {
    vi.spyOn(useEnergyMixModule, 'useEnergyMix').mockReturnValue({ data: [mockDay], loading: false, error: null })
    render(<EnergyMixCharts />)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('shows clean energy percentage', () => {
    vi.spyOn(useEnergyMixModule, 'useEnergyMix').mockReturnValue({ data: [mockDay], loading: false, error: null })
    render(<EnergyMixCharts />)
    expect(screen.getByText(/65.0% clean/)).toBeInTheDocument()
  })

  it('renders labels for all three days', () => {
    vi.spyOn(useEnergyMixModule, 'useEnergyMix').mockReturnValue({
      data: [
        mockDay,
        { ...mockDay, date: '2026-06-14' },
        { ...mockDay, date: '2026-06-15' },
      ],
      loading: false,
      error: null,
    })
    render(<EnergyMixCharts />)
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('Tomorrow')).toBeInTheDocument()
    expect(screen.getByText('Day After Tomorrow')).toBeInTheDocument()
  })
})
