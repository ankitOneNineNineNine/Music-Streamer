import React from 'react'
import { render } from '@testing-library/react'
import httpRequest from '../BackEndCall/httpRequest';
import './details.profile.css'
import Tilt from 'react-tilt'
import profile from './profile.svg'
import favorites from './favorites.svg'
import playlist from './playlist.svg'
import { NavLink } from 'react-router-dom';

const particlesOptions = {
    particles : {
      number: {
        value:30,
        density:{
          enable: true,
              value_area:100
        }
      }
    }
   }
class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            image: []
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
    render() {
        var allImg = 'http://localhost:1250/uploads/users/images/'
        const profileUrl = `${allImg}${this.state.image[0]}`
        return (
            <>
                <div className="jumbotron br0 white bg-dark cover pa3" style={{ backgroundImage: `url(${profileUrl})` }}>
                    <NavLink to='/' className=" bg-dark white dtc v-mid child bg-black-40 mt2">
                        <i className='fa fa-camera'>Update cover picture</i>
                    </NavLink>
                    <h1 className="display-4 mt0">Hello, {JSON.parse(localStorage.getItem('user')).userName}</h1>
                    <div className='center tc'>
                        <a href="#" style={{ backgroundImage: `url(${profileUrl})`, height: '200px', width: '200px' }} className="link mw5 dt center hide-child br2 cover bg-center di">
                            <NavLink to='/' className=" bg-dark white dtc v-mid w-100 h-100  child bg-black-40 pa5">
                                Update profile picture
                         </NavLink>
                        </a>
                        <h5 className="f2">{JSON.parse(localStorage.getItem('user')).fullName}</h5>
                        <p className="f3">{JSON.parse(localStorage.getItem('user')).email}</p>

                    </div>

                    <hr className="my-1" />

                    <p className='f3 center tc'>Follow Me At: </p>
                    <ul className="social-icons center inline tc center">
                        <li><a href="https://www.facebook.com" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                        <li><a href="https://www.twitter.com" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com" className="social-icon"> <i className="fa fa-instagram"></i></a></li>

                    </ul>

                    <a class="btn btn-primary btn-sm fr" href="#" role="button">Update info</a>

                </div>
          
                <div className='pa4 br3 bg-light shadow center tc'>
                <p className='br3 mt tc shadow blue'>Related Infos</p>
                    <div className='ma4 mt0 dib '>

                        <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                            <div className="Tilt-inner tc cover pa3" ><img src={profile} alt='happy' /> </div>
                            <p className='br3 mt3 tc shadow blue'>My Pictures</p>
                        </Tilt>

                    </div>
                    <div className='ma4 mt0 dib '>

                        <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                            <div className="Tilt-inner tc cover pa3" ><img src={favorites} alt='happy' /> </div>
                            <p className='br3 mt3 tc shadow blue'>My Favorites</p>
                        </Tilt>

                    </div>
                    <div className='ma4 mt0 dib '>

                        <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                            <div className="Tilt-inner tc cover pa3" ><img src={playlist} alt='happy' /> </div>
                            <p className='br3 mt3 tc shadow blue'>My Playlist</p>
                        </Tilt>

                    </div>
                </div>
             
            </>


        )
    }
}

export default Profile