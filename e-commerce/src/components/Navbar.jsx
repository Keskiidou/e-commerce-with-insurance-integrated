import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../img/warden3rdlogo.png';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId'); 
        navigate('/');
    };

    const navLinkStyle = {
        margin: '0 25px',
        fontFamily: 'abril-fatface',
        fontSize: '20px'
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2 d-flex align-items-center" to="/">
                    <img src={logo} alt="Logo" className="ms-2" style={{ height: '40px', width: '200px', color: '#4169E1' }} />
                    <span style={{ color: '#4169E1' }}></span>
                </NavLink>

                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center"> 
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact style={navLinkStyle}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product" style={navLinkStyle}>Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" style={navLinkStyle}>Contact</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={navLinkStyle}>
                                About
                            </NavLink>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="../AboutINS">Insurance</NavLink>
                                <NavLink className="dropdown-item" to="../About">Shop</NavLink>
                                <NavLink className="dropdown-item" to="../AboutRepair">Repair</NavLink>
                            </div>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {localStorage.getItem('userId') ? (
                            <>
                                <NavLink to={`/profile?id=${localStorage.getItem('userId')}`} className="btn btn-outline-dark m-2">Profile</NavLink>
                                <button onClick={handleLogout} className="btn btn-outline-dark m-2">Logout</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i>Login</NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i>Register</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
