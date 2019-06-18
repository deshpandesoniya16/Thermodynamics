import React, { Component } from "react"
import Side from "./Sidenav"
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
  Form
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import ErrorModal from "./ErrorModal"
import SuccessModal from "./SuccessModal"
import Carousel from "nuka-carousel"
import SmartUpload from "../component/SmartUpload"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { tixy_fbs } from "../component/base"
import { productListapi, AssetList } from "../component/Api"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import MediaQuery from "react-responsive"
import Select from "../../node_modules/semantic-ui-react/dist/commonjs/addons/Select/Select"
import { Lead_fbs, visit_fbs, meeting_fbs, call_fbs } from "../component/base"
import "rc-time-picker/assets/index.css"
import TimePicker from "rc-time-picker"
import { tixyReport_fbs } from "../component/base"

import {
  verticallist,
  grouplist,
  subgrplist,
  verticalBasedgrp,
  grpBasedsubgrp,
  callTypelist,
  addcallType,
  deleteCallType,
  visitTypeList,
  addvisitTypeadd,
  deleteVisitType,
  meetingTypeList,
  addMeetingType,
  deleteMeeting,
  tixy_Action,
  verticalAsset,
  assetGrp,
  verticalService, TixyEscalantion
} from "./Api"

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

import StarRatingComponent from "react-star-rating-component"
import RawCarousel from "./RawCarousel"

class AddTixy extends Component {
  state = {
    menuVisible: false,
    lastAction: "",
    Name: "",
    address: "",
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
    //rating:0,
    maxRating: 0,
    Solvediscription: "",

    isLoadingAssign: false,
    valueAssign: "",
    resultsAssign: [],
    SelectedResultAssign: {},
    isOpenHold: false,
    isOpenReject: false,
    isOpenClose: false,
    isProgressClose: false,
    AssignedUser: [],
    email: "",
    startDate: moment(),
    isopen: false,
    ProductData: [],
    AssetData: [],
    ImageData: [],

    ToDate: moment(),
    ClosedDate: moment(),
    minClosedDate: moment(),
    Vertical: "",
    isHOD: false,
    vname: "",
    isOpenVeritcal: false,
    action: "",

    MDate: moment(),
    Fromtime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    format: "hh:mm:ss",
    Totime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    FromDate: moment(),
    isOpenVistType: false,
    isOpenCallType: false,
    isOpenMeetingType: false,
    call_type: "",
    meeting_type: "",
    Calltime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    Meetingtime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    verticalData: [],
    SelectedAsset: "",

    rating: 0,
    btndisable: false,
    isSucess: false,
    ImageData1: [],
    //purposeReport: "",
    groupData: [],
    subGroupData: [],
    grpid: "",
    sgrpid: "",
    GrupName: "",
    // visitFromDate:moment(),
    // visitToDate:moment(),
    vtype: "",
    visitprogress: 0,
    visitImageData: [],

    Callprogress: 0,
    callImageData: [],
    isUploadingCall: false,
    Tno: 0,

    Mettingprogress: 0,
    mettingImageData: [],
    isUploadingmeeting: false,
    CallDate: moment(),
    assignEmpName: "",
    userInfo: {},
    cid: "",
    aid: "",

    callTypeData: [],
    meetingTypeData: [],
    visitTypeData: [],
    calltypeid: "",
    callTypeModal: false,
    open12: false,
    size12: "",
    vsittypeId: "",
    size13: "",
    meetingTypeName: "",
    size14: "",
    open14: false,
    meetingTypeModal: false,
    meetingtypeId: "",
    aname: "",
    callId: "",
    meetingId: "",
    visitId: "",
    groupName: "",
    subGroupName: "",
    verticalServiceHodData: [],
    ceodata: [],
    ceoinfo: {},
    userrole: [],
    toggleClosedDate: 'none',
    reportProgress:0,
    reportsUploadedfileName: [],
    isUploadingReport: false,
    reportsUploadedFile:[],
    reportsDataList:[],
  }

  listVertical = () => {
    fetch(verticallist, {
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
        console.log("vertical list", data.records)
        if (data.records) {
          this.setState({ verticalData: data.records })
          let vid
          data.records.map(i => {
            if (i.vertical == this.state.Vertical) {
              vid = i.id
            }
          })
          this.listAsset(this.state.Vertical)
        } else {
          console.log("No vertical")
          this.setState({ verticalData: [] })
        }
      })
  }

