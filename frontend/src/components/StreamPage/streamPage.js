import React from 'react'
import httpRequest from '../BackEndCall/httpRequest';
import happy from './sidebar/happy.png'
import neutral from './sidebar/neutral.png'
import sad from './sidebar/sad.png'
import FileSaver, { saveAs } from 'file-saver';
import "react-jinke-music-player/assets/index.css";
import Tilt from 'react-tilt'

import './streamPage.css'
import { withRouter } from 'react-router-dom';
import notify from '../../utils/notify';

import AudioPlayer from './audioplayer/audioPlayer'
import Songpage from './songpage/songpage';


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
            dayMessage: '',
            playlist: [],
            isLoading: true,
            emotionSort: false,
            myPlaylist: [],


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

    componentDidMount() {
        httpRequest.get('/songs', {}.true)
            .then(data => {

                this.setState({
                    songArray: data,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))


    }


    savefile = (dopwnloadInfo) => {

        var stringparam = dopwnloadInfo.src.toString()
        var length = stringparam.length
        var filename = stringparam.substring(28, length)

        FileSaver.saveAs(stringparam, filename);
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
        })
        httpRequest.get('/user', {}, true)
            .then(data => {
                data.myPlaylist.map(songs => {
                    httpRequest.get(`/songs/${songs}`, {}, true)
                        .then(data => {
                            this.setState(prev => ({
                                myPlaylist: [...prev.myPlaylist, data]
                            }))
                        })

                })
            })
            .catch(err => console.log(err))
    }
    render() {
        // const songDescription = this.state.songSelected ?
        //     <>
        //         <div class="card-body w-100 br3 shadow-5 pa3">

        //             <div className='dib mb2'>
        //                 <p className='db f2 bg-light shadow'>Now Playing</p>
        //             </div>
        //             <div className='dib'>
        //                 <img src={this.state.songSelected.cover[0]} width='200px' height='auto' />

        //             </div>

        //             <div className='dib mb2'>
        //                 <p className='f1 pa3'>{this.state.songSelected.name}</p>
        //                 <p className='f2 pa2'>{this.state.songSelected.singer.map(song => song)}</p>
        //                 <p className='f3 pa1'>{this.state.songSelected.emotion}</p>

        //             </div>
        //         </div>
        //     </>
        //     :
        //     null
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

            var displayTitle = <p className = 'fw9 f2'>ALL SONGS</p>;
            if (this.state.emotionSort) {
                songForSongPage = playlist
                displayTitle = <p className = 'fw9 f2'>{emotion.toUpperCase()} SONGS</p>
            }
            




            var status = localStorage.getItem('status')

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
                if (this.state.myPlaylist) {
                    if (this.state.myPlaylist.length) {
                        displayTitle = <p className = 'fw9 f2'>MY PLAYLIST</p>
                        var songLists = <Songpage songs={this.state.myPlaylist} songPlay={this.onPlay} />
                    }
                    else {
                        var songLists = <Songpage songs={songForSongPage} songPlay={this.onPlay} />
                    }
                }
                if (status === 'enabled') {
                    var content =

                        <div className='tc pa0 mt0' style={{ zIndex: '-1' }}>

                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{ marginTop: '-10rem' }}>
                                Emotion Sort
                        </button>
                            <button type="button" onClick={this.songOfMyPlaylist} className="btn btn-primary" data-toggle="modal" data-target="" style={{ marginTop: '-10rem' }}>
                                My Playlist
                        </button>
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
                                                        <a className="dropdown-item link pointer" onClick={this.emotionShow}>Emoji Selector</a>
                                                        <a className="dropdown-item link pointer" onClick={this.faceShow}>Face Analysis</a>
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