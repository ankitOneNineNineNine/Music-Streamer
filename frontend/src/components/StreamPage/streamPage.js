import React from 'react'
import httpRequest from '../BackEndCall/httpRequest';

class StreamPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songArray: [],
            dayMessage: ''
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
    }


    render() {
        console.log(this.state.dayMessage)
        var status = localStorage.getItem('status')
        var token = localStorage.getItem('token')
        if (!token) {
           var content =  <p>Please Log In and Subscribe</p>
        }
        else {

            if (status === 'enabled') {
                var content =
                    <div>
                        <table border style={{ tableLayout: 'fixed' }}>
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