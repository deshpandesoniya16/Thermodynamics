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
  Progress,
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
import { Scrollbars } from "react-custom-scrollbars"

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
  PageContainer3,
  TableContent,
  Box,
  Box2,
  MainDiv2,
  MainDivHolder,
  TextColor         //Aishwarya 30 may
} from "../styledComps.js"
import StarRatingComponent from 'react-star-rating-component';
import RawCarousel from "../component/RawCarousel"



class ViewProduct extends Component {
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
    groupid: "",

    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    s_status: true,
    unitPrice: "",
    product: {},
    ManufacturerData: [],
    vname: "",
    vaddr: "",
    vphno: "",

    email: "",
    type: "",
    tinNo: "",
    panno: "",
    owner: "",
    number: "",
    number2: "",
    gstNo: "",
    cstNo: "",
    HsnCode: "",
    place_Of_Supply: "",
    ImageData: [],
    uploadedfileurl: "",
    vtype: "",
    vtin: "",
    vpanNo: "",
    vphno2: "",
    cstNo: "",
    Active: "",
    grpid: "",
    sgrpid: "", GrupName: "",
    productDiscription: "",
    Vertical: "",
    open: false,                        //Aishwarya 30 May
    open1: false,              //Aishwarya 30 May
    SelectedTicket: "",         //aishwarya 30 may
    ProductNo: 0,         //Aishwarya 29 may
    redirectToProduct: false, //aishwarya 29 may
    isSucess: false,           //aishwarya 29 may
  }

  ProductImages = (id) => {

    fetch("http://35.161.99.113:9000/webapi/t_product/t_getLink", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Product images Data", data.records)
        let pimages = data.records
        if (pimages && pimages.length >= 0) {
          this.setState({ ImageData: data.records })
        }
        else {
          //sessionStorage.setItem("lead_Img", JSON.stringify(data.records))

          this.setState({ ImageData: [] })
          console.log("No Images is available")
        }
      })

  }

  componentDidMount() {
    if (JSON.parse(sessionStorage.getItem("editTicket") === null)) {
      console.log("Nodata")
    } else {

      let product = JSON.parse(sessionStorage.getItem("editTicket"))

      //productImg = JSON.parse(sessionStorage.getItem("Product_Image"))



      if (product) {
        console.log("In User List", product)
        this.state.product = product
        this.setState({
          pname: product.name,
          pno: product.productNumber,
          ProductType: product.p_type,
          Active: product.p_status,
          Machnie: product.m_status,
          opno: product.p_old_number,
          srno: product.p_sr_number,
          value: product.vendor_name,
          stock: product.stock_qty,
          Purchase: product.purchase_qty,
          unitPrice: product.unitPrice,
          modalName: product.modalName,
          discription: product.description,
          groupid: product.manufacturer,
          Name: product.vendor_name,
          Address: product.address,
          number: product.number,
          type: product.type,
          tinNo: product.tinNo,
          panno: product.panNo,
          number2: product.number2,
          cstNo: product.cstNo,
          gstNo: product.gstNo,
          groupid: product.manufacturer,
          owner: product.owner,
          HsnCode: product.hsnCode,
          rating: product.star,
          vname: product.vendor_name,
          sgrpid: product.subGroupName,
          Vertical: product.vertical,
          GrupName: product.groupName,
          ProductNo: product.productId,                  //Aishwarya 30 may
        })

        this.ProductImages(product.productId);
      } else {
        console.log("No User here")
      }
      console.log("user is", this.state.prduct)
    }

  }


  handleProduct = e => {
    console.log("product type", e.target.value)
    this.setState({
      ProductType: e.target.value,
      // checked: this.state.checked
      msg1: ""
    })
  }

  handleGroupBy = e => {
    console.log("product Group", e.target.value)
    this.setState({
      groupid: e.target.value,
      // checked: this.state.checked
      msg1: ""
    })
  }

  handleGroup = e => {
    console.log("Group", e.target.value)
    this.setState({ group: e.target.value, msg1: "" })
  }

  handleMachnie = e => {
    console.log("product Group", e.target.value)
    this.setState({
      Machnie: e.target.value,
      // checked: this.state.checked
      msg1: ""
    })
  }

  handleDiscription = e => {
    console.log("discrption is", e.target.value)
    this.setState({ discription: e.target.value })
  }

  handleProductName = e => {
    this.setState({ pname: e.target.value, msg1: "" })
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
      isOpenClose: false
    })
    clearTimeout(this.timeout)
  }

  handleProductNo = e => {
    this.setState({ pno: e.target.value, msg1: "" })
  }

  handleOldProduct = e => {
    this.setState({ opno: e.target.value, msg1: "" })
  }

  handleModal = e => {
    this.setState({ modalName: e.target.value, msg1: "" })
  }

  handleSrno = e => {
    this.setState({ srno: e.target.value, msg1: "" })
  }

  handlelastAction = e => {
    this.setState({ lastAction: e.target.value })
  }

  handleManufacturer = e => {
    this.setState({ ManufacturerName: e.target.value, msg1: "" })
  }

  handlePurchase = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ Purchase: e.target.value, msg1: "", s_status: false })
    }
  }

  handleAddress = e => {
    this.setState({ Address: e.target.value, msg1: "" })
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

  handleUnitPrice = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ unitPrice: e.target.value })
    }
  }



  handleStock = e => {
    if (this.validateNumber(e.target.value)) {
      if (e.target.value <= this.state.Purchase) {
        this.setState({ stock: e.target.value, msg1: "" })
      } else {
        this.setState({ msg1: "Enter Stock less than to Purchase Stock" })
      }
    }
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleMname = e => {
    console.log(e.target.value)
    this.setState({ mname: e.target.value })
  }



  addManufac = () => {
    this.setState({ isOpen: true })
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
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
    fetch("http://35.161.99.113:9000/webapi/t_product/t_deleteProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        l_id: this.state.SelectedTicket

      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)
        this.close()
        setTimeout(() => {
          // window.location.reload()
          this.setState({ isSucess: true, redirectToProduct: true })
        }, 1000)
      })
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
      ManufacturerData,
      isOpen,
      mname,
      ProductType,
      m_status,
      p_status,
      group,
      Machnie,
      vphno,
      vname,
      vaddr,
      HsnCode,
      place_Of_Supply,
      psid,
      ImageData,
      email,
      type,
      tinNo,
      panno,
      owner,
      number,
      number2,
      gstNo,
      cstNo,
      vtype,
      vtin,
      vpanNo,
      vphno2, Active, GrupName, sgrpid, Vertical,
      open,         //Aishwarya 30 May
      open1,        //Aishwarya 30 May
      size1,             //Aishwarya 30 may
    } = this.state

    console.log("Selected Result", SelectedResult)

    return (
      <div>
        <PageContainer3>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Product">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Product</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditProduct">
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
              onClick={() => this.show("tiny", this.state.ProductNo)}           //Aishwarya 30 may
            >
              Delete
       </Button>
            {this.state.redirectToProduct && <Redirect to="/Product" push />}            {/*Aishwarya 30 May*/}
          </div>
          <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
            <ContentArea>
              <TixyContent style={{ flex: 1 }}>
                <Segment>
                  <label style={{ fontSize: "16px", fontWeight: "bold" }}>Product Details</label>           {/*Aishwarya 17/5/19*/}
                  <hr />

                  <div>

                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={rating}
                      className="dv-star-rating-input"
                    />
                  </div>
                  <hr />

                  <MainDivHolder>

                    <MainDiv2>
                      <Box>
                        <span style={{ marginLeft: "55px" }}>Product Name:</span>
                      </Box>
                      <Box2>
                        <span>{pname}</span>
                      </Box2>
                    </MainDiv2>
                    <br />

                    <MainDiv2>
                      <Box>
                        <span>Vertical:</span>
                      </Box>
                      <Box2>
                        <span>{Vertical}</span>
                      </Box2>
                    </MainDiv2>
                    <br />



                    <MainDiv2>
                      <Box>
                        <span>Group:</span>
                      </Box>
                      <Box2>
                        <span>{GrupName}</span>
                      </Box2>
                    </MainDiv2>
                    <br />



                    <MainDiv2>
                      <Box>
                        <span>Sub Group:</span>
                      </Box>
                      <Box2>
                        <span>{sgrpid}</span>
                      </Box2>
                    </MainDiv2>
                    <br />
                    {/* <MainDiv2>
                      <Box>
                        <span>Old Part No :</span>
                      </Box>
                      <Box2>
                        <span>{opno}</span>
                      </Box2>
                    </MainDiv2>
                    <br /> */}
                    <MainDiv2>
                      <Box>
                        <span>Product Type :</span>
                      </Box>
                      <Box2>
                        <span>{ProductType}</span>
                      </Box2>
                    </MainDiv2>
                    <br />

                    <MainDiv2>
                      <Box>
                        <span>Part No.: </span>
                      </Box>
                      <Box2>
                        <span>{pno}</span>
                      </Box2>
                    </MainDiv2>
                    <br />

                    <MainDiv2>
                      <Box>
                        <span>Modal Name :</span>
                      </Box>
                      <Box2>
                        <span>{modalName}</span>
                      </Box2>
                    </MainDiv2>
                    <br />

                    <MainDiv2>
                      <Box>
                        <span>HSN Code :</span>
                      </Box>
                      <Box2>
                        <span>{HsnCode}</span>
                      </Box2>
                    </MainDiv2>
                    <br />


                    {/* <MainDiv2>
                      <Box>
                        <span>Serial No :</span>
                      </Box>
                      <Box2>
                        <span>{srno}</span>
                      </Box2>
                    </MainDiv2> */}

                    <br />
                    <MainDiv2>
                      <Box>
                        <span>Description :</span>
                      </Box>
                      <Box2>
                        <span>{discription}</span>
                      </Box2>
                    </MainDiv2>
                    <br />

                    <br />
                  </MainDivHolder>
                </Segment>
              </TixyContent>
              <TixyContent style={{ flex: 1 }}>
                <Segment padded style={{ height: "100%" }}>
                  <label style={{ fontSize: "16px", fontWeight: "bold" }}>Image</label>                        {/*Aishwarya 17/5/19*/}
                  <hr />
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
                  )} */}

                  <RawCarousel imageData={ImageData && ImageData.length >= 0 && ImageData || []} />

                </Segment>
              </TixyContent>
              <TixyContent>
                <Segment padded style={{ height: "100%" }}>
                  <label style={{ fontSize: "16px", fontWeight: "bold" }}>Vendor Name</label>                           {/*Aishwarya 17/5/19*/}
                  <hr />
                  <MainDivHolder>
                    <MainDiv2>
                      <Box>
                        <span>Name :</span>
                      </Box>
                      <Box2>
                        <span>{vname}</span>
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
                    <br />
                    <hr />
                    <br />
                    {/* <MainDiv2>
                      <Box>
                        <span>Stock :</span>
                      </Box>
                      <Box2>
                        <span>{stock}</span>
                      </Box2>
                    </MainDiv2>
                    <br />
                    <MainDiv2>
                      <Box>
                        <span>Purchase :</span>
                      </Box>
                      <Box2>
                        <span>{Purchase}</span>
                      </Box2>
                    </MainDiv2> */}
                    <br />
                  </MainDivHolder>
                </Segment>
              </TixyContent>
            </ContentArea>
          </Scrollbars>
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
        </PageContainer3>
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

export default ViewProduct
