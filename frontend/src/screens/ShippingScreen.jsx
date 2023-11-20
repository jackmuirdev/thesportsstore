import { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import FormContainer from '../components/FormContainer';
import { saveShippingAddress, saveBillAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from '../components/Meta';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { billAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postcode, setPostcode] = useState(shippingAddress?.postcode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const [billingAddress, setBillingAddress] = useState(billAddress?.billingAddress || '')
  const [billingCity, setBillingCity] = useState(billAddress?.billingCity || '')
  const [billingPostcode, setBillingPostcode] = useState(billAddress?.billingPostcode || '')
  const [billingCountry, setBillingCountry] = useState(billAddress?.billingCountry || '')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({
      address, city, postcode, country
    }));
    dispatch(saveBillAddress({
      billingAddress, billingCity, billingPostcode, billingCountry 
    }));
    navigate('/placeorder');
  };

  

  return (
    <>
      <Meta title="Shipping | The Kellen Collection" />
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <Form onSubmit={submitHandler} className="text-center">
          <Row>
            <Col>
              <h1 className="my-3 text-center">Shipping</h1>

              {/* Address */}
              <Form.Group controlId="shippingAddress" className="my-2">
                <Form.Label>Address: </Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} required/>
              </Form.Group>

              {/* City */}
              <Form.Group controlId="shippingCity" className="my-2">
                <Form.Label>City: </Form.Label>
                <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required/>
              </Form.Group>

              {/* Postcode */}
              <Form.Group controlId="shippingPostcode" className="my-2">
                <Form.Label>Postcode: </Form.Label>
                <Form.Control type='text' placeholder='Enter Postcode' value={postcode} onChange={(e) => setPostcode(e.target.value)} required/>
              </Form.Group>

              {/* Country */}
              <Form.Group controlId="shippingCountry" className="my-2">
                <Form.Label>Country: </Form.Label>
                <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)} required/>
              </Form.Group>
            </Col>

            <Col>
              <h1 className="my-3 text-center">Billing</h1>

              {/* Address */}
              <Form.Group controlId="billingAddress" className="my-2">
                <Form.Label>Address: </Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} required/>
              </Form.Group>

              {/* City */}
              <Form.Group controlId="billingCity" className="my-2">
                <Form.Label>City: </Form.Label>
                <Form.Control type='text' placeholder='Enter city' value={billingCity} onChange={(e) => setBillingCity(e.target.value)} required/>
              </Form.Group>

              {/* Postcode */}
              <Form.Group controlId="billingPostcode" className="my-2">
                <Form.Label>Postcode: </Form.Label>
                <Form.Control type='text' placeholder='Enter Postcode' value={billingPostcode} onChange={(e) => setBillingPostcode(e.target.value)} required/>
              </Form.Group>

              {/* Country */}
              <Form.Group controlId="billingCountry" className="my-2">
                <Form.Label>Country: </Form.Label>
                <Form.Control type='text' placeholder='Enter Country' value={billingCountry} onChange={(e) => setBillingCountry(e.target.value)} required/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Button */}
              <Button type='submit' variant='primary' className="mb-5 mt-3 searchbtn">
                Continue to Payment Methods
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen;