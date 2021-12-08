import { render, screen, waitFor } from '../../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import { BASE_PATH } from '../../../utils/constants'
import OrderEntry from '../OrderEntry'

describe('OrderEntry component tests', () => {
  test('Handles error for scoops and toppings routes', async () => {
    // Reset handlers to override server response to test error response
    server.resetHandlers(
      rest.get(`${BASE_PATH}/scoops`, (_, res, ctx) => res(ctx.status(500))),
      rest.get(`${BASE_PATH}/toppings`, (_, res, ctx) => res(ctx.status(500)))
    )

    render(<OrderEntry />)

    // We need waitFor because we need to wait for two server responses
    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert')
      expect(alerts).toHaveLength(2)
    })
  })

  test('button is disabled if no scoop is selected', async () => {
    render(<OrderEntry />)

    const orderButton = await screen.findByRole('button', {
      name: 'Order Sundae',
    })
    expect(orderButton).toBeDisabled()

    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    userEvent.clear(chocolateScoop)
    userEvent.type(chocolateScoop, '1')
    expect(orderButton).toBeEnabled()

    userEvent.clear(chocolateScoop)
    userEvent.type(chocolateScoop, '0')
    expect(orderButton).toBeDisabled()
  })
})
