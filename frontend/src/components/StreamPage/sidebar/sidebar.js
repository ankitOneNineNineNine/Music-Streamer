import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './sidebar.css'
import notify from './../../../utils/notify'
import httpRequest from '../../BackEndCall/httpRequest'
import { render } from '@testing-library/react'

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      image: [],
      toggleClass: {
        display: 'none'
      },
      contentClass: {
        width: '100%',
        marginLeft: '500',
        transition: 'all 0.4s',
      },
      btnClass: {

      }
    }
  }
  componentDidMount() {
    httpRequest.get(`/user/`, {}, true)
      .then(data => {
        this.setState({
          image: data.image
        })

      })
  }

  logout() {
    localStorage.clear();
    this.props.history.push('/')
    notify.showSuccess('Signed Out')
  }
  onToggle = () => {
    if (this.state.toggleClass.display === '') {
      var css = 'none'
      this.setState(prev => ({
        contentClass: {
          width: '100%',
          margin: '0',
          transition: 'all 0.4s',
        },

      }))
    }
    if (this.state.toggleClass.display === 'none') {
      var css = ''
      this.setState(prev => ({
        contentClass: {
          width: 'calc(100% - 17rem)',
          marginLeft: '17rem',
          transition: 'all 0.4s',
        },

      }))
    }
    this.setState(prev => ({
      toggleClass: {
        ...prev.toggleClass,
        display: css,
        transition: 'all 0.4s',
      }
    }))






  }

  render() {
    var btn = this.state.toggleClass.display === 'none' ?
      <button onClick={this.onToggle} className={this.state.btnClass} id="sidebarCollapse" type="button" className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"><i class="fa fa-bars mr-2"></i><small class="text-uppercase font-weight-bold">Menu</small></button>
      : <button onClick={this.onToggle} className = {this.state.btnClass} id="sidebarCollapse" type="button" className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"><i class="fa fa-bars mr-2"></i><small class="text-uppercase font-weight-bold">Close</small></button>
    var allImg = 'http://localhost:1250/uploads/users/images/'
    const profileUrl = `${allImg}${this.state.image[0]}`
    console.log(profileUrl)
    var userName = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : 'userName'
    var email = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : 'email'

    return (
      <div>

        <div className="vertical-nav bg-white bg-dark" id="sidebar" style={this.state.toggleClass}>
          <div className="py-4 px-3 mb-4 bg-light">

            <div className="media d-flex align-items-center db"><img src={profileUrl}
              alt="..." width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" style={{
                width: '60px',
                height: '60px'
              }} />
              <div className="media-body">
                <h4 className="m-0">{userName}</h4>
                <p className="font-weight-light text-muted mb-0">{email}</p>
              </div>
            </div>
          </div>
          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item">
              <p className='ba pa2 green'>Search the songs either by the name, artist or emotion below</p>
              <form className="form-inline my-2 my-lg-0 mt3 pa3">
                <input className="form-control mr-sm-2 mt1 pa2" type="search" placeholder="Search" aria-label="Search" />
              </form>
            </li>
          </ul>
          <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/plans' className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-tasks mr-3 text-primary fa-fw"></i>
                Plans
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/help" className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-question-circle mr-3 text-primary fa-fw"></i>
                Help
              </NavLink>
            </li>

          </ul>

          <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Music Player</p>

          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item">
              <NavLink to="#" className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-music mr-3 text-primary fa-fw"></i>
                Playlist
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-music mr-3 text-primary fa-fw"></i>
                Recent Playlist
              </NavLink>
            </li>

          </ul>
          <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Account</p>

          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item">
              <NavLink to="/account" className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-user mr-3 text-primary fa-fw"></i>
                My Account
              </NavLink>
              <NavLink to="/settings" className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-cogs mr-3 text-primary fa-fw"></i>
                Settings
              </NavLink>
              <NavLink to="/" onClick={this.logout} className="nav-link text-dark font-italic bg-light">
                <i className="fa fa-sign-out mr-3 text-primary fa-fw"></i>
                Logout
              </NavLink>


            </li>


          </ul>
        </div>
        <div className="page-content p-5" id="content" style={this.state.contentClass}>
          {btn}
        </div>
      </div>

    )
  }

}
export default withRouter(Sidebar)