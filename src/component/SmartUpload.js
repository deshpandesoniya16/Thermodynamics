import React, { Component } from "react"
import Side from "../component/Sidenav"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar,Search,Divider,Container,Grid,Rating,Card,Progress,List,Radio,Segment,Popup,Button,TextArea,Menu, Image, Icon, Header ,Input,Table,Modal,Form} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {fbs} from "./base"


class SmartUpload extends Component {


    state = {
        username: '',
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: ''
      };
    
      handleChangeUsername = (event) => this.setState({username: event.target.value});
      handleUploadStart = () => this.setState({isUploading: true, progress: 0});
      handleProgress = (progress) => this.setState({progress});
      handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
      }
      handleUploadSuccess = (filename) => {
        this.setState({uploadedfileName: filename, progress: 100, isUploading: false});
        fbs.child(filename).getDownloadURL().then(url => this.setState({uploadedfileurl: url}));
      };

    render () {


        return (
            <div>

            <form>
           
            {this.state.isUploading &&
              <p>Progress: {this.state.progress}</p>
            }
            {this.state.avatarURL &&
              <img src={this.state.avatarURL} />
            }
            <FileUploader
              accept="image/*"
              name="avatar"
              multiple
              randomizeFilename
              storageRef={fbs}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </form>
<br/>
          <Progress percent={this.state.progress} active color="green">
          Smart Speed
        </Progress>
            </div>
        )
    }

}


export default SmartUpload