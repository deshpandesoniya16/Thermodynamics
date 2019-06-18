import React, { Component } from 'react'
import Side from '../component/Sidenav'
import '../App.css'
import '../dashboard.css'
import 'semantic-ui-css/semantic.min.css'
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
} from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import _ from 'lodash'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import ErrorModal from '../component/ErrorModal'
import SuccessModal from '../component/SuccessModal'
import Carousel from 'nuka-carousel'
import SmartUpload from '../component/SmartUpload'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import { tixy_fbs } from '../component/base'
import { productListapi, AssetList } from '../component/Api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import Select from '../../node_modules/semantic-ui-react/dist/commonjs/addons/Select/Select'
import { Lead_fbs, visit_fbs, meeting_fbs, call_fbs } from '../component/base'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import { contract } from '../component/base'

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
  verticalService
} from '../component/Api'

import styled from 'styled-components'

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
  TabHolder,
  TabClick1
} from '../styledComps.js'

import StarRatingComponent from 'react-star-rating-component'
import RawCarousel from '../component/RawCarousel'

import { leadSourcelist, listLead_Contract } from '.././component/Api'

class LeadAdd extends Component {
  state = {
    uploadedfileName: [],
    Name: '',
    address: '',
    Phno: '',
    discription: '',
    email: '',
    clientData: [],
    isLoading: false,
    value: '',
    results: [],
    SelectedResult: {},
    uploadedfileurl: '',
    isOpen: false,
    uploadedFile: [],
    activeItem: 'Create a lead', //initial change of akash
    // activeItem: 'Tech Specification',
    activeBackColor: '#863577',
    activeTextColor: '#ffffff',

    leadDate: '',
    leadTime: '',
    vertical: '',
    custinquiry: '',
    custId: '',
    leadsrc: '',
    leadsourceData: [],
    Clientmsg: '',
    msg: '',
    leadreviewdate: '',
    industry: '',
    product: '',
    salezone: '',
    leadDetails: '',
    leadstatus: '',
    assign: '',
    leadId: '',
    techReviewDate: '',
    techFreez: '',
    group: '',
    subgroup: '',
    productType:'',
    techstatus: '',
    model: '',
    capacity: '',
    techdescription: '',
    quantity: '',
    quotation: '',
    projectReviewDate: '',
    projectPlanDate: '',
    projectActualDate: '',
    typeofProject: '',
    projectTargetDate: '',
    projectLeadTime: '',
    projectLand: '',
    civilWork: '',
    financeMode: '',
    financeStatus: '',
    projectedDate: '',
    projectStatus: '',
    manReviewDate: '',
    manSiteImage: '',
    oem: '',
    oemname: '',
    oemdetails: '',
    qualified: '',
    qualifiedName: '',
    qualifiedDetails: '',
    influencer: '',
    influencerName: '',
    influencerDetails: '',
    orderReviewDate: '',
    orderCompetitor: '',
    orderStatus: '',
    orderanalysis: '',
    refReviewDate: '',
    refArea: '',
    refVisitSite: '',
    refPlanDate: '',
    refActualDate: '',
    refAfterVisit: '',
    refNextLevelDiscussion: '',
    refNextMeeting: '',
    objectionReviewDate: '',
    objectionCustRaised: '',
    objectionStatus: '',
    objectionPlaceOrder: '',
    objectionPayment: '',
    objectionPaymentTerms: '',
    objectionPaymentAccept: '',
    saleReviewDate: '',
    saleNegPrice: '',
    saleFinalPrice: '',
    saleOrderClose: '',
    saleOrderLostDetails: '',
    saleCompetitor: '',
    saleNormalPrice: '',
    salePaymentTerms: '',
    saleOrder: '',
    saleSystemDate: '',
    saleImage: '',
    ImageData: [],
    ImageData1: [],

    verticalData: [],
    Vertical: '',
    groupData: [],
    subGroupData: [],
    productTypeData:[],
    grpid: '',
    sgrpid: '',
    GrupName: '',
    leadQualiIndustry: [],
    leadProductManufacture: [],
    leadSaleZone: [],
    leadAssign: [],
    orderCompetitorArray: [],
    orderStatusArray: [],
    objectionRaisedArray: [],
    salesNegPriceArray: [],
    activemenu: false,
    isLoadingAssign: false,
    resultsAssign: [],
    valueAssign: '',
    AssignedUser: [],
    isSucess: false,
    action: '',

    MDate: moment(),
    Fromtime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    format: 'hh:mm:ss',
    Totime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    FromDate: moment(),
    isOpenVistType: false,
    isOpenCallType: false,
    isOpenMeetingType: false,
    call_type: '',
    meeting_type: '',
    Calltime: moment()
      .hour(0)
      .minute(0)
      .second(0),
    Meetingtime: moment()
      .hour(0)
      .minute(0)
      .second(0),
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
    callTypeData: [],
    meetingTypeData: [],
    visitTypeData: [],
    calltypeid: '',
    callTypeModal: false,
    open12: false,
    size12: '',
    vsittypeId: '',
    size13: '',
    meetingTypeName: '',
    size14: '',
    open14: false,
    meetingTypeModal: false,
    meetingtypeId: '',
    aname: '',
    callId: '',
    meetingId: '',
    visitId: '',
    techCustVisit: '',
    projectAction: '',
    kycAction: '',
    orderAction: '',
    refAction: '',
    objAction: '',
    finalprice: ''
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
        } else {
          console.log('No vertical')
          this.setState({ verticalData: [] })
        }
      })
  }

  listGroup = id => {
    fetch(verticalBasedgrp, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('Group List ', data.records)
        if (data.records) {
          this.setState({ groupData: data.records })
        } else {
          console.log('No Group')
          this.setState({ groupData: [] })
        }
      })
  }

  listSubGroup = id => {
    fetch(grpBasedsubgrp, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grpid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('Sub Group List ', data.records)
        if (data.records) {
          this.setState({ subGroupData: data.records, sgrpid: '' })
        } else {
          console.log('No Sub Group')
          this.setState({ subGroupData: [], sgrpid: '' })
        }
      })
  }

  
  // listProductType = id => {
  //   fetch(' http://35.161.99.113:9000/webapi/t_setting/list', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       tablename: 'productType'
  //     })
  //   })
  //     .then(data => {
  //       return data.json()
  //     })
  //     .then(data => {
  //       console.log('data', data)
  //       console.log('Sub Group List ', data.records)
  //       if (data.records) {
  //         this.setState({ productTypeData: data.records})
  //       } else {
  //         console.log('No Sub Group')
  //         this.setState({ productTypeData: [] })
  //       }
  //     })
  // }

  componentDidMount() {
    fetch('http://35.161.99.113:9000/webapi/t_client/list ', {
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

    fetch('http://35.161.99.113:9000/webapi/t_login/list ', {
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
        console.log('Assigned User', data.records)
        if (data.records) {
          this.setState({ AssignedUser: data.records })
        } else {
          console.log('No user')
          this.setState({ AssignedUser: [] })
        }
      })

    this.lead_s_list()

    this.listVertical()

    this.listGroup()

    this.listLeadForSelect()
    this.listLeadForProduct()
    this.listLeadSaleZone()
    this.listLeadAssign()
    this.listOrderCompetitor()
    this.listOrderStatus()
    //this.listOrderAnalysis()
    this.listObjectionRaised()
    this.listSalesNegPrice()
  }

  listLeadForSelect = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: 'industry'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('type of industry', data.records)
        if (data.records) {
          this.setState({ leadQualiIndustry: data.records })
        } else {
          console.log('No lead source')
          this.setState({ leadQualiIndustry: [] })
        }
      })
  }

  listLeadForProduct = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: 'productManufacturers'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('product', data.records)
        if (data.records) {
          this.setState({ leadProductManufacture: data.records })
        } else {
          console.log('No lead source')
          this.setState({ leadProductManufacture: [] })
        }
      })
  }
  listLeadSaleZone = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: 'zone'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('product', data.records)
        if (data.records) {
          this.setState({ leadSaleZone: data.records })
        } else {
          console.log('No lead source')
          this.setState({ leadSaleZone: [] })
        }
      })
  }

  listLeadAssign = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: 'assignedRole'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('product', data.records)
        if (data.records) {
          this.setState({ leadAssign: data.records })
        } else {
          console.log('No lead source')
          this.setState({ leadAssign: [] })
        }
      })
  }

  listOrderCompetitor = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: '	competitor'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('product', data.records)
        if (data.records) {
          this.setState({ orderCompetitorArray: data.records })
        } else {
          console.log('No lead source')
          this.setState({ orderCompetitorArray: [] })
        }
      })
  }

  listOrderStatus = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: 'statusObjection'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('product', data.records)
        if (data.records) {
          this.setState({ orderStatusArray: data.records })
        } else {
          console.log('No lead source')
          this.setState({ orderStatusArray: [] })
        }
      })
  }

  // listOrderAnalysis = () => {

  //   fetch(listLead_Contract, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       tablename: 'statusObjection'
  //     })
  //   })
  //     .then(data => {
  //       return data.json()
  //     })
  //     .then(data => {
  //       console.log("product", data.records)
  //       if (data.records) {
  //         this.setState({ orderStatusArray: data.records })
  //       } else {
  //         console.log("No lead source")
  //         this.setState({ orderStatusArray: [] })
  //       }
  //     })
  // }

  listObjectionRaised = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: 'objectionRaised'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('product', data.records)
        if (data.records) {
          this.setState({ objectionRaisedArray: data.records })
        } else {
          console.log('No lead source')
          this.setState({ objectionRaisedArray: [] })
        }
      })
  }

  listSalesNegPrice = () => {
    fetch(listLead_Contract, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tablename: 'priceNegotiation'
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('product', data.records)
        if (data.records) {
          this.setState({ salesNegPriceArray: data.records })
        } else {
          console.log('No lead source')
          this.setState({ salesNegPriceArray: [] })
        }
      })
  }

  handlelastAction = e => {
    this.setState({ lastAction: e.target.value })
  }

  validateNumber = input => {
    if (input === '') {
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
  }

  handleName = e => {
    this.setState({ Name: e.target.value })
  }

  handleAddress = e => {
    this.setState({ address: e.target.value })
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

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
  handleProgress = progress => this.setState({ progress })
  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }
  handleUploadSuccess = filename => {
    console.log('File Name is', filename)
    this.state.uploadedfileName.push(filename)
    this.setState({ progress: 100, isUploading: false })
    contract
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.ImageData1.push(url)
        this.state.ImageData.push(url)
        this.setState({ uploadedfileurl: url })
        this.setState({})
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

    console.log('file arr', this.state.uploadedfileName)
    console.log('file arr', this.state.uploadedFile)

    var a = this.state.uploadedfileName.indexOf(i)

    let downloadUrl = this.state.uploadedFile[a]

    console.log('download url is', downloadUrl)

    window.open(downloadUrl)
  }

  handleItemClick = (e, { name }) => {
    console.log('click', name)
    this.setState({ activeItem: name })
  }

  handleChange = (e, { value }) => {
    console.log('status', value)
    this.setState({ leadstatus: value })
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' })
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
          discription: this.state.SelectedResult.description,
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

  handleClient = () => {
    if (!this.state.Name) {
      this.setState({ Clientmsg: 'Please Enter Company Name' })
    } else if (!this.state.Phno) {
      this.setState({ Clientmsg: 'Please Enter Phno' })
    } else if (!this.state.address) {
      this.setState({ Clientmsg: 'Please Enter Address' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/t_client/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.Name,
          number: this.state.Phno,
          address: this.state.address,
          description: this.state.discription,
          email: this.state.email
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({ msg: 'Customer is Created' })
          this.handleClientCancel()
          setTimeout(() => {
            window.location.reload()
          }, 500)
        })
    }
  }

  /*
  handleCustInquiry = e => {
    this.setState({ custinquiry: e.target.value })
  }*/

  handleVertical = e => {
    // this.setState({ vertical: e.target.value })

    let vname = e.target.value
    let vid
    this.state.verticalData.map(i => {
      if (i.vertical == vname) {
        vid = i.id
      }
    })
    this.listGroup(vid)
    this.setState({ vertical: vname })
  }

  handleLeadDate = date => {
    console.log('date', date)
    this.setState({ leadDate: date })
  }

  handleLeadTime = date => {}

  handleLeadSource = e => {
    this.setState({ leadsrc: e.target.value })
  }

  lead_s_list = () => {
    fetch(leadSourcelist, {
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
        console.log('lead source List ', data.records)
        if (data.records) {
          this.setState({ leadsourceData: data.records })
        } else {
          console.log('No lead source')
          this.setState({ leadsourceData: [] })
        }
      })
  }

  handleSubmit = () => {
    if (!this.state.leadDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.vertical) {
      this.setState({ Clientmsg: 'Please Enter vertical' })
    } else if (!this.state.leadsrc) {
      this.setState({ Clientmsg: 'Please Enter lead source' })
    } else {
      /*else if (!this.state.custinquiry) {
      this.setState({ Clientmsg: "Please Enter customer Enquiry" })
    }*/ fetch(
        'http://35.161.99.113:9000/webapi/leadmgmt/add',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            custId: this.state.SelectedResult.id,
            vertical: this.state.vertical,
            leadSource: this.state.leadsrc,
            date: this.state.leadDate,
            //custno: this.state.custinquiry,
            time: '',
            leadPhase: 'Lead Created'
          })
        }
      )
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data.records)
          this.setState({ leadId: data.records })
          this.setState({
            msg: 'Lead Created',
            Clientmsg: '',
            activeItem: 'Lead Qualification'
          })
          this.setState({ isSucess: true, Smsg: 'Lead Created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleSubmitCancel()
          this.handleClientCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleClientCancel = () => {
    this.setState({ Name: '' })
    this.setState({ email: '' })
    this.setState({ Phno: '' })
    this.setState({ discription: '' })
    this.setState({ address: '' })
  }

  handleSubmitCancel = () => {
    this.setState({ leadDate: '' })
    //this.setState({ custinquiry: "" })
    this.setState({ vertical: '' })
    this.setState({ leadsrc: '' })
  }

  handleLeadReviewDate = date => {
    this.setState({ leadreviewdate: date })
  }

  handleIndustry = e => {
    this.setState({ industry: e.target.value })
  }

  handleProduct = e => {
    this.setState({ product: e.target.value })
  }

  handleSalezone = e => {
    this.setState({ salezone: e.target.value })
  }

  handleLeadDetails = e => {
    this.setState({ leadDetails: e.target.value })
  }

  handleAssign = e => {
    this.setState({ assign: e.target.value })
  }

  resetComponentAssign = () => {
    this.setState({
      isLoadingAssign: false,
      resultsAssign: [],
      valueAssign: ''
    })
  }

  handleResultSelectAssign = (e, { result }) => {
    console.log('result', result)
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

      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoadingAssign: false,
        resultsAssign: _.filter(this.state.AssignedUser, isMatch)
      })
    }, 500)
  }

  handleSubmitLead = () => {
    console.log('assign name', this.state.aname)

    if (!this.state.leadreviewdate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.industry) {
      this.setState({ Clientmsg: 'Please Enter industry type' })
    } else if (!this.state.product) {
      this.setState({ Clientmsg: 'Please Enter product manufacture' })
    } else if (!this.state.salezone) {
      this.setState({ Clientmsg: 'Please Enter sale zone' })
    } else if (!this.state.leadDetails) {
      this.setState({ Clientmsg: 'Please Enter lead details' })
    } else if (!this.state.leadstatus) {
      this.setState({ Clientmsg: 'Please Enter lead status' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/leadUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.leadreviewdate,
          typeofindustry: this.state.industry,
          productmanufacture: this.state.product,
          salezone: this.state.salezone,
          details: this.state.leadDetails,
          status: this.state.leadstatus,
          assignto: this.state.aid,
          id: this.state.leadId,
          aname: this.state.aname,
          leadPhase: 'Lead Qualification'
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({
            msg: 'Lead qualification created',
            Clientmsg: '',
            activeItem: 'Tech Specification'
          })
          this.setState({ isSucess: true, Smsg: 'Lead qualification created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleLeadCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleLeadCancel = () => {
    this.setState({ leadreviewdate: '' })
    this.setState({ industry: '' })
    this.setState({ product: '' })
    this.setState({ salezone: '' })
    this.setState({ leadDetails: '' })
    this.setState({ assign: '' })
    this.setState({ leadstatus: '' })
  }

  handleTechReviewDate = date => {
    this.setState({ techReviewDate: date })
  }

  handleTechFreez = (e, { value }) => {
    console.log('status', value)
    this.setState({ techFreez: value })
  }

  handlegroup = e => {
    //this.setState({ group: e.target.value })

    let gid = e.target.value
    console.log('gid', gid)

    this.state.groupData.filter(i => {
      if (i.id == gid) {
        this.setState({ GrupName: i.name })
      }
    })
    this.listSubGroup(gid)
    this.setState({ group: gid })
  }

  handlesubgroup = e => {
    //this.setState({ subgroup: e.target.value })
    let sgid = e.target.value
    this.setState({ subgroup: sgid })
  }

  handleProductTypeData= e => {
    //this.setState({ subgroup: e.target.value })
    let productTypeid = e.target.value
    this.setState({ productType: productTypeid })
  }


  handleTechStatus = (e, { value }) => {
    this.setState({ techstatus: value })
  }

  handlemodel = e => {
    this.setState({ model: e.target.value })
  }

  handlecapacity = e => {
    this.setState({ capacity: e.target.value })
  }

  handleTechdescription = e => {
    this.setState({ techdescription: e.target.value })
  }

  handlequantity = e => {
    this.setState({ quantity: e.target.value })
  }

  handlequotation = (e, { value }) => {
    this.setState({ quotation: value })
  }

  handleSubmitTech = () => {
    if (!this.state.techReviewDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.techFreez) {
      this.setState({ Clientmsg: 'Please Enter technical freez' })
    } else if (!this.state.group) {
      this.setState({ Clientmsg: 'Please Enter group' })
    } else if (!this.state.subgroup) {
      this.setState({ Clientmsg: 'Please Enter sub group' })
    } else if (!this.state.techstatus) {
      this.setState({ Clientmsg: 'Please Enter technical status' })
    } else if (!this.state.model) {
      this.setState({ Clientmsg: 'Please Enter model' })
    } else if (!this.state.capacity) {
      this.setState({ Clientmsg: 'Please Enter capacity' })
    } else if (!this.state.techdescription) {
      this.setState({ Clientmsg: 'Please Enter technical description' })
    } else if (!this.state.quantity) {
      this.setState({ Clientmsg: 'Please Enter quantity' })
    } else if (!this.state.quotation) {
      this.setState({ Clientmsg: 'Please Enter quotation' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/techUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.techReviewDate,
          techreq: this.state.techFreez,
          group: this.state.group,
          subgroup: this.state.subgroup,
          status: this.state.techstatus,
          model: this.state.model,
          capacity: this.state.capacity,
          description: this.state.techdescription,
          quantity: this.state.quantity,
          quotation: this.state.quotation,
          id: this.state.leadId,
          leadPhase: 'Tech Specification'
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({
            msg: 'technical specification Created',
            Clientmsg: '',
            activeItem: 'Project Feasibility'
          })
          this.setState({
            isSucess: true,
            Smsg: 'technical specification Created'
          })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleTechCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleTechCancel = () => {
    this.setState({ techReviewDate: '' })
    this.setState({ techFreez: '' })
    this.setState({ group: '' })
    this.setState({ subgroup: '' })
    this.setState({ techstatus: '' })
    this.setState({ model: '' })
    this.setState({ capacity: '' })
    this.setState({ techdescription: '' })
    this.setState({ quantity: '' })
    this.setState({ quotation: '' })
  }

  handleprojectstatus = (e, { value }) => {
    this.setState({ projectStatus: value })
  }

  handleprojectreviewdate = date => {
    this.setState({ projectReviewDate: date })
  }

  handleprojectplandate = date => {
    this.setState({ projectPlanDate: date })
  }

  handleprojectactualdate = date => {
    this.setState({ projectActualDate: date })
  }

  handletypeofproject = e => {
    this.setState({ typeofProject: e.target.value })
  }

  handleprojectargetdate = date => {
    this.setState({ projectTargetDate: date })
  }

  handleprojectleadatime = date => {
    this.setState({ projectLeadTime: date })
  }

  handleprojectland = e => {
    this.setState({ projectLand: e.target.value })
  }

  handlecivilWork = e => {
    this.setState({ civilWork: e.target.value })
  }

  handlefinancemode = e => {
    this.setState({ financeMode: e.target.value })
  }

  handlefinancestatus = e => {
    this.setState({ financeStatus: e.target.value })
  }

  handleprojectedDate = date => {
    this.setState({ projectedDate: date })
  }

  handleProjectSubmit = () => {
    if (!this.state.projectReviewDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.projectPlanDate) {
      this.setState({ Clientmsg: 'Please Enter planned date' })
    } else if (!this.state.projectActualDate) {
      this.setState({ Clientmsg: 'Please Enter actual date' })
    } else if (!this.state.typeofProject) {
      this.setState({ Clientmsg: 'Please Enter project type' })
    } else if (!this.state.projectTargetDate) {
      this.setState({ Clientmsg: 'Please Enter project target date' })
    } else if (!this.state.projectLand) {
      this.setState({ Clientmsg: 'Please Enter land of project' })
    } else if (!this.state.civilWork) {
      this.setState({ Clientmsg: 'Please Enter civil work' })
    } else if (!this.state.financeMode) {
      this.setState({ Clientmsg: 'Please Enter mode of finance' })
    } else if (!this.state.financeStatus) {
      this.setState({ Clientmsg: 'Please Enter status of finance' })
    } else if (!this.state.projectedDate) {
      this.setState({ Clientmsg: 'Please Enter projected date' })
    } else if (!this.state.projectStatus) {
      this.setState({ Clientmsg: 'Please Enter project status' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/projectUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.projectReviewDate,
          plandate: this.state.projectPlanDate,
          actualdate: this.state.projectActualDate,
          project: this.state.typeofProject,
          targetdate: this.state.projectTargetDate,
          leadtime: this.state.projectLeadTime,
          land: this.state.projectLand,
          civilwork: this.state.civilWork,
          financemode: this.state.financeMode,
          financestatus: this.state.financeStatus,
          projectdate: this.state.projectedDate,
          status: this.state.projectStatus,
          id: this.state.leadId,
          leadPhase: 'Project Feasibility'
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({
            msg: 'Project Created',
            Clientmsg: '',
            activeItem: 'KYC'
          })
          this.setState({ isSucess: true, Smsg: 'Project Created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleProjectCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleProjectCancel = () => {
    this.setState({ projectReviewDate: '' })
    this.setState({ projectPlanDate: '' })
    this.setState({ projectActualDate: '' })
    this.setState({ typeofProject: '' })
    this.setState({ projectTargetDate: '' })
    this.setState({ projectLeadTime: '' })
    this.setState({ projectLand: '' })
    this.setState({ civilWork: '' })
    this.setState({ financeMode: '' })
    this.setState({ financeStatus: '' })
    this.setState({ projectedDate: '' })
    this.setState({ projectStatus: '' })
  }

  handleManReviewDate = date => {
    this.setState({ manReviewDate: date })
  }

  handleOEM = (e, { value }) => {
    this.setState({ oem: value })
  }

  handleOemName = e => {
    this.setState({ oemname: e.target.value })
  }

  handleOemDetails = e => {
    this.setState({ oemdetails: e.target.value })
  }

  handleQualified = (e, { value }) => {
    this.setState({ qualified: value })
  }

  handleQualifiedName = e => {
    this.setState({ qualifiedName: e.target.value })
  }

  handleQualifiedDetails = e => {
    this.setState({ qualifiedDetails: e.target.value })
  }

  handleInfluencer = (e, { value }) => {
    this.setState({ influencer: value })
  }

  handleInfluencerName = e => {
    this.setState({ influencerName: e.target.value })
  }

  handleInfluencerDetails = e => {
    this.setState({ influencerDetails: e.target.value })
  }

  handleManSubmit = () => {
    if (!this.state.manReviewDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.oem) {
      this.setState({ Clientmsg: 'Please Enter identify OEM' })
    } else if (!this.state.oemname) {
      this.setState({ Clientmsg: 'Please Enter identify OEM name' })
    } else if (!this.state.oemdetails) {
      this.setState({ Clientmsg: 'Please Enter identify OEM details' })
    } else if (!this.state.qualified) {
      this.setState({ Clientmsg: 'Please Enter qualified' })
    } else if (!this.state.qualifiedName) {
      this.setState({ Clientmsg: 'Please Enter qualified name' })
    } else if (!this.state.qualifiedDetails) {
      this.setState({ Clientmsg: 'Please Enter qualified details' })
    } else if (!this.state.influencer) {
      this.setState({ Clientmsg: 'Please Enter influencer' })
    } else if (!this.state.influencerName) {
      this.setState({ Clientmsg: 'Please Enter influencer name' })
    } else if (!this.state.influencerDetails) {
      this.setState({ Clientmsg: 'Please Enter influencer details' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/manUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.manReviewDate,
          link: this.state.ImageData,
          identifyoem: this.state.oem,
          identifyname: this.state.oemname,
          identifycontact: this.state.oemdetails,
          qualifiy: this.state.qualified,
          qualifiyname: this.state.qualifiedName,
          qualifiycontact: this.state.qualifiedDetails,
          influencer: this.state.influencer,
          influencername: this.state.influencerName,
          influencercontact: this.state.influencerDetails,
          id: 6,
          leadPhase: 'KYC'
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({
            msg: 'KYC Created ',
            Clientmsg: '',
            activeItem: 'Order Analysis'
          })
          this.setState({ isSucess: true, Smsg: 'KYC Created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleManCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleManCancel = () => {
    this.setState({ manReviewDate: '' })
    this.setState({ oem: '' })
    this.setState({ oemname: '' })
    this.setState({ oemdetails: '' })
    this.setState({ qualified: '' })
    this.setState({ qualifiedName: '' })
    this.setState({ qualifiedDetails: '' })
    this.setState({ influencer: '' })
    this.setState({ influencerName: '' })
    this.setState({ influencerDetails: '' })
  }

  handleOrderReviewDate = date => {
    this.setState({ orderReviewDate: date })
  }

  handleOrderCompetitor = e => {
    this.setState({ orderCompetitor: e.target.value })
  }

  handleOrderStatus = e => {
    this.setState({ orderStatus: e.target.value })
  }

  handleOrderAnalysis = e => {
    this.setState({ orderanalysis: e.target.value })
  }

  handleOrderSubmit = () => {
    if (!this.state.orderReviewDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.orderCompetitor) {
      this.setState({ Clientmsg: 'Please Enter competitor' })
    } else if (!this.state.orderStatus) {
      this.setState({ Clientmsg: 'Please Enter status' })
    } else if (!this.state.orderanalysis) {
      this.setState({ Clientmsg: 'Please Enter analysis' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/orderUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.orderReviewDate,
          competitor: this.state.orderCompetitor,
          status: this.state.orderStatus,
          orderloss: this.state.orderanalysis,
          id: this.state.leadId,
          leadPhase: 'Order Analysis'
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({
            msg: 'Order analysis created',
            Clientmsg: '',
            activeItem: 'Ref Showcasing'
          })
          this.setState({ isSucess: true, Smsg: 'Order analysis created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleOrderCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleOrderCancel = () => {
    this.setState({ orderReviewDate: '' })
    this.setState({ orderCompetitor: '' })
    this.setState({ orderStatus: '' })
    this.setState({ orderanalysis: '' })
  }

  handleRefReviewDate = date => {
    this.setState({ refReviewDate: date })
  }

  handleRefArea = (e, { value }) => {
    this.setState({ refArea: value })
  }

  handleRefVisit = (e, { value }) => {
    this.setState({ refVisitSite: value })
  }

  handleRefPlanDate = date => {
    this.setState({ refPlanDate: date })
  }

  handleRefActualDate = date => {
    this.setState({ refActualDate: date })
  }

  handleRefcustVisit = e => {
    this.setState({ refAfterVisit: e.target.value })
  }

  handleReflevelDiscussion = (e, { value }) => {
    this.setState({ refNextLevelDiscussion: value })
  }

  handleRefNextMeeting = date => {
    this.setState({ refNextMeeting: date })
  }

  handleRefSubmit = () => {
    if (!this.state.refReviewDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.refArea) {
      this.setState({ Clientmsg: 'Please Enter Area' })
    } else if (!this.state.refVisitSite) {
      this.setState({ Clientmsg: 'Please Enter site visit' })
    } else if (!this.state.refPlanDate) {
      this.setState({ Clientmsg: 'Please Enter planned date' })
    } else if (!this.state.refActualDate) {
      this.setState({ Clientmsg: 'Please Enter actual date' })
    } else if (!this.state.refAfterVisit) {
      this.setState({ Clientmsg: 'Please Enter after visit' })
    } else if (!this.state.refNextLevelDiscussion) {
      this.setState({ Clientmsg: 'Please Enter next level of discussion' })
    } else if (!this.state.refNextMeeting) {
      this.setState({ Clientmsg: 'Please Enter next meeting' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/refUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.refReviewDate,
          refarea: this.state.refArea,
          refsite: this.state.refVisitSite,
          plandate: this.state.refPlanDate,
          actualdate: this.state.refActualDate,
          response: this.state.refAfterVisit,
          discussion: this.state.refNextLevelDiscussion,
          status: this.state.refNextMeeting,
          id: this.state.leadId,
          leadPhase: 'Ref Showcasing'
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({
            msg: 'Reference showing created',
            Clientmsg: '',
            activeItem: 'Objection Handling'
          })
          this.setState({ isSucess: true, Smsg: 'Reference showing created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleRefCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleRefCancel = () => {
    this.setState({ refReviewDate: '' })
    this.setState({ refArea: '' })
    this.setState({ refVisitSite: '' })
    this.setState({ refPlanDate: '' })
    this.setState({ refActualDate: '' })
    this.setState({ refAfterVisit: '' })
    this.setState({ refNextLevelDiscussion: '' })
    this.setState({ refNextMeeting: '' })
  }

  handleObjectionReviewDate = date => {
    this.setState({ objectionReviewDate: date })
  }

  handleObjectionCustRaised = e => {
    this.setState({ objectionCustRaised: e.target.value })
  }

  handleObjectionStatus = e => {
    this.setState({ objectionStatus: e.target.value })
  }

  handleObjectionPlaceOrder = (e, { value }) => {
    this.setState({ objectionPlaceOrder: value })
  }

  handleObjectionPayment = (e, { value }) => {
    this.setState({ objectionPayment: value })
  }

  handleObjectionPaymentTerms = e => {
    this.setState({ objectionPaymentTerms: e.target.value })
  }

  handleObjectionPaymentAccept = (e, { value }) => {
    this.setState({ objectionPaymentAccept: value })
  }

  handleObjectionSubmit = () => {
    if (!this.state.objectionReviewDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.objectionCustRaised) {
      this.setState({ Clientmsg: 'Please Enter customer objection raised' })
    } else if (!this.state.objectionStatus) {
      this.setState({ Clientmsg: 'Please Enter customer objection status' })
    } else if (!this.state.objectionPlaceOrder) {
      this.setState({ Clientmsg: 'Please check objection place order' })
    } else if (!this.state.objectionPayment) {
      this.setState({ Clientmsg: 'Please select objection payment ' })
    } else if (!this.state.objectionPaymentTerms) {
      this.setState({
        Clientmsg: 'Please check payment terms accepted by customer'
      })
    } else if (!this.state.objectionPaymentAccept) {
      this.setState({ Clientmsg: 'Please enter alternative payment terms' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/objectionUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.objectionReviewDate,
          custraised: this.state.objectionCustRaised,
          status: this.state.objectionStatus,
          placeorder: this.state.objectionPlaceOrder,
          acceptedpayment: this.state.objectionPayment,
          anotherpayment: this.state.objectionPaymentTerms,
          paymenterm: this.state.objectionPaymentAccept,
          id: this.state.leadId,
          leadPhase: 'Objection Handling'
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({
            msg: 'Objection handling created',
            Clientmsg: '',
            activeItem: 'Sales Order'
          })
          this.setState({ isSucess: true, Smsg: 'Objection handling created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleObjectionCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleObjectionCancel = () => {
    this.setState({ objectionReviewDate: '' })
    this.setState({ objectionCustRaised: '' })
    this.setState({ objectionStatus: '' })
    this.setState({ objectionPlaceOrder: '' })
    this.setState({ objectionPayment: '' })
    this.setState({ objectionPaymentTerms: '' })
    this.setState({ objectionPaymentAccept: '' })
  }

  handleSaleReviewDate = date => {
    this.setState({ saleReviewDate: date })
  }

  handleSalePriceNego = e => {
    this.setState({ saleNegPrice: e.target.value })
  }

  handleSaleFinalPrice = (e, { value }) => {
    this.setState({ saleFinalPrice: value })
  }

  handleSaleOrderClosed = (e, { value }) => {
    this.setState({ saleOrderClose: value })
  }

  handleSaleCompetitor = e => {
    this.setState({ saleCompetitor: e.target.value })
  }

  handleSaleLostDetail = e => {
    this.setState({ saleOrderLostDetails: e.target.value })
  }

  handleSaleNormalPrice = e => {
    this.setState({ saleNormalPrice: e.target.value })
  }

  handleSalePaymentTerms = e => {
    this.setState({ salePaymentTerms: e.target.value })
  }

  handleSaleOrder = (e, { value }) => {
    this.setState({ saleOrder: value })
  }

  handleSaleOrderSystemDate = date => {
    this.setState({ saleSystemDate: date })
  }

  handleSaleSubmit = () => {
    if (!this.state.saleReviewDate) {
      this.setState({ Clientmsg: 'Please Enter date' })
    } else if (!this.state.saleNegPrice) {
      this.setState({ Clientmsg: 'Please Enter price negotiation' })
    } else if (!this.state.saleFinalPrice) {
      this.setState({ Clientmsg: 'Please Enter sale final price' })
    }
    if (!this.state.saleOrderClose) {
      this.setState({ Clientmsg: 'Please check status of order closed' })
    }
    if (this.state.saleOrderClose == 'orderno') {
      if (!this.state.saleOrderLostDetails) {
        return this.setState({ Clientmsg: 'Please Enter order loss details' })
      }
      return
    } else {
      return
    }
    if (!this.state.saleCompetitor) {
      this.setState({ Clientmsg: 'Please Enter sale competitor' })
    } else if (!this.state.saleNormalPrice) {
      this.setState({ Clientmsg: 'Please Enter sale price' })
    } else if (!this.state.salePaymentTerms) {
      this.setState({ Clientmsg: 'Please Enter sale payment terms' })
    } else if (!this.state.saleOrder) {
      this.setState({ Clientmsg: 'Please check sale order' })
    } else if (!this.state.saleSystemDate) {
      this.setState({ Clientmsg: 'Please Enter sale system date' })
    } else {
      fetch('http://35.161.99.113:9000/webapi/leadmgmt/saleUpdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewDate: this.state.saleReviewDate,
          negoprice: this.state.saleNegPrice,
          finalprice: this.state.saleFinalPrice,
          orderclosed: this.state.saleOrderClose,
          orderlossdetail: this.state.saleOrderLostDetails,
          competitor: this.state.saleCompetitor,
          price: this.state.saleNormalPrice,
          paymenterm: this.state.salePaymentTerms,
          saleorder: this.state.saleOrder,
          saleorderdate: this.state.saleSystemDate,
          image: this.state.ImageData[0],
          id: this.state.leadId,
          leadPhase: 'Sales Order',
          price_finalized: this.state.finalprice
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          this.setState({ msg: 'Sales order created' })
          this.setState({ isSucess: true, Smsg: 'Sales order created' })
          setTimeout(() => {
            this.setState({ isSucess: false })
          }, 1000)
          this.handleSaleCancel()
          this.setState({ msg: '' })
        })
    }
  }

  handleSaleCancel = () => {
    this.setState({ saleReviewDate: '' })
    this.setState({ saleNegPrice: '' })
    this.setState({ saleFinalPrice: '' })
    this.setState({ saleOrderClose: '' })
    this.setState({ saleOrderLostDetails: '' })
    this.setState({ saleCompetitor: '' })
    this.setState({ saleNormalPrice: '' })
    this.setState({ salePaymentTerms: '' })
    this.setState({ saleorder: '' })
    this.setState({ saleSystemDate: '' })
  }

  handleMachnie = e => {
    console.log('', e.target.value)
    let ch = ''
    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break

      case 'visit':
        this.setState({ isVisit: true })

        break

      case 'meeting':
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

  handelCustVisit = e => {
    console.log('', e.target.value)
    let ch = ''
    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break

      case 'visit':
        this.setState({ isVisit: true })

        break

      case 'meeting':
        this.setState({ isMeeting: true })
        break

      default:
        break
    }

    this.setState({
      techCustVisit: e.target.value
      // checked: this.state.checked
    })
  }

  handleProjectAction = e => {
    console.log('', e.target.value)
    let ch = ''
    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break

      case 'visit':
        this.setState({ isVisit: true })

        break

      case 'meeting':
        this.setState({ isMeeting: true })
        break

      default:
        break
    }

    this.setState({
      projectAction: e.target.value
      // checked: this.state.checked
    })
  }

  handleKYCAction = e => {
    console.log('', e.target.value)
    let ch = ''
    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break

      case 'visit':
        this.setState({ isVisit: true })

        break

      case 'meeting':
        this.setState({ isMeeting: true })
        break

      default:
        break
    }

    this.setState({
      kycAction: e.target.value
      // checked: this.state.checked
    })
  }

  handleOrderAction = e => {
    console.log('', e.target.value)
    let ch = ''
    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break

      case 'visit':
        this.setState({ isVisit: true })

        break

      case 'meeting':
        this.setState({ isMeeting: true })
        break

      default:
        break
    }

    this.setState({
      orderAction: e.target.value
      // checked: this.state.checked
    })
  }

  handleRefAction = e => {
    console.log('', e.target.value)
    let ch = ''
    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break

      case 'visit':
        this.setState({ isVisit: true })

        break

      case 'meeting':
        this.setState({ isMeeting: true })
        break

      default:
        break
    }

    this.setState({
      refAction: e.target.value
      // checked: this.state.checked
    })
  }

  handleObjAction = e => {
    console.log('', e.target.value)
    let ch = ''
    switch (e.target.value) {
      case 'call':
        this.setState({ isCall: true })

        break

      case 'visit':
        this.setState({ isVisit: true })

        break

      case 'meeting':
        this.setState({ isMeeting: true })
        break

      default:
        break
    }

    this.setState({
      objAction: e.target.value
      // checked: this.state.checked
    })
  }

  handleCallTypeName = e => {
    this.setState({ callTypeName: e.target.value })
  }

  addCallType = () => {
    if (!this.state.callTypeName) {
      this.setState({ smsg: 'Please Enter call Type Name' })
    } else {
      fetch(addcallType, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.callTypeName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          console.log('data', data.records)

          if (data.message == 'Call Type Added') {
            this.setState({ cmsg: data.message })
            setTimeout(() => {
              this.listcallType()
              this.setState({
                callTypeModal: false,
                cmsg: '',
                callTypeName: ''
              })
            }, 1000)
          } else {
            this.setState({ cmsg: 'Something went wrong !!!!!!!' })
            console.log('Something went wrong !!!!!!!')
          }
        })
    }
  }

  handleMeetingTypeName = e => {
    this.setState({ meetingTypeName: e.target.value })
  }

  addMeetingType = () => {
    if (!this.state.meetingTypeName) {
      this.setState({ smsg: 'Please Enter Meeting Type' })
    } else {
      fetch(addMeetingType, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.meetingTypeName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          console.log('data', data.records)

          if (data.message == 'Meeting Type Added') {
            this.setState({ mtmsg: data.message })
            setTimeout(() => {
              this.listmeetingType()
              this.setState({
                meetingTypeModal: false,
                mtmsg: '',
                meetingTypeName: ''
              })
            }, 1000)
          } else {
            this.setState({ mtmsg: 'Something went wrong !!!!!!!' })
            console.log('Something went wrong !!!!!!!')
          }
        })
    }
  }

  handleVisitTypeName = e => {
    this.setState({ visitTypeName: e.target.value })
  }

  addVisitType = () => {
    if (!this.state.visitTypeName) {
      this.setState({ smsg: 'Please Enter visit Type Name' })
    } else {
      fetch(addvisitTypeadd, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.visitTypeName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          console.log('data', data.records)

          if (data.message == 'Visit Type Added') {
            this.setState({ vmsg: data.message })
            setTimeout(() => {
              this.listVisitType()
              this.setState({
                visitTypeModal: false,
                vmsg: '',
                visitTypeName: ''
              })
            }, 1000)
          } else {
            this.setState({ cmsg: 'Something went wrong !!!!!!!' })
            console.log('Something went wrong !!!!!!!')
          }
        })
    }
  }

  handleFinalPrice = e => {
    this.setState({ finalprice: e.target.value })
  }

  handleCalldate = date => {
    this.setState({ CallDate: date, cdate: date })
  }

  handleMdate = date => {
    this.setState({ MDate: date, cdate: date })
  }

  handlevisitFromDate = date => {
    this.setState({ FromDate: date })
  }

  handlevisitToDate = date => {
    this.setState({ ToDate: date })
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
      isOpenMeetingType: false
    })
    clearTimeout(this.timeout)
  }
  handleActionChange = e => {
    this.setState({ action: e.target.value })
  }

  render() {
    // const { value } = this.state
    let {
      Name,
      value,
      isLoading,
      results,
      SelectedResult,
      activeItem,
      email,
      discription,
      Phno,
      address,
      custId,
      custinquiry,
      leadDate,
      leadsrc,
      leadTime,
      leadsourceData,
      Clientmsg,
      msg,
      leadreviewdate,
      industry,
      product,
      salezone,
      leadDetails,
      leadstatus,
      assign,
      techReviewDate,
      techFreez,
      techdescription,
      techstatus,
      group,
      subgroup,
      model,
      capacity,
      description,
      quantity,
      quotation,
      projectReviewDate,
      projectPlanDate,
      projectActualDate,
      typeofProject,
      projectTargetDate,
      projectLeadTime,
      projectLand,
      civilWork,
      financeMode,
      financeStatus,
      projectedDate,
      projectStatus,
      oem,
      oemname,
      oemdetails,
      qualified,
      qualifiedName,
      qualifiedDetails,
      influencer,
      influencerName,
      influencerDetails,
      orderReviewDate,
      orderCompetitor,
      orderStatus,
      orderanalysis,
      refReviewDate,
      refArea,
      refVisitSite,
      refPlanDate,
      refActualDate,
      refAfterVisit,
      refNextLevelDiscussion,
      refNextMeeting,
      objectionReviewDate,
      objectionCustRaised,
      objectionStatus,
      objectionPlaceOrder,
      objectionPayment,
      objectionPaymentTerms,
      objectionPaymentAccept,
      saleReviewDate,
      saleNegPrice,
      saleFinalPrice,
      saleOrderClose,
      saleOrderLostDetails,
      saleCompetitor,
      saleNormalPrice,
      salePaymentTerms,
      saleOrder,
      saleSystemDate,
      saleImage,
      ImageData,
      ImageData1,
      groupData,
      subGroupData,
      grpid,
      sgrpid,
      Vertical,
      vertical,
      leadQualiIndustry,
      leadProductManufacture,
      leadSaleZone,
      leadAssign,
      orderCompetitorArray,
      orderStatusArray,
      objectionRaisedArray,
      salesNegPriceArray,
      activemenu,
      isLoadingAssign,
      resultsAssign,
      valueAssign,
      AssignedUser,
      isSucess,

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
      purposeReport,

      vtype,

      callTypeData,
      visitTypeData,
      meetingTypeData,
      calltypeid,
      size12,
      visitTypeid,
      meetingTypeid,
      productType,
      productTypeData



    } = this.state

    console.log('Selected image', this.state.ImageData1)
    console.log('Selected image', this.state.ImageData)
    console.log('this.state.uploadedFile', this.state.uploadedFile)

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
            <Link to="/LeadMgmt">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Lead Managment</HeadingText>
            </HeadingDiv>
          </div>
          <br />
          <HeadingDiv>
            {/* <TabHolder>
              <TabClick
                name="Create a lead"
                onClick={this.handleItemClick}
                disabled={!(activeItem === "Create a lead")}
              />
              <TabClick
                name="Lead Qualification"
                onClick={this.handleItemClick}
              />
              <TabClick
                name="Tech Specification"
                onClick={this.handleItemClick}
              />
              <TabClick
                name="Project Feasibility"
                onClick={this.handleItemClick}
              />
              <TabClick name="Man to Man" onClick={this.handleItemClick} />
              <TabClick name="Order Analysis" onClick={this.handleItemClick} />
              <TabClick name="Ref Showcasing" onClick={this.handleItemClick} />
              <TabClick
                name="Objection Handling"
                onClick={this.handleItemClick}
              />
              <TabClick name="Sales Order" onClick={this.handleItemClick} />
           </TabHolder>*/}

            <Menu
              secondary
              style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
              //color='purple'
            >
              <Menu.Item
                name="Create a lead"
                //style={{backgroundColor:this.state.activeBackColor,color:this.state.activeTextColor}}
                style={
                  activeItem === 'Create a lead'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                // className={
                //   this.state.activeItem === 'Create a lead'
                //     ? 'activeBackColor'
                //     : ''
                // }
                active={activeItem === 'Create a lead'}
                onClick={this.handleItemClick}
                disabled={!(activeItem === 'Create a lead')}
              />
              <Menu.Item
                style={
                  activeItem === 'Lead Qualification'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="Lead Qualification"
                active={activeItem === 'Lead Qualification'}
                onClick={this.handleItemClick}
                disabled={!(activeItem === 'Lead Qualification')}
              />
              <Menu.Item
                style={
                  activeItem === 'Tech Specification'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="Tech Specification"
                onClick={this.handleItemClick}
                active={activeItem === 'Tech Specification'}
                disabled={!(activeItem === 'Tech Specification')}
              />
              <Menu.Item
                style={
                  activeItem === 'Project Feasibility'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="Project Feasibility"
                onClick={this.handleItemClick}
                active={activeItem === 'Project Feasibility'}
                disabled={!(activeItem === 'Project Feasibility')}
              />
              <Menu.Item
                style={
                  activeItem === 'KYC'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="KYC"
                onClick={this.handleItemClick}
                active={activeItem === 'KYC'}
                disabled={!(activeItem === 'KYC')}
              />

              <Menu.Item
                style={
                  activeItem === 'Ref Showcasing'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="Ref Showcasing"
                onClick={this.handleItemClick}
                active={activeItem === 'Ref Showcasing'}
                disabled={!(activeItem === 'Ref Showcasing')}
              />
              <Menu.Item
                style={
                  activeItem === 'Objection Handling'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="Objection Handling"
                onClick={this.handleItemClick}
                active={activeItem === 'Objection Handling'}
                disabled={!(activeItem === 'Objection Handling')}
              />
              <Menu.Item
                style={
                  activeItem === 'Sales Order'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="Sales Order"
                onClick={this.handleItemClick}
                active={activeItem === 'Sales Order'}
                disabled={!(activeItem === 'Sales Order')}
              />
              <Menu.Item
                style={
                  activeItem === 'Order Analysis'
                    ? {
                        backgroundColor: this.state.activeBackColor,
                        color: this.state.activeTextColor,
                        fontWeight: 'bold'
                      }
                    : {}
                }
                name="Order Analysis"
                onClick={this.handleItemClick}
                active={activeItem === 'Order Analysis'}
                disabled={!(activeItem === 'Order Analysis')}
              />
            </Menu>
          </HeadingDiv>
          <div>
            {activeItem === 'Create a lead' && (
              <ContentArea style={{ justifyContent: 'center' }}>
                <TixyContent>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 28/5/19
                      className="labelcolor"
                      label="Create a Lead"
                      required
                    />
                    <hr />
                    <Form
                      style={{ fontSize: '16px', left: '45%' }} //Aishwarya 17/5/19
                    >
                      <Form.Field width={4}>
                        <label>Customer Name </label>
                      </Form.Field>

                      <div style={{ width: '500px' }}>
                        <Search
                          loading={isLoading}
                          onResultSelect={this.handleResultSelect}
                          onSearchChange={this.handleSearchChange}
                          results={results}
                          value={value}
                          resultRenderer={resultRenderer}
                          aligned="right"
                          placeholder="Search by customer"
                        />
                      </div>
                      <br />
                    </Form>
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Name</label>
                                <input
                                  placeholder=""
                                  value={Name}
                                  onChange={this.handleName}
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>E-mail</label>
                                <input
                                  placeholder=""
                                  value={email}
                                  onChange={this.handleEmail}
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Phone number</label>
                                <input
                                  placeholder=""
                                  value={Phno}
                                  onChange={this.handlephno}
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Address</label>
                                <input
                                  placeholder=""
                                  value={address}
                                  onChange={this.handleAddress}
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Description</label>
                                <TextArea
                                  placeholder=""
                                  value={discription}
                                  onChange={this.handleDiscribe}
                                />
                              </Form.Field>

                              <Button
                                color="blue"
                                onClick={() => this.handleClient()}
                                disabled={active}
                                style={{ width: '40%', marginLeft: '5%' }}
                              >
                                Add Client
                              </Button>
                              <Button
                                onClick={this.handleClientCancel}
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
                          <br />
                          <br />
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Date </label>
                              </Form.Field>
                              <DatePicker
                                selected={this.state.leadDate}
                                onChange={this.handleLeadDate}
                                onFocus={e => e.target.blur()}
                                showYearDropdown
                                dateFormat="DD-MM-YYYY"
                                placeholderText="Enter Date"
                              />
                              <Form.Field width={4}>
                                <label hidden>Customer Enquiry number</label>
                                <input
                                  placeholder=""
                                  value={custinquiry}
                                  onChange={this.handleCustInquiry}
                                  hidden
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Vertical</label>

                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }} //Aishwarya 17/5/19
                                  value={vertical}
                                  onChange={this.handleVertical}
                                >
                                  <option value="" disabled selected hidden>
                                    Select Vertical
                                  </option>
                                  {verticalData.map(i => (
                                    <option value={i.vertical} key={i.vertical}>
                                      {i.vertical}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>

                              <Form.Field>
                                <label>Select Lead Source</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }} //Aishwarya 17/5/19
                                  value={leadsrc}
                                  onChange={this.handleLeadSource}
                                >
                                  <option value="" disabled selected hidden>
                                    Select Lead Source
                                  </option>
                                  {leadsourceData.map(i => (
                                    <option value={i.id} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>

                              <Button
                                color="blue"
                                onClick={() => this.handleSubmit()}
                                style={{ width: '40%', marginLeft: '5%' }}
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => this.handleSubmitCancel()}
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
                          <br />
                          <br />
                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                          <br />
                          <br />
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/*
                    <Form.Field
                      style={{ fontSize: "16px", fontWeight: "bold" }}            //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Create a Lead"
                      required
                    />
                    <hr />
                    <Form
                      style={{ fontSize: "16px" }}            //Aishwarya 17/5/19  
                    >
                      <Form.Field width={4}>
                        <label>Customer Name </label>
                      </Form.Field>

                      <div style={{ width: 400 }}>
                        
                        <Search
                          loading={isLoading}
                          onResultSelect={this.handleResultSelect}
                          onSearchChange={this.handleSearchChange}
                          results={results}
                          value={value}
                          resultRenderer={resultRenderer}
                          aligned="right"
                          placeholder="Search by customer"
                        />
                      </div>
                      <br />

                      <Form.Field width={4}>
                        <label>Name</label>
                        <input
                          placeholder=""
                          value={Name}
                          onChange={this.handleName}
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>E-mail</label>
                        <input
                          placeholder=""
                          value={email}
                          onChange={this.handleEmail}
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Phone number</label>
                        <input
                          placeholder=""
                          value={Phno}
                          onChange={this.handlephno}
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Address</label>
                        <input
                          placeholder=""
                          value={address}
                          onChange={this.handleAddress}
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Description</label>
                        <TextArea
                          placeholder=""
                          value={discription}
                          onChange={this.handleDiscribe}
                        />
                      </Form.Field>

                      <Button
                        color="blue"
                        onClick={() => this.handleClient()}
                        disabled={active}
                      >
                        Add Client
                      </Button>
                      <Button onClick={this.handleClientCancel}>Cancel</Button>

                      <br />
                      <br />
                      <Form.Field width={4}>
                        <label>Date </label>
                      </Form.Field>
                      <DatePicker
                        selected={this.state.leadDate}
                        onChange={this.handleLeadDate}
                        onFocus={e => e.target.blur()}
                        showYearDropdown
                        dateFormat="DD-MM-YYYY"
                        placeholderText="Enter Date"
                      />
                      {/* <Form.Field>
                        <label>Time </label>
                      </Form.Field>

                      <DatePicker
                        selected={this.state.leadTime}
                        onChange={this.handleLeadTime}
                        onFocus={e => e.target.blur()}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        placeholderText="Enter Time"
                     />*/}
                    {/* 
                      <br />

                      <Form.Field width={4}>
                        <label hidden>Customer Enquiry number</label>
                        <input
                          placeholder=""
                          value={custinquiry}
                          onChange={this.handleCustInquiry}
                          hidden
                        />
                      </Form.Field>

                        <Form.Field width={4}>
                          <label>Vertical</label>

                        <select
                          style={{ fontSize: "15px", width: "290px", height: "40px" }}                  //Aishwarya 17/5/19
                          value={vertical} onChange={this.handleVertical}>
                          <option value="" disabled selected hidden>
                            Select Vertical
                          </option>
                          {verticalData.map(i => (
                            <option value={i.vertical} key={i.vertical}>
                              {i.vertical}
                            </option>
                          ))}
                        </select>
                      </Form.Field>

                      <Form.Field width={4}>
                        <select
                          style={{ fontSize: "15px", width: "290px", height: "40px" }}                  //Aishwarya 17/5/19  
                          value={leadsrc}
                          onChange={this.handleLeadSource}
                        >
                          <option value="" disabled selected hidden>
                            Select Lead Source
                          </option>
                          {leadsourceData.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>

                      <Button color="blue" onClick={() => this.handleSubmit()}>
                        Save
                      </Button>
                      <Button onClick={() => this.handleSubmitCancel()}>
                        Cancel
                      </Button>
                    </Form>
                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font>*/}{' '}
                    .
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Lead Qualification' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Lead Qualification"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Review Date</label>
                                <DatePicker
                                  selected={this.state.leadreviewdate}
                                  onChange={this.handleLeadReviewDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Type of industry</label>
                                <select
                                  style={{
                                    width: '290px',
                                    height: '40px',
                                    fontSize: '15px'
                                  }}
                                  value={industry}
                                  onChange={this.handleIndustry}
                                >
                                  <option value="" disabled selected hidden>
                                    Select industry
                                  </option>
                                  {leadQualiIndustry.map(i => (
                                    <option value={i.name} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>
                              <Form.Field>
                                <label>Product Manufacturers</label>
                                <select
                                  style={{
                                    width: '290px',
                                    height: '40px',
                                    fontSize: '15px'
                                  }}
                                  value={product}
                                  onChange={this.handleProduct}
                                >
                                  <option value="" disabled selected hidden>
                                    Select product manufacture
                                  </option>
                                  {leadProductManufacture.map(i => (
                                    <option value={i.name} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>
                              <Form.Field>
                                <label>Sale Zone</label>
                                <select
                                  style={{
                                    width: '290px',
                                    height: '40px',
                                    fontSize: '15px'
                                  }}
                                  value={salezone}
                                  onChange={this.handleSalezone}
                                >
                                  <option value="" disabled selected hidden>
                                    Select sale zone
                                  </option>
                                  {leadSaleZone.map(i => (
                                    <option value={i.name} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>
                              <Form.Field>
                                <label>Details</label>
                                <TextArea
                                  value={leadDetails}
                                  onChange={this.handleLeadDetails}
                                />
                              </Form.Field>
                            </div>
                          </Form>
                          <br />
                          <br />
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <br />
                              <Form.Group inline>
                                <label />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Budgetary"
                                  value="Budgetary"
                                  checked={leadstatus === 'Budgetary'}
                                  onChange={this.handleChange}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Firm"
                                  value="Firm"
                                  checked={leadstatus === 'Firm'}
                                  onChange={this.handleChange}
                                />
                              </Form.Group>
                              <br />
                              <br />
                              <Form.Field width={4}>
                                <label>Assign To</label>
                                <div style={{ width: 400 }}>
                                  <Search
                                    loading={isLoadingAssign}
                                    onResultSelect={
                                      this.handleResultSelectAssign
                                    }
                                    onSearchChange={
                                      this.handleSearchChangeAssign
                                    }
                                    results={resultsAssign}
                                    value={valueAssign}
                                    resultRenderer={resultRendererAssign}
                                    aligned="right"
                                  />
                                </div>
                              </Form.Field>
                              <br />
                              <br />
                              <Form.Group inline>
                                <label>Customer Visit</label>
                                <div style={{ display: 'flex' }}>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      style={{ fontSize: '16px' }}
                                      type="radio"
                                      id="radio1"
                                      name="radio1"
                                      value="call"
                                      onChange={this.handleMachnie}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio1"
                                    >
                                      Call
                                    </label>
                                  </div>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      style={{ fontSize: '16px' }}
                                      type="radio"
                                      id="radio2"
                                      name="radio1"
                                      value="visit"
                                      onChange={this.handleMachnie}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio2"
                                    >
                                      Visit
                                    </label>
                                  </div>
                                </div>
                              </Form.Group>
                              <br />
                              <br />
                              <Button
                                color="blue"
                                onClick={() => this.handleSubmitLead()}
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '10%'
                                }}
                              >
                                Save
                              </Button>

                              <Button
                                onClick={() => this.handleLeadCancel()}
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '10%'
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
                          <font color="green">{this.state.msg}</font>
                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>

                    {/* Soniya
                    <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Lead Qualification"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.leadreviewdate}
                          onChange={this.handleLeadReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Type of industry</label>
                        <select value={industry} onChange={this.handleIndustry}>
                          <option value="" disabled selected hidden>
                            Select industry
                          </option>
                          {leadQualiIndustry.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Product Manufacturers</label>
                        <select value={product} onChange={this.handleProduct}>
                          <option value="" disabled selected hidden>
                            Select product manufacture
                          </option>
                          {leadProductManufacture.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Sale Zone</label>
                        <select value={salezone} onChange={this.handleSalezone}>
                          <option value="" disabled selected hidden>
                            Select sale zone
                          </option>
                          {leadSaleZone.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Details</label>
                        <TextArea
                          value={leadDetails}
                          onChange={this.handleLeadDetails}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label />
                        <Form.Radio
                          label="Budgetary"
                          value="Budgetary"
                          checked={leadstatus === 'Budgetary'}
                          onChange={this.handleChange}
                        />
                        <Form.Radio
                          label="Firm"
                          value="Firm"
                          checked={leadstatus === 'Firm'}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>Assign To</label> */}
                    {/* <select value={assign} onChange={this.handleAssign}>
                          <option value="" disabled selected hidden>
                            Select employee
                          </option>
                          {leadAssign.map(i => (
                            <option value={i.role} key={i.id}>
                              {i.role}
                            </option>
                          ))}
                        </select>*/}

                    {/* Soniya
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
                        </div>
                      </Form.Field>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: 'flex' }}>
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
                          </div> */}
                    {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="meeting"
                        onChange={this.handleMachnie}
                      />
                      <label className="labelcolor" htmlFor="radio2">Meeting</label>
                    </div> */}

                    {/*      Soniya                
                        </div>
                      </Form.Group>

                      <Button
                        color="blue"
                        onClick={() => this.handleSubmitLead()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleLeadCancel()}>
                        Cancel
                      </Button>
                    </Form>
                    <font color="green">{this.state.msg}</font>
                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Tech Specification' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Technical Speciﬁcation Finalization"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Review Date</label>
                                <DatePicker
                                  selected={this.state.techReviewDate}
                                  onChange={this.handleTechReviewDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>
                              <Form.Group inline>
                                <label>Technical Requirement freezed</label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="yes"
                                  checked={techFreez === 'yes'}
                                  onChange={this.handleTechFreez}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="no"
                                  checked={techFreez === 'no'}
                                  onChange={this.handleTechFreez}
                                />
                              </Form.Group>
                              <Form.Field>
                                <label>Group</label>

                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={group}
                                  onChange={this.handlegroup}
                                >
                                  <option value="" disabled selected hidden>
                                    Select group
                                  </option>
                                  {groupData.map(i => (
                                    <option value={i.id} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>
                              <Form.Field>
                                <label>Sub Group</label>

                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={subgroup}
                                  onChange={this.handlesubgroup}
                                >
                                  <option value="" disabled selected hidden>
                                    Select Sub Group
                                  </option>
                                  {subGroupData.map(i => (
                                    <option value={i.name} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>
                              <Form.Field>
                                <label>Product Type</label>

                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={productType}
                                  onChange={this.handleProductTypeData}
                                >
                                  <option value="" disabled selected hidden>
                                    Select Product Type
                                  </option>
                                  {productTypeData.map(i => (
                                    <option value={i.name} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>

                              <Form.Group inline>
                                <label />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Spare"
                                  value="spare"
                                  checked={techstatus === 'spare'}
                                  onChange={this.handleTechStatus}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Equipment"
                                  value="equipment"
                                  checked={techstatus === 'equipment'}
                                  onChange={this.handleTechStatus}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Chemical / Oil"
                                  value="oil"
                                  checked={techstatus === 'oil'}
                                  onChange={this.handleTechStatus}
                                />
                              </Form.Group>

                              <Form.Field>
                                <label>Model</label>
                                <input
                                  placeholder=""
                                  value={model}
                                  onChange={this.handlemodel}
                                />
                              </Form.Field>
                            </div>
                          </Form>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Capacity</label>
                                <input
                                  placeholder=""
                                  value={capacity}
                                  onChange={this.handlecapacity}
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Description</label>
                                <TextArea
                                  value={techdescription}
                                  onChange={this.handleTechdescription}
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Quantity</label>
                                <input
                                  placeholder=""
                                  value={quantity}
                                  onChange={this.handlequantity}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>Send Qtn</label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="qtnyes"
                                  checked={quotation === 'qtnyes'}
                                  onChange={this.handlequotation}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="qtnno"
                                  checked={quotation === 'qtnno'}
                                  onChange={this.handlequotation}
                                />
                              </Form.Group>

                              <Form.Group inline>
                                <label>Customer Visit</label>
                                <div style={{ display: 'flex' }}>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio2"
                                      name="radio2"
                                      value="call"
                                      onChange={this.handelCustVisit}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio2"
                                    >
                                      Call
                                    </label>
                                  </div>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio2"
                                      name="radio2"
                                      value="visit"
                                      onChange={this.handelCustVisit}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio2"
                                    >
                                      Visit
                                    </label>
                                  </div>
                                  {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio2"
                        value="meeting"
                        onChange={this.handelCustVisit}
                      />
                      <label className="labelcolor" htmlFor="radio2">Meeting</label>
                    </div> */}
                                </div>
                              </Form.Group>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                color="blue"
                                onClick={() => this.handleSubmitTech()}
                              >
                                Save
                              </Button>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                onClick={() => this.handleTechCancel()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
                          <font color="green">{this.state.msg}</font>
                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}

                    {/* Soniya commented 29/05/19
                    
                    <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Technical Speciﬁcation Finalization"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.techReviewDate}
                          onChange={this.handleTechReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>
                      <Form.Group inline>
                        <label>Technical Requirement freezed</label>
                        <Form.Radio
                          label="Yes"
                          value="yes"
                          checked={techFreez === 'yes'}
                          onChange={this.handleTechFreez}
                        />
                        <Form.Radio
                          label="No"
                          value="no"
                          checked={techFreez === 'no'}
                          onChange={this.handleTechFreez}
                        />
                      </Form.Group>
                      <Form.Field width={4}>
                        <label>Group</label>

                        <select value={group} onChange={this.handlegroup}>
                          <option value="" disabled selected hidden>
                            Select group
                          </option>
                          {groupData.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Sub Group</label>

                        <select value={subgroup} onChange={this.handlesubgroup}>
                          <option value="" disabled selected hidden>
                            Select Sub Group
                          </option>
                          {subGroupData.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>

                      <Form.Group inline>
                        <label />
                        <Form.Radio
                          label="Spare"
                          value="spare"
                          checked={techstatus === 'spare'}
                          onChange={this.handleTechStatus}
                        />
                        <Form.Radio
                          label="Equipment"
                          value="equipment"
                          checked={techstatus === 'equipment'}
                          onChange={this.handleTechStatus}
                        />
                        <Form.Radio
                          label="Chemical / Oil"
                          value="oil"
                          checked={techstatus === 'oil'}
                          onChange={this.handleTechStatus}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>Model</label>
                        <input
                          placeholder=""
                          value={model}
                          onChange={this.handlemodel}
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Capacity</label>
                        <input
                          placeholder=""
                          value={capacity}
                          onChange={this.handlecapacity}
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Description</label>
                        <TextArea
                          value={techdescription}
                          onChange={this.handleTechdescription}
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Quantity</label>
                        <input
                          placeholder=""
                          value={quantity}
                          onChange={this.handlequantity}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>Send Qtn</label>
                        <Form.Radio
                          label="Yes"
                          value="qtnyes"
                          checked={quotation === 'qtnyes'}
                          onChange={this.handlequotation}
                        />
                        <Form.Radio
                          label="No"
                          value="qtnno"
                          checked={quotation === 'qtnno'}
                          onChange={this.handlequotation}
                        />
                      </Form.Group>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio2"
                              name="radio2"
                              value="call"
                              onChange={this.handelCustVisit}
                            />
                            <label className="labelcolor" htmlFor="radio2">
                              Call
                            </label>
                          </div>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio2"
                              name="radio2"
                              value="visit"
                              onChange={this.handelCustVisit}
                            />
                            <label className="labelcolor" htmlFor="radio2">
                              Visit
                            </label>
                          </div> */}
                    {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio2"
                        value="meeting"
                        onChange={this.handelCustVisit}
                      />
                      <label className="labelcolor" htmlFor="radio2">Meeting</label>
                    </div> */}
                    {/* Soniya commented 29/05/19
                        </div>
                      </Form.Group>

                      <Button
                        color="blue"
                        onClick={() => this.handleSubmitTech()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleTechCancel()}>
                        Cancel
                      </Button>
                    </Form>
                    <font color="green">{this.state.msg}</font>
                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Project Feasibility' && (
              <ContentArea>
                <TixyContent>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Project Feasibility"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Review Date</label>

                                <DatePicker
                                  selected={this.state.projectReviewDate}
                                  onChange={this.handleprojectreviewdate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Date of contract with customer </label>
                              </Form.Field>

                              <DatePicker
                                selected={this.state.projectPlanDate}
                                onChange={this.handleprojectplandate}
                                onFocus={e => e.target.blur()}
                                showYearDropdown
                                dateFormat="DD-MM-YYYY"
                                placeholderText="Planned Date"
                              />
                              <br />
                              <DatePicker
                                selected={this.state.projectActualDate}
                                onChange={this.handleprojectactualdate}
                                onFocus={e => e.target.blur()}
                                showYearDropdown
                                dateFormat="DD-MM-YYYY"
                                placeholderText="Actual Date"
                              />

                              <br />
                              <Form.Field width={4}>
                                <label>Type of project</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={typeofProject}
                                  onChange={this.handletypeofproject}
                                >
                                  <option value="" disabled selected hidden>
                                    Select Project
                                  </option>
                                  <option value="New" key="">
                                    New
                                  </option>
                                  <option value="Expansion" key="">
                                    Expansion
                                  </option>
                                  <option value="Modernization" key="">
                                    Modernization
                                  </option>
                                  <option value="Up-gradation" key="">
                                    Up-gradation
                                  </option>
                                  <option value="Replacement" key="">
                                    Replacement
                                  </option>
                                </select>
                              </Form.Field>

                              <Form.Field>
                                <label>
                                  Target date of commissioning of plant
                                </label>
                                <DatePicker
                                  selected={this.state.projectTargetDate}
                                  onChange={this.handleprojectargetdate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>
                                  Approx lead time of other plant machinery
                                  (months )
                                </label>
                                <DatePicker
                                  selected={this.state.projectLeadTime}
                                  onChange={this.handleprojectleadatime}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>

                              <Form.Field width={4}>
                                <label>Land / PCB NOC</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={projectLand}
                                  onChange={this.handleprojectland}
                                >
                                  <option value="" disabled selected hidden>
                                    Select Land
                                  </option>
                                  <option value="Applied" key="">
                                    Applied
                                  </option>
                                  <option value="Obtained" key="">
                                    Obtained
                                  </option>
                                  <option value="Not applied" key="">
                                    Not applied
                                  </option>
                                  <option value="Rejected" key="">
                                    Rejected
                                  </option>
                                </select>
                              </Form.Field>

                              <Form.Field width={4}>
                                <label>Civil work</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={civilWork}
                                  onChange={this.handlecivilWork}
                                >
                                  <option value="" disabled selected hidden>
                                    Select Land
                                  </option>
                                  <option value="In Progress" key="">
                                    In Progress
                                  </option>
                                  <option value="Not started" key="">
                                    Not started
                                  </option>
                                  <option value="Completed" key="">
                                    Completed
                                  </option>
                                </select>
                              </Form.Field>
                            </div>
                          </Form>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field width={4}>
                                <label>Mode of finance of project</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={financeMode}
                                  onChange={this.handlefinancemode}
                                >
                                  <option value="" disabled selected hidden>
                                    Select finance project
                                  </option>
                                  <option value="Self" key="">
                                    Self
                                  </option>
                                  <option value="Bank" key="">
                                    Bank
                                  </option>
                                  <option value="Others" key="">
                                    Others
                                  </option>
                                </select>
                              </Form.Field>

                              <Form.Field width={4}>
                                <label>If on loan,status of finance</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={financeStatus}
                                  onChange={this.handlefinancestatus}
                                >
                                  <option value="" disabled selected hidden>
                                    Select finance project
                                  </option>
                                  <option value="Applied" key="">
                                    Applied
                                  </option>
                                  <option value="Not applied" key="">
                                    Not applied
                                  </option>
                                  <option value="Sanctioned" key="">
                                    Sanctioned
                                  </option>
                                  <option value="Not sanctioned" key="">
                                    Not sanctioned
                                  </option>
                                </select>
                              </Form.Field>

                              <Form.Field>
                                <label>Projected date of finalization</label>
                                <DatePicker
                                  selected={this.state.projectedDate}
                                  onChange={this.handleprojectedDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Lead Progress"
                                  value="lead"
                                  checked={projectStatus === 'lead'}
                                  onChange={this.handleprojectstatus}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Dropped"
                                  value="dropped"
                                  checked={projectStatus === 'dropped'}
                                  onChange={this.handleprojectstatus}
                                />
                              </Form.Group>

                              <Form.Group inline>
                                <label>Customer Visit</label>
                                <div style={{ display: 'flex' }}>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio3"
                                      name="radio3"
                                      value="call"
                                      onChange={this.handleProjectAction}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio3"
                                    >
                                      Call
                                    </label>
                                  </div>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio3"
                                      name="radio3"
                                      value="visit"
                                      onChange={this.handleProjectAction}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio3"
                                    >
                                      Visit
                                    </label>
                                  </div>
                                  {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio3"
                        name="radio3"
                        value="meeting"
                        onChange={this.handleProjectAction}
                      />
                      <label className="labelcolor"  htmlFor="radio3">Meeting</label>
                    </div> */}
                                </div>
                              </Form.Group>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                color="blue"
                                onClick={() => this.handleProjectSubmit()}
                              >
                                Save
                              </Button>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                onClick={() => this.handleProjectCancel()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>

                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* Soniya commented 29/05/19
                    <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Project Feasibility"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.projectReviewDate}
                          onChange={this.handleprojectreviewdate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Date of contract with customer </label>
                      </Form.Field>
                      <Form.Group widths={1}>
                        <DatePicker
                          selected={this.state.projectPlanDate}
                          onChange={this.handleprojectplandate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Planned Date"
                        />
                      </Form.Group>
                      <Form.Group widths={1}>
                        <DatePicker
                          selected={this.state.projectActualDate}
                          onChange={this.handleprojectactualdate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Actual Date"
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>Type of project</label>
                        <select
                          value={typeofProject}
                          onChange={this.handletypeofproject}
                        >
                          <option value="" disabled selected hidden>
                            Select Project
                          </option>
                          <option value="New" key="">
                            New
                          </option>
                          <option value="Expansion" key="">
                            Expansion
                          </option>
                          <option value="Modernization" key="">
                            Modernization
                          </option>
                          <option value="Up-gradation" key="">
                            Up-gradation
                          </option>
                          <option value="Replacement" key="">
                            Replacement
                          </option>
                        </select>
                      </Form.Field>

                      <Form.Field>
                        <label>Target date of commissioning of plant</label>
                        <DatePicker
                          selected={this.state.projectTargetDate}
                          onChange={this.handleprojectargetdate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>
                          Approx lead time of other plant machinery (months )
                        </label>
                        <DatePicker
                          selected={this.state.projectLeadTime}
                          onChange={this.handleprojectleadatime}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Land / PCB NOC</label>
                        <select
                          value={projectLand}
                          onChange={this.handleprojectland}
                        >
                          <option value="" disabled selected hidden>
                            Select Land
                          </option>
                          <option value="Applied" key="">
                            Applied
                          </option>
                          <option value="Obtained" key="">
                            Obtained
                          </option>
                          <option value="Not applied" key="">
                            Not applied
                          </option>
                          <option value="Rejected" key="">
                            Rejected
                          </option>
                        </select>
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Civil work</label>
                        <select
                          value={civilWork}
                          onChange={this.handlecivilWork}
                        >
                          <option value="" disabled selected hidden>
                            Select Land
                          </option>
                          <option value="In Progress" key="">
                            In Progress
                          </option>
                          <option value="Not started" key="">
                            Not started
                          </option>
                          <option value="Completed" key="">
                            Completed
                          </option>
                        </select>
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Mode of finance of project</label>
                        <select
                          value={financeMode}
                          onChange={this.handlefinancemode}
                        >
                          <option value="" disabled selected hidden>
                            Select finance project
                          </option>
                          <option value="Self" key="">
                            Self
                          </option>
                          <option value="Bank" key="">
                            Bank
                          </option>
                          <option value="Others" key="">
                            Others
                          </option>
                        </select>
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>If on loan,status of finance</label>
                        <select
                          value={financeStatus}
                          onChange={this.handlefinancestatus}
                        >
                          <option value="" disabled selected hidden>
                            Select finance project
                          </option>
                          <option value="Applied" key="">
                            Applied
                          </option>
                          <option value="Not applied" key="">
                            Not applied
                          </option>
                          <option value="Sanctioned" key="">
                            Sanctioned
                          </option>
                          <option value="Not sanctioned" key="">
                            Not sanctioned
                          </option>
                        </select>
                      </Form.Field>

                      <Form.Field>
                        <label>Projected date of finalization</label>
                        <DatePicker
                          selected={this.state.projectedDate}
                          onChange={this.handleprojectedDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label />
                        <Form.Radio
                          label="Lead Progress"
                          value="lead"
                          checked={projectStatus === 'lead'}
                          onChange={this.handleprojectstatus}
                        />
                        <Form.Radio
                          label="Dropped"
                          value="dropped"
                          checked={projectStatus === 'dropped'}
                          onChange={this.handleprojectstatus}
                        />
                      </Form.Group>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio3"
                              name="radio3"
                              value="call"
                              onChange={this.handleProjectAction}
                            />
                            <label className="labelcolor" htmlFor="radio3">
                              Call
                            </label>
                          </div>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio3"
                              name="radio3"
                              value="visit"
                              onChange={this.handleProjectAction}
                            />
                            <label className="labelcolor" htmlFor="radio3">
                              Visit
                            </label>
                          </div> */}
                    {/* Soniya commented 29/05/19
                          <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio3"
                        name="radio3"
                        value="meeting"
                        onChange={this.handleProjectAction}
                      />
                      <label className="labelcolor"  htmlFor="radio3">Meeting</label>
                    </div> */}
                    {/* </div>
                      </Form.Group>

                      <Button
                        color="blue"
                        onClick={() => this.handleProjectSubmit()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleProjectCancel()}>
                        Cancel
                      </Button>
                    </Form>

                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'KYC' && (
              <ContentArea>
                <TixyContent>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="KYC"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Review Date</label>
                                <DatePicker
                                  selected={this.state.manReviewDate}
                                  onChange={this.handleManReviewDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>
                              <Form.Field
                                style={{
                                  marginTop: '10%'
                                }}
                              >
                                <label>Site Image</label>
                                <FileUploader
                                  accept="image/*"
                                  name="avatar"
                                  multiple
                                  storageRef={contract}
                                  onUploadStart={this.handleUploadStart}
                                  onUploadError={this.handleUploadError}
                                  onUploadSuccess={this.handleUploadSuccess}
                                  onProgress={this.handleProgress}
                                />
                              </Form.Field>

                              <Progress
                                style={{
                                  marginTop: '10%'
                                }}
                                percent={this.state.progress}
                                active
                                color="green"
                              />

                              <p>{this.state.uploadedfileName}</p>
                            </div>
                          </Form>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Group inline>
                                <label>Identified OEM</label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="oemyes"
                                  checked={oem === 'oemyes'}
                                  onChange={this.handleOEM}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="oemno"
                                  checked={oem === 'oemno'}
                                  onChange={this.handleOEM}
                                />
                              </Form.Group>

                              <Form.Field>
                                <label>If yes,Name</label>
                                <input
                                  placeholder=""
                                  value={oemname}
                                  onChange={this.handleOemName}
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Contact Details</label>
                                <input
                                  placeholder=""
                                  value={oemdetails}
                                  onChange={this.handleOemDetails}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>Qualified Consultant ?</label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="qualifyes"
                                  checked={qualified === 'qualifyes'}
                                  onChange={this.handleQualified}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="qualifyno"
                                  checked={qualified === 'qualifyno'}
                                  onChange={this.handleQualified}
                                />
                              </Form.Group>

                              <Form.Field>
                                <label>If yes,Name</label>
                                <input
                                  placeholder=""
                                  value={qualifiedName}
                                  onChange={this.handleQualifiedName}
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Contact Details</label>
                                <input
                                  placeholder=""
                                  value={qualifiedDetails}
                                  onChange={this.handleQualifiedDetails}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>Identified Influencer ?</label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="influyes"
                                  checked={influencer === 'influyes'}
                                  onChange={this.handleInfluencer}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="influno"
                                  checked={influencer === 'influno'}
                                  onChange={this.handleInfluencer}
                                />
                              </Form.Group>

                              <Form.Field>
                                <label>If yes,Name</label>
                                <input
                                  placeholder=""
                                  value={influencerName}
                                  onChange={this.handleInfluencerName}
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Contact Details</label>
                                <input
                                  placeholder=""
                                  value={influencerDetails}
                                  onChange={this.handleInfluencerDetails}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>Customer Visit</label>
                                <div style={{ display: 'flex' }}>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio4"
                                      name="radio4"
                                      value="call"
                                      onChange={this.handleKYCAction}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio4"
                                    >
                                      Call
                                    </label>
                                  </div>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio4"
                                      name="radio4"
                                      value="visit"
                                      onChange={this.handleKYCAction}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio4"
                                    >
                                      Visit
                                    </label>
                                  </div>
                                  {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio4"
                        name="radio4"
                        value="meeting"
                        onChange={this.handleKYCAction}
                      />
                      <label className="labelcolor" htmlFor="radio4">Meeting</label>
                    </div> */}
                                </div>
                              </Form.Group>
                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                color="blue"
                                onClick={() => this.handleManSubmit()}
                              >
                                Save
                              </Button>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                onClick={() => this.handleManCancel()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>

                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/*Soniya commented 29/05/19
                     <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="KYC"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.manReviewDate}
                          onChange={this.handleManReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Site Image</label>
                        <FileUploader
                          accept="image/*"
                          name="avatar"
                          multiple
                          storageRef={contract}
                          onUploadStart={this.handleUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleUploadSuccess}
                          onProgress={this.handleProgress}
                        />
                      </Form.Field>

                      <Progress
                        percent={this.state.progress}
                        active
                        color="green"
                      />

                      <p>{this.state.uploadedfileName}</p>

                      <Form.Group inline>
                        <label>Identified OEM</label>
                        <Form.Radio
                          label="Yes"
                          value="oemyes"
                          checked={oem === 'oemyes'}
                          onChange={this.handleOEM}
                        />
                        <Form.Radio
                          label="No"
                          value="oemno"
                          checked={oem === 'oemno'}
                          onChange={this.handleOEM}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>If yes,Name</label>
                        <input
                          placeholder=""
                          value={oemname}
                          onChange={this.handleOemName}
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Contact Details</label>
                        <input
                          placeholder=""
                          value={oemdetails}
                          onChange={this.handleOemDetails}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>Qualified Consultant ?</label>
                        <Form.Radio
                          label="Yes"
                          value="qualifyes"
                          checked={qualified === 'qualifyes'}
                          onChange={this.handleQualified}
                        />
                        <Form.Radio
                          label="No"
                          value="qualifyno"
                          checked={qualified === 'qualifyno'}
                          onChange={this.handleQualified}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>If yes,Name</label>
                        <input
                          placeholder=""
                          value={qualifiedName}
                          onChange={this.handleQualifiedName}
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Contact Details</label>
                        <input
                          placeholder=""
                          value={qualifiedDetails}
                          onChange={this.handleQualifiedDetails}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>Identified Influencer ?</label>
                        <Form.Radio
                          label="Yes"
                          value="influyes"
                          checked={influencer === 'influyes'}
                          onChange={this.handleInfluencer}
                        />
                        <Form.Radio
                          label="No"
                          value="influno"
                          checked={influencer === 'influno'}
                          onChange={this.handleInfluencer}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>If yes,Name</label>
                        <input
                          placeholder=""
                          value={influencerName}
                          onChange={this.handleInfluencerName}
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Contact Details</label>
                        <input
                          placeholder=""
                          value={influencerDetails}
                          onChange={this.handleInfluencerDetails}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio4"
                              name="radio4"
                              value="call"
                              onChange={this.handleKYCAction}
                            />
                            <label className="labelcolor" htmlFor="radio4">
                              Call
                            </label>
                          </div>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio4"
                              name="radio4"
                              value="visit"
                              onChange={this.handleKYCAction}
                            />
                            <label className="labelcolor" htmlFor="radio4">
                              Visit
                            </label>
                          </div> */}
                    {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio4"
                        name="radio4"
                        value="meeting"
                        onChange={this.handleKYCAction}
                      />
                      <label className="labelcolor" htmlFor="radio4">Meeting</label>
                    </div> */}
                    {/* Soniya commented 29/05/19
                        </div>
                      </Form.Group>
                      <Button
                        color="blue"
                        onClick={() => this.handleManSubmit()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleManCancel()}>
                        Cancel
                      </Button>
                    </Form>

                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}
            {/* {activeItem === "Order Analysis" && (
              <ContentArea>
                <TixyContent style={{ height: "100vh" }}>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: "100%" }}
                  >
                    <Form.Field
                      className="labelcolor"
                      label="Order Analysis"
                      required
                    />
                    <hr />

                    <Form>
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.orderReviewDate}
                          onChange={this.handleOrderReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="YYYY-MM-DD"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Name of the competitor</label>
                        <select
                          value={orderCompetitor}
                          onChange={this.handleOrderCompetitor}
                        >
                          <option value="" disabled selected hidden>
                            Select Names
                          </option>
                          {orderCompetitorArray.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Select Status</label>
                        <select
                          value={orderStatus}
                          onChange={this.handleOrderStatus}
                        >
                          <option value="" disabled selected hidden>
                            Select status
                          </option>
                          {orderStatusArray.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Loss of order analysis</label>
                        <select
                          value={orderanalysis}
                          onChange={this.handleOrderAnalysis}
                        >
                          <option value="" disabled selected hidden>
                            Select status
                          </option>
                          <option value="Poor Salesmanship" key="">
                            Poor Salesmanship
                          </option>
                          <option value="Lack of Engagements" key="">
                            Lack of Engagements
                          </option>
                          <option value="Lack of Persude Value" key="">
                            Lack of Persude Value
                          </option>
                        </select>
                      </Form.Field>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio5"
                        name="radio5"
                        value="call"
                        onChange={this.handleOrderAction}
                      />
                      <label className="labelcolor" htmlFor="radio5">Call</label>
                    </div>
                    <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio5"
                        name="radio5"
                        value="visit"
                        onChange={this.handleOrderAction}
                      /> 
                      <label className="labelcolor" htmlFor="radio5">Visit</label>
                    </div>
                    <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio5"
                        name="radio5"
                        value="meeting"
                        onChange={this.handleMachnie}
                      />
                      <label className="labelcolor"  htmlFor="radio5">Meeting</label>
                    </div>
                  </div>
                      </Form.Group>

                      <Button
                        color="blue"
                        onClick={() => this.handleOrderSubmit()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleOrderCancel()}>
                        Cancel
                      </Button>
                    </Form>

                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font>
                  </Segment>
                </TixyContent>
              </ContentArea>
            )} */}

            {activeItem === 'Ref Showcasing' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Reference Showcasing"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Review Date</label>
                                <DatePicker
                                  selected={this.state.refReviewDate}
                                  onChange={this.handleRefReviewDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>
                              <Form.Group inline>
                                <label>
                                  Do we have working reference in the area ?
                                </label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="refyes"
                                  checked={refArea === 'refyes'}
                                  onChange={this.handleRefArea}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="refno"
                                  checked={refArea === 'refno'}
                                  onChange={this.handleRefArea}
                                />
                              </Form.Group>
                              <Form.Group inline>
                                <label>Reference site visit required ?</label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="refvisityes"
                                  checked={refVisitSite === 'refvisityes'}
                                  onChange={this.handleRefVisit}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="refvisitno"
                                  checked={refVisitSite === 'refvisitno'}
                                  onChange={this.handleRefVisit}
                                />
                              </Form.Group>
                              <Form.Field width={4}>
                                <label>Planned Date</label>
                                <DatePicker
                                  selected={this.state.refPlanDate}
                                  onChange={this.handleRefPlanDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>
                              <Form.Field width={4}>
                                <label>Actual Date</label>
                                <DatePicker
                                  selected={this.state.refActualDate}
                                  onChange={this.handleRefActualDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>
                            </div>
                          </Form>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Customer response after visit</label>
                                <TextArea
                                  style={{ width: '100%' }}
                                  value={refAfterVisit}
                                  onChange={this.handleRefcustVisit}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>
                                  Is customer ready to move to next level of
                                  discussion ?
                                </label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="levelyes"
                                  checked={
                                    refNextLevelDiscussion === 'levelyes'
                                  }
                                  onChange={this.handleReflevelDiscussion}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="levelno"
                                  checked={refNextLevelDiscussion === 'levelno'}
                                  onChange={this.handleReflevelDiscussion}
                                />
                              </Form.Group>

                              <Form.Field width={4}>
                                <label>
                                  {' '}
                                  If yes,tentative date of next meeting
                                </label>
                                <DatePicker
                                  selected={this.state.refNextMeeting}
                                  onChange={this.handleRefNextMeeting}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>Customer Visit</label>
                                <div style={{ display: 'flex' }}>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio6"
                                      name="radio6"
                                      value="call"
                                      onChange={this.handleRefAction}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio6"
                                    >
                                      Call
                                    </label>
                                  </div>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio6"
                                      name="radio6"
                                      value="visit"
                                      onChange={this.handleRefAction}
                                    />
                                    <label
                                      className="labelcolor"
                                      htmlFor="radio6"
                                    >
                                      Visit
                                    </label>
                                  </div>
                                  {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio6"
                        name="radio6"
                        value="meeting"
                        onChange={this.handleObjAction}
                      />
                      <label className="labelcolor" htmlFor="radio6">Meeting</label>
                    </div> */}
                                </div>
                              </Form.Group>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                color="blue"
                                onClick={() => this.handleRefSubmit()}
                              >
                                Save
                              </Button>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                onClick={() => this.handleRefCancel()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>

                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/*Soniya commented 29/05/19
                     <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Reference Showcasing"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.refReviewDate}
                          onChange={this.handleRefReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>
                      <Form.Group inline>
                        <label>
                          Do we have working reference in the area ?
                        </label>
                        <Form.Radio
                          label="Yes"
                          value="refyes"
                          checked={refArea === 'refyes'}
                          onChange={this.handleRefArea}
                        />
                        <Form.Radio
                          label="No"
                          value="refno"
                          checked={refArea === 'refno'}
                          onChange={this.handleRefArea}
                        />
                      </Form.Group>
                      <Form.Group inline>
                        <label>Reference site visit required ?</label>
                        <Form.Radio
                          label="Yes"
                          value="refvisityes"
                          checked={refVisitSite === 'refvisityes'}
                          onChange={this.handleRefVisit}
                        />
                        <Form.Radio
                          label="No"
                          value="refvisitno"
                          checked={refVisitSite === 'refvisitno'}
                          onChange={this.handleRefVisit}
                        />
                      </Form.Group>
                      <Form.Field width={4}>
                        <label>Planned Date</label>
                        <DatePicker
                          selected={this.state.refPlanDate}
                          onChange={this.handleRefPlanDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Actual Date</label>
                        <DatePicker
                          selected={this.state.refActualDate}
                          onChange={this.handleRefActualDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Customer response after visit</label>
                        <TextArea
                          value={refAfterVisit}
                          onChange={this.handleRefcustVisit}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>
                          Is customer ready to move to next level of discussion
                          ?
                        </label>
                        <Form.Radio
                          label="Yes"
                          value="levelyes"
                          checked={refNextLevelDiscussion === 'levelyes'}
                          onChange={this.handleReflevelDiscussion}
                        />
                        <Form.Radio
                          label="No"
                          value="levelno"
                          checked={refNextLevelDiscussion === 'levelno'}
                          onChange={this.handleReflevelDiscussion}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label> If yes,tentative date of next meeting</label>
                        <DatePicker
                          selected={this.state.refNextMeeting}
                          onChange={this.handleRefNextMeeting}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio6"
                              name="radio6"
                              value="call"
                              onChange={this.handleRefAction}
                            />
                            <label className="labelcolor" htmlFor="radio6">
                              Call
                            </label>
                          </div>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio6"
                              name="radio6"
                              value="visit"
                              onChange={this.handleRefAction}
                            />
                            <label className="labelcolor" htmlFor="radio6">
                              Visit
                            </label>
                          </div> */}
                    {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio6"
                        name="radio6"
                        value="meeting"
                        onChange={this.handleObjAction}
                      />
                      <label className="labelcolor" htmlFor="radio6">Meeting</label>
                    </div> */}
                    {/*Soniya commented 29/05/19
                         </div>
                      </Form.Group>

                      <Button
                        color="blue"
                        onClick={() => this.handleRefSubmit()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleRefCancel()}>
                        Cancel
                      </Button>
                    </Form>

                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}
            {activeItem === 'Objection Handling' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Objection Handling"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Review Date</label>
                                <DatePicker
                                  selected={this.state.objectionReviewDate}
                                  onChange={this.handleObjectionReviewDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>

                              <Form.Field width={4}>
                                <label>Customer objection raised</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={objectionCustRaised}
                                  onChange={this.handleObjectionCustRaised}
                                >
                                  <option value="" disabled selected hidden>
                                    Select customer
                                  </option>
                                  {objectionRaisedArray.map(i => (
                                    <option value={i.id} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>

                              <Form.Field width={4}>
                                <label>Status of objection</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={objectionStatus}
                                  onChange={this.handleObjectionStatus}
                                >
                                  <option value="" disabled selected hidden>
                                    Select status
                                  </option>
                                  {orderStatusArray.map(i => (
                                    <option value={i.id} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>

                              <Form.Group inline>
                                <label>
                                  Is customer ready to place order ?
                                </label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="custyes"
                                  checked={objectionPlaceOrder === 'custyes'}
                                  onChange={this.handleObjectionPlaceOrder}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="custno"
                                  checked={objectionPlaceOrder === 'custno'}
                                  onChange={this.handleObjectionPlaceOrder}
                                />
                              </Form.Group>

                              <Form.Group inline>
                                <label>
                                  Payment term accepted by customers
                                </label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="paymentyes"
                                  checked={objectionPayment === 'paymentyes'}
                                  onChange={this.handleObjectionPayment}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="paymentno"
                                  checked={objectionPayment === 'paymentno'}
                                  onChange={this.handleObjectionPayment}
                                />
                              </Form.Group>
                            </div>
                          </Form>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>
                                  If no,what alternative payment terms,proposed
                                  by customers ?
                                </label>
                                <TextArea
                                  style={{ width: '100%' }}
                                  value={objectionPaymentTerms}
                                  onChange={this.handleObjectionPaymentTerms}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>Payment terms acceptable to us ? </label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="termyes"
                                  checked={objectionPaymentAccept === 'termyes'}
                                  onChange={this.handleObjectionPaymentAccept}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="termno"
                                  checked={objectionPaymentAccept === 'termno'}
                                  onChange={this.handleObjectionPaymentAccept}
                                />
                              </Form.Group>

                              <Form.Group inline>
                                <label>Customer Visit</label>
                                <div style={{ display: 'flex' }}>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio7"
                                      name="radio7"
                                      value="call"
                                      onChange={this.handleObjAction}
                                    />
                                    <label
                                      style={{ fontSize: '16px' }}
                                      className="labelcolor"
                                      htmlFor="radio7"
                                    >
                                      Call
                                    </label>
                                  </div>
                                  <div style={{ marginLeft: 12 }}>
                                    <input
                                      type="radio"
                                      id="radio7"
                                      name="radio7"
                                      value="visit"
                                      onChange={this.handleObjAction}
                                    />
                                    <label
                                      style={{ fontSize: '16px' }}
                                      className="labelcolor"
                                      htmlFor="radio7"
                                    >
                                      Visit
                                    </label>
                                  </div>
                                  {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio7"
                        name="radio7"
                        value="meeting"
                        onChange={this.handleObjAction}
                      />
                      <label  className="labelcolor" htmlFor="radio7">Meeting</label>
                    </div> */}
                                </div>
                              </Form.Group>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                color="blue"
                                onClick={() => this.handleObjectionSubmit()}
                              >
                                Save
                              </Button>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                onClick={() => this.handleObjectionCancel()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>

                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/*Soniya commented 29/05/19
                     <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Objection Handling"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.objectionReviewDate}
                          onChange={this.handleObjectionReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Customer objection raised</label>
                        <select
                          value={objectionCustRaised}
                          onChange={this.handleObjectionCustRaised}
                        >
                          <option value="" disabled selected hidden>
                            Select customer
                          </option>
                          {objectionRaisedArray.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Status of objection</label>
                        <select
                          value={objectionStatus}
                          onChange={this.handleObjectionStatus}
                        >
                          <option value="" disabled selected hidden>
                            Select status
                          </option>
                          {orderStatusArray.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>

                      <Form.Group inline>
                        <label>Is customer ready to place order ?</label>
                        <Form.Radio
                          label="Yes"
                          value="custyes"
                          checked={objectionPlaceOrder === 'custyes'}
                          onChange={this.handleObjectionPlaceOrder}
                        />
                        <Form.Radio
                          label="No"
                          value="custno"
                          checked={objectionPlaceOrder === 'custno'}
                          onChange={this.handleObjectionPlaceOrder}
                        />
                      </Form.Group>

                      <Form.Group inline>
                        <label>Payment term accepted by customers</label>
                        <Form.Radio
                          label="Yes"
                          value="paymentyes"
                          checked={objectionPayment === 'paymentyes'}
                          onChange={this.handleObjectionPayment}
                        />
                        <Form.Radio
                          label="No"
                          value="paymentno"
                          checked={objectionPayment === 'paymentno'}
                          onChange={this.handleObjectionPayment}
                        />
                      </Form.Group>
                      <Form.Field width={4}>
                        <label>
                          If no,what alternative payment terms,proposed by
                          customers ?
                        </label>
                        <TextArea
                          value={objectionPaymentTerms}
                          onChange={this.handleObjectionPaymentTerms}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>Payment terms acceptable to us ? </label>
                        <Form.Radio
                          label="Yes"
                          value="termyes"
                          checked={objectionPaymentAccept === 'termyes'}
                          onChange={this.handleObjectionPaymentAccept}
                        />
                        <Form.Radio
                          label="No"
                          value="termno"
                          checked={objectionPaymentAccept === 'termno'}
                          onChange={this.handleObjectionPaymentAccept}
                        />
                      </Form.Group>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio7"
                              name="radio7"
                              value="call"
                              onChange={this.handleObjAction}
                            />
                            <label className="labelcolor" htmlFor="radio7">
                              Call
                            </label>
                          </div>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio7"
                              name="radio7"
                              value="visit"
                              onChange={this.handleObjAction}
                            />
                            <label className="labelcolor" htmlFor="radio7">
                              Visit
                            </label>
                          </div> */}
                    {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio7"
                        name="radio7"
                        value="meeting"
                        onChange={this.handleObjAction}
                      />
                      <label  className="labelcolor" htmlFor="radio7">Meeting</label>
                    </div> */}

                    {/*Soniya commented 29/05/19
                         </div>
                      </Form.Group>

                      <Button
                        color="blue"
                        onClick={() => this.handleObjectionSubmit()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleObjectionCancel()}>
                        Cancel
                      </Button>
                    </Form>

                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Sales Order' && (
              <ContentArea>
                <TixyContent>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Sales Order"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field>
                                <label>Review Date</label>
                                <DatePicker
                                  selected={this.state.saleReviewDate}
                                  onChange={this.handleSaleReviewDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Price Negotiation</label>
                                <input
                                  type="text"
                                  value={saleNegPrice}
                                  onChange={this.handleSalePriceNego}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>Final price mutually accepted ?</label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="priceyes"
                                  checked={saleFinalPrice === 'priceyes'}
                                  onChange={this.handleSaleFinalPrice}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="priceno"
                                  checked={saleFinalPrice === 'priceno'}
                                  onChange={this.handleSaleFinalPrice}
                                />
                              </Form.Group>

                              {saleFinalPrice == 'priceyes' && (
                                <Form.Field>
                                  <label>Final Price</label>
                                  <input
                                    type="text"
                                    value={this.state.finalPrice}
                                    onChange={this.handleFinalPrice}
                                  />
                                </Form.Field>
                              )}

                              <Form.Group inline>
                                <label>Order closed in our favour ? </label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="orderyes"
                                  checked={saleOrderClose === 'orderyes'}
                                  onChange={this.handleSaleOrderClosed}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="orderno"
                                  checked={saleOrderClose === 'orderno'}
                                  onChange={this.handleSaleOrderClosed}
                                />
                              </Form.Group>

                              <Form.Field>
                                <label>If no,Order lost details</label>
                                <TextArea
                                  style={{ width: '100%' }}
                                  value={saleOrderLostDetails}
                                  onChange={this.handleSaleLostDetail}
                                />
                              </Form.Field>
                            </div>
                          </Form>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <div style={{ width: '100%' }}>
                              <Form.Field width={4}>
                                <label>Competitor</label>
                                <select
                                  style={{
                                    fontSize: '15px',
                                    width: '290px',
                                    height: '40px'
                                  }}
                                  value={saleCompetitor}
                                  onChange={this.handleSaleCompetitor}
                                >
                                  <option value="" disabled selected hidden>
                                    Competitor
                                  </option>
                                  {orderCompetitorArray.map(i => (
                                    <option value={i.id} key={i.id}>
                                      {i.name}
                                    </option>
                                  ))}
                                </select>
                              </Form.Field>

                              <Form.Field>
                                <label>Price</label>
                                <input
                                  placeholder=""
                                  value={saleNormalPrice}
                                  onChange={this.handleSaleNormalPrice}
                                />
                              </Form.Field>

                              <Form.Field>
                                <label>Payment Terms</label>
                                <input
                                  placeholder=""
                                  value={salePaymentTerms}
                                  onChange={this.handleSalePaymentTerms}
                                />
                              </Form.Field>

                              <Form.Group inline>
                                <label>If yes,Generate sales order ? </label>
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="Yes"
                                  value="sm"
                                  checked={saleOrder === 'sm'}
                                  onChange={this.handleSaleOrder}
                                />
                                <Form.Radio
                                  style={{ fontSize: '16px' }}
                                  label="No"
                                  value="orderno"
                                  checked={saleOrder === 'orderno'}
                                  onChange={this.handleSaleOrder}
                                />
                              </Form.Group>

                              <Form.Field width={4}>
                                <label>Sales order generated system date</label>
                                <DatePicker
                                  selected={this.state.saleSystemDate}
                                  onChange={this.handleSaleOrderSystemDate}
                                  onFocus={e => e.target.blur()}
                                  showYearDropdown
                                  dateFormat="DD-MM-YYYY"
                                  placeholderText="Enter Date"
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Image</label>
                                <FileUploader
                                  accept="image/*"
                                  name="avatar"
                                  multiple
                                  storageRef={contract}
                                  onUploadStart={this.handleUploadStart}
                                  onUploadError={this.handleUploadError}
                                  onUploadSuccess={this.handleUploadSuccess}
                                  onProgress={this.handleProgress}
                                />
                              </Form.Field>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                color="blue"
                                onClick={() => this.handleSaleSubmit()}
                              >
                                Save
                              </Button>

                              <Button
                                style={{
                                  width: '40%',
                                  marginLeft: '5%',
                                  marginTop: '5%'
                                }}
                                onClick={() => this.handleSaleCancel()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>

                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* 
                    Soniya commented 29/05/19
                    <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Sales Order"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.saleReviewDate}
                          onChange={this.handleSaleReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Price Negotiation</label>
                        <input
                          type="text"
                          value={saleNegPrice}
                          onChange={this.handleSalePriceNego}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>Final price mutually accepted ?</label>
                        <Form.Radio
                          label="Yes"
                          value="priceyes"
                          checked={saleFinalPrice === 'priceyes'}
                          onChange={this.handleSaleFinalPrice}
                        />
                        <Form.Radio
                          label="No"
                          value="priceno"
                          checked={saleFinalPrice === 'priceno'}
                          onChange={this.handleSaleFinalPrice}
                        />
                      </Form.Group>

                      {saleFinalPrice == 'priceyes' && (
                        <Form.Field width={4}>
                          <label>Final Price</label>
                          <input
                            type="text"
                            value={this.state.finalPrice}
                            onChange={this.handleFinalPrice}
                          />
                        </Form.Field>
                      )}

                      <Form.Group inline>
                        <label>Order closed in our favour ? </label>
                        <Form.Radio
                          label="Yes"
                          value="orderyes"
                          checked={saleOrderClose === 'orderyes'}
                          onChange={this.handleSaleOrderClosed}
                        />
                        <Form.Radio
                          label="No"
                          value="orderno"
                          checked={saleOrderClose === 'orderno'}
                          onChange={this.handleSaleOrderClosed}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>If no,Order lost details</label>
                        <TextArea
                          value={saleOrderLostDetails}
                          onChange={this.handleSaleLostDetail}
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Competitor</label>
                        <select
                          value={saleCompetitor}
                          onChange={this.handleSaleCompetitor}
                        >
                          <option value="" disabled selected hidden>
                            Competitor
                          </option>
                          {orderCompetitorArray.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Price</label>
                        <input
                          placeholder=""
                          value={saleNormalPrice}
                          onChange={this.handleSaleNormalPrice}
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Payment Terms</label>
                        <input
                          placeholder=""
                          value={salePaymentTerms}
                          onChange={this.handleSalePaymentTerms}
                        />
                      </Form.Field>

                      <Form.Group inline>
                        <label>If yes,Generate sales order ? </label>
                        <Form.Radio
                          label="Yes"
                          value="sm"
                          checked={saleOrder === 'sm'}
                          onChange={this.handleSaleOrder}
                        />
                        <Form.Radio
                          label="No"
                          value="orderno"
                          checked={saleOrder === 'orderno'}
                          onChange={this.handleSaleOrder}
                        />
                      </Form.Group>

                      <Form.Field width={4}>
                        <label>Sales order generated system date</label>
                        <DatePicker
                          selected={this.state.saleSystemDate}
                          onChange={this.handleSaleOrderSystemDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Image</label>
                        <FileUploader
                          accept="image/*"
                          name="avatar"
                          multiple
                          storageRef={contract}
                          onUploadStart={this.handleUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleUploadSuccess}
                          onProgress={this.handleProgress}
                        />
                      </Form.Field>

                      <Button
                        color="blue"
                        onClick={() => this.handleSaleSubmit()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleSaleCancel()}>
                        Cancel
                      </Button>
                    </Form>

                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}
            {activeItem === 'Order Analysis' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment
                    padded
                    className="icon_name"
                    style={{ height: '100%' }}
                  >
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Order Analysis"
                      required
                    />
                    <hr />
                    <ContentArea style={{ width: '50%' }}>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            left: '60%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <Form
                            style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                          >
                            <Form.Field>
                              <label>Review Date</label>
                              <DatePicker
                                selected={this.state.orderReviewDate}
                                onChange={this.handleOrderReviewDate}
                                onFocus={e => e.target.blur()}
                                showYearDropdown
                                dateFormat="DD-MM-YYYY"
                                placeholderText="Enter Date"
                              />
                            </Form.Field>

                            <Form.Field width={4}>
                              <label>Name of the competitor</label>
                              <select
                                style={{
                                  fontSize: '15px',
                                  width: '290px',
                                  height: '40px'
                                }}
                                value={orderCompetitor}
                                onChange={this.handleOrderCompetitor}
                              >
                                <option value="" disabled selected hidden>
                                  Select Names
                                </option>
                                {orderCompetitorArray.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                            </Form.Field>
                            <Form.Field width={4}>
                              <label>Select Status</label>
                              <select
                                style={{
                                  fontSize: '15px',
                                  width: '290px',
                                  height: '40px'
                                }}
                                value={orderStatus}
                                onChange={this.handleOrderStatus}
                              >
                                <option value="" disabled selected hidden>
                                  Select status
                                </option>
                                {orderStatusArray.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                            </Form.Field>
                            <Form.Field width={4}>
                              <label>Loss of order analysis</label>
                              <select
                                style={{
                                  fontSize: '15px',
                                  width: '290px',
                                  height: '40px'
                                }}
                                value={orderanalysis}
                                onChange={this.handleOrderAnalysis}
                              >
                                <option value="" disabled selected hidden>
                                  Select status
                                </option>
                                <option value="Poor Salesmanship" key="">
                                  Poor Salesmanship
                                </option>
                                <option value="Lack of Engagements" key="">
                                  Lack of Engagements
                                </option>
                                <option value="Lack of Persude Value" key="">
                                  Lack of Persude Value
                                </option>
                              </select>
                            </Form.Field>

                            <Form.Group inline>
                              <label>Customer Visit</label>
                              <div style={{ display: 'flex' }}>
                                <div style={{ marginLeft: 12 }}>
                                  <input
                                    type="radio"
                                    id="radio5"
                                    name="radio5"
                                    value="call"
                                    onChange={this.handleOrderAction}
                                  />
                                  <label
                                    className="labelcolor"
                                    htmlFor="radio5"
                                  >
                                    Call
                                  </label>
                                </div>
                                <div style={{ marginLeft: 12 }}>
                                  <input
                                    type="radio"
                                    id="radio5"
                                    name="radio5"
                                    value="visit"
                                    onChange={this.handleOrderAction}
                                  />
                                  <label
                                    className="labelcolor"
                                    htmlFor="radio5"
                                  >
                                    Visit
                                  </label>
                                </div>
                                {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio5"
                        name="radio5"
                        value="meeting"
                        onChange={this.handleMachnie}
                      />
                      <label className="labelcolor"  htmlFor="radio5">Meeting</label>
                    </div> */}
                              </div>
                            </Form.Group>

                            <Button
                              style={{
                                width: '40%',
                                marginLeft: '5%',
                                marginTop: '5%'
                              }}
                              color="blue"
                              onClick={() => this.handleOrderSubmit()}
                            >
                              Save
                            </Button>

                            <Button
                              style={{
                                width: '40%',
                                marginLeft: '5%',
                                marginTop: '5%'
                              }}
                              onClick={() => this.handleOrderCancel()}
                            >
                              Cancel
                            </Button>
                          </Form>

                          <br />
                          <br />

                          <font color="green">{this.state.msg}</font>
                          <font color="red">{this.state.Clientmsg}</font>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/*Soniya commented 29/05/19
                     <Form.Field
                      style={{ fontSize: '16px', fontWeight: 'bold' }} //Aishwarya 17/5/19
                      className="labelcolor"
                      label="Order Analysis"
                      required
                    />
                    <hr />

                    <Form
                      style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                    >
                      <Form.Field>
                        <label>Review Date</label>
                        <DatePicker
                          selected={this.state.orderReviewDate}
                          onChange={this.handleOrderReviewDate}
                          onFocus={e => e.target.blur()}
                          showYearDropdown
                          dateFormat="DD-MM-YYYY"
                          placeholderText="Enter Date"
                        />
                      </Form.Field>

                      <Form.Field width={4}>
                        <label>Name of the competitor</label>
                        <select
                          value={orderCompetitor}
                          onChange={this.handleOrderCompetitor}
                        >
                          <option value="" disabled selected hidden>
                            Select Names
                          </option>
                          {orderCompetitorArray.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Select Status</label>
                        <select
                          value={orderStatus}
                          onChange={this.handleOrderStatus}
                        >
                          <option value="" disabled selected hidden>
                            Select status
                          </option>
                          {orderStatusArray.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </Form.Field>
                      <Form.Field width={4}>
                        <label>Loss of order analysis</label>
                        <select
                          value={orderanalysis}
                          onChange={this.handleOrderAnalysis}
                        >
                          <option value="" disabled selected hidden>
                            Select status
                          </option>
                          <option value="Poor Salesmanship" key="">
                            Poor Salesmanship
                          </option>
                          <option value="Lack of Engagements" key="">
                            Lack of Engagements
                          </option>
                          <option value="Lack of Persude Value" key="">
                            Lack of Persude Value
                          </option>
                        </select>
                      </Form.Field>

                      <Form.Group inline>
                        <label>Customer Visit</label>
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio5"
                              name="radio5"
                              value="call"
                              onChange={this.handleOrderAction}
                            />
                            <label className="labelcolor" htmlFor="radio5">
                              Call
                            </label>
                          </div>
                          <div style={{ marginLeft: 12 }}>
                            <input
                              type="radio"
                              id="radio5"
                              name="radio5"
                              value="visit"
                              onChange={this.handleOrderAction}
                            />
                            <label className="labelcolor" htmlFor="radio5">
                              Visit
                            </label>
                          </div> */}
                    {/* <div style={{ marginLeft: 12 }}>
                      <input
                        type="radio"
                        id="radio5"
                        name="radio5"
                        value="meeting"
                        onChange={this.handleMachnie}
                      />
                      <label className="labelcolor"  htmlFor="radio5">Meeting</label>
                    </div> */}
                    {/* Soniya commented 29/05/19
                        </div>
                      </Form.Group>

                      <Button
                        color="blue"
                        onClick={() => this.handleOrderSubmit()}
                      >
                        Save
                      </Button>

                      <Button onClick={() => this.handleOrderCancel()}>
                        Cancel
                      </Button>
                    </Form>

                    <br />
                    <br />

                    <font color="green">{this.state.msg}</font>
                    <font color="red">{this.state.Clientmsg}</font> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}
          </div>
        </PageContainer2>

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
          style={{ marginTop: '2em' }}
          closeIcon
          onClose={this.handleClose}
        >
          <Modal.Header>
            <label className="labelcolor" style={{ width: '5em' }}>
              <b>Action Type - Call </b>
            </label>
          </Modal.Header>

          <Modal.Content>
            <div>
              <Form
                style={{ fontSize: '16px' }} //Aishwarya 17/5/19
              >
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column>
                      <label className="labelcolor" style={{ width: '5em' }}>
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
                        style={{ width: '9em' }}
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
                style={{ fontSize: '16px' }} //Aishwarya 17/5/19
              >
                <label className="labelcolor" style={{ width: '5em' }}>
                  Type of Call :-
                </label>
                <br />
                <br />
                <select
                  style={{ width: '290px', height: '40px' }} //Aishwarya 17/5/19
                  value={calltypeid}
                  onChange={this.handleSelectCallId}
                >
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
                <Form>
                  {/** <Form.Group widths="equal">
                    <Form.Input
                      label="Call Expected Outcome"
                      placeholder="Call Expected Outcome"
                      type="text"
                      value={CallexOutCome}
                      onChange={this.handleCallExoutCome}
                      //required 
                      hidden
                    />

                    <Form.Input
                      label="Call actual outcome"
                      placeholder="Call actual outcome"
                      type="text"
                      value={CallactualOutcome}
                      onChange={this.handleCallAoutCome}
                      //required 
                      hidden
                       
                       
                    />
                  </Form.Group>
                    */}
                  <label
                    className="labelcolor"
                    style={{ fontSize: '16px' }} //Aishwarya 17/5/19
                  >
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
                  style={{ backgroundColor: '#863577', color: '#ffffff' }}
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
          style={{ marginTop: '2em' }}
          closeIcon
          onClose={this.handleClose}
        >
          <Modal.Header>
            <label className="labelcolor" style={{ width: '5em' }}>
              <b>Action Type - Meeting</b>
            </label>
          </Modal.Header>

          <Modal.Content>
            <div>
              <Form>
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

              <Form widths="equal">
                <hr />

                <label className="labelcolor" style={{ width: '5em' }}>
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
                <Form>
                  {/** <Form.Group widths="equal">
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
                  </Form.Group> */}

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
                  style={{ backgroundColor: '#863577', color: '#ffffff' }}
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
          style={{ marginTop: '2em' }}
          closeIcon
          onClose={this.handleClose}
        >
          <Modal.Header>
            <label className="labelcolor" style={{ width: '5em' }}>
              <b>Action Type - Visit</b>
            </label>
            <hr />
          </Modal.Header>

          <Modal.Content>
            <div>
              <Form
                style={{ fontSize: '16px' }} //Aishwarya 17/5/19
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
              <div style={{ fontSize: '16px' }}>
                {' '}
                {/*Aishwarya 17/5/19*/}
                <label>
                  <b>Type Of Visit </b>
                </label>
                <br />
                <select
                  style={{ width: '290px', height: '40px' }} //Aishwarya 17/5/19
                  value={visitTypeid}
                  onChange={this.handleVisiTypeId}
                >
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
                  style={{ fontSize: '16px' }} //Aishwarya 17/5/19
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

                  {/** <Form.Group widths="equal">
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
                  </Form.Group>*/}

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
                style={{
                  backgroundColor: '#863577',
                  color: '#ffffff',
                  fontSize: '16px'
                }} //Aishwarya 17/5/19
                onClick={() => this.handleClose()}
              >
                Add Visit
              </Button>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const TabClick = props => {
  return <TabClick1 {...props}>{props.name}</TabClick1>
}

const searchStyle = {
  width: '19em'
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
  background: 'transparent',
  boxShadow: '0 0 0 1px #ffffff inset',
  color: '#ffffff',
  padding: '14px',
  width: '31em'
}

const btnColor = {
  backgroundColor: '#863577',
  color: 'white'
}

export default LeadAdd
