import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
  render(<App />)

  // OrderEntry phase
  const chocolateScoop = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.type(chocolateScoop, '1')

  const cherriesTopping = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherriesTopping)

  const orderButton = screen.getByRole('button', { name: 'Order Sundae' })
  userEvent.click(orderButton)

  // OrderSummary phase
  const scoopsSummary = screen.getByRole('heading', { name: /scoops: \$/i })
  expect(scoopsSummary).toHaveTextContent('2.00')

  const toppingsSummary = screen.getByRole('heading', { name: /toppings: \$/i })
  expect(toppingsSummary).toHaveTextContent('1.50')

  const totalSummary = screen.getByRole('heading', { name: /total: \$/i })
  expect(totalSummary).toHaveTextContent('3.50')

  const termsCheck = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  userEvent.click(termsCheck)

  const summaryButton = screen.getByRole('button', { name: 'Confirm order' })
  userEvent.click(summaryButton)

  // OrderConfirmation phase
  const loading = screen.getByText(/loading/i, { exact: false })
  expect(loading).toBeInTheDocument()

  const confirmationNumber = await screen.findByRole('heading', {
    name: /your order number is/i,
  })
  expect(confirmationNumber).toHaveTextContent('12345678900')

  const notLoading = screen.queryByText('loading') // Using query because it shouldn't be in the document
  expect(notLoading).not.toBeInTheDocument()

  const newOrderButton = screen.getByRole('button', {
    name: 'Create new order',
  })
  userEvent.click(newOrderButton)

  const grandTotal = await screen.findByRole('heading', {
    name: /grand total: \$/i,
  })
  expect(grandTotal).toHaveTextContent('0.00')

  // We need these awaits to make sure that the tests don't throw an error
  await screen.findByRole('spinbutton', { name: 'Chocolate' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})

test('toppings header are not present in case of no toppings selected', async () => {
  render(<App />)

  // OrderEntry phase
  const chocolateScoop = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.type(chocolateScoop, '1')

  const orderButton = screen.getByRole('button', { name: 'Order Sundae' })
  userEvent.click(orderButton)

  // OrderSummary phase
  const toppingsSummary = screen.queryByRole('heading', {
    name: /toppings: \$/i,
  })
  expect(toppingsSummary).not.toBeInTheDocument()
})
