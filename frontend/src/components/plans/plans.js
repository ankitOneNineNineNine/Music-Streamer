import React from 'react';
import './plans.css'
import { render } from '@testing-library/react';
import httpRequest from './../BackEndCall/httpRequest'
import Footer from '../footer/footer';
import notify from '../../utils/notify';
class Plans extends React.Component {
    constructor() {
        super();
        this.state = {
            dayMessage: ''
        }
    }
    componentDidMount() {
        httpRequest.get('/user/RoleCheck', {}, true)
            .then(data => {

                localStorage.setItem('status', data.status)
                this.setState({
                    dayMessage: data.msg
                })
            })
            .catch(err => console.log(err))
    }
    buyPlan = (e) => {
        var attribute = e.target.attributes.getNamedItem('value').value;
        httpRequest.post('/user/payForRole', { body: { role: attribute } }, true)
            .then(data => notify.showSuccess('Successfully upgraded'))
            .catch(err => console.log('err'))
    }
    render() {

        if (localStorage.getItem('user')) {

            var roleNumber = JSON.parse(localStorage.getItem('user')).role
            if (roleNumber === 1) {
                var roleContent = <h2>Your current plan is free package.  {this.state.dayMessage}</h2>;
            }
            else if (roleNumber === 2) {
                var roleContent = <h2>Your current plan is monthly subscription.  {this.state.dayMessage}</h2>
            }
            else if (roleNumber === 3) {
                var roleContent = <h2>Your current plan is yearly subscription.  {this.state.dayMessage}</h2>
            }

        }
        else {
            var roleContent = <h2>Please Log in to buy the below plans</h2>
        }
        return (
            <>
                <section  className="pricing-section">
                    <div className="container mt0">
                        <div className="sec-title text-center">
                            <div className="blink">
                                <span className='blinkSpan'>{roleContent}</span></div>

                            <span className="title">Upgrade a plan</span>
                            <h2>Choose a Plan</h2>
                        </div>

                        <div className="outer-box">
                            <div className="row">

                                <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp ">
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
                                            <li className="true">Quick after SignUp</li>
                                            <li className="false">No Pause and Reuse</li>
                                            <li className="false">5 songs</li>
                                            <li className="false">No Cancellation</li>
                                        </ul>
                                        <div className="btn-box">
                                            <a href='#' className="theme-btn disabled">Free Plan</a>
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
                                            <a href='#' className="theme-btn" value="2" onClick={this.buyPlan}>BUY plan</a>
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
                                            <a href='#' className="theme-btn" value='3' onClick={this.buyPlan}>BUY plan</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }

}
export default Plans