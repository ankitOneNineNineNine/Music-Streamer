import React from 'react'
import httpRequest from '../BackEndCall/httpRequest';

import FileSaver, { saveAs } from 'file-saver';
import "react-jinke-music-player/assets/index.css";
import Tilt from 'react-tilt'
import happy from './images/happy.webp'
import sad from './images/sad.png'
import loved from './images/loved.png'
import demotivated from './images/demotivated.webp'
import './streamPage.css'
import { withRouter } from 'react-router-dom';
import notify from '../../utils/notify';
import Sidebar from './sidebar/sidebar';
import AudioPlayer from './audioplayer/audioPlayer'
import SongPage from './SongsPage/songPage';
class StreamPage extends React.Component {

    constructor() {
        super();
        this.state = {
            emotionAttribute: '',
            songArray: [
                {
                    name: ' Something Just like this',
                    singer: ['Coldplay', 'ChainSmoker'],
                    emotion: 'happy',
                    cover: 'http://localhost:1250/images/The Chainsmokers & Coldplay - Something Just Like This.jpg',

                    musicSrc: 'http://localhost:1250/songs/The Chainsmokers & Coldplay - Something Just Like This.mp3'
                },
                {
                    name: 'Love Runs Out',
                    singer: 'One Republic',
                    cover: 'img',
                    emotion: 'inLove',
                    musicSrc: 'http://localhost:1250/songs/OneRepublic - Love Runs Out.mp3'
                }
            ],
            dayMessage: '',
            changeClass: {
                display: 'none'
            },

        }
    }
    changeClass = () => {

        if (this.state.changeClass.display === 'none') {
            this.setState(prev => ({
                changeClass: {
                    ...prev.changeClass,
                    display: 'inline-block'
                },

            }))
        }
        else {
            this.setState(prev => ({
                changeClass: {
                    ...prev.changeClass,
                    display: 'none'
                },

            }))
        }

    }
    componentDidMount() {
        httpRequest.get('/user/RoleCheck', {}, true)
            .then(data => {

                localStorage.setItem('status', data.status)
                this.setState({
                    dayMessage: data.msg
                })
            })
            .catch(err => console.log(err))


        httpRequest.get('/stream/', {}, true)
            .then(data => console.log('data', data))
            .catch(err => console.log('err', err))
    }
    emojiValue = (e) => {
        var attribute = e.target.attributes.getNamedItem('alt').value
        this.setState({
            emotionAttribute: attribute
        })
        this.setState(prev => ({
            changeClass: {
                ...prev.changeClass,
                display: 'none'
            },

        }))
    }
    goBack = () => {
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

    render() {
        var emotion = 'happy'
        if (this.state.emotionAttribute) {
            emotion = this.state.emotionAttribute
        }
        var playlist = emotion === 'happy' ?
            this.state.songArray.filter(songs => songs.emotion === 'happy').map(songs => songs)
            : emotion === 'sad' ?
                this.state.songArray.filter(songs => songs.emotion === 'sad').map(songs => songs)
                : emotion === 'inLove' ?
                    this.state.songArray.filter(songs => songs.emotion === 'inLove').map(songs => songs)
                    : emotion === 'demotivated' ?
                        this.state.songArray.filter(songs => songs.emotion === 'happy').map(songs => songs)
                        : []
        var status = localStorage.getItem('status')
        var token = localStorage.getItem('token')
        if (!token) {
            var content = <p>Please Log In and Subscribe</p>
        }
        else {

            if (status === 'enabled') {
                var content =
                    <>
                        
                        <div className='tc mt0 pa0' style={{ zIndex: '-1' }}>
                            <div>
                                <nav class="menu">
                                    <ol>
                                        <li class="menu-item"><a href="#0">Emotion Detection</a>
                                            <ol class="sub-menu">
                                                <li class="menu-item"><a href="#0" onClick={this.changeClass}>Emoji Picker</a></li>
                                                <li class="menu-item"><a href="#0">Face Detection</a></li>

                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className='pa4 br3 bg-light shadow' style={this.state.changeClass}>

                                <div className='ma4 mt0 dib '>

                                    <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                        <div className="Tilt-inner pa3" ><img onClick={this.emojiValue} style={{ paddingTop: '5px' }} src={happy} alt='happy' /> </div>
                                        <p className='br3 shadow blue'>Happy</p>
                                    </Tilt>

                                </div>
                                <div className='ma4 mt0 dib '>
                                    <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                        <div className="Tilt-inner pa3" ><img onClick={this.emojiValue} style={{ paddingTop: '5px' }} src={sad} alt='Sad' /> </div>
                                        <p className='br3 shadow blue'>Sad</p>
                                    </Tilt>

                                </div>
                                <div className='ma4 mt0 dib '>
                                    <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                        <div className="Tilt-inner pa3" ><img onClick={this.emojiValue} style={{ paddingTop: '5px' }} src={loved} alt='inLove' /> </div>
                                        <p className='br3 shadow blue'>In Love</p>
                                    </Tilt>

                                </div>
                                <div className='ma4 mt0 dib '>
                                    <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                        <div className="Tilt-iner pa3" ><img onClick={this.emojiValue} style={{ paddingTop: '5px' }} src={demotivated} alt='Demotivated' /> </div>
                                        <p className='br3 shadow blue'>Demotivated</p>
                                    </Tilt>
                                </div>

                                <nav class="menu">
                                    <ol>
                                        <li className="menu-item db mt4" onClick={this.goBack}><a href="#0">Close</a>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div>

                            </div>

                            <AudioPlayer playlist={playlist} savefile={this.savefile} />
                        </div>


                        <SongPage />


                    </>
            }
            else {
                var content = <p>Please upgrade your package or do the payment</p>
            }
        }

        return (
            <>
                {content}
            </>

        )

    }
}
export default StreamPage