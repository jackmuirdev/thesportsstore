import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice';
import Meta from '../../components/Meta';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('0');
  const [description, setDescription] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setShippingCost(product.shippingCost);
      setColours(product.colours || []);
      setSizes(product.sizes || []);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        shippingCost,
        colours,
        sizes,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product Updated!');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success('Image Uploaded!');
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return <>
  <Meta title="Product Edit | The Kellen Collection" />
    <Link to="/admin/productlist" className="btn btn-light mt-4">
      Go Back
    </Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}

      { isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
        <Form onSubmit={ submitHandler }>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" placeholder="Enter Image URL" value={image} onChange={(e) => setImage}></Form.Control>
            <Form.Control type="file" label='Choose File' onChange={ uploadFileHandler }></Form.Control>
          </Form.Group>
          {loadingUpload && <Loader />}

          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Quantity In Stock</Form.Label>
            <Form.Control type="number" placeholder="Enter Quantity" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="colours" className="my-2">
            <Form.Label>Colour</Form.Label>
            <Form.Control type="text" placeholder="Enter Colours" value={colours.join(',')} onChange={(e) => setColours(e.target.value.split(','))} />
          </Form.Group>

          <Form.Group controlId="sizes" className="my-2">
            <Form.Label>Sizes</Form.Label>
            <Form.Control type="text" placeholder="Enter Sizes" value={sizes.join(',')} onChange={(e) => setSizes(e.target.value.split(','))} />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2 searchbtn">
            Update
          </Button>
        </Form>
      ) }
    </FormContainer>
  </>
}

export default ProductEditScreen;