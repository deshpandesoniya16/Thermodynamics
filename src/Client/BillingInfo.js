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
import ErrorModal from "../component/ErrorModal"
import SuccessModal from "../component/SuccessModal";
import { placeofSupply } from "../component/Api"
import styled from "styled-components"
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
  BillingInfoDiv
} from "../styledComps.js"

class BillingInfo extends Component {
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
    billbackup: [],

    BillAddress: "",
    bill: [],
    ship: [],
    address: "",
    Shipaddress: "",
    Shipcount: 0,
    Billcount: 0,
    isopen: false,
    place_Of_Supply: "",
    State: [],
    gstno: "",
    btndisable: false,
    isSucess: false
  }

  placOfSupply = () => {
    fetch(placeofSupply)
      .then(results => {
        return results.json()
      })
      .then(data => {
        console.log("data of place of Supply", data.records)
        this.setState({ State: data.records })
        //this.setState({ state: data.records })
      })
  }

  componentDidMount() {
    this.placOfSupply()

    console.log(
      "data in session",
      JSON.parse(sessionStorage.getItem("editTicket"))
    )
    let clientData = JSON.parse(sessionStorage.getItem("editTicket"))
    if (!clientData) {
      console.log("No client data")
      //this.setState({ msg: "No Data Available" })
    } else {
      this.setState({ clientData: clientData })
    }
  }

  validateGSTIN = gstin => {
    let gst = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
    return gst.test(gstin)
  }

  onChange = address => {
    console.log("Address is", address)
    this.setState({ address, msg: "" })
  }

  onChange1 = Shipaddress => {
    console.log("Address is", Shipaddress)
    this.setState({ Shipaddress, msg: "" })
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

  handleBack = () => {
    this.setState({ redirectToBack: true })
  }

  handleTransmute = () => {
    this.setState({ redirectToBilling: true })
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }
  handleClose = () => this.setState({ modalOpen: false, isopen: false })

  handleShipAddress = e => {
    this.setState({
      ShipAddress: e.target.value
    })
  }

  handleBillAddress = e => {
    this.setState({
      BillAddress: e.target.value
    })
  }

  handleShip = shipaddr => {
    if (this.state.Shipcount < 5) {
      if (!this.state.Shipaddress) {
        this.setState({ msg: "Enter Shipping Address" })
      }

      this.state.ship.push(this.state.Shipaddress)
      this.state.Shipcount++
      this.setState({ Shipaddress: "" })
      console.log("Shipcount", this.state.Shipcount)

      //             sessionStorage.setItem("Ship",JSON.stringify(this.state.ship))

      console.log("handele ship is clicked", this.state.ship)
      //             console.log("handele ship is clicked",this.state.ship.length)
      // setTimeout(() => {
    }
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }
  handleClose = () => this.setState({ modalOpen: false, isopen: false })







  handleShipAddress = e => {
    this.setState({
      ShipAddress: e.target.value
    })
  }


  handleBillAddress = e => {
    this.setState({
      BillAddress: e.target.value
    })

  }

  handleShip = (shipaddr) => {



    if (this.state.Shipcount < 5) {


      if (!this.state.Shipaddress) {
        this.setState({ Shipmsg: "Enter Shipping Address" })
      }

      this.state.ship.push(this.state.Shipaddress)
      this.state.Shipcount++;
      this.setState({ Shipaddress: "" })
      console.log("Shipcount", this.state.Shipcount)

      //             sessionStorage.setItem("Ship",JSON.stringify(this.state.ship))

      console.log("handele ship is clicked", this.state.ship)
      //             console.log("handele ship is clicked",this.state.ship.length)
      // setTimeout(() => {

      //    // this.setState({redirectToShipaddr:true})
      // }, 1000);
    }
  }




  handleBill = (billaddr) => {

    if (this.state.Billcount < 5) {

      if (!this.state.address) {
        this.setState({ Billmsg: "Enter Billing Address" })
      }
      this.state.bill.push(this.state.address)

      this.state.Billcount++
      this.setState({ address: "" })
      console.log("new Billing", this.state.bill[0])
      //             sessionStorage.setItem("Bill",JSON.stringify(this.state.bill))
      //             this.setState({billbackup: this.state.bill})
      console.log("handele bill is clicked", this.state.bill[0])
      console.log("handele bill is clicked", this.state.bill[1])
      //             let billcounter=this.state.bill.length
      //             console.log("handele bill is clicked",this.state.bill.length)
      // setTimeout(() => {

      //     console.log("handele bill is clicked",this.state.billbackup)
      //    // this.setState({redirectToBilladdr:true})
      // }, 1000);
    }
  }


  handleBill = billaddr => {
    if (this.state.Billcount < 5) {
      if (!this.state.address) {
        this.setState({ msg: "Enter Billing Address" })
      }
      this.state.bill.push(this.state.address)

      this.state.Billcount++
      this.setState({ address: "" })
      console.log("new Billing", this.state.bill[0])
      //             sessionStorage.setItem("Bill",JSON.stringify(this.state.bill))
      //             this.setState({billbackup: this.state.bill})
      console.log("handele bill is clicked", this.state.bill[0])
      console.log("handele bill is clicked", this.state.bill[1])
      //             let billcounter=this.state.bill.length
      //             console.log("handele bill is clicked",this.state.bill.length)
      // setTimeout(() => {

      //     console.log("handele bill is clicked",this.state.billbackup)
      //    // this.setState({redirectToBilladdr:true})
      // }, 1000);
    }
  }

  handleInvoice = () => {
    this.setState({ redirectToInvoice: true })
  }

  addClient = () => {
    if (this.state.bill.length == []) {
      return this.setState({ msg: "Please Enter Billing Address", isopen: true })
    }

    if (this.state.ship.length == []) {
      return this.setState({ msg: "Please Enter Ship Address", isopen: true })
    }


    let name = sessionStorage.getItem("name")
    let email = sessionStorage.getItem("email")
    let phno = sessionStorage.getItem("phno")
    let phno2 = sessionStorage.getItem("phno2")
    let addr = sessionStorage.getItem("addr")
    let owner = sessionStorage.getItem("owner")

    let type = sessionStorage.getItem("type")

    let star = sessionStorage.getItem("star")
    let tin = sessionStorage.getItem("tin")
    let cst = sessionStorage.getItem("cst")
    let pan = sessionStorage.getItem("pan")
    let gst = sessionStorage.getItem("gst")
    let ecc = sessionStorage.getItem("ecc")
    let Excise = sessionStorage.getItem("Excise")
    let collectorate = sessionStorage.getItem("collectorate")
    let typeTransmute = sessionStorage.getItem("typeOfTransmute")
    let cname = sessionStorage.getItem("cname")
    let cname2 = sessionStorage.getItem("cname2")

    let iname = sessionStorage.getItem("itype")
    let istype = sessionStorage.getItem("istype")
    let Description = sessionStorage.getItem("Description")
    let Semail = sessionStorage.getItem("semail")
    let no_emp = sessionStorage.getItem("no_emp")
    let ProducrServiceName = sessionStorage.getItem("psname")
    let desg1 = sessionStorage.getItem("desgnation1")
    let desg2 = sessionStorage.getItem("desgnation2")

    console.log("bill value", this.state.bill[0])

    fetch(" http://35.161.99.113:9000/webapi/t_client/addClient ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        star: star,
        address: addr,
        number: phno,
        number2: phno2,
        owner: owner,
        type: type,
        leadType: type,
        tinNo: tin,
        cstNo: cst,
        panNo: pan,
        gstNo: this.state.gstno,
        ecc: ecc,
        exciseDivision: Excise,
        exciseCollectorate: collectorate,
        cname1: cname,
        cname2: cname2,
        place_Of_Supply: this.state.place_Of_Supply,
        indType: iname,
        indSubType: istype,
        noEmp: no_emp,
        description: Description,
        email2: Semail,
        ps: ProducrServiceName,
        designation1: desg1,
        designation2: desg2,
        bAddress1: this.state.bill[0],
        bAddress2: this.state.bill[1],
        bAddress3: this.state.bill[2],
        bAddress4: this.state.bill[3],
        bAddress5: this.state.bill[4],
        sAddress1: this.state.ship[0],
        sAddress2: this.state.ship[1],
        sAddress3: this.state.ship[2],
        sAddress4: this.state.ship[3],
        sAddress5: this.state.ship[4],
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        // console.log("data",data.records)
        if (data.message == "Client Added") {
          this.setState({ msg: "Client Added" })

          this.setState({ btndisable: true })
          this.setState({ isSucess: true, Smsg: data.message })
          setTimeout(() => {
            this.setState({ isSucess: false, redirectToClient: true })
          }, 1000)
        } else {
          this.setState({ isopen: true, errorMsg: data.error })
          this.setState({ msg: "Sorry ! something went wrong ..." })
        }
      })

  }

  handleGst = e => {
    console.log("gstnno", e.target.value)
    this.setState({ gstno: e.target.value })

    setTimeout(() => {
      if (this.validateGSTIN(this.state.gstno)) {
        this.setState({ gstno: this.state.gstno, gstmsg: "" })
      } else {
        this.setState({ gstmsg: "Please Enter Valid GST No." })
      }
    }, 1000)
  }

  handlePlace = e => {
    console.log("Place Code", e.target.value)
    this.setState({ place_Of_Supply: e.target.value, errorMsg: "" })
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

    const inputProps1 = {
      value: this.state.Shipaddress,
      onChange: this.onChange1
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
      ShipAddress,
      tin,
      CST,
      panno,
      ECC,
      Excise,
      Collectorate,
      bill,
      BillAddress,
      isopen,
      State,
      place_Of_Supply,
      gstno, isSucess, btndisable
    } = this.state

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
        <PageContainer2 style={{ backgroundColor: "#eee" }}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Client">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Billing Information !</HeadingText>
            </HeadingDiv>
          </div>
          <FormDiv>
            <IconDivShare>
              <Icon name="reply" size="big" onClick={() => this.handleBack()} />
            </IconDivShare>
            <BillingInfoDiv>
              <Segment>
                <Form
                  style={{ fontSize: "16px" }}        //Aishwarya
                >
                  <Form.Field label='GST No.' />
                  <div className="space" />
                  <input
                    placeholder="Enter GST No. number"
                    value={gstno}
                    onChange={this.handleGst}
                    maxLength="15"
                  />
                </Form>
                <div className="space" />
                <p style={{ color: "red" }}>{this.state.gstmsg}</p>


                <List.Item>
                  <Form
                    style={{ fontSize: "16px" }}                 //Aishwarya  
                  >
                    <label>
                      <b>Place Of Supply </b>
                    </label>
                    <Form.Group widths={1}  style={{marginTop:"10px",marginLeft:"2px"}}>      {/*aishwarya */}
                      <select
                        style={{ width: "290px", height: "40px", fontSize: "15px" }}                 //Aishwarya
                        value={place_Of_Supply}
                        onChange={this.handlePlace}
                      >
                        <option value="" disabled selected hidden>
                          Select Place Of Supply
                        </option>
                        {State.map(i => (
                          <option value={i.state} key={i.state}>
                            {i.state}-{i.state_code}
                          </option>
                        ))}
                      </select>
                    </Form.Group>
                  </Form>
                </List.Item>

              </Segment>

              <Segment>
                <Form
                  style={{ fontSize: "16px" }}        //Aishwarya  
                >
                  <Form.Group widths="equal">
                    <Form.Field >
                      <Header as="h4">
                        <Form.Field
                          style={{ fontSize: "16px" }}        //Aishwarya  
                          label='Billing Address.' required />
                        <Button circular floated="right">
                          {this.state.Billcount}
                        </Button>
                        <br />
                      </Header>
                      <br />

                      <PlacesAutocomplete inputProps={inputProps} />
                      <p>
                        <font color="red">{this.state.Billmsg}</font>
                      </p>
                      <br />
                      <br />

                      <Button
                        primary
                        onClick={() => this.handleBill(BillAddress)}
                      >
                        Add Address
                      </Button>
                      {this.state.redirectToBilladdr && (
                        <Redirect to="/BillingAddrList" />
                      )}
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Segment>
              <Segment>
                <Form
                  style={{ fontSize: "16px" }}        //Aishwarya
                >
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Header as="h4">
                        <Form.Field
                          style={{ fontSize: "16px" }}        //Aishwarya    
                          label='Shipping Address.' required />
                        <Button circular floated="right">
                          {this.state.Shipcount}
                        </Button>
                        <br />
                      </Header>
                      <br />
                      <PlacesAutocomplete inputProps={inputProps1} />
                      <p>
                        <font color="red">{this.state.Shipmsg}</font>
                      </p>
                      <br />
                      <br />

                      <Button
                        primary
                        onClick={() => this.handleShip(ShipAddress)}
                      >
                        Add Address
                      </Button>
                      {this.state.redirectToShipaddr && (
                        <Redirect to="/ShipAddrList" />
                      )}
                    </Form.Field>
                  </Form.Group>
                </Form>
                <p style={{ color: "red" }}>{this.state.msg}</p>
              </Segment>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button primary disabled={btndisable} onClick={() => this.addClient()} size="large">
                  Submit
                </Button>
                {this.state.redirectToClient && (
                  <Redirect to="/ClientGodView" />
                )}
              </div>
            </BillingInfoDiv>
          </FormDiv>
          {this.state.redirectToBack && <Redirect to="/Client" push />}

          {this.state.redirectToBilladdr && <Redirect to="/BillingAddrList" />}

          {this.state.redirectToShipaddr && <Redirect to="/ShipAddrList" />}

          {this.state.redirectToClient && <Redirect to="/ClientGodView" />}
        </PageContainer2>

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

export default BillingInfo
