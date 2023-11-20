import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
    <Meta title="Login | The Kellen Collection" />
    <FormContainer>
      <h1 className="mt-4">Sign In</h1>

      <Row className="">
        <Col>
          New Customer?{' '}
          <Link to={ redirect ? `/register?redirect=${redirect}`: '/register' }>Register</Link>
        </Col>
      </Row>

      <Form onSubmit={submitHandler}>
        {/* Email Address */}
        <Form.Group controlId='email' className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId='password' className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        {/* Button */}
        <Button type='submit' variant='primary' className="mt-2 searchbtn" disabled={ isLoading }>
          Sign In
        </Button>

        { isLoading && <Loader /> }
      </Form>
    </FormContainer>
    </>
  )
}

export default LoginScreen;