import React from 'react';
import './plans.css'

function Plans() {
    return (
        <section className="pricing-section">
            <div className="container mt0">
                <div className="sec-title text-center">
                    <span className="title">Get plan</span>
                    <h2>Choose a Plan</h2>
                </div>

                <div className="outer-box">
                    <div className="row">

                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                            <div className="inner-box">
                                <div className="icon-box">
                                    <div className="icon-outer"><i className="fa fa-music"></i></div>
                                </div>
                                <div className="price-box">
                                    <div className="title">Trial</div>
                                    <h4 className="price">FREE</h4>
                                </div>
                                <ul className="features">
                                    <li className="true">Ad free </li>
                                    <li className="true">7 Days Period</li>
                                    <li className="true">Easy Access</li>
                                    <li className="true">Upgrade facility </li>
                                    <li className="false">No Pause and Reuse</li>
                                    <li className="false">5 songs</li>
                                    <li className="false">No Cancellation</li>
                                </ul>
                                <div className="btn-box">
                                    <a href = '#' className="theme-btn">BUY plan</a>
                                </div>
                            </div>
                        </div>


                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="400ms">
                            <div className="inner-box">
                                <div className="icon-box">
                                    <div className="icon-outer"><i className="fa fa-music"></i></div>
                                </div>
                                <div className="price-box">
                                    <div className="title">Monthly Subscription</div>
                                    <h4 className="price">$10</h4>
                                </div>
                                <ul className="features">
                                    <li className="true">Unlimited songs</li>
                                    <li className="true">Ad free </li>
                                    <li className="true">One Month Period</li>
                                    <li className="true">Easy Access</li>
                                    <li className="true">Payment monthly accepted</li>
                                    <li className="false">No Pause and Resume</li>
                                    <li className="false">No Cancellation</li>
                                </ul>
                                <div className="btn-box">
                                    <a href = '#' className="theme-btn">BUY plan</a>
                                </div>
                            </div>
                        </div>


                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="800ms">
                            <div className="inner-box">
                                <div className="icon-box">
                                    <div className="icon-outer"><i className="fa fa-music"></i></div>
                                </div>
                                <div className="price-box">
                                    <div className="title">Yearly Subscription</div>
                                    <h4 className="price">$100</h4>
                                </div>
                                <ul className="features">
                                    <li className="true">Unlimited</li>
                                    <li className="true">Ad free </li>
                                    <li className="true">One Year Period</li>
                                    <li className="true">Easy Access</li>
                                    <li className="true">Payment Yearly accepted</li>
                                    <li className="true">Pause and Resume</li>
                                    <li className="true">Cancel any time</li>
                                </ul>
                                <div className="btn-box">
                                    <a href = '#' className="theme-btn">BUY plan</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default Plans