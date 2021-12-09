import { rest } from 'msw'
import { server } from '../../../mocks/server'
import { render, screen } from '../../../test-utils/testing-library'
import { BASE_PATH } from '../../../utils/constants'
import OrderConfirmation from '../OrderConfirmation'

test('error message is rendered with a server error', async () => {
  server.resetHandlers(
    rest.post(`${BASE_PATH}/order`, (_, res, ctx) => res(ctx.status(500)))
  )

  render(<OrderConfirmation />)

  const alert = await screen.findByRole('alert')
  expect(alert).toBeInTheDocument()
})
