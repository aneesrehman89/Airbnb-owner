import Avatar from '@mui/material/Avatar';
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Store from "../mainComponents/Store";
export default function Navbar() {
  const { owner, setOwner } = useContext(Store);
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookies] = useCookies(['token']);
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Remove the 'token' cookie upon signout
    removeCookies("token");
    setTimeout(() => {
      navigate('/');
      setOwner()
      console.log('Navigating to login');
    }, 1000);

  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark py-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold fs-2" to='/'>Owner AirBnb</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 routesBtn">
              <li className="nav-item">
                <NavLink className="nav-link " to='/user'>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/add'>Add Hostels</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/show'>Hostels</NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to='/'>Action</NavLink></li>
                  <li><NavLink className="dropdown-item" to='/'>Another action</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to='/'>Something else here</NavLink></li>
                </ul>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link ">Disabled</NavLink>
              </li> */}
            </ul>
            <div className="d-flex" role="search">
              <div className='btn-group dropstart'>
                <button
                  type='button'
                  className='py-1 px-3 rounded-5 border border-dark bg-light d-md-flex d-none  flex-row justify-content-center align-content-center'
                  data-bs-toggle='dropdown'
                  data-bs-display='static'
                  aria-expanded='false'
                >
                  <i className='bi bi-list me-2 fs-4'></i>
                  {owner && owner.ownerEmail && owner.ownerName ? (
                    <Avatar alt="Remy Sharp" src={owner.ownerImage} />
                  ) : (
                    <Avatar>{ }</Avatar>
                  )}
                </button>
                <ul className='dropdown-menu   '>
                  <li>
                    {owner && owner.ownerEmail && owner.ownerName ? (
                      <Link className='dropdown-item ' to=''>
                        Profile
                      </Link>
                    ) : (
                      <Link className='dropdown-item' to='/'>
                        Login
                      </Link>)}

                  </li>
                  <li><hr className="dropdown-divider fw-bold" /></li>
                  <li className='nav-item'>
                    {owner && owner.ownerEmail && owner.ownerName ? (
                      <Link className='dropdown-item'
                        onClick={handleSignOut}
                      >
                        SignOut
                      </Link>
                    ) : (
                      <Link className='dropdown-item' to='/signup'>
                        Register
                      </Link>
                    )}
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
