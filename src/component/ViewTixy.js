
import React, { Component } from "react"
import {
  Sidebar,
  Search,
  Divider,
  Container,
  Grid,
  Card,
  List,
  Rating,
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
  Form
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import Side from "./Sidenav"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import Carousel from "nuka-carousel"
import SmartUpload from "../component/SmartUpload"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { tixy_fbs } from "../component/base"
import MediaQuery from "react-responsive"
import moment from "moment"
import StarRatingComponent from "react-star-rating-component"
import "rc-time-picker/assets/index.css"
import TimePicker from "rc-time-picker"
import DatePicker from "react-datepicker"

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
  Box,
  Box2,
  MainDiv2,
  MainDivHolder,
  TextColor
} from "../styledComps.js"

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
  tixy_Edit_action
} from "./Api"

import RawCarousel from "./RawCarousel"

class ViewTixy extends Component {
  state = {
    menuVisible: false,
    lastAction: "",
    menuVisible: false,
    lastAction: "",
    Name: "",
    Address: "",
    Phno: "",
    description: "",
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
    userInfo: {},
    email: "",
    ProductData: [],
    AssetData: [],
    ImageData: [],
    SelectedAsset: "",
    Vertical: "",
    ClosedDate: "",
    assignname: "",
    GrupName: "",
    subGroupName: "",
    // purposeReport: "",
    open1: false,         //aishwarya 28 may   
    open: false,        //aishwarya 28 may
    SelectedTicket: "",         //aishwarya 28 may
    redirectToTixy: false, //aishwarya 29 may
    assigneId: "",
    Status1: "",
    Vertical: "",
    isHOD: false,
    // ClosedDate: moment(),
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
    discription: "",
    userInfo: {},
    selectedCall: "",
    selectedVisit: "",
    selectedMeeting: "",
    reportsDataList: [],
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

  downloadDocument = (link) => {


    let downloadUrl = link

    console.log("download url is", downloadUrl)

    window.open(downloadUrl)
  }
  componentDidMount() {
    if (JSON.parse(sessionStorage.getItem("editTicket") === null)) {
      console.log("No Data")
    } else {
      // if (JSON.parse(sessionStorage.getItem("Tixy_Image") == null)) {
      //     console.log("Nodata")
      // }else{
      // let TixyImg = JSON.parse(sessionStorage.getItem("Tixy_Image"))
      //     console.log("Image of product",TixyImg)
      //     this.setState({ImageData:TixyImg})
      // }

      let user = JSON.parse(sessionStorage.getItem("editTicket"))
      if (user) {
        console.log(
          "In User List",
          JSON.parse(sessionStorage.getItem("editTicket"))
        )

        this.FilesData(user.id)
        console.log("description", user.description)
        this.setState({
          userInfo: user,
          Name: user.company_name,
          Phno: user.number,
          Address: user.address,
          Solvediscription: user.solution,
          description: user.description,
          email: user.email,

          // lastAction: user.timeStamp,
          lastAction: moment(user.timeStamp).format('DD-MM-YYYY'),
          assigneId: user.AssignId,
          SelectedAsset: user.asset,
          Vertical: user.vertical,
          // ClosedDate: moment(user.closedDate, "DD-MM-YYYY"),
          ClosedDate: moment(user.closedDate).format('DD-MM-YYYY'),
          assignname: user.aname,
          rating: user.priority,
          GrupName: user.groupName,
          sgrpid: user.subGroupName,
          //purposeReport: user.purposeReport,
          action: user.action,
          actionCallId: user.call_id,
          action_visitId: user.visit_id,
          action_meetingId: user.meeting_id,
          Tno: user.id,
        })
        this.Tixy_Image(user.id)
        this.actionCalldata(user.id)

        this.actionVisitdata(user.id)

        this.actionMeetingdata(user.id)
      } else {
        console.log("No User here")
      }
    }
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
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
            valueTixy: actionEdit[0].ticket_id,
            valueLead: actionEdit[0].lead_id,
            ticketid: actionEdit[0].ticket_id,
            leadid: actionEdit[0].lead_id,
            valueAssign: actionEdit[0].AssignId,
            aid: actionEdit[0].AssignId,
            actionId: actionEdit[0].action_id,
            callId: actionEdit[0].callId,
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
            visitActionData: data.records,
            cid: actionEdit[0].clientId,
            visitId: actionEdit[0].visitId,
            exOutCome: actionEdit[0].visit_Expected_outcome,
            actualOutcome: actionEdit[0].visit_Actual_outCome,
            vamount: actionEdit[0].visit_amount,
            discription: actionEdit[0].visit_description,
            FromDate: moment(actionEdit[0].from_date, "DD-MM-YYYY"),
            ToDate: moment(actionEdit[0].to_date, "DD-MM-YYYY"),
            Fromtime: moment(actionEdit[0].from_Time, "hh:mm:ss"),
            Totime: moment(actionEdit[0].to_Time, "hh:mm:ss"),
            visitTypeid: actionEdit[0].type_of_visit,
            valueTixy: actionEdit[0].ticket_id,
            valueLead: actionEdit[0].lead_id,
            ticketid: actionEdit[0].ticket_id,
            leadid: actionEdit[0].lead_id,
            valueAssign: actionEdit[0].AssignId,
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

  actionMeetingdata = id => {
    fetch(meetingAction, {
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
        console.log("meeting action List ", data.records)
        if (data.records) {
          this.setState({ meetingActionData: data.records })
          let actionEdit = data.records
          this.setState({
            cid: actionEdit[0].clientId,
            meetingId: actionEdit[0].meetingId,
            MexOutCome: actionEdit[0].meeting_expected_outcome,
            MactualOutcome: actionEdit[0].meeting_actual_outcome,
            Mdiscription: actionEdit[0].description,
            MDate: moment(actionEdit[0].date, "DD-MM-YYYY"),
            Meetingtime: moment(actionEdit[0].Time, "hh:mm:ss"),
            meetingtypeId: actionEdit[0].type_of_meeting,
            valueTixy: actionEdit[0].ticket_id,
            valueLead: actionEdit[0].Lead_id,
            ticketid: actionEdit[0].ticket_id,
            leadid: actionEdit[0].Lead_id,
            valueAssign: actionEdit[0].AssignId,
            aid: actionEdit[0].AssignId,
            actionId: actionEdit[0].action_id,
            isMeetingData: true,
            selectedMeeting: "meeting"
          })
        } else {
          this.setState({
            meetingActionData: [],
            isMeetingData: false,
            selectedMeeting: ""
          })
        }
      })
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

      case "meeting":
        this.setState({ isMeeting: true })
        break

      default:
        break
    }

    this.setState({
      action: e.target.value
      // checked: this.state.checked
    })
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
      isSucess: false
    })
    clearTimeout(this.timeout)
  }

  //Aishwarya 28 may
  close = () => this.setState({ open: false, open1: false })
  //Aishwarya 28 may
  show = (size1, i) => {
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
  }
  //Aishwarya 28 may
  delete = () => {
    //console.log(i.id)
    console.log(this.state.SelectedTicket)
    fetch("http://35.161.99.113:9000/webapi/t_ticket/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        t_id: this.state.SelectedTicket
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("data", data.records)
        this.close()
        setTimeout(() => {
          //  window.location.reload()
          this.setState({ isSucess: true, redirectToTixy: true })

        }, 1000)
      })
  }


  render() {
    const {
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
      exOutCome,
      actualOutcome,
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
      open1,           //Aishwarya 28 may
      size1,             //Aishwarya 28 may
      open,          //Aishwarya 28 may
      callTypeData,
      visitTypeData,
      meetingTypeData,
      calltypeid,
      size12,
      visitTypeid,
      meetingTypeid,
      size13,
      size14,
      action,
      userInfo,
      subGroupName,
      description,
      assignname,
      isMeetingData,
      isCallData,
      isVisitData,
      selectedVisit,
      selectedCall,
      selectedMeeting
    } = this.state

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
              <HeadingText>View Tixy</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 28 May*/}
            <Link to="/EditTixy">
              <Button
                size='small'
                floated='right'
                style={{
                  // marginRight: "20px",
                  margin: "10px",
                  backgroundColor: "#863577",
                  color: "#fff"
                }}
              >
                Edit
              </Button>
            </Link>
            {/*Aishwarya 28 May*/}
            <Button
              size='small'
              floated='right'
              style={{
                margin: "10px",
                backgroundColor: "#863577",
                color: "#fff"
              }}
              onClick={() => this.show("tiny", this.state.Tno)}
            >
              Delete
          </Button>

            {this.state.redirectToTixy && <Redirect to="/Tixy" push />}            {/*Aishwarya 29 May*/}  
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded className="icon_name" style={{ height: "100%", fontSize: "16px" }}>
                <label className="labelcolor">Ticket Id:</label>
                <label className="labelcolor">{'  '}{this.state.Tno}</label>
                <hr />
                <label className="labelcolor"
                  style={{ fontSize: "16px" }}  //Aishwarya
                >Company Name:</label>

                <br />
                <label className="labelcolor">{Name}</label>
                <hr />
                //Aishwarya
                <List.Item className="add_data" style={{ fontSize: "16px" }}>
                  Last Action :-{lastAction}{" "}

                </List.Item>
                <hr />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>   {/*aishwarya*/}
                  Contact Name :{Name}
                </List.Item>{" "}
                <br />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>Phone No.-{Phno}</List.Item>     {/*aishwarya*/}
                <br />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>Email-{email}</List.Item>        {/*aishwarya*/}
                <br />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>Address -{Address}</List.Item>     {/*aishwarya*/}
                <br />
              </Segment>
            </TixyContent>

            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <List.Item className="add_data" style={{ fontSize: "16px" }}>Vertical -{Vertical}</List.Item>        {/*aishwarya 28 may*/}
                <br />
                <label className="labelcolor"
                  style={{ fontSize: "16px" }}  //Aishwarya
                >Asset</label>
                <p>{SelectedAsset}</p>
                <br />
                <label className="labelcolor"
                  style={{ fontSize: "16px" }}  //Aishwarya  
                >Group -</label>
                <p>{GrupName}</p>
                <br />

                <label className="labelcolor"
                  style={{ fontSize: "16px" }}  //Aishwarya  
                >Sub Group - </label>
                <p>{sgrpid}</p>
                <br />

                <label className="labelcolor"
                  style={{ fontSize: "16px" }}  //Aishwarya  
                >Description</label>
                <p>{description}</p>
              </Segment>
            </TixyContent>

            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px" }}  //Aishwarya  
                >Image</label>

                {/* {ImageData && ImageData.length > 0 && (
                  <Carousel>
                    {ImageData.map(i => (
                      <center>
                        <img
                          src={i.link}
                          style={{
                            width: "60%",
                            position: "relative",
                            height: "22em"
                          }}
                        />
                      </center>
                    ))}
                  </Carousel> 
                 )}
                */}

                <RawCarousel
                  imageData={
                    (ImageData && ImageData.length >= 0 && ImageData) || []
                  }
                />
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea>
            <TixyContent>
              <Segment padded>
                <label
                  style={{ fontSize: "16px" }}  //Aishwarya
                >Complaint Resolution Details</label>
                <br />
                <br />
                <hr />
                <label
                  style={{ fontSize: "16px" }}  //Aishwarya
                >Rating</label>
                <br /> <br />
                <div>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    editing={false}
                    className="dv-star-rating-input"
                  />
                </div>
                <hr />
                {/*<TixyContent style={{ flex: 1 }}>*/}
                {/*<Segment
                  padded
                  className="icon_name"
                  style={{ height: "100%" }}
                >*/}
                <label className="labelcolor"
                  style={{ fontSize: "16px" }}  //Aishwarya  
                >{Name}</label>
                <List.Item className="add_data" style={{ fontSize: "16px" }}> Last Action :-{lastAction}{" "}          {/* aishwarya */}
                </List.Item>
                <hr />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>        {/* aishwarya */}
                  Assign Employee :{assignname}
                </List.Item>{" "}
                <br />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>    {/* aishwarya */}
                  Closed Date :{this.state.ClosedDate}
                </List.Item>
                <br />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>Action :</List.Item>          {/* aishwarya */}
                <br />
                <p
                  style={{ fontSize: "16px" }}  //Aishwarya  
                >
                  Selected Action - {selectedCall} {selectedMeeting}{" "}
                  {selectedVisit}
                </p>
                <center>
                  <div style={{ display: "flex", fontSize: "16px" }}>            {/* aishwarya */}
                    {isCallData && (
                      <div style={{ marginLeft: 12 }}>
                        <input
                          type="radio"
                          id="radio1"
                          name="radio1"
                          value="call"
                          onChange={this.handleMachnie}
                        />
                        <label className="labelcolor" htmlFor="radio1">
                          Call
                            </label>
                      </div>
                    )}

                    {isVisitData && (
                      <div style={{ marginLeft: 12 }}>
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value="visit"
                          onChange={this.handleMachnie}
                        />
                        <label className="labelcolor" htmlFor="radio2">
                          Visit
                            </label>
                      </div>
                    )}

                    {isMeetingData && (
                      <div style={{ marginLeft: 12 }}>
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value="meeting"
                          onChange={this.handleMachnie}
                        />
                        <label className="labelcolor" htmlFor="radio2">
                          Meeting
                            </label>
                      </div>
                    )}
                  </div>
                </center>
                {/*</Segment>*/}
                {/*</TixyContent>*/}
                <br />                                          {/*Aishwarya*/}
                <List.Item className="add_data" style={{ fontSize: "16px" }}>Status </List.Item>          {/* aishwarya */}
                {userInfo.status == "UnderProgress" && (
                  <Popup
                    trigger={
                      <Button
                        style={{
                          backgroundColor: "#863577",
                          color: "#ffffff",
                        }}
                        size="tiny"
                        onClick={() => this.handleProgress()}
                      >
                        Progress
                      </Button>
                    }
                    content={`Status Changed to Under Progress`}
                    on="click"
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    position="top right"
                  />
                )}
                {userInfo.status == "Rejected" && (
                  <Popup
                    trigger={
                      <Button
                        icon
                        style={{
                          backgroundColor: "#863577",
                          color: "#ffffff"
                        }}
                        onClick={() => this.handleDelete()}
                      >
                        Reject
                      </Button>
                    }
                    content={`Status Changed to Rejected`}
                    on="click"
                    open={this.state.isOpenReject}
                    onClose={this.handleClose}
                    onOpen={this.handleOpenReject}
                    position="top right"
                  />
                )}
                {userInfo.status == "hold" && (
                  <Popup
                    trigger={
                      <Button
                        icon
                        style={{
                          backgroundColor: "#863577",
                          color: "#ffffff"
                        }}
                        onClick={() => this.handleHold()}
                      >
                        hold
                      </Button>
                    }
                    content={`Status Changed to Hold`}
                    on="click"
                    open={this.state.isOpenHold}
                    onClose={this.handleClose}
                    onOpen={this.handleOpenHold}
                    position="top right"
                  />
                )}
                {userInfo.status == "Closed" && (
                  <Popup
                    trigger={
                      <Button
                        icon
                        style={{
                          backgroundColor: "#863577",
                          color: "#ffffff"
                        }}
                        onClick={() => this.handleFinalSovle()}
                      >
                        Closed
                      </Button>
                    }
                    content={`Status Changed to Closed`}
                    on="click"
                    open={this.state.isOpenClose}
                    onClose={this.handleClose}
                    onOpen={this.handleOpenClose}
                    position="top right"
                  />
                )}
                <br />
                <br />
                <List.Item className="add_data" style={{ fontSize: "16px" }}>Solution Details</List.Item>    {/* aishwarya */}
                <Form style={{ fontSize: "16px" }}>                                                      {/* aishwarya */}
                  <TextArea placeholder="Tell us more" value={Solvediscription} rows={3} />
                </Form>

                <br />
                {/* <Form>
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Prepare & upload report"
                      placeholder="Prepare & upload report"
                      value={purposeReport}
                      required
                    />
                  </Form.Group>
                </Form> */}

