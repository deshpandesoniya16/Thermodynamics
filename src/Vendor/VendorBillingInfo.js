// import React, { Component } from "react"
// import "../App.css"
// import "../dashboard.css"
// import "semantic-ui-css/semantic.min.css"
// import {
//   Button,
//   Input,
//   Container,
//   Card,
//   Rating,
//   Dropdown,
//   Header,
//   Modal,
//   List,
//   Form,
//   TextArea,
//   Grid,
//   Image,
//   Navbar,
//   Menu,
//   Icon,
//   Sidebar,
//   Segment,
//   Table,
//   Divider
// } from "semantic-ui-react"
// import { Route, Switch, Link, Redirect } from "react-router-dom"
// //import SidebarUI from "./SidebarUI";
// import Select from "semantic-ui-react/dist/commonjs/addons/Select/Select"
// import Search from "semantic-ui-react/dist/commonjs/modules/Search/Search"
// import Side from "../component/Sidenav"
// import escapeRegExp from "escape-string-regexp"
// import PlacesAutocomplete from "react-places-autocomplete"
// import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
// import ErrorModal from "../component/ErrorModal"
// import SuccessModal from "../component/SuccessModal";
// import { placeofSupply } from "../component/Api"

// import styled from "styled-components"
// import {
//   PageContainer2,
//   IconDiv,
//   HeadingDiv,
//   HeadingText,
//   FormDiv,
//   FormBorder,
//   MainDiv,
//   Form1Div,
//   IconDivShare,
//   BillingInfoDiv
// } from "../styledComps.js"

// class VendorBillingInfo extends Component {
//   state = {
//     isLoading: false,
//     value: "",
//     results: [],
//     InvoiceList: [],
//     InvoiceData: {},
//     invoice_id: "",
//     size: "",
//     open: false,
//     name: "",
//     email: "",
//     mobileNo: "",
//     created_Date: "",
//     taxablevalue: "",
//     totalgst: "",
//     igst: "",
//     cgst: "",
//     sgst: "",
//     total: "",
//     qno: "",
//     ItemList: [],
//     total_qty: "",
//     paidAmount: "",
//     balance_due: "",
//     open1: false,
//     AddRemain: "",
//     billbackup: [],

//     BillAddress: "",
//     bill: [],
//     ship: [],
//     address: "",
//     Shipaddress: "",
//     Shipcount: 0,
//     Billcount: 0,
//     addr1: "",
//     addr2: "",
//     addr3: "",
//     addr4: "",
//     addr5: "",
//     saddr1: "",
//     saddr2: "",
//     saddr3: "",
//     saddr4: "",
//     saddr5: "",
//     isopen: false,
//     State: [],
//     place_Of_Supply: "",
//     gstno: "",
//     btndisable:false,
//     isSucess:false
//   }

//   placOfSupply = () => {
//     fetch(placeofSupply)
//       .then(results => {
//         return results.json()
//       })
//       .then(data => {
//         console.log("data of place of Supply", data.records)
//         this.setState({ State: data.records })
//         //this.setState({ state: data.records })
//       })
//   }

//   componentDidMount() {
//     this.placOfSupply()
//   }

//   validateGSTIN = gstin => {
//     let gst = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
//     return gst.test(gstin)
//   }

//   onChange = address => {
//     console.log("Address is", address)
//     this.setState({ address, msg: "" })
//   }

//   onChange1 = Shipaddress => {
//     console.log("Address is", Shipaddress)
//     this.setState({ Shipaddress, msg: "" })
//   }

//   handleFormSubmit = event => {
//     event.preventDefault()
//     geocodeByAddress(this.state.address)
//       .then(results => this.state.getLatLng(results[0]))
//       .then(latLng => console.log("Success", latLng))
//       .catch(error => console.error("Error", error))
//   }

//   handleRate = (e, { rating, maxRating }) => {
//     console.log("Rating given by", rating)
//     this.setState({ rating, maxRating })
//   }

//   handleCompany = e => {
//     this.setState({ CompanyName: e.target.value })
//   }

//   handleBack = () => {
//     this.setState({ redirectToBack: true })
//   }

//   handleTransmute = () => {
//     this.setState({ redirectToBilling: true })
//   }

