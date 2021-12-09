import { render, screen } from '../../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'
import Options from '../Options'

describe('Options component tests', () => {
  test('Displays image for each scoop option from the server', async () => {
    render(<Options optionType="scoops" />)

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    const altText = scoopImages.map((s) => s.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })

  test('Display image for each topping option from the server', async () => {
    render(<Options optionType="toppings" />)

    const toppingImages = await screen.findAllByRole('img', {
      name: /topping$/i,
    })
    expect(toppingImages).toHaveLength(3)

    const altText = toppingImages.map((s) => s.alt)
    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ])
  })

  test('scoops subtotal does not update if invalid input', async () => {
    render(<Options optionType="scoops" />)

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    userEvent.type(chocolateInput, '-1')

    const scoopsTotal = await screen.findByText('Scoops total: ', {
      exact: false,
    })
    expect(scoopsTotal).toHaveTextContent('0.00')
  })
})
