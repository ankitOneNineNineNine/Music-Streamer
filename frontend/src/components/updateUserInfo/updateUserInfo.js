import React from 'react';
import './../register/register.component.css'
import httpRequest from './../BackEndCall/httpRequest';
import { Link, Route, NavLink } from 'react-router-dom'
import notify from '../../utils/notify';
import icon from './../Navbar/bootstrap-solid.svg'

class UpdateUserInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {

            },


        }
    }
    handlechange = (e) => {
        let { name, value } = e.target
        this.setState((previousState) => ({
            data: {
                ...previousState.data,
                [name]: value,

            },


        }))

    }
    handleSubmit = (e) => {
        e.preventDefault();
        var id = JSON.parse(localStorage.getItem('user'))._id

        httpRequest.put(`/user/changepassword/${id}`, { body: this.state.data }, true)
            .then(data => {
                notify.showSuccess('Successfully changed!')
                this.props.history.push('/profile')
            })
            .catch(err => {
                notify.handleError(err)
            })
    }
    render() {


        return (

            <div className='loginbody'>
                <div className="container" style={{ marginTop: '0' }}>
                    <div className="row">
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-6 col-md-8 login-box">
                            
                            <NavLink className="navbar-brand white mt5" to='/'>
                                <img src={icon} width="50" height="50" className="d-inline-block align-top" alt="" />
                                <span style={{ fontSize: 'xx-large' }}>LOTIFY</span>
                            </NavLink>
                            <div className="col-lg-12 login-title">
                                UPDATE YOUR PASSWORD
                                 </div>
                            <div className="f6 col-lg-12 login-title">
                                Provide old and new password below                                 </div>
                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-control-label">OLD PASSWORD</label>
                                            <input type="password" className="form-control" name='oldPassword' onChange={this.handlechange} />

                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input type="password" className="form-control" name='password' onChange={this.handlechange} />

                                        </div>
                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btm login-text">
                                                <p className="crtacc white block"><NavLink className='blue' to='/profile'>Go Back</NavLink></p>
                                            </div>
                                            <div className="col-lg-6 login-btm login-button">
                                                <button type="submit" className="btn btn-outline-primary" onClick={this.handleSubmit}>Update</button>
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
export default UpdateUserInfo