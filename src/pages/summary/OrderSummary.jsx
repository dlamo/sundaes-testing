import { useOrderDetails } from '../../context/OrderDetails'
import SummaryForm from './SummaryForm'

export default function OrderSummary({ cb }) {
  const [orderDetails] = useOrderDetails()
  const hasToppings = Boolean(orderDetails.toppings.size)
  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      {hasToppings && <h2>Toppings: {orderDetails.totals.toppings}</h2>}
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm {...{ cb }} />
    </>
  )
}