  listAsset = id => {
    fetch(verticalAsset, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        verticalName: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("asset list", data.records)
        if (data.records) {
          let gid
          data.records.map(i => {
            if (i.name == this.state.SelectedAsset) {
              gid = i.id
            }
          })
          this.listGroup(gid)
          this.setState({ AssetData: data.records })
        } else {
          console.log("No vertical")
          this.setState({ AssetData: [] })
        }
      })
  }

  listGroup = id => {
    fetch(assetGrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assetId: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Group List ", data.records)
        if (data.records) {
          this.setState({
            groupData: data.records,
            groupName: data.records[0].groupName,
            subGroupName: data.records[0].subGroupName
          })
        } else {
          console.log("No Group")
          this.setState({ groupData: [] })
          this.setState({ groupName: "", subGroupName: "" })
        }
      })
  }

  listSubGroup = id => {
    fetch(grpBasedsubgrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grpid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Sub Group List ", data.records)
        if (data.records) {
          this.setState({ subGroupData: data.records, sgrpid: "" })
        } else {
          console.log("No Sub Group")
          this.setState({ subGroupData: [], sgrpid: "" })
        }
      })
  }

  listcallType = () => {
    fetch(callTypelist, {
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
        console.log("call Type List ", data.records)
        if (data.records) {
          this.setState({ callTypeData: data.records })
        } else {
          console.log("No call type Name")
          this.setState({ callTypeData: [] })
        }
      })
  }

  listmeetingType = () => {
    fetch(meetingTypeList, {
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
        console.log("meeting Type List ", data.records)
        if (data.records) {
          this.setState({ meetingTypeData: data.records })
        } else {
          console.log("No meeting type Name")
          this.setState({ meetingTypeData: [] })
        }
      })
  }

  listVisitType = () => {
    fetch(visitTypeList, {
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
        console.log("visit Type List ", data.records)
        if (data.records) {
          this.setState({ visitTypeData: data.records })
        } else {
          console.log("No visit type Name")
          this.setState({ visitTypeData: [] })
        }
      })
  }

  verticalHod = roleName => {
    fetch(verticalService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role: roleName
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Service Hod ", data.records)
        if (data.records) {
          this.setState({ verticalServiceHodData: data.records })
        } else {
          console.log("No Hod")
          this.setState({ verticalServiceHodData: [] })
        }
      })
  }


  async componentDidMount() {
    let userInfo = await JSON.parse(sessionStorage.getItem("userInfo"))

    console.log('userInfoSoniya', userInfo);
    let ceoDetails = await JSON.parse(sessionStorage.getItem("ceoDetails"))
    console.log('ceoDetails', ceoDetails);

    await this.setState({ userInfo, ceoinfo: ceoDetails })

    this.state.userrole = JSON.parse(sessionStorage.getItem("Role"))
    let str = JSON.stringify(this.state.userrole)


    for (var i = 0; i < this.state.userrole.length; i++) {

      var trimmedRole = this.state.userrole[i].role.replace(/\s+/g, '')

      if (trimmedRole == "AtlasSales-HOD" || trimmedRole == "ThermaxSales-HOD" || trimmedRole == "BuhlerSales-HOD" || trimmedRole == "ThermaxService-HOD" || trimmedRole == "AtlasService-HOD" || trimmedRole == "BuhlerService-HOD") {
        this.setState({ toggleClosedDate: 'block' })
      }
    }

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

    // fetch(AssetList, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({

    //     })
    // }).then(data => {
    //     return data.json();
    // }).then(data => {
    //      console.log("data",data)
    //      console.log("Asset data",data.records)
    //      if(data.records){
    //        this.setState({AssetData:data.records})

    //      }else{
    //        console.log("No Asset Data")
    //        this.setState({AssetData:[]})
    //      }
    // })

    this.listVertical()

    this.listGroup()

    this.listVisitType()
    this.listmeetingType()
    this.listcallType()
  }

  onChange = Address => {
    console.log("Address is", Address)
    this.setState({ Address })
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue })
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
    }, 5000)
  }

  handleOpenHold = () => {
    this.setState({ isOpenHold: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpenHold: false })
    }, 5000)
  }

  handleOpenClose = () => {
    this.setState({ isOpenClose: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpenClose: false })
    }, 5000)
  }
  handleOpenProgress = () => {
    this.setState({ isProgressClose: true })

    this.timeout = setTimeout(() => {
      this.setState({ isProgressClose: false })
    }, 5000)
  }


  handleClose = () => {
    this.setState({
      isOpen: false,
      isOpenHold: false,
      isOpenReject: false,
      isOpenClose: false,
      isopen: false,
      isOpenVeritcal: false,
      isCall: false,
      isMeeting: false,
      isVisit: false,
      isOpenVistType: false,
      isOpenCallType: false,
      isOpenMeetingType: false,
      isSuccess: false,
      callTypeModal: false,
      visitTypeModal: false,
      meetingTypeModal: false,
      isOpen: false,
      isOpenHold: false,
      isOpenReject: false,
      isOpenClose: false,
      isOpenVistType: false,
      isOpenCallType: false,
      isOpenMeetingType: false,
      isProgressClose: false,
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

  handleEmail = e => {
    this.setState({ email: e.target.value })
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
    console.log("Delete is Done")

    this.setState({ status: "Rejected" })
  }

  handleHold = () => {
    console.log("hold is Done")
    this.setState({ status: "hold" })
  }

  handleFinalSovle = () => {
    // console.log("Final is Done")
    // if(this.state.Solvediscription.length <= 0){
    //   this.setState({closedmsg:"Please Enter Discription"})
    // }else{

    this.setState({ status: "Closed", closedmsg: "Status Changed To Closed" })
    // }
  }

  handleProgresStatus = () => {
    console.log("In Progress")
    this.setState({ status: "UnderProgress" })
  }

  //Search
  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.company_name, cid: result.id })
    this.setState({ SelectedResult: result })
    setTimeout(() => {
      // let active=true
      if (this.state.SelectedResult) {
        this.setState({
          Name: this.state.SelectedResult.company_name,
          Phno: this.state.SelectedResult.number,
          address: this.state.SelectedResult.address,
          //rating:this.state.SelectedResult.star,
          email: this.state.SelectedResult.email,
          msg: ""
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
    console.log("result", result)
    this.setState({
      valueAssign: result.name,
      aid: result.id,
      aname: result.name
    })
    this.setState({ SelectedResultAssign: result })
    if (result) {
      this.setState({
        assignEmpName: result.name
      })
    }
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

  handleUser = () => {
    if (!this.state.Name) {
      this.setState({ Clientmsg: "Please Enter Company Name" })
    } else if (!this.state.Phno) {
      this.setState({ Clientmsg: "Please Enter Phno" })
    } else if (!this.state.address) {
      this.setState({ Clientmsg: "Please Enter Address" })
    } else {
      fetch("http://35.161.99.113:9000/webapi/t_client/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.Name,
          number: this.state.Phno,
          address: this.state.address,
          star: this.state.rating,
          email: this.state.email
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
        })
    }
  }

  msgEmailHod = () => {
    let authkey = "133779ATT6JFXy0k5850e783"
    let sender = "SHMGMT"
    let route = "4"
    let number = this.state.verticalServiceHodData[0].mobile_num
    // B1234 has been assigned to our engineer <name>and has been scheduled for  dd-mm-yy by (----). For any queries please call 9876543210.

    // let message = "Dear Customer, your service Ticket no."+this.state.Tno+"\n has been assigned to our engineer"+this.state.assignEmpName+"and has been scheduled for"+this.state.ClosedDate+"\n by"+this.state.userInfo.name+"\n For any queries please call 9876543210"
    let message4 =
      "Dear Sir," +
      " " +
      this.state.verticalServiceHodData[0].name +
      "Ticket no." +
      " " +
      this.state.Tno +
      " " +
      "has been raised for" +
      " " +
      this.state.Name +
      ". Please assign the engineer."

    //+"\n has been assigned to our engineer"+this.state.assignEmpName+"and has been scheduled for"+this.state.ClosedDate+"\n by"+this.state.userInfo.name+"\n For any queries please call 9876543210"

    let url =
      "http://bhashsms.com/api/sendmsg.php?" +
      "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
      message4 +
      "&sender=MHOURZ&phone=" +
      number +
      "&priority=ndnd&stype=normal"
    console.log("url", url)
    fetch(url, { mode: "no-cors" }).then(response => {
      console.log(response)
      // this.setState({redirectToTixy:true})

      let emailSubject = `Hi ${this.state.Name} Welcome To Thermodynamic`
      let emailData = {
        company: "mhc",
        templateName: "ThermoDynamicTixy",
        emailSubject: emailSubject,
        emailTo: this.state.verticalServiceHodData[0].email,
        emailData: {
          name: this.state.Name,
          msg: message4,
          tno: this.state.Tno
        }
      }

      let dataString = JSON.stringify(emailData)
      console.log("dataString", dataString)

      fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: dataString
      }).then(data => {
        console.log("email api call", data)
      })
    })
  }

  msgEmailClient = () => {
    let authkey = "133779ATT6JFXy0k5850e783"
    let sender = "SHMGMT"
    let route = "4"
    let number = this.state.Phno
    let message1 =
      "Dear" +
      " " +
      this.state.Name +
      "," +
      " " +
      "your service Ticket no." +
      this.state.Tno
    // B1234 has been assigned to our engineer <name>and has been scheduled for  dd-mm-yy by (----). For any queries please call 9876543210.
    // Dear Customer, your service Ticket no.B1234 has been assigned to our engineer <>and has been scheduled for  dd-mm-yy by (----). For any queries please call 9876543210.
    // let message = "Dear Customer, your service Ticket no."+this.state.Tno+"\n has been assigned to our engineer"+this.state.assignEmpName+"and has been scheduled for"+this.state.ClosedDate+"\n by"+this.state.userInfo.name+"\n For any queries please call 9876543210"

    //  if(this.state.Tno > 0){
    //    return message1 = "Dear "+this.state.Name+", your service Ticket no."+this.state.Tno
    //  }

    //  if(this.state.SelectedResultAssign.id > 0){
    //    return message1 = "Dear"+" "+this.state.Name+","+" "+"your service Ticket no."+this.state.Tno+" "+"has been assigned to our engineer"+" "+this.state.aname+" "+"and has been scheduled"+" "+"for"+" "+this.state.closedDate+" "+"by"+this.state.verticalServiceHodData[0].name+".For any queries please call 9876543210"
    //  }

    setTimeout(() => {
      if (this.state.status == "Closed") {
        let message1 =
          "Dear" +
          " " +
          this.state.Name +
          " " +
          " your service Ticket no." +
          this.state.userInfo.id +
          "" +
          "has been closed successfully." +
          " " +
          "We hope our response and service was upto your satisfaction. Thank you for giving us an opportunity to serve. Please share your feedback with us by clicking the link below." +
          " " +
          "http://www.thermodynamic.co.in/contact-us.php"

        let url =
          "http://bhashsms.com/api/sendmsg.php?" +
          "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
          message1 +
          "&sender=MHOURZ&phone=" +
          this.state.Phno +
          "&priority=ndnd&stype=normal"
        console.log("url client", url)
        fetch(url, { mode: "no-cors" }).then(response => {
          console.log(response)
          // this.setState({redirectToTixy:true})
        })

        let emailSubject = `Hi ${this.state.Name} Welcome To Thermodynamic`
        let emailData = {
          company: "mhc",
          templateName: "ThermoDynamicTixy",
          emailSubject: emailSubject,
          emailTo: this.state.email,
          emailData: {
            name: this.state.Name,
            msg: message1,
            tno: this.state.userInfo.id
          }
        }

        let dataString = JSON.stringify(emailData)

        fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
          method: "post",
          headers: {
            "content-type": "application/json"
          },
          body: dataString
        }).then(data => {
          console.log("email api call", data)
        })
      }
    }, 1200)

    //+"\n has been assigned to our engineer"+this.state.assignEmpName+"and has been scheduled for"+this.state.ClosedDate+"\n by"+this.state.userInfo.name+"\n For any queries please call 9876543210"

    let url =
      "http://bhashsms.com/api/sendmsg.php?" +
      "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
      message1 +
      "&sender=MHOURZ&phone=" +
      number +
      "&priority=ndnd&stype=normal"
    console.log("url client", url)
    fetch(url, { mode: "no-cors" }).then(response => {
      console.log(response)
      // this.setState({redirectToTixy:true})
    })

    let emailSubject = `Hi ${this.state.Name} Welcome To Thermodynamic`
    let emailData = {
      company: "mhc",
      templateName: "ThermoDynamicTixy",
      emailSubject: emailSubject,
      emailTo: this.state.email,
      emailData: {
        name: this.state.Name,
        msg: message1,
        tno: this.state.Tno
      }
    }

    let dataString = JSON.stringify(emailData)

    fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: dataString
    }).then(data => {
      console.log("email api call", data)
    })
  }

  msgEmailAssign = () => {
    let authkey = "133779ATT6JFXy0k5850e783"
    let sender = "SHMGMT"
    let route = "4"
    let number = this.state.SelectedResultAssign.mobile_num
    let message2

    // Dear <Engineer name>, Ticket no.<B1234>  has been assigned to you against <Breakdown/service Visit/Checkup> for  <Hotel Kanha Shyam > <Allahabad>.Severity(Urgent/Normal/Routine>. Scheduled for dd-mm-yy. Contact<9876543210>.

    if (this.state.action.length < 0) {
      console.log("sorry I cant send notifiacation no action is added")
    } else {
      if (this.state.calltypeid > 0) {
        let Cmessage =
          "Dear" +
          " " +
          this.state.valueAssign +
          " " +
          "Ticket no." +
          this.state.Tno +
          " " +
          "has been assigned to you against" +
          this.state.calltypeid +
          "\t" +
          "Please look in to this on Priority"

        let url =
          "http://bhashsms.com/api/sendmsg.php?" +
          "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
          Cmessage +
          "&sender=MHOURZ&phone=" +
          number +
          "&priority=ndnd&stype=normal"
        console.log("url", url)
        fetch(url, { mode: "no-cors" }).then(response => {
          console.log(response)
          // this.setState({redirectToTixy:true})
        })

        let emailSubject = `Hi ${this.state.Name} Welcome To Thermodynamic`
        let emailData = {
          company: "mhc",
          templateName: "ThermoDynamicTixy",
          emailSubject: emailSubject,
          emailTo: "akashmishra989ha@gmail.com",
          emailData: {
            name: this.state.Name,
            msg: Cmessage,
            tno: this.state.userInfo.id
          }
        }

        let dataString = JSON.stringify(emailData)

        fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
          method: "post",
          headers: {
            "content-type": "application/json"
          },
          body: dataString
        }).then(data => {
          console.log("email api call", data)
        })
      }

      if (this.state.meetingtypeId > 0) {
        let Mmessage =
          "Dear" +
          " " +
          this.state.valueAssign +
          " " +
          "Ticket no." +
          this.state.Tno +
          " " +
          "has been assigned to you against" +
          this.state.meetingtypeId +
          "\t" +
          "Please look in to this on Priority"

        let url =
          "http://bhashsms.com/api/sendmsg.php?" +
          "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
          Mmessage +
          "&sender=MHOURZ&phone=" +
          number +
          "&priority=ndnd&stype=normal"
        console.log("url", url)
        fetch(url, { mode: "no-cors" }).then(response => {
          console.log(response)
          // this.setState({redirectToTixy:true})
        })

        let emailSubject = `Hi ${this.state.Name} Welcome To Thermodynamic`
        let emailData = {
          company: "mhc",
          templateName: "ThermoDynamicTixy",
          emailSubject: emailSubject,
          emailTo: "akashmishra989ha@gmail.com",
          emailData: {
            name: this.state.Name,
            msg: Mmessage,
            tno: this.state.userInfo.id
          }
        }

        let dataString = JSON.stringify(emailData)

        fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
          method: "post",
          headers: {
            "content-type": "application/json"
          },
          body: dataString
        }).then(data => {
          console.log("email api call", data)
        })
      }

      if (this.state.visitTypeid > 0) {
        let Vmessage =
          "Dear" +
          " " +
          this.state.valueAssign +
          " " +
          "Ticket no." +
          this.state.Tno +
          " " +
          "has been assigned to you against" +
          this.state.visitTypeid +
          "\t" +
          "Please look in to this on Priority"

        let url =
          "http://bhashsms.com/api/sendmsg.php?" +
          "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
          Vmessage +
          "&sender=MHOURZ&phone=" +
          number +
          "&priority=ndnd&stype=normal"
        console.log("url", url)
        fetch(url, { mode: "no-cors" }).then(response => {
          console.log(response)
          // this.setState({redirectToTixy:true})
        })

        let emailSubject = `Hi ${this.state.Name} Welcome To Thermodynamic`
        let emailData = {
          company: "mhc",
          templateName: "ThermoDynamicTixy",
          emailSubject: emailSubject,
          emailTo: "akashmishra989ha@gmail.com",
          emailData: {
            name: this.state.Name,
            msg: Vmessage,
            tno: this.state.userInfo.id
          }
        }

        let dataString = JSON.stringify(emailData)

        fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
          method: "post",
          headers: {
            "content-type": "application/json"
          },
          body: dataString
        }).then(data => {
          console.log("email api call", data)
        })
      }
    }

    //client msg

    let messageClientAssign =
      "Dear" +
      " " +
      this.state.Name +
      "," +
      " " +
      "your service Ticket no." +
      this.state.Tno +
      " " +
      "has been assigned to our engineer" +
      " " +
      this.state.aname +
      " " +
      "and has been scheduled" +
      " " +
      "for" +
      " " +
      this.state.closedDate +
      " " +
      "by" +
      this.state.verticalServiceHodData[0].name +
      ".For any queries please call 9876543210"
    let url1 =
      "http://bhashsms.com/api/sendmsg.php?" +
      "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
      messageClientAssign +
      "&sender=MHOURZ&phone=" +
      this.state.Phno +
      "&priority=ndnd&stype=normal"
    console.log("url", url1)
    fetch(url1, { mode: "no-cors" }).then(response => {
      console.log(response)
      // this.setState({redirectToTixy:true})
    })

    let emailSubject1 = `Hi ${
      this.state.SelectedResultAssign.email
      } Welcome To Thermodynamic`
    let emailData1 = {
      company: "mhc",
      templateName: "ThermoDynamicTixy",
      emailSubject: emailSubject1,
      emailTo: this.state.SelectedResultAssign.email,
      emailData: {
        name: this.state.Name,
        msg: messageClientAssign,
        tno: this.state.Tno
      }
    }

    let dataString1 = JSON.stringify(emailData1)

    fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: dataString1
    }).then(data => {
      console.log("email api call", data)
    })

    let url =
      "http://bhashsms.com/api/sendmsg.php?" +
      "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
      message2 +
      "&sender=MHOURZ&phone=" +
      number +
      "&priority=ndnd&stype=normal"
    console.log("url", url)
    fetch(url, { mode: "no-cors" }).then(response => {
      console.log(response)
      // this.setState({redirectToTixy:true})
    })

    let emailSubject = `Hi ${
      this.state.SelectedResultAssign.email
      } Welcome To Thermodynamic`
    let emailData = {
      company: "mhc",
      templateName: "ThermoDynamicTixy",
      emailSubject: emailSubject,
      emailTo: this.state.SelectedResultAssign.email,
      emailData: {
        name: this.state.Name,
        msg: message2,
        tno: this.state.Tno
      }
    }

    let dataString = JSON.stringify(emailData)

    fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: dataString
    }).then(data => {
      console.log("email api call", data)
    })
  }

  //Add Tixy

  handleChangeUsername = event =>
    this.setState({ username: event.target.value })
  handleUploadStartTixy = () =>
    this.setState({ isUploading: true, progress: 0 })
  handleProgress1Tixy = progress => this.setState({ progress })
  handleUploadErrorTixy = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }
  handleUploadSuccessTixy = filename => {
    this.setState({
      uploadedfileName: filename,
      progress: 100,
      isUploading: false
    })
    tixy_fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.ImageData1.push(url)
        this.state.ImageData.push({ link: url })
        this.setState({ uploadedfileurl: url })
        this.setState({})
      })

    setTimeout(() => {
      if (this.state.progress == 100) {
        this.setState({ filename: "", progress: 0 })
      } else {
        console.log("error in upload")
      }
    }, 1000)
  }

  actionadd = () => {
    switch (this.state.action) {
      case "visit":
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
            type_of_visit: this.state.visitTypeid,
            description: this.state.discription,
            //  visit_expected_outcome: this.state.exOutCome,
            // visit_actual_outcome: this.state.actualOutcome,
            km_travelled: this.state.travel,
            visit_amount: this.state.vamount,
            from_date: moment(this.state.FromDate).format("DD-MM-YYYY"),
            to_date: moment(this.state.ToDate).format("DD-MM-YYYY"),
            AssignId: this.state.aname,
            tid: this.state.Tno,
            lid: this.state.leadid,
            from_time: moment(this.state.Fromtime).format("HH:mm:ss"),
            to_time: moment(this.state.Totime).format("hh:mm:ss"),
            imageLink: this.state.ImageData1,
            status: "Denie"
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            console.log("data", data.records)
            let visitid = data.records

            this.setState({ visitId: visitid })

            if (data.message == "Action added") {
              fetch(tixy_Action, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  callId: "",
                  visitId: visitid,
                  meetingId: "",
                  tid: this.state.Tno
                })
              })
                .then(data => {
                  return data.json()
                })
                .then(data => {
                  console.log("data", data)
                  console.log("data", data.records)
                })

              this.setState({ isSucess: true, SuccessMsg: data.message })
              setTimeout(() => {
                this.setState({ isSucess: false, redirectToAsset: true })
              }, 1000)
              //  this.setState({redirectToAsset:true})
              //  this.setState({redirectToWelcome:true})
            } else {
              this.setState({ isopen: true, errorMsg: data.error })
              console.log("No User")
              //this.setState({ msg: data.error })
            }
          })
        // }
        break

      // case "meeting":
      //   // if (!this.state.cid) {
      //   //   this.setState({ msg1: "Please Select client" })
      //   // } else if (!this.state.tid) {
      //   //   this.setState({ msg1: "Please Select Type Of Inquiry" })
      //   // } else if (!this.state.cdiscribe) {
      //   //   this.setState({ msg1: "Please Enter Visit Discription" })
      //   // } else if (!this.state.eoc) {
      //   //   this.setState({ msg1: "Please Enter Expected Outcome" })
      //   // } else if (!this.state.aoc) {
      //   //   this.setState({ msg1: "Please Enter Actual Outcome" })
      //   // } else {
      //   fetch("http://35.161.99.113:9000/webapi/t_visit/t_addVisit", {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       client_id: this.state.cid,
      //       type_of_action: this.state.action,
      //       type_of_visit: this.state.meetingTypeid,
      //       description: this.state.Mdiscription,
      //       visit_expected_outcome: this.state.MexOutCome,
      //       visit_actual_outcome: this.state.MactualOutcome,
      //       km_travelled: "",
      //       visit_amount: "",
      //       from_date: moment(this.state.MDate).format("DD-MM-YYYY"),
      //       to_date: "",
      //       AssignId: this.state.aname,
      //       tid: this.state.Tno,
      //       lid: this.state.leadid,
      //       from_time: moment(this.state.Meetingtime).format("hh:mm:ss"),
      //       to_time: "",
      //       imageLink: this.state.ImageData1,
      //       status: "Denie"
      //     })
      //   })
      //     .then(data => {
      //       return data.json()
      //     })
      //     .then(data => {
      //       console.log("data", data)
      //       console.log("data", data.records)
      //       let meetingid = data.records

      //       this.setState({ meetingId: meetingid })
      //       //if(data.message === 'succesfully updated'){

      //       // this.setState({msg:data.message})
      //       // let authkey = "133779ATT6JFXy0k5850e783"
      //       // let sender = "SHMGMT"
      //       // let route = "4"
      //       // let number = this.state.Phno
      //       // let message = "Hi your ticket is created :"
      //       // let url= "http://bhashsms.com/api/sendmsg.php?"+'user=TEAM_MHOURZ&pass=MECHATRON&text='+message+'&sender=MHOURZ&phone='+number+'&priority=ndnd&stype=normal'
      //       // console.log("url",url)
      //       // fetch(url, {mode: 'no-cors'}).then(response =>{
      //       //     console.log(response)
      //       // })
      //       // window.location.reload()
      //       if (data.message == "Action added") {
      //         fetch(tixy_Action, {
      //           method: "POST",
      //           headers: {
      //             Accept: "application/json",
      //             "Content-Type": "application/json"
      //           },
      //           body: JSON.stringify({
      //             callId: "",
      //             visitId: "",
      //             meetingId: meetingid,
      //             tid: this.state.Tno
      //           })
      //         })
      //           .then(data => {
      //             return data.json()
      //           })
      //           .then(data => {
      //             console.log("data", data)
      //             console.log("data", data.records)
      //           })

      //         this.setState({ isSucess: true, SuccessMsg: data.message })
      //         setTimeout(() => {
      //           this.setState({ isSucess: false, redirectToAsset: true })
      //         }, 1000)
      //         //  this.setState({redirectToWelcome:true})
      //       } else {
      //         this.setState({ isopen: true, errorMsg: data.error })
      //         console.log("No User")
      //         //this.setState({ msg: data.error })
      //       }
      //     })
      //   //}

      //   break

      case "call":
        fetch("http://35.161.99.113:9000/webapi/t_visit/t_addVisit", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            client_id: this.state.cid,
            type_of_action: this.state.action,
            type_of_visit: this.state.calltypeid,
            description: this.state.Calldiscription,
            visit_expected_outcome: this.state.CallexOutCome,
            visit_actual_outcome: this.state.CallactualOutcome,
            km_travelled: "",
            visit_amount: "",
            from_date: moment(this.state.CallDate).format("DD-MM-YYYY"),
            to_date: "",
            AssignId: this.state.aname,
            tid: this.state.Tno,
            lid: this.state.leadid,
            from_time: moment(this.state.Calltime).format("hh:mm:ss"),
            to_time: "",
            imageLink: this.state.ImageData1,
            status: "Denie"
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            console.log("data", data.records)
            let callid = data.records

            this.setState({ callId: callid })
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
              fetch(tixy_Action, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  callId: callid,
                  visitId: "",
                  meetingId: "",
                  tid: this.state.Tno
                })
              })
                .then(data => {
                  return data.json()
                })
                .then(data => {
                  console.log("data", data)
                  console.log("data", data.records)
                })

              this.setState({ isSucess: true, SuccessMsg: data.message })
              setTimeout(() => {
                this.setState({ isSucess: false, redirectToAsset: true })
              }, 1000)
              //  this.setState({redirectToWelcome:true})
            } else {
              this.setState({ isopen: true, errorMsg: data.error })
              console.log("No User")
              //this.setState({ msg: data.erro })
            }
          })

        break

      default:
        break
    }
  }

  // if(!this.state.aid){
  //   this.setState({msg1:"Please Select Assign Emp "})
  // }else

  handleSubmit = () => {

    let ceohod = []

    ceohod.push(this.state.verticalServiceHodData[0],
      this.state.ceoinfo
    )
    if (!this.state.cid) {
      this.setState({ msg1: "Please Select Company" })
    } else if (!this.state.Name) {
      this.setState({ msg1: "Please Select Company " })
    } else if (!this.state.Vertical) {
      this.setState({ msg1: "Please Select Vertical" })
    } else if (this.state.SelectedAsset.length <= 0) {
      this.setState({ msg1: "Please Select Asset" })
    } else if (this.state.discription.length <= 0) {
      this.setState({ msg1: "Please Enter Description" })
     } 
    //else if (!this.state.ClosedDate) {
    //   this.setState({ msg1: "Please Select Closed Date" })
      // } 
      else if (!this.state.status) {
        this.setState({ msg1: "Please Select Status" })
    } else {
      fetch("http://35.161.99.113:9000/webapi/t_ticket/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          client_id: this.state.cid,
          priority: this.state.rating,
          description: this.state.discription,
          status: this.state.status,
          solution: this.state.Solvediscription,
          assigneId: this.state.aid,
          aname: this.state.aname,
          timeStamp: this.state.startDate,
          imageLink: this.state.ImageData1,
          vertical: this.state.Vertical,
          asset: this.state.SelectedAsset,
          groupName: this.state.groupName,
          subGroupName: this.state.subGroupName,
          //   purposeReport: this.state.purposeReport,
          // closedDate: moment(this.state.ClosedDate).format("DD-MM-YYYY"),
          closedDate: this.state.ClosedDate,
          action: this.state.action,
          callId: this.state.callId,
          visitId: this.state.visitId,
          meetingId: this.state.meetingId,
          reportLink:this.state.reportsDataList
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
          // window.location.reload()
          let tno = data.records
          this.state.Tno = data.records
          console.log(" this.state.Tno", this.state.Tno)
          if (data.message == "Ticket Created") {
            this.msgEmailClient()
            this.msgEmailHod()

            if (this.state.action.length < 0) {
              console.log("action is not selected therefor msg not sent ")
            } else {
              this.actionadd()
              this.msgEmailAssign()
            }

            if (!this.state.SelectedResultAssign.id) {
              this.setState({
                msg:
                  "sorry employee is not assigned therfor we can't send notification "
              })

              let formateDate = moment().format("DD-MM-YYYY", )
              console.log('formateDate', formateDate);


              console.log('month', moment(formateDate).month());
              let month1 = moment(formateDate).month() + 1

              console.log('month', month1);
              console.log('year', moment(formateDate).year());
              console.log('date', moment(formateDate).date());
              console.log('time hr', moment(formateDate).second());
              console.log('time minute', moment(formateDate).hour());
              console.log('time second', moment(formateDate).minutes());



              // let jsdate = new Date(date.year(),month1,date.date(),16,25,0)
              let filler = ''
              if (moment(formateDate).date() < 10) {
                filler = '0'
              }
              let filler2 = ''
              if (month1 < 10) {
                filler2 = '0'
              }
              let jsdate = moment(formateDate).year() + '-' + filler2 + month1 + '-' + filler + moment(formateDate).date() + 'T13:13:00'
              // jsdate="2018-10-01T16:35:00"


              console.log('jsdate', jsdate, new Date(jsdate));

              fetch(TixyEscalantion, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                  date: jsdate,
                  tno: tno,
                  modulName: 'Tixy',
                  hoddata: this.state.verticalData[0]
                })

              }).then(data => {
                return data.json();
              }).then(data => {
                console.log('data', data);
                this.setState({ msg: "" })
              })




            } else {
              this.setState({ msg: "" })
              this.msgEmailAssign()
            }
            this.setState({ btndisable: true })
            this.setState({ isSucess: true, Smsg: data.message })
            setTimeout(() => {
              this.setState({ isSucess: false, redirectToTixy: true })
            }, 1000)
          } else {
            this.setState({ isopen: true, errorMsg: data.error })
            console.log("No User")
            this.setState({ msg: "Invalid User" })
          }
        })
    }
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  handleFromDate = date => {
    this.setState({ fromDate: date })
  }

  handleToDate = date => {
    this.setState({ ToDate: date })
  }
  handleVertical = e => {
    let vname = e.target.value
    let vid
    this.state.verticalData.map(i => {
      if (i.vertical == vname) {
        vid = i.id
      }
    })
    // this.listGroup(vid)
    this.listAsset(vname)
    this.setState({ Vertical: e.target.value, isHOD: true })

    switch (vname) {
      case "Thermax":
        let thod = vname + " " + "Service-HOD"
        console.log("thod", thod)

        this.verticalHod(thod)
        break

      case "Atlas Copco":
        let splitString = vname.substring(0, 5)
        console.log("splitString Atlas", splitString)
        let finalString = splitString + " " + "Service-HOD"
        console.log("finalString Atlas", finalString)
        this.verticalHod(finalString)

        break

      case "Buhler":
        let bsplitString = vname.substring(0, 6)
        console.log("splitString Buhler", bsplitString)
        let bfinalString = bsplitString + " " + "Service-HOD"
        console.log("finalString Buhler", bfinalString)
        this.verticalHod(bfinalString)

        break

      default:
        break
    }
  }

  handleCloseDate = date => {
    this.setState({ ClosedDate: date })
  }

  handleaddVertical = e => {
    this.setState({ vname: e.target.value })
  }

  handleAddVertical = () => {
    this.setState({ isOpenVeritcal: true })
  }

  handleMachnie = e => {
    console.log("product Group", e.target.value)
    let ch = ""
    switch (e.target.value) {
      case "call":
        this.setState({ isCall: true })

        break

      case "visit":
        this.setState({ isVisit: true })

        break

      // case "meeting":
      //   this.setState({ isMeeting: true })
      //   break

      default:
        break
    }

    this.setState({
      action: e.target.value
      // checked: this.state.checked
    })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  onChange = address => {
    console.log("Address is", address)
    this.setState({ address })
  }

  // handleAoutCome = e => {
  //   this.setState({ actualOutcome: e.target.value, msg1: "" })
  // }
  handleTravel = e => {
    this.setState({ travel: e.target.value, msg1: "" })
  }

  handleiVsitAmount = e => {
    this.setState({ vamount: e.target.value, msg1: "" })
  }

  // handleExoutCome = e => {
  //   this.setState({ exOutCome: e.target.value, msg1: "" })
  // }

  handleFrom = date => {
    this.setState({ FromDate: date, msg1: "" })
  }

  ToDate = date => {
    this.setState({ ToDate: date, msg1: "" })
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })

  handleProgress = progress => this.setState({ progress })

  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }

  handleUploadSuccess = filename => {
    this.setState({
      uploadedfileName: filename,
      visitprogress: 100,
      isUploading: false
    })

    visit_fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.visitImageData.push(url)
        this.setState({ visituploadedfileurl: url })
      })

    if (this.state.visitprogress == 100) {
      this.setState({ progress: 0 })
    }
  }

  // Meeting

  // handleMeeting = e => {
  //   console.log("selected meeting", e.target.value)
  //   this.setState({ meeting_Type: e.target.value })
  // }

  handleMExoutCome = e => {
    this.setState({ MexOutCome: e.target.value })
  }

  handleMoutCome = e => {
    this.setState({ MactualOutcome: e.target.value })
  }

  handleMdiscribe = e => {
    this.setState({ Mdiscription: e.target.value })
  }

  handleMdate = date => {
    this.setState({ MDate: date })
  }

  //Meeting Upload

  // handleChangeUsername = (event) => this.setState({username: event.target.value});

  mettinghandleUploadStart = () =>
    this.setState({ isUploadingmeeting: true, Mettingprogress: 0 })

  meetinghandleProgress = Mettingprogress => this.setState({ Mettingprogress })

  mettinghandleUploadError = error => {
    this.setState({ isUploadingmeeting: false })
    console.error(error)
  }

  mettinghandleUploadSuccess = filename => {
    this.setState({
      mettinguploadedfileName: filename,
      Mettingprogress: 100,
      isUploadingmeeting: false
    })

    meeting_fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.mettingImageData.push(url)
        this.setState({ mettinguploadedfileurl: url })
      })

    if (this.state.Mettingprogress == 100) {
      this.setState({ Mettingprogress: 0 })
    }
  }

  // Call

  handleCalldate = date => {
    this.setState({ CallDate: date })
  }

  handleCall = e => {
    this.setState({ call: e.target.value })
  }

  handleCallExoutCome = e => {
    this.setState({ CallexOutCome: e.target.value })
  }

  handleCallAoutCome = e => {
    this.setState({ CallactualOutcome: e.target.value })
  }

  handleCallDiscribe = e => {
    this.setState({ Calldiscription: e.target.value })
  }

  //call Upload

  // handleChangeUsername = (event) => this.setState({username: event.target.value});

  callhandleUploadStart = () =>
    this.setState({ isUploadingCall: true, Callprogress: 0 })

  handleProgress = Callprogress => this.setState({ Callprogress })

  callhandleUploadError = error => {
    this.setState({ isUploadingCall: false })
    console.error(error)
  }

  callhandleUploadSuccess = filename => {
    this.setState({
      calluploadedfileName: filename,
      Callprogress: 100,
      isUploadingCall: false
    })

    call_fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.callImageData.push(url)
        this.setState({ calluploadedfileurl: url })
      })

    if (this.state.Callprogress == 100) {
      this.setState({ Callprogress: 0 })
    }
  }

  handleTypeOfVisit = () => {
    this.setState({ isOpenVistType: true })
  }

  handleVisitType = e => {
    this.setState({ visit_Name: e.target.value })
  }

  handleTypeOfCallVisit = () => {
    this.setState({ isOpenCallType: true })
  }

  handeleCallType = e => {
    this.setState({ call_type: e.target.value })
  }

  handleTypeOfCallMeeting = () => {
    this.setState({ isOpenMeetingType: true })
  }

  handleMeetingType = e => {
    this.setState({ meeting_type: e.target.value })
  }

  //visit Date & Time

  handleFromDate = date => {
    this.setState({ FromDate: date })
    console.log("Date Current ", date.format("DD/MM/YYYY"))
  }
  handleFromTime = time => {
    this.setState({ time: time.format("HH:MM:SS") })
    console.log("Time Current ", time.format("HH:MM:SS"))
  }

  handleTodate = date => {
    this.setState({ ToDate: date })
  }

  handleToTime = time => {
    this.setState({ Totime: time })
  }

  handleCallTime = calltime => {
    this.setState({ Calltime: calltime })
  }

  handleMeetingTime = meetingTime => {
    this.setState({ Meetingtime: meetingTime })
  }

  handleAsset = e => {
    let aname = e.target.value
    let aid
    this.state.AssetData.map(i => {
      if (i.name == aname) {
        aid = i.id
      }
    })
    this.listGroup(aid)
    this.setState({ SelectedAsset: aname })
  }

  // handlepurposeReport = e => {
  //   this.setState({ purposeReport: e.target.value })
  // }

  handleGroup = e => {
    let gid = e.target.value
    console.log("gid", gid)

    this.state.groupData.filter(i => {
      if (i.id == gid) {
        this.setState({ GrupName: i.name })
      }
    })

    this.listSubGroup(gid)
    this.setState({ grpid: gid })
  }

  handleSubgrpID = e => {
    let sgid = e.target.value
    this.setState({ sgrpid: sgid })

    // this.state.subGroupData.map(i=>{
    //   if(i.id == sgid){
    //     this.setState({subGrpName})
    //   }
    // })
  }

  //visit modal

  handlevisitFromDate = date => {
    this.setState({ FromDate: date })
  }

  handlevisitToDate = date => {
    this.setState({ ToDate: date })
  }

  handleVisittype = e => {
    let vtype = e.target.value
    this.setState({ vtype: vtype })
  }

  close = () => {
    this.setState({
      open: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
      open8: false,
      open9: false,
      open10: false,
      open11: false,
      open12: false,
      open13: false,
      open14: false
    })
  }

  handleMeetingTypeName = e => {
    this.setState({ meetingTypeName: e.target.value })
  }

  addMeetingType = () => {
    if (!this.state.meetingTypeName) {
      this.setState({ smsg: "Please Enter Meeting Type" })
    } else {
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
            this.setState({ mtmsg: data.message })
            setTimeout(() => {
              this.listmeetingType()
              this.setState({
                meetingTypeModal: false,
                mtmsg: "",
                meetingTypeName: ""
              })
            }, 1000)
          } else {
            this.setState({ mtmsg: "Something went wrong !!!!!!!" })
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleVisitTypeName = e => {
    this.setState({ visitTypeName: e.target.value })
  }

  addVisitType = () => {
    if (!this.state.visitTypeName) {
      this.setState({ smsg: "Please Enter visit Type Name" })
    } else {
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
            this.setState({ vmsg: data.message })
            setTimeout(() => {
              this.listVisitType()
              this.setState({
                visitTypeModal: false,
                vmsg: "",
                visitTypeName: ""
              })
            }, 1000)
          } else {
            this.setState({ cmsg: "Something went wrong !!!!!!!" })
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleCallTypeName = e => {
    this.setState({ callTypeName: e.target.value })
  }

  addCallType = () => {
    if (!this.state.callTypeName) {
      this.setState({ smsg: "Please Enter call Type Name" })
    } else {
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
            this.setState({ cmsg: data.message })
            setTimeout(() => {
              this.listcallType()
              this.setState({
                callTypeModal: false,
                cmsg: "",
                callTypeName: ""
              })
            }, 1000)
          } else {
            this.setState({ cmsg: "Something went wrong !!!!!!!" })
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleCallModal = () => {
    this.setState({ callTypeModal: true })
  }

  handleSelectCallId = e => {
    let cid = e.target.value
    this.setState({ calltypeid: cid })
  }

  handleVisitModal = () => {
    this.setState({ visitTypeModal: true })
  }

  handleVisiTypeId = e => {
    let vid = e.target.value
    this.setState({ vsittypeId: vid })
  }

  handleMeetingModal = () => {
    this.setState({ meetingTypeModal: true })
  }

  handleSelectMeetingId = e => {
    let mid = e.target.value
    this.setState({ meetingtypeId: mid })
  }





  handleUploadStartReport = () => this.setState({ isUploadingReport: true, reportProgress: 0 })
  handleProgressReport = reportProgress => this.setState({ reportProgress })
  handleUploadErrorReport = error => {
    this.setState({ isUploadingReport: false })
    console.error(error)
  }
  handleUploadSuccessReport = filename => {
    console.log("File Name is", filename)
    this.state.reportsUploadedfileName.push(filename)
  
    this.setState({ reportProgress: 100, isUploadingReport: false })
    tixyReport_fbs.child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ uploadedfileurl: url, msg1: "" })
        this.state.reportsUploadedFile.push(url)
        this.state.reportsDataList.push({"name":filename,"link":url})
        //this.state.reportsDataList.push({"link":url})
        console.log("reportsDataList",this.state.reportsDataList)
      })

    setTimeout(() => {
      if (this.state.reportProgress == 100) {
        this.setState({ filename: "", reportProgress: 0 })
     
      } else {
        console.log("error in upload")
      }
    }, 10000)
  }


  downloadDocument = i => {
    // for(let i=0;i<this.state.uploadedFile.length;i++){

    console.log("file arr", this.state.reportsUploadedfileName)
    console.log("file arr", this.state.reportsUploadedFile)

    var a = this.state.reportsUploadedfileName.indexOf(i)

    let downloadUrl = this.state.reportsUploadedFile[a]

    console.log("download url is", downloadUrl)

    window.open(downloadUrl)
  }


  deleteDocument = i => {
    let a = this.state.reportsUploadedfileName.indexOf(i)
    if (a > -1) {
      this.state.reportsUploadedfileName.splice(a, 1)
    }

    this.setState({ reportsUploadedfileName: this.state.reportsUploadedfileName })
    console.log("after delete", this.state.a)
    console.log("after delete assignedRole", this.state.reportsUploadedfileName)
    console.log("now fname array is", this.state.reportsUploadedfileName)
    // }else if(this.state.isChecked == false) {
    //     console.log("Not Selected")
    // }
  }


  // addReport = () => {
  //   let curDate = moment()
  //   fetch('http://35.161.99.113:9000/webapi/t_ticket/t_addReportLink', {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //     //  folderId: this.state.fid,
  //       name: this.state.reportsUploadedfileName,
  //       link: this.state.reportsUploadedFile,
  //       //date: moment(curDate).format("DD-MM-YYYY")
  //     })
  //   })
  //     .then(data => {
  //       return data.json()
  //     })
  //     .then(data => {
  //       console.log("data", data)
  //       console.log("data", data.records)
  //       if (data.message == "Files Added") {
  //         this.setState({ Smsg: "Files Added", isSucess: true })
  //       } else {
  //         this.setState({ msg: "Something went wrong", isopen: true })
  //       }
        
  //       // this.state.fid = data.records.insertId
  //     })
  // }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }
    let {
      lastAction,
      Name,
      Phno,
      address,
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
      isopen,
      ProductData,
      action,
      AssetData,
      ClosedDate,
      vname,
      isOpenVeritcal,
      ImageData,
      fromDate,
      ToDate,
      Vertical,
      isHOD,
      isCall,
      isMeeting,
      isVisit,
      visit,
      // exOutCome,
      // actualOutcome,
      travel,
      handleiVsitAmount,
      vamount,
      checked,
      SelectedProduct,
      SelectedAsset,
      time,
      format,
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
      visit_Name,
      call_type,
      meeting_type,
      isOpenVistType,
      isOpenCallType,
      isOpenMeetingType,
      Calltime,
      Meetingtime,
      verticalData,
      btndisable,
      isSucess,
      // purposeReport,
      groupData,
      subGroupData,
      grpid,
      sgrpid,
      vtype,

      callTypeData,
      visitTypeData,
      meetingTypeData,
      calltypeid,
      size12,
      visitTypeid,
      meetingTypeid,
      size13,
      size14,
      reportsUploadedfileName
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

    //     let message = "Dear Sir,"+" "+"Ticket Number"+" "+this.state.Tno+" No action has been taken. Please look in to this on Priority."

    //     let msgurl = "http://bhashsms.com/api/sendmsg.php?"+'user=TEAM_MHOURZ&pass=MECHATRON&text='+message+'&sender=MHOURZ&phone=8793360589priority=ndnd&stype=normal'
    // console.log('url', msgurl);
    // fetch({ url: msgurl,
    //   method: "POST", // <--Very important!!!
    //     json: true, // <--Very important!!!
    //   });


    return (
      <div>
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Tixy">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Add Tixy</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded className="icon_name" style={{ height: "100%" }}>
                <Form.Field
                  style={{ fontSize: "16px", fontWeight: "bold" }}  //Aishwarya
                  className="labelcolor"
                  label="Company Name"
                  required
                />
                <hr />
                <div style={{ width: 400 }}>
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                    aligned="right"
                  />
                </div>

                <br />

                <Form>
                  {/*<Form.Group widths={1}> */}
                  <Form.Group widths={2}
                    style={{ fontSize: "16px" }}>   {/*Aishwarya*/}
                    <Form.Input
                      label="Company Name"
                      placeholder="Company Name"
                      value={Name}
                      onChange={this.handleName}
                      required
                    />
                  </Form.Group>

                  {/*<Form.Group widths={1}> */}
                  <Form.Group widths={2} style={{ fontSize: "16px" }}> {/*Aishwarya*/}
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

                  {/*<Form.Group widths={1}> */}
                  <Form.Group widths={2} style={{ fontSize: "16px" }}>   {/*Aishwarya*/}
                    <Form.Input
                      label="Email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleEmail}
                    />
                  </Form.Group>

                  {/*<Form.Group widths={1}> */}
                  <Form.Group widths={2} style={{ fontSize: "16px" }}>   {/*Aishwarya*/}
                    <Form.Field>
                      <label className="labelcolor">Address : </label>
                      <PlacesAutocomplete inputProps={inputProps} />

                      <p>
                        <font color="red">{this.state.Clientmsg}</font>
                      </p>
                    </Form.Field>
                  </Form.Group>

                  <Button
                    disabled={active}
                    onClick={() => this.handleUser()}
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Add Client
                  </Button>
                  <font color="red">{this.state.msg}</font>
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <Form>
                  <div>
                    <Form.Field
                      style={{ fontSize: "16px " }}       //Aishwarya
                      label="Vertical" required />
                    {/*<div style={{ display: "flex" }}>*/}
                    <div style={{ width: "290px", height: "32px" }}>        {/*Aishwarya*/}
                      <div style={{ flex: 1, marginRight: 12 }}>
                        <select value={Vertical} onChange={this.handleVertical}>
                          <option value="" disabled selected hidden>
                            Select Vertical
                          </option>
                          {verticalData.map(i => (
                            <option value={i.vertical} key={i.id}>
                              {i.vertical}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <br />
                    <Form.Field
                      style={{ fontSize: "16px" }}      //Aishwarya
                      label="Asset" />
                    {/*<div style={{ display: "flex" }}>*/}
                    <div style={{ width: "290px", height: "32px" }}>        {/*Aishwarya*/}
                      <div style={{ flex: 1, marginRight: 12 }}>      {/*Aishwarya*/}
                        <select
                          value={this.state.SelectedAsset}
                          onChange={this.handleAsset}
                        >
                          <option value="" disabled selected hidden>
                            Select Asset
                      </option>
                          {AssetData.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <br />

                  <Form.Field
                    style={{ fontSize: "16px" }}      //Aishwarya  
                    label="Group" />
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, marginRight: 12 }}>
                      <label>{this.state.groupName}</label>
                      {/* <select value={grpid} onChange={this.handleGroup}>

                  <option value="" disabled selected hidden>
                                  Select group
                  </option>
                    {groupData.map(i=>(

                    <option value={i.id} key={i.id}>{i.name}</option>
                    ))}
                  
                    </select>

                    */}
                    </div>
                  </div>
                  <br />

                  <Form.Field
                    style={{ fontSize: "16px" }}      //Aishwarya
                    label="SubGroup" />
                  <div style={{ display: "flex" }}>
                    <label>{this.state.subGroupName}</label>

                    {/* <div style={{ flex: 1, marginRight: 12 }}>
                                    
                <select value={sgrpid} onChange={this.handleSubgrpID}>

                  <option value="" disabled selected hidden>
                                  Select Sub Group
                  </option>
                    {subGroupData.map(i=>(

                    <option value={i.name} key={i.id}>{i.name}</option>
                    ))}
                  
                    </select>
                    </div> */}
                  </div>
                </Form>
                <br />
                <label
                  style={{
                    fontSize: "16px", fontWeight: "bold"      //Aishwarya
                  }}
                >Description</label>

                <hr />

                <Form>
                  <TextArea
                    placeholder="Tell us more"
                    value={discription}
                    onChange={this.handleDiscribe}
                    rows={17}
                  />
                </Form>
                <br />

                <Form />
              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}      //Aishwarya 17/5/19
                >Image</label>
                <hr />

                <RawCarousel
                  imageData={
                    (ImageData && ImageData.length >= 0 && ImageData) || []
                  }
                />

                <br />
                <Progress percent={this.state.progress} active color="green" />

                <div>
                  <form>
                    {this.state.isUploading && (
                      <p>Progress: {this.state.progress}</p>
                    )}
                    <FileUploader
                      accept="image/*"
                      name="avatar"
                      multiple
                      storageRef={tixy_fbs}
                      onUploadStart={this.handleUploadStartTixy}
                      onUploadError={this.handleUploadErrorTixy}
                      onUploadSuccess={this.handleUploadSuccessTixy}
                      onProgress={this.handleProgress1Tixy}
                    />
                  </form>
                </div>
              </Segment>
            </TixyContent>
          </ContentArea>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff", fontSize: "16px" }}            //Aishwarya
              onClick={() => this.handleSubmit()}
              disabled={btndisable}
            >
              Add Tixy
            </Button>
          </ContentArea>
          <ContentArea>
            <TixyContent>
              <Segment padded>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}      //Aishwarya 17/5/19
                >Complaint Resolution Details</label>
                <br />
                <br />
                <div>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                    className="dv-star-rating-input"
                  />
                </div>
                <hr />

                <hr />

                <Form>
                  <Form.Field
                    style={{ fontSize: "16px" }}      //Aishwarya  
                    label="Assign Employee" />
                  <div style={{ width: 400 }}>
                    <Search
                      style={{ marginLeft: "10px" }}
                      loading={isLoadingAssign}
                      onResultSelect={this.handleResultSelectAssign}
                      onSearchChange={this.handleSearchChangeAssign}
                      results={resultsAssign}
                      value={valueAssign}
                      resultRenderer={resultRendererAssign}
                      aligned="right"
                    />
                    <hr style={{ display: this.state.toggleClosedDate }} />
                  </div>

                  {/*
                  {isHOD && <label>HOD :- "Demo"</label>}

  */}
                  {/*<div style={{ display: "flex" }}>*/}             {/*Aishwarya*/}
                  <div style={{ marginRight: 12, display: this.state.toggleClosedDate }}>

                    <Form.Field style={{ fontSize: "16px" }} label="Closed Date" />
                  </div>
                  <div style={{ margin: "10px", display: this.state.toggleClosedDate }}>                {/*Aishwarya*/}
                    <DatePicker
                      selected={this.state.ClosedDate}
                      onChange={this.handleCloseDate}
                      onFocus={e => e.target.blur()}
                      dateFormat="DD-MM-YYYY"
                      minDate={this.state.minClosedDate}
                      showYearDropdown
                      dateFormatCalendar="MMMM"
                      scrollableYearDropdown
                      yearDropdownItemNumber={15}
                    />
                  </div>
                  {/*</div>*/}
                  <hr />

                  <br />

                  {/*<label
                    style={{ fontSize: "16px" }}      
                  >Solution Details</label>*/}
                  <Form.Field style={{ fontSize: "16px" }} label="Solution Details" />        {/*Aishwarya 17/5/19*/}
                  <TextArea
                    style={{ margin: "10px" }}          //Aishwarya
                    placeholder="Tell us more"
                    value={Solvediscription}
                    onChange={this.handleSolveDiscribe}
                    rows={3}
                  />
                </Form>

                <hr />

                {/*<label
                  style={{ fontSize: "16px" }}      
                >Action</label>*/}
                <Form.Field style={{ fontSize: "16px", fontWeight: "bold" }} label="Action" />        {/*Aishwarya 17/5/19*/}
                {/* {!Solvediscription && (
                  <p>Please Enter Description Then You Can Do Action</p>
                )}

                {Solvediscription && ( */}
                <center
                  style={{ fontSize: "16px" }}      //Aishwarya
                >
                  <br />
                  <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: 12 }}>
                      <input
                        style={{ width: '18px', height: '18px' }}
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="call"
                        onChange={this.handleMachnie}
                      />
                      &nbsp;&nbsp;
                      <label htmlFor="radio1">Call</label>
                    </div>
                    <div style={{ marginLeft: 12 }}>
                      <input
                        style={{ width: '18px', height: '18px' }}
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="visit"
                        onChange={this.handleMachnie}
                      />
                      &nbsp;&nbsp;
                      <label htmlFor="radio2">Visit</label>
                    </div>
                    {/* <div style={{ marginLeft: 12 }}>
                      <input
                        style={{width:'18px',height:'18px'}}
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="meeting"
                        onChange={this.handleMachnie}
                      />
                       &nbsp;&nbsp;
                      <label htmlFor="radio2">Meeting</label>
                    </div> */}
                  </div>
                </center>
                {/* )} */}

                <hr />

                <Form
                  style={{ fontSize: "16px" }}      //Aishwarya
                >
                  {/* <label >Select Ticket Status -</label>*/}
                  <Form.Field style={{ fontSize: "16px" }} label="Select Ticket Status" />        {/*Aishwarya 17/5/19*/}
                  <Form.Field style={{ fontSize: "18px" }} label={status} />
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
                          Reject
                        </Button>
                      }
                      size="huge"
                      style={{ fontSize: '16px' }}
                      content={`Status Changed to Rejected`}
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
                          Hold
                        </Button>

                      }
                      size="huge"
                      style={{ fontSize: '16px' }}
                      content={`Status Changed to Hold`}
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
                          Closed
                        </Button>
                      }
                      size="huge"
                      style={{ fontSize: '16px' }}
                      content={this.state.closedmsg}
                      on="click"
                      open={this.state.isOpenClose}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenClose}
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
                          onClick={() => this.handleProgresStatus()}
                        >
                          Progress
                        </Button>
                      }
                      size="huge"
                      style={{ fontSize: '16px' }}
                      content={`Status Changed to Under Progress`}
                      on="click"
                      //   open={this.state.isOpenClose}
                      //   onClose={this.handleClose}
                      // onOpen={this.handleOpenClose}
                      open={this.state.isProgressClose}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenProgress}

                      position="top right"
                    />
                  </TableContent>
                </Form>

                <br />
                {/* 
                <Form>
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Prepare & upload report"
                      placeholder="Prepare & upload report"
                      value={purposeReport}
                      onChange={this.handlepurposeReport}
                    />
                  </Form.Group>
                </Form> */}
                {/*
 <center>
 <Button style={{ backgroundColor: "#863577",color: "#ffffff" }}><Icon name="cloud upload" size="large" className="icon_size" />Smart Upload</Button>
 </center>
*/}


 

