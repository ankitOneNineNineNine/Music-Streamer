import React from 'react';
import './uploadImage.css'
import httpRequest from '../BackEndCall/httpRequest';

export default class UploadImage extends React.Component {
    constructor() {
        super()
        this.state = {
            file: null,
            image: null
        }
    }
    handleChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            image: e.target.files
        })
    }
    upload = (e) =>{
        let url = `http://localhost:1250/user/uploadPhoto?token=${localStorage.getItem('token')}`;
        e.preventDefault();
        httpRequest.upload("POST", url,{},this.state.image)
            .then((data) => {
                console.log(data)
                this.props.history.push('/myprofile')
                
            })
            .catch((err) => {
                console.log(err)
                
            })
    }
    render() {
        var btn = this.state.file ?
            <button type="button" className="btn btn-success tc center" onClick = {this.upload}>Upload</button>
            : ''
        return (
            <div className="container py-5 bg-dark mt5 center br3 ">
                <header className="text-white text-center">
                    <h1 className="display-4">Profile Picture Upload</h1>
                    <p className="lead mb-0">Upload your profile picture</p>
                    <img src="https://res.cloudinary.com/mhmd/image/upload/v1564991372/image_pxlho1.svg" alt="" width="150" className="mb-4" />
                </header>


                <div className="row py-4">
                    <div className="col-lg-6 mx-auto">
                        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                            <input id="upload" type="file" onChange={this.handleChange} className="form-control border-0" />
                            <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">Choose file</label>
                            <div className="input-group-append">
                                <label htmlFor="upload" className="btn btn-light m-0 rounded-pill px-4"> <i className="fa fa-cloud-upload mr-2 text-muted"></i><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                            </div>
                        </div>
                        <div className="image-area mt-4"><img id="imageResult" src={this.state.file} alt="" className="img-fluid rounded shadow-sm mx-auto d-block" /></div>
                        {btn}
                    </div>
                </div>
            </div>
        )
    }
}