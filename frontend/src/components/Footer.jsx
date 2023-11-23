import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row className='footertitle'>
          <p>The Kellen Collection</p>
          <hr className='hr'/>
        </Row>
        <Row className='footerlinks d-flex justify-content-center align-items-center'>
          <Col lg={4} md={4} sm={6} xs={6} className='footerlinkscol'>
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
          <Col lg={4} md={4} sm={6} xs={12} className='footerlinkscol'>
            <Navbar>
              <Navbar.Brand>
                Get In Touch
              </Navbar.Brand>
              <Nav>
              <Nav.Link href="https://www.tiktok.com/@thekellencollection" target='_blank'>
                  TikTok
                </Nav.Link>
                <Nav.Link href="https://www.instagram.com/thekellencollection/" target='_blank'>
                  Instagram
                </Nav.Link>
                <Nav.Link href="https://www.facebook.com/thekellencollection/" target='_blank'>
                  Facebook
                </Nav.Link>
              </Nav>
            </Navbar>
          </Col>
          <Col lg={4} md={12} sm={12} xs={6} className='footerlinkscol'>
          <Navbar>
              <Navbar.Brand>
                Company
              </Navbar.Brand>
              <Nav>
                <LinkContainer to='/terms&conditions'>
                  <Nav.Link>
                    Terms & Conditions
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/privacypolicy'>
                  <Nav.Link>
                    Privacy Policy
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/accessibility'>
                  <Nav.Link>
                    Accessibility
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col className='text-center pt-3 copyright'>
            <p>The Kellen Collection &copy; {currentYear}. All rights reserved.</p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center copyright devware'>
            <a href='https://jackmuir.dev/'>Developed by Jack Muir</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;