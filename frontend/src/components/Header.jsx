import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaShoppingBag, FaHome } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import {resetCart} from '../slices/cartSlice';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate('/');
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <header className='mb-3'>
            <Navbar bg="white" expand="md" className='navbar' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>The Kellen Collection</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <SearchBox/>
                            <LinkContainer to='/'>
                                <Nav.Link className='navbtn'>
                                    <FaHome /> Home
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/products'>
                                <Nav.Link to='/products' className='navbtn'>
                                    <FaShoppingBag/> Shop Now
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link className='navbtn'>
                                    <FaShoppingCart /> Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                                { cartItems.reduce((a, c) => a + c.qty, 0) }
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.isAdmin ? 'Admin' : userInfo.name} id='usermenu'>
                                    <LinkContainer to='/profile'>
                                    <NavDropdown.Item className='droptxt'>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    {userInfo.isAdmin && (
                                    <>
                                        <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item className='droptxt'>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item className='droptxt'>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item className='droptxt'>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                    )}
                                    <NavDropdown.Item onClick={logoutHandler} className='droptxt'>Logout</NavDropdown.Item>
                                </NavDropdown>
                                ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link className='navbtn'>
                                    {<FaUser />} Sign In
                                    </Nav.Link>
                                </LinkContainer>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;