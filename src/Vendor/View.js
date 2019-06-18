import React, { Component } from "react"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Button,
  Input,
  Container,
  Card,
  Rating,
  Dropdown,
  Header,
  Modal,
  List,
  Form,
  TextArea,
  Grid,
  Image,
  Navbar,
  Menu,
  Icon,
  Sidebar,
  Segment,
  Table,
  Divider
} from "semantic-ui-react"
import { Route, Switch, Link, Redirect } from "react-router-dom"
//import SidebarUI from "./SidebarUI";
import Select from "semantic-ui-react/dist/commonjs/addons/Select/Select"
import Search from "semantic-ui-react/dist/commonjs/modules/Search/Search"
import escapeRegExp from "escape-string-regexp"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import Side from "../component/Sidenav"

import StarRatingComponent from "react-star-rating-component"

import {
  PageContainer2,
  IconDiv,
  HeadingDiv,
  HeadingText,
  FormDiv,
  FormBorder,
  MainDiv,
  Form1Div,
  IconDivShare,
  FormText,
  Form2Div,
  BillingInfoDiv,
  EditBillingInfoDiv,
  EditInfoDiv,
  EditInfo,
  Box,
  Box2,
  MainDiv2,
  MainDivHolder,
  TextColor
} from "../styledComps.js"

class View extends Component {
  state = {
    isLoading: false,
    value: "",
    results: [],
    InvoiceList: [],
    InvoiceData: {},
    invoice_id: "",
    size: "",
    open: false,
    name: "",
    email: "",
    mobileNo: "",
    created_Date: "",
    taxablevalue: "",
    totalgst: "",
    igst: "",
    cgst: "",
    sgst: "",
    total: "",
    qno: "",
    ItemList: [],
    total_qty: "",
    paidAmount: "",
    balance_due: "",
    open1: false,
    AddRemain: "",
    mop: "",
    query: "",
    address: "",
    getLatLng: {},
    CompanyName: "",
    phno: "",
    owner: "",
    type: "",
    email: "",
    clientData: {},
    Machnie: "",
    discription: "",
    iname: "",
    istype: "",
    pstype: "",
    Semail: "",
    cname1: "",
    cname2: "",
    noEmp: "",
    panno: "",
    ps: "",
    rating: 0,
    designation1: "",
    designation2: "",
    SelectedTicket: "",         //aishwarya 30 may
    VendorId: 0,         //Aishwarya 29 may
    redirectToVendor: false, //aishwarya 29 may
    isSucess: false,           //aishwarya 29 may
  }

  componentDidMount() {
    console.log(
      "data in session",
      JSON.parse(sessionStorage.getItem("editTicket"))
    )
    let clientData = JSON.parse(sessionStorage.getItem("editTicket"))
    if (!clientData) {
      this.setState({ msg: "No Data Available" })
    } else {
      this.setState({
        clientData: clientData,
        CompanyName: clientData.vendor_name,
        email: clientData.email,
        phno: clientData.number,
        phno2: clientData.number2,
        address: clientData.address,
        owner: clientData.owner,
        type: clientData.type,
        rating: clientData.star,
        Machnie: clientData.leadType,
        cname1: clientData.cname1,
        cname2: clientData.cname2,
        noEmp: clientData.noEmp,
        istype: clientData.indSubType,
        iname: clientData.indType,
        panno: clientData.panNo,
        ps: clientData.ps,
        discription: clientData.description,
        designation1: clientData.Designation1,
        designation2: clientData.Designation2,
        VendorId: clientData.id,                //Aishwarya 30 May
      })
    }
  }

  validateNumber = input => {
    if (input === "") {
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
  }

  validateEmail = (email_id, email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email_id, email)
  }

