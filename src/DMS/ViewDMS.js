import React, { Component } from "react"
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
  Icon,
  Header,
  Input,
  Table,
  Modal, Checkbox, List,
  Form, Label, Progress, Message
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import matthew from "../component/Image/matthew.png"

import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { MyTeam_fbs } from "../component/base"
import ErrorModal from '../component/ErrorModal'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment"
import { DMS } from "../component/base"
import { UpdateFolder, FolderList, fileList, deleteFileList, updateFile, AddDocument } from "../component/Api";
import { ProductList, dmsGodview, AssignEmp } from "../component/Api";
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
  TextColor                 //Aishwarya 30 may
} from "../styledComps.js"



class ViewDMS extends Component {
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
    email: "",
    Name: "",
    empCode: "",
    address: "",
    password: "",
    btnvisi: false,
    role:
      [
        {
          name: "Admin"
        },
        {
          name: "CEO/Director"
        },
        {
          name: "Business Manager"
        },
        {
          name: "Service Manager"
        },
        {
          name: "Sales Manager"
        },
        {
          name: "Sales Engineer"
        },
        {
          name: "Service Engineer"
        },
        {
          name: "Back Office Executive"
        },
        {
          name: "Back Office Support"
        },
        {
          name: "HR/IT Manager"
        },
        {
          name: "HR Executive"
        },
        {
          name: "Accounts Manager"
        },
        {
          name: "Accounts Executive"
        },
        {
          name: "Operation Manger"
        }
      ],

