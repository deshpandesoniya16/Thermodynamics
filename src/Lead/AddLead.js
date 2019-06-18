import React, { Component } from "react"
import Side from "../component/Sidenav"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Sidebar,
  Search,
  Divider,
  List,
  Container,
  Grid,
  Rating,
  Card,
  Segment,
  Popup,
  Button,
  TextArea,
  Menu,
  Image,
  Icon,
  Header,
  Input,
  Table,
  Modal,
  Form,Progress
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import cold from "../component/Image/cold.png"
import warm from "../component/Image/warm.png"
import hot from "../component/Image/hot.png"
import visit from "../component/Image/visit.png"
import moment from "moment"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import FileUploader from 'react-firebase-file-uploader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorModal from '../component/ErrorModal'
import SuccessModal from "../component/SuccessModal";
import Carousel from 'nuka-carousel';
import SmartUpload from "../component/SmartUpload";
import firebase from 'firebase';
import {Lead_fbs, visit_fbs,meeting_fbs,call_fbs} from "../component/base"
import {productListapi,AssetList} from  "../component/Api"
import MediaQuery from "react-responsive"
import {leadSourcelist,addleadSource,verticallist,addVertical  } from ".././component/Api";
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

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
import RawCarousel from "../component/RawCarousel"



class AddLead extends Component {
  state = {
    menuVisible: false,
    lastAction: "",
    Name: "",
    Address: "",
    Phno: "",
    discription: "",
    lastsolved: "",
    search: "",
    isLoading: false,
    value: "",
    results: [],
    SelectedResult: {},
    isOpen: false,
    status: "",
    solution: "",
    clientData: [],
    rating: 0,
    maxRating: 0,
    Solvediscription: "",
    isLoadingAssign: false,
    valueAssign: "",
    resultsAssign: [],
    SelectedResultAssign: {},
    isOpenHold: false,
    isOpenReject: false,
    isOpenClose: false,
    AssignedUser: [],
    startDate: moment(),
    action: "",
    address: "",
    email: "",
    isMeeting:false,
    isCall:false,
    isVisit:false,
        exOutCome:0,
        actualOutcome:0,
        travel:0,
        vamount:0,
        ToDate:moment(),
        FromDate:moment(), 
        username: '',
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: '',
        action:"",
        checked:true,
        isopen:false,
        AssetData:[],
        ProductData:[],
        ImageData:[],
        SelectedProduct:"",
        SelectedAsset:"",
        Mdiscription:"",
        MactualOutcome:0,
        MexOutCome:0,meeting_Type:"",
        MDate:moment(),
        call:"",
        CallexOutCome:0,
        CallactualOutcome:0,
        Calldiscription:"",
        CallDate:moment(),
        Vertical:"",
        isHOD:false,
        SelectLead:"",
        Proposal_Stage:"",
        leadsourceData:[],
        leadsourcename:"",
        isleadSource:false,
        verticalData:[],
        isOpenVeritcal:false,
        vname:"",
        btndisable:false,
        isSucess:false,
        ImageData1:[],
        Calltime:moment().hour(0).minute(0).second(0),
        Meetingtime:moment().hour(0).minute(0).second(0),
        Totime :moment().hour(0).minute(0).second(0),
        Fromtime:moment().hour(0).minute(0).second(0),
        vtype:"",
        format :'hh:mm:ss',
        Lno:""


  }


