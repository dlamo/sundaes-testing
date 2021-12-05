import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { OrderDetailsProvider } from '../../../context/OrderDetails'
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

    render(<OrderEntry />, { wrapper: OrderDetailsProvider })

    // We need waitFor because we need to wait for two server responses
    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert')
      expect(alerts).toHaveLength(2)
    })
  })
})
