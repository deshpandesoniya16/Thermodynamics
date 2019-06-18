import React, { Component } from "react"
import Side from "../component/Sidenav"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Sidebar,
  Search,
  Divider,
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
  Progress,
  Icon,
  Header,
  Input,
  Table,
  Modal,
  Form,List
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import {
  Lead_fbs,
  visit_fbs,
  fbs,
  meeting_fbs,
  call_fbs
} from "../component/base"
import ErrorModal from "../component/ErrorModal"
import TimePicker from "rc-time-picker"
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
  TableContent,
  Box,
  Box2,
  MainDiv2,
  MainDivHolder
} from "../styledComps"
import {tixy,leadlist,clientCondition,actionImageLink,
  callTypelist,
  addcallType,
  deleteCallType,
  visitTypeList,
  addvisitTypeadd,
  deleteVisitType,
  meetingTypeList,
  addMeetingType,
  deleteMeeting,
  contractGodsview,

} from "../component/Api";
import SuccessModal from "../component/SuccessModal"
import RawCarousel from "../component/RawCarousel"



class EditAction extends Component {
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
    visit: "",
    isOpen: false,
    status: "",
    solution: "",
    clientData: [],
    rating: 0,
    maxRating: 0,
    Solvediscription: "",
    isSucess:false,
    isLoadingAssign: false,
    valueAssign: "",
    resultsAssign: [],
    SelectedResultAssign: {},
    isOpenHold: false,
    isOpenReject: false,
    isOpenClose: false,
    AssignedUser: [],
    email: "",
    cname: "",
    startDate: moment(),
    exOutCome: 0,
    actualOutcome: 0,
    travel: 0,
    vamount: 0,
    ToDate: moment(),
    FromDate: moment(),
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    action: "",
    checked: true,
    isopen: false,
    format: "hh:mm:ss",
    Mdiscription: "",
    MactualOutcome: 0,
    MexOutCome: 0,
    meeting_Type: "",
    MDate: moment(),

    call: "",
    CallexOutCome: 0,
    CallactualOutcome: 0,
    Calldiscription: "",
    CallDate: moment(),
    tov: "",
    eoc: "",
    voc: "",
    aoc: "",
    cdate: moment(),
    ImageData: [],
    cid: "",
    Totime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    Fromtime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    Calltime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    Meetingtime: moment()
      .hour(0)
      .minute(0)
      .second(0),
      leaadData:[],
      tixyData:[],
      isLoadingLead:false,
      resultsLead:[],
      valueLead:"",
      SelectedResultLead:{},
      SelectedResultTixy:{},
      isLoadingTixy:false,
      resultsTixy:[],
      valueTixy:"",
      aid:"",
      ticketid:'',
      leadid:'',
      actionId:'',
      callId:'',
      visitId:'',
      meetingId:'',
      ImageData1:[],
      callTypeData:[],
      meetingTypeData:[],
      visitTypeData:[],
      calltypeid:'',
      callTypeModal:false,
      open12:false,
      size12:'',
      vsittypeId:'',
      size13:'',
      meetingTypeName:'',
      size14:'',
      open14:false,
      meetingTypeModal:false,
      meetingtypeId:'',
      contractDataList:[],
      resultsContract:[],
      valueContract:'',
      isLoadingContract:false,
      SelectedResultContract:{},
      isClearable: true,
   isDisabled: false,
   isLoading: false,
   isRtl: false,
   isSearchable: true,
   ascId:'',
   selectedDate:[],

  }




  actionImages = (id) =>{

    fetch(actionImageLink, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        actionId:id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("image data", data.records)
        if(data.records == []){
          this.setState({ ImageData: []})
        console.log("No Images is available")
        }else{
          console.log("action images Data", data.records)
          this.setState({ ImageData: data.records })
        }
  })
}

  leadlist = () =>{

    fetch(leadlist, {
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
        console.log("lead data", data.records)
        if (data.records) {
          let leadData = data.records
          
        
          const transformed = leadData.map(({ id,name,number,product,proposalStage,solution,vertical,leadSource,leadStatus,action,address,company_name,email,lastActionTime,leadDescription,leadHandler }) => 
          ({ leadId: id,action:action,address:address,
            company_name:company_name,email:email,
            lastActionTime:lastActionTime,
            leadDescription:leadDescription,
            leadHandler:leadHandler,
            leadSource:leadSource,
            leadStatus:leadStatus,
            name:name,
            number:number,
            product:product,
            proposalStage:proposalStage,
            solution:solution,
            vertical:vertical
          }));

          console.log('transformed', transformed);

          this.setState({ leaadData: transformed })
        } else {
          console.log("No lead")
          this.setState({ leaadData: [] })
        }
      })
  }


  tixylist = () =>{

    fetch(tixy, {
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
        console.log("tixy data", data.records)
        if (data.records) {
          let tixyDetails = data.records


          const transformedTixy = tixyDetails.map(({ id,name,product,asset,client_id,closedDate,description,groupName,subGroupName,purposeReport,priority,number,AssignId,proposalStage,solution,vertical,leadSource,leadStatus,action,address,company_name,email,lastActionTime,leadDescription,leadHandler }) => 
          ({ tixyId: id,action:action,address:address,
            company_name:company_name,email:email,
            lastActionTime:lastActionTime,
            leadDescription:leadDescription,
            leadHandler:leadHandler,
            leadSource:leadSource,
            leadStatus:leadStatus,
            name:name,
            number:number,
            product:product,
            proposalStage:proposalStage,
            solution:solution,
            vertical:vertical,
            AssignId:AssignId,asset:asset,client_id:client_id,cloasedDate:closedDate,description:description, groupName:groupName,priority:priority,
            purposeReport:purposeReport,subGroupName:subGroupName,
          }));
          console.log('transformedTixy', transformedTixy);
          this.setState({ tixyData: transformedTixy })
        } else {
          console.log("No tixy")
          this.setState({ tixyData: [] })
        }
      })

  }



  clientDetails = (id) =>{
  console.log('id', id);

    fetch(clientCondition, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cid:id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("client id based data", data.records)
        if (data.records) {

          let cdata = data.records
          console.log('cdata', cdata[0].company_name);
        this.setState({
          Name:cdata[0].company_name,
          Phno:cdata[0].number,
          cname:cdata[0].cname1,
          email:cdata[0].email,
          Address:cdata[0].address
        })
  }
  else{
    console.log("No data")
  }
})
  }




  
  
  listcallType= ()=>{

    fetch(callTypelist, {
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
       console.log("call Type List ",data.records)
       if(data.records){
         this.setState({callTypeData:data.records})
       }else{
         console.log("No call type Name")
         this.setState({callTypeData:[]})
       }
  })
}


