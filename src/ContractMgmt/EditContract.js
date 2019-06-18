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
  Form,
  Checkbox
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
  listLead_Contract,
  clientList,
  ItemList,
  clientCondition,updateContract,updateContractDocument,
  listDocument,updateContarctItems,AssignEmp,
  overHauling,onceIntwoMonth,breakdown,
  verticalBaseOit,verticalBaseBreak,verticalBaseOverhual
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
  TableContent
} from "../styledComps.js"

import StarRatingComponent from "react-star-rating-component"
import RawCarousel from "../component/RawCarousel"
import { guid } from "../utils/helper";

class EditContract extends Component {
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
  itemBeingEdited:"",
  CustomerData:[],
  editContractData:{},
  documentList:[],
  oit:'',
  breakdown:'',
  overhauling:'',
  uploadFileDetails:[],
  pcheckDate:'',
  oitDetails:[],
  breakDownData:[],
  OverHulingDetails:[],
  TableList :["oit","overhauling","breakdown"],
  overhaulingName:'',
  breakDownName:'',
  oitName:'',
  isLoadingAssign: false,
  valueAssign: "",
  resultsAssign: [],
  SelectedResultAssign: {},
  lastAction:moment().format("YYYY-MM-DD"),
  oitDate1: '',
  oitDate2:'',
  oitDate3:'',
    oitDate4:'',
    oitDate5:'',
    oitDate6:'',
    breakdownDate1:'',
    breakdownDate2:'',
    breakdownDate3:'',
    breakdownDate4:'',
    breakdownDate5:'',
    breakdownDate6:'',
    OverHulingDate1:'',
    OverHulingDate2:'',
    OverHulingDate3:'',
    OverHulingDate4:'',
    OverHulingDate5:'',
    OverHulingDate6:'',
}




verticalBasedOitData = (id)=>{

  fetch(verticalBaseOit, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vid:id
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("data", data)

      if(data.oitData){
        this.setState({oitName:data.oitData.name})
      }else{
        console.log("No Oit data")
      }
    
    })

}


verticalBasedbreakData = (id)=>{

  fetch(verticalBaseBreak, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vid:id
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("data", data)
      if(data.breakData){
        this.setState({breakDownName:data.breakData.name})
      }else{
        console.log("No Break data")
      }
    
    })

}



verticalBasedOverHualData = (id)=>{

  fetch(verticalBaseOverhual, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vid:id
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("data", data)
      if(data.overhualData){
        this.setState({overhaulingName:data.overhualData.name})
      }else{
        console.log("No overhual data")
      }
    
    })

}

//client List
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

documentDataList=(id)=>{
  fetch(listDocument, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      contractId:id
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



ItemDataList = (id) =>{

  fetch(ItemList, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      contractId:id
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log('data', data)
      console.log('vertical list', data.records)
      if (data.records) {
        this.setState({ itemArray: data.records })
       
      } else {
        console.log('No vertical')
        this.setState({ itemArray: [] })
      }
    })

}

clientInfo = (id) =>{
  fetch(clientCondition, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      cid:id
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log('data', data)
      console.log('customer Data', data.records)
      if (data.records) {
        this.setState({ CustomerData: data.records ,SelectedResult:data.records[0]})
       
      } else {
        console.log('No vertical')
        this.setState({ CustomerData: [] })
      }
    })

}



  assignEmpData=()=>{
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


  lead_ContractList=(tableName)=>{
    fetch(listLead_Contract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tablename:tableName    
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
      
        if (data.message == "Data available") {


          switch (tableName) {
            case 'oit':
              this.setState({oitDetails:data.records})
              console.log('Oit Data', data.records);
              break;

              case 'overhauling':
              this.setState({OverHulingDetails:data.records})
              console.log('OverHuling', data.records);
              break;
          
              case 'breakdown':
              this.setState({breakDownData:data.records})
              console.log('breakdown', data.records);
              break;
          }
        }  else {
            console.log("Something went wrong !!!!!!!")
          }
        })
      }