  lead_s_list = () =>{

    fetch(leadSourcelist, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      
      })
  }).then(data => {
      return data.json();
  }).then(data => {
       console.log("data",data)
       console.log("lead source List ",data.records)
       if(data.records){
         this.setState({leadsourceData:data.records})

       }else{
         console.log("No lead source")
         this.setState({leadsourceData:[]})
       }
  })

  }


  
  listVertical = () =>{

    fetch(verticallist, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
        })
    }).then(data => {
        return data.json();
    }).then(data => {
         console.log("data",data)
         console.log("vertical list",data.records)
         if(data.records){
           this.setState({verticalData:data.records})

         }else{
           console.log("No vertical")
           this.setState({verticalData:[]})
         }
    })

  }
  




  componentDidMount() {


    fetch("http://35.161.99.113:9000/webapi/t_client/list ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("client data", data.records)
        if (data.records) {
          this.setState({ clientData: data.records })
        } else {
          console.log("No data")
          this.setState({ clientData: [] })
        }
      })

    fetch("http://35.161.99.113:9000/webapi/t_login/list ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Assigned User", data.records)
        if (data.records) {
          this.setState({ AssignedUser: data.records })
        } else {
          console.log("No user")
          this.setState({ AssignedUser: [] })
        }
      })


      fetch(productListapi, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
        })
    }).then(data => {
        return data.json();
    }).then(data => {
         console.log("data",data)
         console.log("Product data",data.records)
         if(data.records){
           this.setState({ProductData:data.records})
          
         }else{
           console.log("No Product")
           this.setState({clientData:[]})
         }
    })       

    
    this.lead_s_list()
    
    
    this.listVertical();
  
  }

  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false, isOpenReject: false })
    }, 2000)
  }

  handleOpenReject = () => {
    this.setState({ isOpenReject: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpenReject: false })
    }, 2000)
  }

  handleOpenHold = () => {
    this.setState({ isOpenHold: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpenHold: false })
    }, 2000)
  }

  handleOpenClose = () => {
    this.setState({ isOpenClose: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpenClose: false })
    }, 2000)
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
      isOpenHold: false,
      isOpenReject: false,
      isOpenClose: false,
      isCall:false,
      isMeeting:false,
      isVisit:false,
      isopen:false
    })
    clearTimeout(this.timeout)
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value })
  }

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
    this.setState({ search: "", value: geocodedPrediction.formatted_address })
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
  }

  handleName = e => {
    this.setState({ Name: e.target.value })
  }

  handlelastAction = e => {
    this.setState({ lastAction: e.target.value })
  }

  handleAddress = e => {
    this.setState({ Address: e.target.value })
  }
  validateNumber = input => {
    if (input === "") {
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
  }

  validateEmail = email => {
    let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
    return pattern.test(email)
  }

  handlephno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ Phno: e.target.value })
    }
  }

  handleDiscribe = e => {
    this.setState({ discription: e.target.value })
  }

  handlelastSolved = e => {
    this.setState({ lastsolved: e.target.value })
  }

  handleDelete = () => {
    console.log("hot is Done")
    this.setState({ status: "hot" })
  }

  handleHold = () => {
    console.log("warm is Done")
    this.setState({ status: "warm" })
  }

  handleFinalSovle = () => {
    console.log("cold is Done")
    this.setState({ status: "cold" })
  }


  //Search
  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.company_name })
    this.setState({ SelectedResult: result })
    setTimeout(() => {
      // let active=true
      if (this.state.SelectedResult) {
        this.setState({
          email: this.state.SelectedResult.email,
          Name: this.state.SelectedResult.company_name,
          Phno: this.state.SelectedResult.number,
          address: this.state.SelectedResult.address,
          rating: this.state.SelectedResult.star
        })
      }
    }, 1000)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value: value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.company_name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.clientData, isMatch)
      })
    }, 500)
  }

  //AssignedUser
  resetComponentAssign = () => {
    this.setState({
      isLoadingAssign: false,
      resultsAssign: [],
      valueAssign: ""
    })
  }

  handleResultSelectAssign = (e, { result }) => {
    this.setState({ valueAssign: result.name })
    this.setState({ SelectedResultAssign: result })
  }

  handleSearchChangeAssign = (e, { value }) => {
    this.setState({ isLoadingAssign: true, valueAssign: value })

    setTimeout(() => {
      if (this.state.valueAssign.length < 1) return this.resetComponentAssign()

      const re = new RegExp(_.escapeRegExp(value), "i")
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoadingAssign: false,
        resultsAssign: _.filter(this.state.AssignedUser, isMatch)
      })
    }, 500)
  }




  actionadd = () =>{



    switch (this.state.action) {
  
      case 'visit':
      // if (!this.state.startDate) {
      //   this.setState({ msg1: "Please Select Date" })
      // } else if (!this.state.tov) {
      //   this.setState({ msg1: "Please Select Type Of Inquiry" })
      // } else if (!this.state.cdiscribe) {
      //   this.setState({ msg1: "Please Enter Visit Discription" })
      // } else if (!this.state.eoc) {
      //   this.setState({ msg1: "Please Enter Expected Outcome" })
      // } else if (!this.state.aoc) {
      //   this.setState({ msg1: "Please Enter Actual Outcome" })
      // } else {
        fetch("http://35.161.99.113:9000/webapi/t_visit/t_addVisit", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            client_id: this.state.cid,
            type_of_action: this.state.action,
            date: this.state.cdate,
            type_of_visit: this.state.vtype,
            description: this.state.discription,
            visit_expected_outcome: this.state.exOutCome,
            visit_actual_outcome: this.state.actualOutcome,
            km_travelled: this.state.travel,
            visit_amount: this.state.vamount,
            from_date: moment(this.state.FromDate).format("DD-MM-YYYY"),
            to_date: moment(this.state.ToDate).format("DD-MM-YYYY"),
            AssignId: this.state.aid,
            tid:this.state.Tno,
            lid:this.state.Lno,
            from_time:moment(this.state.Fromtime).format("HH:mm:ss"),
            to_time:moment(this.state.Totime).format("HH:mm:ss"),
            imageLink: this.state.ImageData1,
            status:'Denie'
  
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            console.log("data", data.records)
  
            
            
            if (data.message == "Action added") {
              
              this.setState({isSucess:true ,SuccessMsg:data.message})
              setTimeout(()=>{
              this.setState({isSucess:false,redirectToAsset:true})
              },1000)
              //  this.setState({redirectToAsset:true})
              //  this.setState({redirectToWelcome:true})
            } else {
              this.setState({ isopen: true, errorMsg: data.error })
              console.log("No User")
              //this.setState({ msg: data.error })
            }
          })
    // }
        break;
  
        case 'meeting':
  
  
        // if (!this.state.cid) {
        //   this.setState({ msg1: "Please Select client" })
        // } else if (!this.state.tid) {
        //   this.setState({ msg1: "Please Select Type Of Inquiry" })
        // } else if (!this.state.cdiscribe) {
        //   this.setState({ msg1: "Please Enter Visit Discription" })
        // } else if (!this.state.eoc) {
        //   this.setState({ msg1: "Please Enter Expected Outcome" })
        // } else if (!this.state.aoc) {
        //   this.setState({ msg1: "Please Enter Actual Outcome" })
        // } else {
          fetch("http://35.161.99.113:9000/webapi/t_visit/t_addVisit", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              client_id: this.state.cid,
              type_of_action: this.state.action,
              type_of_visit: this.state.meeting_Type,
              description: this.state.Mdiscription,
              visit_expected_outcome: this.state.MexOutCome,
              visit_actual_outcome: this.state.MactualOutcome,
              km_travelled: '',
              visit_amount: '',
              from_date: moment(this.state.MDate).format("DD-MM-YYYY"),
              to_date: '',
              AssignId: this.state.aid,
              tid:this.state.Tno,
              lid:this.state.Lno,
              from_time:moment(this.state.Meetingtime).format("HH:mm:ss"),
              to_time:'',
              imageLink: this.state.ImageData1,
              status:'Denie'
    
            })
          })
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log("data", data)
              console.log("data", data.records)
    
              //if(data.message === 'succesfully updated'){
    
              // this.setState({msg:data.message})
              // let authkey = "133779ATT6JFXy0k5850e783"
              // let sender = "SHMGMT"
              // let route = "4"
              // let number = this.state.Phno
              // let message = "Hi your ticket is created :"
              // let url= "http://bhashsms.com/api/sendmsg.php?"+'user=TEAM_MHOURZ&pass=MECHATRON&text='+message+'&sender=MHOURZ&phone='+number+'&priority=ndnd&stype=normal'
              // console.log("url",url)
              // fetch(url, {mode: 'no-cors'}).then(response =>{
              //     console.log(response)
              // })
              // window.location.reload()
              if (data.message == "Action added") {
              
                this.setState({isSucess:true ,SuccessMsg:data.message})
                setTimeout(()=>{
                this.setState({isSucess:false,redirectToAsset:true})
                },1000)
                //  this.setState({redirectToWelcome:true})
              } else {
                this.setState({ isopen: true, errorMsg: data.error })
                console.log("No User")
                //this.setState({ msg: data.error })
              }
            })
        //}
        
        break;
  
        case 'call':
  
        fetch("http://35.161.99.113:9000/webapi/t_visit/t_addVisit", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            client_id: this.state.cid,
            type_of_action: this.state.action,
            type_of_visit: this.state.call,
            description: this.state.Calldiscription,
            visit_expected_outcome: this.state.CallexOutCome,
            visit_actual_outcome: this.state.CallactualOutcome,
            km_travelled: '',
            visit_amount: '',
            from_date: moment(this.state.CallDate).format("DD-MM-YYYY"),
            to_date: '',
            AssignId: this.state.aid,
            tid:this.state.Tno,
            lid:this.state.Lno,
            from_time:moment(this.state.Calltime).format("HH:mm:ss"),
            to_time:'',
            imageLink: this.state.ImageData1,
            status:'Denie'
  
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            console.log("data", data.records)
  
            //if(data.message === 'succesfully updated'){
  
            // this.setState({msg:data.message})
            // let authkey = "133779ATT6JFXy0k5850e783"
            // let sender = "SHMGMT"
            // let route = "4"
            // let number = this.state.Phno
            // let message = "Hi your ticket is created :"
            // let url= "http://bhashsms.com/api/sendmsg.php?"+'user=TEAM_MHOURZ&pass=MECHATRON&text='+message+'&sender=MHOURZ&phone='+number+'&priority=ndnd&stype=normal'
            // console.log("url",url)
            // fetch(url, {mode: 'no-cors'}).then(response =>{
            //     console.log(response)
            // })
            // window.location.reload()
            if (data.message == "Action added") {
              
              this.setState({isSucess:true ,SuccessMsg:data.message})
              setTimeout(()=>{
              this.setState({isSucess:false,redirectToAsset:true})
              },1000)
              //  this.setState({redirectToWelcome:true})
            } else {
              this.setState({ isopen: true, errorMsg: data.error })
              console.log("No User")
              //this.setState({ msg: data.erro })
            }
          })
        
        break;
    
      default:
        break;
    }
  
  
  }




  handleUser = () => {
    if(!this.state.Name){
      this.setState({Clientmsg:"Please Enter Company Name"})
    }else if(!this.state.Phno){
      this.setState({Clientmsg:"Please Enter Phno"})
    }else if(!this.state.address){
      this.setState({Clientmsg:"Please Enter Address"})
  }else{ 
      fetch("http://35.161.99.113:9000/webapi/t_client/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.Name,
          email: this.state.email,
          number: this.state.Phno,
          address: this.state.address,
          star: this.state.rating
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)

          this.setState({ msg: "User is Created" })
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          //  if(data.records){
          //    sessionStorage.setItem("user",JSON.stringify(data.records))
          //    this.setState({user:data.records})
          //    this.setState({redirectToWelcome:true})
          //  }else{
          //    console.log("No User")
          //    this.setState({msg:"Invalid User"})
          //  }
        })
    }
    //  }
  }

  handleSubmit = () => {

    if(!this.state.SelectedResult){
      console.log("id is there")
    //  this.setState({msg1:"Please Select Client Id"})
  } else {
      this.setState({msg1:"Please Select Client Id"})
  }if(!this.state.Name){
      this.setState({msg1:"Please Select Company "})
  } else if(!this.state.SelectedResultAssign.id){
    this.setState({msg1:"Please Select Assign Emp "})
  }else if(!this.state.Vertical){
    this.setState({msg1:"Please Select Vertical"})
  // }else if(!this.state.status){
  //   this.setState({msg1:"Please Select Status"})
  // }else if (this.state.action.length < 0) {
  //     this.setState({ msg1: "Please Select Action" })
    } else {

      
      fetch("http://35.161.99.113:9000/webapi/t_lead/addLead", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientId: this.state.SelectedResult.id,
          leadHandler: this.state.SelectedResultAssign.id,
          lastActionTime: this.state.startDate,
          action: this.state.action,
          leadDescription: this.state.discription,
          leadStatus: this.state.status,
          transmuteAction: this.state.Solvediscription,
          imageLink:this.state.ImageData1,
          product:this.state.SelectedProduct,
          vertical:this.state.Vertical,
          proposalStage:this.state.Proposal_Stage,
          leadSource:this.state.SelectLead,
        
         
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
          // window.location.reload()

          this.state.Lno = data.records

          if (data.message == "Lead Created") {
              this.setState({btndisable:true})
              this.setState({isSucess:true ,Smsg:data.message})
              setTimeout(()=>{
              this.setState({isSucess:false,redirectToTixy:true})
              },1000)
          } else {
            console.log("No User")
            this.setState({ msg: "Invalid User" })
          }
        })
    }
  }


  handleMachnie = e => {
    console.log("product Group", e.target.value)
    let ch="";
    switch (e.target.value) {
      case 'call':
        this.setState({isCall:true})
        
        break;
    
        case 'visit':
        this.setState({isVisit:true})
        
        break;
    
        case 'meeting':
        this.setState({isMeeting:true})
        break;
    
      default:
        break;
    }
    
    this.setState({
      action: e.target.value
      // checked: this.state.checked
    })
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  onChange = address => {
    console.log("Address is", address)
    this.setState({ address })
  }

  handleAoutCome=e=>{
    this.setState({travel:e.target.value,msg1:""})
  }
  handleTravel=e=>{
    this.setState({travel:e.target.value,msg1:""})
  }

  handleiVsitAmount=e=>{
      this.setState({vamount:e.target.value,msg1:""})
  }

  handleExoutCome=e=>{
      this.setState({exOutCome:e.target.value,msg1:""})
  }

  handleFrom=date=>{
      this.setState({FromDate:date,msg1:""})
  }
  
  ToDate=date=>{
      this.setState({ToDate:date,msg1:""})
  }

  handleChangeUsername = (event) => this.setState({username: event.target.value});
handleUploadStart = () => this.setState({isUploading: true, progress: 0});
handleProgress = (progress) => this.setState({progress});
handleUploadError = (error) => {
  this.setState({isUploading: false});
  console.error(error);
}
handleUploadSuccess =  (filename) => {
    this.setState({uploadedfileName: filename, progress: 100, isUploading: false});
    Lead_fbs.child(filename).getDownloadURL().then(url =>{
      this.state.ImageData1.push(url)
         this.state.ImageData.push({"link":url})
       this.setState({uploadedfileurl: url})
     }); 
     setTimeout(()=>{
      
      if(this.state.progress == 100){
       this.setState({filename:"", progress:0})
     }else{
       console.log("error in upload")
     }
    },1000)
    }

        handleSelectedAsset=e=>{
          console.log("assets is",e.target.value)
          this.setState({SelectedAsset:e.target.value})
        }

        handleSelectedProduct=e=>{
          console.log("Product is",e.target.value)
          this.setState({SelectedProduct:e.target.value})
        }



        // Meeting

        handleMeeting =e=>{
          console.log("selected meeting",e.target.value)
          this.setState({meeting_Type:e.target.value})
        }


        handleMExoutCome=e=>{
          this.setState({MexOutCome:e.target.value})
        }


        handleMoutCome=e=>{
          this.setState({MactualOutcome:e.target.value})
        }

        handleMdiscribe=e=>{
          this.setState({Mdiscription:e.target.value})
        }

        handleMdate=date=>{
          this.setState({MDate:date})
        }

        // Call 

        handleCalldate=date=>{
          this.setState({CallDate:date})
        }

        handleCall=e=>{
          this.setState({call:e.target.value})
        }

        handleCallExoutCome=e=>{
          this.setState({CallexOutCome:e.target.value})
        }

        handleCallAoutCome=e=>{
          this.setState({CallactualOutcome:e.target.value})
        }

        handleCallDiscribe=e=>{
          this.setState({Calldiscription:e.target.value})
        }

        handleVertical=e=>{
          this.setState({Vertical:e.target.value,isHOD:true})
      }

      handleSelectLead=e=>{
        this.setState({SelectLead:e.target.value})
      }

      handlePstage=e=>{
        console.log("pstage",e.target.value)
        this.setState({Proposal_Stage:e.target.value})
      }

      addleadSourceData = () =>{

        if(!this.state.leadsourcename){
          this.setState({msg:"Please Enter lead source Name"})
        }else{
      fetch(addleadSource, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.leadsourcename
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
    
          if (data.message == "source Added") {
            this.setState({lsmsg:data.message})
            setTimeout(()=>{
            this.lead_s_list();
            this.setState({isleadSource:false})
            },1000)
          } else {
            this.setState({lsmsg:"Something went wrong !!!!!!!"})
            console.log("Something went wrong !!!!!!!")
          }
        })
    
    }
    

      }
    

      handleleadSourcetype=()=>{
        this.setState({isleadSource:true})
      }

      handleClose=()=>{
        this.setState({isleadSource:false,isOpenVeritcal:false,
        isCall:false,
        isMeeting:false,
        isVisit:false,
        })
      }

      handleLeadSourceName=e=>{
        this.setState({leadsourcename:e.target.value})
      }

      handleVertical=e=>{
        this.setState({Vertical:e.target.value,isHOD:true})
    }

    
  handleaddVertical=e=>{
    this.setState({vname:e.target.value})
}

