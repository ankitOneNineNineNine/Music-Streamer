import React from 'react'
import StreamPage from '../streamPage';
import httpRequest from '../../BackEndCall/httpRequest';
import './songpage.css'
import { NavLink } from 'react-router-dom';
function lengthCalc(array) {
    return array.length
}
class Songpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songPlay: '',
            songSelected: '',
            moreSongs: false,
            currentIndex: 1,
            searchSong: '',
            searchByName: true,

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
    moreClicked = (e) => {

        this.setState({
            moreSongs: true
        })
    }
    handlePaginationNumbers = e => {
        var currentPageNumber = this.state.currentIndex
        var valueClicked = e.target.attributes.getNamedItem('value').value;

        this.setState({
            currentIndex: valueClicked
        })


    }
    searchBy = (e) => {
        var valueClicked = e.target.attributes.getNamedItem('value').value;
        if (valueClicked === 'name') {
            this.setState({
                searchByName: true,

            })
        }
        else {
            this.setState({
                searchByName: false,

            })
        }
    }
    searchEnter = (e) => {

        this.setState({
            searchSong: e.target.value
        })
    }
    render() {
        const currentIndex = this.state.currentIndex

        const songs = (this.props.songs || []).map((song, i) => {
            var image = `${song.cover[0]}`
            if (i < 10) {
                return (
                    <div key={i} className='df ma3 pa2 shadow br3 ba b--green bg-light-blue grow w-200'>

                        <a href="#" style={{ backgroundImage: `url(${image})` }} className="link mw5 dt center hide-child br2 cover bg-center di">
                            <span to='' value={song._id} className=" bg-dark white dtc v-mid w-100 h-100  child bg-black-40 pa5">
                                <i value={song._id} onClick={this.handlePlay} className=' fa fa-4x fa-play-circle lh-copy icon' />
                            </span>
                        </a> <span className='f2'>{song.name}</span><span className='db f4'>{song.singer}</span>



                    </div>
                )

            }
        })
        var length = lengthCalc(this.props.songs)
        var array = Array.from({ length: Math.ceil(length / 10) }, () => Math.floor(Math.random() * 40));
        var pagination = array.map((item, i) => {
            return (
                <li key={i} className="page-item"><a className="page-link" onClick={this.handlePaginationNumbers} value={i + 1} href="#">{i + 1}</a></li>

            )

        })



        console.log('index', this.state.currentIndex)
        var filteredSong = this.state.searchByName ?

            (this.props.songs).filter(songs => {
                return (
                    songs.name.toLowerCase().includes((this.state.searchSong).toLowerCase())

                )

            })
            :
            (this.props.songs).filter(songs => {
                return (
                    songs.name.toLowerCase().includes((this.state.searchSong).toLowerCase())

                )

            })


        var length = lengthCalc(filteredSong)
        var array = Array.from({ length: Math.ceil(length / 10) }, () => Math.floor(Math.random() * 40));
        var paginationforFiltered = array.map((item, i) => {
            return (
                <li className="page-item"><a className="page-link" onClick={this.handlePaginationNumbers} value={i + 1} href="#">{i + 1}</a></li>

            )

        })
        var pageNumber = this.state.searchSong.length ?
            <nav aria-label="..." className='f4 flex justify-center tc center pa3 ma3' >
                <ul className="pagination ">

                    {paginationforFiltered}

                </ul>
            </nav>
            :
            <nav aria-label="..." className='f4 flex justify-center tc center pa3 ma3' >
                <ul className="pagination ">

                    {pagination}

                </ul>
            </nav>
        const allSongs = this.state.searchSong.length ?
            (filteredSong).map((song, i) => {
                var image = `${song.cover[0]}`

                return (
                    <>
                        <ul className='df ma3 pa2 shadow br3 ba b--green bg-light-blue grow'>

                            <li key={i} href="#" style={{ backgroundImage: `url(${image})` }} className="link grid-content mw5 dt center hide-child br2 cover bg-center di">
                                <span to='' value={song._id} className=" bg-dark white dtc v-mid w-100 h-100  child bg-black-40 pa5">
                                    <i value={song._id} onClick={this.handlePlay} className=' fa fa-4x fa-play-circle lh-copy icon' />
                                </span>
                            </li> <span className='f2 di '>{song.name}</span><span className='db f4'>{song.singer}</span>



                        </ul>

                    </>
                )


            })
            : (this.props.songs || []).map((song, i) => {
                var image = `${song.cover[0]}`

                if (i > ((this.state.currentIndex - 1) * 10) && i <= ((this.state.currentIndex * 10)))
                    return (
                        <>
                            <ul className='df ma3 pa2 shadow br3 ba b--green bg-light-blue grow'>

                                <li key={i} href="#" style={{ backgroundImage: `url(${image})` }} className="link grid-content mw5 dt center hide-child br2 cover bg-center di">
                                    <span to='' value={song._id} className=" bg-dark white dtc v-mid w-100 h-100  child bg-black-40 pa5">
                                        <i value={song._id} onClick={this.handlePlay} className=' fa fa-4x fa-play-circle lh-copy icon' />
                                    </span>
                                </li> <span className='f2 di '>{song.name}</span><span className='db f4'>{song.singer}</span>



                            </ul>

                        </>
                    )


            })
        var content = this.state.moreSongs ?
            <div style={{ marginTop: '-6em' }} >

                <div className='tc' style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }} >
                    <button type="button" value='all' onClick={this.handlePlay} className="mt5 clear btn btn-outline-primary br-pill">Play All</button>
                </div>
                <div className="md-form active-pink active-pink-2 ma-3 pa3 item-start">
                    <input className="form-control" type="text" onChange={this.searchEnter} placeholder="Search with a song name, artist name here" name='search' aria-label="Search" />
                    <div class="select center flex justify-center">
                        <select name="format" id="format">
                            <option selected disabled>Search by</option>
                            <option value="name">name</option>
                            <option value="artist">artist</option>

                        </select>
                    </div>
                </div>
                {pageNumber}
                <div className='songPageBody grid-container br3 ma2'>

                    {allSongs}

                </div>

            </div>
            :
            <div style={{ marginTop: '-6em' }} >

                <div className='tc' style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 'auto' }} >
                    <button type="button" value='all' onClick={this.handlePlay} className="mt5 clear btn btn-outline-primary br-pill">Play All</button>
                    <button type="button" value='more' onClick={this.moreClicked} className="mt5 clear btn btn-outline-primary br-pill">More</button>
                </div>

                <div className='flex songPageBody br3 ma2' style={{ overflowX: 'scroll' }}>

                    {songs}

                </div>

            </div>

        return (
            <>
                {content}
            </>


        )
    }
}
export default Songpage