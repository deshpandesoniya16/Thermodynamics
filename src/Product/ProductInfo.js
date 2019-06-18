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
  Progress,
  Radio,
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
import Carousel from "nuka-carousel"
import moment from "moment"
import SmartUpload from "../component/SmartUpload"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { products_fbs } from "../component/base"
import ErrorModal from "../component/ErrorModal"
import SuccessModal from "../component/SuccessModal"
import {
  placeofSupply,
  verticallist,
  grouplist,
  grpBasedsubgrp,
  verticalBasedgrp
} from "../component/Api"
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
  TableContent,
  Box,
  Box2,
  MainDiv2,
  MainDivHolder,
  TextColor
} from "../styledComps.js"
import RawCarousel from "../component/RawCarousel"

class ProductInfo extends Component {
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
    startDate: moment(),
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
    VendorData: [],
    pno: "",
    opno: "",
    modalName: "",
    srno: "",
    ManufacturerName: "",
    stock: "",
    Purchase: "",
    photo: null,
    pname: "",
    Active: "",

    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    s_status: true,
    unitPrice: "",
    mname: "",
    ManufacturerData: [],
    isopen: false,
    HsnCode: "",
    place_Of_Supply: "",
    ImageData: [],
    uploadedfileurl: "",
    email: "",
    type: "",
    tinNo: "",
    panno: "",
    owner: "",
    number: "",
    number2: "",
    gstNo: "",
    cstNo: "",

