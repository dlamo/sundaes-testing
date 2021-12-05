import Col from 'react-bootstrap/Col'
import { BASE_PATH } from '../../utils/constants'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const handleChange = ({ target: { value } }) => updateItemCount(name, value)

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        alt={`${name} scoop`}
        src={`${BASE_PATH}/${imagePath}`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
