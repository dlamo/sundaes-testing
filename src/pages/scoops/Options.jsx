import axios from 'axios'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import ScoopOptions from './ScoopOptions'

export default function Options({ optionType }) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setOptions(response.data))
      .catch((error) => {})
  }, [optionType])

  // TODO: replace null with ToppingOptions
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null

  const optionItems = options.map((option) => (
    <ItemComponent key={option.name} {...{ ...option }} />
  ))

  return <Row>{optionItems}</Row>
}
