import React from 'react'
import './homepage.css'
import './homepage2.css'

import { NavLink } from 'react-router-dom'
import Footer from './../footer/footer'
import httpRequest from './../BackEndCall/httpRequest'
class HomePage extends React.Component {
    componentDidMount(){
        httpRequest.get('/user/RoleCheck', {}, true)
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
    }

    render() {

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
                                <li><a href="https://www.facebook.com" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://www.twitter.com" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com" className="social-icon"> <i className="fa fa-instagram"></i></a></li>


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
                                    <img alt = 'first' className=" pa0 center-block" src="//www.scdn.co/i/generic/premium-img1.jpg" />
                                    <h3 className="mt2">Listen everywhere</h3>
                                    <p className='mt0'>Blotify works on your computer, mobile, tablet and TV.</p>
                                </div>
                                <div className="col-sm-6">
                                    <img alt= 'second' className="center-block" src="//www.scdn.co/i/generic/premium-img2.jpg" />
                                    <h3 className="mt2">Unlimited, ad-free music</h3>
                                    <p>No ads. No interruptions. Just music.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-sm-6">
                                    <img alt = 'third' className="center-block" src="//www.scdn.co/i/generic/premium-img3.jpg" />
                                    <h3 className="mt2">Download music &amp; listen offline</h3>
                                    <p>Keep playing, even when you don't have a connection.</p>
                                </div>
                                <div className="col-sm-6">
                                    <img alt = 'fourth' className="center-block" src="//www.scdn.co/i/generic/premium-img4.jpg" />
                                    <h3 className="mt2">Premium sounds better</h3>
                                    <p>Get ready for incredible sound quality.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
                
            </>
        )
    }
}
export default HomePage