addVertical=()=>{
  if(!this.state.vname){

      this.setState({
      lsmsg:"Please Enter Name of Vertical"    
      })
  }else{
      fetch(addVertical, {
method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify({
vertical : this.state.vname
})
})
.then(data => {
return data.json()
})
.then(data => {
console.log("data", data)
console.log("data", data.records)

if (data.message == "Vertical Added") {
this.setState({lsmsg:data.message})

  setTimeout(()=>{
    this.listVertical();

   this.setState({isOpenVeritcal:false})
  },1000)
} else {
  this.setState({lsmsg:"Something went wrong !!!!!!!"})
console.log("Something went wrong !!!!!!!")
}
})
  }
}

handleAddVertical=()=>{
    this.setState({isOpenVeritcal:true})
}


handleVertical=e=>{
  this.setState({Vertical:e.target.value,isHOD:true})
}

handleaddVertical=e=>{
  this.setState({vname:e.target.value})
}


  render() {
  

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    let {
      lastAction,
      Name,
      Phno,
      Address,
      discription,
      lastsolved,
      search,
      value,
      isLoading,
      results,
      SelectedResult,
      status,
      clientData,
      Solvediscription,
      rating,
      isLoadingAssign,
      valueAssign,
      resultsAssign,
      email,isCall,isMeeting,isVisit,startDate,visit,exOutCome,actualOutcome,travel,handleiVsitAmount,vamount,
      action,
      checked,
      isopen,
      ProductData,
      AssetData,
      ImageData,SelectedProduct,SelectedAsset,vname,
      Mdiscription,MactualOutcome,MexOutCome,meeting_Type,MDate,isleadSource,leadsourcename,
      call,CallexOutCome,CallactualOutcome,Calldiscription,Vertical,isHOD,SelectLead,leadsourceData
    ,verticalData,isOpenVeritcal,btndisable,isSucess,Calltime,vtype,Meetingtime,Totime,Fromtime,format
    
    } = this.state

   // console.log("Selected Result", ImageData)

    let active = false
    

    if (!SelectedResult.company_name) {
      active = false
    } else {
      active = true
    }

    return (

     
      <div>



      <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Lead">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Add Lead</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded className="icon_name" style={{ height: "100%" }}>
                <label className="labelcolor">Company Name</label>
                <hr />

                                <div style={{width:400}}>

                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  resultRenderer={resultRenderer}
                  aligned="right"
                  />
                  <hr />  
                </div>

                <br />

                <Form>
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Name"
                      placeholder="Name"
                      value={Name}
                      onChange={this.handleName}
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Input
                      label="Email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleEmail}
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Input
                      label="Phone"
                      placeholder="Enter Phone No."
                      type="tel"
                      value={Phno}
                      onChange={this.handlephno}
                      maxLength="10"
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Field>
                      <label className="labelcolor">Address : </label>
                      <PlacesAutocomplete
                        className="locationstyle"
                        inputProps={inputProps}
                        required
                      />
                    </Form.Field>
                  </Form.Group>
                  <font color="red">{this.state.msg}</font>
                  <Button
                    disabled={active}
                    onClick={() => this.handleUser()}
                    style={{
                      backgroundColor: "#863577",
                      color: "#ffffff"
                    }}
                  >
                    Add Client
                  </Button>
                  <font color="red">{this.state.msg}</font>
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Description</label>

                <hr />

                <Form>
                  <TextArea
                    placeholder="Enter Description"
                    value={discription}
                    onChange={this.handleDiscribe}
                    rows={20}
                    required
                  />
                </Form>
                <br />
                <Form />



        <label>Proposal Stage </label><br/>

        <Form.Group inline widths={3}>
<input type="radio"
  id="radio1"
  name="radio1"
  value="Evaluation"
  onChange={this.handlePstage}                 
/>&nbsp;&nbsp;
<label htmlFor="radio1">Evaluation</label>              
              

<input type="radio"
id="radio2"
name="radio1"              
value="Prepared"
onChange={this.handlePstage}
/>
<label htmlFor="radio2">Prepared</label>               
              

<input type="radio"
id="radio2"
name="radio1"              
value="Submitted"
onChange={this.handlePstage}
/>
<label htmlFor="radio2">Submitted</label>  

              
</Form.Group>
<br/>
 


                <Form>
                  Product :
                  <select
                    value={SelectedProduct}
                    onChange={this.handleSelectedProduct}
                  >
                    <option value="" disabled selected hidden>
                      Select Product
                    </option>
                    {ProductData.map(i => (
                      <option value={i.id} key={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>

<br/>

                            <label>Lead Source</label>
                            
                            <select value={SelectLead} onChange={this.handleSelectLead}>
                            <option value="" disabled selected hidden>Select Lead</option>
                            {leadsourceData.map(i=>(
                              <option value={i.name} key={i.id}>{i.name}</option>
                              
                            ))}
                            </select>
                    <br/>




                  <Form.Field label='Vertical' required />

                  <select value={Vertical} onChange={this.handleVertical}>
                  <option value="" disabled selected hidden>
                  Select Vertical
                  </option>
                  {verticalData.map(i=>(
                  <option value={i.vertical} key={i.vertical}>{i.vertical}</option>
                  ))}
                  </select><br/>
                  <div style={{ display: "flex" }}>
                  </div>
                  <br />



                </Form>

<br/>


 



              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label>Image</label>
                <hr />

                {/* {ImageData.length >= 0 && (
                  <Carousel style={{ height: "26em" }}>
                    {ImageData.map(i => (
                      <center>
                        <img
                          src={i}
                          style={{
                            width: "60%",
                            position: "relative",
                            height: "22em"
                          }}
                        />
                      </center>
                    ))}
                  </Carousel>
                )} */}

                                <RawCarousel imageData={ImageData && ImageData.length >= 0 && ImageData || []} />

                <form>
                <Progress percent={this.state.progress} active color="green">
                  Smart Speed
                </Progress> <br />
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={Lead_fbs}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </form>
               
               
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea>
            <TixyContent>
              <Segment padded>
                <label>Transmute</label>
                <hr />

                <Form.Field label='Assign Employee' required />

                <div style={{width:400}}>
                <Search
                  loading={isLoadingAssign}
                  onResultSelect={this.handleResultSelectAssign}
                  onSearchChange={this.handleSearchChangeAssign}
                  results={resultsAssign}
                  value={valueAssign}
                  resultRenderer={resultRendererAssign}
                  aligned="right"
                    />
                    <hr />  
                  </div>
                <Form>
                

                  {/* {isHOD && <label>HOD :- "Demo"</label>} */}
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 12 }}>
                      <label>Transmute Action Comments -</label>
                    </div>
                    <TextArea
                      placeholder="Tell us more"
                      value={Solvediscription}
                      onChange={this.handleSolveDiscribe}
                      rows={7}
                      required
                    />
                  </div>
                  <hr />

                
                </Form>

                
                <hr />

                <label>Action</label>
                {/* {!Solvediscription && (
                  <p>Please Enter Description Then You Can Do Action</p>
                )} */}

                {/* {Solvediscription && ( */}
                  <center>
                    <Form.Group inline widths={3}>
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="call"
                        onChange={this.handleMachnie}
                      />&nbsp;&nbsp;
                      <label htmlFor="radio1">Call</label>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="visit"
                        onChange={this.handleMachnie}
                      />
                      <label htmlFor="radio2">Visit</label>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="meeting"
                        onChange={this.handleMachnie}
                      />
                      <label htmlFor="radio2">Meeting</label>
                    </Form.Group>
                  </center>
                {/* )} */}

                <hr />

                <Form>
                <Form.Field label='Select Lead Status -' required />
                  <br />

                  <TableContent>
                    <Popup
                      trigger={
                        <Button
                          icon
                          size="large"
                          style={{
                            backgroundColor: "#863577",
                            color: "#ffffff"
                          }}
                          onClick={() => this.handleDelete()}
                        >
                          Hot
                        </Button>
                      }
                      content={`Status Changed to Hot Lead`}
                      on="click"
                      open={this.state.isOpenReject}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenReject}
                      position="top right"
                    />

                    <Popup
                      trigger={
                        <Button
                          icon
                          size="large"
                          style={{
                            backgroundColor: "#863577",
                            color: "#ffffff"
                          }}
                          onClick={() => this.handleHold()}
                        >
                          Warm
                        </Button>
                      }
                      content={`Status Changed to warm lead`}
                      on="click"
                      open={this.state.isOpenHold}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenHold}
                      position="top right"
                    />
                    <Popup
                      trigger={
                        <Button
                          icon
                          size="large"
                          style={{
                            backgroundColor: "#863577",
                            color: "#ffffff"
                          }}
                          onClick={() => this.handleFinalSovle()}
                        >
                          Cold
                        </Button>
                      }
                      content={`Status Changed to cold lead`}
                      on="click"
                      open={this.state.isOpenClose}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenClose}
                      position="top right"
                    />
                  </TableContent>
                </Form>

                <br />
              </Segment>
            </TixyContent>
          </ContentArea>
          <p style={{marginRight:"2%",textAlign:"right"}}><font color="red">{this.state.msg1}</font></p>
          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>


            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubmit()}
              disabled={btndisable}
            >
              Add Lead
            </Button>
          </ContentArea>

          {this.state.redirectToTixy && <Redirect to="/Lead" push />}
        </PageContainer2>










           
         <Modal open={isCall} className="alertOfFileds" style={{marginTop:"2em"}} closeIcon onClose={this.handleClose} >
            <Modal.Header>
            <label className="labelcolor" style={{width:"5em"}}><b>Action Type - Call </b></label> 
              </Modal.Header>

              <Modal.Content>
              <div>
                <Form>
 <Grid columns='equal'>
    <Grid.Row>
      <Grid.Column>
      <label className="labelcolor" style={{width:"5em"}}><b>From Date</b></label><br/><br/>

    <DatePicker
