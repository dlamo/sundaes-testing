import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../context/OrderDetails'
import Options from '../Options'

test('update scoop subtotal when scoop changes', async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider })
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
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider })
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
