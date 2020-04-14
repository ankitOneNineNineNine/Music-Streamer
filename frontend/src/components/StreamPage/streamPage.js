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
import Sidebar from './sidebar/sidebar';
import AudioPlayer from './audioplayer/audioPlayer'
import Emotion from '../EmotionDetector/emotionClicker/emotion';


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
            isLoading: true


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
            emotionAttribute: attribute
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

    render() {
        if (this.state.isLoading) {
            var content = <p>Loading</p>
        }
        else {

            var emotion = '';
            if (this.state.emotionAttribute) {
                emotion = this.state.emotionAttribute
            }
            var playlist = emotion.toLowerCase() === 'happy' ?
                (this.state.songArray || []).filter(songs => songs.emotion.toLowerCase() === 'happy').map(songs => songs)
                : emotion.toLowerCase() === 'sad' ?
                    (this.state.songArray || []).filter(songs => songs.emotion.toLowerCase() === 'sad').map(songs => songs)
                    : emotion.toLowerCase() === 'neutral' ?
                        (this.state.songArray || []).map(songs => songs)
                        : (this.state.songArray || []).map(songs => songs)

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

                if (status === 'enabled') {
                    var content =

                        <div className='tc pa0 mt0' style={{ zIndex: '-1' }}>

                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{ marginTop: '-10rem' }}>
                                Emotion Sort
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

                            <AudioPlayer playlist={playlist} savefile={this.savefile} />
                        </div>






                }
                else {
                    var content = <p>Please upgrade your package or do the payment</p>
                }
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