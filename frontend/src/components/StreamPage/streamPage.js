import React from 'react'
import httpRequest from '../BackEndCall/httpRequest';
import happy from './sidebar/happy.png'
import neutral from './sidebar/neutral.png'
import sad from './sidebar/sad.png'
import FileSaver from 'file-saver';
import "react-jinke-music-player/assets/index.css";
import Tilt from 'react-tilt'
import './streamPage.css'
import AudioPlayer from './audioplayer/audioPlayer'
import Songpage from './songpage/songpage';
import { NavLink } from 'react-router-dom';
import notify from '../../utils/notify';


class StreamPage extends React.Component {

    constructor() {
        super();
        this.state = {
            emotionAttribute: '',
            changeClass: {
                displayemotion: 'none',
                displayFace: 'none'
            },
            emotionDisplay: false,
            songArray: [],
            playlist: [],
            isLoading: true,
            emotionSort: false,
            myPlaylist: [],
            allSongs: true,
            status: 'disabled'

        }
    }
    emotionShow = () => {
        this.setState({
            emotionDisplay: true
        })
        this.setState(prev => ({
            changeClass: {
                displayFace: 'none',
                displayemotion: ''
            }

        }))
    }
    faceShow = () => {
        this.setState({
            emotionDisplay: false
        })
        this.setState(prev => ({
            changeClass: {
                displayFace: '',
                displayemotion: 'none'
            }

        }))
    }
    emojiValue = (e) => {
        var attribute = e.target.attributes.getNamedItem('alt').value
        this.setState({
            emotionAttribute: attribute,
            emotionSort: true,
        })
        this.setState(prev => ({
            changeClass: {
                ...prev.changeClass,
                display: 'none'
            },

        }))
    }
    savefile = (dopwnloadInfo) => {

        var stringparam = dopwnloadInfo.src.toString()
        var length = stringparam.length
        var filename = stringparam.substring(28, length)

        FileSaver.saveAs(stringparam, filename);
    }

