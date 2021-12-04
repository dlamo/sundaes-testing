import Col from 'react-bootstrap/Col'
import { BASE_PATH } from '../../utils/constants'

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        alt={`${name} topping`}
        src={`${BASE_PATH}/${imagePath}`}
      />
    </Col>
  )
}