listmeetingType= () =>{

  fetch(meetingTypeList, {
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
     console.log("meeting Type List ",data.records)
     if(data.records){
       this.setState({meetingTypeData:data.records})
     }else{
       console.log("No meeting type Name")
       this.setState({meetingTypeData:[]})
     }
})
}


listVisitType=()=>{

  fetch(visitTypeList, {
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
     console.log("visit Type List ",data.records)
     if(data.records){
       this.setState({visitTypeData:data.records})
     }else{
       console.log("No visit type Name")
       this.setState({visitTypeData:[]})
     }
})

}



contractData=()=>{
  fetch(contractGodsview, {
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
      console.log("Contract data", data.records)
      if (data.records) {
        this.setState({ contractDataList: data.records })
      } else {
        console.log("No Contract")
        this.setState({ contractDataList: [] })
      }
    })
}


  componentDidMount() {

    let actionEdit;

    if (JSON.parse(sessionStorage.getItem("editTicket")  === null)) {
      console.log("Nodata")
  }else{

   actionEdit = JSON.parse(sessionStorage.getItem("editTicket"))
  console.log('action', actionEdit);

  let actionType=actionEdit.type_of_action

  switch (actionType) {
    case 'call':
      
    this.setState({
      action:actionEdit.type_of_action,
      cid:actionEdit.clientId,
      CallexOutCome:actionEdit.callExpected_Outcome,
      CallactualOutcome:actionEdit.callActual_Outcome,
      Calldiscription:actionEdit.call_description,
      CallDate:moment(actionEdit.fromDate,"DD-MM-YYYY"),
      Calltime:moment(actionEdit.from_time,"hh:mm:ss"),
      calltypeid:actionEdit.typeofCall,
      valueTixy:actionEdit.ticket_id,
      valueLead:actionEdit.lead_id,
      ticketid:actionEdit.ticket_id,
      leadid:actionEdit.lead_id,
      valueAssign:actionEdit.AssignId,
      aid:actionEdit.AssignId,
      actionId:actionEdit.action_id,
      callId:actionEdit.callId,
      
    })
      break;

      case 'visit':

      this.setState({
        action:actionEdit.type_of_action,
        cid:actionEdit.clientId,
        visitId:actionEdit.visitId,
        exOutCome:actionEdit.visit_Expected_outcome,
        actualOutcome:actionEdit.visit_Actual_outCome,
        vamount:actionEdit.visit_amount,
        discription:actionEdit.visit_description,
        FromDate:moment(actionEdit.fromDate,"DD-MM-YYYY"),
        ToDate:moment(actionEdit.to_date,"DD-MM-YYYY"),
        Fromtime:moment(actionEdit.from_Time,"hh:mm:ss"),
        Totime:moment(actionEdit.to_Time,"hh:mm:ss"),
        visitTypeid:actionEdit.type_of_visit,
        valueTixy:actionEdit.ticket_id,
        valueLead:actionEdit.lead_id,
        ticketid:actionEdit.ticket_id,
        leadid:actionEdit.lead_id,
        valueAssign:actionEdit.AssignId,
        aid:actionEdit.AssignId,
        actionId:actionEdit.action_id,
        travel:actionEdit.Km_Travelled
      })
      
      break;


      case 'meeting':

      this.setState({
        action:actionEdit.type_of_action,
        cid:actionEdit.clientId,
        meetingId:actionEdit.meetingId,
        MexOutCome:actionEdit.meeting_expected_outcome,
        MactualOutcome:actionEdit.meeting_actual_outcome,
        Mdiscription:actionEdit.description,
        MDate:moment(actionEdit.fromDate,"DD-MM-YYYY"),
        Meetingtime:moment(actionEdit.Time,"hh:mm:ss"),
        meetingtypeId:actionEdit.type_of_meeting,
        valueTixy:actionEdit.ticket_id,
        valueLead:actionEdit.Lead_id,
        ticketid:actionEdit.ticket_id,
        leadid:actionEdit.Lead_id,
        valueAssign:actionEdit.AssignId,
        aid:actionEdit.AssignId,
        actionId:actionEdit.action_id,
      })
      
      break;
  
    default:
      break;

  }
  }

  this.clientDetails(actionEdit.clientId)
  this.actionImages(actionEdit.action_id)

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
          console.log("No Client")
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


      this.tixylist();
      this.leadlist();
      this.listVisitType();
      this.listmeetingType();
      this.listcallType();
      this.contractData();

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
      isOpenVistType: false,
      isOpenCallType: false,
      isOpenMeetingType: false,
      open: false,
      isIndustry: false,
      isSubIndustry: false,
      ProducrService: false,
      isOpenVeritcal:false,
      isOpenAsset:false,
      grpadd:false,
      subgrpadd:false,
      leadmodal:false,
      addfuelTypeModal:false,
      fuelNameModal:false,
      seriesModal:false,
      callTypeModal:false,
      visitTypeModal:false,
      meetingTypeModal:false
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

  handleChange = date => {
    console.log("date is", moment().date)
    this.setState({
      startDate: date,
      msg1: ""
    })
  }

  handleName = e => {
    this.setState({ Name: e.target.value, msg1: "" })
  }

  handlecname = e => {
    this.setState({ cname: e.target.value, msg1: "" })
  }

  handleEmail = e => {
    this.setState({ email: e.target.value, msg1: "" })
  }

  handleVisit = e => {
    console.log(e.target.value)
    this.setState({ visit: e.target.value, msg1: "", tov: e.target.value })
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

  handlephno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ Phno: e.target.value, msg1: "" })
    }
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
          Name: this.state.SelectedResult.company_name,
          Phno: this.state.SelectedResult.number,
          email: this.state.SelectedResult.email,
          Address: this.state.SelectedResult.address,
          rating: this.state.SelectedResult.star,
          cname: this.state.SelectedResult.owner,
          cid: this.state.SelectedResult.id
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
    this.setState({ valueAssign: result.name,aid:result.name })
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




//Lead
resetComponentLead = () => {
  this.setState({
    isLoadingLead: false,
    resultsLead: [],
    valueLead: ""
  })
}

handleResultSelectLead = (e, { result }) => {
  this.setState({ valueLead: result.company_name, leadid: result.id })
  console.log("selected lead",result)
  this.setState({ SelectedResultLead: result })
}

handleSearchChangeLead = (e, { value }) => {
  this.setState({ isLoadingLead: true, valueLead: value })

    if (value.length < 1) 
    return this.resetComponentLead()

    const re = new RegExp(_.escapeRegExp(value), "i")
    const isMatch = result => re.test(result.company_name)

    this.setState({
      isLoadingLead: false,
      resultsLead: _.filter(this.state.leaadData, isMatch)
    })
}