    componentDidMount() {
        httpRequest.get('/user', {}, true)
            .then(data => {
                this.setState({
                    status: data.status
                })

            })
            .catch(err => console.log(err))
        httpRequest.get('/songs', {}.true)
            .then(data => {

                this.setState({
                    songArray: data,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))


    }


    onPlay = (songId) => {
        this.setState({
            emotionSort: false,
        })
        if (songId === 'all') {
            this.setState({
                playlist: this.state.songArray,
            })
        }
        else {

            var array = (this.state.songArray || []).filter(songs => songs._id === songId).map(songs => songs)

            this.setState({
                playlist: array
            })
        }
    }
    songOfMyPlaylist = e => {
        this.setState({
            myPlaylist: [],
            allSongs: false
        })
        httpRequest.get('/user', {}, true)
            .then(data => {
                if (!data.myPlaylist.length)
                    notify.showInfo('No songs on myPlaylist')
                data.myPlaylist.map(songs => httpRequest.get(`/songs/${songs}`, {}, true)
                    .then(data => {
                        this.setState(prev => ({
                            myPlaylist: [...prev.myPlaylist, data]
                        }))

                    })

                )
            })
            .catch(err => console.log(err))
    }
    AllSongs = e => {
        this.setState({
            allSongs: true,
        })
    }
    render() {

        var CurrentSong = JSON.parse(localStorage.getItem('lastPlayStatus')).name || null;
        var songPlaying = this.state.songArray.filter(songs => songs.name === CurrentSong)
        var songDescription;
        if (CurrentSong && songPlaying.length) {
            songDescription =
                <>
                    <p className='di tc f2 bg-light shadow'>Last Played</p>

                    <div className='songPageBody grid-container br3 ma2 br3 shadow '>

                        <li href="#" style={{ backgroundImage: `url(${songPlaying[0].cover[0]})` }} className="link grid-content mw5 dt center hide-child br2 cover bg-center di">
                            <span to='' value={songPlaying[0]._id} className=" bg-dark white dtc v-mid w-100 h-100  child bg-black-40 pa5">

                            </span>
                        </li>
                        <span className='f2 di '>{songPlaying[0].name}</span>
                        <span className='db f3'>{songPlaying[0].singer}</span>
                        <span className='db f3'>{songPlaying[0].singer.map(song => song)}</span>
                        <span className='db f3'>{songPlaying[0].emotion}</span>

                    </div>

                </>


        }
        var songForSongPage = this.state.songArray;

        if (this.state.isLoading) {
            var content = <p>Loading</p>
        }
        else {

            var emotion = '';
            if (this.state.emotionAttribute) {
                emotion = this.state.emotionAttribute
            }
            var playlist = this.state.emotionSort ?
                (emotion.toLowerCase() === 'happy' ?
                    (this.state.songArray || []).filter(songs => songs.emotion.toLowerCase() === 'happy').map(songs => songs)
                    : emotion.toLowerCase() === 'sad' ?
                        (this.state.songArray || []).filter(songs => songs.emotion.toLowerCase() === 'sad').map(songs => songs)
                        : emotion.toLowerCase() === 'neutral' ?
                            (this.state.songArray || []).map(songs => songs)
                            : (this.state.songArray || []).map(songs => songs))
                :
                (
                    this.state.playlist.length ?
                        this.state.playlist
                        : (this.state.songArray || []).map(songs => songs))

            var displayTitle = <p className='fw9 f2'>ALL SONGS</p>;
            if (this.state.emotionSort) {
                songForSongPage = playlist
                displayTitle = <p className='fw9 f2'>{emotion.toUpperCase()} SONGS</p>
            }



            var status = this.state.status

            var token = localStorage.getItem('token')
            let contentofIdeal = this.state.emotionDisplay ?
                <div className='pa4 br3 bg-light shadow' style={this.state.changeClass}>

                    <div className='ma4 mt0 dib '>

                        <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                            <div className="Tilt-inner pa3" ><img onClick={this.emojiValue} style={{ paddingTop: '5px' }} src={happy} alt='happy' /> </div>
                            <p className='br3 shadow blue'>Happy</p>
                        </Tilt>

                    </div>
                    <div className='ma4 mt0 dib '>
                        <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                            <div className="Tilt-inner pa3" ><img onClick={this.emojiValue} style={{ paddingTop: '5px' }} src={sad} alt='sad' /> </div>
                            <p className='br3 shadow blue'>Sad</p>
                        </Tilt>

                    </div>

                    <div className='ma4 mt0 dib '>

                        <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                            <div className="Tilt-inner pa3" ><img onClick={this.emojiValue} style={{ paddingTop: '5px' }} src={neutral} alt='neutral' /> </div>
                            <p className='br3 shadow blue'>Neutral</p>
                        </Tilt>

                    </div>
                </div>
                : null


            if (!token) {
                var content = <p>Please Log In and Subscribe</p>
            }

            else {
                if (this.state.myPlaylist && !this.state.allSongs) {
                    if (this.state.myPlaylist.length) {
                        displayTitle = <p className='fw9 f2'>MY PLAYLIST</p>
                        var songLists = <Songpage songs={this.state.myPlaylist} songPlay={this.onPlay} />
                    }
                    else {

                        var songLists = <Songpage songs={songForSongPage} songPlay={this.onPlay} />
                    }
                }
                else if (this.state.allSongs) {

                    var songLists = <Songpage songs={songForSongPage} songPlay={this.onPlay} />
                }

                if (status === 'enabled') {
                    var content =

                        <div className='tc pa0 mt0' style={{ zIndex: '-1' }}>
                            <div className="btn-group mt4" role="sort" aria-label="Basic example">
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{ marginTop: '-10rem', height: 'min-content' }}>
                                    Emotion Sort
                        </button>
                                <button type="button" onClick={this.songOfMyPlaylist} className="btn btn-primary" data-target="" style={{ marginTop: '-10rem', height: 'min-content' }}>
                                    My Playlist
                        </button>
                                <button type="button" onClick={this.AllSongs} className="btn btn-primary" data-target="" style={{ marginTop: '-10rem', height: 'min-content' }}>
                                    All Songs
                        </button>

                            </div>


                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Emotion Detection</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                                <div className="btn-group" role="group">
                                                    <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Select your choice
                                                 </button>
                                                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                        <NavLink to='#' className="dropdown-item link pointer bg-white" style={{ color: 'black' }} onClick={this.emotionShow}>Emoji Selector</NavLink>
                                                        <NavLink to='#' className="dropdown-item link pointer bg-white" style={{ color: 'black' }} onClick={this.faceShow}>Face Analysis</NavLink>
                                                    </div>
                                                </div>
                                            </div>

                                            {contentofIdeal}

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {displayTitle}
                            {songDescription}
                            {songLists}
                            <AudioPlayer playlist={playlist} savefile={this.savefile} />

                        </div>






                }
                else {
                    var content = <p>Please upgrade your package or do the payment</p>
                }
            }
        }

        return (
            <div style={{ marginTop: '200px' }}>

                {content}

            </div>

        )

    }
}
export default StreamPage