import React from 'react'
import httpRequest from '../BackEndCall/httpRequest';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Tilt from 'react-tilt'
import happy from './images/happy.webp'
import sad from './images/sad.png'
import loved from './images/loved.png'
import demotivated from './images/demotivated.webp'
import './streamPage.css'
class StreamPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songArray: [
                {
                    name: ' Something Just like this',
                    artist: 'Coldplay ft ChainSmoker',
                    image: 'img',
                    duration: '2:36',
                    link: 'http://localhost:1250/songs/The Chainsmokers & Coldplay - Something Just Like This.mp3'
                }
            ],
            dayMessage: '',
            changeClass: 'hidden'
        }
    }
    changeClass = () => [
        this.setState({
            changeClass: ''
        })
    ]
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


    render() {
        console.log(this.state.changeClass)
        var status = localStorage.getItem('status')
        var token = localStorage.getItem('token')
        if (!token) {
            var content = <p>Please Log In and Subscribe</p>
        }
        else {

            if (status === 'enabled') {
                var content =
                    <div className = 'tc'>

                        <h2 className=''>How are you feeling? Choose the emojees to express... </h2>
                        <div className='ma4 mt0 dib '>
                            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                <div className="Tilt-inner pa3"><img style={{ paddingTop: '5px' }} src={happy} alt='happy' /> </div>
                                <p className = 'br3 shadow blue'>Happy</p>
                            </Tilt>

                        </div>
                        <div className='ma4 mt0 dib '>
                            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                <div className="Tilt-inner pa3"><img style={{ paddingTop: '5px' }} src={sad} alt='Sad' /> </div>
                                <p className = 'br3 shadow blue'>Sad</p>
                            </Tilt>

                        </div>
                        <div className='ma4 mt0 dib '>
                            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                <div className="Tilt-inner pa3"><img style={{ paddingTop: '5px' }} src={loved} alt='In Love' /> </div>
                                <p className = 'br3 shadow blue'>In Love</p>
                            </Tilt>

                        </div>
                        <div className='ma4 mt0 dib '>
                            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                                <div className="Tilt-iner pa3"><img style={{ paddingTop: '5px' }} src={demotivated} alt='Demotivated' /> </div>
                                <p className = 'br3 shadow blue'>Demotivated</p>
                            </Tilt>

                        </div>








                        <AudioPlayer
                            // autoPlay
                            src={this.state.songArray[0].link}
                            onPlay={e => console.log("onPlay")}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                position: 'fixed',
                                bottom: '0'
                            }}
                        />
                    </div >
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