//Tixy

resetComponentTixy = () => {
  this.setState({
    isLoadingTixy: false,
    resultsTixy: [],
    valueTixy: ""
  })
}

handleResultSelectTixy = (e, { result }) => {
  this.setState({ valueTixy: result.name, ticketid: result.id })
  console.log("selected Tixt",result)
  this.setState({ SelectedResultTixy: result })
}

handleSearchChangeTixy = (e, { value }) => {
  this.setState({ isLoadingTixy: true, valueTixy: value })

    if (value.length < 1) return this.resetComponentTixy()

    const re = new RegExp(_.escapeRegExp(value), "i")
    const isMatch = result => re.test(result.name)

    this.setState({
      isLoadingTixy: false,
      resultsTixy: _.filter(this.state.tixyData, isMatch)
    })
}





//Contract

resetComponentContract = () => {
  this.setState({
    isLoadingContract: false,
    resultsContract: [],
    valueContract: ""
  })
}

handleResultSelectContract = (e, { result }) => {
  this.setState({ valueContract: result.company_name, ascId:result.id})
  console.log("selected Contract",result)
  let datearr= []

  datearr.push(
    {"oitDate1":result.oitDate1},
  {"oitDate2":result.oitDate2},
  {"overhulingDate1":result.overhulingDate1},
  {"overhulingDate2":result.overhulingDate2},
  {"breakdownDate1":result.breakdownDate1},
  {"breakdownDate2":result.breakdownDate2})

  console.log("selected",datearr)

  this.setState({ SelectedResultContract: result ,selectedDate:datearr})
}

