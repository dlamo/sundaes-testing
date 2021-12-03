import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Configure a request mocking server
export const server = setupServer(...handlers)
