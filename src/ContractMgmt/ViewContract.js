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
  Form
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import ErrorModal from "../component/ErrorModal"
import SuccessModal from "../component/SuccessModal"
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
import { contract } from "../component/base"

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
  verticalService, clientList,
  ItemList,
  clientCondition, updateContract,
  listDocument
} from "../component/Api"

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
  TableContent,
  MainDivHolder,
  MainDiv2,
  Box,
  Box2,
  TextColor
} from "../styledComps.js"

import StarRatingComponent from "react-star-rating-component"
import RawCarousel from "../component/RawCarousel"

class ViewContract extends Component {
  state = {
    uploadedfileName: [],
    Name: '',
    address: '',
    Phno: '',
    discription: '',
    isLoading: false,
    value: '',
    results: [],
    SelectedResult: {},
    uploadedfileurl: '',
    isOpen: false,
    uploadedFile: [],
    activeItem: 'Add Items',
    clientData: [],
    verticalData: [],
    Vertical: '',
    srNo: '',
    fromDate: '',
    toDate: '',
    warrentyFromDate: '',
    warrentyToDate: '',
    typeOfContract: '',
    natureOfContract: '',
    ascStage: '',
    contracttenureFromDate: '',
    contracttenureToDate: '',
    price: 0,
    terms: '',
    formData: [],
    itemArray: [],
    cannotChangeCust: true,
    itemBeingEdited: "",
    CustomerData: [],
    editContractData: {},
    documentList: [],
    oit: '',
    breakdown: '',
    overhauling: '',
    aname: '',
    lastAction: '',
    oitDate1: '',
    oitDate2: '',
    oitDate3: '',
    oitDate4: '',
    oitDate5: '',
    oitDate6: '',
    breakdownDate1: '',
    breakdownDate2: '',
    breakdownDate3: '',
    breakdownDate4: '',
    breakdownDate5: '',
    breakdownDate6: '',
    OverhulingDate1: '',
    OverHulingDate2: '',
    OverHulingDate3: '',
    OverHulingDate4: '',
    OverHulingDate5: '',
    OverHulingDate6: '',
    open1: false,              //Aishwarya 30 May
    open: false,                        //Aishwarya 30 May
    SelectedTicket: "",         //aishwarya 30 may
    ContractId: 0,            //aishwarya 30 may
    isSucess: false,           //aishwarya 30 may
    redirectToContract: false, //aishwarya 29 may
  }

