import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const ContactScreen = () => {

  return (
    <>
      <Meta title="Contact Us | The Kellen Collection" />
      <Row className='contact'>
        <Col md={6}>
          <FormContainer>
            <Row>
              <Col>
                <h3 className='my-3'>Contact Us</h3>
                <p>Phone:</p>
                <p>Email: thekellencollection@gmail.com</p>
              </Col>
            </Row>

            <Form className='contactform'>
              <Row>
                <Col>
                  {/* Name */}
                  <Form.Group controlId='name'>
                    <Form.Control name='name' type='name' placeholder='Enter Name' className='large-input' required />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group controlId='email'>
                    <Form.Control name='email' type='email' placeholder='Enter Email' className='large-input' required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* Message */}
                  <Form.Group controlId='message'>
                    <Form.Control name='message' as='textarea' placeholder='Type your message here...' className='large-textarea' required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  {/* Submit */}
                  <Button type='submit' variant='primary' className="mt-2 searchbtn">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </FormContainer>
        </Col>
        <Col md={6} className='mb-5'>
          <Image src='images/Coming-Soon.jpeg' alt='contact image' fluid className='contactimage' />
        </Col>
      </Row>
    </>
  )
}

export default ContactScreen;
