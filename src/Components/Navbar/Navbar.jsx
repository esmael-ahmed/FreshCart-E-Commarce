import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navLogo from '../../images/freshcart-logo.svg'
import { authContext } from '../../Context/Authentication'
import { cartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/Wishlist';

export default function Navbar() {
  const {token, setToken} = useContext(authContext);
  const {numOfCartItems} = useContext(cartContext);
  const {wishListCount} = useContext(wishListContext);
  

  let navigateFunc = useNavigate();
  function logOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigateFunc('/login');

  }
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary shadow position-fixed top-0 end-0 start-0 z-1">
  <div className="container">
    <Link className="navbar-brand" to="/home"><img src={navLogo} alt="" /></Link>
    {token? <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-4">
    <li className="nav-item">
          <Link className="nav-link position-relative" to="/cart"><i className="fa-solid fa-cart-shopping"></i><span className="position-absolute top-1 start-0 translate-middle badge rounded-pill bg-success">
    {numOfCartItems}
    <span className="visually-hidden">unread messages</span>
  </span></Link>
        </li>
    </ul> : ""}
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token ? <>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="cart"><i class="fa-solid fa-cart-shopping"></i></Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li></> : ""}
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item justify-content-center align-items-center d-flex">
        <div>
        <i style={{cursor:'pointer'}} className="fa-brands fa-facebook px-2"></i>
        </div>
        <div>
        <i style={{cursor:'pointer'}} className="fa-brands fa-linkedin px-2"></i>
        </div>
    </li>
    {token ? <>
      <li className="nav-item ms-3">
          <Link className="nav-link position-relative" to="/wishlist"><i className="fa-solid fa-heart fs-4 text-danger"></i><span className="position-absolute top-1 start-0 translate-middle badge rounded-pill bg-success">
    {wishListCount}
    <span className="visually-hidden">unread messages</span>
  </span></Link>
        </li>
      <li className="nav-item">
          <Link className="nav-link"  to="/allorders">All Orders</Link>
        </li>
      <li className="nav-item">
          <Link className="nav-link"  to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <span onClick={logOut} style={{cursor:'pointer'}} className="nav-link">LogOut</span>
        </li></>: <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li></> }
        
        
      </ul>
    </div>
    
  </div>
</nav>
  </>
}
