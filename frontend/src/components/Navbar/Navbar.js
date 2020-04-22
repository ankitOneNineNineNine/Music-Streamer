import React from 'react';
import { NavLink, Route, Redirect, BrowserRouter, withRouter } from 'react-router-dom';
import icon from './bootstrap-solid.svg'
import { GoogleLogout } from 'react-google-login';
import notify from './../../utils/notify'
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import httpRequest from '../BackEndCall/httpRequest';




const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),

    },

}));
function Navbar(props) {
    var image
    const classes = useStyles();
    function logout() {
        localStorage.clear();
        props.history.push('/')
        notify.showSuccess('Signed Out')
    }
    var token = localStorage.getItem('token')
    if (token) {

        var allImg = 'http://localhost:1250/uploads/users/images/'
        image = JSON.parse(localStorage.getItem('user')).image[0];

        if (image) {
            const profileUrl = `${allImg}${image}`
            var avatar = <Avatar className={classes.small} src={profileUrl} />


        }
        else {
            const profileUrl = JSON.parse(localStorage.getItem('user')).fullName.charAt(0)
            const avatar = <Avatar className={classes.small}>{profileUrl} </Avatar>
        }
    }

    var links = token ?

        <ul className="navbar-nav">
            <li className="nav-item dropdown">

                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className='dib'>

                        {avatar}
                    </div>
                    <span className='mr2'>Profile</span>


                </a>
                <div className="dropdown-menu fr" aria-labelledby="navbarDropdown">
                    <NavLink className="dropdown-item fr" to="/profile">My Account</NavLink>
                    <NavLink className="dropdown-item" to="/settings">Settings</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/" onClick={logout} >Logout</NavLink>
                </div>
            </li>
        </ul>
        : <ul className="navbar-nav">
            <li className="nav-item my-2 my-lg-0">
                <NavLink className='nav-link' to='/register'> Register<span className="sr-only">(current)</span></NavLink>
            </li>

            <li className="nav-item">
                <NavLink className='nav-link' to='/login'> Login<span className="sr-only">(current)</span></NavLink>
            </li>
        </ul>


    var link2 = localStorage.getItem('token') ?
        <>
            <li className="nav-item">
                <NavLink className='nav-link' to='/stream'> Music Player <span className="sr-only">(current)</span></NavLink>
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
                            <NavLink className='nav-link' to='/'>Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/help'>Help <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/plans'> Plans <span className="sr-only">(current)</span></NavLink>
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