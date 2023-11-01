import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Slider from '../components/Slider';

const ProductsScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
      <Meta title="The Kellen Collection" />
      <h1 className="pt-5">All Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Row>
          <Col md={3}>
            <div className="filters">
              <Dropdown>
                <Row className='filtersbtn'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Collection
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Breeze Collection</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Pink On White Lace Collection</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Periwinkle Collection</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Painted Rose Collection</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Poppy Collection</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Black Mesh Collection</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Loungewear Collection</Dropdown.Item>
                  </Dropdown.Menu>
                </Row>
              </Dropdown>
              <Dropdown>
                <Row className='filtersbtn'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Color
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">weqwe</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">qwe</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">qwe</Dropdown.Item>
                  </Dropdown.Menu>
                </Row>
              </Dropdown>
              <Dropdown>
                <Row className='filtersbtn'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Size
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Age 6</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Age 7-8</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Age 8</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Age 9-11</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Age 10</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Age 12</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Age 12-13</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Size 6</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Size 8</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Size 10</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Size 12</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Small</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Medium</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Large</Dropdown.Item>
                  </Dropdown.Menu>
                </Row>
              </Dropdown>
              <Dropdown>
                <Row className='filtersbtn'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Price
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">
                      <Slider />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Row>
              </Dropdown>
            </div>
          </Col>
          <Col md={9} className='productcol'>
            <Row>
              {data.products.map((product) => (
                <Col id='productcard' key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductsScreen;
