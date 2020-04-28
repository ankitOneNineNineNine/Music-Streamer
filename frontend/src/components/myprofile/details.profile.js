import React from 'react'

import httpRequest from '../BackEndCall/httpRequest';
import './details.profile.css'
import profile from './profile.svg'
import favorites from './favorites.svg'
import playlist from './playlist.svg'
import { NavLink } from 'react-router-dom';
import notify from './../../utils/notify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AudioPlayer from '../StreamPage/audioplayer/audioPlayer';
class Profile extends React.Component {
    constructor() {
        super();

        this.state = {
            coverImg: [],
            uploadProfileRecent: false,
            uploadCoverRecent: false,
            uploadedProfileImg: null,
            uploadedCoverImg: null,
            filep: null,
            filec: null,
            changeName: false,
            changedName: null,
            infoDisplay: null,
            myPlaylist: [],
        }

    }
    componentDidMount() {
        httpRequest.get(`/user/`, {}, true)
            .then(data => {
                this.setState({
                    coverImg: data.coverImg,

                })
                data.myPlaylist.map(songs => httpRequest.get(`/songs/${songs}`, {}, true)
                    .then(data => {
                        this.setState(prev => ({
                            myPlaylist: [...prev.myPlaylist, data]
                        }))
                    })

                )

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
    displayInfo = (e) => {
        var infoDisplay = e.target.attributes.getNamedItem('alt').value;
        this.setState({
            infoDisplay,
        })
    }
    removeFromPlaylist = (id, i) => {
        const { myPlaylist } = this.state;
        myPlaylist.splice(i, 1);
        this.setState({ myPlaylist });

    }
    deleteAccount = (e) => {

        const id = JSON.parse(localStorage.getItem('user'))._id;

        httpRequest.delete(`/user/${id}`, {}, true)
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
    uploadProfileImg = () => {

        this.refs.fileProfile.click()
    }
    uploadCoverImg = () => {
        this.refs.fileUploaderCover.click();
    }
    profileImgHere = (e) => {

        this.setState({
            filep: URL.createObjectURL(e.target.files[0]),
            uploadedProfileImg: e.target.files,
            uploadProfileRecent: true
        })


    }
    coverImgHere = (e) => {

        this.setState({
            filec: URL.createObjectURL(e.target.files[0]),
            uploadedCoverImg: e.target.files,
            uploadCoverRecent: true
        })


    }
    nameEdit = (e) => {
        this.setState({
            changedName: e.target.value
        })
    }
    onProfileUpload = (e) => {

        let url = `http://localhost:1250/user/uploadPhoto?token=${localStorage.getItem('token')}`;
        e.preventDefault();
        httpRequest.upload("POST", url, {}, this.state.uploadedProfileImg)
            .then((data) => {
                this.setState({
                    uploadProfileRecent: false,
                })
                localStorage.setItem('user', JSON.stringify(JSON.parse(data).user));
                notify.showSuccess('Successfully UPDATED')
                this.props.history.push('/profile')

            })
            .catch((err) => {
                console.log(err)

            })

    }
    onCoverUpload = (e) => {
        let url = `http://localhost:1250/user/uploadCoverPhoto?token=${localStorage.getItem('token')}`;
        e.preventDefault();
        httpRequest.upload("POST", url, {}, this.state.uploadedCoverImg)
            .then((data) => {
                this.setState({
                    uploadCoverRecent: false,
                })
                notify.showSuccess('Successfully UPDATED')
                this.props.history.push('/profile')

            })
            .catch((err) => {
                console.log(err)

            })
    }
    render() {
        console.log(this.state.myPlaylist)

        var profileUrl;
        var coverUrl;
        var token = localStorage.getItem('token')
        var allImg = 'http://localhost:1250/uploads/users/profileImages/'
        var coverImg = 'http://localhost:1250/uploads/users/coverImages/'
        var profileImg = JSON.parse(localStorage.getItem('user')).image
        if (token) {
            if (profileImg)
                profileUrl = `${allImg}${profileImg[[3]]}`
            if (this.state.coverImg)
                coverUrl = `${coverImg}${this.state.coverImg[0]}`
        }
        if (this.state.infoDisplay === 'pictures') {
            var detailProfile = profileImg.map(images => {
                return (
                    <img src={`${allImg}${images}`} className='di pa2 grow br3' width='250px' />
                )
            })
            var detailCover = this.state.coverImg.map(images => {
                return (
                    <img src={`${coverImg}${images}`} width='250px' className='di pa2 grow br3' />
                )
            })


        }
        if (this.state.infoDisplay === 'playlists') {
            var playlistInfo = this.state.myPlaylist.map((song, i) => {

                var image = `${song.cover[0]}`

                return (
                    <>
                        <ul className='dib ma3 pa2 shadow br3 ba b--green bg-light-blue grow'>
                            <i onClick={() => this.removeFromPlaylist(song._id, i)} data-toggle='tooltip' title='Delete from my playlist' className={"plusIcon fa fa-3x fa-trash red"} />
                            <li key={i} href="#" style={{ backgroundImage: `url(${image})` }} className="link grid-content mw5 dt center hide-child br2 cover bg-center di">
                                <span to='' value={song._id} className=" bg-dark white dtc v-mid w-100 h-100  child bg-black-40 pa5">
                                    <i value={song._id} onClick={this.handlePlay} className=' fa fa-4x fa-play-circle lh-copy icon' />
                                </span>
                            </li> <span className='f2 di '>{song.name}</span><span className='db f4'>{song.singer}</span>



                        </ul>

                    </>
                )





            })
        }
        if (this.state.uploadProfileRecent) {
            profileUrl = this.state.filep
        }
        if (this.state.uploadCoverRecent) {
            coverUrl = this.state.filec

        }


        let buttonImage = this.state.uploadProfileRecent ?
            <button onClick={this.onProfileUpload} className='btn btn-primary br-pill mt3'>Upload</button>
            : null
        var nameField = this.state.changeName ?
            <input type='text' name='name' className='bg-dark di ' autoFocus style={{
                height: '40px',
                position: 'relative',
                top: '-10vh',
                left: '5vh',

            }} onChange={this.nameEdit} />
            : <h5 className="f2 di bg-dark white"
                style={{
                    position: 'relative',
                    top: '-10vh',
                    left: '5vh',
                }}>{JSON.parse(localStorage.getItem('user')).fullName}</h5>
        var editNameIcon = !this.state.changeName ?
            <i data-toggle='tooltip' onClick={this.editName}
                style={{
                    position: 'relative',
                    top: '-10vh',
                    left: '5vh',
                }}
                title='Change Name' className='ml3 text fa fa-2x fa-edit di white' />
            :
            <i data-toggle='tooltip' onClick={this.editName} title='Update?'
                style={{
                    position: 'relative',
                    top: '-10vh',
                    left: '5vh',
                }}
                className='ml3 text fa fa-2x fa-upload di white' />
        var coverupdate = this.state.uploadCoverRecent ?
            <button onClick={this.onCoverUpload} className='btn btn-primary br-pill mt3'>Upload</button>
            : null
        var coverLetters = this.state.uploadCoverRecent ?
            null
            : <p className='f3 text center bg-dark center bg-center tc'>Update Cover Image</p>

        var detailContent = this.state.infoDisplay === 'pictures' ?
            <div>
                <h1 className='tc'>Profile Images</h1>
                <div className='ma4 mt0 dib ' >

                    <p >{detailProfile}</p>
                </div>
                <h1 className='tc'>Cover Images</h1>
                <div className='ma4 mt0 dib ' >

                    <p >{detailCover}</p>
                </div>

            </div>
            : this.state.infoDisplay === 'playlists' ?
                <div>
                    <h1 className='tc'>My Playlist Songs</h1>
                    <div className='ma4 mt0 dib ' >

                        <p >{playlistInfo}</p>
                    </div>

                </div>
                : null
        return (
            <>
                {/* 
<div className="jumbotron br0 white bg-dark cover pa3" style={{
                    backgroundImage: `url(${coverUrl})`, backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover' }}>
                    <span onClick={this.uploadCoverImg} className="white dtc v-mid link pointer child">
                    {coverLetters}
                    <input className="file-upload" onChange={this.coverImgHere} ref="fileUploaderCover" type="file" accept="image/*" />

                </span>
                {coverupdate}

                <h1 className="display-4 mt0 text">Hello, {JSON.parse(localStorage.getItem('user')).userName}</h1>
                <div className='center tc'>
                    <div>
                        <NavLink to="#" style={{ backgroundImage: `url(${profileUrl})`, width: '200px', height: '200px' }}
                            className="link mw5 dt hide-child br2 cover bg-center center tc" >

                            <span onClick={this.uploadProfileImg} className="white dtc v-mid w-100 h-100 child bg-black-40 pa5">
                                Update profile picture
                                      <input className="file-upload" onChange={this.profileImgHere} ref="fileUploaderProfile" type="file" accept="image/*" />

                            </span>

                        </NavLink>


                    </div>
                    {buttonImage}

                    {nameField}
                    {editNameIcon}
                  

                </div>

              
            </div> */}

                <div className="jumbotron bg-cover" style={{
                    backgroundImage: `url(${coverUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: ' no-repeat',
                    backgroundClip: 'inherit',
                    height: '40vh'
                }}>
                    <span onClick={this.uploadCoverImg} className="white dtc v-mid link pointer child">
                        {coverLetters}
                        <input className="file-upload" onChange={this.coverImgHere} ref="fileUploaderCover" type="file" accept="image/*" />

                    </span>
                    {coverupdate}
                    <hr className="my-1" />

                    <div className='center tc'>
                        <div className='di'>
                            <NavLink to="#" style={{
                                backgroundImage: `url(${profileUrl})`,
                                width: ' 200px',
                                height: ' 200px',
                                borderRadius: ' 50%',
                                position: ' relative',
                                top: ' 13vh',
                                border: ' 5px solid white',
                            }}
                                className="link mw5 dt hide-child br2 cover bg-center di" >
                                <span onClick={this.uploadProfileImg} className="white dtc v-mid w-100 h-100 br-100 child bg-black-40 pa5">

                                    Update Profile Picture


                            </span>

                            <input className="file-upload" onChange={this.profileImgHere} ref="fileProfile" type="file" accept="image/*" />
                                


                            </NavLink>
                            <div className='di'>
                                {nameField}
                                {editNameIcon}

                            </div>
                            <p className="f3 bg-dark white">{JSON.parse(localStorage.getItem('user')).email}</p>

                        </div>
                    </div>
                    <hr className="my-1" />

                    <ul className="social-icons center inline tc center">
                        <li><a href="https://www.facebook.com" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                        <li><a href="https://www.twitter.com" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com" className="social-icon"> <i className="fa fa-instagram"></i></a></li>

                    </ul>

                    <NavLink to='/updateProfile'
                        style={{
                            position: ' relative',
                            top: ' -12vh',


                        }}

                        className="btn btn-primary btn-sm fr" href="#" role="button">Change Password</NavLink>
                    <NavLink to='#' onClick={() => this.submit()}
                        style={{
                            top: '-12vh',
                            position: 'relative',

                        }}
                        className="btn btn-danger btn-sm fr" href="#" role="button">Delete Account</NavLink>
                </div>


                <div className='pa4 br3 mt5 bg-light shadow center tc'>
                    <p className='br3  tc shadow blue'>Related Infos</p>
                    <div className='ma4 mt0 dib ' >


                        <div className="tc grow ba b--purple cover pa3" ><img onClick={this.displayInfo} src={profile} alt='pictures' /> </div>
                        <p className='br3 mt3 tc shadow blue'>My Pictures</p>


                    </div>
                    <div className='ma4 mt0 dib ' >


                        <div className="tc grow ba b--purple cover pa3" ><img onClick={this.displayInfo} src={favorites} alt='favorites' /> </div>
                        <p className='br3 mt3 tc shadow blue'>My Favorites</p>


                    </div>
                    <div className='ma4 mt0 dib ' >


                        <div className="tc grow ba b--purple cover pa3" ><img onClick={this.displayInfo} src={playlist} alt='playlists' /> </div>
                        <p className='br3 mt3 tc shadow blue'>My Playlist</p>


                    </div>
                </div>

                {detailContent}

            </>


        )
    }
}

export default Profile
