import { Link } from 'react-router-dom';
import {Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const {isLoading, error} = useGetTopProductsQuery();

  return isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Carousel pause='hover' className='mb-5 carousel'>
        <Carousel.Item>
          <Image src='/images/kellenhome.png' alt='kellenpic' className='carousel1image' />
          <Link to={`/products`}>
            <Carousel.Caption className='caption'>
              <button className='searchbtn'>Shop Now</button>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item >
            <Image src='/images/blackkellenlogo.png' alt='kellenpic' className='carousel2image'/>
        </Carousel.Item>
    </Carousel>
  )
}

export default ProductCarousel