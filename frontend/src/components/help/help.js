import React from 'react'
import {NavLink} from 'react-router-dom'

import Footer from './../footer/footer'
import AudioPlayer from '../StreamPage/audioplayer/audioPlayer'
var searchSong;
function Help(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const searchEnter = (e) => {

 
            searchSong=  e.target.value
        
    }
    const handleKeyDown = (e) =>{
        console.log(searchSong)
    }
    console.log(searchSong)
    return (
        <>
            <div className="jumbotron br0 white bg-red">
                <h1 className="center">Important!!</h1>
                <p className="tc f3">Corona Virus </p>
                <hr className="my-4" />
                <p>
             In light of staffing measures undertaken in response to the Coronavirus disease outbreak, our ability to respond to help requests is very limited.
    
    For all but the most urgent issues, we ask you to visit our support site or community for answers to your question. Thank you in advance for understanding.
    
    {date} {time}
                </p>



            </div>
            <div className="jumbotron br0 black bg-light">
                <h1 className="center">What can we Help you with??</h1>
                <p className="tc f3">Choose Your Topic Below</p>
                <hr className="my-4" />
                
                <input className="form-control bg-light center tc" type="text" onChange={searchEnter} style={{ width: '100%', color: 'gray' }} placeholder="Ask your queries" name='search' aria-label="Search"  onKeyDown={handleKeyDown} />
                <p>Download HOWTO GUIDE pdf from <NavLink to = ''>HERE</NavLink></p>

         {/* {carousel}  HOWTO VIDEO, PLAYLIST*/}
            </div>

            
  <Footer/>
  
        </>

    )
}
export default Help