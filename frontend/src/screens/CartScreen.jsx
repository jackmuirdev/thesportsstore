import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import CheckoutSteps from "../components/CheckoutSteps";
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <CheckoutSteps step1 />
      <Row>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/products'>Go Back</Link>
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th className="center-content">Image</th>
                <th className="center-content">Item</th>
                <th className="center-content">Quantity</th>
                <th className="center-content">Colour</th>
                <th className="center-content">Size</th>
                <th className="center-content">Price</th>
                <th className="center-content">Sub Total</th>
                <th className="center-content"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="center-content" style={{ width: '20%' }}>
                    <Image src={item.image} alt={item.name} fluid rounded style={{ width: "100%" }} />
                  </td>
                  <td className="center-content" style={{ width: '20%' }}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                    <br />
                    In Stock: {item.countInStock}
                  </td>
                  <td className="center-content" style={{ width: '15%' }}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                    
                  </td>
                  <td className="center-content" style={{ width: '10%' }}>
                    {item.colour}
                  </td>
                  <td className="center-content" style={{ width: '10%' }}>
                    {item.size}
                  </td>
                  <td className="center-content" style={{ width: '15%' }}>
                    £{item.price}
                  </td>
                  <td className="center-content" style={{ width: '15%' }}>
                    £{(item.qty * item.price).toFixed(2)}
                  </td>
                  <td className='center-content' style={{width: '5%'}}>
                    <Button type='button' className='trashbtn' onClick={ () => removeFromCartHandler(item._id) }>
                      <FaTrash />
                    </Button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </Row>
        <Row>
          <h5>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items:
            £{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </h5>
        </Row>
        <Row>
          <Col>
            <Button
              type='button'
              className='btn-block payoutbtn searchbtn'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >                
              Proceed To Payment
            </Button>
          </Col>
        </Row>
    </>
  );
};

export default CartScreen;
