import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChargingWindow } from '@/components/ChargingWindow'
import * as energyApi from '@/api/energyApi'
import type { OptimalChargingWindow } from '@/api/types'

vi.mock('@/api/energyApi')

describe('ChargingWindow', () => {
  it('renders with default hours value of 2', () => {
    render(<ChargingWindow />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    expect(input.value).toBe('2')
  })

  it('shows result after successful API call', async () => {
    const mockResult: OptimalChargingWindow = {
      start: '2026-06-13T10:00:00Z',
      end: '2026-06-13T12:00:00Z',
      averageCleanEnergy: 65.3,
    }
    vi.mocked(energyApi.getChargingWindow).mockResolvedValueOnce(mockResult)

    render(<ChargingWindow />)
    fireEvent.submit(screen.getByRole('button').closest('form')!)

    await waitFor(() => {
      expect(screen.getByText('65.3%')).toBeInTheDocument()
    })
  })

  it('disables button while loading', async () => {
    vi.mocked(energyApi.getChargingWindow).mockReturnValue(new Promise(() => {}))
    render(<ChargingWindow />)
    fireEvent.submit(screen.getByRole('button').closest('form')!)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows error message on failure', async () => {
    vi.mocked(energyApi.getChargingWindow).mockRejectedValueOnce(new Error('Network error'))
    render(<ChargingWindow />)
    fireEvent.submit(screen.getByRole('button').closest('form')!)
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })

  it('calls API with updated hours when input changes', async () => {
    const mockResult: OptimalChargingWindow = {
      start: '2026-06-13T08:00:00Z',
      end: '2026-06-13T12:00:00Z',
      averageCleanEnergy: 70,
    }
    vi.mocked(energyApi.getChargingWindow).mockResolvedValueOnce(mockResult)

    render(<ChargingWindow />)
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '4' } })
    fireEvent.submit(screen.getByRole('button').closest('form')!)

    await waitFor(() => {
      expect(energyApi.getChargingWindow).toHaveBeenCalledWith(4)
    })
  })
})