componentDidMount() {
  // this.clientDataList()
  let user = JSON.parse(sessionStorage.getItem("editTicket"))
  if (user) {
    console.log("In User List", user)

    this.setState({
      breakDownName:user.breakdown,
      // pcheckDate:moment(user.checkDate).format('YYYY-MM-DD'),
      oitName:user.oit,
      overhaulingName:user.overhauling,
      valueAssign:user.aname,
     
    })
    let format = "0000-00-00"
    if(user.lastAction=== format || user.overhulingDate2=== format || user.overhulingDate1=== format || user.overhulingDate2=== format || user.oitDate1=== format || user.oitDate2=== format || user.breakdownDate1=== format || user.breakdownDate2 === format || user.overhulingDate3=== format || user.overhulingDate4=== format || user.overhulingDate5=== format || user.overhulingDate6=== format|| user.oitDate3=== format || user.oitDate4=== format|| user.oitDate5=== format || user.oitDate6=== format || user.breakdownDate3=== format|| user.breakdownDate4=== format || user.breakdownDate5=== format || user.breakdownDate6=== format  ){
      this.setState({
        lastAction:"",
        oitDate1:"",
        oitDate2:"",
        oitDate3:'',
    oitDate4:'',
    oitDate5:'',
    oitDate6:'',
        breakdownDate1:"",
        breakdownDate2:"",
        breakdownDate3:'',
        breakdownDate4:'',
        breakdownDate5:'',
        breakdownDate6:'',
        OverhulingDate1:"",
        OverHulingDate2:"",
        OverHulingDate3:'',
        OverHulingDate4:'',
        OverHulingDate5:'',
        OverHulingDate6:'',
      pcheckDate:"",
      })
    }else{
this.setState({
  lastAction:moment(user.lastAction).format("YYYY-MM-DD"),
  oitDate1:moment(user.oitDate1,"YYYY-MM-DD"),
  oitDate2:moment(user.oitDate2,"YYYY-MM-DD"),
  oitDate3:moment(user.oitDate3,"YYYY-MM-DD"),
  oitDate4:moment(user.oitDate4,"YYYY-MM-DD"),
  oitDate5:moment(user.oitDate5,"YYYY-MM-DD"),
  oitDate6:moment(user.oitDate6,"YYYY-MM-DD"),
  breakdownDate1:moment(user.breakdownDate1,"YYYY-MM-DD"),
  breakdownDate2:moment(user.breakdownDate2,'YYYY-MM-DD'),
  breakdownDate3:moment(user.breakdownDate3,'YYYY-MM-DD'),
  breakdownDate4:moment(user.breakdownDate4,'YYYY-MM-DD'),
  breakdownDate5:moment(user.breakdownDate5,'YYYY-MM-DD'),
  breakdownDate6:moment(user.breakdownDate6,'YYYY-MM-DD'),
  OverhulingDate1:moment(user.overhulingDate1,'YYYY-MM-DD'),
  OverHulingDate2:moment(user.overhulingDate2,'YYYY-MM-DD'),
  OverHulingDate3:moment(user.overhulingDate3,'YYYY-MM-DD'),
  OverHulingDate4:moment(user.overhulingDate4,'YYYY-MM-DD'),
  OverHulingDate5:moment(user.overhulingDate5,'YYYY-MM-DD'),
  OverHulingDate6:moment(user.overhulingDate6,'YYYY-MM-DD'),
pcheckDate:moment(user.checkDate,'YYYY-MM-DD'),
})
}
  
    this.setState({editContractData:user})
    this.ItemDataList(user.id)
    this.documentDataList(user.id)
    this.clientInfo(user.custId)
  }

  this.state.TableList.map(i=>{
    console.log('i', i);
    
    switch (i) {
      case 'oit':
        this.lead_ContractList(i)
        break;
    
        case 'overhauling':
        this.lead_ContractList(i)

            break;
        
            case 'breakdown':
            this.lead_ContractList(i)

            break;
            default:
            console.log("No Matching Table Data")
              break;
          }
        })
  this.assignEmpData()


  this.listVertical()
}

handleName = e => {
  this.setState({ Name: e.target.value })
}


handleAddress = e => {
  this.setState({ Address: e.target.value })
}
validateNumber = input => {
  if (input === '') {
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
  console.log('File Name is', filename)
  console.log('this.state.uploadedfileName', this.state.uploadedfileName);
  this.setState({ progress: 100, isUploading: false })
  contract
    .child(filename)
    .getDownloadURL()
    .then(url => {
      this.setState({ uploadedfileurl: url, msg1: '' })
      this.state.uploadedFile.push(url)
      this.state.uploadedfileName.push({name:filename,link:url})
      this.state.uploadFileDetails.push({filename})

      console.log('this.state.uploadedFile', this.state.uploadedFile);
    })

  setTimeout(() => {
    if (this.state.progress == 100) {
      this.setState({ filename: '', progress: 0 })
    } else {
      console.log('error in upload')
    }
  }, 1000)
}

deleteDocument = i => {
  let a = this.state.uploadedfileName.indexOf(i)
  if (a > -1) {
    this.state.uploadedfileName.splice(a, 1)
  }

  this.setState({ uploadedfileName: this.state.uploadedfileName })
  console.log('after delete', this.state.a)
  console.log('after delete assignedRole', this.state.uploadedfileName)
  console.log('now fname array is', this.state.uploadedfileName)
  // }else if(this.state.isChecked == false) {
  //     console.log("Not Selected")
  // }
}

downloadDocument = i => {
  // for(let i=0;i<this.state.uploadedFile.length;i++){

  // console.log('file arr', this.state.uploadedfileName)
  // console.log('file arr', this.state.uploadedFile)

  // var a = this.state.uploadedfileName.indexOf(i)

  // let downloadUrl = this.state.uploadedFile[a]

  console.log('download url is', i)

  window.open(i)
}

handleItemClick = (e, { name }) => this.setState({ activeItem: name })

handleChange = (e, { value }) => {
  console.log('value', value)
  this.setState({ typeOfContract: value })
}

handleNaturContract = (e, { value }) => {

  console.log('value', value)
  this.setState({ natureOfContract: value })
}

handelascStage =  (e, { value }) => {
  console.log('value', value)

  this.setState({ ascStage: value })
}

//Client Search
resetComponent = () => {
  this.setState({ isLoading: false, results: [], value: '' })
}

handleResultSelect = (e, { result }) => {
  console.log('result', result)
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
        msg: ''
      })
    }
  }, 1000)
}

