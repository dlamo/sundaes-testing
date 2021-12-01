import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

describe('SummaryForm component tests', () => {
  test('Initial conditions and checkbox functionality', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const button = screen.getByRole('button', { name: /confirm order/i })

    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })

  test('Checkbox basic functionality', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const button = screen.getByRole('button', { name: /confirm order/i })

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(button).toBeEnabled()

    fireEvent.click(checkbox)
    expect(button).toBeDisabled()
  })
})
