import React from 'react'
import './login.component.css'
import { Link, Route } from 'react-router-dom'
import httpRequest from '../BackEndCall/httpRequest';
import notify from './../../utils/notify';
import './webCam.css'

class Webcam extends React.Component {
    setRef = webcam => {
      this.webcam = webcam;
    };
  
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
    };
  
    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };
          
          const WebcamCapture = () => {
            const webcamRef = React.useRef(null);
          
            const capture = React.useCallback(
              () => {
                const imageSrc = webcamRef.current.getScreenshot();
              },
              [webcamRef]
            );
          
            return (
              <>
               <div className = 'container'>

                <Webcam
                  audio={false}
                  height={720}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={1280}
                  videoConstraints={videoConstraints}
                />
                <div class="player-buttons"></div>
               </div>
              </>
            );
          };
    }
  }
export default Webcam;