//   handleOpen = () => {
//     this.setState({ modalOpen: true })
//   }
//   handleClose = () => this.setState({ modalOpen: false, isopen: false })

//   handleShipAddress = e => {
//     this.setState({
//       ShipAddress: e.target.value
//     })
//   }

//   handleBillAddress = e => {
//     this.setState({
//       BillAddress: e.target.value
//     })
//   }

//   handleShip = shipaddr => {
//     if (this.state.Shipcount < 5) {
//       if (!this.state.Shipaddress) {
//         this.setState({ msg: "Enter Shipping Address" })
//       }

//       this.state.ship.push(this.state.Shipaddress)
//       this.state.Shipcount++
//       this.setState({ Shipaddress: "" })
//       console.log("Shipcount", this.state.Shipcount)

//       //             sessionStorage.setItem("Ship",JSON.stringify(this.state.ship))

//       console.log("handele ship is clicked", this.state.ship)

//       if (
//         this.state.ship[0] == "undefined" ||
//         this.state.ship[1] == "undefined" ||
//         this.state.ship[2] == "undefined" ||
//         this.state.ship[3] == "undefined" ||
//         this.state.ship[4] == "undefined"
//       ) {
//         this.setState({
//           saddr1: "",
//           saddr2: "",
//           saddr3: "",
//           saddr4: "",
//           saddr5: ""
//         })
//       } else {
//         this.setState({
//           saddr1: this.state.ship[0],
//           saddr2: this.state.ship[2],
//           saddr3: this.state.ship[3],
//           saddr4: this.state.ship[4],
//           saddr5: this.state.ship[5]
//         })
//       }
//       //             console.log("handele ship is clicked",this.state.ship.length)
//       // setTimeout(() => {

//       //    // this.setState({redirectToShipaddr:true})
//       // }, 1000);
//     }
//   }

//   handleBill = billaddr => {
//     if (this.state.Billcount < 5) {
//       if (!this.state.address) {
//         this.setState({ msg: "Enter Billing Address" })
//       }
//       this.state.bill.push(this.state.address)

//       this.state.Billcount++
//       this.setState({ address: "" })
//       console.log("new Billing", this.state.bill[0].BillAddress)
//       //             sessionStorage.setItem("Bill",JSON.stringify(this.state.bill))
//       //             this.setState({billbackup: this.state.bill})
//       console.log("handele bill is clicked", this.state.bill[0])
//       console.log("handele bill is clicked", this.state.bill[1])

//       if (
//         this.state.bill[0] == "undefined" ||
//         this.state.bill[1] == "undefined" ||
//         this.state.bill[2] == "undefined" ||
//         this.state.bill[3] == "undefined" ||
//         this.state.bill[4] == "undefined"
//       ) {
//         this.setState({
//           addr1: "",
//           addr2: "",
//           addr3: "",
//           addr4: "",
//           addr5: ""
//         })
//       } else {
//         this.setState({
//           addr1: this.state.bill[0],
//           addr2: this.state.bill[2],
//           addr3: this.state.bill[3],
//           addr4: this.state.bill[4],
//           addr5: this.state.bill[5]
//         })
//       }
//       //             let billcounter=this.state.bill.length
//       //             console.log("handele bill is clicked",this.state.bill.length)
//       // setTimeout(() => {

//       //     console.log("handele bill is clicked",this.state.billbackup)
//       //    // this.setState({redirectToBilladdr:true})
//       // }, 1000);
//     }
//   }

//   handleInvoice = () => {
//     this.setState({ redirectToInvoice: true })
//   }

//   addVendor = () => {

//     if (this.state.bill.length == []) {
//       return this.setState({ msg: "Please Enter Billing Address", isopen: true })
//     }
    
//     if (this.state.ship.length == []) {
//       return this.setState({ msg: "Please Enter Ship Address", isopen: true })
//     }

