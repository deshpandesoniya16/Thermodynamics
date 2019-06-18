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
  Modal,Checkbox,List,
  Form,Label,Progress,Message
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import matthew from "../component/Image/matthew.png"

import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {MyTeam_fbs} from "../component/base"
import ErrorModal from '../component/ErrorModal'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment"
import {DMS} from "../component/base"
import { UpdateFolder,FolderList,fileList,deleteFileList,updateFile,AddDocument} from "../component/Api";
import SuccessModal from "../component/SuccessModal"



import { ProductList,dmsGodview,AssignEmp  } from "../component/Api";

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
} from "../styledComps.js"


class EditDMS extends Component {
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
    btnvisi:false,
   

    SelectedRole : [],
    AssignedRole:[],
    selectedFile:null,
    file: '',
    imagePreviewUrl: '',

    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
    action:"",
    checked:true,
    isopen:false,
    uploadedfileurl:"",
    TeamImageData:[],
    isbtn:true,
    fname:"",
    folderName:"",
    Date:"",
    hname:"",
    startDate: moment(),
    AssignedUser:[],
    uploadedfileName:[],
    uploadedFile:[],
    fid:"",
    FolderData:[],
    dmsinfo:{},
    fileDataList:[],
    isSucess:false,
    Smsg:""
  }


  AssignEmp = () =>{
      fetch(AssignEmp, {
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
       console.log("Assigned User",data.records)
       if(data.records){
         this.setState({AssignedUser:data.records})
    
       }else{
         console.log("No user")
         this.setState({AssignedUser:[]})
       }
    })

  }


  GetFolderList = () =>{
      
    fetch(FolderList, {
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
         console.log("Folder List",data.records)
         if(data.records){
           this.setState({FolderData:data.records})
      
         }else{
           console.log("No user")
           this.setState({FolderData:[]})
         }
      })
  
  }

  FilesData = (id) =>{

    fetch(fileList, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            folderId:id
        })
      }).then(data => {
        return data.json();
      }).then(data => {
         console.log("data",data)
         console.log("file List",data.records)
         if(data.records){
           this.setState({fileDataList:data.records})
      
         }else{
           console.log("No user")
           this.setState({fileDataList:[]})
         }
      })
  
  }


  deleteFileListData =(id)=>{

    fetch(deleteFileList, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fileId:id
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

  componentDidMount() {


    this.AssignEmp();
    this.GetFolderList();

    let editdms = JSON.parse(sessionStorage.getItem("editTicket"))
 
    if (editdms) {
      console.log("In User List", editdms)
     this.FilesData(editdms.id)
      this.setState({
        dmsinfo:editdms,
        folderName:editdms.folderName,
        fname:editdms.folderName,
      startDate:moment(editdms.date,'DD-MM-YYYY'),
        handlerName:editdms.handlerName,
        valueAssign:editdms.handlerName
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
    this.setState({ Address,msg1:"" })
  }


  // handleClick = async(i) => {
  //   console.log("name of role is",i.name)
  //   let assignedRole=[]
  //   assignedRole.push(i)
  //   await this.setState({SelectedRole:assignedRole})
  // }

  handleClick = (i) => {
    console.log("name of role is",i.name)
    let k=0

    this.state.SelectedRole.push(i.name)
    
    

    // this.state.AssignedRole = [...new Set(this.state.SelectedRole.map(item => item.name))];

    console.log("roles are",this.state.SelectedRole)
    this.setState({AssignedRole:this.state.SelectedRole,msg1:"",isbtn:false})
  }

handleRemove = (i) =>{
  console.log("name of role is",i)
  let a=this.state.AssignedRole.indexOf(i)
  if(a > -1){
    this.state.AssignedRole.splice(a,1)
    }
  this.setState({AssignedRole:this.state.AssignedRole ,isbtn:false})
  console.log("after delete",this.state.a)
  console.log("after delete assignedRole",this.state.AssignedRole)
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
      isopen:false,
      isSucess:false,
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
    this.setState({ Name: e.target.value,msg1:"" })
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
    this.setState({ password: e.target.value,msg1:"" })
  }

  handlephno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ Phno: e.target.value,msg1:"" })
    }
  }

  handleDiscribe = e => {
    this.setState({ discription: e.target.value })
  }

  handlelastSolved = e => {
    this.setState({ lastsolved: e.target.value })
  }


  handleChange=date =>{
    console.log("date is",date)
    this.setState({
      startDate: date
    })
}




  handleEmp=e=>{
    this.setState({empCode:e.target.value,msg1:""})
  }
 
  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  handleAvatar =e=>{
    console.log("image is",e.target.files[0])
    this.setState({selectedFile:e.target.files[0]})

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

  }


  
        handleUploadStart = () => this.setState({isUploading: true, progress: 0});
        handleProgress = (progress) => this.setState({progress});
        handleUploadError = (error) => {
          this.setState({isUploading: false});
          console.error(error);
        }
        handleUploadSuccess = (filename) => {
            console.log("File Name is",filename)
            this.state.uploadedfileName.push(filename)
            this.state.fileDataList.push({"documentName":filename})
          this.setState({ progress: 100, isUploading: false});
          DMS.child(filename).getDownloadURL().then(url =>{
            this.setState({uploadedfileurl: url,msg1:""})
            this.state.uploadedFile.push(url)
            this.state.fileDataList.push({"link":url})
          }); 

          setTimeout(()=>{
          if(this.state.progress == 100){
            this.setState({filename:"", progress:0})
          }else{
            console.log("error in upload")
          }
         },1000)

        };


        handleFolder=i=>{

            let finfo = JSON.parse(i.target.value)
          console.log("value of i",i.target.value)
          console.log("value of finfo",finfo)
            this.setState({
                fname:finfo.folderName,
                folderName:finfo.folderName,
                                startDate:moment(finfo.date,'DD-MM-YYYY'),
                                valueAssign:finfo.handlerName
                            })
        }


        handleFolderName =e=>{
            console.log("fname is",e.target.value)
            this.setState({folderName:e.target.value})
        }

        //AssignedUser
  resetComponentAssign = () =>{
    this.setState({ isLoadingAssign: false, resultsAssign: [], valueAssign: "" })
  }

  handleResultSelectAssign = (e, { result }) => {
    this.setState({ valueAssign:result.name,handlerName:result.name,aid:result.id })
    this.setState({ SelectedResultAssign: result })
  }

  handleSearchChangeAssign = (e, { value }) => {
    this.setState({ isLoadingAssign: true, valueAssign:value })

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


  // UpdateFolder=()=>{

  //   fetch(UpdateFolder, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //           folderName: this.state.folderName,
  //           date: moment(this.state.startDate).format("DD/MM/YYYY"),
  //           handlerName: this.state.handlerName,
  //           folderId:this.state.dmsinfo.id
  //       })
  //     })
  //       .then(data => {
  //         return data.json()
  //       })
  //       .then(data => {
  //         console.log("data", data)
  //         console.log("data", data.records)

  //         this.state.fid = data.records.insertId
  //         if(data.message == "Folder Updated"){
  //           this.setState({Smsg:"Folder Updated",isSucess:true})
  //       }else{
  //         this.setState({msg:"Something went wrong",isopen:true})
  //       }
         
  //        })

  // }


  downloadDocument=(link)=>{

    
    let downloadUrl =link

     console.log("download url is",downloadUrl)

     window.open(downloadUrl)
  }

  

  deleteDocument=(id)=>{

    let did=id
    this.deleteFileListData(did)

  }

  UpdateDocument=()=>{
    let curDate=moment()
    fetch(AddDocument, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            folderId: this.state.dmsinfo.id,
            fileList:this.state.uploadedfileName,
            fileLink: this.state.uploadedFile,
            date:moment(curDate).format("DD-MM-YYYY")
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
          if(data.message == "Files Added"){
              console.log("updated")
              this.setState({ Smsg: "Files Added", isSucess: true })
          }else{
              console.log("Not updated")
              this.setState({ msg: "Something went wrong", isopen: true })
          }
        })
  }

  Finfo=(i)=>{

    console.log("i is",i)
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
      btnvisi,role,SelectedRole,AssignedRole,selectedFile,imagePreviewUrl,uploadedfileurl,isopen,TeamImageData,
      isbtn,fname,folderName,uploadedfileName,uploadedFile,fid,FolderData,isSucess
    } = this.state

    //console.log("uploadedFile Result", uploadedFile)
    console.log("File  from api", this.state.fileDataList)

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

       <PageContainer2 style={{height:"100vh"}}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/DocumentManagement">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Document</HeadingText>
            </HeadingDiv>
          </div>
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
                        <hr />  
                      </div>
                    </Form.Field>
                  </Form.Group>
                  <Button
                    disabled={active}
                    onClick={() => this.UpdateFolder()}
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Update
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

                    <Progress percent={this.state.progress} active color="green">
  </Progress>
        <br /><br/>

                  <br />
                     <Grid columns={3} relaxed>

                      
                      {this.state.fileDataList.map(i=>(

<Segment>
<p>{i.documentName}</p>

<Button  color="purple">{i.documentName}<br/></Button>

<br/>
<Icon size="large" name="close" onClick={()=>this.deleteDocument(i.id)}/>


<Icon size="large" name="cloud download" onClick={()=>this.downloadDocument(i.link)}/>
</Segment>
))}
  <br/>

    </Grid>
                  <br />
                  <Button
                    onClick={() => this.UpdateDocument()}
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Update Document
                  </Button>
                </Form>
              </Segment>
            </TixyContent>
          </ContentArea>
          {this.state.redirectToTeam && <Redirect to="/MyTeam" />}
        </PageContainer2>


        
{isopen == true ?(
  <ErrorModal isopen={this.state.isopen} msg={this.state.msg} onClose={this.handleClose}/>
):(
  <div>
  </div>
)}


 {isSucess == true ?(
    <SuccessModal isopen={this.state.isSucess} msg={this.state.Smsg} onClose={this.handleClose}/>
  ):(
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



export default EditDMS
