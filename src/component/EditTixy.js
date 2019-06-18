
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
import moment from "moment"
import ErrorModal from "./ErrorModal"
import SuccessModal from "./SuccessModal"
import Carousel from "nuka-carousel"
import SmartUpload from "../component/SmartUpload"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { tixy_fbs } from "../component/base"
import MediaQuery from "react-responsive"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Lead_fbs, visit_fbs, meeting_fbs, call_fbs } from "../component/base"
import "rc-time-picker/assets/index.css"
import TimePicker from "rc-time-picker"
import {
  verticallist,
  addVertical,
  grouplist,
  grpBasedsubgrp,
  verticalBasedgrp,
  callTypelist,
  addcallType,
  deleteCallType,
  visitTypeList,
  addvisitTypeadd,
  deleteVisitType,
  meetingTypeList,
  addMeetingType,
  deleteMeeting,
  callAction,
  meetingAction,
  visitAction,
  tixy_Action,
  tixy_Edit_action,
  verticalAsset,
  assetGrp,
  verticalService
} from "./Api"
import StarRatingComponent from "react-star-rating-component"

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

import RawCarousel from "./RawCarousel"


import { tixyReport_fbs } from "../component/base"


class EditTixy extends Component {
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
    isProgressClose: false,
    AssignedUser: [],
    email: "",
    startDate: moment(),
    isopen: false,
    ProductData: [],
    AssetData: [],
    ImageData: [],
    companyid: "",
    assigneId: "",
    Status1: "",
    Vertical: "",
    isHOD: false,
    ClosedDate: moment(),
    lastActionDate: moment(),
    vname: "",
    isOpenVeritcal: false,
    action: "",
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
    verticalData: [],
    SelectedAsset: "",
    assignname: "",
    btndisable: false,
    isSucess: false,
    ImageData1: [],
    groupData: [],
    subGroupData: [],
    grpid: "",
    sgrpid: "",
    GrupName: "",
    Tno: 0,
    VerticalName: "",
    cid: "",

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

    callActionData: [],
    visitActionData: [],
    meetingActionData: [],
    aname: "",
    actionCallId: "",
    action_meetingId: "",
    action_visitId: "",

