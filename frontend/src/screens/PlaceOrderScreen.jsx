import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { FaTrash } from 'react-icons/fa';
import Meta from '../components/Meta';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    console.log('Shipping Address:', cart.shippingAddress);
    console.log('Billing Address:', cart.billAddress);
  
    if (!cart.shippingAddress || !cart.shippingAddress.address || !cart.billAddress || !cart.billAddress.billingAddress) {
      navigate('/shipping');
    } 
  }, [cart.billAddress, cart.shippingAddress, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        billingAddress: cart.billingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Meta title="Place Order | The Kellen Collection" />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>

            <ListGroup.Item>
              <Row>
                <Col>
                  <p>
                    <strong>1. Delivery Address: </strong>
                  </p>
                </Col>
                <Col>
                  <p>
                    {cart.shippingAddress.address}, 
                    <br />
                    {cart.shippingAddress.city},
                    <br />
                    {cart.shippingAddress.postcode},
                    <br />
                    {cart.shippingAddress.country}
                  </p>
                </Col>
                <Col>
                  <Link to={`/shipping`}>
                    Change
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <p>
                    <strong>2. Billing Address: </strong>
                  </p>
                </Col>
                <Col>
                  {cart.billAddress ? (
                    <p>
                      {cart.billAddress.billingAddress}, 
                      <br />
                      {cart.billAddress.billingCity},
                      <br />
                      {cart.billAddress.billingPostcode}, 
                      <br />
                      {cart.billAddress.billingCountry}
                    </p>
                  ) : (
                    <p>Billing address not available</p>
                  )}
                </Col>
                <Col>
                  <Link to={`/shipping`}>Change</Link>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <>
                  <Row>
                  <Col>
                    <p><strong>3. Order Items</strong></p>
                  </Col>
                </Row>
                <Row>
                  <Table striped hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th className="center-content">Image</th>
                        <th className="center-content">Item</th>
                        <th className="center-content">Quantity</th>
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
                          <td className="center-content" style={{ width: '15%' }}>
                            £{item.price}
                          </td>
                          <td className="center-content" style={{ width: '15%' }}>
                            £{(item.qty * item.price).toFixed(2)}
                          </td>
                          <td className='center-content' style={{ width: '5%' }}>
                            <Button type='button' className='trashbtn' onClick={() => removeFromCartHandler(item._id)}>
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block payoutbtn searchbtn'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;