handleSearchChange = (e, { value }) => {
  this.setState({ isLoading: true, value: value })

  setTimeout(() => {
    if (this.state.value.length < 1) return this.resetComponent()

    const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
    const isMatch = result => re.test(result.company_name)

    this.setState({
      isLoading: false,
      results: _.filter(this.state.clientData, isMatch)
    })
  }, 500)
}

handleVertical = e => {
  let vname = e.target.value
  let vid
  this.state.verticalData.map(i => {
    if (i.vertical == vname) {
      vid = i.id
    }
  })

  this.verticalBasedOitData(vid)
  this.verticalBasedOverHualData(vid)
  this.verticalBasedbreakData(vid)
  // this.listGroup(vid)
  // this.listAsset(vname)
  this.setState({ Vertical: e.target.value })
}

handelSrno = e => {
  let srno = e.target.value
  this.setState({ srNo: srno })
}

handleFromDate = date => {
  this.setState({ fromDate: date })
}

handleToDate = date => {
  this.setState({ toDate: date })
}

handlewarrentyFromDate = date => {
  this.setState({ warrentyFromDate: date })
}

handlewarrentyToDate = date => {
  this.setState({ warrentyToDate: date })
}

handleContractFromDate = date => {
  this.setState({ contracttenureFromDate: date })
}

handleContractToDate = date => {
  this.setState({ contracttenureToDate: date })
}

handlePrice = e => {
  this.setState({ price: e.target.value })
}

handelTerms = e => {
  this.setState({ terms: e.target.value })
}

handleUpdate = () => {
  // if (!this.state.SelectedResult.id) {
  //   alert('Please select a customer')
  //   return
  // }

  if (!this.state.editContractData.custId) {
    this.setState({errorMsg:"Please Select Customer",error:true,isopen:true})
    return
  }

  if (this.state.Vertical.length < 0) {
    this.setState({errorMsg:"Please Select Vertical",error:true,isopen:true})
    return
  }

  if (!this.state.fromDate) {
    this.setState({errorMsg:"Please Date Of commissioning",error:true,isopen:true})
    return
  }

  if (!this.state.warrentyFromDate) {
    this.setState({errorMsg:"Please Select Warrenty From Date",error:true,isopen:true})
    return
  }

  // if (!this.state.warrentyToDate) {
  //   this.setState({errorMsg:"Please Select Warrenty To Date",error:true,isopen:true})
  //   return
  // }

  if (!this.state.contracttenureFromDate) {
    this.setState({errorMsg:"Please Select Tennure From Date",error:true,isopen:true})
    return
  }

  if (!this.state.contracttenureToDate) {
    this.setState({errorMsg:"Please Select Tennure To Date",error:true,isopen:true})
    return
  }

  if (!this.state.typeOfContract) {
    this.setState({errorMsg:"Please Select Type Of Contract",error:true,isopen:true})
    return
  }

  if (!this.state.natureOfContract) {
    this.setState({errorMsg:"Please Select Nature Of Contract",error:true,isopen:true})
    return
  }


  if (!this.state.ascStage) {
    this.setState({errorMsg:"Please Select Asc Stage",error:true,isopen:true})
    return
  }

  if (!this.state.price) {
    this.setState({errorMsg:"Please Enter Price",error:true,isopen:true})
    return
  }

  if (!this.state.terms) {
    this.setState({errorMsg:"Please Enter Terms & Condition",error:true,isopen:true})
    return
  }

  let data = this.state.itemArray
  let id = this.state.itemBeingEdited
  let newItem = {
    id: id,
    // "AscID":this.state.ascId,
    custId: this.state.SelectedResult.id,
    name: this.state.SelectedResult.company_name,
    siteAddress: this.state.SelectedResult.address,
    contactPerson: this.state.SelectedResult.cname1,
    Designation: this.state.SelectedResult.Designation1,
    MobileNo: this.state.SelectedResult.number,
    email: this.state.SelectedResult.email,
    vertical: this.state.Vertical,
    srno: this.state.srNo,
    doc: moment(this.state.fromDate).format(
      'DD-MM-YYYY'
    ),
    // "Date_Of_Commision_To_Date":moment(this.state.toDate).format("DD-MM-YYYY"),
    warrantyFrom: moment(this.state.warrentyFromDate).format(
      'DD-MM-YYYY'
    ),
    warrantyTo: moment(this.state.warrentyToDate).format(
      'DD-MM-YYYY'
    ),
    tenureFrom: moment(
      this.state.contracttenureFromDate
    ).format('DD-MM-YYYY'),
    tenureTo: moment(this.state.contracttenureToDate).format(
      'DD-MM-YYYY'
    ),
    toc: this.state.typeOfContract,
    noc: this.state.natureOfContract,
    ascStage: this.state.ascStage,
    price: this.state.price,
    ptc: this.state.terms
  }
  const newData = data.map(item=>{
    if(item.id===id){
      return newItem
    }
    return item
  })
  
  // data.push([{
  //   "name":this.state.SelectedResult.company_name

  // }])

  console.log('data', data)
  this.setState({ itemArray: newData, itemBeingEdited:"" })
}

