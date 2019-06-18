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
  Form, List
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
  MainDivHolder,
  TextColor
} from "../styledComps"
import { tixy, leadlist, clientCondition, actionImageLink, detailsOfContract } from "../component/Api";
import SuccessModal from "../component/SuccessModal"
import RawCarousel from "../component/RawCarousel"




class ViewAction extends Component {
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
    isSucess: false,
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
    ToDate: "",
    FromDate: "",
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
    Totime: "",
    Fromtime: "",
    Calltime: "",
    Meetingtime: "",
    leaadData: [],
    tixyData: [],
    isLoadingLead: false,
    resultsLead: [],
    valueLead: "",
    SelectedResultLead: {},
    SelectedResultTixy: {},
    isLoadingTixy: false,
    resultsTixy: [],
    valueTixy: "",
    aid: "",
    ticketid: '',
    leadid: '',
    actionId: '',
    callId: '',
    visitId: '',
    meetingId: '',
    AscId: '',
    contractData: [],
    open1: false,              //Aishwarya 30 May
    open: false,                        //Aishwarya 30 May
    SelectedTicket: "",        //aishwarya 30 may
    SelectedAction: "",        //aishwarya 30 may
    redirectToAction: false, //aishwarya 29 may

  }


  getContractDetails = (id) => {
    fetch(detailsOfContract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("contract data", data)

        if (data.records == []) {
          this.setState({ contractData: [] })
          console.log("No Images is available")
        } else {

          this.setState({ contractData: data.records })
        }
      })
  }


  actionImages = (id) => {

    fetch(actionImageLink, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        actionId: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("image data", data.records)
        if (data.records == []) {
          this.setState({ ImageData: [] })
          console.log("No Images is available")
        } else {
          console.log("action images Data", data.records)
          this.setState({ ImageData: data.records })
        }
      })
  }




  clientDetails = (id) => {
    console.log('id', id);

    fetch(clientCondition, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cid: id
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
            Name: cdata[0].company_name,
            Phno: cdata[0].number,
            cname: cdata[0].cname1,
            email: cdata[0].email,
            Address: cdata[0].address
          })
        }
        else {
          console.log("No data")
        }
      })
  }





  componentDidMount() {

    let actionEdit;

    if (JSON.parse(sessionStorage.getItem("editTicket") === null)) {
      console.log("Nodata")
    } else {

      actionEdit = JSON.parse(sessionStorage.getItem("editTicket"))
      console.log('action', actionEdit);

      let actionType = actionEdit.type_of_action

      switch (actionType) {
        case 'call':

          this.setState({
            action: actionEdit.type_of_action,
            cid: actionEdit.clientId,
            CallexOutCome: actionEdit.callExpected_Outcome,
            CallactualOutcome: actionEdit.callActual_Outcome,
            Calldiscription: actionEdit.call_description,
            CallDate: actionEdit.fromDate,
            Calltime: actionEdit.from_time,
            call: actionEdit.typeofCall,
            valueTixy: actionEdit.ticket_id,
            valueLead: actionEdit.lead_id,
            ticketid: actionEdit.ticket_id,
            leadid: actionEdit.lead_id,
            valueAssign: actionEdit.AssignId,
            aid: actionEdit.AssignId,
            actionId: actionEdit.action_id,
            callId: actionEdit.callId,
          })
          break;

        case 'visit':

          if (actionEdit.ascId) {
            this.getContractDetails(actionEdit.ascId)
          }

          this.setState({
            action: actionEdit.type_of_action,
            cid: actionEdit.clientId,
            visitId: actionEdit.visitId,
            exOutCome: actionEdit.visit_Expected_outcome,
            actualOutcome: actionEdit.visit_Actual_outCome,
            vamount: actionEdit.visit_amount,
            discription: actionEdit.visit_description,
            FromDate: actionEdit.fromDate,
            ToDate: actionEdit.to_date,
            Fromtime: actionEdit.from_Time,
            Totime: actionEdit.to_Time,
            visit: actionEdit.type_of_visit,
            valueTixy: actionEdit.ticket_id,
            valueLead: actionEdit.lead_id,
            ticketid: actionEdit.ticket_id,
            leadid: actionEdit.lead_id,
            valueAssign: actionEdit.AssignId,
            aid: actionEdit.AssignId,
            actionId: actionEdit.action_id,
            travel: actionEdit.Km_Travelled,
            AscId: actionEdit.ascId
          })


          break;


        case 'meeting':

          this.setState({
            action: actionEdit.type_of_action,
            cid: actionEdit.clientId,
            meetingId: actionEdit.meetingId,
            MexOutCome: actionEdit.meeting_expected_outcome,
            MactualOutcome: actionEdit.meeting_actual_outcome,
            Mdiscription: actionEdit.description,
            MDate: actionEdit.fromDate,
            Meetingtime: actionEdit.Time,
            meeting_Type: actionEdit.type_of_meeting,
            valueTixy: actionEdit.ticket_id,
            valueLead: actionEdit.Lead_id,
            ticketid: actionEdit.ticket_id,
            leadid: actionEdit.Lead_id,
            valueAssign: actionEdit.AssignId,
            aid: actionEdit.AssignId,
            actionId: actionEdit.action_id,
          })

          break;

        default:
          break;

      }
    }

    this.clientDetails(actionEdit.clientId)
    this.actionImages(actionEdit.action_id)

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
      isopen: false
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



  handleAction = e => {
    console.log("action", e.target.value)

    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break;

      case 'visit':
        this.setState({ checked: true })

        break;

      case 'meeting':
        this.setState({ isMeeting: true })
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
  //Aishwarya 30 may
  close = () => this.setState({ open: false, open1: false })
  //Aishwarya 30 may
  show = (size1, i, j) => {
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
    this.setState({ SelectedAction: j })
    console.log('i', i)
    console.log('j', j)
  }

  //Aishwarya 30 may
  delete = () => {

    console.log('selected id', this.state.SelectedTicket)
    console.log('selected type', this.state.SelectedAction)

    fetch("http://35.161.99.113:9000/webapi/t_visit/t_deleteVisit", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        v_id: this.state.SelectedTicket,
        type_of_action: this.state.SelectedAction,
      })
    })

      .then(data => {
        console.log('selected id', this.state.SelectedTicket)
        console.log('selected type', this.state.SelectedAction)
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('data', data.records)
        this.close()
        setTimeout(() => {
          // window.location.reload()
          this.setState({ isSucess: true, redirectToAction: true })
        }, 1000)
      })
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

      isLoadingLead, resultsLead, valueLead, ticketid, leadid, aid,
      isLoadingTixy, resultsTixy, valueTixy, isSucess, ImageData,

      size1,       //Aishwarya 30 may
      open1, //Aishwarya 30 may
      open,         //Aishwarya 30 May

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
              <HeadingText>View Action</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditAction">
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
            {/*Aishwarya 29 May*/}
            <Button
              size='small'
              floated='right'
              style={{
                margin: "10px",
                marginRight: "40px",
                backgroundColor: "#863577",
                color: "#fff"
              }}
              onClick={() => this.show("tiny", this.state.actionId, this.state.action)}
            >
              Delete
      </Button>
            {this.state.redirectToAction && <Redirect to="/Action" push />}            {/*Aishwarya 30 May*/}
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}       //Aishwarya 18/5/19
                >Client</label>
                <hr />


                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Name -</span>
                    </Box>
                    <Box2>
                      <span>{Name}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Mobile No </span>
                    </Box>
                    <Box2>
                      <span>{Phno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Email Id -</span>
                    </Box>
                    <Box2>
                      <span>{email}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Address -</span>
                    </Box>
                    <Box2>
                      <span>{Address}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                </MainDivHolder>

              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}       //Aishwarya 18/5/19
                >Action</label>
                <hr /><br />

                <Grid reversed='mobile' columns='equal'>
                  <Grid.Column>
                    <label style={{ fontSize: "16px" }}>Ticket Id- {ticketid}</label><br /><br />       {/*Aishwarya 18/5/19*/}

                  </Grid.Column>

                  <Grid.Column>
                    <label style={{ fontSize: "16px" }}>Lead id- {leadid}</label><br /><br />         {/*Aishwarya 18/5/19*/}

                  </Grid.Column>

                  {parseInt(this.state.AscId) > 0 ? (
                    <Grid.Column>
                      <label style={{ fontSize: "16px" }}>Asc Id- {this.state.AscId}</label><br /><br />        {/*Aishwarya 18/5/19*/}
                    </Grid.Column>
                  ) : (
                      <p></p>
                    )}

                </Grid>

                <hr />

                {this.state.contractData.length > 0 ? (
                  <div>
                    <Grid relaxed columns={3}>
                      <Grid.Column>
                        <label style={{ fontSize: "16px", fontWeight: "bold" }}  >Assign Employee -</label>      {/*Aishwarya 18/5/19*/}
                      </Grid.Column>
                      <Grid.Column >
                        <p>{this.state.contractData[0].aname}</p>
                      </Grid.Column>
                    </Grid>

                    <br />

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
                            {this.state.contractData[0].oit}
                          </Table.Cell>
                          <Table.Cell> {this.state.contractData[0].oitDate1}</Table.Cell>
                          <Table.Cell>{this.state.contractData[0].oitDate2}</Table.Cell>

                        </Table.Row>
                      </Table.Body>
                    </Table>




                    <br />

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
                            {this.state.contractData[0].breakdown}
                          </Table.Cell>
                          <Table.Cell> {this.state.contractData[0].breakdownDate1}</Table.Cell>
                          <Table.Cell>{this.state.contractData[0].breakdownDate2}</Table.Cell>

                        </Table.Row>
                      </Table.Body>
                    </Table>



                    <br />

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
                            {this.state.contractData[0].overhauling}
                          </Table.Cell>
                          <Table.Cell> {this.state.contractData[0].overhulingDate1}</Table.Cell>
                          <Table.Cell>{this.state.contractData[0].overhulingDate2}</Table.Cell>

                        </Table.Row>
                      </Table.Body>
                    </Table>

                  </div>
                ) : (
                    <div>

                      <Form
                        style={{ fontSize: "16px" }}                //Aishwarya 18/5/19
                      >
                        <label style={{ fontWeight: "bold" }}  >Action Type</label>      {/*Aishwarya 18/5/19*/}
                        <hr />


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


                        {action == "meeting" && (
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
                        )}




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
                                <label>Assign Employee</label>
                              </Grid.Column>
                              <Grid.Column >
                                <label>{aid}</label>
                              </Grid.Column>
                            </Grid>

                            <br />


                            <Grid reversed='mobile' columns='equal'>
                              <Grid.Column>
                                <label>From Date - {MDate}</label>


                              </Grid.Column>

                              <Grid.Column>
                                <label>From Time - {Meetingtime}</label>

                              </Grid.Column>
                            </Grid><hr />



                            <br />

                            <Form widths='equal'>
                              <Form.Group>

                                <label className="labelcolor">Type of Meeting - {meeting_Type}</label><br />
                                <br />

                              </Form.Group>
                            </Form>




                            <Grid reversed='mobile' columns='equal'>
                              <Grid.Column>
                                <label>Meeting Expected Outcome - {MexOutCome}</label> <br /><br />

                              </Grid.Column>

                              <Grid.Column>
                                <label>Meeting actual outcome - {MactualOutcome}</label><br /><br />

                              </Grid.Column>
                            </Grid><hr />

                            <Form>
                              <label className="labelcolor">Meeting Description :</label><br />
                              <br />
                              <TextArea
                                placeholder='Tell us more'
                                value={Mdiscription}
                                onChange={this.handleMdiscribe}
                                rows={10}
                                disabled={true}
                              />
                            </Form>

                            <br />
                          </div>
                        )}

                        {action == "call" && (
                          <div>


                            <Grid relaxed columns={3}>
                              <Grid.Column>
                                <label style={{ fontSize: "16px", fontWeight: "bold" }}  >Assign Employee -</label>      {/*Aishwarya 18/5/19*/}
                              </Grid.Column>
                              <Grid.Column >
                                <label style={{ fontSize: "16px" }}>{aid}</label>        {/*Aishwarya 18/5/19*/}
                              </Grid.Column>
                            </Grid>

                            <br />


                            <Grid reversed='mobile' columns='equal'>
                              <Grid.Column>
                                <label style={{ fontSize: "16px", fontWeight: "bold" }}>From Date -</label>       {/*Aishwarya 18/5/19*/}
                                <label> {this.state.CallDate}</label>                 {/*Aishwarya 18/5/19*/}

                              </Grid.Column>

                              <Grid.Column>
                                <label style={{ fontSize: "16px", fontWeight: "bold" }}>From Time - </label>          {/*Aishwarya 18/5/19*/}
                                <label>{this.state.Calltime}</label>                  {/*Aishwarya 18/5/19*/}
                              </Grid.Column>
                            </Grid><hr />



                            <Form widths='equal' style={{ fontSize: "16px" }}>           {/*Aishwarya 18/5/19*/}
                              <Form.Group >

                                <br />


                                <hr />

                                <label className="labelcolor" style={{ fontWeight: "bold" }}>Type of Call :- {call}</label><br />         {/*Aishwarya 18/5/19*/}
                                <br />
                              </Form.Group>
                              <Form style={{ fontSize: "16px" }}>           {/*Aishwarya 18/5/19*/}



                                <Grid reversed='mobile' columns='equal'>
                                  <Grid.Column>
                                    <label style={{ fontWeight: "bold" }}>Call Expected Outcome - </label>    {/*Aishwarya 18/5/19*/}
                                    <label>{CallexOutCome}</label>      {/*Aishwarya 18/5/19*/}

                                  </Grid.Column>

                                  <Grid.Column>
                                    <label style={{ fontWeight: "bold" }}>Call actual outcome - </label>      {/*Aishwarya 18/5/19*/}
                                    <label>{CallactualOutcome}</label>        {/*Aishwarya 18/5/19*/}

                                  </Grid.Column>
                                </Grid><hr />


                                <label className="labelcolor" style={{ fontWeight: "bold" }}>Call Description :</label><br />      {/*Aishwarya 18/5/19*/}
                                <br />
                                <TextArea
                                  placeholder='Tell us more'
                                  value={Calldiscription}
                                  onChange={this.handleCallDiscribe}
                                  rows={10}
                                  disabled={true}
                                />

                              </Form>
                              <br />

                            </Form>
                          </div>
                        )}


                        {action == "visit" && (
                          <div>


                            <Grid reversed='mobile' columns='equal'>
                              <Grid.Column>
                                <label style={{ fontSize: "16px", fontWeight: "bold" }}  >Assign Employee -</label>      {/*Aishwarya 18/5/19*/}


                              </Grid.Column>

                              <Grid.Column>
                                <label style={{ fontSize: "16px" }}>{aid}</label>        {/*Aishwarya 18/5/19*/}

                              </Grid.Column>
                            </Grid><hr />

                            <br />



                            <Grid reversed='mobile' columns='equal'>
                              <Grid.Column>
                                <label style={{ fontSize: "16px", fontWeight: "bold" }}>From Date - </label>         {/*Aishwarya 18/5/19*/}
                                <label style={{ fontSize: "16px" }}> {FromDate}</label>         {/*Aishwarya 18/5/19*/}

                              </Grid.Column>

                              <Grid.Column>
                                <label style={{ fontSize: "16px", fontWeight: "bold" }}>To Date - </label>               {/*Aishwarya 18/5/19*/}
                                <label style={{ fontSize: "16px" }}>{ToDate}</label>                  {/*Aishwarya 18/5/19*/}
                              </Grid.Column>
                            </Grid><hr />


                            <Grid columns='equal'>
                              <Grid.Row>
                                {/* 
  <Grid.Column>
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
</Grid.Column> 
*/}
                                <Grid.Column>
                                  <label style={{ fontSize: "16px", fontWeight: "bold" }}>Select From Time- </label>         {/*Aishwarya 18/5/19*/}
                                  <label style={{ fontSize: "16px" }}>{Fromtime}</label>            {/*Aishwarya 18/5/19*/}

                                </Grid.Column>
                                <Grid.Column>
                                  <label style={{ fontSize: "16px", fontWeight: "bold" }}>Select To Time - </label>          {/*Aishwarya 18/5/19*/}
                                  <label style={{ fontSize: "16px" }} >{Totime}</label>                {/*Aishwarya 18/5/19*/}
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>

                            <br />

                            <div>

                              <Form style={{ fontSize: "16px" }}>              {/*Aishwarya 18/5/19*/}
                                <Form.Group widths="equal">

                                  <hr />

                                  <label className="labelcolor" style={{ fontWeight: "bold" }}>Type of Visit :- {visit}</label><br />        {/*Aishwarya 18/5/19*/}
                                  <br />
                                </Form.Group>
                              </Form>

                              <Form style={{ fontSize: "16px" }}>              {/*Aishwarya 18/5/19*/}
                                <label className="labelcolor" style={{ fontWeight: "bold" }}>Visit Description :</label><br />              {/*Aishwarya 18/5/19*/}
                                <br />
                                <TextArea
                                  placeholder='Tell us more'
                                  value={discription}
                                  onChange={this.handleDiscribe}
                                  rows={6}
                                  disabled
                                />
                                <br /><br />



                                <Grid reversed='mobile' columns='equal'>
                                  <Grid.Column>
                                    <label style={{ fontWeight: "bold" }}>Visit Expected Outcome - </label>           {/*Aishwarya 18/5/19*/}
                                    <label>{exOutCome}</label>                    {/*Aishwarya 18/5/19*/}

                                  </Grid.Column>

                                  <Grid.Column>
                                    <label style={{ fontWeight: "bold" }}>Visit actual outcome - </label>         {/*Aishwarya 18/5/19*/}
                                    <label>{actualOutcome}</label>                    {/*Aishwarya 18/5/19*/}

                                  </Grid.Column>
                                </Grid><hr />
                                <Grid reversed='mobile' columns='equal'>
                                  <Grid.Column>
                                    <label style={{ fontWeight: "bold" }}>Km`s  Travlled -</label>                {/*Aishwarya 18/5/19*/}
                                    <label> {travel}</label>                  {/*Aishwarya 18/5/19*/}

                                  </Grid.Column>

                                  <Grid.Column>
                                    <label style={{ fontWeight: "bold" }}>Visit Amount - </label>                   {/*Aishwarya 18/5/19*/}
                                    <label>{vamount}</label>                    {/*Aishwarya 18/5/19*/}

                                  </Grid.Column>
                                </Grid><hr />

                                <Form.Group widths="equal">
                                </Form.Group>
                              </Form>
                              <br />

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
                <label style={{ fontSize: "16px", fontWeight: "bold" }}>Image</label>                  {/*Aishwarya 18/5/19*/}
                <hr />



                <RawCarousel imageData={ImageData && ImageData.length >= 0 && ImageData || []} />

              </Segment>
            </TixyContent>
          </ContentArea>


        </PageContainer2>



        {this.state.redirectToAsset && <Redirect to="/Action" push />}

        {/*aishwarya 30 may*/}
        <Modal
          size={size1}
          open={open1}
          onClose={() => this.close()}
          closeIcon
          className="alertOfFileds"
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item.</TextColor>
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

const resultRendererTixy = ({ company_name, tixyId }) => (
  <span>
    <Header as="h4">Company Name -{company_name}</Header>
    <Header as="h4">Ticket ID-{tixyId}</Header>

  </span>
)

const resultRendererLead = ({ company_name, leadId, number }) => (
  <List.List>
    <span>
      <Header as="h4">{company_name}</Header>
    </span>
    <List.Item>Lead Id - {leadId}</List.Item>
    <List.Item>{number}</List.Item>
  </List.List>
)

const formInput = {
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color: "#ffffff",
  padding: "14px",
  width: "31em"
}

export default ViewAction
