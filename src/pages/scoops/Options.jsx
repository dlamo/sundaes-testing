import axios from 'axios'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import { BASE_PATH } from '../../utils/constants'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'

export default function Options({ optionType }) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    axios
      .get(`${BASE_PATH}/${optionType}`)
      .then((response) => setOptions(response.data))
      .catch((error) => {})
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  const optionItems = options.map((option) => (
    <ItemComponent key={option.name} {...{ ...option }} />
  ))

  return <Row>{optionItems}</Row>
}