//     let name = sessionStorage.getItem("vendor_name")
//     let email = sessionStorage.getItem("vendor_email")
//     let phno = sessionStorage.getItem("vendor_phno")
//     let phno2 = sessionStorage.getItem("vendor_phno2")
//     let addr = sessionStorage.getItem("vendor_addr")
//     let owner = sessionStorage.getItem("vendor_owner")
//     let type = sessionStorage.getItem("vendor_type")
//     let star = sessionStorage.getItem("vendor_star")
//     let tin = sessionStorage.getItem("vendor_tin")
//     let cst = sessionStorage.getItem("vendor_cst")
//     let pan = sessionStorage.getItem("vendor_pan")
//     let gst = sessionStorage.getItem("vendor_gst")
//     let ecc = sessionStorage.getItem("vendor_ecc")
//     let Excise = sessionStorage.getItem("vendor_Excise")
//     let collectorate = sessionStorage.getItem("vendor_collectorate")
//     let typeTransmute = sessionStorage.getItem("vendor_typeOfTransmute")
//     let cname = sessionStorage.getItem("cname")
//     let cname2 = sessionStorage.getItem("cname2")

//     let iname = sessionStorage.getItem("itype")
//     let istype = sessionStorage.getItem("istype")
//     let Description = sessionStorage.getItem("Description")
//     let no_emp = sessionStorage.getItem("no_emp")
//     let ProducrServiceName = sessionStorage.getItem("psname")
//     let desg1=sessionStorage.getItem("desgnation1")
//     let desg2=sessionStorage.getItem("desgnation2")


//     console.log("names of vendor,", name)
//     console.log("bill value", this.state.bill[0])
//     console.log("bill value", JSON.stringify(this.state.bill[1]))

//     //     if (this.state.bill[0] == "empty"){

//     //             addr1="" ,
//     // }

//     fetch("http://35.161.99.113:9000/webapi/t_vendor/addVendor ", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: name,
//         star: star,
//         address: addr,
//         number: phno,
//         number2: phno2,
//         email: email,
//         owner: owner,
//         type: typeTransmute,
//         //leadType:typeTransmute,
//         tinNo: tin,
//         cstNo: cst,
//         panNo: pan,
//         gstNo: this.state.gstno,
//         ecc: ecc,
//         exciseDivision: Excise,
//         exciseCollectorate: collectorate,
//         place_Of_Supply: this.state.place_Of_Supply,
//         indType: iname,
//         indSubType: istype,
//         noEmp: no_emp,
//         description: Description,
//         ps: ProducrServiceName,
//         cname1: cname,
//         cname2: cname2,
//         designation1:desg1,
//         designation2:desg2,
//         bAddress1: this.state.bill[0],
//         bAddress2: this.state.bill[1],
//         bAddress3: this.state.bill[2],
//         bAddress4: this.state.bill[3],
//         bAddress5: this.state.bill[4],
//         sAddress1: this.state.ship[0],
//         sAddress2: this.state.ship[1],
//         sAddress3: this.state.ship[2],
//         sAddress4: this.state.ship[3],
//         sAddress5: this.state.ship[4]
//       })
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         console.log("data", data)
//         // console.log("data",data.records)
//         if (data.message == "Vendor Added") {
//           this.setState({ msg: "Vendor Added" })
//           this.setState({btndisable:true})
//           this.setState({isSucess:true ,Smsg:data.message})
//           setTimeout(()=>{
//           this.setState({isSucess:false,redirectToVendor:true})
//           },1000)
//         } else {
//           this.setState({ isopen: true, errorMsg: data.error })
//           this.setState({ msg: "Sorry ! something went wrong ..." })
//         }
//       })
//   }

//   handleGst = e => {
//     console.log("gstnno", e.target.value)
//     this.setState({ gstno: e.target.value })

//     setTimeout(() => {
//       if (this.validateGSTIN(this.state.gstno)) {
//         this.setState({ gstno: this.state.gstno, gstmsg: "" })
//       } else {
//         this.setState({ gstmsg: "Please Enter Valid GST No." })
//       }
//     }, 1000)
//   }

//   handleShip = shipaddr => {
//     if (this.state.Shipcount < 5) {
//       if (!this.state.Shipaddress) {
//         this.setState({ Shipmsg: "Enter Shipping Address" })
//       }

//       this.state.ship.push(this.state.Shipaddress)
//       this.state.Shipcount++
//       this.setState({ Shipaddress: "" })
//       console.log("Shipcount", this.state.Shipcount)

