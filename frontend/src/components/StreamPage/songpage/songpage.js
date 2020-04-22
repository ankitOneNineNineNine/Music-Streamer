import React from 'react'
import StreamPage from '../streamPage';
import httpRequest from '../../BackEndCall/httpRequest';
import './songpage.css'
import { NavLink } from 'react-router-dom';
class Songpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songPlay: '',
            songSelected: ''
        }
    }

    handlePlay = (e) => {
        var attribute = e.target.attributes.getNamedItem('value').value;

        var songPlaying = (this.props.songs.filter(song => song._id === attribute));
        this.setState({
            songSelected: songPlaying[0]
        })
        const { songPlay } = this.props
        songPlay(attribute)
    }

    render() {



        const songs = (this.props.songs || []).map((song, i) => {
            var image = `${song.cover[0]}`
            return (
                <div key={i} className='df ma5'>

                    <a href="#" style={{ backgroundImage: `url(${image})` }} className="link mw5 dt center hide-child br2 cover bg-center di">
                        <span to='' value={song._id} className=" bg-dark white dtc v-mid w-100 h-100  child bg-black-40 pa5">
                            <i value={song._id} onClick={this.handlePlay} className=' fa fa-4x fa-play-circle lh-copy icon' />
                        </span>
                    </a> <span className='f2'>{song.name}</span><span className='db f4'>{song.singer}</span>



                </div>
            )
        })
        const songDescription = this.state.songSelected ?
            <>
                <div class="card-body w-100 br3 shadow-5 pa3">
                </div>
                <div>
                    <div className='dib mb2'>
                        <p className='db f2 bg-light shadow br3'>Now Playing</p>
                    </div>
                    <div className='dib'>
                        <img src={this.state.songSelected.cover[0]} width='400px' height='auto' />

                    </div>

                    <div className='dib mb2'>
                        <p className='f1 pa3'>{this.state.songSelected.name}</p>
                        <p className='f2 pa2'>{this.state.songSelected.singer.map(song => song)}</p>
                        <p className='f3 pa1'>{this.state.songSelected.emotion}</p>

                    </div>
                </div>
            </>
            :
            null


        return (
            <>

                <div style={{ marginTop: '-6em' }}>
                    <div className='tc' style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 'auto' }} >
                        <button type="button" value='all' onClick={this.handlePlay} className="mt5 clear btn btn-outline-primary br-pill">Play All</button>
                        <button type="button" value='all' className="mt5 clear btn btn-outline-primary br-pill">More</button>
                    </div>

                    <div className='flex mt2 songPageBody' style={{ overflowX: 'scroll' }}>
                        {songDescription}
                        {songs}

                    </div>

                </div>

            </>
        )
    }
}
export default Songpage