import { render, screen, waitFor } from '../../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

test('update scoop subtotal when scoop changes', async () => {
  render(<Options optionType="scoops" />)
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })

  expect(scoopsSubtotal).toHaveTextContent('0.00')

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when topping changes', async () => {
  render(<Options optionType="toppings" />)
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  })

  expect(toppingsSubtotal).toHaveTextContent('0.00')

  const cherriesCheck = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherriesCheck)
  expect(cherriesCheck).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  const fudgeCheck = await screen.findByRole('checkbox', { name: 'Hot fudge' })
  userEvent.click(fudgeCheck)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  userEvent.click(fudgeCheck)
  expect(fudgeCheck).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})

describe('grand total tests', () => {
  test('grand total have start value and updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByText('Grand total: $', { exact: false })

    expect(grandTotal).toHaveTextContent('0.00')

    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    const mandmsTopping = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    })

    userEvent.type(chocolateScoop, '1')
    userEvent.click(mandmsTopping)
    expect(grandTotal).toHaveTextContent('3.50')
  })

  test('grand total updates properly if toppings is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByText('Grand total: $', { exact: false })

    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    const cherriesTopping = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })

    userEvent.click(cherriesTopping)
    userEvent.type(vanillaScoop, '2')
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByText('Grand total: $', { exact: false })

    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    const fudgeTopping = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    })

    userEvent.type(chocolateScoop, '2')
    userEvent.click(fudgeTopping)
    expect(grandTotal).toHaveTextContent('5.50')

    userEvent.type(chocolateScoop, '1')
    userEvent.click(fudgeTopping)
    expect(grandTotal).toHaveTextContent('2.00')
  })
})
