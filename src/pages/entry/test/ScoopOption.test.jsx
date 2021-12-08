import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScoopOption from '../ScoopOption'

test('scoops inputs renders error if it has negative value', () => {
  render(<ScoopOption updateItemCount={jest.fn()} />)

  const testInput = screen.getByRole('spinbutton')
  userEvent.type(testInput, '-1')
  expect(testInput).toHaveClass('is-invalid')

  userEvent.clear(testInput)
  userEvent.type(testInput, '2.5')
  expect(testInput).toHaveClass('is-invalid')

  userEvent.clear(testInput)
  userEvent.type(testInput, '20')
  expect(testInput).toHaveClass('is-invalid')

  userEvent.clear(testInput)
  userEvent.type(testInput, '1')
  expect(testInput).not.toHaveClass('is-invalid')
})