handleSearchChangeContract = (e, { value }) => {
  this.setState({ isLoadingContract: true, valueContract: value })

    if (value.length < 1) 
    return this.resetComponentContract()

    const re = new RegExp(_.escapeRegExp(value), "i")
    const isMatch = result => re.test(result.company_name)

    this.setState({
      isLoadingContract: false,
      resultsContract: _.filter(this.state.contractDataList, isMatch)
    })
}


  handleUser = () => {
    // if(!this.state.lastAction){
    //     this.setState({msg:"Please Enter Time"})
    // }else

    // if(!this.state.Phno){
    //     this.setState({msg:"Please Enter Phno"})
    // }else if(!this.state.Address){
    //     this.setState({msg:"Please Enter Address"})
    // }else if(!this.state.Name){
    //     this.setState({msg:"Please Enter Name"})
    // }else{
    fetch("http://35.161.99.113:9000/webapi/t_client/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.Name,
        number: this.state.Phno,
        address: this.state.Address,
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
    //  }
  }

  handleSubmit = () => {
    console.log("cid is ", this.state.cid)

    console.log(' moment',  moment(this.state.FromDate).format("DD-MM-YYYY"));

    // if (!this.state.Name) {
    //   this.setState({ msg1: "Please Enter Name" })
    // } else if (!this.state.Phno) {
    //   this.setState({ msg1: "Please Enter Mobile No." })
    // } else if (!this.state.email) {
    //   this.setState({ msg1: "Please Enter Email-ID" })
    // } else if (!this.state.cname) {
    //   this.setState({ msg1: "Please Enter Contact Person Name" })
    // } else if (!this.state.startDate) {
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

    //  if (AcSCID)
    //  {

    //   for (i =0;i<6;i++)
    //   {
    //                     Array[]

    //   fetch("http://35.161.99.113:9000/webapi/t_visit/t_addVisit", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       actionId: this.state.actionId, ASC ID 
    //       visitId:this.state.visitId, 
    //       client_id:this.state.cid,
    //       type_of_action: this.state.action,
    //       type_of_visit: "OIT/Breakdown/",
    //       description: this.state.description,
    //       visit_expected_outcome: this.state.exOutCome,
    //       visit_actual_outcome: this.state.actualOutcome,
    //       km_travelled: this.state.travel,
    //       visit_amount: this.state.vamount,
    //       from_date: moment(this.state.FromDate).format("DD-MM-YYYY"),
    //       to_date: moment(this.state.ToDate).format("DD-MM-YYYY"),
    //       AssignId: this.state.aid,
    //       tid:this.state.ticketid,
    //       lid:this.state.leadid,
    //       aid:
    //       from_time:moment(this.state.Fromtime).format("HH:mm:ss"),
    //       to_time:moment(this.state.Totime).format("HH:mm:ss"),
    //       imageLink: this.state.ImageData1,
    //       status:'Approved'

    //     })
    //   })
    //     .then(data => {
    //       return data.json()
    //     })
    //     .then(data => {
    //       console.log("data", data)
    //       console.log("data", data.records)

          
          
    //       if (data.message == "Action Updated") {
    //         this.setState({isSucess:true ,SuccessMsg:data.message})
    //       setTimeout(()=>{
    //       this.setState({isSucess:false,redirectToAsset:true})
    //       },1000)
    //         //  this.setState({redirectToAsset:true})
    //         //  this.setState({redirectToWelcome:true})
    //       } else {
    //         this.setState({ isopen: true, errorMsg: data.error })
    //         console.log("No User")
    //         this.setState({ msg: "Invalid User" })
    //       }
    //     })
       
    //  }
    //  else 
    //  {




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
          fetch("http://35.161.99.113:9000/webapi/t_visit/t_EditVisit", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              actionId: this.state.actionId,
              visitId:this.state.visitId,
              client_id:this.state.cid,
              type_of_action: this.state.action,
              type_of_visit: this.state.visit,
              description: this.state.description,
              visit_expected_outcome: this.state.exOutCome,
              visit_actual_outcome: this.state.actualOutcome,
              km_travelled: this.state.travel,
              visit_amount: this.state.vamount,
              from_date: moment(this.state.FromDate).format("DD-MM-YYYY"),
              to_date: moment(this.state.ToDate).format("DD-MM-YYYY"),
              AssignId: this.state.aid,
              tid:this.state.ticketid,
              lid:this.state.leadid,
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
  
              
              
              if (data.message == "Action Updated") {
                this.setState({isSucess:true ,SuccessMsg:data.message})
              setTimeout(()=>{
              this.setState({isSucess:false,redirectToAsset:true})
              },1000)
                //  this.setState({redirectToAsset:true})
                //  this.setState({redirectToWelcome:true})
              } else {
                this.setState({ isopen: true, errorMsg: data.error })
                console.log("No User")
                this.setState({ msg: "Invalid User" })
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
            fetch("http://35.161.99.113:9000/webapi/t_visit/t_EditVisit", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                client_id: this.state.cid,
                meetingId:this.state.meetingId,
                actionId: this.state.actionId,
                type_of_action: this.state.action,
                type_of_visit: this.state.meeting_Type,
                description: this.state.Mdiscription,
                visit_expected_outcome: this.state.MexOutCome,
                visit_actual_outcome: this.state.MactualOutcome,
                km_travelled: '',
                visit_amount: '',
                from_date:moment(this.state.MDate).format("DD-MM-YYYY"),
                to_date: '',
                AssignId: this.state.aid,
                tid:this.state.ticketid,
                lid:this.state.leadid,
                from_time:moment(this.state.Meetingtime).format("hh:mm:ss"),
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
      
               
                if (data.message == "Action Updated") {
                  this.setState({isSucess:true ,SuccessMsg:data.message})
                setTimeout(()=>{
                this.setState({isSucess:false,redirectToAsset:true})
                },1000)
                } else {
                  this.setState({ isopen: true, errorMsg: data.error })
                  console.log("No User")
                  this.setState({ msg: "Invalid User" })
                }
              })
          //}
          
          break;
  
          case 'call':
  
          fetch("http://35.161.99.113:9000/webapi/t_visit/t_EditVisit", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              actionId: this.state.actionId,
              callId:this.state.callId,
              client_id:this.state.cid,
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
              tid:this.state.ticketid,
              lid:this.state.leadid,
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
    
              if (data.message == "Action Updated") {
                this.setState({isSucess:true ,SuccessMsg:data.message})
              setTimeout(()=>{
              this.setState({isSucess:false,redirectToAsset:true})
              },1000)
                //  this.setState({redirectToWelcome:true})
              } else {
                this.setState({ isopen: true, errorMsg: data.error })
                console.log("No User")
                this.setState({ msg: "Invalid User" })
              }
            })
          
          break;
      
        default:
          break;
      }
        
    
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value, msg1: "" })
  }

  handleAoutCome = e => {
    this.setState({
      actualOutcome: e.target.value,
      msg1: "",
      aoc: e.target.value
    })
  }
  handleTravel = e => {
    this.setState({ travel: e.target.value, msg1: "" })
  }

  handleiVsitAmount = e => {
    this.setState({ vamount: e.target.value, msg1: "", voc: e.target.value })
  }

  handleExoutCome = e => {
    this.setState({ exOutCome: e.target.value, msg1: "", eoc: e.target.value })
  }

  handleFrom = date => {
    this.setState({ FromDate: date, msg1: "" })
  }

  ToDate = date => {
    this.setState({ ToDate: date, msg1: "" })
  }

  onChange = Address => {
    console.log("Address is", Address)
    this.setState({ Address, msg1: "" })
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value })
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
  handleProgress = progress => this.setState({ progress })
  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }
  handleUploadSuccess = filename => {
    this.setState({
      uploadedfileName: filename,
      progress: 100,
      isUploading: false
    })
    fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        let urlinfo=url
      console.log('url', url);
      this.setState({ uploadedfileurl: url })
    
      setTimeout(() => {
       

        this.state.ImageData1.push(url)
        this.state.ImageData.push({"link":url})
      this.setState({uploadedfileurl: url})
      this.setState({ })
       
      }, 1000);
      })
  }

  handleAction = e => {
    console.log("action", e.target.value)

    switch (e.target.value) {
      case 'call':
        this.setState({isCall:true,imageData:[],imageData1:[]})
        
        break;
    
        case 'visit':
        this.setState({checked:true,imageData:[],imageData1:[]})
        
        break;
    
        case 'meeting':
        this.setState({isMeeting:true,imageData:[],imageData1:[]})
        break;
    
      default:
        break;
    }

    this.setState({
      action: e.target.value
      // checked: this.state.checked
    })
    // if (e.target.value == "Visit") {
    //   this.setState({
    //     action: e.target.value,
    //     checked: true
    //   })
    // } else {
    //   this.setState({
    //     action: e.target.value,
    //     checked: false
    //   })
    // }
  }

  handleDiscribe = e => {
    this.setState({ discription: e.target.value, cdiscribe: e.target.value })
  }

  // Meeting

  handleMeeting = e => {
    console.log("selected meeting", e.target.value)
    this.setState({ meeting_Type: e.target.value, tov: e.target.value })
  }

  handleMExoutCome = e => {
    this.setState({ MexOutCome: e.target.value, eoc: e.target.value })
  }

  handleMoutCome = e => {
    this.setState({ MactualOutcome: e.target.value, aoc: e.target.value })
  }

  handleMdiscribe = e => {
    this.setState({ Mdiscription: e.target.value, cdiscribe: e.target.value })
  }

  handleMdate = date => {
    this.setState({ MDate: date, cdate: date })
  }

  
  handleMeetingTime=time=>{
    this.setState({})
  }

  // Call

  handleCalldate = date => {
    this.setState({ CallDate: date, cdate: date })
  }

  handleCall = e => {
    this.setState({ call: e.target.value, tov: e.target.value })
  }

  handleCallExoutCome = e => {
    this.setState({ CallexOutCome: e.target.value, eoc: e.target.value })
  }

  handleCallAoutCome = e => {
    this.setState({ CallactualOutcome: e.target.value, aoc: e.target.value })
  }

  handleCallDiscribe = e => {
    this.setState({
      Calldiscription: e.target.value,
      cdiscribe: e.target.value
    })
  }

  
  handleCallTime = calltime => {
    this.setState({ Calltime: calltime })
  }

  handleMeetingTime = meetingTime => {
    this.setState({ Meetingtime: meetingTime })
  }


  
  close = () => this.setState({ 
    open: false, 
    open1: false,
    open2:false,
    open3:false,
    open4:false,
    open5:false,
    open6:false,
    open7:false,
    open8:false,
    open9:false,
    open10:false,
    open11:false,
    open12:false,
    open13:false,
    open14:false
  })



  
handleMeetingTypeName=e=>{
  this.setState({meetingTypeName:e.target.value})
}

addMeetingType=()=>{
  if(!this.state.meetingTypeName){
    this.setState({smsg:"Please Enter Meeting Type"})
  }else{
fetch(addMeetingType, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: this.state.meetingTypeName
  })
})
  .then(data => {
    return data.json()
  })
  .then(data => {
    console.log("data", data)
    console.log("data", data.records)

    if (data.message == "Meeting Type Added") {
      this.setState({mtmsg:data.message})
      setTimeout(()=>{
      this.listmeetingType();
      this.setState({meetingTypeModal:false,mtmsg:"",meetingTypeName:""})
      },1000)
    } else {
      this.setState({mtmsg:"Something went wrong !!!!!!!"})
      console.log("Something went wrong !!!!!!!")
    }
  })
}


}





handleVisitTypeName=e=>{
  this.setState({visitTypeName:e.target.value})
}

