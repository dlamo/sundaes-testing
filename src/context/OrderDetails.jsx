import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { pricePerItem } from '../utils/constants'
import { formatCurrency } from '../utils/functions'

const OrderDetails = createContext()

export function useOrderDetails() {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error('useOrderDetals must be used within a provider')
  }

  return context
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }
  return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })
  const zeroCurrency = formatCurrency(0)
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  })

  useEffect(() => {
    const scoopsSubtotals = calculateSubtotal('scoops', optionCounts)
    const toppingsSubtotals = calculateSubtotal('toppings', optionCounts)
    const grandTotal = scoopsSubtotals + toppingsSubtotals
    setTotals({
      scoops: formatCurrency(scoopsSubtotals),
      toppings: formatCurrency(toppingsSubtotals),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionCounts])

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts }

      const optionCountsMap = optionCounts[optionType]
      optionCountsMap.set(itemName, parseInt(newItemCount))

      setOptionCounts(newOptionCounts)
    }

    return [{ ...optionCounts, totals }, updateItemCount]
  }, [optionCounts, totals])

  return <OrderDetails.Provider {...{ value }} {...props} />
}
