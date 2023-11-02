import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table, Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
  
  const { userInfo } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart);
  
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'GBP',
          }
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({orderId, details}).unwrap();
        refetch();
        toast.success('Payment Successful');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  // async function onApproveTest() {
  //     await payOrder({orderId, details: { payer: {}}});
  //     refetch();
  //     toast.success('Payment Successful');
  // }
  function onError (err) {
    toast.error(err.message);
  } 
  function createOrder (data, actions) {
    return actions.order.create({
      purchase_units:[
        {
          amount:{
            value: order.totalPrice,
          },
        },
      ],
    }).then((orderId) => {
      return orderId;
    })
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  return isLoading ? <Loader /> : error ? <Message variant="danger">{error?.data?.message}</Message> : (
    <>
      <h1 className='pt-5'>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h3>
                    <strong>1. Delivery Address: </strong>
                  </h3>
                  <h6>
                    {cart.shippingAddress.address}, 
                    <br />
                    {cart.shippingAddress.city},
                    <br />
                    {cart.shippingAddress.postcode},
                    <br />
                    {cart.shippingAddress.country}
                  </h6>
                </Col>
                <Col>
                  <h3>
                    <strong>2. Billing Address: </strong>
                  </h3>
                  {cart.billAddress ? (
                    <h6>
                      {cart.billAddress.billingAddress}, 
                      <br />
                      {cart.billAddress.billingCity},
                      <br />
                      {cart.billAddress.billingPostcode}, 
                      <br />
                      {cart.billAddress.billingCountry}
                    </h6>
                  ) : (
                    <p>Billing address not available</p>
                  )}
                </Col>
              </Row>
            
              <Row>
                <Col>
                  { order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                    </Message>
                  ) : (
                    <Message variant="danger">Not delivered</Message>
                  ) }
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              { order.isPaid ? (
                <Message variant="success">Paid on {new Date(order.paidAt).toLocaleDateString()}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              ) }
            </ListGroup.Item>

            <ListGroup.Item>
                <>
                  <Row>
                  <Col>
                    <h3><strong>3. Order Items</strong></h3>
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
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="center-content" style={{ width: '20%' }}>
                            <Image src={item.image} alt={item.name} fluid rounded style={{ width: "100%" }} />
                          </td>
                          <td className="center-content" style={{ width: '20%' }}>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </td>
                          <td className="center-content" style={{ width: '15%' }}>
                            {item.qty}
                          </td>
                          <td className="center-content" style={{ width: '15%' }}>
                            £{item.price}
                          </td>
                          <td className="center-content" style={{ width: '15%' }}>
                            £{(item.qty * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
                </>
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
                  <Col>£{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              { !order.isPaid && (
                <ListGroup.Item>
                  { loadingPay && <Loader /> }

                  { isPending ? <Loader /> : (
                    <div>
                    {/* { <Button onClick={ onApproveTest } style={{marginBottom: '10px'}}>
                        Test Pay Order
                      </Button>} */}
                      <div>
                        <PayPalButtons createOrder={ createOrder } onApprove={ onApprove } onError={ onError } />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              ) }
              
              {loadingDeliver && <Loader />}

              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