<label style={{ fontWeight: "bold" }} className="labelcolor">Report Upload</label>  
                  <hr />
                  <Form>
                    <FileUploader
                      accept="*"
                      name="avatar"
                      multiple
                      storageRef={tixyReport_fbs}
                      onUploadStart={this.handleUploadStartReport}
                      onUploadError={this.handleUploadErrorReport}
                      onUploadSuccess={this.handleUploadSuccessReport}
                      onProgress={this.handleProgressReport}
                    />
                   <br />
                    <Progress
                      percent={this.state.reportProgress}
                      active
                      color="green"
                    />
                    <br />
                    {this.state.reportsUploadedfileName.map(i => (
                      <Segment>
                        <Button
                          color="purple"
                          style={{
                            backgroundColor: "#863577",
                            color: "#ffffff"
                          }}
                        >
                          {i}
                        </Button>

                        <br />
                        <Icon
                          size="large"
                          name="close"
                          onClick={() => this.deleteDocument(i)}
                        />

                        <Icon
                          size="large"
                          name="cloud download"
                          onClick={() => this.downloadDocument(i)}
                        />
                      </Segment>
                    ))}{" "}
                    <br />
                    <center>
                      <font color="red">{this.state.msg1}</font>
                    </center>
                    {/* <Button
                      onClick={() => this.addReport()}
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                    >
                      Save Report
                    </Button>
                    {this.state.redirectToTeam && <Redirect to="/MyTeam" />} */}
                  </Form>
              </Segment>
            </TixyContent>
          </ContentArea>
          <p style={{ marginRight: "2%", textAlign: "right" }}>
            <font color="red">{this.state.msg1}</font>
          </p>

          {/* <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff", fontSize: "16px" }}            //Aishwarya
              onClick={() => this.handleSubmit()}
              disabled={btndisable}
            >
              Add Tixy
            </Button>
          </ContentArea> */}
        </PageContainer2>

        {this.state.redirectToTixy && <Redirect to="/Tixy" push />}

        {isopen == true ? (
          <ErrorModal
            isopen={this.state.isopen}
            msg={this.state.errorMsg}
            onClose={this.handleClose}
          />
        ) : (
            <div />
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
          style={{ fontSize: "16px" }}    //Aishwarya  
          open={isCall}
          className="alertOfFileds"
          style={{ marginTop: "2em" }}
          closeIcon
          onClose={this.handleClose}
        >
          <Modal.Header>
            <label className="labelcolor" style={{ width: "5em" }}>
              <b>Action Type - Call </b>
            </label>
          </Modal.Header>

          <Modal.Content>
            <div>
              <Form
                style={{ fontSize: "16px" }}    //Aishwarya  
              >
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column>
                      <label className="labelcolor" style={{ width: "5em" }}>
                        <b>From Date</b>
                      </label>
                      <br />
                      <br />

                      <DatePicker
                        selected={this.state.CallDate}
                        onChange={this.handleCalldate}
                        onFocus={e => e.target.blur()}
                        showYearDropdown
                        dateFormat="DD-MM-YYYY"
                        style={{ width: "9em" }}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label>
                        <b>Time</b>
                      </label>
                      <br />
                      <br />
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

              <br />

              <Form widths="equal"
                style={{ fontSize: "16px" }}    //Aishwarya  
              >
                <label className="labelcolor" style={{ width: "5em" }}>
                  Type of Call :-
                </label>
                <br />
                <br />
                <select
                  style={{ width: "290px", height: "40px" }}                //Aishwarya 17/5/19
                  value={calltypeid} onChange={this.handleSelectCallId}>
                  <option value="" disabled selected hidden>
                    Type Of Call
                  </option>
                  {callTypeData.map(i => (
                    <option value={i.name} key={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
                <br />

                <br />
                <Form
                  style={{ fontSize: "16px" }}    //Aishwarya  
                >
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Call Expected Outcome"
                      placeholder="Call Expected Outcome"
                      type="text"
                      value={CallexOutCome}
                      onChange={this.handleCallExoutCome}
                      required
                    />

                    <Form.Input
                      label="Call actual outcome"
                      placeholder="Call actual outcome"
                      type="text"
                      value={CallactualOutcome}
                      onChange={this.handleCallAoutCome}
                      required
                    />
                  </Form.Group>

                  <label className="labelcolor">
                    <b>Call Description </b>
                  </label>
                  <br />
                  <br />
                  <TextArea
                    placeholder="Tell us more"
                    value={Calldiscription}
                    onChange={this.handleCallDiscribe}
                    rows={10}
                  />
                </Form>
                <br />

                <Button
                  style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  onClick={() => this.handleClose()}
                >
                  Add Call
                </Button>
              </Form>
            </div>
          </Modal.Content>
        </Modal>

        <Modal
          open={isMeeting}
          className="alertOfFileds"
          style={{ marginTop: "2em" }}
          closeIcon
          onClose={this.handleClose}
        >
          <Modal.Header>
            <label className="labelcolor" style={{ width: "5em" }}>
              <b>Action Type - Meeting</b>
            </label>
          </Modal.Header>

          <Modal.Content>
            <div>
              <Form
                style={{ fontSize: "16px" }}    //Aishwarya  
              >
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field label="From Date" />
                      <DatePicker
                        selected={this.state.MDate}
                        onChange={this.handleMdate}
                        onFocus={e => e.target.blur()}
                        showYearDropdown
                        dateFormat="DD-MM-YYYY"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field label="Time" />
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

              <Form widths="equal"
                style={{ fontSize: "16px" }}    //Aishwarya  
              >
                <hr />

                <label className="labelcolor" style={{ width: "5em" }}>
                  <b>Type of Meeting </b>
                </label>
                <br />
                <br />
                <select
                  value={meetingTypeid}
                  onChange={this.handleSelectMeetingId}
                >
                  <option value="" disabled selected hidden>
                    Type Of Meeting
                  </option>
                  {meetingTypeData.map(i => (
                    <option value={i.name} key={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
                <br />

                <hr />
                <Form
                  style={{ fontSize: "16px" }}    //Aishwarya  
                >
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Meeting Expected Outcome"
                      placeholder="Visit Expected Outcome"
                      type="text"
                      value={MexOutCome}
                      onChange={this.handleMExoutCome}
                      required
                    />

                    <Form.Input
                      label="Meeting actual outcome"
                      placeholder="Visit actual outcome"
                      type="text"
                      value={MactualOutcome}
                      onChange={this.handleMoutCome}
                      required
                    />
                  </Form.Group>

                  <label className="labelcolor">
                    <b>Meeting Description </b>
                  </label>
                  <br />
                  <br />
                  <TextArea
                    placeholder="Tell us more"
                    value={Mdiscription}
                    onChange={this.handleMdiscribe}
                    rows={10}
                  />
                </Form>
                <br />

                <Button
                  style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  onClick={() => this.handleClose()}
                >
                  Add Meeting
                </Button>
              </Form>
            </div>
          </Modal.Content>
        </Modal>

        <Modal
          open={isVisit}
          className="alertOfFileds"
          style={{ marginTop: "2em" }}
          closeIcon
          onClose={this.handleClose}
        >
          <Modal.Header>
            <label className="labelcolor" style={{ width: "5em" }}>
              <b>Action Type - Visit</b>
            </label>
            <hr />
          </Modal.Header>

          <Modal.Content>
            <div>
              <Form
                style={{ fontSize: "16px" }}    //Aishwarya  
              >
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field label="From Date" />
                      <DatePicker
                        selected={this.state.FromDate}
                        onChange={this.handlevisitFromDate}
                        onFocus={e => e.target.blur()}
                        dateFormat="DD-MM-YYYY"
                      />
                      <br />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field label="To Date" />
                      <DatePicker
                        selected={this.state.ToDate}
                        onChange={this.handlevisitToDate}
                        onFocus={e => e.target.blur()}
                        dateFormat="DD-MM-YYYY"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field label="From Time" />
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
                      <Form.Field label="To Time" />
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
              <br />
              <Form
                widths="equal" style={{ fontSize: "16px" }}    //Aishwarya  
              >
                <div>
                  <label>
                    <b>Type Of Visit </b>
                  </label>
                  <br />
                  <select
                    style={{ width: "290px", height: "40px" }}                //Aishwarya 17/5/19  
                    value={visitTypeid} onChange={this.handleVisiTypeId}>
                    <option value="" disabled selected hidden>
                      Type Of Visit
                  </option>
                    {visitTypeData.map(i => (
                      <option value={i.name} key={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <br />

                  <Form
                    style={{ fontSize: "16px" }}    //Aishwarya  
                  >
                    <Form.Field label="Visit Description" />
                    <Form.Group widths="equal">
                      <br />
                      <TextArea
                        placeholder="Tell us more"
                        value={discription}
                        onChange={this.handleDiscribe}
                        rows={6}
                      />
                    </Form.Group>

                    {/* <Form.Group widths="equal">
                    <Form.Input
                      label="Visit Expected Outcome"
                      placeholder="Visit Expected Outcome"
                      type="text"
                      value={exOutCome}
                      onChange={this.handleExoutCome}
                      required
                    />

                    <Form.Input
                      label="Visit actual outcome"
                      placeholder="Visit actual outcome"
                      type="text"
                      value={actualOutcome}
                      onChange={this.handleAoutCome}
                      required
                    />
                  </Form.Group> */}

                    <Form.Group widths="equal">
                      <Form.Input
                        label="Km`s  Travlled"
                        placeholder="Km`s  Travlled"
                        type="text"
                        value={travel}
                        onChange={this.handleTravel}
                      //required
                      />

                      <Form.Input
                        label="Visit Amount"
                        placeholder="Visit Amount"
                        type="text"
                        value={vamount}
                        onChange={this.handleiVsitAmount}
                      //required
                      />
                    </Form.Group>
                  </Form>

                  <br />
                </div>

                <Button
                  style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  onClick={() => this.handleClose()}
                >
                  Add Visit
              </Button>
              </Form>
            </div>
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

const btnColor = {
  backgroundColor: "#863577",
  color: "white"
}

export default AddTixy