handleAddNewItem = () => {
  // if (!this.state.SelectedResult.id) {
  //   alert('Please select a customer')
  //   return
  // }

  if (!this.state.editContractData.custId) {
    this.setState({errorMsg:"Please Select Customer",error:true,isopen:true})
    return
  }

  if (this.state.Vertical.length < 0) {
    this.setState({errorMsg:"Please Select Vertical",error:true,isopen:true})
    return
  }

  if (!this.state.fromDate) {
    this.setState({errorMsg:"Please Date Of commissioning",error:true,isopen:true})
    return
  }

  if (!this.state.warrentyFromDate) {
    this.setState({errorMsg:"Please Select Warrenty From Date",error:true,isopen:true})
    return
  }


  if (!this.state.contracttenureFromDate) {
    this.setState({errorMsg:"Please Select Tennure From Date",error:true,isopen:true})
    return
  }

  if (!this.state.contracttenureToDate) {
    this.setState({errorMsg:"Please Select Tennure To Date",error:true,isopen:true})
    return
  }

  if (!this.state.typeOfContract) {
    this.setState({errorMsg:"Please Select Type Of Contract",error:true,isopen:true})
    return
  }

  if (!this.state.natureOfContract) {
    this.setState({errorMsg:"Please Select Nature Of Contract",error:true,isopen:true})
    return
  }


  if (!this.state.ascStage) {
    this.setState({errorMsg:"Please Select Asc Stage",error:true,isopen:true})
    return
  }

  if (!this.state.price) {
    this.setState({errorMsg:"Please Enter Price",error:true,isopen:true})
    return
  }

  if (!this.state.terms) {
    this.setState({errorMsg:"Please Enter Terms & Condition",error:true,isopen:true})
    return
  }
  

  let data = this.state.itemArray
  let id = guid()
  data.push({
    id: id,
    // "AscID":this.state.ascId,
    custId: this.state.SelectedResult.id,
    name: this.state.SelectedResult.company_name,
    siteAddress: this.state.SelectedResult.address,
    contactPerson: this.state.SelectedResult.cname1,
    Designation: this.state.SelectedResult.Designation1,
    MobileNo: this.state.SelectedResult.number,
    email: this.state.SelectedResult.email,
    vertical: this.state.Vertical,
    srno: this.state.srNo,
    doc: moment(this.state.fromDate).format(
      'DD-MM-YYYY'
    ),
    // "Date_Of_Commision_To_Date":moment(this.state.toDate).format("DD-MM-YYYY"),
    warrantyFrom: moment(this.state.warrentyFromDate).format(
      'DD-MM-YYYY'
    ),
  
    tenureFrom: moment(
      this.state.contracttenureFromDate
    ).format('DD-MM-YYYY'),
    tenureTo: moment(this.state.contracttenureToDate).format(
      'DD-MM-YYYY'
    ),
    toc: this.state.typeOfContract,
    noc: this.state.natureOfContract,
    ascStage: this.state.ascStage,
    price: this.state.price,
    ptc: this.state.terms
  })
  // data.push([{
  //   "name":this.state.SelectedResult.company_name

  // }])

  console.log('data', data)
  this.setState({ itemArray: data, itemBeingEdited:""})
}

deleteItem = id => {
  let data = this.state.itemArray
  data = data.filter(item => item.id !== id)
  this.setState({ itemArray: data, itemBeingEdited:"" })
}

editItem = item => {
  this.setState({
    Vertical:item.vertical,
    price: item.price,
    itemBeingEdited: item.id,
    fromDate:moment(item.doc,'DD-MM-YYYY'),
    srNo:item.srno,
warrentyFromDate:moment(item.warrantyFrom ,'DD-MM-YYYY'),
typeOfContract:item.toc,
natureOfContract:item.noc,
ascStage:item.ascStage,
contracttenureFromDate:moment(item.tenureFrom,'DD-MM-YYYY'),
contracttenureToDate:moment(item.tenureTo,'DD-MM-YYYY'),
terms:item.ptc
  })
}

handleSubmitContract = () => {
 
  //api call here

let cdate=moment().format("YYYY-MM-DD")
  fetch(updateContarctItems, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contractId:this.state.editContractData.id,
      data:this.state.itemArray,
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log('data', data)
      if (data.message == "contract updated") {
        this.setState({ activeItem: 'upload' })
        window.scrollTo(0, 0)
      } else {
        console.log('No Contract Added')
      }
    })

  //on success
 
}

addDocument = () => {
  //api call here
  fetch(updateContractDocument, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      link:this.state.uploadedfileurl,
      name:this.state.uploadFileDetails,
      contractId:this.state.editContractData.id
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log('data', data)
      if (data.message == "document updated") {
        this.setState({ activeItem: 'schedule' })
      } else {
        console.log('No Contract Added')
      }
    })
  //on success
}