    isCallData: false,
    isVisit: false,
    isMeeting: false,
    description: "",
    selectedCall: "",
    selectedVisit: "",
    selectedMeeting: "",
    groupName: "",
    subGroupName: "",
    verticalServiceHodData: [],
    verticalHodName: "",
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
      .then(async data => {
        console.log("data", data)
        console.log("vertical list", data.records)
        if (data.records) {
          await this.setState({ verticalData: data.records })

          //  console.log('this.state.VerticalName', this.state.VerticalName);
          this.setState({ Vertical: this.state.VerticalName })
          let vid
          data.records.map(i => {
            if (i.vertical == this.state.VerticalName) {
              vid = i.id
            }
          })
          this.listAsset(this.state.VerticalName)

          switch (this.state.VerticalName) {
            case "Thermax":
              let thod = this.state.VerticalName + " " + "Service-HOD"
              console.log("thod", thod)

              this.verticalHod(thod)
              break

            case "Atlas Copco":
              let splitString = this.state.VerticalName.substring(0, 5)
              console.log("splitString Atlas", splitString)
              let finalString = splitString + " " + "Service-HOD"
              console.log("finalString Atlas", finalString)
              this.verticalHod(finalString)

              break

            case "Buhler":
              let bsplitString = this.state.VerticalName.substring(0, 6)
              console.log("splitString Buhler", bsplitString)
              let bfinalString = bsplitString + " " + "Service-HOD"
              console.log("finalString Buhler", bfinalString)
              this.verticalHod(bfinalString)

              break

            default:
              break
          }
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

  Tixy_Image = id => {
    fetch("http://35.161.99.113:9000/webapi/t_ticket/t_getLink", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        if (data.records == []) {
          this.setState({ ImageData: [] })
          console.log("No Images is available")
        } else {
          console.log("Tixy images Data", data.records)
          this.setState({ ImageData: data.records })
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
      .then(async data => {
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
          // this.setState({ groupName: '',
          //   subGroupName:''
          // })
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

  actionCalldata = id => {
    fetch(callAction, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(async data => {
        console.log("data", data)
        console.log("call  List ", data.records)
        if (data.records) {
          let actionEdit = data.records
          await this.setState({
            cid: actionEdit[0].clientId,
            CallexOutCome: actionEdit[0].callExpected_Outcome,
            CallactualOutcome: actionEdit[0].callActual_Outcome,
            Calldiscription: actionEdit[0].call_Description,
            CallDate: moment(actionEdit[0].fromDate, "DD-MM-YYYY"),
            Calltime: moment(actionEdit[0].from_time, "hh:mm:ss"),
            calltypeid: actionEdit[0].typeOfCall,
            ticketid: actionEdit[0].ticket_id,
            leadid: actionEdit[0].lead_id,
            aid: actionEdit[0].AssignId,
            actionId: actionEdit[0].action_id,
            actionCallId: actionEdit[0].id,

            isCallData: true,
            selectedCall: "call"
          })
          //  this.setState({callActionData:data.records})
        } else {
          this.setState({
            callActionData: [],
            isCallData: false,
            selectedCall: ""
          })
        }
      })
  }

  actionVisitdata = id => {
    fetch(visitAction, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(async data => {
        console.log("data", data)
        console.log("visit action List ", data.records)
        if (data.records) {
          let actionEdit = data.records
          console.log("actionEdit in visit", actionEdit[0].visit_description)
          await this.setState({
            action_visitId: actionEdit[0].id,
            visitActionData: data.records,
            cid: actionEdit[0].clientId,
            visitId: actionEdit[0].visitId,
            // exOutCome: actionEdit[0].visit_Expected_outcome,
            // actualOutcome: actionEdit[0].visit_Actual_outCome,
            vamount: actionEdit[0].visit_amount,
            discription: actionEdit[0].visit_description,
            FromDate: moment(actionEdit[0].from_date, "DD-MM-YYYY"),
            ToDate: moment(actionEdit[0].to_date, "DD-MM-YYYY"),
            Fromtime: moment(actionEdit[0].from_Time, "hh:mm:ss"),
            Totime: moment(actionEdit[0].to_Time, "hh:mm:ss"),
            vsittypeId: actionEdit[0].type_of_visit,
            valueTixy: actionEdit[0].ticket_id,
            valueLead: actionEdit[0].lead_id,
            ticketid: actionEdit[0].ticket_id,
            leadid: actionEdit[0].lead_id,
            aid: actionEdit[0].AssignId,
            actionId: actionEdit[0].action_id,
            travel: actionEdit[0].Km_Travelled,
            isVisitData: true,
            selectedVisit: "visit"
          })
        } else {
          this.setState({
            visitActionData: [],
            isVisitData: false,
            selectedVisit: ""
          })
        }
      })
  }

  // actionMeetingdata = id => {
  //   fetch(meetingAction, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       tid: id
  //     })
  //   })
  //     .then(data => {
  //       return data.json()
  //     })
  //     .then(data => {
  //       console.log("data", data)
  //       console.log("meeting action List ", data.records)
  //       if (data.records) {
  //         this.setState({ meetingActionData: data.records })
  //         let actionEdit = data.records
  //         this.setState({
  //           cid: actionEdit[0].clientId,
  //           meetingId: actionEdit[0].meetingId,
  //           MexOutCome: actionEdit[0].meeting_expected_outcome,
  //           MactualOutcome: actionEdit[0].meeting_actual_outcome,
  //           Mdiscription: actionEdit[0].description,
  //           MDate: moment(actionEdit[0].date, "DD-MM-YYYY"),
  //           Meetingtime: moment(actionEdit[0].Time, "hh:mm:ss"),
  //           meetingtypeId: actionEdit[0].type_of_meeting,
  //           valueTixy: actionEdit[0].ticket_id,
  //           valueLead: actionEdit[0].Lead_id,
  //           ticketid: actionEdit[0].ticket_id,
  //           leadid: actionEdit[0].Lead_id,
  //           aid: actionEdit[0].AssignId,
  //           actionId: actionEdit[0].action_id,
  //           action_meetingId: actionEdit[0].id,
  //           isMeetingData: true,
  //           selectedMeeting: "meeting"
  //         })
  //       } else {
  //         this.setState({
  //           meetingActionData: [],
  //           isMeetingData: false,
  //           selectedMeeting: ""
  //         })
  //       }
  //     })
  // }

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
    if (JSON.parse(sessionStorage.getItem("editTicket") === null)) {
      console.log("Nodata")
    } else {
      // if (JSON.parse(sessionStorage.getItem("Tixy_Image") === null)) {
      //     console.log("Nodata")
      // }else{
      // let TixyImg = JSON.parse(sessionStorage.getItem("Tixy_Image"))
      //     console.log("Image of product",TixyImg)
      //     this.setState({ImageData:TixyImg})
      // }

      let user = JSON.parse(sessionStorage.getItem("editTicket"))

      this.FilesData(user.id)
      let ceoDetails = await JSON.parse(sessionStorage.getItem("ceoDetails"))
      console.log('ceoDetails', ceoDetails);


      this.state.userrole = JSON.parse(sessionStorage.getItem("Role"))
      let str = JSON.stringify(this.state.userrole)


      for (var i = 0; i < this.state.userrole.length; i++) {

        var trimmedRole = this.state.userrole[i].role.replace(/\s+/g, '')

        if (trimmedRole == "AtlasSales-HOD" || trimmedRole == "ThermaxSales-HOD" || trimmedRole == "BuhlerSales-HOD" || trimmedRole == "ThermaxService-HOD" || trimmedRole == "AtlasService-HOD" || trimmedRole == "BuhlerService-HOD") {
          this.setState({ toggleClosedDate: 'block' })
        }
      }

      if (user) {
        console.log("In User List", user)
        await this.setState({
          userInfo: user,
          Name: user.company_name,
          email: user.email,
          valueAssign: user.aname,
          aname: user.aname,
          Phno: user.number,
          Address: user.address,
          discription: user.description,
          Solvediscription: user.solution,
          lastAction: moment(user.timeStamp).format('DD-MM-YYYY'),
          status: user.status,
          companyid: user.client_id,
          assigneId: user.AssignId,
          SelectedAsset: user.asset,
          Vertical: user.vertical,
          VerticalName: user.vertical,
          //  ClosedDate: moment(user.closedDate, "DD-MM-YYYY")
          lastActionDate:moment(user.timeStamp),
          ClosedDate: moment(user.closedDate),
          assignname: user.name,
          rating: user.priority,
          // purposeReport: user.purposeReport,
          action: user.action,
          actionCallId: user.call_id,
          action_visitId: user.visit_id,
          action_meetingId: user.meeting_id,
          Tno: user.id,
          ceoinfo: ceoDetails
          // groupName:user.groupName,
          // subGroupName:user.subGroupName

        })
        console.log("CLOSED DATE CHECK", this.state.ClosedDate)
        this.listVertical()
        this.Tixy_Image(user.id)

        this.actionCalldata(user.id)

        this.actionVisitdata(user.id)

        //  this.actionMeetingdata(user.id)
      } else {
        console.log("No User here")
      }

      console.log("user.closedDate", user.closedDate)
      console.log("companyid is", this.state.companyid)
      console.log("assigneId is", this.state.assigneId)
      this.setState({ Address: this.state.userInfo.address })
    }

    fetch("http://35.161.99.113:9000/webapi/t_client/list", {
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

    fetch("http://35.161.99.113:9000/webapi/t_asset/t_assetList ", {
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
          this.setState({ AssetData: data.records })
        } else {
          console.log("No Asset Data")
          this.setState({ AssetData: [] })
        }
      })

    this.listGroup()
    this.listVisitType()
    this.listmeetingType()
    this.listcallType()
  }

  onChange = Address => {
    console.log("Address is", Address)
    this.setState({ Address })
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
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
      isSucess: false,
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
    if (this.state.Solvediscription.length <= 0) {
      this.setState({ closedmsg: "Please Enter Discription" })
    } else {
      this.setState({ status: "Closed", closedmsg: "Status Changed To Closed" })
    }
  }

  handleProgressStatus = () => {
    console.log("In Progress")

    this.setState({ status: "UnderProgress" })
  }

  //Search
  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.company_name })
    this.setState({ SelectedResult: result })
    // let active=true
    if (result) {
      this.setState({
        Name: result.company_name,
        Phno: result.number,
        Address: result.address,
        //rating:this.state.SelectedResult.star,
        email: result.email,
        msg1: "",
        companyid: result.id
      })
    }
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
    this.setState({ valueAssign: result.name, aname: result.name })
    this.setState({ SelectedResultAssign: result })
    if (result) {
      this.setState({
        assigneId: result.id
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
      this.state.userInfo.id +
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
    })
  }

  msgEmailClient = () => {
    let authkey = "133779ATT6JFXy0k5850e783"
    let sender = "SHMGMT"
    let route = "4"
    let number = this.state.Phno
    // B1234 has been assigned to our engineer <name>and has been scheduled for  dd-mm-yy by (----). For any queries please call 9876543210.
    let message1 =
      "Dear" +
      " " +
      this.state.Name +
      ", your service Ticket no." +
      this.state.userInfo.id +
      " " +
      "has been updated"
    //+"\n has been assigned to our engineer"+this.state.assignEmpName+"and has been scheduled for"+this.state.ClosedDate+"\n by"+this.state.userInfo.name+"\n For any queries please call 9876543210"

    // if(this.state.SelectedResultAssign.id > 0){
    //   return message1 = "Dear Customer, your service Ticket no."+this.state.Tno+" "+"has been assigned to our engineer"+" "+this.state.valueAssign+" "+"and has been scheduled"+" "+"for"+" "+this.state.closedDate+" "+"by"+this.state.verticalServiceHodData[0].name+".For any queries please call 9876543210"
    // }

    setTimeout(() => {
      if (this.state.status == "Closed") {
        let hodmessage =
          "Dear" +
          " " +
          this.state.Name +
          " " +
          "service Ticket no." +
          this.state.userInfo.id +
          "" +
          "has been closed successfully."

        let url =
          "http://bhashsms.com/api/sendmsg.php?" +
          "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
          hodmessage +
          "&sender=MHOURZ&phone=" +
          this.state.verticalServiceHodData[0].mobile_num +
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
          emailTo: this.state.verticalServiceHodData[0].email,
          emailData: {
            name: this.state.Name,
            msg: hodmessage,
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

        let Closedmessage1 =
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

        let url1 =
          "http://bhashsms.com/api/sendmsg.php?" +
          "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
          Closedmessage1 +
          "&sender=MHOURZ&phone=" +
          this.state.Phno +
          "&priority=ndnd&stype=normal"
        console.log("url client", url1)
        fetch(url1, { mode: "no-cors" }).then(response => {
          console.log(response)
          // this.setState({redirectToTixy:true})
        })

        let emailSubject1 = `Hi ${this.state.Name} Welcome To Thermodynamic`
        let emailData1 = {
          company: "mhc",
          templateName: "ThermoDynamicTixy",
          emailSubject: emailSubject1,
          emailTo: this.state.email,
          emailData: {
            name: this.state.Name,
            msg: Closedmessage1,
            tno: this.state.userInfo.id
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
      }
    }, 1200)

    let url =
      "http://bhashsms.com/api/sendmsg.php?" +
      "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
      message1 +
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

  msgEmailAssign = () => {
    let authkey = "133779ATT6JFXy0k5850e783"
    let sender = "SHMGMT"
    let route = "4"
    let number = this.state.SelectedResultAssign.mobile_num
    // let message2="Dear"+" "+this.state.aname+" "+"Ticket no."+this.state.userInfo.id+" "+"has been assigned to you against"+this.state.calltypeid+"\t"+"Please look in to this on Priority"
    // let message = "Dear"+this.state.aname+"Service ticket no."+this.state.Tno+"has not been resolved."+"\t"+"Please look in to this on Priority"

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
          this.state.userInfo.id +
          " " +
          "has been assigned to you against" +
          " " +
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
          emailTo: this.state.SelectedResultAssign.email,
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
          this.state.userInfo.id +
          " " +
          "has been assigned to you against" +
          " " +
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
          emailTo: this.state.SelectedResultAssign.email,
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
          this.state.userInfo.id +
          " " +
          "has been assigned to you against" +
          " " +
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
          emailTo: this.state.SelectedResultAssign.email,
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
      this.state.userInfo.id +
      " " +
      "has been assigned to our engineer" +
      " " +
      this.state.valueAssign +
      " " +
      "and has been scheduled" +
      " " +
      "for" +
      " " +
      moment(this.state.closedDate).format("DD-MM-YYYY") +
      " " +
      "by" +
      " " +
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
      this.state.SelectedResultAssign.name
      } Welcome To Thermodynamic`
    let emailData1 = {
      company: "mhc",
      templateName: "ThermoDynamicTixy",
      emailSubject: emailSubject1,
      emailTo: this.state.email,
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

    // let url= "http://bhashsms.com/api/sendmsg.php?"+'user=TEAM_MHOURZ&pass=MECHATRON&text='+message2+'&sender=MHOURZ&phone='+number+'&priority=ndnd&stype=normal'
    // console.log("url",url)
    // fetch(url, {mode: 'no-cors'}).then(response =>{
    //     console.log(response)
    //    // this.setState({redirectToTixy:true})

    //   })

    //    let emailSubject = `Hi ${this.state.Name} Welcome To Thermodynamic`
    //    let emailData = {
    //        company: "mhc",
    //        templateName: "ThermoDynamicTixy",
    //        emailSubject: emailSubject,
    //        emailTo: "akashmishra989ha@gmail.com",
    //        emailData: {
    //            name: this.state.Name,
    //            msg: message2,
    //            tno:this.state.userInfo.id
    //        }
    //      }

    //    let dataString = JSON.stringify(emailData)

    //    fetch("https://inevitable-mail-server.herokuapp.com/sendmail", {
    //      method: "post",
    //      headers: {
    //        "content-type": "application/json"
    //      },
    //      body: dataString
    //    }).then(data => {
    //        console.log("email api call",data)
    //      })
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
          address: this.state.Address,
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

  // if(!this.state.assigneId){
  //   this.setState({msg1:"Please Select Assign Emp "})
  // }else
  handleSubmit = () => {


    this.deleteFileListData(this.state.Tno)
    let ceohod = []

    ceohod.push(this.state.verticalServiceHodData[0],
      this.state.ceoinfo
    )

    console.log('ceohod', ceohod);



    if (!this.state.companyid) {
      this.setState({ msg1: "Please Select Company" })
    } else if (!this.state.Name) {
      this.setState({ msg1: "Please Select Company " })
    } else if (!this.state.Vertical) {
      this.setState({ msg1: "Please Select Vertical" })
    } else if (this.state.SelectedAsset.length < 0) {
      this.setState({ msg1: "Please Select Asset" })
    } else if (this.state.discription.length < 0) {
      this.setState({ msg1: "Please Enter Description" })
    } else if (!this.state.ClosedDate) {
      this.setState({ msg1: "Please Select Closed Date" })
    } else if (!this.state.status) {
      this.setState({ msg1: "Please Select Status" })
    } else {
      fetch(" http://35.161.99.113:9000/webapi/t_ticket/update_ticket", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: this.state.companyid,
          t_id: this.state.userInfo.id,
          priority: this.state.rating,
          description: this.state.discription.trim(),
          status: this.state.status,
          solution: this.state.Solvediscription.trim(),
          assigneId: this.state.assigneId,
          timeStamp: this.state.startDate,
          vertical: this.state.Vertical,
          asset: this.state.SelectedAsset,
          groupName: this.state.groupName,
          subGroupName: this.state.subGroupName,
          // purposeReport: this.state.purposeReport,
          closedDate: this.state.ClosedDate,
          imageLink: this.state.ImageData1,
          action: this.state.action,
          callId: this.state.actionCallId,
          visitId: this.state.action_visitId,
          meetingId: this.state.action_meetingId,
          aname: this.state.valueAssign,
          tno: this.state.Tno,
          ceo_hodData: ceohod,
          reportLink:this.state.reportsDataList

        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
          this.state.Tno = data.records
          if (data.message === "succesfully updated") {
            this.msgEmailClient()
            // this.msgEmailHod();

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

  // handleFormSubmit = (event) => {
  //     event.preventDefault()

  //     geocodeByAddress(this.state.address)
  //       .then(results => getLatLng(results[0]))
  //       .then(latLng => console.log('Success', latLng))
  //       .catch(error => console.error('Error', error))
  //   }

  //  onChange = (address) => this.setState({ address })

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  handleUploadStartTixy = event =>
    this.setState({ username: event.target.value })
  handleUploadStartTixy = () =>
    this.setState({ isUploading: true, progress: 0 })
  handleProgressTixy = progress => this.setState({ progress })
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
      .then(async url => {
        this.state.ImageData1.push(url)
        await this.state.ImageData.push({ link: url })
        this.setState({ uploadedfileurl: url })
      })
    setTimeout(() => {
      if (this.state.progress == 100) {
        this.setState({ filename: "", progress: 0 })
      } else {
        console.log("error in upload")
      }
    }, 1000)
  }

  handleVertical = e => {
    let vname = e.target.value
    let vid
    this.state.verticalData.map(i => {
      if (i.vertical == vname) {
        vid = i.id
      }
    })
    this.listAsset(vname)
    this.setState({ Vertical: vname, isHOD: true })

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

  handleaddVerticalName = e => {
    this.setState({ vname: e.target.value })
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
    tixy_fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.ImageData.push({ link: url })
        this.setState({ uploadedfileurl: url })
      })
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

  handleTypeOfVisit = () => {
    this.setState({ isOpenVistType: true })
  }

  handleVisitType = e => {
    this.setState({ visit_Name: e.target.value })
  }

  //visit Date & Time

  handleFromDate = date => {
    this.setState({ FromDate: date })
    console.log("Date Current ", date.format("DD/MM/YYYY"))
  }
  handleFromTime = time => {
    this.setState({ Totime: time })
    console.log("Time Current ", time)
  }

  handleTodate = date => {
    this.setState({ ToDate: date })
  }

  handleToTime = time => {
    this.setState({ time: time })
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

  handleGroup = gid => {
    // let gid =e.target.value
    console.log("gid", gid)

    this.state.groupData.filter(i => {
      if (i.id == gid) {
        this.setState({ GrupName: i.name })
      }
    })

    this.listSubGroup(gid)
    this.setState({ grpid: gid })
  }

  handleSubgrpID = sgid => {
    // let sgid=e.target.value
    this.setState({ sgrpid: sgid })
  }

  // handlepurposeReport = e => {
  //   this.setState({ purposeReport: e.target.value })
  // }

  handleMeetingTypeName = e => {
    this.setState({ meetingTypeName: e.target.value })
  }

  handleVisitTypeName = e => {
    this.setState({ visitTypeName: e.target.value })
  }

  handleCallTypeName = e => {
    this.setState({ callTypeName: e.target.value })
  }

  handleCallModal = () => {
    this.setState({ callTypeModal: true })
  }

  handleVisitModal = () => {
    this.setState({ visitTypeModal: true })
  }

  handleMeetingModal = () => {
    this.setState({ meetingTypeModal: true })
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
            client_id: this.state.companyid,
            type_of_action: this.state.action,
            date: this.state.cdate,
            type_of_visit: this.state.vsittypeId,
            description: this.state.discription,
            // visit_expected_outcome: this.state.exOutCome,
            // visit_actual_outcome: this.state.actualOutcome,
            km_travelled: this.state.travel,
            visit_amount: this.state.vamount,
            from_date: moment(this.state.FromDate).format("DD-MM-YYYY"),
            to_date: moment(this.state.ToDate).format("DD-MM-YYYY"),
            AssignId: this.state.aname,
            tid: this.state.userInfo.id,
            lid: this.state.leadid,
            from_time: moment(this.state.Fromtime).format("hh:mm:ss"),
            to_time: moment(this.state.Totime).format("hh:mm:ss"),
            imageLink: this.state.ImageData1,
            status: "Denie"
          })
        })
          .then(data => {
            return data.json()
          })
          .then(async data => {
            console.log("data", data)
            console.log("data", data.records)
            let visitid = data.records

            await this.setState({ action_visitId: visitid })

            if (data.message == "Action added") {
              fetch(tixy_Action, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  callId: this.state.actionCallId,
                  visitId: visitid,
                  meetingId: this.state.action_meetingId,
                  tid: this.state.userInfo.id
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
      //       client_id: this.state.companyid,
      //       type_of_action: this.state.action,
      //       type_of_visit: this.state.meetingtypeId,
      //       description: this.state.Mdiscription,
      //       visit_expected_outcome: this.state.MexOutCome,
      //       visit_actual_outcome: this.state.MactualOutcome,
      //       km_travelled: "",
      //       visit_amount: "",
      //       from_date: moment(this.state.MDate).format("DD-MM-YYYY"),
      //       to_date: "",
      //       AssignId: this.state.aname,
      //       tid: this.state.userInfo.id,
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
      //     .then(async data => {
      //       console.log("data", data)
      //       console.log("data", data.records)
      //       let meetingid = data.records

      //       await this.setState({ action_meetingId: meetingid })
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
      //             callId: this.state.actionCallId,
      //             visitId: this.state.action_visitId,
      //             meetingId: meetingid,
      //             tid: this.state.userInfo.id
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
            client_id: this.state.companyid,
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
            tid: this.state.userInfo.id,
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
          .then(async data => {
            console.log("data", data)
            console.log("data", data.records)
            let callid = data.records

            await this.setState({ actionCallId: callid })
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
                  visitId: this.state.action_visitId,
                  meetingId: this.state.action_meetingId,
                  tid: this.state.userInfo.id
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

  actionUpdate = () => {
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
        fetch(tixy_Edit_action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            actionId: this.state.actionId,
            visitId: this.state.action_visitId,
            client_id: this.state.cid,
            type_of_action: this.state.action,
            type_of_visit: this.state.vsittypeId,
            description: this.state.description,
            // visit_expected_outcome: this.state.exOutCome,
            // visit_actual_outcome: this.state.actualOutcome,
            km_travelled: this.state.travel,
            visit_amount: this.state.vamount,
            from_date: moment(this.state.FromDate).format("DD-MM-YYYY"),
            to_date: moment(this.state.ToDate).format("DD-MM-YYYY"),
            AssignId: this.state.aid,
            tid: this.state.userInfo.id,
            lid: this.state.leadid,
            from_time: moment(this.state.Fromtime).format("hh:mm:ss"),
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

            if (data.message == "Action Updated") {
              this.setState({ isSucess: true, SuccessMsg: "Action Updated" })
              setTimeout(() => {
                this.handleClose()
              }, 1000)
              //  this.setState({redirectToAsset:true})
              //  this.setState({redirectToWelcome:true})
            } else {
              this.setState({ isopen: true, errorMsg: data.error })
              console.log("No User")
              this.setState({ msg: "Invalid User" })
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
      //   fetch(tixy_Edit_action, {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       client_id: this.state.cid,
      //       meetingId: this.state.action_meetingId,
      //       actionId: this.state.actionId,
      //       type_of_action: this.state.action,
      //       type_of_visit: this.state.meetingtypeId,
      //       description: this.state.Mdiscription,
      //       visit_expected_outcome: this.state.MexOutCome,
      //       visit_actual_outcome: this.state.MactualOutcome,
      //       km_travelled: "",
      //       visit_amount: "",
      //       from_date: moment(this.state.MDate).format("DD-MM-YYYY"),
      //       to_date: "",
      //       AssignId: this.state.aid,
      //       tid: this.state.userInfo.id,
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

      //       if (data.message == "Action Updated") {
      //         this.setState({ isSucess: true, SuccessMsg: "Action Updated" })
      //         setTimeout(() => {
      //           this.handleClose()
      //         }, 1000)
      //       } else {
      //         this.setState({ isopen: true, errorMsg: data.error })
      //         console.log("No User")
      //         this.setState({ msg: "Invalid User" })
      //       }
      //     })
      //   //}

      //   break

      case "call":
        console.log("callId", this.state.actionCallId)

        fetch(tixy_Edit_action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            actionId: this.state.actionId,
            callId: this.state.actionCallId,
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
            AssignId: this.state.aid,
            tid: this.state.userInfo.id,
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

            if (data.message == "Action Updated") {
              this.setState({ isSucess: true, SuccessMsg: "Action Updated" })
              setTimeout(() => {
                this.handleClose()
              }, 1000)
              //  this.setState({redirectToWelcome:true})
            } else {
              this.setState({ isopen: true, errorMsg: data.error })
              console.log("No User")
              this.setState({ msg: "Invalid User" })
            }
          })

        break

      default:
        break
    }
  }

  handleVisiTypeId = e => {
    let vid = e.target.value
    this.setState({ vsittypeId: vid })
  }

  handleSelectCallId = e => {
    let cid = e.target.value
    console.log("cid", cid)

    this.setState({ calltypeid: cid })
  }

  handleSelectMeetingId = e => {
    let mid = e.target.value
    this.setState({ meetingtypeId: mid })
  }

  handlevisitToDate = date => {
    this.setState({ ToDate: date })
  }

  handlevisitFromDate = date => {
    this.setState({ FromDate: date })
  }


  
  
  handleUploadStartReport = () => this.setState({isUploadingReport: true, reportProgress: 0});
  handleProgressReport = (reportProgress) => this.setState({reportProgress});
  handleUploadErrorReport = (error) => {
    this.setState({isUploadingReport: false});
    console.error(error);
  }
  handleUploadSuccessReport = (filename) => {
      console.log("File Name is",filename)
      this.state.reportsUploadedfileName.push(filename)
     // this.state.reportsDataList.push({"documentName":filename})
    this.setState({ reportProgress: 100, isUploadingReport: false});
    tixyReport_fbs.child(filename).getDownloadURL().then(url =>{
      this.setState({uploadedfileurl: url,msg1:""})
      this.state.reportsUploadedFile.push(url)
      this.state.reportsDataList.push({"name":filename,"link":url})
      //this.state.reportsDataList.push({"link":url})
      console.log("reportsDataList",this.state.reportsDataList)
    }); 

    setTimeout(()=>{
    if(this.state.reportProgress == 100){
      this.setState({filename:"", reportProgress:0})
    }else{
      console.log("error in upload")
    }
   },100)

  };


  // UpdateDocument=()=>{
  //   let curDate=moment()
  //   fetch(AddDocument, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //           folderId: this.state.dmsinfo.id,
  //           fileList:this.state.uploadedfileName,
  //           fileLink: this.state.uploadedFile,
  //           date:moment(curDate).format("DD-MM-YYYY")
  //       })
  //     })
  //       .then(data => {
  //         return data.json()
  //       })
  //       .then(data => {
  //         console.log("data", data)
  //         console.log("data", data.records)
  //         if(data.message == "Files Added"){
  //             console.log("updated")
  //             this.setState({ Smsg: "Files Added", isSucess: true })
  //         }else{
  //             console.log("Not updated")
  //             this.setState({ msg: "Something went wrong", isopen: true })
  //         }
  //       })
  // }
  
  FilesData = (id) =>{

    fetch('http://35.161.99.113:9000/webapi/t_ticket/t_getReportLink', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tid:id
        })
      }).then(data => {
        return data.json();
      }).then(data => {
         console.log("data",data)
         console.log("reportsDataList check",data.records)
         if(data.records){
           this.setState({reportsDataList:data.records})
      
         }else{
           console.log("No user")
           this.setState({reportsDataList:[]})
         }
      })
  
  }


  deleteDocument=(i)=>{

    //let did=id

    let a = this.state.reportsDataList.indexOf(i)
    if (a > -1) {
      this.state.reportsDataList.splice(a, 1)
    }

    this.setState({ reportsDataList: this.state.reportsDataList })
    console.log("after delete", this.state.a)
    console.log("after delete assignedRole", this.state.reportsDataList)
    console.log("now fname array is", this.state.reportsDataList)
    // }else if(this.state.isChecked == false) {
    //     console.log("Not Selected")
    // }
    
    // Remove this value from Final Report Array 
   // reportsDataList  Splice ...
    
    //this.deleteFileListData(did)

  }
  

  deleteFileListData =(id)=>{

    fetch('http://35.161.99.113:9000/webapi/t_ticket/deleteReport', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          t_id:id
        })
      }).then(data => {
        return data.json();
      }).then(data => {
         console.log("data",data)
       
         if(data.message == "Document Deleted"){
            console.log("data delete")
            window.location.reload()
                        //this.setState({fileDataList:this.state.fileDataList})
         }else{
             console.log("Problem in data delete")
         }
      })
  
  }
  downloadDocument=(link)=>{

    
    let downloadUrl =link

     console.log("download url is",downloadUrl)

     window.open(downloadUrl)
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
      isopen,
      ProductData,
      AssetData,
      Vertical,
      isHOD,
      ClosedDate,
      vname,
      isOpenVeritcal,
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
      FromDate,
      Fromtime,
      Totime,
      visit_Name,
      call_type,
      meeting_type,
      isOpenVistType,
      isOpenCallType,
      isOpenMeetingType,
      Mdiscription,
      MactualOutcome,
      MexOutCome,
      meeting_Type,
      MDate,
      call,
      CallexOutCome,
      CallactualOutcome,
      Calldiscription,
      Calltime,
      Meetingtime,
      verticalData,
      btndisable,
      isSucess,
      ImageData,
      //purposeReport,
      ImageData1,
      groupData,
      subGroupData,
      grpid,
      sgrpid,
      GrupName,
      vsittypeId,

      callTypeData,
      visitTypeData,
      meetingTypeData,
      calltypeid,
      size12,
      visitTypeid,
      meetingtypeId,
      size13,
      size14,
      action,
      isMeetingData,
      isCallData,
      isVisitData,
      selectedVisit,
      selectedCall,
      selectedMeeting,
      reportsDataList
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

    console.log("Image data is", ImageData)
    console.log("Image data is", ImageData1)

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
              <HeadingText>Update Tixy</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded className="icon_name" style={{ height: "100%" }}>
                <label style={{ fontSize: "16px", fontWeight: "bold" }} className="labelcolor">Ticket Id:</label>
                <label style={{ fontSize: "16px" }} className="labelcolor">{'  '}{this.state.Tno}</label>
                <hr />
                <label className="labelcolor"
                  style={{ fontSize: "16px", fontWeight: "bold" }}  //Aishwarya  
                >Company Name</label>
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
                  <hr />
                </div>

                <Form
                  style={{ fontSize: "16px" }}    //Aishwarya  
                >
                  <Form.Group widths={1}>
                    <label style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "7px" }} className="labelcolor">  Last Action : </label>  {/*Aishwarya 17/5/19*/}
                    <label className="labelcolor">{"   "}{lastAction} </label>
                  </Form.Group>

                  {/*<Form.Group widths={1}>*/}
                  <Form.Group widths={2}>   {/*Aishwarya*/}
                    <Form.Input
                      label="Company Name"
                      placeholder="Company Name"
                      value={Name}
                      onChange={this.handleName}
                      required
                    />
                  </Form.Group>

                  {/*<Form.Group widths={1}>*/}
                  <Form.Group widths={2}>   {/*Aishwarya*/}
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

                  {/*<Form.Group widths={1}>*/}
                  <Form.Group widths={2}>   {/*Aishwarya*/}
                    <Form.Input
                      label="Email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleEmail}
                    />
                  </Form.Group>

                  {/*<Form.Group widths={1}>*/}
                  <Form.Group widths={2}>   {/*Aishwarya*/}
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
                    disabled
                  >
                    Add Client
                  </Button>
                  <font color="red">{this.state.msg}</font>
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <Form
                  style={{ fontSize: "16px" }}    //Aishwarya  
                >
                  <div>
                    <Form.Field label="Vertical" required />
                    {/* <div style={{ display: "flex" }}>*/}
                    <div
                      style={{ width: "290px", height: "32px" }}      //Aishwarya
                    >
                      <div style={{ flex: 1, marginRight: 12 }}>
                        <select value={Vertical} onChange={this.handleVertical}>
                          <option />
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

                    <br />
                    <Form.Field label="Asset" />
                    {/* <div style={{ display: "flex" }}>*/}
                    <div
                      style={{ width: "290px", height: "32px" }}      //Aishwarya
                    >
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
                    <br />

                    <Form.Field label="Group" />
                    <div style={{ display: "flex" }}>
                      <label>{this.state.groupName}</label>

                      {/* <div style={{ flex: 1, marginRight: 12 }}>

                                    
              <select value={grpid} onChange={e=>this.handleGroup(e.target.value)}>

            <option value="" disabled selected hidden>
                            Select group
            </option>
              {groupData.map(i=>(

              <option value={i.id} key={i.id}>{i.name}</option>
              ))}

              </select>
              </div> */}
                    </div>
                    <br />

                    <Form.Field label="SubGroup" />
                    <div style={{ display: "flex" }}>
                      <label>{this.state.subGroupName}</label>

                      {/* <div style={{ flex: 1, marginRight: 12 }}>

                                    
              <select value={sgrpid} onChange={e=>this.handleSubgrpID(e.target.value)}>

                <option value="" disabled selected hidden>
                                Select Sub Group
                </option>
                  {subGroupData.map(i=>(

                  <option value={i.name} key={i.id}>{i.name}</option>
                  ))}

                  </select>
                  </div> */}
                    </div>
                    <br />
                  </div>
                </Form>
                <br />

                <label style={{ fontSize: "16px", fontWeight: "bold" }}>      {/*Aishwarya*/}

                  Description</label>

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
                  style={{ fontSize: "16px", fontWeight: "bold" }}    //Aishwarya  17/5/19  
                >Image</label>
                <hr />

                <RawCarousel
                  imageData={
                    (ImageData && ImageData.length >= 0 && ImageData) || []
                  }
                />

                <Progress percent={this.state.progress} active color="green" />
                <br />
                <form>
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={tixy_fbs}
                    onUploadStart={this.handleUploadStartTixy}
                    onUploadError={this.handleUploadErrorTixy}
                    onUploadSuccess={this.handleUploadSuccessTixy}
                    onProgress={this.handleProgressTixy}
                  />
                </form>
                <br />
              </Segment>
            </TixyContent>
          </ContentArea>

          <ContentArea>
            <TixyContent>
              <Segment padded>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}    //Aishwarya  17/5/19 
                >Complaint Resolution Details</label>
                <br />
                <br />
                <hr />
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}    //Aishwarya  17/5/19 
                >Rating</label>
                <br /> <br />
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
                <Form
                  style={{ fontSize: "16px" }}    //Aishwarya  
                >
                  <Form.Group widths={2}>
                    <label style={{ fontWeight: "bold", marginLeft: "7px" }} className="labelcolor">  Last Action :</label>        {/*Aishwarya  17/5/19 */}
                    {" "}
                    <label>{lastAction} </label>
                  </Form.Group>

                  <Form.Field label="Assign Employee" />
                  <div style={{ width: 400 }}>
                    <Search
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

                  {/*  {isHOD && <label>HOD :- "Demo"</label>}*/}
                  {/*<div style={{ display: "flex" }}>*/}          {/*Aishwarya*/}
                  <div style={{ marginRight: 12, display: this.state.toggleClosedDate, fontWeight: "bold" }}>
                    <label className="labelcolor">Closed Date </label>
                  </div>
                  <div style={{ display: this.state.toggleClosedDate, marginTop: "10px" }} >               {/*Aishwarya*/}
                    <DatePicker
                      selected={this.state.ClosedDate}
                      onChange={this.handleCloseDate}
                      onFocus={e => e.target.blur()}
                      showYearDropdown
                      minDate={this.state.lastActionDate}
                      dateFormat="DD-MM-YYYY"
                      dateFormatCalendar="MMMM"
                      scrollableYearDropdown
                      yearDropdownItemNumber={15}
                    />
                  </div>
                  {/*</div>*/}
                  <hr />

                  <br />

                  <label style={{ fontWeight: "bold" }} className="labelcolor">Solution Details</label>           {/*Aishwarya 17/5/19*/}
                  <TextArea
                    style={{ marginTop: "10px" }}                      //Aishwarya 17/5/19  
                    placeholder="Tell us more"
                    value={Solvediscription}
                    onChange={this.handleSolveDiscribe}
                    rows={3}
                  />
                </Form>
                <hr />
                {/* <label>Action</label>
                {!Solvediscription && (
                  <p>Please Enter Description Then You Can Do Action</p>
                )}

                {Solvediscription && ( */}
                <p
                  style={{ fontSize: "16px", fontWeight: "bold" }}    //Aishwarya  17/5/19
                >
                  Selected Action - {selectedCall} {selectedMeeting}{" "}
                  {selectedVisit}
                </p>
                <center
                  style={{ fontSize: "16px" }}    //Aishwarya  
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
                <hr />
                <Form
                  style={{ fontSize: "16px" }}    //Aishwarya  
                >
                  <Form.Field style={{ fontSize: "16px" }} label="Select Ticket Status" />        {/*Aishwarya 17/5/19*/}
                  <Form.Field style={{ fontSize: "18px" }} label={status} />
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
                      open={this.state.isProgressClose}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenProgress}
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
                          onClick={() => this.handleProgressStatus()}
                        >
                          Progress
                        </Button>
                      }
                      size="huge"
                      style={{ fontSize: '16px' }}
                      content={`Status Changed to Under Progress`}
                      on="click"
                      open={this.state.isOpenClose}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenClose}
                      position="top right"
                    />
                  </TableContent>
                </Form>
                <br />
                {/* <Form>
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

                    <Progress percent={this.state.reportProgress} active color="green">
  </Progress>
        <br /><br/>

                  <br />
                     <Grid columns={3} relaxed>

                      
                      {reportsDataList.map(i=>(

<Segment>
<p>{i.name}</p>

<Button  color="purple">{i.name}<br/></Button>

<br/>
<Icon size="large" name="close" onClick={()=>this.deleteDocument(i)}/>


<Icon size="large" name="cloud download" onClick={()=>this.downloadDocument(i.link)}/>
</Segment>
))}
  <br/>

    </Grid>
                  <br />
                  {/* <Button
                //    onClick={() => this.UpdateDocument()}
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Update Report
                  </Button> */}
                  </Form>
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>

            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubmit()}
              disabled={btndisable}
            >
              Update Tixy
            </Button>
          </ContentArea>
        </PageContainer2>

        {this.state.redirectToTixy && <Redirect to="/Tixy" push />}

        {isopen == true ? (
          <ErrorModal
            isopen={this.state.isopen}
            msg={this.state.msg}
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

              <Form
                widths="equal"
                style={{ fontSize: "16px" }}    //Aishwarya
              >
                <label className="labelcolor" style={{ width: "5em" }}>
                  Type of Call :-
                </label>
                <br />
                <br />
                <select value={calltypeid} onChange={this.handleSelectCallId}>
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

                {isCallData ? (
                  <Button
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                    onClick={() => this.actionUpdate()}
                  >
                    Update Call
                  </Button>
                ) : (
                    <Button
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                      onClick={() => this.handleClose()}
                    >
                      Add Call
                  </Button>
                  )}
              </Form>
            </div>
          </Modal.Content>
        </Modal>

        {/* <Modal
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
                  value={meetingtypeId}
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
                <div>
                  {isMeetingData ? (
                    <Button
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                      onClick={() => this.actionUpdate()}
                    >
                      Update Meeting
                    </Button>
                  ) : (
                    <Button
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                      onClick={() => this.handleClose()}
                    >
                      Add Meeting
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </Modal.Content>
        </Modal> */}

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
                  <select value={vsittypeId} onChange={this.handleVisiTypeId}>
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

                {isVisitData ? (
                  <Button
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                    onClick={() => this.actionUpdate()}
                  >
                    Update Visit
                </Button>
                ) : (
                    <Button
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                      onClick={() => this.handleClose()}
                    >
                      Add Visit
                </Button>
                  )}
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

export default EditTixy

