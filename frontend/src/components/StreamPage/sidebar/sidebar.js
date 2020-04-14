import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './sidebar.css'
import notify from './../../../utils/notify'


class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      classOfIcon: {
        display: 'none',

      }
    }
  }
  ToggleClicked = () => {

    this.setState({
      toggle: !this.state.toggle
    })
    if (this.state.classOfIcon.display === 'none') {
      this.setState(prev => ({
        classOfIcon: {
          ...prev.classOfIcon,
          display: '',
          position: 'relative'
        }
      }))
    }
    else {
      this.setState(prev => ({
        classOfIcon: {
          ...prev.classOfIcon,
          display: 'none'
        }
      }))
    }


  }


  render() {
    console.log(this.state.toggle, this.state.classOfIcon)
    var allImg = 'http://localhost:1250/uploads/users/images/'
    var image = JSON.parse(localStorage.getItem('user')).image[0]
    const profileUrl = `${allImg}${image}`
    var userName = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : 'userName'
    var email = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : 'email'
    var imgbutton = this.state.toggle ?

      <img src={profileUrl}
        alt="..." width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" style={{
          width: '60px',
          height: '60px',
          marginTop: '5rem',
          opacity: '50%',
        }} onClick={this.ToggleClicked} />
      :
      <img src={profileUrl}
        alt="..." width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" style={{
          width: '60px',
          height: '60px',
          marginTop: '5rem'
        }} onClick={this.ToggleClicked} />


    return (

      <>




        {imgbutton}
        <div className='bg-dark ma5' style={this.state.classOfIcon} >

          <aside className="sidebar ">

            <ul className="nav-list">
              <li className="nav-item">
                <i className="fa fa-music "></i>
                <span className="text">Recent Playlist</span>
              </li>
              <li className="nav-item active">
                <i className="fa fa-music "></i>
                <span className="text">My Playlist</span>
              </li>
              <li className="nav-item">
                <i className="fa fa-plus"></i>
                <span className="text">New Playlist</span>
              </li>

            </ul>
            <div className="btn-toggle black">
              <span className="text">


              </span>
              <i className="ri-arrow-left-line"></i>
            </div>

          </aside>
        </div>

      </>
    )
  }
}
export default withRouter(Sidebar)