    errorMsg: "",
    isSucess: false,
    SuccessMsg: "",
    error: false,
    State: [],
    btndisable: false,
    ImageData1: [],
    productDiscription: "",
    verticalData: [],
    Vertical: "",
    groupData: [],
    subGroupData: [],
    grpid: "",
    sgrpid: "",
    GrupName: ""
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
          this.setState({ subGroupData: data.records, sgrpid: "" })
        } else {
          console.log("No Sub Group")
          this.setState({ subGroupData: [], sgrpid: "" })
        }
      })
  }

  componentDidMount() {
    fetch("http://35.161.99.113:9000/webapi/t_vendor/list", {
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
          this.setState({ clientBackupData: data.records })
        } else {
          console.log("No Client")
          this.setState({ VendorData: [] })
        }
      })

    fetch(placeofSupply)
      .then(results => {
        return results.json()
      })
      .then(data => {
        console.log("data of place of Supply", data.records)
        this.setState({ State: data.records })
        //this.setState({ state: data.records })
      })

    this.listVertical()

    this.listGroup()
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value })
  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 })
    this.setState({ isUploading: true, progress: 0 })
    window.dispatchEvent(new Event("resize"))
  }
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
    products_fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.ImageData1.push(url)
        this.state.ImageData.push({ link: url })
        window.dispatchEvent(new Event("resize"))
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

  handleMname = async e => {
    console.log(e.target.value)
    await this.setState({ mname: e.target.value, errorMsg: "" })
    console.log(this.state.mname)
  }

  handleProduct = e => {
    console.log("product type", e.target.value)
    this.setState({
      ProductType: e.target.value,
      // checked: this.state.checked
      errorMsg: ""
    })
  }

  handleGroupBy = e => {
    console.log("product Group", e.target.value)
    this.setState({
      groupid: e.target.value,
      // checked: this.state.checked
      errorMsg: ""
    })
  }

  handleActive = e => {
    console.log("Group", e.target.value)
    this.setState({ Active: e.target.value, errorMsg: "" })
  }

  handleMachnie = e => {
    console.log("product Group", e.target.value)
    this.setState({
      Machnie: e.target.value,
      // checked: this.state.checked
      errorMsg: ""
    })
  }

  handleDiscription = async e => {
    console.log("discrption is", e.target.value)
    await this.setState({ discription: e.target.value, errorMsg: "" })
    console.log("discrption is", this.state.discription)
  }

  handleProductName = e => {
    this.setState({ pname: e.target.value, errorMsg: "" })
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
      isopen: false,
      isSucess: false
    })
    clearTimeout(this.timeout)
  }

  handleProductNo = e => {
    this.setState({ pno: e.target.value, errorMsg: "" })
  }

  handleOldProduct = e => {
    this.setState({ opno: e.target.value, errorMsg: "" })
  }

  handleModal = e => {
    this.setState({ modalName: e.target.value, errorMsg: "" })
  }

  handleSrno = e => {
    this.setState({ srno: e.target.value, errorMsg: "" })
  }

  handlelastAction = e => {
    this.setState({ lastAction: e.target.value })
  }

  handlePurchase = e => {
    if (this.validateNumber(e.target.value)) {
      let pusrchaseStock = e.target.value
      if (pusrchaseStock > 0) {
        this.setState({
          Purchase: pusrchaseStock,
          errorMsg: "",
          s_status: false
        })
      } else {
        pusrchaseStock = 0
        this.setState({
          Purchase: pusrchaseStock,
          errorMsg: "",
          s_status: false
        })
      }
    }
  }

  handleAddress = e => {
    this.setState({ Address: e.target.value, errorMsg: "" })
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
      this.setState({ Phno: e.target.value, errorMsg: "" })
    }
  }

  handleUnitPrice = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ unitPrice: e.target.value, errorMsg: "" })
    }
  }

  //Search
  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.vendor_name })
    this.setState({ SelectedResult: result })
    setTimeout(() => {
      // let active=true
      if (this.state.SelectedResult) {
        this.setState({
          Name: this.state.SelectedResult.vendor_name,
          Phno: this.state.SelectedResult.number,
          Address: this.state.SelectedResult.address,
          type: this.state.SelectedResult.type,
          tinNo: this.state.SelectedResult.tinNo,
          panno: this.state.SelectedResult.panNo,
          owner: this.state.SelectedResult.owner,
          number: this.state.SelectedResult.number,
          number2: this.state.SelectedResult.number2,
          gstNo: this.state.SelectedResult.gstNo,
          email: this.state.SelectedResult.email,
          cstNo: this.state.SelectedResult.cstNo
        })
      }
    }, 1000)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value: value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.vendor_name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.VendorData, isMatch)
      })
    }, 500)
  }

  handleSubmit = () => {
    if (!this.state.pname) {
      this.setState({
        errorMsg: "Please Enter Product Name",
        error: true,
        isopen: true
      })
    } else if (!this.state.Vertical) {
      this.setState({
        errorMsg: "Please Select Vertical.",
        error: true,
        isopen: true
      })
    } else if (this.state.GrupName.length <= 0) {
      this.setState({
        errorMsg: "Please Select Group .",
        error: true,
        isopen: true
      })
    } else if (this.state.sgrpid.length <= 0) {
      this.setState({
        errorMsg: "Please Select Sub Group .",
        error: true,
        isopen: true
      })
    } else if (this.state.ProductType.length <= 0) {
      this.setState({
        errorMsg: "Please Select Product Type .",
        error: true,
        isopen: true
      })
    } else if (!this.state.pno) {
      this.setState({
        errorMsg: "Please Enter Part No.",
        error: true,
        isopen: true
      })
      //  }else if(this.state.modalName.length <=0){
      //   this.setState({errorMsg:"Please Enter Modal Name.",error:true,isopen:true})
    } else if (this.state.Name.length <= 0) {
      this.setState({
        errorMsg: "Please Select Vendor.",
        error: true,
        isopen: true
      })

      // }else if(!this.state.opno){
      //     this.setState({errorMsg:"Please Enter Old Part No.",error:true,isopen:true})
      // }else if(!this.state.ProductType){
      //     this.setState({errorMsg:"Please Select Product Type.",error:true,isopen:true})
      // }else if(!this.state.modalName){
      //     this.setState({errorMsg:"Please Enter Modal Name",error:true,isopen:true})
      // }else if(!this.state.HsnCode){
      //     this.setState({errorMsg:"Please Enter Hsn Code",error:true,isopen:true})
      // }else if(!this.state.place_Of_Supply){
      //     this.setState({errorMsg:"Please Select State",error:true,isopen:true})
      // }else if(!this.state.Active){
      //     this.setState({errorMsg:"Please Select State of Product",error:true,isopen:true})
      // }else if(!this.state.srno){
      //     this.setState({errorMsg:"Please Enter Serial No.",error:true,isopen:true})
      // }else if(!this.state.unitPrice){
      //     this.setState({errorMsg:"Please Enter Unit Price",error:true,isopen:true})
      // }else if(!this.state.Machnie){
      //     this.setState({errorMsg:"Please Select Status of Product",error:true,isopen:true})
      // }else if(!this.state.discription){
      //     this.setState({errorMsg:"Please Enter Discription",error:true,isopen:true})
      // }else if(!this.state.SelectedResult.id){
      //     this.setState({errorMsg:"Please Select Vendor.",error:true,isopen:true})
      // }else if(!this.state.Purchase){
      //     this.setState({errorMsg:"Please Enter Purchase Stock",error:true,isopen:true})
      // }else if(!this.state.stock){
      // this.setState({errorMsg:"Please Enter Stock",error:true,isopen:true})
    } else {
      fetch("http://35.161.99.113:9000/webapi/t_product/t_addProduct ", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.pname,
          lastActionTime: this.state.startDate,
          star: this.state.rating,
          p_old_number: this.state.opno,
          p_type: this.state.ProductType,
          p_group: "",
          p_sr_number: this.state.srno,
          p_status: this.state.Active,
          m_status: "",
          vendor_id: this.state.SelectedResult.id,
          stock_qty: "",
          purchase_qty: "",
          modalName: this.state.modalName,
          productNumber: this.state.pno,
          manufacturer: this.state.groupid,
          unitPrice: "",
          description: this.state.productDiscription,
          hsnCode: this.state.HsnCode,
          imageLink: this.state.ImageData1,
          vertical: this.state.Vertical,
          groupName: this.state.GrupName,
          subGroupName: this.state.sgrpid
          //placeOfSuply:this.state.place_Of_Supply
          //p_id ;
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)
          // window.location.reload()
          if (data.message == "Product Added") {
            this.setState({ btndisable: true })
            this.setState({ isSucess: true, SuccessMsg: data.message })
            setTimeout(() => {
              this.setState({ isSucess: false, redirectToTixy: true })
            }, 1000)
          } else {
            this.setState({ isopen: true, errorMsg: data.error, error: true })
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleStock = e => {
    if (this.validateNumber(e.target.value)) {
      let stock = e.target.value

      if (stock > 0) {
        if (stock <= parseInt(this.state.Purchase)) {
          this.setState({ stock: stock, errorMsg: "" })
        } else {
          this.setState({
            errorMsg: "Enter Stock less than to Purchase Stock",
            isopen: true
          })
        }
      } else {
        this.setState({ stock: 0 })
      }
    }
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  addManufac = () => {
    this.setState({ isOpen: true })
  }

  handleHsn = e => {
    this.setState({ HsnCode: e.target.value, errorMsg: "" })
  }

  handlePlace = e => {
    console.log("Place Code", e.target.value)
    this.setState({ place_Of_Supply: e.target.value, errorMsg: "" })
  }

  RemoveImages = j => {
    console.log("Remove Images ", j)

    this.state.ImageData.map(i => {
      if (i == j) {
        this.state.ImageData.splice(i, 1)
      }
    })

    console.log("after remove", this.state.ImageData)
    // this.setState({ImageData})
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue })
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

  handleProductDiscription = e => {
    let pdes = e.target.value
    this.setState({ productDiscription: pdes })
  }

  render() {
    let {
      lastAction,
      Name,
      Phno,
      Address,
      pno,
      opno,
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
      modalName,
      srno,
      ManufacturerName,
      stock,
      Purchase,
      pname,
      groupid,
      s_status,
      unitPrice,
      isOpen,
      mname,
      ManufacturerData,
      isopen,
      HsnCode,
      place_Of_Supply,
      psid,
      ImageData,
      email,
      type,
      tinNo,
      panno,
      verticalData,
      Vertical,
      owner,
      number,
      number2,
      gstNo,
      cstNo,
      error,
      isSucess,
      State,
      productDiscription,
      groupData,
      subGroupData,
      grpid,
      sgrpid
    } = this.state

    console.log("ImageData", ImageData)

    console.log("Selected Result", SelectedResult)

    return (
      <div>
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Product">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Add Product</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment>
                <label style={{ fontSize: "16px", fontWeight: "bold" }}>Product Details</label>           {/*Aishwarya 17/5/19*/}
                <hr />
                <Form style={{ fontSize: "16px" }}>                    {/*Aishwarya  17/5/19  */}
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Product Name."
                      placeholder="Product Name."
                      value={pname}
                      onChange={this.handleProductName}
                      required
                    />
                  </Form.Group>
                </Form>

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

                <Form>
                  {/* <List.Item className="labelcolor">
                    <Form.Group widths={1}>
                      <Form.Input
                        label="Old Part Number"
                        placeholder="Old Part Number ."
                        value={opno}
                        onChange={this.handleOldProduct}
                        required
                      />
                    </Form.Group>
                  </List.Item> */}

                  <Form
                    style={{ fontSize: "16px" }}                //Aishwarya  
                  >
                    <div>
                      <Form.Field label="Vertical" required />
                      {/*<div style={{ display: "flex" }}>*/}
                      <div style={{ width: "290px", height: "32px" }}>        {/*Aishwarya*/}
                        <div style={{ flex: 1, marginRight: 12 }}>
                          <select
                            value={Vertical}
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
                        </div>
                      </div>

                      {/* <Button
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                      onClick={() => this.handleAddVertical()}
                    >
                      Add Vertical
                    </Button> */}

                      <br />

                      <Form.Field label="Group" required />
                      {/*<div style={{ display: "flex" }}>*/}
                      <div style={{ width: "290px", height: "32px" }}>        {/*Aishwarya*/}
                        <div style={{ flex: 1, marginRight: 12 }}>
                          <select value={grpid} onChange={this.handleGroup}>
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
                      <br />

                      <Form.Field label="SubGroup" required />
                      {/*<div style={{ display: "flex" }}>*/}
                      <div style={{ width: "290px", height: "32px" }}>        {/*Aishwarya*/}
                        <div style={{ flex: 1, marginRight: 12 }}>
                          <select value={sgrpid} onChange={this.handleSubgrpID}>
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
                    </div>
                  </Form>
                  <br />

                  {/* <List.Item className="labelcolor">
                    <Form.Group widths={1}>
                      <Form.Input
                        label="Old Part Number"
                        placeholder="Old Part Number ."
                        value={opno}
                        onChange={this.handleOldProduct}
                        required
                      />
                    </Form.Group>
                  </List.Item> */}
                  <br />
                  <div
                    // style={{ display: "flex" }}
                    style={{ fontSize: "16px" }}          //Aishwarya
                  >
                    <Form.Group inline widths={3}>
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="Spare"
                        onChange={this.handleProduct}
                        required
                      />
                      <label
                        htmlFor="radio1"
                        style={{ padding: "0px 8px 0px 8px" }}
                      >
                        Spare
                      </label>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="Equipment"
                        onChange={this.handleProduct}
                        required
                      />
                      <label
                        htmlFor="radio2"
                        style={{ padding: "0px 8px 0px 8px" }}
                      >
                        Equipment
                      </label>

                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="Chemical/Oil"
                        onChange={this.handleProduct}
                        required
                      />
                      <label
                        htmlFor="radio2"
                        style={{ padding: "0px 8px 0px 8px" }}
                      >
                        Chemical/Oil
                      </label>
                    </Form.Group>
                  </div>
                  <br />
                  <List.Item className="labelcolor">
                    <Form.Group
                      style={{ fontSize: "16px" }}            //Aishwarya
                      widths={1}>
                      <Form.Input
                        label="Part No."
                        placeholder="Product No."
                        value={pno}
                        onChange={this.handleProductNo}
                        required
                      />
                    </Form.Group>
                  </List.Item>

                  <Form.Group
                    style={{ fontSize: "16px" }}            //Aishwarya
                    widths={1}>
                    <Form.Input
                      label="Model No."
                      placeholder="Model No."
                      value={modalName}
                      onChange={this.handleModal}
                    />
                  </Form.Group>

                  <List.List>
                    <List.Item>
                      <Form.Group
                        style={{ fontSize: "16px" }}            //Aishwarya
                        widths={1}>
                        <Form.Input
                          label="HSN Code"
                          placeholder="HSN Code"
                          value={HsnCode}
                          onChange={this.handleHsn}
                        />
                      </Form.Group>
                    </List.Item>

                    {/*
                    <List.Item>
                      <label>
                        {" "}
                        <b>Place Of Supply </b>
                      </label>
                      <Form.Group widths={1}>
                        <select
                          value={place_Of_Supply}
                          onChange={this.handlePlace}
                        >
                          <option value="" disabled selected hidden>
                            Select Place Of Supply
                          </option>
                          {State.map(i => (
                            <option value={i.state} key={i.state}>
                              {i.state}
                            </option>
                          ))}
                        </select>
                      </Form.Group>
                    </List.Item>
                  */}

                    {/* <Form.Group inline widths={3}>
                      <input
                        type="radio"
                        id="radio1"
                        name="Groupbyradio1"
                        value="Active"
                        onChange={this.handleActive}
                        required
                      />&nbsp;&nbsp;
                      <label htmlFor="radio1">Active</label>
                      <input
                        type="radio"
                        id="radio2"
                        name="Groupbyradio1"
                        value="Inactive"
                        onChange={this.handleActive}
                        required
                      />
                      <label htmlFor="radio2">Inactive</label> 
                    </Form.Group>
                    

                    <List.Item>
                      <Form.Group widths={1}>
                        <Form.Input
                          label="Serial No."
                          placeholder="Serial No."
                          value={srno}
                          onChange={this.handleSrno}
                          required
                        />
                      </Form.Group>
                    </List.Item>
*/}

                    <List.Item>
                      <Form.Group
                        style={{ fontSize: "16px" }}            //Aishwarya  
                        widths={1}>
                        <Form.TextArea
                          label="Product Description"
                          placeholder="Product Description"
                          value={productDiscription}
                          onChange={this.handleProductDiscription}
                        />
                      </Form.Group>
                    </List.Item>

                    {/*
                    <List.Item>
                      <Form.Group widths={1}>
                        <Form.Input
                          label="Unit Price."
                          placeholder="Unit Price."
                          value={unitPrice}
                          onChange={this.handleUnitPrice}
                          required
                        />
                      </Form.Group>
                    </List.Item>
                    <label>Machnie</label>
                    <Form.Group inline widths={3}>
                      <input
                        type="radio"
                        id="Machnieradio1"
                        name="Machnieradio1"
                        value="Installed"
                        onChange={this.handleMachnie}
                      />&nbsp;&nbsp;
                      <label htmlFor="Machnieradio1">Installed</label>
                      <input
                        type="radio"
                        id="radio2"
                        name="Machnieradio1"
                        value="Not Installed"
                        onChange={this.handleMachnie}
                      />
                      <label htmlFor="radio2">Not Installed</label>
                    </Form.Group>
                    

                    <label className="labelcolor">Description</label>
                    <TextArea
                      label="Discription"
                      rows={9}
                      placeholder="Enter Discription here!!!"
                      value={discription}
                      onChange={this.handleDiscription}
                      required
                    />

                     <Button
                        floated="right"
                        onClick={() => this.RemoveImages(i)}
                      >
                        Remove
                      </Button>
                    */}
                  </List.List>
                </Form>
              </Segment>
            </TixyContent>

            <TixyContent style={{ flex: 1 }}>
              <Segment style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px" ,fontWeight:"bold"}}            //Aishwarya  
                >Image</label>
                <hr />
                {/* <Carousel>
                  {ImageData.map(i => (
                    <Container>
                      <img
                        src={i}
                        style={{
                          position: "relative",
                          height: "22em"
                        }}
              
                      />
                      </Container>
                   
                  ))}
                </Carousel> */}

                <RawCarousel
                  imageData={
                    (ImageData && ImageData.length >= 0 && ImageData) || []
                  }
                />

                <form>
                  <Progress percent={this.state.progress} active color="green">
                    Smart Speed
                  </Progress>
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={products_fbs}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </form>

                <br />
              </Segment>
            </TixyContent>

            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <Form.Field
                  style={{ fontSize: "16px",fontWeight:"bold" }}            //Aishwarya  
                  label="Vendor Details" required />
                <hr />
                {/*<FormText>*/}                {/*Aishwarya 17/5/19*/}
                <div style={{ width: 400 }}>
                  <Search
                    aligned="right"
                    placeholder="Vendor Name"
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                    required
                  />
                  <hr />
                </div>

                <br />
                {/*</FormText>*/}                   {/*Aishwarya 17/5/19*/}

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

                  {/* <MainDiv2>
                    <Box>
                      <span>Type :</span>
                    </Box>
                    <Box2>
                      <span>{type}</span>
                    </Box2>
                  </MainDiv2> */}
                  <MainDiv2>
                    <Box>
                      <span>Owner :</span>
                    </Box>
                    <Box2>
                      <span>{owner}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Address :</span>
                    </Box>
                    <Box2>
                      <span>{Address}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Primary No :</span>
                    </Box>
                    <Box2>
                      <span>{number}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Seconadary No :</span>
                    </Box>
                    <Box2>
                      <span>{number2}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>PAN NO :</span>
                    </Box>
                    <Box2>
                      <span>{panno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>GST NO :</span>
                    </Box>
                    <Box2>
                      <span>{gstNo}</span>
                    </Box2>
                  </MainDiv2>
                </MainDivHolder>

                <hr />

                {/* <Form>
                  <Form.Input
                    label="Stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={this.handleStock}
                    required
                    disabled={s_status}
                  />
                  <Form.Input
                    label="Purchase"
                    placeholder="Purchase"
                    value={Purchase}
                    onChange={this.handlePurchase}
                    required
                  />
                </Form> */}
              </Segment>
            </TixyContent>
          </ContentArea>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>

            <Button
              disabled={this.state.btndisable}
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubmit()}
            >
              Add Product
            </Button>
          </ContentArea>
        </PageContainer2>

        {this.state.redirectToTixy && <Redirect to="/Product" push />}

        {isopen == true ? (
          <ErrorModal
            isopen={this.state.isopen}
            msg={this.state.errorMsg}
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
const resultRenderer = ({ vendor_name, number }) => (
  <span>
    <Header as="h4">{vendor_name}</Header>
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

export default ProductInfo