selected={this.state.CallDate}
onChange={this.handleCalldate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormat="DD-MM-YYYY"
scrollableYearDropdown
yearDropdownItemNumber={15}
style={{width:"9em"}}
/> 
      </Grid.Column>

      <Grid.Column>
      <label><b>Time</b></label><br/><br/>
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
</Form>

<br/>

<Form  widths='equal'>

<label className="labelcolor" style={{width:"5em"}}>Type of Call :-</label><br/>   
<br/>
<select value={call} onChange={this.handleCall}>
<option value="" disabled>Type Of Call</option>
</select><br/>

<Button style={{ backgroundColor: "#863577",color: "#ffffff" }} onClick={()=>this.handleTypeOfCallVisit()}>Add Type Of Visit</Button>
<br/>
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

<label className="labelcolor"><b>Call Description </b></label><br/>   
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
       
       {this.state.isUploadingCall &&
         <p>Progress: {this.state.Callprogress}</p>
       }
     
       <FileUploader
         accept="image/*"
         name="avatar"
         multiple
         randomizeFilename
         storageRef={call_fbs}
         onUploadStart={this.callhandleUploadStart}
         onUploadError={this.callhandleUploadError}
         onUploadSuccess={this.callhandleUploadSuccess}
         onProgress={this.callhandleProgress}
       />
     </form>
<br/>
     <Progress percent={this.state.Callprogress} active color="green">
     Smart Speed
   </Progress>    </center>


   <Button style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={()=>this.handleClose()}>Add Call</Button>
</Form>
</div>
              </Modal.Content>

              </Modal>





  <Modal open={isMeeting} className="alertOfFileds" style={{marginTop:"2em"}} closeIcon onClose={this.handleClose} >
            <Modal.Header>
            <label className="labelcolor" style={{width:"5em"}}><b>Action Type - Meeting</b></label>   
             </Modal.Header>

              <Modal.Content>
              <div>
<Form>
<Grid columns='equal'>
    <Grid.Row>
      <Grid.Column>
      <Form.Field label='From Date'/>
  <DatePicker
selected={this.state.MDate}
onChange={this.handleMdate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormat="DD-MM-YYYY"
/> 
      </Grid.Column>
      <Grid.Column>
      <Form.Field label='Time'/>    
      <TimePicker
    showSecond={true}
    defaultValue={Meetingtime}
    className="xxx"
    onChange={this.handleMeetingTime}
    format={format}
    use24Hours
    inputReadOnly
  />
    </Grid.Column>
</Grid.Row>
</Grid>
</Form>


<Form  widths='equal'>


<hr />

<label className="labelcolor" style={{width:"5em"}}><b>Type of Meeting </b></label><br/>   
<br/>
<select value={meeting_Type} onChange={this.handleMeeting}>
<option value="" disabled selected hidden>
      Select Type Of meeting
    </option>   
</select><br/><br/>
<Button style={{ backgroundColor: "#863577",color: "#ffffff" }} onClick={()=>this.handleTypeOfCallVisit()}>Add Type Of Visit</Button>

<hr />

<Form>


<Form.Group widths='equal'>
<Form.Input
label='Meeting Expected Outcome'           
placeholder="Visit Expected Outcome" 
type="text"
value={MexOutCome}
onChange={this.handleMExoutCome}
required
/>         

<Form.Input
label='Meeting actual outcome'           
placeholder="Visit actual outcome" 
type="text"
value={MactualOutcome}
onChange={this.handleMoutCome}
required
/>         
</Form.Group> 

<label className="labelcolor"><b>Meeting Description </b></label><br/>   
<br/>
<TextArea 
placeholder='Tell us more'
value={Mdiscription}
onChange={this.handleMdiscribe} 
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
         storageRef={meeting_fbs}
         onUploadStart={this.mettinghandleUploadStart}
         onUploadError={this.mettinghandleUploadError}
         onUploadSuccess={this.mettinghandleUploadSuccess}
         onProgress={this.meetinghandleProgress}
       />
     </form>
<br/>
     <Progress percent={this.state.progress} active color="green">
     Smart Speed
   </Progress>    </center>

   <Button style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={()=>this.handleClose()}>Add Meeting</Button>
</Form>
</div>
              </Modal.Content>

              </Modal>






                <Modal open={isVisit} className="alertOfFileds" style={{marginTop:"2em"}} closeIcon onClose={this.handleClose}>
            <Modal.Header>
            <label className="labelcolor" style={{width:"5em"}}><b>Action Type - Visit</b></label>
            <hr/>  
              </Modal.Header>
           
            <Modal.Content>
            <div>
            <Form>
            <Grid columns='equal'>
    <Grid.Row>
      <Grid.Column>
    
      <Form.Field label='From Date'/>
<DatePicker
selected={this.state.FromDate}
onChange={this.handlevisitFromDate}
onFocus={e => e.target.blur()}
dateFormat="DD-MM-YYYY"
/> 
<br/>
      </Grid.Column>
      <Grid.Column>
   
      <Form.Field label='To Date'/>
<DatePicker
selected={this.state.ToDate}
onChange={this.handlevisitToDate}
onFocus={e => e.target.blur()}
dateFormat="DD-MM-YYYY"
/> 
      </Grid.Column>
      <Grid.Column>
      <Form.Field label='From Time'/>
    <TimePicker
    showSecond={true}
    defaultValue={Fromtime}
    className="xxx"
    onChange={this.handleFromTime}
    format={format}
    use24Hours
    inputReadOnly
  />
      </Grid.Column>
      <Grid.Column>
      <Form.Field label='To Time'/>
    <TimePicker
    showSecond={true}
    defaultValue={Totime}
    className="xxx"
    onChange={this.handleToTime}
    format={format}
    use24Hours
    inputReadOnly
  />
      </Grid.Column>
    </Grid.Row>
    </Grid>
    </Form>
<br/>
    <div>
    <label><b>Type Of Visit </b></label>
    <br/>
    <select value={vtype} onChange={this.handleVisittype}>
    <option value="" disabled selected hidden>
      Select Type Of Visit
    </option>   

    </select><br/><br/>
    <Button style={{ backgroundColor: "#863577",color: "#ffffff" }} onClick={()=>this.handleTypeOfVisit()}>Add Type Of Visit</Button>
    <br/><br/>

    <Form>
    <Form.Field label='Visit Description'/>
    <Form.Group widths="equal">
    <br/>
<TextArea 
placeholder='Tell us more'
value={discription}
onChange={this.handleDiscribe} 
rows={6}   
/>
</Form.Group>

<Form.Group widths="equal">
<Form.Input
label='Visit Expected Outcome'           
placeholder="Visit Expected Outcome" 
type="text"
value={exOutCome}
onChange={this.handleExoutCome}
required
/>         

<Form.Input
label='Visit actual outcome'           
placeholder="Visit actual outcome" 
type="text"
value={actualOutcome}
onChange={this.handleAoutCome}
required
/>         
</Form.Group> 

<Form.Group widths="equal">
<Form.Input
label='Km`s  Travlled'             
placeholder="Km`s  Travlled" 
type="text"
value={travel}
onChange={this.handleTravel}
required
/>         

<Form.Input
label='Visit Amount'           
placeholder="Visit Amount" 
type="text"
value={vamount}
onChange={this.handleiVsitAmount}
required
/>         
</Form.Group> 
</Form>

<br/>
<center>
<form>
           
           {this.state.isUploading &&
             <p>Progress: {this.state.visitprogress}</p>
           }
           {this.state.avatarURL &&
             <img src={this.state.avatarURL} />
           }
           <FileUploader
             accept="*"
             name="avatar"
             multiple
             storageRef={visit_fbs}
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

    </div>

    <Button style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={()=>this.handleClose()}>Add Visit</Button>
</div>


           </Modal.Content>

           
                </Modal>

                {isopen == true ?(
                  <ErrorModal isopen={this.state.isopen} msg={this.state.msg} onClose={this.handleClose}/>
                ):(
                  <div>
                  </div>
                )}



                {isSucess == true ? (
                  <SuccessModal
                    isopen={this.state.isSucess}
                    msg={this.state.Smsg}
                    onClose={this.handleClose}
                  />
                ) : (
                  <div />
                )}
                
 <Modal
        open={isleadSource}
        onClose={this.handleClose}
        className="alertOfFileds"
        closeIcon
        >
        <Modal.Header>
          <p>Add Lead Source</p>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths={1}>
              <Form.Input
                label="Add Lead Source "
                placeholder="Enter Lead Name "
                value={leadsourcename}
                onChange={this.handleLeadSourceName}
                required
              />

            </Form.Group>
              <p><font color="red">{this.state.lsmsg}</font></p>
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addleadSourceData()}
              >
                Add Lead Source
              </Button>
          </Form>
        </Modal.Content>
        </Modal>



        
        <Modal
          open={isOpenVeritcal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Vertical</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Vertical"
                  placeholder="Enter Vertical Name"
                  value={vname}
                  onChange={this.handleaddVertical}
                  required
                />

                
                <Button
                  style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  onClick={() => this.addVertical()}
                >
                  Add Vertical
                </Button>

                <font color="red">{this.state.lsmsg}</font>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>





      </div>
     
    )
  }
}

// AddTixy.propTypes = {
//     googleMaps: PropTypes.object,
//   }

const searchStyle = {
  width: "19em"
}
const resultRenderer = ({ company_name, number }) => (
  <span>
    <Header as="h4">{company_name}</Header>
    <p>{number}</p>
  </span>
)

const resultRendererAssign = ({ name, mobile_num, role }) => (
  <span>
    <Header as="h4">{name}</Header>
    <p>{mobile_num}</p>
    <p>{role}</p>
  </span>
)

const formInput = {
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color: "#ffffff",
  padding: "14px",
  width: "31em"
}

export default AddLead
