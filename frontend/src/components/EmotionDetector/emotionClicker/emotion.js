import React from 'react'

import Tilt from 'react-tilt'
import happy from './../../StreamPage/sidebar/happy.png'
import sad from './../../StreamPage/sidebar/sad.png'

import { withRouter } from 'react-router-dom';
import notify from '../../../utils/notify';


class Emotion extends React.Component {
    constructor() {
        super();
        this.state = {
         
        }
    }
   
    openModal() {
        this.setState({ openEmotion: true });
    }

    closeModal() {
        this.setState({ openEmotion: false });
    }
    render() {
        return (
            <>
                

                
            </>
        )
    }
}
export default Emotion