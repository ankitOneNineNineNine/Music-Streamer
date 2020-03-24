import React from 'react'
import img1 from './images/img1.jpeg'
import img2 from './images/image2.jpg'
import './homepage.css'
import './homepage2.css'
import icon from './../Navbar/bootstrap-solid.svg'
import { NavLink } from 'react-router-dom'
// import img3 from '/images/img1.jpeg'
function HomePage() {
    return (
        <>

            <div className="jumbotron br0 white bg-dark">
                <h1 className="center">Welcome to BLOTIFY !</h1>
                <p className="tc f3">Register or Log in to stream Music.</p>
                <hr className="my-4" />

                <div className='tc f4 iconbody'>

                    <div className="footer-social-icons">
                        <h4 className="inline">Follow us on</h4>
                        <ul className="social-icons center inline">
                            <li><a href="" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                            <li><a href="" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                            <li><a href="" className="social-icon"> <i className="fa fa-instagram"></i></a></li>


                        </ul>
                    </div>
                </div>



            </div>

            <div className="container text-center">
                <h2 className="features-heading">Blotify gives you instant access to millions of songs – from old favorites to the latest hits. Just hit play to stream anything you like.</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-6">
                                <img className=" pa0 center-block" src="//www.scdn.co/i/generic/premium-img1.jpg" />
                                <h3 className="mt2">Listen everywhere</h3>
                                <p classNameName='mt0'>Blotify works on your computer, mobile, tablet and TV.</p>
                            </div>
                            <div className="col-sm-6">
                                <img className="center-block" src="//www.scdn.co/i/generic/premium-img2.jpg" />
                                <h3 className="mt2">Unlimited, ad-free music</h3>
                                <p>No ads. No interruptions. Just music.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-6">
                                <img className="center-block" src="//www.scdn.co/i/generic/premium-img3.jpg" />
                                <h3 className="mt2">Download music &amp; listen offline</h3>
                                <p>Keep playing, even when you don't have a connection.</p>
                            </div>
                            <div className="col-sm-6">
                                <img className="center-block" src="//www.scdn.co/i/generic/premium-img4.jpg" />
                                <h3 className="mt2">Premium sounds better</h3>
                                <p>Get ready for incredible sound quality.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <footer className="footer-distributed">

                <div className="footer-left">

                    <a className="navbar-brand" href="#">
                        <img src={icon} width="30" height="30" className="d-inline-block align-top" alt="" />
                        LOTIFY
  </a>

                    <p className="footer-company-name">Blotify © 2020</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>4044 Bekhal</span> Bhaktapur, Nepal</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>+977 98056456456</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">support@Blotify.com</a></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

                    <div className='tc f4 iconbody'>

                        <div className="footer-social-icons">
                            <h4 className="inline">Follow us on</h4>
                            <ul className="social-icons center inline">
                                <li><a href="" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                                <li><a href="" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                                <li><a href="" className="social-icon"> <i className="fa fa-instagram"></i></a></li>


                            </ul>
                        </div>
                    </div>


                </div>

            </footer>

        </>
    )
}
export default HomePage