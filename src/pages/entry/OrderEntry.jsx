import { useOrderDetails } from '../../context/OrderDetails'
import Options from './Options'
import Button from 'react-bootstrap/Button'

export default function OrderEntry({ cb }) {
  const [orderDetails] = useOrderDetails()
  const hasScoops = orderDetails.totals.scoops !== '$0.00'
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button disabled={!hasScoops} type="button" onClick={() => cb('review')}>
        Order Sundae
      </Button>
    </div>
  )
}
