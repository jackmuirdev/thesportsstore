import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();

  const subscribeHandler = async () => {
    const emailInput = document.querySelector('.footerform'); // Assuming you've given a class of 'footerform' to your Form.Control element
    const email = emailInput.value;
  
    // Regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (!email) {
      toast.error('Please enter your email.');
    } else if (!email.match(emailPattern)) {
      toast.error('Please enter a valid email address.');
    } else {
      try {
        // Perform your subscription logic here
        // ...
        toast.success('Successfully Subscribed!');
      } catch (err) {
        toast.error(err);
        navigate('/');
      }
    }
  };
  

  return (
    <footer>
      <Container>
        <Row className='footertitle'>
          <p>The Kellen Collection</p>
          <hr className='hr'/>
        </Row>
        <Row>
          <Col md={2} className='firstcol'>
            <Navbar>
              <Navbar.Brand>
                My Account
              </Navbar.Brand>
              <Nav>
                <LinkContainer to='/profile'>
                  <Nav.Link>
                    Profile
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/myorders'>
                  <Nav.Link>
                    My Orders
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    My Cart
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
          </Col>
          <Col md={2}>
            <Navbar>
              <Navbar.Brand>
                Get In Touch
              </Navbar.Brand>
              <Nav>
                <LinkContainer to='/'>
                  <Nav.Link>
                    Instagram
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/'>
                  <Nav.Link>
                    Facebook
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/'>
                  <Nav.Link>
                    TikTok
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
          </Col>
          <Col md={2}>
          <Navbar>
              <Navbar.Brand>
                Company
              </Navbar.Brand>
              <Nav>
                <LinkContainer to='/'>
                  <Nav.Link>
                    Terms & Conditions
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/'>
                  <Nav.Link>
                    Privacy Policy
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/'>
                  <Nav.Link>
                    Accessibility
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
          </Col>
          <Col md={2} className='text-center'>
          <Navbar>
              <Navbar.Brand>
                Subscribe For Latest Offers!
              </Navbar.Brand>
              <Form>
                <Form.Control type='email' placeholder="Enter Email" className='footerform'></Form.Control>
              </Form>
              <Button type='submit' className="mt-2 searchbtn" variant="white" onClick={subscribeHandler}>
                Subscribe
              </Button>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col className='text-center pt-3 copyright'>
            <p>The Kellen Collection &copy; {currentYear}. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;