import React from 'react'
import StreamPage from '../streamPage';
import httpRequest from '../../BackEndCall/httpRequest';
import './songpage.css'
class Songpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songPlay: ''
        }
    }

    handlePlay = (e) => {
        var attribute = e.target.attributes.getNamedItem('value').value;
        const { songPlay } = this.props
        songPlay(attribute)
    }
    render() {
        const songs = (this.props.songs || []).map((song, i) => {
            return (
                <tbody key={i}>
                    <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{song.name}</td>
                        <td>{song.singer}</td>
                        <td><i value={song._id} onClick={this.handlePlay} className='br-pill btn btn-primary fa fa-2x fa-play-circle lh-copy icon' /></td>
                    </tr>

                </tbody>
            )
        })


        return (
            <>

                <div style={{ marginTop: '-6em' }}>
                    <button type="button" value='all' onClick={this.handlePlay} className=" fr ma2 btn btn-outline-primary br-pill">Play All</button>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {songs}

                    </table>
                </div>

            </>
        )
    }
}
export default Songpage