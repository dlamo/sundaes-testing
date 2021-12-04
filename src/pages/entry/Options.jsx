import axios from 'axios'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import { BASE_PATH } from '../../utils/constants'
import AlertBanner from '../common/AlertBanner'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'

export default function Options({ optionType }) {
  const [options, setOptions] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .get(`${BASE_PATH}/${optionType}`)
      .then((response) => setOptions(response.data))
      .catch((error) => setError(true))
  }, [optionType])

  if (error) return <AlertBanner />

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  const optionItems = options.map((option) => (
    <ItemComponent key={option.name} {...{ ...option }} />
  ))

  return <Row>{optionItems}</Row>
}