<label style={{ fontWeight: "bold" }} className="labelcolor">Report Upload</label>  
                <hr />
                <Grid columns={3} relaxed>
                  {this.state.reportsDataList.map(i => (
                    <Grid.Column>
                      <Button color="purple" circular>
                        {i.name} &nbsp;&nbsp;

                    <Icon size="large" name="cloud download" onClick={() => this.downloadDocument(i.link)} />

                      </Button>
                    </Grid.Column>
                  ))}
                </Grid>
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }} />
        </PageContainer2>

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
                style={{ fontSize: "16px" }}       //Aishwarya
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
                style={{ fontSize: "16px" }}       //Aishwarya  
              >
                <label className="labelcolor" style={{ width: "5em" }}>
                  Type of Call :-
                </label>
                <br />
                <br />
                <label className="labelcolor">{this.state.calltypeid}</label>
                <br />

                <br />
                <Form
                  style={{ fontSize: "16px" }}       //Aishwarya  
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
                style={{ fontSize: "16px" }}       //Aishwarya  
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
                style={{ fontSize: "16px" }}       //Aishwarya  
              >
                <hr />

                <label className="labelcolor" style={{ width: "5em" }}>
                  <b>Type of Meeting </b>
                </label>
                <br />
                <br />
                <label>{this.state.meetingtypeId}</label>
                <hr />
                <Form
                  style={{ fontSize: "16px" }}       //Aishwarya  
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
                <div />
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
                style={{ fontSize: "16px" }}       //Aishwarya  
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
              <div>
                <label>
                  <b>Type Of Visit </b>
                </label>
                <br />
                <label>{visitTypeid}</label>
                <br />
                <br />

                <Form
                  style={{ fontSize: "16px" }}       //Aishwarya  
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

                  <Form.Group widths="equal">
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
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Input
                      label="Km`s  Travlled"
                      placeholder="Km`s  Travlled"
                      type="text"
                      value={travel}
                      onChange={this.handleTravel}
                      required
                    />

                    <Form.Input
                      label="Visit Amount"
                      placeholder="Visit Amount"
                      type="text"
                      value={vamount}
                      onChange={this.handleiVsitAmount}
                      required
                    />
                  </Form.Group>
                </Form>

                <br />
              </div>
            </div>
          </Modal.Content>
        </Modal>
        {/*Aishwarya 28 May*/}
        <Modal size={size1} open={open1} onClose={() => this.close()} closeIcon>
          <Modal.Content>
            <TextColor>
              Do you want to delete this item?
          </TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
          </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.delete()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const btnColor = {
  backgroundColor: "#863577",
  color: "white"
}

export default ViewTixy
