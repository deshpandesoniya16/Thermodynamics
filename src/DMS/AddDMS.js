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
  Modal,
  Checkbox,
  List,
  Form,
  Label,
  Progress,
  Message,
  Responsive
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import matthew from "../component/Image/matthew.png"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { MyTeam_fbs } from "../component/base"
import ErrorModal from "../component/ErrorModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { DMS } from "../component/base"
import { AddFolder, FolderList, AddDocument } from "../component/Api"
import SuccessModal from "../component/SuccessModal"

import { ProductList, dmsGodview, AssignEmp } from "../component/Api"
import { Scrollbars } from "react-custom-scrollbars"
import {
  PageContainer3,
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
} from "../styledComps.js"

class AddDMS extends Component {
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

    SelectedRole: [],
    AssignedRole: [],
    selectedFile: null,
    file: "",
    imagePreviewUrl: "",

    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
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
    startDate: moment(),
    AssignedUser: [],
    uploadedfileName: [],
    uploadedFile: [],
    fid: "",
    FolderData: [],
    isChecked: false,
    isSucess: false,
    Smsg: ""
  }

  AssignEmp = () => {
    fetch(AssignEmp, {
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
  }

  GetFolderList = () => {
    fetch(FolderList, {
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
        console.log("Folder List", data.records)
        if (data.records) {
          this.setState({ FolderData: data.records })
        } else {
          console.log("No user")
          this.setState({ FolderData: [] })
        }
      })
  }

  componentDidMount() {
    this.AssignEmp()
    this.GetFolderList()
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

  handleClick = i => {
    console.log("name of role is", i.name)
    let k = 0

    this.state.SelectedRole.push(i.name)

    // this.state.AssignedRole = [...new Set(this.state.SelectedRole.map(item => item.name))];

    console.log("roles are", this.state.SelectedRole)
    this.setState({
      AssignedRole: this.state.SelectedRole,
      msg1: "",
      isbtn: false
    })
  }

  handleRemove = i => {
    console.log("name of role is", i)
    let a = this.state.AssignedRole.indexOf(i)
    if (a > -1) {
      this.state.AssignedRole.splice(a, 1)
    }
    this.setState({ AssignedRole: this.state.AssignedRole, isbtn: false })
    console.log("after delete", this.state.a)
    console.log("after delete assignedRole", this.state.AssignedRole)
  }

  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false, isOpenReject: false })
    }, 2000)
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
      isOpenHold: false,
      isOpenReject: false,
      isOpenClose: false,
      isopen: false,
      isSucess: false
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

  handleChange = selectedOption => {
    this.setState({ selectedOption })
    console.log(`Selected: ${selectedOption.label}`)
  }

  handleName = e => {
    this.setState({ Name: e.target.value, msg1: "" })
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
    console.log("email", e.target.value)

    setTimeout(() => {
      if (this.validateEmail(this.state.email)) {
        this.setState({ email: this.state.email, EmailMsg: "" })
      } else {
        this.setState({ EmailMsg: "Please Enter Valid Email." })
      }
    }, 1000)
  }

  handlepass = e => {
    this.setState({ password: e.target.value, msg1: "" })
  }

  handlephno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ Phno: e.target.value, msg1: "" })
    }
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

  handleEmp = e => {
    this.setState({ empCode: e.target.value, msg1: "" })
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  handleAvatar = e => {
    console.log("image is", e.target.files[0])
    this.setState({ selectedFile: e.target.files[0] })

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
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
    DMS.child(filename)
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

  handleFolder = i => {
    let finfo = JSON.parse(i.target.value)
    console.log("value of i", i.target.value)
    console.log("value of finfo", finfo)
    this.setState({
      fname: finfo.folderName,
      folderName: finfo.folderName,
      startDate: moment(finfo.date, "DD-MM-YYYY"),
      valueAssign: finfo.handlerName
    })
  }

  handleFolderName = e => {
    console.log("fname is", e.target.value)
    this.setState({ folderName: e.target.value })
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
    this.setState({
      valueAssign: result.name,
      handlerName: result.name,
      aid: result.id
    })
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

  addFolder = () => {
    if (!this.state.folderName) {
      this.setState({ msg: "Please Enter Folder Name", isopen: true })
    } else {
      fetch(AddFolder, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          folderName: this.state.folderName,
          date: moment(this.state.startDate).format("DD/MM/YYYY"),
          handlerName: this.state.handlerName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
          this.state.fid = data.records.insertId
          if (data.message == "Folder Created") {
            this.setState({ Smsg: "Folder Created", isSucess: true })
          } else {
            this.setState({ msg: "Something went wrong", isopen: true })
          }

         
        })
    }
  }

  downloadDocument = i => {
    // for(let i=0;i<this.state.uploadedFile.length;i++){

    console.log("file arr", this.state.uploadedfileName)
    console.log("file arr", this.state.uploadedFile)

    var a = this.state.uploadedfileName.indexOf(i)

    let downloadUrl = this.state.uploadedFile[a]

    console.log("download url is", downloadUrl)

    window.open(downloadUrl)
  }

  addDocument = () => {
    let curDate = moment()
    fetch(AddDocument, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        folderId: this.state.fid,
        fileList: this.state.uploadedfileName,
        fileLink: this.state.uploadedFile,
        date: moment(curDate).format("DD-MM-YYYY")
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("data", data.records)
        if (data.message == "Files Added") {
          this.setState({ Smsg: "Files Added", isSucess: true })
        } else {
          this.setState({ msg: "Something went wrong", isopen: true })
        }
        
        // this.state.fid = data.records.insertId
      })
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

  Finfo = i => {
    console.log("i is", i)
  }

  toggleChange = e => {
    console.log("check status", e.target.value)

    if (this.state.isChecked == false) {
      this.setState({ isChecked: true })
    } else if (this.state.isChecked == true) {
      this.setState({ isChecked: false })
    }
  }

  fileclick = i => {
    console.log("name of file is", i)

    this.state.dfname = i
    // if(this.state.isChecked == true){
    //    let a=this.state.uploadedfileName.indexOf(i)
    //    if(a > -1){
    //       this.state.uploadedfileName.splice(a,1)
    //        }
    // }else if(this.state.isChecked == false){
    //   this.state.dfname=""
    //   console.log("Not deleted")
    // }
    // let a=this.state.AssignedRole.indexOf(i)
    // if(a > -1){
    //   this.state.AssignedRole.splice(a,1)
    //   }
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
      btnvisi,
      role,
      SelectedRole,
      AssignedRole,
      selectedFile,
      imagePreviewUrl,
      uploadedfileurl,
      isopen,
      TeamImageData,
      isbtn,
      fname,
      folderName,
      uploadedfileName,
      uploadedFile,
      fid,
      FolderData,
      isSucess
    } = this.state

    console.log("uploadedFile Result", uploadedFile)
    console.log("uplodedfileName Result", uploadedfileName)

    let active = false
    // if(SelectedResult){
    //     Name=SelectedResult.company_name
    //    Phno=SelectedResult.number
    //    Address=SelectedResult.address
    //    rating=SelectedResult.star
    // }

    if (!fname) {
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
        <PageContainer3>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/DocumentManagement">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Add Document</HeadingText>
            </HeadingDiv>
          </div>
          <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
            <ContentArea>
              <TixyContent style={{ flex: 1 }}>
                <Segment padded style={{ height: "100%" }}>
                  <label>Folder</label>
                  <hr />

                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field className="label">
                        <label>Select Folder</label>
                        <select
                          placeholder="Select Folder"
                          value={fname}
                          onChange={this.handleFolder}
                        >
                          <option />
                          {FolderData.map(i => (
                            <option value={JSON.stringify(i)} key={i.id}>
                              {i.folderName}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Field className="label">
                        <label className="label">Folder </label>
                        <input
                          placeholder="Enter Folder Name"
                          value={folderName}
                          onChange={this.handleFolderName}
                          required
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Field className="label">
                        <label>Date</label>

                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                          dateFormat="YYYY-MM-DD"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          onFocus={e => e.target.blur()}
                          placeholderText="Select Date"
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Field className="label">
                        <label>Handler</label>
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
                        </div>
                      </Form.Field>
                    </Form.Group>
                    <Button
                      disabled={active}
                      onClick={() => this.addFolder()}
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                    >
                      ADD
                    </Button>
                  </Form>
                </Segment>
              </TixyContent>
              <TixyContent style={{ flex: 1 }}>
                <Segment padded style={{ height: "100%" }}>
                  <label>Document</label>
                  <hr />
                  <Form>
                    <FileUploader
                      accept="*"
                      name="avatar"
                      multiple
                      storageRef={DMS}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                    />
                    <br />
                    <Progress
                      percent={this.state.progress}
                      active
                      color="green"
                    />
                    <br />
                    {this.state.uploadedfileName.map(i => (
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
                    <Button
                      onClick={() => this.addDocument()}
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                    >
                      Save Document
                    </Button>
                    {this.state.redirectToTeam && <Redirect to="/MyTeam" />}
                  </Form>
                </Segment>
              </TixyContent>
            </ContentArea>
          </Scrollbars>
        </PageContainer3>

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

export default AddDMS
