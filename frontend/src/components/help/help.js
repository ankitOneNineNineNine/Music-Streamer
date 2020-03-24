import React from 'react'
import {NavLink} from 'react-router-dom'
import icon from './../Navbar/bootstrap-solid.svg'
import Footer from './../footer/footer'
function Help(){
    return (
        <>
            <div className="jumbotron br0 white bg-red">
                <h1 className="center">Important!!</h1>
                <p className="tc f3">Corona Virus </p>
                <hr className="my-4" />
                <p>
             In light of staffing measures undertaken in response to the Coronavirus disease outbreak, our ability to respond to help requests is very limited.
    
    For all but the most urgent issues, we ask you to visit our support site or community for answers to your question. Thank you in advance for understanding.
    
    2020-03-22 11:56 GMT
                </p>



            </div>
            <div className="jumbotron br0 black bg-light">
                <h1 className="center">What can we Help you with??</h1>
                <p className="tc f3">Questions?</p>
                <hr className="my-4" />
                <input type="text" class="form-control" id="search" placeholder="Search" autocomplete="off"></input>
                <p>Download HOWTO GUIDE pdf from <NavLink to = ''>HERE</NavLink></p>

         {/* {carousel}  HOWTO VIDEO, PLAYLIST*/}
            </div>

            
  <Footer/>
        </>

    )
}
export default Help