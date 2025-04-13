import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');


  const [menu, setMenu] = useState("home")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }



  return (
    <>
      <div className='navbar'>
        <Link to='/'>
          <img className='logo' src={assets.logo} alt="" />
        </Link>
        <ul className="navbar-menu">
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" onClick={() => setIsSearching(!isSearching)} />
          <div className="navbar-search-icon">
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="" />
            </Link>


            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='navbar-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}

        </div>
      </div>
      {isSearching && (
        <div className="search-container">
          <input
            type="search"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="navbar-setSearch"
            placeholder='Search any food'

          />
        </div>
      )}

    </>
  )
}

export default Navbar
