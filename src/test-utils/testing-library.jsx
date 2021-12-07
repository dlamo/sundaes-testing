import { render } from '@testing-library/react'
import { OrderDetailsProvider } from '../context/OrderDetails'

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options })

// re-export everything from testing-library
export * from '@testing-library/react'

// overrider render method
export { renderWithContext as render }