updateContract=()=>{

  if (!this.state.editContractData.custId) {
    this.setState({errorMsg:"Please Select Customer",error:true,isopen:true})
    return
  }

  if (!this.state.editContractData.id) {
    this.setState({errorMsg:"Please add Contract to genrate contractId",error:true,isopen:true})
    return
  }

  if (this.state.oitName.length < 0) {
    this.setState({errorMsg:"Please Select OIT",error:true,isopen:true})
    return
  }

  if (this.state.breakDownName.length < 0) {
    this.setState({errorMsg:"Please Select break Down",error:true,isopen:true})
    return
  }

  if (this.state.overhaulingName.length < 0) {
    this.setState({errorMsg:"Please Select Over Huling",error:true,isopen:true})
    return
  }

  if (!this.state.pcheckDate) {
    this.setState({errorMsg:"Please Enter Check Date",error:true,isopen:true})
    return
  }


  let cdate=moment().format("YYYY-MM-DD")
  fetch(updateContract, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      custId:this.state.editContractData.custId,
      oit:this.state.oit,
      breakdown:this.state.breakdown,
      overhauling:this.state.overhauling,
      checkDate:moment(this.state.pcheckDate).format('YYYY-MM-DD'),
      contractId:this.state.editContractData.id,
      lastAction:cdate,
      oitDate1:moment(this.state.oitDate1).format('YYYY-MM-DD'),
      oitDate2:moment(this.state.oitDate2).format('YYYY-MM-DD'),
      oitDate3:moment(this.state.oitDate3).format('YYYY-MM-DD'),
      oitDate4:moment(this.state.oitDate4).format('YYYY-MM-DD'),
      oitDate5:moment(this.state.oitDate5).format('YYYY-MM-DD'),
      oitDate6:moment(this.state.oitDate6).format('YYYY-MM-DD'),
      breakdownDate1:moment(this.state.breakdownDate1).format('YYYY-MM-DD'),
      breakdownDate2:moment(this.state.breakdownDate2).format('YYYY-MM-DD'),
      breakdownDate3:moment(this.state.breakdownDate3).format('YYYY-MM-DD'),
      breakdownDate4:moment(this.state.breakdownDate4).format('YYYY-MM-DD'),
      breakdownDate5:moment(this.state.breakdownDate5).format('YYYY-MM-DD'),
      breakdownDate6:moment(this.state.breakdownDate6).format('YYYY-MM-DD'),
      overhaulingdate1:moment(this.state.OverhulingDate1).format('YYYY-MM-DD'),
      overhaulingdate2:moment(this.state.OverHulingDate2).format('YYYY-MM-DD'),
     overhaulingdate3:moment(this.state.OverHulingDate3).format('YYYY-MM-DD'),
     overhaulingdate4:moment(this.state.OverHulingDate4).format('YYYY-MM-DD'),
     overhaulingdate5:moment(this.state.OverHulingDate5).format('YYYY-MM-DD'),
     overhaulingdate6:moment(this.state.OverHulingDate6).format('YYYY-MM-DD'),


    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log('data', data)
      if (data.message == "contract updated") {
        this.setState({redirectToGodsView:true})        
      } else {
        console.log('No Contract Added')
      }
    })

}

handleClose = () => {
  this.setState({ isopen: false,isSucess:false})
  clearTimeout(this.timeout)
}


handlecheckDate=date=>{
  this.setState({pcheckDate:date})
}

handleOit=e=>{
  this.setState({oitName:e.target.value})
}

handleBreakDown=e=>{
  this.setState({breakDownName:e.target.value})
}

