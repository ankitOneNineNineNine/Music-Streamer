import React from 'react'
import icon from './../Navbar/bootstrap-solid.svg'
function Footer() {
    return (
        <footer className="footer-distributed">

            <div className="footer-left">

                <a className="navbar-brand" href="#">
                    <img src={icon} width="30" height="30" className="d-inline-block align-top" alt="logo" />
                   <span className = 'white'> LOTIFY</span>
        </a>
                <p className="footer-company-name" style={{ color: 'white' }}>We understand your song's choice</p>
                <p className="footer-company-name" style={{ color: 'white' }}>Blotify © 2020</p>
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
                    Blotify is a web service which provides music streaming service. In addition to regular
                    streaming service, it provides an emotion based service which accepts the user emotions
                    and based on that, suggests the playlist or the favorites from their own playlist.
        </p>

                <div className='tc f4 iconbody'>

                    <div className="footer-social-icons">
                        <h4 className="inline tc">Follow us on</h4>
                        <ul className="social-icons center inline tc">
                            <li><a href="https://www.facebook.com" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://www.twitter.com" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                            <li><a href="https://www.instagram.com" className="social-icon"> <i className="fa fa-instagram"></i></a></li>

                        </ul>
                    </div>
                </div>


            </div>

        </footer>
    )
}
export default Footer