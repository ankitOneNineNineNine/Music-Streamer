import React from 'react'
import './../login/login.component.css'
import { NavLink } from 'react-router-dom'
import httpRequest from '../BackEndCall/httpRequest';
import notify from './../../utils/notify'
const defaultForm = {
 
    email: null,


}

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                    ...defaultForm
               
            },
            error: {
                ...defaultForm
            },
            user_email: [],
            isError: true,
            isSubmitting: true,
           
        }
    }
    handleChange = (e) => {
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
        if (name === 'email') {

            let a = '';
            if (this.state.data[name].includes('@')) {
                if (this.state.data[name].includes('.')) {
                    this.state.user_email.forEach(user => {
                        if (this.state.data[name] === user)
                            a = ''
                    })

                }

                else {
                    a = 'Email not found'
                }

            }
            else {
                a = 'Invalid Email'
            }
            err = this.state.data[name].length ?
                a
                : 'Email is required'
        }
      
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
        if(valid){
            this.setState({
                isSubmitting: false
            })
        }
        this.setState({
            isError: !valid,

        })

    }
    handleSubmit = (e) => {
        
        if (!this.state.isError) {
            this.setState({
                isSubmitting: true
            })
            httpRequest.post('/auth/forgot-password', { body: this.state.data })
            .then((data) => {
                notify.showSuccess('A reset link has been sent to your email')
                this.props.history.push('/login')
            })
            .catch(err => {
                console.log(err)
                notify.handleError(err);
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
                            
                            user_email: [...this.state.user_email, user.email]
                        })
                    })
                }

            })
            console.log(this.state.user)

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
    warn = (e)=>{
        notify.handleError('Fill the form correctly')
        e.preventDefault();
    }
    render() {
        let btn = this.state.isSubmitting?
        <div className="col-lg-6 login-btm login-button">
        <button type="submit" className="btn btn-outline-primary" disabled>Submit</button>
    </div>
        :     <div className="col-lg-6 login-btm login-button">
        <button type="submit" className="btn btn-outline-primary" onClick={this.handleSubmit}>Submit</button>
    </div>

        return (
            <div className='loginbody'>
                <div className="container mt0">
                    <div className="row">
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-6 col-md-8 login-box">
                            <div className="col-lg-12 login-key">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                            <div className="col-lg-12 login-title">
                                Forgot Password
                    </div>
                    <div className="f6 col-lg-12 login-title">
                                Provide accurate result to submit
                    </div>
                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-control-label">EMAIL</label>
                                            <input type="text" className="form-control" onChange={this.handleChange} name='email' />
                                            <p className = 'red'>{this.state.error.email}</p>
                                        </div>
                                      
                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btm login-text">

                                                <p className="crtacc white block">Want to Log in? Log in <NavLink className = 'blue' to='/login'>Here</NavLink></p>

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
export default ForgotPassword