addVisitType=()=>{
  if(!this.state.visitTypeName){
    this.setState({smsg:"Please Enter visit Type Name"})
  }else{
fetch(addvisitTypeadd, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: this.state.visitTypeName
  })
})
  .then(data => {
    return data.json()
  })
  .then(data => {
    console.log("data", data)
    console.log("data", data.records)

    if (data.message == "Visit Type Added") {
      this.setState({vmsg:data.message})
      setTimeout(()=>{
      this.listVisitType();
      this.setState({visitTypeModal:false,vmsg:"",visitTypeName:""})
      },1000)
    } else {
      this.setState({cmsg:"Something went wrong !!!!!!!"})
      console.log("Something went wrong !!!!!!!")
    }
  })
}
}



handleCallTypeName=e=>{
  this.setState({callTypeName:e.target.value})
}

addCallType=()=>{
  if(!this.state.callTypeName){
    this.setState({smsg:"Please Enter call Type Name"})
  }else{
fetch(addcallType, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: this.state.callTypeName
  })
})
  .then(data => {
    return data.json()
  })
  .then(data => {
    console.log("data", data)
    console.log("data", data.records)

    if (data.message == "Call Type Added") {
      this.setState({cmsg:data.message})
      setTimeout(()=>{
      this.listcallType();
      this.setState({callTypeModal:false,cmsg:"",callTypeName:""})
      },1000)
    } else {
      this.setState({cmsg:"Something went wrong !!!!!!!"})
      console.log("Something went wrong !!!!!!!")
    }
  })
}
}


handleCallModal=()=>{
  this.setState({callTypeModal:true})

}

handleSelectCallId=e=>{
  let cid=e.target.value
  this.setState({calltypeid:cid})
  }

handleVisitModal=()=>{
  this.setState({visitTypeModal:true})

}

handleVisiTypeId=e=>{
  let vid=e.target.value
  this.setState({vsittypeId:vid})
}

handleMeetingModal=()=>{
  this.setState({meetingTypeModal:true})
}


handleSelectMeetingId=e=>{
  let mid=e.target.value
  this.setState({meetingtypeId:mid})
}



