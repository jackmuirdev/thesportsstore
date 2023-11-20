import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from "../slices/cartSlice";
import Meta from '../components/Meta';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate] );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  }

  return (
    <>    
    <Meta title="Payment| The Kellen Collection" />
    <FormContainer>
      <Row>
        <Col>
          {/* Checkout steps */}
          <CheckoutSteps step1 step2 step3 />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h1>Payment Method</h1>

          {/* Payment */}
          <Form onSubmit={ submitHandler }>
            <Form.Group>
              <Form.Label as="legend">Select Payment Method: </Form.Label>
              <Col>
                <Form.Check type="radio" className="my-2" label='PayPal or Credit Card' id="PayPal" name='paymentMethod' value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)} />
              </Col>
            </Form.Group>

            {/* Button */}
            <Button className="searchbtn" type='submit' variant='primary'>
              Continue to Place Order
            </Button>
          </Form>
        </Col>
      </Row>
    </FormContainer>
    </>
  )
}

export default PaymentScreen;                  