import { useOrderDetails } from '../../context/OrderDetails'
import Options from './Options'

export default function OrderEntry() {
  const [orderDetails] = useOrderDetails()
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  )
}