handleOverHuling=e=>{
  this.setState({overhaulingName:e.target.value})
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


handelOitDate1=date=>{
  this.setState({oitDate1:date})
}

handelOitDate2=date=>{
  this.setState({oitDate2:date})
}

handelOitDate3=date=>{
  this.setState({oitDate3:date})
}

handelOitDate4=date=>{
  this.setState({oitDate4:date})
}

handelOitDate5=date=>{
  this.setState({oitDate5:date})
}

handelOitDate6=date=>{
  this.setState({oitDate6:date})
}



handelBreakdownDate1=date=>{
  this.setState({breakdownDate1:date})
}

handelBreakdownDate2=date=>{
  this.setState({breakdownDate2:date})
}


handelBreakdownDate3=date=>{
  this.setState({breakdownDate3:date})
}
handelBreakdownDate4=date=>{
  this.setState({breakdownDate4:date})
}
handelBreakdownDate5=date=>{
  this.setState({breakdownDate5:date})
}
 handelBreakdownDate6=date=>{
  this.setState({breakdownDate6:date})
}


handelOverhulingDate1=date=>{
  this.setState({OverhulingDate1:date})
}

handelOverhulingDate2=date=>{
  this.setState({OverHulingDate2:date})
}
handelOverhulingDate3=date=>{
  this.setState({OverHulingDate3:date})
}
handelOverhulingDate4=date=>{
  this.setState({OverHulingDate4:date})
}

handelOverhulingDate5=date=>{
  this.setState({OverHulingDate5:date})
}
handelOverhulingDate6=date=>{
  this.setState({OverHulingDate6:date})
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
      typeOfContract,
      natureOfContract,
      ascStage, isopen, isSucess,
      isLoadingAssign,
      valueAssign,
      resultsAssign,
  } = this.state

    console.log('Selected Result', activeItem)

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
          <div style={{ display: 'flex', borderBottom: '2px solid #863577' }}>
            <Link to="/Contract">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Contract Managment</HeadingText>
            </HeadingDiv>
          </div>
          <br />

          <HeadingDiv>
            <Menu secondary
              style={{ fontSize: "16px" }}                     //Aishwarya   17/5/19
            >
              <Menu.Item
                name="Add Items"
                active={activeItem === 'Add Items'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="upload"
                active={activeItem === 'upload'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="schedule"
                active={activeItem === 'schedule'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </HeadingDiv>

          {activeItem === 'Add Items' && (
            <div>
              <ContentArea>
                <TixyContent>
                  <Segment padded style={{ height: '100%' }}>
                    <label
                      style={{ fontSize: "16px" }}            //Aishwarya 17/5/19   
                    >View Item</label>
                    <hr />
                    <Table celled fixed singleLine>
                      <Table.Header>
                        <Table.Row
                          style={{ fontSize: "16px" }}            //Aishwarya 17/5/19   
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
                              <Button
                                onClick={() => this.deleteItem(item.id)}
                                color="blue"
                              >
                                Delete
                            </Button>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>

                    <ContentArea
                      style={{ justifyContent: 'flex-end', padding: 18 }}
                    >
                      <Button
                        color="green"
                        onClick={() => this.handleSubmitContract()}
                      >
                        Update Contract
                    </Button>
                    </ContentArea>
                  </Segment>
                </TixyContent>
              </ContentArea>
              <ContentArea>
                <TixyContent style={{ flex: 1 }}>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{ fontSize: "16px", fontWeight: "bold" }}            //Aishwarya 17/5/19   
                      className="labelcolor"
                      label="Customer Details"
                      required
                    />


                    <label
                      style={{ fontSize: "16px", fontWeight: "bold" }}            //Aishwarya 17/5/19     
                      className="labelcolor">Last Action - {this.state.lastAction}</label>
                    <hr />

                    {/* <div style={{ width: 400 }}>
                    <Search
                      loading={isLoading}
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={this.handleSearchChange}
                      results={results}
                      value={value}
                      resultRenderer={resultRenderer}
                      aligned="right"
                      placeholder="Search by customer"
                      disabled={this.state.cannotChangeCust}
                    />
                  </div> */}

                    <br />


                    <Form
                      style={{ fontSize: "16px" }}            //Aishwarya 17/5/19     
                    >
                      {/* <Form.Field>
                      <label>ASC ID</label>
                      <input placeholder="" />
                    </Form.Field> */}


                      <Form.Field>
                        <label>Customer Name</label>
                        <input
                          placeholder="Select Customer"
                          value={this.state.SelectedResult.company_name}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Site Address</label>
                        <input
                          placeholder=""
                          value={this.state.SelectedResult.address}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Contact Person</label>
                        <input
                          placeholder="Contact Person"
                          value={this.state.SelectedResult.cname1}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Designation</label>
                        <input
                          placeholder=""
                          value={this.state.SelectedResult.Designation1}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Mobile Number</label>
                        <input
                          placeholder=""
                          value={this.state.SelectedResult.number}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>E-mail</label>
                        <input
                          placeholder=""
                          value={this.state.SelectedResult.email}
                        />
                      </Form.Field>

                      <Form.Field label="Assign Employee" required />
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
                        <hr />
                      </div>


                    </Form>
                  </Segment>
                </TixyContent>
                <TixyContent style={{ flex: 1 }}>
                  <Segment padded style={{ height: '100%' }}>
                    <Form
                      style={{ fontSize: "16px" }}            //Aishwarya 17/5/19   
                    >
                      <div>
                        <Form.Field>
                          <label>Vertical</label>

                          <select
                            style={{ fontSize: "15px", width: "290px", height: "40px" }}                  //Aishwarya 17/5/19    
                            value={this.state.Vertical}
                            onChange={this.handleVertical}
                          >
                            <option value="" disabled selected hidden>
                              Select Vertical
                          </option>
                            {this.state.verticalData.map(i => (
                              <option value={i.vertical} key={i.id}>
                                {i.vertical}
                              </option>
                            ))}
                          </select>

                          {/* <input placeholder="" /> */}
                        </Form.Field>
                        <Form.Field>
                          <label>Unit Model / Sr.no</label>
                          <input
                            style={{ width: "290px" }}            //Aishwarya 17/5/19   
                            placeholder=""
                            value={this.state.srNo}
                            onChange={this.handelSrno}
                          />
                        </Form.Field>

                        <Form.Field>
                          <label>Date of commissioning</label>

                          <DatePicker
                            selected={this.state.fromDate}
                            onChange={this.handleFromDate}
                            onFocus={e => e.target.blur()}
                            showYearDropdown
                            dateFormatCalendar="DD-MM-YYYY"
                            scrollableYearDropdown
                            yearDropdownItemNumber={15}
                            placeholderText="Enter Date"
                          />
                        </Form.Field>
                        {/* <Form.Field>
                        <label>Date of commissioning to date </label>
                      </Form.Field>

                      <DatePicker
                        selected={this.state.toDate}
                        onChange={this.handleToDate}
                        onFocus={e => e.target.blur()}
                        showYearDropdown
                        dateFormatCalendar="DD-MM-YYYY"
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        placeholderText="Enter Time"
                      /> */}
                        <Form.Field>
                          <label>Warranty Valid Upto </label>
                        </Form.Field>

                        <DatePicker
                          selected={this.state.warrentyFromDate}
                          onChange={this.handlewarrentyFromDate}
                          onFocus={e => e.target.blur()}
                          dateFormatCalendar="DD-MM-YYYY"
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
                          placeholderText="from Date"
                        />
                        <Form.Field />
                        <br />



                        <Form.Group inline>
                          <label>Type Of Contract : </label>
                          <Form.Radio
                            label="New"
                            value="new"
                            checked={typeOfContract === 'new'}
                            onChange={this.handleChange}
                          />
                          <Form.Radio
                            label="Renewal"
                            value="renew"
                            checked={typeOfContract === 'renew'}
                            onChange={this.handleChange}
                          />
                          <Form.Radio
                            label="GPM"
                            value="gpm"
                            checked={typeOfContract === 'gpm'}
                            onChange={this.handleChange}
                          />
                        </Form.Group>

                        <Form.Group inline>
                          <label>Nature Of Contract : </label>
                          <Form.Radio
                            label="Service"
                            value="service"
                            checked={natureOfContract === 'service'}
                            onChange={this.handleNaturContract}
                          />
                          <Form.Radio
                            label="Comprehensive"
                            value="comp"
                            checked={natureOfContract === 'comp'}
                            onChange={this.handleNaturContract}
                          />
                        </Form.Group>

                        <Form.Group inline>
                          <label>ASC Stage : </label>
                          <Form.Radio
                            label="Offer"
                            value="offer"
                            checked={ascStage === 'offer'}
                            onChange={this.handelascStage}
                          />

                          <Form.Radio
                            label="Order"
                            value="Order"
                            checked={ascStage === 'Order'}
                            onChange={this.handelascStage}
                          />

                          <Form.Radio
                            label="Modification"
                            value="modification"
                            checked={ascStage === 'modification'}
                            onChange={this.handelascStage}
                          />
                        </Form.Group>

                        <Form.Field>
                          <label>Contract tenure </label>
                        </Form.Field>

                        <DatePicker
                          selected={this.state.contracttenureFromDate}
                          onChange={this.handleContractFromDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormatCalendar="DD-MM-YYYY"
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
                          placeholderText="From Date"
                        />
                        <Form.Field />

                        <DatePicker
                          selected={this.state.contracttenureToDate}
                          onChange={this.handleContractToDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormatCalendar="DD-MM-YYYY"
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
                          placeholderText="To date"
                        />
                        <br />                                     {/*Aishwarya 17/5/19*/}
                        <Form.Field>
                          <label>Price</label>
                          <input
                            style={{ width: "290px" }}            //Aishwarya 17/5/19     
                            placeholder="Price"
                            value={this.state.price}
                            onChange={this.handlePrice}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Payment terms &amp; conditions</label>
                          <TextArea
                            value={this.state.terms}
                            onChange={this.handelTerms}
                          />
                        </Form.Field>
                      </div>
                    </Form>
                    <ContentArea
                      style={{ justifyContent: 'flex-end', padding: 18 }}
                    >
                      <Button color="blue" onClick={() => this.handleAddNewItem()}>
                        Add New Item
                    </Button>
                      <Button disabled={!this.state.itemBeingEdited} color="green" onClick={() => this.handleUpdate()}>
                        Update Item
                    </Button>
                    </ContentArea>
                  </Segment>
                </TixyContent>
              </ContentArea>
            </div>
          )}

          {activeItem === 'upload' && (
            <ContentArea>
                 <Segment padded style={{ height: "100%" ,width:'50%',left:'25%'}}>
              <TixyContent style={{ flex: 1, height: '100vh' }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}            //Aishwarya 17/5/19   
                >Document</label>
                <hr />
                <Form>
                  <FileUploader
                    accept="*"
                    name="avatar"
                    multiple
                    storageRef={contract}
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
                                backgroundColor: '#863577',
                                color: '#ffffff'
                              }}
                            >
                              {i.name}
                            </Button>
                            <Icon
                              size="large"
                              name="close"
                              onClick={() => this.deleteDocument(i)}
                            />

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
                  <Button
                    onClick={() => this.addDocument()}
                    style={{ backgroundColor: '#863577', color: '#ffffff' }}
                  >
                    Save
                </Button>
                </Form>
              </TixyContent>
              {/* <TixyContent style={{ flex: 1 }} /> */}
              </Segment>
            </ContentArea>
          )}

          {activeItem === 'schedule' && (
            <ContentArea>
              <TixyContent style={{ flex: 3, height: '100vh' }}>
                <Segment>
                  <div style={{ marginRight: 12 }}>
                    <Form
                      style={{ fontSize: "16px" }}            //Aishwarya 17/5/19     
                    >
                      <Form.Field>
                        <label>OIT(Once in 2 months) : </label>
                        <select
                          style={{ fontSize: "15px", width: "290px", height: "40px" }}                  //Aishwarya 17/5/19    
                          value={this.state.oitName} onChange={this.handleOit}>
                          <option value="" disabled selected hidden>
                            Different Visit for different verticals
                        </option>
                          {this.state.oitDetails.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>

                      <div style={{ display: "flex", justifyContent: "flex-start" }}>

                      <div style={{marginRight:'5%',width:'100%',}}>
                          <Form.Field>
                            <label>OIT Date1</label>
                            <DatePicker
                              selected={this.state.oitDate1}
                              onChange={this.handelOitDate1}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>

                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>OIT Date2</label>
                            <DatePicker
                              selected={this.state.oitDate2}
                              onChange={this.handelOitDate2}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>

                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>OIT Date 3</label>
                            <DatePicker
                              selected={this.state.oitDate3}
                              onChange={this.handelOitDate3}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>

                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>OIT Date 4</label>
                            <DatePicker
                              selected={this.state.oitDate4}
                              onChange={this.handelOitDate4}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>OIT Date 5</label>
                            <DatePicker
                              selected={this.state.oitDate5}
                              onChange={this.handelOitDate5}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>OIT Date 6</label>
                            <DatePicker
                              selected={this.state.oitDate6}
                              onChange={this.handelOitDate6}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>



                      </div>

                      <br />

                      <Form.Field>
                        <label>Breakdown : </label>
                        <select
                          style={{ fontSize: "15px", width: "290px", height: "40px" }}                  //Aishwarya 17/5/19      
                          value={this.state.breakDownName} onChange={this.handleBreakDown}>
                          <option value="" disabled selected hidden>
                            Different breakdown for different verticals
                        </option>
                          {this.state.breakDownData.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>


                      <div style={{ display: "flex", justifyContent: "flex-start" }}>

                      <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>breakDown Date1</label>
                            <DatePicker
                              selected={this.state.breakdownDate1}
                              onChange={this.handelBreakdownDate1}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>

                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>breakDown Date2</label>
                            <DatePicker
                              selected={this.state.breakdownDate2}
                              onChange={this.handelBreakdownDate2}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>breakDown Date3</label>
                            <DatePicker
                              selected={this.state.breakdownDate3}
                              onChange={this.handelBreakdownDate3}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>breakDown Date4</label>
                            <DatePicker
                              selected={this.state.breakdownDate4}
                              onChange={this.handelBreakdownDate4}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>breakDown Date5</label>
                            <DatePicker
                              selected={this.state.breakdownDate5}
                              onChange={this.handelBreakdownDate5}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>breakDown Date6</label>
                            <DatePicker
                              selected={this.state.breakdownDate6}
                              onChange={this.handelBreakdownDate6}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                      </div>

                      <br />




                      <Form.Field>
                        <label>Overhuling (O/H) : </label>
                        <select
                          style={{ fontSize: "15px", width: "290px", height: "40px" }}                  //Aishwarya 17/5/19      
                          value={this.state.overhaulingName} onChange={this.handleOverHuling}>
                          <option value="" disabled selected hidden>
                            Different breakdown for different verticals
                        </option>
                          {this.state.OverHulingDetails.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>


                      <div style={{ display: "flex", justifyContent: "flex-start" }}>

                      <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>Overhuling Date1</label>
                            <DatePicker
                              selected={this.state.OverhulingDate1}
                              onChange={this.handelOverhulingDate1}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>

                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>Overhuling Date2</label>
                            <DatePicker
                              selected={this.state.OverHulingDate2}
                              onChange={this.handelOverhulingDate2}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>

                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>Overhuling Date3</label>
                            <DatePicker
                              selected={this.state.OverHulingDate3}
                              onChange={this.handelOverhulingDate3}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>Overhuling Date4</label>
                            <DatePicker
                              selected={this.state.OverHulingDate4}
                              onChange={this.handelOverhulingDate4}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>Overhuling Date5</label>
                            <DatePicker
                              selected={this.state.OverHulingDate5}
                              onChange={this.handelOverhulingDate5}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>
                        <div style={{marginRight:'5%',width:'100%'}}>
                          <Form.Field>
                            <label>Overhuling Date6</label>
                            <DatePicker
                              selected={this.state.OverHulingDate6}
                              onChange={this.handelOverhulingDate6}
                              onFocus={e => e.target.blur()}
                              dateFormatCalendar="YYYY-MM-DD"
                              scrollableYearDropdown
                              yearDropdownItemNumber={15}
                              placeholderText="Check Date"
                            />
                          </Form.Field>
                        </div>

                      </div>

                      <br />



                      <Form.Field>
                        <label>Preventive check up proposed date</label>
                        <DatePicker
                          selected={this.state.pcheckDate}
                          onChange={this.handlecheckDate}
                          onFocus={e => e.target.blur()}
                          dateFormatCalendar="YYYY-MM-DD"
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
                          placeholderText="Check Date"
                        />
                      </Form.Field>
                    </Form>
                    <br />
                    <Button color="blue" onClick={() => this.updateContract()}>Save</Button>
                    {this.state.redirectToGodsView && (<Redirect to="/Contract" />)}

                    <Link to="/Contract"><Button color="white">Cancel</Button></Link>
                  </div>
                </Segment>
              </TixyContent>
              {/* <TixyContent style={{ flex: 1 }} /> */}
            </ContentArea>
          )}
        </PageContainer2>

        {isopen == true ? (
          <ErrorModal isopen={this.state.isopen} msg={this.state.errorMsg} onClose={this.handleClose} />
        ) : (
            <div>
            </div>
          )}

        {isSucess == true ? (
          <SuccessModal isopen={this.state.isSucess} msg={this.state.SuccessMsg} onClose={this.handleClose} />
        ) : (
            <div>
            </div>
          )}



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

export default EditContract