contractAddition=(tvisit,date)=>{


  fetch("http://35.161.99.113:9000/webapi/t_visit/t_addVisit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: this.state.cid,
      type_of_action: "visit",
      date: this.state.cdate,
      type_of_visit: tvisit,
      description: this.state.cdiscribe,
      visit_expected_outcome: "",
      visit_actual_outcome: "",
      km_travelled:"",
      visit_amount: "",
      from_date: moment(date).format("YYYY-MM-DD"),
      to_date: moment(date).format("YYYY-MM-DD"),
      AssignId: this.state.aid,
      tid:this.state.ticketid,
      lid:this.state.leadid,
      ascId:this.state.ascId,
      from_time:"",
      to_time:"",
      imageLink: this.state.ImageData1,
      status:'Approved'

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

}

handleContractSubmit=()=>{

  console.log("handel Submit is clicked")
  
  if(moment(this.state.selectedDate[0].oitDate1).isValid()){
    let t_o_v = "OIT"

   this.contractAddition(t_o_v,moment(this.state.selectedDate[0].oitDate1).format("YYYY-MM-DD"))
 }

 if(moment(this.state.selectedDate[1].oitDate2).isValid()){
    let t_o_v = "OIT"
  
     this.contractAddition(t_o_v,moment(this.state.selectedDate[1].oitDate2).format("YYYY-MM-DD"))
  }

  if(moment(this.state.selectedDate[2].overhulingDate1).isValid()){
      let t_o_v = "overhuling"
    
       this.contractAddition(t_o_v,moment(this.state.selectedDate[2].overhulingDate1).format("YYYY-MM-DD"))
    }


    if(moment(this.state.selectedDate[3].overhulingDate2).isValid()){
        let t_o_v = "overhuling"
      
         this.contractAddition(t_o_v,moment(this.state.selectedDate[3].overhulingDate2).format("YYYY-MM-DD"))
      }

      if(moment(this.state.selectedDate[4].breakdownDate1).isValid()){
          let t_o_v = "breakdown"
        
           this.contractAddition(t_o_v,moment(this.state.selectedDate[4].breakdownDate1).format("YYYY-MM-DD"))
        }


        if(moment(this.state.selectedDate[5].breakdownDate2).isValid()){
            let t_o_v = "breakdown"
          
             this.contractAddition(t_o_v,moment(this.state.selectedDate[5].breakdownDate2).format("YYYY-MM-DD"))
          }
  
  // for(let i=0;i<=6;i++){

  //   if(moment(this.state.selectedDate[i].oitDate1).isValid()){
  //         let t_o_v = "OIT"
      
  //        this.contractAddition(t_o_v,moment(this.state.selectedDate[i].oitDate1).format("YYYY-MM-DD"))
  //      }

  //      if(moment(this.state.selectedDate[i].oitDate2).isValid()){
  //         let t_o_v = "OIT"
        
  //          this.contractAddition(t_o_v,moment(this.state.selectedDate[i].oitDate2).format("YYYY-MM-DD"))
  //       }

  //       if(moment(this.state.selectedDate[i].overhulingDate1).isValid()){
  //           let t_o_v = "overhuling"
          
  //            this.contractAddition(t_o_v,moment(this.state.selectedDate[i].overhulingDate1).format("YYYY-MM-DD"))
  //         }


  //         if(moment(this.state.selectedDate[i].overhulingDate2).isValid()){
  //             let t_o_v = "overhuling"
            
  //              this.contractAddition(t_o_v,moment(this.state.selectedDate[i].overhulingDate2).format("YYYY-MM-DD"))
  //           }

  //           if(moment(this.state.selectedDate[i].breakdownDate1).isValid()){
  //               let t_o_v = "breakdown"
              
  //                this.contractAddition(t_o_v,moment(this.state.selectedDate[i].breakdownDate1).format("YYYY-MM-DD"))
  //             }


  //             if(moment(this.state.selectedDate[i].breakdownDate2).isValid()){
  //                 let t_o_v = "breakdown"
                
  //                  this.contractAddition(t_o_v,moment(this.state.selectedDate[i].breakdownDate2).format("YYYY-MM-DD"))
  //               }
  // }
}






  render() {
    const inputProps = {
      value: this.state.Address,
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
      email,
      cname,
      startDate,
      visit,
      exOutCome,
      actualOutcome,
      travel,
      handleiVsitAmount,
      vamount,
      action,
      checked,
      isopen,
      Mdiscription,
      MactualOutcome,
      MexOutCome,
      meeting_Type,
      MDate,
      call,
      CallexOutCome,
      CallactualOutcome,
      Calldiscription,
      FromDate,
      Fromtime,
      Totime,
      ToDate,
      format,
      Calltime,
      Meetingtime,
        
      isLoadingLead,resultsLead,valueLead,
      isLoadingTixy,resultsTixy,valueTixy,isSucess,
     ImageData,imageData1,

     callTypeData,visitTypeData,meetingTypeData,calltypeid,size12,
     visitTypeid,meetingtypeId,size13,size14
    } = this.state

    console.log("Selected Result", SelectedResult)

    let active = false
    // if(SelectedResult){
    //     Name=SelectedResult.company_name
    //    Phno=SelectedResult.number
    //    Address=SelectedResult.address
    //    rating=SelectedResult.star
    // }

    if (!SelectedResult.company_name) {
      active = false
    } else {
      active = true
    }

    return (
      <div>
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Action">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Action</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label
                style={{fontSize:"16px",fontWeight:"bold"}}       //Aishwarya 18/5/19
                >Client</label>
                <hr />
                <Form
                style={{fontSize:"16px"}}       //Aishwarya 18/5/19
                >
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                    aligned="center"
                    placeholder="Serch Client here"
                    {...this.props}
                  />
                  <br />
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
                    <Form.Input
                      label="Email-Id"
                      placeholder="Enter Email-Id"
                      type="email"
                      value={email}
                      onChange={this.handleEmail}
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Input
                      label="Contact Person Name"
                      placeholder="Contact Person Name"
                      type="text"
                      value={cname}
                      onChange={this.handlecname}
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Field>
                      <label className="labelcolor">Address : </label>

                      <PlacesAutocomplete inputProps={inputProps} />
                    </Form.Field>
                  </Form.Group>

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
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label
                style={{fontSize:"16px",fontWeight:"bold"}}       //Aishwarya 18/5/19
                >Action</label>
                <hr /><br/>

                  <Grid reversed='mobile' columns='equal'>
    <Grid.Column>
    <label
    style={{fontSize:"16px",fontWeight:"bold"}}       //Aishwarya 18/5/19
    >Ticket</label><br/><br/>
    <Search
  loading={isLoadingTixy}
  onResultSelect={this.handleResultSelectTixy}
  onSearchChange={this.handleSearchChangeTixy}
  results={resultsTixy}
  value={valueTixy}
  resultRenderer={resultRendererTixy}
  
  {...this.props}
  />
      </Grid.Column>
  
    <Grid.Column>
    <label
    style={{fontSize:"16px",fontWeight:"bold"}}       //Aishwarya 18/5/19
    >Lead</label><br/><br/>
    <Search
  loading={isLoadingLead}
  onResultSelect={this.handleResultSelectLead}
  onSearchChange={this.handleSearchChangeLead}
  results={resultsLead}
  value={valueLead}
  resultRenderer={resultRendererLead}
  
  {...this.props}
  />
      </Grid.Column>
  </Grid><hr/>

  
  <label
  style={{fontSize:"16px",fontWeight:"bold"}}       //Aishwarya 18/5/19
  >Asc Id</label><br/><br/>
    <Search
  loading={this.state.isLoadingContract}
  onResultSelect={this.handleResultSelectContract}
  onSearchChange={this.handleSearchChangeContract}
  results={this.state.resultsContract}
  value={this.state.valueContract}
  resultRenderer={resultRendererContract}
  {...this.props}
  />


  
{this.state.resultsContract.length > 0 ? (
  <div>

    
<Grid relaxed columns={3}>
<Grid.Column>
<label
style={{fontSize:"16px",fontWeight:"bold"}}       //Aishwarya 18/5/19
>Assign Employee -</label>
</Grid.Column>
<Grid.Column >
<p>{this.state.SelectedResultContract.aname}</p>
</Grid.Column>
</Grid>

<br/>

<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>OIT</Table.HeaderCell>
        <Table.HeaderCell>OIT Date1</Table.HeaderCell>
        <Table.HeaderCell>OIT Date2</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
        {this.state.SelectedResultContract.oit}
        </Table.Cell>
        <Table.Cell> {this.state.SelectedResultContract.oitDate1}</Table.Cell>
        <Table.Cell>{this.state.SelectedResultContract.oitDate2}</Table.Cell>

        </Table.Row>
        </Table.Body>
        </Table>



        
<br/>

<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Breakdown</Table.HeaderCell>
        <Table.HeaderCell>Breakdown Date1</Table.HeaderCell>
        <Table.HeaderCell>Breakdown Date2</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
        {this.state.SelectedResultContract.breakdown}
        </Table.Cell>
        <Table.Cell> {this.state.SelectedResultContract.breakdownDate1}</Table.Cell>
        <Table.Cell>{this.state.SelectedResultContract.breakdownDate2}</Table.Cell>

        </Table.Row>
        </Table.Body>
        </Table>


        
<br/>

<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Overhauling</Table.HeaderCell>
        <Table.HeaderCell>Overhauling Date1</Table.HeaderCell>
        <Table.HeaderCell>Overhauling Date2</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
        {this.state.SelectedResultContract.overhauling}
        </Table.Cell>
        <Table.Cell> {this.state.SelectedResultContract.overhulingDate1}</Table.Cell>
        <Table.Cell>{this.state.SelectedResultContract.overhulingDate2}</Table.Cell>

        </Table.Row>
        </Table.Body>
        </Table>
      
  </div>
):(
  <div>
        <hr/>                  {/* Aishwarya 8/5/19*/}
  <Form
  style={{fontSize:"16px"}}               //Aishwarya 8/5/19
  >
    <label style={{fontWeight:"bold"}} >Action Type - </label> <br/>  <br/>    {/* Aishwarya 8/5/19*/}
                {/*<hr />*/}         {/* Aishwarya 8/5/19*/}

                 
                   {action == "call" && (
                     <Form>
                     <Form.Group inline widths={3}>
                   <input
                   type="radio"
                   id="radio2"
                   name="radio1"
                   value="call"
                   onChange={this.handleAction}
                   defaultChecked
                 />
                 &nbsp;&nbsp;
                 <label htmlFor="radio2">Call</label>
                 </Form.Group>
                 </Form>
                   )}
                 
                 
                   {/* {action == "meeting" && (
                     <Form>
                     <Form.Group inline widths={3}>
                                     <input
                                       type="radio"
                                       id="radio1"
                                       name="radio1"
                                       value="meeting"
                                       onChange={this.handleAction}
                                       defaultChecked
                                     />
                                     &nbsp;&nbsp;
                                     <label htmlFor="radio1">Meeting</label>
                 </Form.Group>
                 </Form>
                   )} */}
                 
                 
                 
                 
                   {action == "visit" && (
                     <Form>
                     <Form.Group inline widths={3}>
                     <input
                                       type="radio"
                                       id="radio2"
                                       name="radio1"
                                       value="visit"
                                       onChange={this.handleAction}
                                       defaultChecked
                                     />
                                     &nbsp;&nbsp;
                                     <label htmlFor="radio2">Visit</label>
                 </Form.Group>
                 </Form>
                   )}
                 
                </Form>


                <hr />



                  <div>


{action == "meeting" && (
    <div>


<Grid relaxed columns={3}>
<Grid.Column>
<label style={{fontSize:"16px",fontWeight:"bold"}}>Assign Employee</label>            {/* Aishwarya 8/5/19*/}
</Grid.Column>
<Grid.Column>
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
</Grid.Column>
</Grid>

<br/>


<Grid columns='equal'>
<Grid.Row>
<Grid.Column>
<label className="labelcolor" 
style={{width:"5em",fontSize:"16px",fontWeight:"bold"}}>From Date :</label><br/><br/>     {/* Aishwarya 8/5/19*/}

<DatePicker
selected={this.state.MDate}
onChange={this.handleMdate}
onFocus={e => e.target.blur()}
dateFormat="DD-MM-YYYY"

/> 
<br/>
</Grid.Column>

<Grid.Column>
<label>Select Time</label><br/>
<br/>
    
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
    
<br/>

<Form  widths='equal'>
    <Form.Group>

    <label className="labelcolor" style={{width:"5em"}}>Type of Meeting :-</label><br/>   
<br/>
<select
                                    value={meetingtypeId}
                                    onChange={this.handleSelectMeetingId}
                                  >
                                    <option value="" disabled selected hidden>Type Of Meeting</option>
                                    {meetingTypeData.map(i => (
                                      <option value={i.name} key={i.id}>
                                        {i.name}
                                      </option>
                                    ))}
                                  </select>
                      <br />
                                  <Button  onClick={()=>this.handleMeetingModal()}  style={btnColor}>Add</Button>
 
<hr />
    </Form.Group>
</Form>


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

<label className="labelcolor">Meeting Description :</label><br/>   
<br/>
<TextArea 
placeholder='Tell us more'
value={Mdiscription}
onChange={this.handleMdiscribe} 
rows={10}   
/>

</Form>
<br/>
{/* <center>
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
 storageRef={meeting_fbs}
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
    </center> */}


    </div>
)}


 {action == "call" && (
<div>
<Grid relaxed columns={3}>
<Grid.Column>
<label>Assign Employee</label>
</Grid.Column>
<Grid.Column >
<div style={{width:400}}>
<Search
loading={isLoadingAssign}
onResultSelect={this.handleResultSelectAssign}
onSearchChange={this.handleSearchChangeAssign}
results={resultsAssign}
value={valueAssign}
resultRenderer={resultRendererAssign}
aligned="right"/>
</div>

</Grid.Column>
</Grid>

<br/>


<Grid columns='equal'>
<Grid.Row>
<Grid.Column>
<label className="labelcolor" 
style={{width:"5em",fontSize:"16px",fontWeight:"bold"}}>From Date :</label><br/><br/>     {/* Aishwarya 8/5/19*/}

<DatePicker
selected={this.state.CallDate}
onChange={this.handleCalldate}
onFocus={e => e.target.blur()}
dateFormat="DD-MM-YYYY"
/> 
</Grid.Column>

<Grid.Column>
<label lassName="labelcolor" 
style={{width:"5em",fontSize:"16px",fontWeight:"bold"}}>Select Time</label><br/>       {/* Aishwarya 8/5/19*/}
<br/>

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
</Grid><br/>
<br/>


    <Form  widths='equal'
    style={{fontSize:"16px"}}                   //aishwarya 18/5/19
    >
    {/*<Form.Group >*/}          {/* Aishwarya 8/5/19*/}
   
<br/>
    
    
    <hr />

    <label className="labelcolor" style={{width:"5em",fontWeight:"bold"}}>Type of Call :-</label><br/>   {/*Aishwarya  18/5/19 */}
<br/>
<select
style={{fontSize:"15px",width:"290px",height:"40px"}}        //aishwarya 18/5/19 
value={calltypeid}
  onChange={this.handleSelectCallId}
 >
 <option value="" disabled selected hidden>Type Of Call</option>
  {callTypeData.map(i => (
    <option value={i.name} key={i.id}>
      {i.name}
     </option>
  ))}
 </select>
                      <br />
                                  <Button  onClick={this.handleCallModal}  style={btnColor}>Add</Button>
                                {/*</Form.Group>*/}        {/* Aishwarya 8/5/19*/}
 <br /><br/>         {/* Aishwarya 8/5/19*/}
<Form
style={{fontSize:"16px"}}                   //aishwarya 18/5/19
>
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

<label className="labelcolor" style={{fontWeight:"bold"}}>Call Description :</label><br/>  {/* Aishwarya 8/5/19*/} 
<br/>
<TextArea 
placeholder='Tell us more'
value={Calldiscription}
onChange={this.handleCallDiscribe} 
rows={10}   
/>

</Form>
<br/>
{/* <center>
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
</Progress>    
</center> */}

</Form>
    </div>
)} 


{action == "visit" && (
<div>

<Grid relaxed columns={3}>
<Grid.Column>
<label style={{fontSize:"16px",fontWeight:"bold"}}>Assign Employee</label>            {/* Aishwarya 8/5/19*/}
</Grid.Column>
<Grid.Column >
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
<hr/>  
</div>

</Grid.Column>
</Grid>

<br/>



<Grid reversed='mobile' columns='equal'>
  <Grid.Column>
  <Form.Group widths="equal">
  <label className="labelcolor" 
  style={{width:"5em",fontSize:"16px",fontWeight:"bold"}}>From Date :</label><br/><br/>     {/* Aishwarya 8/5/19*/}
<DatePicker
selected={this.state.FromDate}
onChange={this.handleFrom}
onFocus={e => e.target.blur()}
dateFormat="DD-MM-YYYY"
/> 
<br/>
</Form.Group>
    </Grid.Column>

  <Grid.Column>
  <Form.Group widths="equal">

  <label className="labelcolor" 
  style={{width:"5em",fontSize:"16px",fontWeight:"bold"}}>To Date :</label><br/><br/>     {/* Aishwarya 8/5/19*/}
<DatePicker
selected={this.state.ToDate}
onChange={this.ToDate}
onFocus={e => e.target.blur()}
dateFormat="DD-MM-YYYY"
/> 
<br/>

</Form.Group>
    </Grid.Column>
</Grid><hr/>

<Grid columns='equal'>
<Grid.Row>
{/* <Grid.Column>
<label className="labelcolor" style={{width:"5em"}}>From Date :</label><br/><br/>

<DatePicker
selected={this.state.FromDate}
onChange={this.handleFromdate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormatCalendar="MMMM"
scrollableYearDropdown
yearDropdownItemNumber={15}
style={{width:"9em"}}
/> 
</Grid.Column><br/>
<Grid.Column>
<label className="labelcolor" style={{width:"5em"}}>To Date :</label><br/><br/>

<DatePicker
selected={this.state.ToDate}
onChange={this.handleTodate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormatCalendar="MMMM"
scrollableYearDropdown
yearDropdownItemNumber={15}
style={{width:"9em"}}
/> 
</Grid.Column> */}
<Grid.Column
style={{fontSize:"16px"}}                   //aishwarya 18/5/19
>
<label style={{fontSize:"16px",fontWeight:"bold"}}>Select From Time</label><br/><br/>   {/* Aishwarya 8/5/19*/}
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
<Grid.Column
style={{fontSize:"16px"}}                   //aishwarya 18/5/19
>
<label style={{fontSize:"16px",fontWeight:"bold"}}>Select To Time</label><br/><br/>   {/* Aishwarya 8/5/19*/}
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
<div>

<br/>

<Form
style={{fontSize:"16px"}}                   //aishwarya 18/5/19
>
{/*<Form.Group widths="equal">*/}         {/*aishwarya 18/5/19 */}

<hr />

<label className="labelcolor" style={{fontWeight:"bold"}}>Type of Visit :-</label><br/>       {/*aishwarya 18/5/19 */}
<br/>
<select
style={{fontSize:"15px",width:"290px",height:"40px"}}        //aishwarya 18/5/19 
                                    value={visitTypeid}
                                    onChange={this.handleVisiTypeId}
                                  >
                                    <option value="" disabled selected hidden>Type Of Visit</option>
                                    {visitTypeData.map(i => (
                                      <option value={i.name} key={i.id}>
                                        {i.name}
                                      </option>
                                    ))}
                                  </select>
                      <br />
                                  <Button  onClick={this.handleVisitModal}  style={btnColor}>Add</Button>
{/*</Form.Group>*/}        {/*aishwarya 18/5/19 */}
</Form>
<br/>        {/*aishwarya 18/5/19 */}
<Form style={{fontSize:"16px"}}>      {/*aishwarya 18/5/19 */}
<label className="labelcolor" style={{fontWeight:"bold"}}>Visit Description :</label><br/>   {/*aishwarya 18/5/19 */}
<br/>
<TextArea 
placeholder='Tell us more'
value={discription}
onChange={this.handleDiscribe} 
rows={6}   
/>
<br/> <br/>         {/*aishwarya 18/5/19 */}


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
{/* <center>
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
</center> */}

</div>
</div>

)} 
        </div> 
        </div>
)}

              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label style={{fontSize:"16px",fontWeight:"bold"}}>Image</label>      {/*aishwarya 18/5/19 */}
                <hr />

{ImageData && ImageData.length >= 0 &&(

  <RawCarousel imageData={ImageData && ImageData.length >= 0 && ImageData || []} />
)}

                <form>
                <br/>
                <Progress percent={this.state.progress} active color="green">
                  Smart Speed
                </Progress> 
              <br/>
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    storageRef={fbs}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </form>
                
              </Segment>
            </TixyContent>
          </ContentArea>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>
{this.state.resultsContract.length > 0 ? (
  <div>
            <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.handleContractSubmit()}
              >
                Add Contract
              </Button>
    </div>
  ):(
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubmit()}
            >
             Update Action
            </Button>
  )}
          </ContentArea>
        </PageContainer2>

        
{isopen == true ?(
  <ErrorModal isopen={this.state.isopen} msg={this.state.errorMsg} onClose={this.handleClose}/>
):(
  <div>
  </div>
)}

{isSucess == true ?(
<SuccessModal isopen={this.state.isSucess} msg={this.state.SuccessMsg} onClose={this.handleClose}/>
):(
<div>
</div>
)}

        {this.state.redirectToAsset && <Redirect to="/Action" push />}

        <font color="red">{this.state.msg1}</font>

        {this.state.redirectToAsset && <Redirect to="/Action" push />}


        
        
 <Modal
        open={this.state.callTypeModal}
        onClose={this.handleClose}
        className="alertOfFileds"
        closeIcon
        >
        <Modal.Header>
          <p>Add Call Type</p>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths={1}>
              <Form.Input
                label="Add Call Type "
                placeholder="Enter Call Type "
                value={this.state.callTypeName}
                onChange={this.handleCallTypeName}
                required
              />

            </Form.Group>
              <p><font color="red">{this.state.cmsg}</font></p>
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addCallType()}
              >
                Add Call Type
              </Button>
          </Form>
        </Modal.Content>
        </Modal>


        
