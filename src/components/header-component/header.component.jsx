import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ currentUser }) => {
    return (
        < Navbar bg="dark" variant="dark" data-test='headerComponent'>
            <Navbar.Brand as={Link} to='/' data-test='headerBrand'>Sulman Todo's</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {
                    currentUser ?
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => auth.signOut()} data-test='logoutLink'>Logout</Nav.Link>
                        </Nav> :
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to='/login' data-test='loginLink'>Login</Nav.Link>
                        </Nav>
                }

            </Navbar.Collapse>
        </Navbar >
    )

};

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    return {
        currentUser: uid
    }
}

export default connect(mapStateToProps)(Header);