//       //             sessionStorage.setItem("Ship",JSON.stringify(this.state.ship))

//       console.log("handele ship is clicked", this.state.ship)

//       if (
//         this.state.ship[0] == "undefined" ||
//         this.state.ship[1] == "undefined" ||
//         this.state.ship[2] == "undefined" ||
//         this.state.ship[3] == "undefined" ||
//         this.state.ship[4] == "undefined"
//       ) {
//         this.setState({
//           saddr1: "",
//           saddr2: "",
//           saddr3: "",
//           saddr4: "",
//           saddr5: ""
//         })
//       } else {
//         this.setState({
//           saddr1: this.state.ship[0],
//           saddr2: this.state.ship[2],
//           saddr3: this.state.ship[3],
//           saddr4: this.state.ship[4],
//           saddr5: this.state.ship[5]
//         })
//       }
//       //             console.log("handele ship is clicked",this.state.ship.length)
//       // setTimeout(() => {

//       //    // this.setState({redirectToShipaddr:true})
//       // }, 1000);
//     }
//   }

//   handleBill = billaddr => {
//     if (this.state.Billcount < 5) {
//       if (!this.state.address) {
//         this.setState({ Billmsg: "Enter Billing Address" })
//       }
//       this.state.bill.push(this.state.address)

//       this.state.Billcount++
//       this.setState({ address: "" })
//       console.log("new Billing", this.state.bill[0].BillAddress)
//       //             sessionStorage.setItem("Bill",JSON.stringify(this.state.bill))
//       //             this.setState({billbackup: this.state.bill})
//       console.log("handele bill is clicked", this.state.bill[0])
//       console.log("handele bill is clicked", this.state.bill[1])

//       if (
//         this.state.bill[0] == "undefined" ||
//         this.state.bill[1] == "undefined" ||
//         this.state.bill[2] == "undefined" ||
//         this.state.bill[3] == "undefined" ||
//         this.state.bill[4] == "undefined"
//       ) {
//         this.setState({
//           addr1: "",
//           addr2: "",
//           addr3: "",
//           addr4: "",
//           addr5: ""
//         })
//       } else {
//         this.setState({
//           addr1: this.state.bill[0],
//           addr2: this.state.bill[2],
//           addr3: this.state.bill[3],
//           addr4: this.state.bill[4],
//           addr5: this.state.bill[5]
//         })
//       }
//       //             let billcounter=this.state.bill.length
//       //             console.log("handele bill is clicked",this.state.bill.length)
//       // setTimeout(() => {

//       //     console.log("handele bill is clicked",this.state.billbackup)
//       //    // this.setState({redirectToBilladdr:true})
//       // }, 1000);
//     }
//   }
  
//   handlePlace = e => {
//     console.log("Place Code", e.target.value)
//     this.setState({ place_Of_Supply: e.target.value, errorMsg: "" })
//   }

//   render() {
//     const option = [
//       {
//         ProductName: "samsung",
//         StorageQty: "10",
//         StockQty: "50"
//       }
//     ]

//     const inputProps = {
//       value: this.state.address,
//       onChange: this.onChange
//     }

//     const inputProps1 = {
//       value: this.state.Shipaddress,
//       onChange: this.onChange1
//     }

//     const {
//       isLoading,
//       value,
//       InvoiceData,
//       results,
//       InvoiceList,
//       size,
//       open,
//       name,
//       email,
//       mobileNo,
//       created_Date,
//       taxablevalue,
//       totalgst,
//       igst,
//       cgst,
//       sgst,
//       total,
//       qno,
//       ItemList,
//       total_qty,
//       balance_due,
//       paidAmount,
//       open1,
//       AddRemain,
//       query,
//       ShipAddress,
//       tin,
//       CST,
//       panno,
//       ECC,
//       Excise,
//       Collectorate,
//       bill,
//       BillAddress,
//       isopen,
//       State,
//       place_Of_Supply,
//       gstno,isSucess,btndisable
//     } = this.state

//     let data = []
//     if (InvoiceList) {
//       data = InvoiceList
//     } else {
//       data = []
//     }

