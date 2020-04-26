import React from 'react';
import { NavLink, Route, Redirect, BrowserRouter, withRouter } from 'react-router-dom';
import icon from './bootstrap-solid.svg'
import { GoogleLogout } from 'react-google-login';
import notify from './../../utils/notify'
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import httpRequest from '../BackEndCall/httpRequest';
import './Navbar.css'



const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),

    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },

}));
function Navbar(props) {
    var image;
    const classes = useStyles();
    function logout() {
        localStorage.clear();
        props.history.push('/')
        notify.showSuccess('Signed Out')
    }
    var token = localStorage.getItem('token')
    var profileUrl;

    if (token) {


        var allImg = 'http://localhost:1250/uploads/users/images/'
        image = JSON.parse(localStorage.getItem('user')).image[0];
        profileUrl = `${allImg}${image}`

        if (image) {
            if (image.length) {

                var avatar = <Avatar src={profileUrl} className='mr2' />


            }
            else {
                const profileUrl = JSON.parse(localStorage.getItem('user')).fullName.charAt(0)
                var avatar = <Avatar className={classes.orange}>{profileUrl}</Avatar>
            }

        }
        else {
            const profileUrl = JSON.parse(localStorage.getItem('user')).fullName.charAt(0)
            var avatar = <Avatar className={classes.orange}>{profileUrl}</Avatar>
        }

    }
    var links = token ?
        <div class="btn-group">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className='dib'>

                    {avatar}
                </div>


            </a>
            <div class="dropdown-menu ">
                <div class="py-4 px-3 mb-4 bg-light" style={{ width: '300px' }}>
                    <div class="media d-flex align-items-center">{avatar}
                        <div class="media-body ma3">
                            <h4 class="m-0">{JSON.parse(localStorage.getItem('user')).fullName}</h4>
                            <p class="font-weight-light text-muted mb-0">{JSON.parse(localStorage.getItem('user')).email}</p>
                        </div>
                    </div>
                </div>
                <NavLink className="dropdown-item fr" to="/profile">My Account</NavLink>
                <NavLink className="dropdown-item bg-light" style= {{color: 'black'}} onClick={logout} to="/">Logout</NavLink>
            </div>
        </div>


        :

        <ul className="navbar-nav">
            <li className="nav-item my-2 my-lg-0">
                <NavLink className='nav-link' to='/register'> Register</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className='nav-link' to='/login'> Login</NavLink>
            </li>
        </ul>


    var link2 = localStorage.getItem('token') ?
        <>
            <li className="nav-item">
                <NavLink className='nav-link' to='/stream'> Music Player </NavLink>
            </li>

        </>
        : ''

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{
                position: 'fixed', top: '0', width: '100%', zIndex: '1'
            }}>
                <NavLink className="navbar-brand" to='/'>
                    <img src={icon} width="30" height="30" className="d-inline-block align-top" alt="" />
                    LOTIFY
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto"
                        style={{
                            float: 'left',
                            textDecoration: 'none',
                        }}

                    >

                        <li className="nav-item">
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/help'>Help</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/plans'> Plans</NavLink>
                        </li>
                        {link2}

                    </ul>
                    {links}



                </div>
            </nav>
        </div>
    )
}
export default withRouter(Navbar);