  onChange = address => {
    console.log("Address is", address)
    this.setState({ address })
  }
  handleFormSubmit = event => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => this.state.getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error))
  }

  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleCompany = e => {
    this.setState({ CompanyName: e.target.value })
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
  }

  handlePhno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ phno: e.target.value })
    } else {
      this.setState({ msg: "Not Valid no." })
    }
  }

  handleOwner = e => {
    this.setState({ owner: e.target.value })
  }

  handleType = e => {
    this.setState({ type: e.target.value })
  }

  handleTransmute = () => {
    this.setState({ redirectToTransmute: true })
  }

  handleSubmit = () => {
    console.log(this.state.address)
    console.log(this.state.CompanyName)
    console.log(this.state.email)
    console.log(this.state.phno)
    console.log(this.state.type)
  }

  //Aishwarya 30 may
  close = () => this.setState({ open: false, open1: false })
  //Aishwarya 30 may
  show = (size1, i) => {
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
  }
  //Aishwarya 30 may
  delete = () => {
    console.log(this.state.SelectedTicket)
    fetch("http://35.161.99.113:9000/webapi/t_vendor/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        v_id: this.state.SelectedTicket
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
          this.setState({ isSucess: true, redirectToVendor: true })
        }, 1000)
      })
  }

  render() {
    const option = [
      {
        ProductName: "samsung",
        StorageQty: "10",
        StockQty: "50"
      }
    ]

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    const {
      isLoading,
      value,
      InvoiceData,
      results,
      InvoiceList,
      size,
      open,
      name,
      email,
      mobileNo,
      created_Date,
      taxablevalue,
      totalgst,
      igst,
      cgst,
      sgst,
      total,
      qno,
      ItemList,
      total_qty,
      balance_due,
      paidAmount,
      open1,
      AddRemain,
      query,
      phno2,
      CompanyName,
      phno,
      owner,
      type,
      address,
      clientData,
      Machnie,
      cname1,
      cname2,
      noEmp,
      rating, designation1, designation2,
      size1,             //Aishwarya 30 may
    } = this.state

    console.log("invoices are", this.state.InvoiceList)
    console.log("invoices  data are", this.state.InvoiceData)
    let data = []
    if (InvoiceList) {
      data = InvoiceList
    } else {
      data = []
    }



    return (
      <div>
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/VendorView">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Vendor Here !</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditVendor">
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
              onClick={() => this.show("tiny", this.state.VendorId)}
            >
              Delete
        </Button>
            {this.state.redirectToVendor && <Redirect to="/VendorView" push />}            {/*Aishwarya 30 May*/}
          </div>
          <FormDiv>
            <FormBorder>
              <FormText>
                <Icon name="add user" size="huge" />
                <br />
                <div>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    editing={false}
                    className="dv-star-rating-input"
                  />
                </div>
              </FormText>

              <center>
                <Form.Group inline widths={3}>
                  {clientData.type == "outstanding" && (
                    <label htmlFor="radio1">
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value={Machnie}
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      &nbsp;&nbsp; Outstanding
                    </label>
                  )}

                  {clientData.type == "disburse" && (
                    <label htmlFor="radio2">
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value={Machnie}
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      Disburse
                    </label>
                  )}
                </Form.Group>
              </center>

              <MainDivHolder>
                <MainDiv2>
                  <Box>
                    <span>Company Name :</span>
                  </Box>
                  <Box2>
                    <span>{CompanyName}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>No. Of Employee :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.noEmp}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Pan No :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.panno}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Primary Contact Name :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.cname1}</span>
                  </Box2>
                </MainDiv2>
                <br />


                <MainDiv2>
                  <Box>
                    <span>Designation :</span>
                  </Box>
                  <Box2>
                    <span>{designation1}</span>
                  </Box2>
                </MainDiv2>
                <br />




                <MainDiv2>
                  <Box>
                    <span>Primary Mobile Number :</span>
                  </Box>
                  <Box2>
                    <span>{phno}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Primary Email Id :</span>
                  </Box>
                  <Box2>
                    <span>{email}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Secondary Contact Name :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.cname2}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Designation :</span>
                  </Box>
                  <Box2>
                    <span>{designation2}</span>
                  </Box2>
                </MainDiv2>
                <br />


                <MainDiv2>
                  <Box>
                    <span>Secondary Mobile Number :</span>
                  </Box>
                  <Box2>
                    <span>{phno2}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Address :</span>
                  </Box>
                  <Box2>
                    <span>{address}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Type Of Industry :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.iname}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>SubType Of Industry :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.istype}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Client/Product Service :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.ps}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Owner Ship :</span>
                  </Box>
                  <Box2>
                    <span>{owner}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Description :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.discription}</span>
                  </Box2>
                </MainDiv2>
                <br />
              </MainDivHolder>
            </FormBorder>

            <IconDivShare>
              <Icon
                name="share"
                size="big"
                onClick={() => this.handleTransmute()}
              />
              {this.state.redirectToTransmute && (
                <Redirect to="/ViewVendorBillindaddr" />
              )}
            </IconDivShare>
          </FormDiv>
          {/*Aishwarya 30 may*/}
          <Modal size={size1} open={open1} onClose={() => this.close()} closeIcon>
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
{
  /*

    const resultRenderer = ({ invoice_id, item_name }) => <span><Header as="h4">{invoice_id}</Header><p>{item_name}</p></span>
*/
}

const logButton = {
  // background: "transparent",
  boxShadow: "0 0 0 1px #D7A01D inset",
  padding: "16px 16%",
  color: "#ffffff"
}

const formInput = {
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color: "#ffffff",
  padding: "14px"
}

const formLabel = {
  fontWeight: "400",
  fontSize: "16px"
}

const resetStyle = {
  backgroundColor: "#D7A01D",
  padding: "14px 10%",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "300"
}

const resetStyle1 = {
  backgroundColor: "transparent",
  padding: "14px 6%",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "300"
}

const white = {
  fontSize: "18px"
}

const header = {
  color: "#ffffff",
  fontSize: "16px"
}

const w1 = {
  fontSize: "16px"
}

export default View
