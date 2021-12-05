import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BASE_PATH } from '../../utils/constants'

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = ({ target }) =>
    updateItemCount(name, Number(target.checked))

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        alt={`${name} topping`}
        src={`${BASE_PATH}/${imagePath}`}
      />
      <Form.Group controlId={`${name}`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Check type="checkbox" label={name} onChange={handleChange} />
      </Form.Group>
    </Col>
  )
}
