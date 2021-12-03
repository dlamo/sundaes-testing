import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(button).toBeEnabled()

    userEvent.click(checkbox)
    expect(button).toBeDisabled()
  })

  test('Popover responds to hover', async () => {
    render(<SummaryForm />)

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    )
    expect(nullPopover).not.toBeInTheDocument()

    const terms = screen.getByText(/terms and conditions/i)
    userEvent.hover(terms)

    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    userEvent.unhover(terms)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    )
  })
})
