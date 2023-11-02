import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    if(userInfo){
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match');
    } else {
      try {
        const res = await updateProfile({ _id:userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error (err?.data?.message || err.error);
      }
    }
  };
  
  return <Row className="mt-5 text-center profile">
    <Col className="mx-5">
      <h1>User Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name"className="my-2">
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="email"className="my-2">
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="password"className="my-2">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword"className="my-2">
          <Form.Label>
            Confirm Password
          </Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2 searchbtn">
          Update Profile
        </Button>
        { loadingUpdateProfile && <Loader /> }
      </Form>
    </Col>
  </Row>
}

export default ProfileScreen