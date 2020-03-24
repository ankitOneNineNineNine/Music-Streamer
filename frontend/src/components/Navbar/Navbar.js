import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from './bootstrap-solid.svg'

function Navbar() {
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink class="navbar-brand" to='/'>
                    <img src={icon} width="30" height="30" class="d-inline-block align-top" alt="" />
                    LOTIFY
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <NavLink className='nav-link' to='/help'>Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/help'>Help <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/plans'> Plans <span className="sr-only">(current)</span></NavLink>
                        </li>


                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item my-2 my-lg-0">
                            <NavLink className='nav-link' to='/register'> Register<span className="sr-only">(current)</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className='nav-link' to='/login'> Login<span className="sr-only">(current)</span></NavLink>
                        </li>
                    </ul>



                </div>
            </nav>
        </div>
    )
}
export default Navbar;