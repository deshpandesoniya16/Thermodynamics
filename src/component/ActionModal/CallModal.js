import React, { Component } from "react"
import Side from "./Sidenav"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar,Search,Divider,Container,Grid,Rating,Card,Segment,Popup,Button,TextArea,Menu, Image,Progress,Icon,Header,Input,Table,Modal,Form} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import  ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import Carousel from 'nuka-carousel';
import SmartUpload from "../component/SmartUpload";
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {tixy_fbs} from "../component/base"
import {productListapi,AssetList} from  "../component/Api"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment"
import MediaQuery from "react-responsive"
import Select from "../../node_modules/semantic-ui-react/dist/commonjs/addons/Select/Select";
import {Lead_fbs, visit_fbs,meeting_fbs,call_fbs} from "../component/base"

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

import {verticallist,
  grouplist,
  subgrplist,
  verticalBasedgrp,
  grpBasedsubgrp} from './Api';

import styled from "styled-components"

import {
  PageContainer,
  IconDiv,
  HeadingDiv,
  HeadingText,
  FormDiv,
  FormBorder,
  MainDiv,
  Form1Div,
  IconDivShare,
  FormText,
  ContentArea,
  Form2Div,
  TixyContent,
  PageContainer2,
  TableContent
} from "../styledComps.js"

import StarRatingComponent from 'react-star-rating-component';
import RawCarousel from "./RawCarousel"

class CallModal extends Component {




    render(){


        return(
            <div>

                
         <Modal open={isCall} className="alertOfFileds" style={{marginTop:"2em"}} closeIcon onClose={this.handleClose} >
            <Modal.Header>
              <center><Icon name="call" size="big" color="black"/></center>
              </Modal.Header>

              <Modal.Content>
              <div>


<label className="labelcolor" style={{width:"5em"}}><b>Action Info :-</b></label><br/>   



 <Grid columns='equal'>
    <Grid.Row>
      <Grid.Column>
      <label className="labelcolor" style={{width:"5em"}}>From Date :</label><br/><br/>

    <DatePicker
selected={this.state.CallDate}
onChange={this.handleCalldate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormatCalendar="MMMM"
scrollableYearDropdown
yearDropdownItemNumber={15}
style={{width:"9em"}}
/> 
      </Grid.Column>

      <Grid.Column>
      <label>Select Time</label>
    <TimePicker
    showSecond={true}
    defaultValue={Calltime}
    className="xxx"
    onChange={this.handleCallTime}
    format={format}
    use24Hours
    inputReadOnly
  />
    </Grid.Column>
</Grid.Row>
</Grid>

<br/>

<Form  widths='equal'>
<Form.Group >

<label className="labelcolor" style={{width:"5em"}}>Type of Call :-</label><br/>   
<br/>
<select value={call} onChange={this.handleCall}>
<option value=""></option>

</select>
<Button style={{ backgroundColor: "#863577",color: "#ffffff" }} onClick={()=>this.handleTypeOfCallVisit()}>Add Type Of Visit</Button>

<hr />
</Form.Group>

<Form>


<Form.Group widths='equal'>
<Form.Input
label='Call Expected Outcome'           
placeholder="Call Expected Outcome" 
type="text"
value={CallexOutCome}
onChange={this.handleCallExoutCome}
required
/>         

<Form.Input
label='Call actual outcome'           
placeholder="Call actual outcome" 
type="text"
value={CallactualOutcome}
onChange={this.handleCallAoutCome}
required
/>         
</Form.Group> 

<label className="labelcolor">Call Description :</label><br/>   
<br/>
<TextArea 
placeholder='Tell us more'
value={Calldiscription}
onChange={this.handleCallDiscribe} 
rows={10}   
/>

</Form>
<br/>
<center>
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
         storageRef={call_fbs}
         onUploadStart={this.handleUploadStart}
         onUploadError={this.handleUploadError}
         onUploadSuccess={this.handleUploadSuccess}
         onProgress={this.handleProgress}
       />
     </form>
<br/>
     <Progress percent={this.state.progress} active color="green">
     Smart Speed
   </Progress>    </center>


   <Button style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={()=>this.handleCall()}>Add Call</Button>
</Form>
</div>
              </Modal.Content>

              </Modal>

                </div>
        )
    }
}

export default CallModal 