//     if (query) {
//       const match = new RegExp(escapeRegExp(query), "i")
//       let invoice = data.filter(i => match.test(i.invoice_id))
//     } else {
//       data = []
//     }

//     console.log("Customer info", data)

//     //console.log("invoice id",InvoiceData.invoice_id)

//     return (
//       <div>
//         <PageContainer2>
//           <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
//             <Link to="/Vendor">
//               <IconDiv>
//                 <Icon name="arrow left" />
//               </IconDiv>
//             </Link>
//             <HeadingDiv>
//               <HeadingText>Billing Information !</HeadingText>
//             </HeadingDiv>
//           </div>
//           <FormDiv>
//             <IconDivShare>
//               <Icon name="reply" size="big" onClick={() => this.handleBack()} />
//               {this.state.redirectToBack == true && <Redirect to="/Vendor" />}
//             </IconDivShare>
//             <BillingInfoDiv>
//               <Segment>
//                 <Form>
//                 <Form.Field label='GST No.'/>
//                     <Form.Input
//                       placeholder="Enter GST No. number"
//                       value={gstno}
//                       onChange={this.handleGst}
//                       maxLength="15"
//                     />
//                 </Form>
//                 <div className="space" />
//                 <p style={{ color: "red" }}>{this.state.gstmsg}</p>

                
//                 <List.Item>
//                   <Form>
//                     <label>
//                       <b>Place Of Supply </b>
//                     </label>
//                     <Form.Group widths={1}>
//                       <select
//                         value={place_Of_Supply}
//                         onChange={this.handlePlace}
//                       >
//                         <option value="" disabled selected hidden>
//                           Select Place Of Supply
//                         </option>
//                         {State.map(i => (
//                           <option value={i.state} key={i.id}>
//                             {i.state} - ({i.state_code})
//                           </option>
//                         ))}
//                       </select>
//                     </Form.Group>
//                   </Form>
//                 </List.Item> 
               
//               </Segment>

//               <Segment>
//                 <Form>
//                   <Form.Group widths="equal">
//                     <Form.Field>
//                       <Header as="h4">
//                       <Form.Field label='Billing Address.' required/>                       
//                         <Button circular floated="right">
//                           {this.state.Billcount}
//                         </Button>
//                         <br />
//                       </Header>
//                       <br />

//                       <PlacesAutocomplete inputProps={inputProps} />
//                       <p>
//                         <font color="red">{this.state.Billmsg}</font>
//                       </p>
//                       <br />
//                       <br />

//                       <Button
//                         primary
//                         onClick={() => this.handleBill(BillAddress)}
//                       >
//                       Add  Address
//                       </Button>
//                       {this.state.redirectToBilladdr && (
//                         <Redirect to="/BillingAddrList" />
//                       )}
//                     </Form.Field>
//                   </Form.Group>
//                 </Form>
//               </Segment>
//               <Segment>
//                 <Form>
//                   <Form.Group widths="equal">
//                     <Form.Field>
//                       <Header as="h4">
//                       <Form.Field label='Shipping Address.' required/>                       
//                         <Button circular floated="right">
//                           {this.state.Shipcount}
//                         </Button>
//                         <br />
//                       </Header>
//                       <br />
//                       <PlacesAutocomplete inputProps={inputProps1} />
//                       <p>
//                         <font color="red">{this.state.Shipmsg}</font>
//                       </p>
//                       <br />
//                       <br />

//                       <Button
//                         primary
//                         onClick={() => this.handleShip(ShipAddress)}
//                       >
//                         Add Address
//                       </Button>
//                       {this.state.redirectToShipaddr && (
//                         <Redirect to="/ShipAddrList" />
//                       )}
//                     </Form.Field>
//                   </Form.Group>
//                 </Form>
//                 <p style={{ color: "red" }}>{this.state.msg}</p>
//               </Segment>
//               <div style={{ display: "flex", justifyContent: "center" }}>
//                 <Button primary  disabled={btndisable} onClick={() => this.addVendor()} size="large">
//                   Submit
//                 </Button>
//                 {this.state.redirectToVendor && <Redirect to="/VendorView" />}
//               </div>
//             </BillingInfoDiv>
//           </FormDiv>
//         </PageContainer2>

