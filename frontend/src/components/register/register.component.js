import React from 'react'
import './register.component.css'
import httpRequest from '../BackEndCall/httpRequest';
import { Link, Route } from 'react-router-dom'
const defaultForm = {
    fullName: null,
    email: null,
    password: null,

}

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {

                ...defaultForm,

            },
            user_userNames: [],
            user_email: [],
            isError: true,
            isLoading: false,
            isSubmitting: true,

        }
    }
    handlechange = (e) => {
        let { name, value } = e.target;


        this.setState(previousState => ({
            data: {
                ...previousState.data,
                [name]: value
            }
        }), () => {
            this.validateErrors(name)
        })

    }

    validateErrors = (name) => {
        let err;
        if (name === 'fullName')
            err = this.state.data[name].length ? '' : 'Full Name is required'
        else if (name === 'userName') {
            let a = '';
            this.state.user_userNames.forEach(user => {
                if (this.state.data[name] === user)
                    a = 'Username is taken'
            })

            err = this.state.data[name].length ?
                a
                : 'Username is required'
        }
        else if (name === 'email') {

            let a = '';
            if (this.state.data[name].includes('@')) {
                if (this.state.data[name].includes('.')) {
                    this.state.user_email.forEach(user => {
                        if (this.state.data[name] === user)
                            a = 'Email is taken'
                    })

                }

                else {
                    a = 'Invalid Email'
                }

            }
            else {
                a = 'Invalid Email'
            }
            err = this.state.data[name].length ?
                a
                : 'Email is required'
        }
        else if (name === 'password')
            err = this.state.data[name].length > 8 ? '' : 'Password should have more than eight lengths'
        else if (name === 'phoneNumber')
            err = this.state.data[name].length ? '' : 'Phone Number is required'
        else if (name === 'address')
            err = this.state.data[name].length ? '' : 'Address is required'
        else
            err = null

        this.setState(previousState => ({
            error: {

                ...previousState.error,
                [name]: err
            },

        }), () => {

            this.validateForm()
        })

    }
    validateForm = () => {
        var errors = Object
            .values(this.state.error)
            .filter(err => err);



        var valid = errors.length === 0
        if (valid) {
            this.setState({
                isSubmitting: false
            })
        }
        this.setState({
            isError: !valid,

        })

    }
    handleRegister = (e) => {

        if (!this.state.isError) {
            this.setState({
                isSubmitting: true
            })
            httpRequest.post('/auth/register', { body: this.state.data })
                .then((data) => {

                    this.props.history.push('/login')
                })
                .catch(err => {
                    console.log(err)

                })
        }
        e.preventDefault();
    }
    componentDidMount() {
        httpRequest.get('/auth/duplicacyCheck', {})
            .then(data => {

                if (data.length) {

                    data.forEach(user => {
                        this.setState({
                            user_userNames: [...this.state.user_userNames, user.userName],
                            user_email: [...this.state.user_email, user.email]
                        })
                    })
                }

            })

    }


    render() {
        let btn = this.state.isSubmitting ?
        <div className="col-lg-6 login-btm login-button">
        <button type="submit" className="btn btn-outline-primary" disabled>Register</button>
    </div>
        :     <div className="col-lg-6 login-btm login-button">
        <button type="submit" className="btn btn-outline-primary" onClick={this.handleSubmit}>Re</button>
    </div>
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
                                REGISTER
                             </div>
                            <div className="f6 col-lg-12 login-title">
                                Provide your details below
                             </div>
                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-control-label">FULLNAME</label>
                                            <input type="text" className="form-control" name='fullName' onChange={this.handlechange} />
                                            <p className='red'>{this.state.error.fullName}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">USERNAME</label>
                                            <input type="text" className="form-control" name='userName' onChange={this.handlechange} />
                                            <p className='red'>{this.state.error.userName}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">EMAIL</label>
                                            <input type="text" className="form-control" name='email' onChange={this.handlechange} />
                                            <p className='red'>{this.state.error.email}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input type="password" className="form-control" name='password' onChange={this.handlechange} />
                                            <p className='red'>{this.state.error.password}</p>
                                        </div>
                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btm login-text">
                                                <p className="crtacc white block">Already Have an Account? Log in <Link to='/login'>Here</Link></p>
                                            </div>
                                            {btn}




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
export default Register