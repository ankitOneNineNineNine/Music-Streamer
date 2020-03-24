import React from 'react'
import './login.component.css'
import { Link, Route } from 'react-router-dom'
import httpRequest from '../BackEndCall/httpRequest';
import notify from './../../utils/notify'
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
           
        }
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        httpRequest.post('/auth/login', { body: this.state })
            .then((data) => {
                notify.showSuccess(`Welcome ${data.user.userName}`)
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token)

                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                notify.handleError(err);
            })

    }
    render() {
        return (
            <div className='loginbody'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-6 col-md-8 login-box">
                            <div className="col-lg-12 login-key">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                            <div className="col-lg-12 login-title">
                                LOGIN
                    </div>
                            <div className="f6 col-lg-12 login-title">
                                Provide your email and password below
                    </div>
                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-control-label">EMAIL</label>
                                            <input type="text" className="form-control" onChange={this.handleChange} name='email' />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input type="password" className="form-control" onChange={this.handleChange} name='password' />
                                        </div>

                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btm login-text">

                                                <p className="crtacc white block">Don't Have an Account? Register <Link to='/register'>Here</Link></p>

                                            </div>

                                            <div className="col-lg-6 login-btm login-button">
                                                <button type="submit" className="btn btn-outline-primary" onClick={this.handleLogin}>LOGIN</button>
                                            </div>
                                            <div className="col-lg-6 login-btm login-text">

                                                <p className="crtacc white block">Forgot password? <Link to='/forgot-password'>Here</Link></p>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-2"></div>
                        </div>
                    </div>
                </div>

            </div>





        )



    }


}
export default Login