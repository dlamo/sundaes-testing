import { useState } from 'react'
import { OrderDetailsProvider } from './context/OrderDetails'
import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress')

  const showPhaseComponent = (state) => {
    switch (state) {
      case 'inProgress':
        return <OrderEntry cb={setOrderPhase} />
      case 'review':
        return <OrderSummary cb={setOrderPhase} />
      case 'complete':
        return <OrderConfirmation cb={setOrderPhase} />
      default:
        return null
    }
  }
  return (
    <Container>
      <OrderDetailsProvider>
        {showPhaseComponent(orderPhase)}
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
