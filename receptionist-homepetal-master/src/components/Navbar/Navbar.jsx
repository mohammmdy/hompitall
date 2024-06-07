import React from 'react'
import logo from '../../images/fav.png'
import { Link, useLocation } from 'react-router-dom'
export default function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className='container-fluid'>
        <div className="navbar-brand d-flex align-items-center">
        <img src={logo} alt='homepital' width={100}/>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
            <ul className='navbar-nav me-auto'>
            <li className="nav-item mx-2 link-style">
                <Link className={pathname==='/update'?"nav-link botton rounded text-white":"nav-link"} to={"/update"}>تعديل حاله</Link>
               
            </li>
            <li className="nav-item ">
                <Link className={pathname==='/'?"nav-link botton rounded text-white":"nav-link"} to={"/"}>اضافه حاله</Link>
            </li>
            </ul>
        </div>
       
        
            
            </div>
</nav>
    </div>
  )
}
