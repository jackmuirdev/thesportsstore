import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center my-3'>
      <Nav.Item>
        { step1 ? (
          <LinkContainer to='/cart'>
            <Nav.Link>Bag</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Bag</Nav.Link>
        ) }
      </Nav.Item>
      
      <Nav.Item>
        { step2 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Details</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Details</Nav.Link>
        ) }
      </Nav.Item>

      <Nav.Item>
        { step3 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        ) }
      </Nav.Item>

      <Nav.Item>
        { step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        ) }
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps;