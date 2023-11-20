import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice';


const HomeScreen = () => {
  const {pageNumber, keyword} = useParams();

  const { isLoading, error } = useGetProductsQuery({keyword, pageNumber});

  return (
    <>
    <Meta title="Home | The Kellen Collection" />
    <div className='homepage'>
      {!keyword ? <ProductCarousel /> : (
        <Link to='/' className='btn btn-light mt-4'>Go Back</Link>
      )}
      { isLoading ? (
        <Loader />
      ) : error ? (<Message variant='danger'>{ error?.data?.message || error.error }</Message>) : (<>
        <Meta title="The Kellen Collection"/>
      </>) }
    </div>
    </>
  );
};

export default HomeScreen