import React from 'react'
import { render } from '@testing-library/react'
import httpRequest from '../BackEndCall/httpRequest';
import './details.profile.css'
import Tilt from 'react-tilt'
import profile from './profile.svg'
import favorites from './favorites.svg'
import playlist from './playlist.svg'
import { NavLink } from 'react-router-dom';
import notify from './../../utils/notify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
class Profile extends React.Component {
    constructor() {
        super();

        this.state = {
            image: [],
            uploadedRecent: false,
            uploadedImage: null,
            file: null,
            changeName: false,
            changedName: null
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
    submit = (id, i) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete your account? Every saved file will be lost and can not be retrieved! & Money will not be refunded!',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.deleteAccount()
                    }
                },
                {
                    label: 'No',

                }
            ]
        })
    }
    deleteAccount = (e) => {

        const id = JSON.parse(localStorage.getItem('user'))._id;

        httpRequest.delete(`/user/${id}`, {} , true)
            .then(data => {

                notify.showSuccess('Account Deleted Successfuly')
                localStorage.clear();
                this.props.history.push('/')

            })
            .catch(err => {
                notify.handleError(err)
            })
     
    

}
editName = (e) => {
    if (this.state.changeName === false) {
        this.setState({
            changeName: true,
        })
    }
    else {
        var userId = JSON.parse(localStorage.getItem('user'))._id
        httpRequest.put(`/user/${userId}`, {
            body: {
                fullName: this.state.changedName
            }
        }, true)
            .then(data => {
                this.setState({
                    changeName: false,
                })

                localStorage.setItem('user', JSON.stringify(data.data.user));
                notify.showSuccess('Successfully changed the name')
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err))
    }
}
uploadImage = () => {
    this.refs.fileUploader.click();
}
imageHere = (e) => {
    console.log('file', e.target.files[0])
    this.setState({
        file: URL.createObjectURL(e.target.files[0]),
        uploadedImage: e.target.files,
        uploadedRecent: true
    })


}
nameEdit = (e) => {
    this.setState({
        changedName: e.target.value
    })
}
onUpload = (e) => {

    let url = `http://localhost:1250/user/uploadPhoto?token=${localStorage.getItem('token')}`;
    e.preventDefault();
    httpRequest.upload("POST", url, {}, this.state.uploadedImage)
        .then((data) => {
            this.setState({
                uploadedRecent: false,
            })
            localStorage.setItem('user', JSON.stringify(JSON.parse(data).user));
            notify.showSuccess('Successfully UPDATED')
            this.props.history.push('/profile')

        })
        .catch((err) => {
            console.log(err)

        })

}
render() {

    var profileUrl;
    var token = localStorage.getItem('token')
    var allImg = 'http://localhost:1250/uploads/users/images/'
    if (token) {
        var profileUrl = `${allImg}${this.state.image[0]}`
    }
    if (this.state.uploadedRecent) {
        profileUrl = this.state.file
    }
    var coverUrl = ''
    let buttonImage = this.state.uploadedRecent ?
        <button onClick={this.onUpload} className='btn btn-primary br-pill mt3'>Upload</button>
        : null
    var nameField = this.state.changeName ?
        <input type='text' name='name' className='bg-dark' autoFocus style={{ height: '40px' }} onChange={this.nameEdit} />
        : <h5 className="f2 di">{JSON.parse(localStorage.getItem('user')).fullName}</h5>
    var editNameIcon = !this.state.changeName ?
        <i data-toggle='tooltip' onClick={this.editName} title='Change Name' className='ml3 fa fa-2x fa-edit di white' />
        :
        <i data-toggle='tooltip' onClick={this.editName} title='Update?' className='ml3 fa fa-2x fa-upload di white' />
    return (
        <>


            <div className="jumbotron br0 white bg-dark cover pa3" style={{ backgroundImage: `url(${coverUrl})` }}>
                <NavLink to='/' className=" bg-dark white dtc v-mid child bg-black-40 mt2">
                    <i className='fa fa-camera'>Update cover picture</i>
                </NavLink>
                <h1 className="display-4 mt0">Hello, {JSON.parse(localStorage.getItem('user')).userName}</h1>
                <div className='center tc'>
                    <div>
                        <a href="#" style={{ backgroundImage: `url(${profileUrl})`, width: '200px', height: '200px' }}
                            className="link mw5 dt hide-child br2 cover bg-center center tc" >

                            <span onClick={this.uploadImage} className="white dtc v-mid w-100 h-100 child bg-black-40 pa5">
                                Update profile picture
                                      <input class="file-upload" onChange={this.imageHere} ref="fileUploader" type="file" accept="image/*" />

                            </span>

                        </a>


                    </div>
                    {buttonImage}

                    {nameField}
                    {editNameIcon}
                    <p className="f3">{JSON.parse(localStorage.getItem('user')).email}</p>

                </div>

                <hr className="my-1" />

                <p className='f3 center tc'>Follow Me At: </p>
                <ul className="social-icons center inline tc center">
                    <li><a href="https://www.facebook.com" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                    <li><a href="https://www.twitter.com" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.instagram.com" className="social-icon"> <i className="fa fa-instagram"></i></a></li>

                </ul>

                <NavLink to='/updateProfile' className="btn btn-primary btn-sm fr" href="#" role="button">Change Password</NavLink>
                <NavLink to='#' onClick={()=> this.submit()} className="btn btn-danger btn-sm fl" href="#" role="button">Delete Account</NavLink>
            </div>

            <div className='pa4 br3 bg-light shadow center tc'>
                <p className='br3 mt tc shadow blue'>Related Infos</p>
                <div className='ma4 mt0 dib '>


                    <div className="tc grow ba b--purple cover pa3" ><img src={profile} alt='happy' /> </div>
                    <p className='br3 mt3 tc shadow blue'>My Pictures</p>


                </div>
                <div className='ma4 mt0 dib '>


                    <div className="tc grow ba b--purple cover pa3" ><img src={favorites} alt='happy' /> </div>
                    <p className='br3 mt3 tc shadow blue'>My Favorites</p>


                </div>
                <div className='ma4 mt0 dib '>


                    <div className="tc grow ba b--purple cover pa3" ><img src={playlist} alt='happy' /> </div>
                    <p className='br3 mt3 tc shadow blue'>My Playlist</p>


                </div>
            </div>

        </>


    )
}
}

export default Profile