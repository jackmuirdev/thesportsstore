import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { toast } from 'react-toastify';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import Meta from '../../components/Meta';

const ProductListScreen = () => {
  const {pageNumber} = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber,});

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Product Created!')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product Deleted!')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  return <>
    <Meta title="Products | The Kellen Collection" />
    <Row className='align-items-center mt-4'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-end'>
        <Button className='btn-sm m-3' onClick={ createProductHandler }>
          <FaEdit /> Create Product
        </Button>
      </Col>
    </Row>

    { loadingCreate && <Loader /> }
    { loadingDelete && <Loader /> }
    { isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
      <>
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>SIZE</th>
              <th>COLOURS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.sizes}</td>
                <td>{product.colours}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                    <FaTrash style={{ color: 'white' }}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
      </>
    )}
  </>
}

export default ProductListScreen;