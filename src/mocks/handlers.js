import { rest } from 'msw'
import { BASE_PATH } from '../utils/constants'

export const handlers = [
  rest.get(`${BASE_PATH}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  }),
  rest.get(`${BASE_PATH}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    )
  }),
  rest.post(`${BASE_PATH}/order`, (req, res, ctx) => {
    return res(ctx.json({ orderNumber: '12345678900' }))
  }),
]
