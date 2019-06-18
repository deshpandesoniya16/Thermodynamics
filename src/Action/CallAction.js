import React, { Component } from "react"
import Side from "../component/Sidenav"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar,Search,Divider,Container,Grid,Rating,Card,Segment,Popup,Button,TextArea,Menu, Image,Progress, Icon, Header ,Input,Table,Modal,Form} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment"
import Visit from "./Visit";
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {Lead_fbs, visit_fbs,fbs,meeting_fbs,call_fbs} from "../component/base"
import  ErrorModal from "../component/ErrorModal";


class CallAction extends Component {

    state={

    }


    render(){
        return(

            <div>

                </div>

        )
    }
}


export default CallAction