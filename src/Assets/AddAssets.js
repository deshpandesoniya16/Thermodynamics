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
  List,
  Radio,
  Segment,
  Progress,
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
import Carousel from "nuka-carousel"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import SmartUpload from "../component/SmartUpload"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { Asset_fbs } from "../component/base"
import ErrorModal from "../component/ErrorModal"

import { vendorGodview, VendorBasedProduct } from "../component/Api"
import SuccessModal from "../component/SuccessModal"
import MediaQuery from "react-responsive"
import StarRatingComponent from "react-star-rating-component"
import Workbook from "react-excel-workbook"
import RawCarousel from "../component/RawCarousel"

import {
  verticallist,
  addVertical,
  verticalBasedgrp,
  grouplist,
  grpBasedsubgrp,
  fuelTypelist,
  fuelNamelist,
  serieslist,
  verticalAsset,
  assetGrp
} from "./../component/Api"

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

class AddAssets extends Component {
  state = {
    menuVisible: false,
    lastAction: moment().format("DD/MM/YYYY"),
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
    ProductType: "",
    group: "",
    Machnie: "",

    aname: "",
    srno: "",

    startDate: moment(),
    ToDate: moment(),
    doc: moment(),

    TotalPrice: "",
    pname: "",
    assetName: "",
    isOpenAsset: false,
    ptype: "",
    qty: true,
    AssetData: [],
    ProductData: [],
    asset_status: "",
    isopen: false,
    Vname: "",
    unitPrice: "",

    AssetImage: [],
    uploadedfileurl: "",

    clientData: [],
    owner: "",
    VendorData: [],
    assetId: "",

    isSucess: false,
    SuccessMsg: "",
    assetApplication: "",
    amsg: "",
    ImageData: [],
    ImageData1: [],
    isAsset: false,
    verticalData: [],
    vertical: "",
    serialCode: "",
    groupData: [],
    subGroupData: [],
    grpid: "",
    sgrpid: "",
    GrupName: "",
    fuelTypeData: [],
    fuelNameData: [],
    fuelname: "",
    ftype: "",
    seriesData: [],
    Vertical: "",
    finalsrno: "",
    fuelCombuster: "",
    fuelFieding: "",
    atype: "",
    seriesId: "",
    astatusn: "",
    asset_statusN: "",
    disableN: false,
    disableNS: false,
    disableI: false,
    disableNI: false
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
        } else {
          console.log("No vertical")
          this.setState({ verticalData: [] })
        }
      })
  }

  // listAsset=(id)=>{
  //   fetch(verticalAsset, {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       verticalName:id
  //     })
  // }).then(data => {
  //     return data.json();
  // }).then(data => {
  //      console.log("data",data)
  //      console.log("asset list",data.records)
  //      if(data.records){
  //        this.setState({AssetData:data.records})

  //      }else{
  //        console.log("No vertical")
  //        this.setState({AssetData:[]})
  //      }
  // })

  // }

  listSeries = () => {
    fetch(serieslist, {
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
        console.log("Series Name List ", data.records)
        if (data.records) {
          this.setState({ seriesData: data.records })
        } else {
          console.log("No Series Name")
          this.setState({ seriesData: [] })
        }
      })
  }

  listFuelType = () => {
    fetch(fuelTypelist, {
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
        console.log("Fuel Type list", data.records)
        if (data.records) {
          this.setState({ fuelTypeData: data.records })
        } else {
          console.log("No Fuel Type ")
          this.setState({ fuelTypeData: [] })
        }
      })
  }

  listFuelName = () => {
    fetch(fuelNamelist, {
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
        console.log("Fuel Name list", data.records)
        if (data.records) {
          this.setState({ fuelNameData: data.records })
        } else {
          console.log("No Fuel Type ")
          this.setState({ fuelNameData: [] })
        }
      })
  }

  listGroup = id => {
    fetch(verticalBasedgrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Group List ", data.records)
        if (data.records) {
          this.setState({ groupData: data.records })
        } else {
          console.log("No Group")
          this.setState({ groupData: [] })
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
          this.setState({ subGroupData: data.records })
        } else {
          console.log("No Sub Group")
          this.setState({ subGroupData: [] })
        }
      })
  }

  vendorGodview = () => {
    fetch(vendorGodview, {
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
        console.log("Vendor data", data.records)
        if (data.records) {
          this.setState({ VendorData: data.records })
        } else {
          console.log("No vendor")
          this.setState({ VendorData: [] })
        }
      })
  }

  assetTypeList = () => {
    fetch("http://35.161.99.113:9000/webapi/t_asset/t_typeList", {
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
        console.log("Asset data", data.records)
        if (data.records) {
          this.setState({ AssetData: data.records })
        } else {
          console.log("No Assets")
          this.setState({ AssetData: [] })
        }
      })
  }

  componentDidMount() {
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

    this.assetTypeList()
    this.vendorGodview()
    this.listVertical()
    this.listGroup()
    this.listFuelType()
    this.listFuelName()
    this.listSeries()
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue })
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleProduct = e => {
    console.log("product type", e.target.value)
    this.setState({
      ProductType: e.target.value,
      assetmsg: ""
      // checked: this.state.checked
    })
  }

  handleGroup = e => {
    console.log("product Group", e.target.value)
    this.setState({
      group: e.target.value
      // checked: this.state.checked
    })
  }

  handleMachnie = e => {
    let name = e.target.value
    if (name == "IN Service") {
      this.setState({ disableI: true, disableNI: false })
    }
    console.log("product Group", e.target.value)
    this.setState({
      asset_status: e.target.value,
      assetmsg: ""

      // checked: this.state.checked
    })
  }

  handleMachnieN = e => {
    let name = e.target.value
    if (name == "Not in Service") {
      this.setState({ disableI: false, disableNI: true })
    }
    console.log("product Group", e.target.value)
    this.setState({
      asset_statusN: e.target.value,
      assetmsg: ""

      // checked: this.state.checked
    })
  }

  handleAssetStatus = e => {
    let name = e.target.value
    if (name == "Installed") {
      this.setState({ disableN: true, disableNS: false })
    }
    console.log("handle A status", e.target.value)
    this.setState({ astatus: e.target.value })
  }

  handleAssetStatusN = e => {
    let name = e.target.value
    if (name == "Not Installed") {
      this.setState({ disableNS: true, disableN: false })
    }
    console.log("handle A status N", e.target.value)
    this.setState({ astatusn: e.target.value })
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
      isOpenAsset: false,
      isOpenReject: false,
      isOpenClose: false,
      isopen: false,
      isSucess: false,
      isAsset: false
    })
    clearTimeout(this.timeout)
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value })
  }

  handlelastAction = e => {
    this.setState({ lastAction: e.target.value })
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

  //Search
  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.company_name })
    this.setState({ SelectedResult: result })
    setTimeout(() => {
      // let active=true
      console.log("Selected", this.state.SelectedResult)
      if (this.state.SelectedResult) {
        this.setState({
          Name: this.state.SelectedResult.company_name,
          Phno: this.state.SelectedResult.number,
          Address: this.state.SelectedResult.address,
          owner: this.state.SelectedResult.owner,
          email: this.state.SelectedResult.email
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
    this.setState({ valueAssign: result.name })
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

  handleAssets = e => {
    console.log("Assets Value are", e.target.value)
    this.setState({ atype: e.target.value })
  }

  handleAddAssets = () => {
    console.log("Submit is called")
    if (!this.state.Vname) {
      this.setState({ assetmsg: "Please Select Vendor", isAsset: true })
    } else if (!this.state.ptype) {
      this.setState({ assetmsg: "Please Select Product", isAsset: true })
    } else if (this.state.Vertical.length <= 0) {
      this.setState({ assetmsg: "Please Select Vertical", isAsset: true })
    } else if (this.state.GrupName.length <= 0) {
      this.setState({ assetmsg: "Please Select Group Name", isAsset: true })
    } else if (this.state.sgrpid.length <= 0) {
      this.setState({ assetmsg: "Please Select Sub Group Name", isAsset: true })
    } else if (this.state.atype.length <= 0) {
      this.setState({ assetmsg: "Please Select Asset Type", isAsset: true })
    } else if (this.state.seriesId.length <= 0) {
      this.setState({ assetmsg: "Please Select Series", isAsset: true })
    } else if (this.state.finalsrno.length <= 0) {
      this.setState({ assetmsg: "Please Enter Serial No.", isAsset: true })
    } else {
      fetch("http://35.161.99.113:9000/webapi/t_asset/t_addAsset", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: this.state.ptype,
          vendorId: this.state.Vname,
          asset_type: this.state.atype,
          unitPrice: this.state.unitPrice,
          serialNumber: this.state.finalsrno,
          lastActionTime: this.state.lastAction,
          star: this.state.rating,
          vertical: this.state.Vertical,
          groupName: this.state.GrupName,
          subGroupName: this.state.sgrpid,
          series: this.state.seriesId
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
          let aid = data.records.insertId
          console.log("assetid id is", data.records.insertId)
          this.setState({
            assetmsg: "Asset is Created",
            assetId: aid,
            isSuccess: true
          })

          setTimeout(() => {
            // window.location.reload()
          }, 1000)
        })
    }
  }

  addStackholder = () => {
    console.log("Add Stack Holder is clicked")

    if (this.state.assetId.length < 0) {
      this.setState({ msg: "Please Genrate Asset Id", isopen: true })
    } else if (!this.state.SelectedResult.id) {
      this.setState({ msg: "Please Select Client", isopen: true })
    } else if (!this.state.SelectedResultAssign.name) {
      this.setState({ msg: "Please Assign Employee", isopen: true })
      // }else if(!this.state.FromDate){
      //   this.setState({ msg: "Please Select From Date", isopen: true })
      // }else if(!this.state.ToDate){
      //   this.setState({ msg: "Please Select To Date", isopen: true })

      // } else if (this.state.asset_status.length <= 0) {
      //   this.setState({ msg: "Please Select asset status", isopen: true })
      // } else if (this.state.astatus.length <= 0) {
      //   this.setState({ msg: "Please Select Asset Service Status", isopen: true })
    } else {
      fetch("http://35.161.99.113:9000/webapi/t_asset/t_addStakeAsset", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assetId: this.state.assetId,
          clientId: this.state.SelectedResult.id,
          assignee: this.state.SelectedResultAssign.name,
          fromDate: moment(this.state.startDate).format("DD-MM-YYYY"),
          toDate: moment(this.state.ToDate).format("DD-MM-YYYY"),
          totalPrice: this.state.TotalPrice,
          qty: this.state.aqty,
          lastActionTime: this.state.lastAction,
          installed: this.state.astatus,
          service: this.state.asset_status,
          doc: moment(this.state.doc).format("DD-MM-YYYY"),
          fuelType: this.state.ftype,
          fuelName: this.state.fuelname,
          fuelFieding: this.state.fuelFieding,
          fuelCombuster: this.state.fuelCombuster,
          imageData: this.state.ImageData1
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)

          if (data.message == "Asset Stakeholder Added") {
            this.setState({
              isSucess: true,
              SuccessMsg: "Asset Stakeholder Added"
            })
            //this.empty()
            setTimeout(() => {
              this.setState({ isSuccess: false,redirectToAsset: true})
            }, 1000)
          } else {
            this.setState({
              msg: "Someting went wrong !!!",
              error: true,
              isopen: true
            })
          }
        })
    }
  }

  empty = () => {
    this.setState({
      asset_status: " ",
      astatus: " ",
      Name: "",
      Phno: "",
      aqty: "",
      TotalPrice: "",
      value: "",
      owner: "",
      valueAssign: "",
      startDate: moment(),
      ToDate: moment(),
      doc: moment(),
      AssetImage: [],
      progress: 0,
      isUploading: false,
      uploadedfileurl: "",
      uploadedfileName: ""
    })
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
    Asset_fbs.child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.ImageData1.push(url)
        this.state.ImageData.push({ link: url })
        this.setState({ uploadedfileurl: url })
      })

    console.log("asset images are", this.state.ImageData)
    setTimeout(() => {
      if (this.state.progress == 100) {
        this.setState({ filename: "", progress: 0 })
      } else {
        console.log("error in upload")
      }
    }, 1000)
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  handleAssetName = e => {
    this.setState({ aname: e.target.value, msg1: "" })
  }

  handleSrno = e => {
    let serialno = e.target.value
    let tuid = this.state.serialCode + serialno
    console.log(tuid)

    //  var NumVal = 1;
    //  var tradspec1 = "test1";
    //  var tradspec2 = "test2";
    //  var tradspec3 = "test3";

    //  alert(window["tradspec" + NumVal.toString()]);

    this.setState({ srno: e.target.value, msg1: "", finalsrno: tuid })
  }

  handleDate = date => {
    this.setState({ doc: date, msg1: "" })
  }

  handleToDate = date => {
    this.setState({ ToDate: date, msg1: "" })
  }

  handleFromDate = FromDate => {
    this.setState({ startDate: FromDate, msg1: "" })
  }

  handleTotalPrice = e => {
    this.setState({ TotalPrice: e.target.value, msg1: "" })
  }

  handleAsset = e => {
    this.setState({ assetName: e.target.value, msg1: "" })
  }

  handleAddAssetType = () => {
    if (this.state.assetName.length < 0) {
      this.setState({ msg1: "Please Enter Asset Type Name", isopen: true })
    } else {
      fetch("http://35.161.99.113:9000/webapi/t_asset/t_typeAdd ", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: this.state.assetName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)

          if (data.message == "Type Added") {
            this.setState({ amsg: data.message })
            setTimeout(() => {
              this.assetTypeList()
              this.setState({ isOpenAsset: false })
            }, 1000)
          } else {
            this.setState({ amsg: "Something went wrong !!!!!!!" })
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handlePname = e => {
    this.setState({ pname: e.target.value, msg1: "" })
  }

  handleAddProduct = () => {
    //api
    //  this.setState({pname:e.target.value})
  }

  handleProducts = e => {
    console.log("i is", e.target.value)
    this.setState({ ptype: e.target.value, msg: "" })
  }

  handleAssetQty = e => {
    let tp = this.state.unitPrice * e.target.value
    this.setState({
      aqty: e.target.value,
      TotalPrice: tp,
      qty: false,
      msg1: ""
    })
  }

  handlePinfo = i => {
    console.log("name is", i)
  }

  handleVname = e => {
    let vid = e.target.value
    this.setState({ Vname: e.target.value, assetmsg: "" })

    fetch(VendorBasedProduct, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vendorId: vid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Product data", data.records)
        if (data.records) {
          this.setState({ ProductData: data.records })
        } else {
          console.log("No product")
          this.setState({ ProductData: [] })
        }
      })
  }

  handleUnitPrice = e => {
    let tp = this.state.aqty * e.target.value
    this.setState({ unitPrice: e.target.value, TotalPrice: tp, msg1: "" })
  }

  ProductDetails = i => {
    console.log("Product is", i)
  }

  handleAssetApplication = e => {
    this.setState({ assetApplication: e.target.value })
  }

  handleSerialCode = e => {
    this.setState({ serialCode: e.target.value })
  }

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
  }

  handleFuelType = e => {
    let fuelType = e.target.value
    this.setState({ ftype: fuelType })
  }

  handleFuelName = e => {
    let fname = e.target.value
    this.setState({ fuelname: fname })
  }

  handleSelectSeriesId = e => {
    this.setState({ seriesId: e.target.value })
  }

  handleVertical = e => {
    let vname = e.target.value
    let vid
    this.state.verticalData.map(i => {
      if (i.vertical == vname) {
        vid = i.id
      }
    })
    this.listGroup(vid)
    this.setState({ Vertical: vname, isHOD: true })
  }

  handlefuelFieding = e => {
    this.setState({ fuelFieding: e.target.value })
  }

  handleFuelCombuster = e => {
    this.setState({ fuelCombuster: e.target.value })
  }

  render() {
    console.log("props", this.props)

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
      isOpen,
      aname,
      srno,
      ToDate,
      startDate,
      TotalPrice,
      atype,
      isOpenAsset,
      pname,
      assetName,
      ptype,
      aqty,
      qty,
      AssetData,
      assetId,
      isSucess,
      ProductData,
      isopen,
      Vname,
      unitPrice,
      AssetImage,
      uploadedfileurl,
      owner,
      VendorData,
      assetApplication,
      ImageData,
      isAsset,
      Vertical,
      verticalData,
      groupData,
      subGroupData,
      grpid,
      sgrpid,
      fuelNameData,
      fuelTypeData,
      fuelname,
      ftype,
      serialCode,
      seriesId,
      seriesData,
      fuelFieding,
      fuelCombuster,
      disableN
    } = this.state

    // console.log("Selected Result", AssetImage)

    let active = false

    if (!SelectedResult.company_name) {
      active = false
    } else {
      active = true
    }

    console.log("in render", this.state.AssetImage)

    return (
      <div>
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Assets">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Add Asset</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded className="icon_name" style={{ height: "100%" }}>
                <label style={{ fontSize: "16px", fontWeight: "bold" }} className="labelcolor">Asset</label>            {/*Aishwarya   17/5/19*/}
                <hr />

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
                <br />

                <Form
                  style={{ fontSize: "16px" }}                //Aishwarya   17/5/19
                >
                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Vendor" required />
                        <select
                          style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19
                          value={Vname}
                          onChange={this.handleVname}
                          required
                        >
                          <option value="" disabled selected hidden>
                            Select Vendor
                          </option>
                          {VendorData.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.vendor_name}
                            </option>
                          ))}
                        </select>
                        <br />
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Product" required />
                        <select
                          style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                          value={ptype}
                          onChange={this.handleProducts}
                          required
                        >
                          <option value="" disabled selected hidden>
                            Select Product
                          </option>
                          {ProductData.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                        <br />
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Vertical" required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19    
                              value={Vertical}
                              onChange={this.handleVertical}
                            >
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
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Group" required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select style={{ width: "290px", height: "38px", fontSize: "15px" }} value={grpid} onChange={this.handleGroup}>            {/*Aishwarya   17/5/19 */}
                              <option value="" disabled selected hidden>
                                Select group
                              </option>
                              {groupData.map(i => (
                                <option value={i.id} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Sub Group" required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19    
                              value={sgrpid}
                              onChange={this.handleSubgrpID}
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
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Asset Type" required />
                        <select
                          style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19      
                          value={atype}
                          onChange={this.handleAssets}
                          required
                        >
                          <option />
                          {AssetData.map(i => (
                            <option value={i.type} key={i.id}>
                              {i.type}
                            </option>
                          ))}
                        </select>
                        <br />
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Series" required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19      
                              value={seriesId}
                              onChange={this.handleSelectSeriesId}
                            >
                              <option value="" disabled selected hidden>
                                Select Series Name
                              </option>
                              {seriesData.map(i => (
                                <option value={i.name} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label="Serial No. " required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19      
                              value={serialCode}
                              onChange={this.handleSerialCode}
                            >
                              <option value="" disabled selected hidden>
                                Select Serial No.
                              </option>

                              <option value="PNA">PNA</option>
                              <option value="PNE">PNE</option>
                              <option value="TUID">TUID</option>
                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>
                  <Form.Group widths={1}>
                    <List.List>
                      <Form.Input
                        label="Asset serial Number"
                        placeholder="Enter Serial Number"
                        value={srno}
                        onChange={this.handleSrno}
                        required
                      />
                      <br />

                      {/* <Form.Group widths={1}>
                        <Form.Input
                          label="Unit Price"
                          placeholder="Unit Price"
                          value={unitPrice}
                          onChange={this.handleUnitPrice}
                        
                        />
                      </Form.Group> */}
                      <br />

                      {/* <label style={{ color: "black" }}>
                        Asset Application{" "}
                      </label>
                      <Form.Group widths={1}>
                        <TextArea
                          label="Asset Application"
                          placeholder="Asset Application"
                          value={assetApplication}
                          onChange={this.handleAssetApplication}
                          required
                        />
                      </Form.Group>
                      <br /> */}
                    </List.List>
                  </Form.Group>
                  <font color="red">{this.state.assetmsg}</font>
                </Form>
                <Button
                  style={{
                    backgroundColor: "#863577",
                    color: "#ffffff",
                    fontSize: "16px"                          //Aishwarya 17/5/19
                  }}
                  onClick={() => this.handleAddAssets()}
                >
                  Add Asset
                </Button>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <Form.Field style={{ fontSize: "16px", fontWeight: "bold" }} label="Client" required />                  {/*Aishwarya   17/5/19 */}
                <hr />
                <label style={{ fontSize: "16px", fontWeight: "bold" }}>Select Client</label>               {/*Aishwarya   17/5/19 */}
                <br />
                <FormText>
                  <div style={{ width: 400, marginTop: "5px" }}>            {/*Aishwarya   17/5/19 */}
                    <Search
                      loading={isLoading}
                      placeholderText="Select Client"
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={this.handleSearchChange}
                      results={results}
                      value={value}
                      resultRenderer={resultRenderer}
                      aligned="right"
                      {...this.props}
                      required
                    />
                  </div>
                  <br />
                </FormText>

                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Name :</span>
                    </Box>
                    <Box2>
                      <span>{this.state.Name}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Mobile No :</span>
                    </Box>
                    <Box2>
                      <span>{this.state.Phno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Address :</span>
                    </Box>
                    <Box2>
                      <span>{this.state.Address}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Email :</span>
                    </Box>
                    <Box2>
                      <span>{this.state.email}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Assign To :</span>
                    </Box>
                    <Box2>
                      <span>{this.state.owner}</span>
                    </Box2>
                  </MainDiv2>
                </MainDivHolder>
                <br />
                <hr />
                {/*<MainDiv2>
                  <Box>
                    <Form.Field style={{ fontSize: "16px", fontWeight: "bold" }} label="Assign By" required />         
                  </Box>
                  <Box2 />
                </MainDiv2>*/}
                <label style={{ fontSize: "16px", fontWeight: "bold" }}>Assign By</label>                    {/*Aishwarya   17/5/19*/}

                <br />
                <FormText>
                  <div style={{ width: 400, marginTop: "5px" }}>            {/*Aishwarya   17/5/19 */}
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
                  <br />
                </FormText>
                <Form
                  style={{ fontSize: "16px" }}                    //aishwarya 17/5/19
                >
                  <List.List className="add_data">
                    <List.Item>
                      <Form.Field label=" From Date :- " required />

                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleFromDate}
                        dateFormat="DD-MM-YYYY"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onFocus={e => e.target.blur()}
                        placeholderText="Select Date"
                        required
                      />
                    </List.Item>
                    <br />
                    <List.Item>
                      <Form.Field label="To Date :-  " required />

                      <DatePicker
                        selected={this.state.ToDate}
                        onChange={this.handleToDate}
                        dateFormat="DD-MM-YYYY"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onFocus={e => e.target.blur()}
                        placeholderText="Select Date"
                        required
                      />
                    </List.Item>
                  </List.List>
                  <br />
                  {/* <Form.Group widths={1}>
                    <Form.Input
                      label="Asset Qty"
                      placeholder="Asset Qty."
                      value={aqty}
                      onChange={this.handleAssetQty}
                      required
                      
                    />
                  </Form.Group>
                  <br />
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Total Price."
                      placeholder="Total Price."
                      value={TotalPrice}
                      onChange={this.handleTotalPrice}
                      disabled={qty}
                      required
                    />
                  </Form.Group> */}
                  <br />
                  <Form.Group inline widths={3}>
                    <input
                      type="radio"
                      id="Machnieradio1"
                      name="Machnieradio1"
                      value="Installed"
                      onChange={this.handleAssetStatus}
                      disabled={this.state.disableNI}
                      required
                    />
                    <label htmlFor="Machnieradio1">Installed</label>
                    <input
                      type="radio"
                      id="radio2"
                      name="Machnieradio1"
                      value="Not Installed"
                      onChange={this.handleAssetStatusN}
                      disabled={this.state.disableI}
                    />
                    <label htmlFor="radio2">Not Installed</label>
                  </Form.Group>
                  <br />
                  <Form.Group inline widths={3}>
                    <input
                      type="radio"
                      id="radio1"
                      name="radio1"
                      value="IN Service"
                      onChange={this.handleMachnie}
                      required
                      disabled={this.state.disableNS}
                    />
                    <label htmlFor="radio1">IN Service</label>
                    <input
                      type="radio"
                      id="radio2"
                      name="radio1"
                      value="Not in Service"
                      onChange={this.handleMachnieN}
                      required
                      disabled={disableN}
                    />
                    <label htmlFor="radio2">Not in Service</label>
                  </Form.Group>

                  <List.Item>
                    <Form.Field label=" Date of commissioning (DOC)" required />
                    <DatePicker
                      selected={this.state.doc}
                      onChange={this.handleDate}
                      onFocus={e => e.target.blur()}
                      placeholderText="Select Date"
                      dateFormat="DD-MM-YYYY"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onFocus={e => e.target.blur()}
                      placeholderText="Select Date"
                      required
                    />
                    <br />
                  </List.Item>
                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field
                          style={{ marginLeft: "10px" }}                    //Aishwarya   17/5/19  
                          label="Type Of Fuel" />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px", marginLeft: "10px" }}                //Aishwarya   17/5/19      
                              value={ftype}
                              onChange={this.handleFuelType}
                            >
                              <option value="" disabled selected hidden>
                                Type of Fuel
                              </option>
                              {fuelTypeData.map(i => (
                                <option value={i.name} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field
                          style={{ marginLeft: "10px" }}                    //Aishwarya   17/5/19 
                          label="Fuel Name" />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px", marginLeft: "10px" }}                //Aishwarya   17/5/19        
                              value={fuelname}
                              onChange={this.handleFuelName}
                            >
                              <option value="" disabled selected hidden>
                                Fuel Name
                              </option>
                              {fuelNameData.map(i => (
                                <option value={i.name} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Input
                      label="Type Of Fuel Fieding"
                      placeholder="Type Of Fuel Fieding"
                      value={fuelFieding}
                      onChange={this.handlefuelFieding}
                    />
                  </Form.Group>
                  <br />

                  <Form.Group widths={1}>
                    <Form.Input
                      label="Type Of Combuster"
                      placeholder="Type Of Combuster"
                      value={fuelCombuster}
                      onChange={this.handleFuelCombuster}
                    />
                  </Form.Group>
                  <br />
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold " }}                    //Aishwarya   17/5/19   
                >Image</label>
                <hr />

                <RawCarousel
                  imageData={
                    (ImageData && ImageData.length >= 0 && ImageData) || []
                  }
                />

                <form>
                  {this.state.isUploading && (
                    <p>Progress: {this.state.progress}</p>
                  )}
                  {this.state.avatarURL && <img src={this.state.avatarURL} />}
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={Asset_fbs}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </form>
                <br />
                <Progress percent={this.state.progress} active color="green">
                  Smart Speed
                </Progress>
              </Segment>
            </TixyContent>
          </ContentArea>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>

            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addStackholder()}
            >
              Add Assets Stack Holder
            </Button>
          </ContentArea>
        </PageContainer2>

        {this.state.redirectToAsset && <Redirect to="/Assets" push />}

        {isopen == true ? (
          <ErrorModal
            isopen={this.state.isopen}
            msg={this.state.msg}
            onClose={this.handleClose}
          />
        ) : (
          <div />
        )}

        {isAsset == true ? (
          <ErrorModal
            isopen={this.state.isAsset}
            msg={this.state.assetmsg}
            onClose={this.handleClose}
          />
        ) : (
          <div />
        )}

        {isSucess == true ? (
          <SuccessModal
            isopen={this.state.isSucess}
            msg={this.state.SuccessMsg}
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

export default AddAssets
