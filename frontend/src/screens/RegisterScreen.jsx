import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  
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
    if (password !== confirmPassword) {
      toast.error('Password do not match');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
    <Meta title="Register | The Kellen Collection" />
    <FormContainer>
      <h1 className="mt-4">Sign Up</h1>

      <Row className="">
        <Col>
          Already have an account?{' '}
          <Link to={ redirect ? `/login?redirect=${redirect}`: '/login' }>Login</Link>
        </Col>
      </Row>

      <Form onSubmit={submitHandler}>
        {/* Name */}
        <Form.Group controlId='name' className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        
        {/* Email Address */}
        <Form.Group controlId='email' className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId='password' className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder="Enter password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group controlId='confirmPassword' className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder="Confirm password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        {/* Button */}
        <Button type='submit' variant='primary' className="mt-2 searchbtn" disabled={ isLoading }>
          Register
        </Button>

        { isLoading && <Loader /> }

        <Row className="py-3">
          <Col>
            <Form.Group controlId="terms" className="my-3">
              <Form.Check
                type="checkbox"
                label={
                  <span>
                    I accept the{' '}
                    <Link to="/terms&conditions">Terms and Conditions</Link>
                  </span>
                }
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </FormContainer>
    </>
  )
}

export default RegisterScreen;