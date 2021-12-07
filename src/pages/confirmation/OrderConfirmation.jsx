import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../context/OrderDetails'
import { BASE_PATH } from '../../utils/constants'
import AlertBanner from '../common/AlertBanner'

export default function OrderConfirmation({ cb }) {
  const [orderNumber, setOrderNumber] = useState(null)
  const [error, setError] = useState(false)
  const [, , resetOrder] = useOrderDetails()

  useEffect(() => {
    axios
      .post(`${BASE_PATH}/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => setError(true))
  }, [])

  if (error) return <AlertBanner />

  const handleNewOrder = () => {
    resetOrder()
    cb('inProgress')
  }

  return orderNumber ? (
    <>
      <h1>Thank you!</h1>
      <h3>Your order number is {orderNumber}</h3>
      <p style={{ fontSize: '25%' }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button type="button" onClick={handleNewOrder}>
        Create new order
      </Button>
    </>
  ) : (
    <p>Loading...</p>
  )
}
