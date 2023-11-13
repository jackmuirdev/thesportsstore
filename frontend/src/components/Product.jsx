import React from 'react';
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded productcard text-center'>
      <Link to={`/product/${product._id}`}>
        <Card.Img className='productimg' src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">
          £{product.price}
        </Card.Text>

        <Card.Text as='div'>
          <Rating value={ product.rating } text={`${product.numReviews} reviews`} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product