    SelectedRole: [],
    AssignedRole: [],
    selectedFile: null,
    file: '',
    imagePreviewUrl: '',

    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
    action: "",
    checked: true,
    isopen: false,
    uploadedfileurl: "",
    TeamImageData: [],
    isbtn: true,
    fname: "",
    folderName: "",
    Date: "",
    hname: "",
    startDate: "",
    AssignedUser: [],
    uplodedfileName: [],
    uploadedFile: [],
    fid: "",
    FolderData: [],
    fileDataList: [],
    open: false,                        //Aishwarya 30 May
    open1: false,              //Aishwarya 30 May
    SelectedTicket: "",         //aishwarya 30 may
    DMSid: 0,         //Aishwarya 29 may
    redirectToDMS: false, //aishwarya 29 may
    isSucess: false,           //aishwarya 29 may
  }


  FilesData = (id) => {

    fetch(fileList, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: id
      })
    }).then(data => {
      return data.json();
    }).then(data => {
      console.log("data", data)
      console.log("file List", data.records)
      if (data.records) {
        this.setState({ fileDataList: data.records })

      } else {
        console.log("No user")
        this.setState({ fileDataList: [] })
      }
    })

  }


  componentDidMount() {



    let editdms = JSON.parse(sessionStorage.getItem("editTicket"))

    if (editdms) {
      console.log("In User List", editdms)
      this.FilesData(editdms.id)
      this.setState({
        dmsinfo: editdms,
        folderName: editdms.folderName,
        fname: editdms.folderName,
        startDate: editdms.date,
        hname: editdms.handlerName,
        valueAssign: editdms.handlerName,
        DMSid: editdms.id                 //Aishwarya 30 may
      })



    } else {
      console.log("No User here")
    }

  }

  validateEmail = email => {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return re.test(email)
  }

  onChange = Address => {
    console.log("Address is", Address)
    this.setState({ Address, msg1: "" })
  }


  // handleClick = async(i) => {
  //   console.log("name of role is",i.name)
  //   let assignedRole=[]
  //   assignedRole.push(i)
  //   await this.setState({SelectedRole:assignedRole})
  // }

  handleClick = (i) => {
    console.log("name of role is", i.name)
    let k = 0

    this.state.SelectedRole.push(i.name)



    // this.state.AssignedRole = [...new Set(this.state.SelectedRole.map(item => item.name))];

    console.log("roles are", this.state.SelectedRole)
    this.setState({ AssignedRole: this.state.SelectedRole, msg1: "", isbtn: false })
  }

  handleRemove = (i) => {
    console.log("name of role is", i)
    let a = this.state.AssignedRole.indexOf(i)
    if (a > -1) {
      this.state.AssignedRole.splice(a, 1)
    }
    this.setState({ AssignedRole: this.state.AssignedRole, isbtn: false })
    console.log("after delete", this.state.a)
    console.log("after delete assignedRole", this.state.AssignedRole)
  }



  handleDiscribe = e => {
    this.setState({ discription: e.target.value })
  }

  handlelastSolved = e => {
    this.setState({ lastsolved: e.target.value })
  }


  handleChange = date => {
    console.log("date is", date)
    this.setState({
      startDate: date
    })
  }





  handleFolder = i => {

    let finfo = JSON.parse(i.target.value)
    console.log("value of i", i.target.value)
    console.log("value of finfo", finfo)
    this.setState({
      fname: finfo.folderName,
      folderName: finfo.folderName,
      startDate: moment(finfo.date, 'DD-MM-YYYY'),
      valueAssign: finfo.handlerName
    })
  }


  handleFolderName = e => {
    console.log("fname is", e.target.value)
    this.setState({ folderName: e.target.value })
  }


  downloadDocument = (link) => {


    let downloadUrl = link

    console.log("download url is", downloadUrl)

    window.open(downloadUrl)
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
    console.log('Slected product', this.state.SelectedTicket)
    fetch("http://35.161.99.113:9000/webapi/document/t_deleteFolder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        folderId: this.state.SelectedTicket
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
          this.setState({ isSucess: true, redirectToDMS: true })
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
      selectedOption,
      empCode,
      password,
      active1,
      btnvisi, role, SelectedRole, AssignedRole, selectedFile, imagePreviewUrl, uploadedfileurl, isopen, TeamImageData,
      isbtn, fname, folderName, uplodedfileName, uploadedFile, fid, FolderData, hname,
      open,         //Aishwarya 30 May
      open1,        //Aishwarya 30 May
      size1,             //Aishwarya 30 may
    } = this.state

    console.log("uploadedFile Result", uploadedFile)
    console.log("uplodedfileName Result", uplodedfileName)

    console.log("Date is", this.state.startDate)


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

    //console.log("role are",role[0].name)

    // role.map(i=>{
    //   console.log("all role are",i.name)
    // })

    // console.log("Selected Role is",this.state.AssignedRole)

    return (
      <div>


        <PageContainer2 style={{ height: "100vh" }}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/DocumentManagement">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Document</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditDMS">
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
              onClick={() => this.show("tiny", this.state.DMSid)}
            >
              Delete
      </Button>
            {this.state.redirectToDMS && <Redirect to="/DocumentManagement" push />}            {/*Aishwarya 30 May*/}
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Folder</label>
                <hr />

                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Select Folder :</span>
                    </Box>
                    <Box2>
                      <span>{fname}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Folder Name :</span>
                    </Box>
                    <Box2>
                      <span>{folderName}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Date :</span>
                    </Box>
                    <Box2>
                      <span>
                        {this.state.startDate}
                      </span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Handler :</span>
                    </Box>
                    <Box2>
                      <span>{hname}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                </MainDivHolder>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Document</label>
                <hr />
                <Grid columns={3} relaxed>
                  {this.state.fileDataList.map(i => (
                    <Grid.Column>
                      <Button color="purple" circular>
                        {i.documentName} &nbsp;&nbsp;

                    <Icon size="large" name="cloud download" onClick={() => this.downloadDocument(i.link)} />

                      </Button>
                    </Grid.Column>
                  ))}
                </Grid>
              </Segment>
            </TixyContent>
          </ContentArea>
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
        {isopen == true ? (
          <ErrorModal isopen={this.state.isopen} msg={this.state.msg} onClose={this.handleClose} />
        ) : (
            <div>
            </div>
          )}
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



export default ViewDMS