//         {isopen == true ? (
//           <ErrorModal
//             isopen={this.state.isopen}
//             msg={this.state.errorMsg}
//             onClose={this.handleClose}
//           />
//         ) : (
//           <div />
//         )}

//         {isSucess == true ? (
//           <SuccessModal
//             isopen={this.state.isSucess}
//             msg={this.state.Smsg}
//             onClose={this.handleClose}
//           />
//         ) : (
//           <div />
//         )}


//       </div>
//     )
//   }
// }
// {
//   /*

//     const resultRenderer = ({ invoice_id, item_name }) => <span><Header as="h4">{invoice_id}</Header><p>{item_name}</p></span>
// */
// }

// const logButton = {
//   // background: "transparent",
//   boxShadow: "0 0 0 1px #D7A01D inset",
//   padding: "16px 16%",
//   color: "#ffffff"
// }

// const formInput = {
//   background: "transparent",
//   boxShadow: "0 0 0 1px #ffffff inset",
//   color: "#ffffff",
//   padding: "14px"
// }

// const formLabel = {
//   fontWeight: "400",
//   fontSize: "16px"
// }

// const resetStyle = {
//   backgroundColor: "#D7A01D",
//   padding: "14px 10%",
//   color: "#fff",
//   fontSize: "20px",
//   fontWeight: "300"
// }

// const resetStyle1 = {
//   backgroundColor: "transparent",
//   padding: "14px 6%",
//   color: "#fff",
//   fontSize: "20px",
//   fontWeight: "300"
// }

// const white = {
//   fontSize: "18px"
// }

// const header = {
//   color: "#ffffff",
//   fontSize: "16px"
// }

// const w1 = {
//   fontSize: "16px"
// }

// export default VendorBillingInfo
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

class VendorBillingInfo extends Component {
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
    addr1: "",
    addr2: "",
    addr3: "",
    addr4: "",
    addr5: "",
    saddr1: "",
    saddr2: "",
    saddr3: "",
    saddr4: "",
    saddr5: "",
    isopen: false,
    State: [],
    place_Of_Supply: "",
    gstno: "",
    btndisable:false,
    isSucess:false
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

      if (
        this.state.ship[0] == "undefined" ||
        this.state.ship[1] == "undefined" ||
        this.state.ship[2] == "undefined" ||
        this.state.ship[3] == "undefined" ||
        this.state.ship[4] == "undefined"
      ) {
        this.setState({
          saddr1: "",
          saddr2: "",
          saddr3: "",
          saddr4: "",
          saddr5: ""
        })
      } else {
        this.setState({
          saddr1: this.state.ship[0],
          saddr2: this.state.ship[2],
          saddr3: this.state.ship[3],
          saddr4: this.state.ship[4],
          saddr5: this.state.ship[5]
        })
      }
      //             console.log("handele ship is clicked",this.state.ship.length)
      // setTimeout(() => {

      //    // this.setState({redirectToShipaddr:true})
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
      console.log("new Billing", this.state.bill[0].BillAddress)
      //             sessionStorage.setItem("Bill",JSON.stringify(this.state.bill))
      //             this.setState({billbackup: this.state.bill})
      console.log("handele bill is clicked", this.state.bill[0])
      console.log("handele bill is clicked", this.state.bill[1])

      if (
        this.state.bill[0] == "undefined" ||
        this.state.bill[1] == "undefined" ||
        this.state.bill[2] == "undefined" ||
        this.state.bill[3] == "undefined" ||
        this.state.bill[4] == "undefined"
      ) {
        this.setState({
          addr1: "",
          addr2: "",
          addr3: "",
          addr4: "",
          addr5: ""
        })
      } else {
        this.setState({
          addr1: this.state.bill[0],
          addr2: this.state.bill[2],
          addr3: this.state.bill[3],
          addr4: this.state.bill[4],
          addr5: this.state.bill[5]
        })
      }
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

