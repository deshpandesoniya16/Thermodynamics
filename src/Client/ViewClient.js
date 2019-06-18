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
import Side from "../component/Sidenav"

import escapeRegExp from "escape-string-regexp"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import StarRatingComponent from 'react-star-rating-component';


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

class ViewClient extends Component {
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
    phno2: "",
    rating: 0,
    cname: "",
    iname: "",
    istype: "",
    ProducrServiceName: "",
    clientData: {},
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
    designation1: "",
    designation2: "",
    ClientNo: 0,         //Aishwarya 29 may

    open: false,        //aishwarya 29 may
    SelectedTicket: "",         //aishwarya 29 may
    redirectToClient: false, //aishwarya 29 may
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
        CompanyName: clientData.company_name,
        phno: clientData.number,
        email: clientData.email,
        phno2: clientData.number2,
        address: clientData.address,
        owner: clientData.owner,
        type: clientData.type,
        rating: clientData.star,
        discription: clientData.description,
        cname1: clientData.cname1,
        cname2: clientData.cname2,
        Semail: clientData.email2,
        istype: clientData.indSubType,
        iname: clientData.indType,
        noEmp: clientData.noEmp,
        panno: clientData.panNo,
        ps: clientData.ps,
        designation1: clientData.Designation1,
        designation2: clientData.Designation2,
        ClientNo: clientData.id,            //Aishwarya 29 may
      })
    }
  }

  handleTransmute = () => {
    this.setState({ redirectToBilling: true })
  }

  //     var ssnOrTinRegex = /^(?:\d{3}-\d{2}-\d{4}|\d{2}-\d{7})$/;
  // console.log(
  //     ssnOrTinRegex.test('111-11-1111'),
  //     ssnOrTinRegex.test('11-1111111')
  // );

  //Aishwarya 28 may
  close = () => this.setState({ open: false, open1: false })
  //Aishwarya 28 may
  show = (size1, i) => {
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
  }
  //Aishwarya 29 may
  delete = () => {
    console.log(this.state.SelectedTicket)
    fetch(" http://35.161.99.113:9000/webapi/t_client/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        c_id: this.state.SelectedTicket
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        // console.log("data", data.records)
        if (data.message == "User Deleted") {
          this.setState({ msg: "User Deleted" })
          this.close()
          setTimeout(() => {
            // window.location.reload()
            this.setState({ isSucess: true, redirectToClient: true })
          }, 1000)
        } else {
          this.setState({ msg: "Something Went Wrong !!!" })
        }
      })
  }

  render() {
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
      CompanyName,
      phno,
      owner,
      type,
      phno2,
      address,
      clientData,
      cname,
      ps, rating,
      size1,             //Aishwarya 29 may

    } = this.state

    console.log("invoices are", this.state.InvoiceList)
    console.log("invoices  data are", this.state.InvoiceData)
    let data = []
    if (InvoiceList) {
      data = InvoiceList
    } else {
      data = []
    }

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      let invoice = data.filter(i => match.test(i.invoice_id))
    } else {
      data = []
    }

    console.log("Customer info", data)

    //console.log("invoice id",InvoiceData.invoice_id)

    return (
      <div>
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/ClientGodView">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Client Here !</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditClient">
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
              onClick={() => this.show("tiny", this.state.ClientNo)}
            >
              Delete
        </Button>
            {this.state.redirectToClient && <Redirect to="/ClientGodView" push />}            {/*Aishwarya 29 May*/}
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
                <br />
              </FormText>

              <center>
                <Form.Group inline widths={3}>
                  {clientData.leadType == "New Lead" && (
                    <label htmlFor="radio1">
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="New Lead"
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      New Lead
                    </label>
                  )}

                  {clientData.leadType == "Asset owner" && (
                    <label htmlFor="radio2">
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="Asset owner"
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      Asset owner
                    </label>
                  )}

                  {clientData.leadType == "Product owner" && (
                    <label htmlFor="radio2">
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="Product owner"
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      Product owner
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
                    <span>Pan No. :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.panno}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Email Id :</span>
                  </Box>
                  <Box2>
                    <span>{email}</span>
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
                    <span>Primary Mobile Number :</span>
                  </Box>
                  <Box2>
                    <span>{phno}</span>
                  </Box2>
                </MainDiv2>
                <br />


                <MainDiv2>
                  <Box>
                    <span>Designation :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.designation1}</span>
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
                    <span>Secondary Mobile Number :</span>
                  </Box>
                  <Box2>
                    <span>{phno2}</span>
                  </Box2>
                </MainDiv2>
                <br />

                <MainDiv2>
                  <Box>
                    <span>Designation :</span>
                  </Box>
                  <Box2>
                    <span>{this.state.designation2}</span>
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
              {this.state.redirectToBilling && (
                <Redirect to="/ViewBillindaddr" />
              )}
            </IconDivShare>
          </FormDiv>
          {/*Aishwarya 29 May*/}
          <Modal size={size1} open={open1} onClose={() => this.close()} closeIcon>
            <Modal.Content>
              <TextColor>
                Do you want to delete this item?
        </TextColor>
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

export default ViewClient
