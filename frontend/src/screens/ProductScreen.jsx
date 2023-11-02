import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetRelatedProductsQuery,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const {
    data: relatedProducts,
    isLoading: loadingRelatedProducts,
  } = useGetRelatedProductsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />

              <Row className='review'>
              <h2 className='mt-5'>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        className='searchbtn'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
              </Row>
            </Col>

            <Col md={4} className='ms-5'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 className='product-title'>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                
                <ListGroup.Item>
                  {/* Colour */}
                  <Row>
                    <Col md={2} className='qty'>
                      Colour: 
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={colours}
                        onChange={(e) => setColours(e.target.value)}
                      >
                      {product.colours.map((colour, index) => (
                        <option key={index} value={colour}>
                          {colour}
                        </option>
                      ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {/* Sizes */}
                  <Row>
                    <Col md={2} className='qty'>
                      Sizes: 
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={sizes}
                        onChange={(e) => setSizes(e.target.value)}
                      >
                      {product.sizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                      ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2} className='qty'>Qty: </Col>
                        <Col md={3}>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='btn-block add2cartbtn searchbtn'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {/* Amount i stock */}
                    In Stock: {product.countInStock} Available | Usually dispatched within 24 hours
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
            </Col>
          </Row>
          {relatedProducts && (
            <Row>
              <Col>
                <h2>Related Products</h2>
                {loadingRelatedProducts ? (
                  <Loader />
                ) : (
                  <Row>
                    {relatedProducts.map((relatedProduct) => (
                      <Col key={relatedProduct._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className='my-3 p-3 rounded'>
                          <Link to={`/product/${relatedProduct._id}`}>
                            <Card.Img src={relatedProduct.image} variant='top' />
                          </Link>
                          <Card.Body>
                            <Link to={`/product/${relatedProduct._id}`}>
                              <Card.Title as='div'>
                                <strong>{relatedProduct.name}</strong>
                              </Card.Title>
                            </Link>
                            <Card.Text as='h3'>${relatedProduct.price}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;