  addVendor = () => {

    if (this.state.bill.length == []) {
      return this.setState({ msg: "Please Enter Billing Address", isopen: true })
    }
    
    if (this.state.ship.length == []) {
      return this.setState({ msg: "Please Enter Ship Address", isopen: true })
    }

    let name = sessionStorage.getItem("vendor_name")
    let email = sessionStorage.getItem("vendor_email")
    let phno = sessionStorage.getItem("vendor_phno")
    let phno2 = sessionStorage.getItem("vendor_phno2")
    let addr = sessionStorage.getItem("vendor_addr")
    let owner = sessionStorage.getItem("vendor_owner")
    let type = sessionStorage.getItem("vendor_type")
    let star = sessionStorage.getItem("vendor_star")
    let tin = sessionStorage.getItem("vendor_tin")
    let cst = sessionStorage.getItem("vendor_cst")
    let pan = sessionStorage.getItem("vendor_pan")
    let gst = sessionStorage.getItem("vendor_gst")
    let ecc = sessionStorage.getItem("vendor_ecc")
    let Excise = sessionStorage.getItem("vendor_Excise")
    let collectorate = sessionStorage.getItem("vendor_collectorate")
    let typeTransmute = sessionStorage.getItem("vendor_typeOfTransmute")
    let cname = sessionStorage.getItem("cname")
    let cname2 = sessionStorage.getItem("cname2")

    let iname = sessionStorage.getItem("itype")
    let istype = sessionStorage.getItem("istype")
    let Description = sessionStorage.getItem("Description")
    let no_emp = sessionStorage.getItem("no_emp")
    let ProducrServiceName = sessionStorage.getItem("psname")
    let desg1=sessionStorage.getItem("desgnation1")
    let desg2=sessionStorage.getItem("desgnation2")


    console.log("names of vendor,", name)
    console.log("bill value", this.state.bill[0])
    console.log("bill value", JSON.stringify(this.state.bill[1]))

    //     if (this.state.bill[0] == "empty"){

    //             addr1="" ,
    // }

    fetch("http://35.161.99.113:9000/webapi/t_vendor/addVendor ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        star: star,
        address: addr,
        number: phno,
        number2: phno2,
        email: email,
        owner: owner,
        type: typeTransmute,
        //leadType:typeTransmute,
        tinNo: tin,
        cstNo: cst,
        panNo: pan,
        gstNo: this.state.gstno,
        ecc: ecc,
        exciseDivision: Excise,
        exciseCollectorate: collectorate,
        place_Of_Supply: this.state.place_Of_Supply,
        indType: iname,
        indSubType: istype,
        noEmp: no_emp,
        description: Description,
        ps: ProducrServiceName,
        cname1: cname,
        cname2: cname2,
        designation1:desg1,
        designation2:desg2,
        bAddress1: this.state.bill[0],
        bAddress2: this.state.bill[1],
        bAddress3: this.state.bill[2],
        bAddress4: this.state.bill[3],
        bAddress5: this.state.bill[4],
        sAddress1: this.state.ship[0],
        sAddress2: this.state.ship[1],
        sAddress3: this.state.ship[2],
        sAddress4: this.state.ship[3],
        sAddress5: this.state.ship[4]
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        // console.log("data",data.records)
        if (data.message == "Vendor Added") {
          this.setState({ msg: "Vendor Added" })
          this.setState({btndisable:true})
          this.setState({isSucess:true ,Smsg:data.message})
          setTimeout(()=>{
          this.setState({isSucess:false,redirectToVendor:true})
          },1000)
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

  handleShip = shipaddr => {
    if (this.state.Shipcount < 5) {
      if (!this.state.Shipaddress) {
        this.setState({ Shipmsg: "Enter Shipping Address" })
      }

      this.state.ship.push(this.state.Shipaddress)
      this.state.Shipcount++
      this.setState({ Shipaddress: "" })
      console.log("Shipcount", this.state.Shipcount)

      //             sessionStorage.setItem("Ship",JSON.stringify(this.state.ship))

      console.log("handele ship is clicked", this.state.ship)

      if (
        this.state.ship[0] == "undefined" ||
        this.state.ship[1] == "undefined" ||
        this.state.ship[2] == "undefined" ||
        this.state.ship[3] == "undefined" ||
        this.state.ship[4] == "undefined"
      ) {
        this.setState({
          saddr1: "",
          saddr2: "",
          saddr3: "",
          saddr4: "",
          saddr5: ""
        })
      } else {
        this.setState({
          saddr1: this.state.ship[0],
          saddr2: this.state.ship[2],
          saddr3: this.state.ship[3],
          saddr4: this.state.ship[4],
          saddr5: this.state.ship[5]
        })
      }
      //             console.log("handele ship is clicked",this.state.ship.length)
      // setTimeout(() => {

      //    // this.setState({redirectToShipaddr:true})
      // }, 1000);
    }
  }

  handleBill = billaddr => {
    if (this.state.Billcount < 5) {
      if (!this.state.address) {
        this.setState({ Billmsg: "Enter Billing Address" })
      }
      this.state.bill.push(this.state.address)

      this.state.Billcount++
      this.setState({ address: "" })
      console.log("new Billing", this.state.bill[0].BillAddress)
      //             sessionStorage.setItem("Bill",JSON.stringify(this.state.bill))
      //             this.setState({billbackup: this.state.bill})
      console.log("handele bill is clicked", this.state.bill[0])
      console.log("handele bill is clicked", this.state.bill[1])

      if (
        this.state.bill[0] == "undefined" ||
        this.state.bill[1] == "undefined" ||
        this.state.bill[2] == "undefined" ||
        this.state.bill[3] == "undefined" ||
        this.state.bill[4] == "undefined"
      ) {
        this.setState({
          addr1: "",
          addr2: "",
          addr3: "",
          addr4: "",
          addr5: ""
        })
      } else {
        this.setState({
          addr1: this.state.bill[0],
          addr2: this.state.bill[2],
          addr3: this.state.bill[3],
          addr4: this.state.bill[4],
          addr5: this.state.bill[5]
        })
      }
      //             let billcounter=this.state.bill.length
      //             console.log("handele bill is clicked",this.state.bill.length)
      // setTimeout(() => {

      //     console.log("handele bill is clicked",this.state.billbackup)
      //    // this.setState({redirectToBilladdr:true})
      // }, 1000);
    }
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
      gstno,isSucess,btndisable
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
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Vendor">
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
              {this.state.redirectToBack == true && <Redirect to="/Vendor" />}
            </IconDivShare>
            <BillingInfoDiv>
              <Segment>
                <Form
                  style={{ fontSize: "16px" }}               //Aishwarya  
                >
                  <Form.Field label='GST No.' />
                  <Form.Input
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
                    style={{ fontSize: "16px" }}               //Aishwarya   
                  >
                    <label>
                      <b>Place Of Supply </b>
                    </label>
                    <Form.Group
                      style={{ width: "290px", height: "38px", marginLeft: "1px", marginTop: "10px" }}        //Aishwarya
                    >
                      <select
                        value={place_Of_Supply}
                        onChange={this.handlePlace}
                      >
                        <option value="" disabled selected hidden>
                          Select Place Of Supply
                        </option>
                        {State.map(i => (
                          <option value={i.state} key={i.id}>
                            {i.state} - ({i.state_code})
                          </option>
                        ))}
                      </select>
                    </Form.Group>
                  </Form>
                </List.Item>

              </Segment>

              <Segment>
                <Form
                  style={{ fontSize: "16px" }}               //Aishwarya   
                >
                  <Form.Group widths="equal">
                    <Form.Field>
                      {/* <Header as="h4">*/}
                      <Form.Field label='Billing Address.' required />
                      <Button circular floated="right">
                        {this.state.Billcount}
                      </Button>
                      <br />
                      {/*</Header>*/}
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
                        Add  Address
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
                  style={{ fontSize: "16px" }}               //Aishwarya   
                >
                  <Form.Group widths="equal">
                    <Form.Field>
                      {/*<Header as="h4">*/}
                      <Form.Field label='Shipping Address.' required />
                      <Button circular floated="right">
                        {this.state.Shipcount}
                      </Button>
                      <br />
                      {/*</Header>*/}
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
                <Button primary disabled={btndisable} onClick={() => this.addVendor()} size="large">
                  Submit
                </Button>
                {this.state.redirectToVendor && <Redirect to="/VendorView" />}
              </div>
            </BillingInfoDiv>
          </FormDiv>
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

export default VendorBillingInfo
