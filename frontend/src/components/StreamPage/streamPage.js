import React from 'react'
import httpRequest from '../BackEndCall/httpRequest';

class StreamPage extends React.Component {
    constructor() {
        super();
        this.state = {
            songArray: []
        }
    }


    render() {
            
        return (


            <div>
                <table border style = {{tableLayout : 'fixed'}}>
                    <tr>
                        <th>
                            S.N.
                        </th>
                        <th>
                            Song
                        </th>
                        <th>
                            Player
                        </th>
                    </tr>
                    <tr>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>
                    <audio controls autoplay>
                    
                    <source src='http://localhost:1250/songs/The Chainsmokers & Coldplay - Something Just Like This.mp3' type='audio/mp3' />
                </audio>
                    </td>

                    </tr>

                </table>
               
            </div>
        )

    }
}
export default StreamPage