  clientDataList = () => {
    fetch(clientList, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('client data', data.records)
        if (data.records) {
          this.setState({ clientData: data.records })
        } else {
          console.log('No Client')
          this.setState({ clientData: [] })
        }
      })
  }

  listVertical = () => {
    fetch(verticallist, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('vertical list', data.records)
        if (data.records) {
          this.setState({ verticalData: data.records })
          // let vid
          // data.records.map(i => {
          //   if (i.vertical == this.state.Vertical) {
          //     vid = i.id
          //   }
          // })
          // this.listAsset(this.state.Vertical)
        } else {
          console.log('No vertical')
          this.setState({ verticalData: [] })
        }
      })
  }

  documentDataList = (id) => {
    fetch(listDocument, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        contractId: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('Data list', data.records)
        if (data.records) {
          this.setState({ uploadedfileName: data.records })

        } else {
          console.log('No documents')
          this.setState({ uploadedfileName: [] })
        }
      })
  }



  ItemDataList = (id) => {

    fetch(ItemList, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        contractId: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('item list', data.records)
        if (data.records) {
          this.setState({ itemArray: data.records })

        } else {
          console.log('No vertical')
          this.setState({ itemArray: [] })
        }
      })

  }

  clientInfo = (id) => {
    fetch(clientCondition, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        cid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('customer Data', data.records)
        if (data.records) {
          this.setState({ CustomerData: data.records, SelectedResult: data.records[0] })

        } else {
          console.log('No vertical')
          this.setState({ CustomerData: [] })
        }
      })

  }

  componentDidMount() {
    // this.clientDataList()
    let user = JSON.parse(sessionStorage.getItem("editTicket"))
    if (user) {
      console.log("In User List  checck my side", user)
      this.setState({
        breakdown: user.breakdown,
        checkDate: user.checkDate,
        oit: user.oit,
        overhauling: user.overhauling,
        aname: user.aname,
        lastAction: user.lastAction,
        oitDate1: moment(user.oitDate1).format("YYYY-MM-DD"),
        oitDate2: moment(user.oitDate2).format("YYYY-MM-DD"),
        oitDate3:moment(user.oitDate3).format('YYYY-MM-DD'),
        oitDate4:moment(user.oitDate4).format('YYYY-MM-DD'),
        oitDate5:moment(user.oitDate5).format('YYYY-MM-DD'),
        oitDate6:moment(user.oitDate6).format('YYYY-MM-DD'),
        breakdownDate1: moment(user.breakdownDate1).format("YYYY-MM-DD"),
        breakdownDate2: moment(user.breakdownDate2).format("YYYY-MM-DD"),
        breakdownDate3:moment(user.breakdownDate3).format('YYYY-MM-DD'),
        breakdownDate4:moment(user.breakdownDate4).format('YYYY-MM-DD'),
        breakdownDate5:moment(user.breakdownDate5).format('YYYY-MM-DD'),
        breakdownDate6:moment(user.breakdownDate6).format('YYYY-MM-DD'),
        OverhulingDate1: moment(user.overhulingDate1).format("YYYY-MM-DD"),
        OverHulingDate2: moment(user.overhulingDate2).format("YYYY-MM-DD"),
        OverHulingDate3:moment(user.overhulingDate3).format('YYYY-MM-DD'),
        OverHulingDate4:moment(user.overhulingDate4).format('YYYY-MM-DD'),
        OverHulingDate5:moment(user.overhulingDate5).format('YYYY-MM-DD'),
        OverHulingDate6:moment(user.overhulingDate6).format('YYYY-MM-DD'),
        ContractId: user.id,
      })
      this.setState({ editContractData: user })
      this.ItemDataList(user.id)
      this.documentDataList(user.id)
      this.clientInfo(user.custId)
    }

    this.listVertical()
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

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
  handleProgress = progress => this.setState({ progress })
  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }
  handleUploadSuccess = filename => {
    console.log("File Name is", filename)
    this.state.uploadedfileName.push(filename)
    this.setState({ progress: 100, isUploading: false })
    contract
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ uploadedfileurl: url, msg1: "" })
        this.state.uploadedFile.push(url)
      })

    setTimeout(() => {
      if (this.state.progress == 100) {
        this.setState({ filename: "", progress: 0 })
      } else {
        console.log("error in upload")
      }
    }, 1000)
  }

  deleteDocument = i => {
    let a = this.state.uploadedfileName.indexOf(i)
    if (a > -1) {
      this.state.uploadedfileName.splice(a, 1)
    }

    this.setState({ uploadedfileName: this.state.uploadedfileName })
    console.log("after delete", this.state.a)
    console.log("after delete assignedRole", this.state.uploadedfileName)
    console.log("now fname array is", this.state.uploadedfileName)
    // }else if(this.state.isChecked == false) {
    //     console.log("Not Selected")
    // }
  }

  downloadDocument = i => {
    // for(let i=0;i<this.state.uploadedFile.length;i++){

    // console.log("file arr", this.state.uploadedfileName)
    // console.log("file arr", this.state.uploadedFile)

    // var a = this.state.uploadedfileName.indexOf(i)

    // let downloadUrl = this.state.uploadedFile[a]

    console.log("download url is", i)

    window.open(i)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  editItem = item => {
    this.setState({
      Vertical: item.vertical,
      typeOfContract: item.toc,
      price: item.price,
      itemBeingEdited: item.id,
      fromDate: item.doc,
      srNo: item.srno,
      warrentyFromDate: item.warrantyFrom,
      typeOfContract: item.toc,
      natureOfContract: item.noc,
      ascStage: item.ascStage,
      contracttenureFromDate: item.tenureFrom,
      contracttenureToDate: item.tenureTo,
      terms: item.ptc
    })
  }

  //Aishwarya 30 may
  close = () => this.setState({ open: false, open1: false })
  //Aishwarya 30 may
  show = (size1, i) => {
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
    console.log('i', i)
  }

  //Aishwarya 30 may
  delete = () => {

    //console.log(i.id)
    console.log(this.state.SelectedTicket)
    fetch("http://35.161.99.113:9000/webapi/contract/deleteContract", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contractId: this.state.SelectedTicket
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
          // window.location.reload()
          this.setState({ isSucess: true, redirectToContract: true })
        }, 1000)
      })
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }
    let {
      Name,
      value,
      isLoading,
      results,
      SelectedResult,
      activeItem,
      size1,       //Aishwarya 30 may
      open1, //Aishwarya 30 may
      open,         //Aishwarya 30 May
    } = this.state

    console.log("Selected Result", activeItem)

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
            <Link to="/Contract">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Contract Managment</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditContract">
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
              onClick={() => this.show("tiny", this.state.ContractId)}
            >
              Delete
       </Button>
            {this.state.redirectToContract && <Redirect to="/Contract" push />}            {/*Aishwarya 30 May*/}
          </div>

          <HeadingDiv>
            <Menu secondary
              style={{ fontSize: "16px" }}                     //Aishwarya   17/5/19
            >
              <Menu.Item
                name="Add Items"
                active={activeItem === "AddItems"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Upload Files"
                active={activeItem === "upload"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Generate Schedule"
                active={activeItem === "Generate Schedule"}
                onClick={this.handleItemClick}
              />
            </Menu>
          </HeadingDiv>

          {activeItem === "Add Items" && (
            <div>

              <ContentArea>
                <TixyContent>
                  <Segment padded style={{ height: "100%" }}>
                    <label
                      style={{ fontSize: "16px", fontWeight: "bold" }}                     //Aishwarya   17/5/19  
                    >View Item</label>
                    <hr />
                    <Table celled fixed singleLine>
                      <Table.Header>
                        <Table.Row
                          style={{ fontSize: "16px" }}                     //Aishwarya   17/5/19  
                        >
                          <Table.HeaderCell>Customer Name</Table.HeaderCell>
                          <Table.HeaderCell>Contract Type</Table.HeaderCell>
                          <Table.HeaderCell>
                            Unit Model / Sr.No
                        </Table.HeaderCell>
                          <Table.HeaderCell>Vertical</Table.HeaderCell>
                          <Table.HeaderCell>DOC</Table.HeaderCell>
                          <Table.HeaderCell>Warranty From</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                          <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {this.state.itemArray.map(item => (
                          <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.toc}</Table.Cell>
                            <Table.Cell>{item.srno}</Table.Cell>
                            <Table.Cell>{item.vertical}</Table.Cell>
                            <Table.Cell>{item.doc}</Table.Cell>
                            <Table.Cell>{item.warrantyFrom}</Table.Cell>
                            <Table.Cell>{item.price}</Table.Cell>
                            <Table.Cell>
                              <Button
                                onClick={() => this.editItem(item)}
                                color="green"
                              >
                                Edit
                            </Button>

                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Segment>
                </TixyContent>
              </ContentArea>
              <ContentArea>
                <TixyContent style={{ flex: 1 }}>
                  <Segment padded style={{ height: "100%" }}>
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Customer Information</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>

                      <br />

                      <MainDiv2>
                        <Box>
                          <span>last Action -</span>
                        </Box>
                        <Box2>
                          <span>{this.state.lastAction}</span>
                        </Box2>
                      </MainDiv2>
                      <br />

                      <MainDiv2>
                        <Box>
                          <span>ASC ID :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer Name :</span>
                        </Box>
                        <Box2>
                          <span>{this.state.SelectedResult.company_name}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Site Address :</span>
                        </Box>
                        <Box2>
                          <span>{this.state.SelectedResult.address}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Contact person :</span>
                        </Box>
                        <Box2>
                          <span>{this.state.SelectedResult.cname1}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Designation :</span>
                        </Box>
                        <Box2>
                          <span>{this.state.SelectedResult.Designation1}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Mobile Number :</span>
                        </Box>
                        <Box2>
                          <span>{this.state.SelectedResult.number}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>E-mail :</span>
                        </Box>
                        <Box2>
                          <span>{this.state.SelectedResult.email}</span>
                        </Box2>
                      </MainDiv2>
                      <br />

                      <MainDiv2>
                        <Box>
                          <span>Assign User</span>
                        </Box>
                        <Box2>
                          <span>{this.state.aname}</span>
                        </Box2>
                      </MainDiv2>
                      <br />

                    </MainDivHolder>
                  </Segment>
                </TixyContent>
                <TixyContent style={{ flex: 1 }}>
                  <Segment padded style={{ height: "100%" }}>
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <span>Vertical : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.Vertical}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Unit Model : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.srNo}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Date of commissioning : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.fromDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Warranty valid upto : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.warrentyFromDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Type of contract : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.typeOfContract}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Nature of contract : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.natureOfContract}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>ASC Stage : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.ascStage}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Contract tenure : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.contracttenureFromDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Price : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.price}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Payment terms & conditions : </span>
                        </Box>
                        <Box2>
                          <span>{this.state.terms}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                    </MainDivHolder>
                  </Segment>
                </TixyContent>
              </ContentArea>



            </div>
          )}

          {activeItem === "Upload Files" && (
            <ContentArea>
                 <Segment padded style={{ height: "100%" ,width:'50%',left:'25%'}}>
              <TixyContent style={{ flex: 1, height: "100vh" }}>
                <h4>Document</h4>
                <hr />

                <Table celled fixed singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>File</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {this.state.uploadedfileName.map(i => (
                      <Table.Row>
                        <Table.Cell>{i.name}</Table.Cell>
                        <Table.Cell>
                          <Button
                            color="purple"
                            style={{
                              backgroundColor: "#863577",
                              color: "#ffffff"
                            }}
                          >
                            {i.name}
                          </Button>


                          <Icon
                            size="large"
                            name="cloud download"
                            onClick={() => this.downloadDocument(i.link)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>

                <br />
                <center>
                  <font color="red">{this.state.msg1}</font>
                </center>
              </TixyContent>
              </Segment>
              {/* <TixyContent style={{ flex: 1 }} /> */}
            </ContentArea>
          )}

          {activeItem === "Generate Schedule" && (
            <ContentArea>
              <TixyContent style={{ flex: 1, height: "100vh" }}>
                <Segment  style={{ left:'50%'}} >


                  <MainDivHolder>
                    <MainDiv2>
                      <Box>
                        <h4>Generate Schedule</h4>
                      </Box>
                      <Box2 />
                    </MainDiv2>

                    <br />
                    <MainDiv2>
                      <Box>
                        <span>OIT(Once in 2 months) :</span>
                      </Box>
                      <Box2>
                        <span >{this.state.oit}</span>
                      </Box2>
                    </MainDiv2>

                    <br />
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>

                      <Form.Group inline widths={3}>
                        <label style={{ padding: "0px 8px 0px 8px" }}>OIT Date1 : {this.state.oitDate1}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>OIT Date2 :{this.state.oitDate2}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>OIT Date3 :{this.state.oitDate3}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>OIT Date4 :{this.state.oitDate4}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>OIT Date5 :{this.state.oitDate5}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>OIT Date6 :{this.state.oitDate6}</label>
                      </Form.Group>
                    </div>
                    <br />
                    <MainDiv2>

                      <span>Breakdown :</span>
                      <Box2>
                        <span>{this.state.breakdown}</span>
                      </Box2>
                    </MainDiv2>
                    <br />

                    <div style={{ display: "flex", justifyContent: "flex-start" }}>

                      <Form.Group inline widths={3}>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Breakdown Date1 : {this.state.breakdownDate1}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Breakdown Date2 :{this.state.breakdownDate2}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Breakdown Date3 :{this.state.breakdownDate3}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Breakdown Date4 :{this.state.breakdownDate4}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Breakdown Date5 :{this.state.breakdownDate5}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Breakdown Date6 :{this.state.breakdownDate6}</label>
                      </Form.Group>
                    </div>
                    <br />


                    <MainDiv2>

                      <span>Overhuling (O/H) :</span>

                      <Box2>
                        <span>{this.state.overhauling}</span>
                      </Box2>
                    </MainDiv2>
                    <br />

                    <div style={{ display: "flex", justifyContent: "flex-start" }}>

                      <Form.Group inline widths={3}>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Overhuling Date1 : {this.state.OverhulingDate1}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Overhuling Date2 :{this.state.OverHulingDate2}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Overhuling Date3 :{this.state.OverHulingDate3}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Overhuling Date4 :{this.state.OverHulingDate2}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Overhuling Date5 :{this.state.OverHulingDate2}</label>
                        <label style={{ padding: "0px 8px 0px 8px" }}>Overhuling Date6 :{this.state.OverHulingDate2}</label>
                      </Form.Group>
                    </div>
                    <br />


                    <MainDiv2>

                      <span>check up date :</span>

                      <Box2>
                        <span>{this.state.checkDate}</span>
                      </Box2>
                    </MainDiv2>
                    <br />


                  </MainDivHolder>






                </Segment>
              </TixyContent>
              <TixyContent style={{ flex: 1 }} />
            </ContentArea>
          )}
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
        </PageContainer2>
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

export default ViewContract