<Modal
          open={this.state.meetingTypeModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Meeting Type</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Meeting Type "
                  placeholder="Enter Meeting Name"
                  value={this.state.meetingTypeName}
                  onChange={this.handleMeetingTypeName}
                  required
                />
              </Form.Group>
            </Form>
            <p>
              <font color="red">{this.state.mtmsg}</font>
            </p>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addMeetingType()}
            >
              Add Meeting
            </Button>
          </Modal.Content>
        </Modal>



        

<Modal
          open={this.state.visitTypeModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Visit Type</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add visit Name "
                  placeholder="Enter visit Name"
                  value={this.state.visitTypeName}
                  onChange={this.handleVisitTypeName}
                  required
                />
              </Form.Group>
            </Form>
            <p>
              <font color="red">{this.state.vmsg}</font>
            </p>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addVisitType()}
            >
              Add Visit
            </Button>
          </Modal.Content>
        </Modal>


      </div>
    )
  }
}


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

const resultRendererTixy = ({ company_name,tixyId }) => (
  <span>
    <Header as="h4">Company Name -{company_name}</Header>
    <Header as="h4">Ticket ID-{tixyId}</Header>

  </span>
)

const resultRendererLead = ({ company_name,leadId,number}) => (
 <List.List>
 <span>
    <Header as="h4">{company_name}</Header>
  </span>
  <List.Item>Lead Id - {leadId}</List.Item>
  <List.Item>{number}</List.Item>
  </List.List>
)



const resultRendererContract = ({ company_name,id,}) => (
  <List.List>
 
  <List.Item>AscID-{id}</List.Item>
   <List.Item>{company_name}</List.Item>
   </List.List>
 )


const formInput = {
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color: "#ffffff",
  padding: "14px",
  width: "31em"
}

export default EditAction

const btnColor = {
  backgroundColor: "#863577",
  color: "white"
}