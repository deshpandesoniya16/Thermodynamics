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
//   FormText,
//   Form2Div,
//   BillingInfoDiv,
//   EditBillingInfoDiv,
//   EditInfoDiv,
//   EditInfo
// } from "../styledComps.js"

// class EditVendorBillingInfo extends Component {
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
//     ddress: "",
//     Shipaddress: "",
//     Shipcount: 0,
//     Billcount: 0,
//     clientData: [],
//     bAddress1: "",
//     address2: "",
//     address3: "",
//     address4: "",
//     address5: "",
//     sAddress1: "",
//     sAddress2: "",
//     sAddress3: "",
//     sAddress4: "",
//     sAddress5: "",
//     vendorData: [],
//     isopen: false,
//     State: [],
//     place_Of_Supply: "",
//     gstno: "",
//     btndisable:false,
//     isSucess:false,
//     designation1:"",
//     designation2:""
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
//     console.log(
//       "data in session",
//       JSON.parse(sessionStorage.getItem("editTicket"))
//     )
//     let vendorData = JSON.parse(sessionStorage.getItem("editTicket"))
//     if (!vendorData) {
//       this.setState({ msg: "No Data Available" })
//     } else {
//       this.setState({
//         vendorData: vendorData,

//         gstno: vendorData.gstNo,
//         place_Of_Supply: vendorData.place_Of_Supply
//       })

//       if (vendorData.bAddress1 == "undefined") {
//         this.setState({ address: "" })
//       } else {
//         this.setState({ address: vendorData.bAddress1 })
//       }
//       if (vendorData.bAddress2 == "undefined") {
//         this.setState({ address2: "" })
//       } else {
//         this.setState({ address2: vendorData.bAddress2 })
//       }
//       if (vendorData.bAddress3 == "undefined") {
//         this.setState({ address3: "" })
//       } else {
//         this.setState({ address3: vendorData.bAddress3 })
//       }
//       if (vendorData.bAddress4 == "undefined") {
//         this.setState({ address4: "" })
//       } else {
//         this.setState({ address4: vendorData.bAddress4 })
//       }
//       if (vendorData.bAddress5 == "undefined") {
//         this.setState({ address5: "" })
//       } else {
//         this.setState({ address5: vendorData.bAddress5 })
//       }

//       if (vendorData.sAddress1 == "undefined") {
//         this.setState({ sAddress1: "" })
//       } else {
//         this.setState({ sAddress1: vendorData.sAddress1 })
//       }
//       if (vendorData.sAddress2 == "undefined") {
//         this.setState({ sAddress2: "" })
//       } else {
//         this.setState({ sAddress2: vendorData.sAddress2 })
//       }
//       if (vendorData.sAddress3 == "undefined") {
//         this.setState({ sAddress3: "" })
//       } else {
//         this.setState({ sAddress3: vendorData.sAddress3 })
//       }
//       if (vendorData.sAddress4 == "undefined") {
//         this.setState({ sAddress4: "" })
//       } else {
//         this.setState({ sAddress4: vendorData.sAddress4 })
//       }
//       if (vendorData.sAddress5 == "undefined") {
//         this.setState({ sAddress5: "" })
//       } else {
//         this.setState({ sAddress5: vendorData.sAddress5 })
//       }
//     }
//   }

//   validateGSTIN = gstin => {
//     let gst = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
//     return gst.test(gstin)
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

//   onChange = address => {
//     console.log("Address is", address)
//     this.setState({ address, msg: "" })
//   }

//   onChange1 = address2 => {
//     console.log("Address is", address2)
//     this.setState({ address2, msg: "" })
//   }

//   onChange2 = address3 => {
//     console.log("Address is", address3)
//     this.setState({ address3, msg: "" })
//   }

//   onChange3 = address4 => {
//     console.log("Address is", address4)
//     this.setState({ address4, msg: "" })
//   }

//   onChange4 = address5 => {
//     console.log("Address is", address5)
//     this.setState({ address5, msg: "" })
//   }

//   handleShipaddr1 = sAddress1 => {
//     console.log("Address is", sAddress1)
//     this.setState({ sAddress1, msg: "" })
//   }

//   handleShipaddr2 = sAddress2 => {
//     console.log("Address is", sAddress2)
//     this.setState({ sAddress2, msg: "" })
//   }
//   handleShipaddr3 = sAddress3 => {
//     console.log("Address is", sAddress3)
//     this.setState({ sAddress3, msg: "" })
//   }

//   handleShipaddr4 = sAddress4 => {
//     console.log("Address is", sAddress4)
//     this.setState({ sAddress4, msg: "" })
//   }

//   handleShipaddr5 = sAddress5 => {
//     console.log("Address is", sAddress5)
//     this.setState({ sAddress5, msg: "" })
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

//   update = () => {

//     // if (this.state.bill.length == []) {
//     //   return this.setState({ msg: "Please Enter Billing Address", isopen: true })
//     // }
    
//     // if (this.state.ship.length == []) {
//     //   return this.setState({ msg: "Please Enter Ship Address", isopen: true })
//     // }

//     console.log("Name OF company", sessionStorage.getItem("vendor_name"))
//     let name = sessionStorage.getItem("vendor_name")
//     let email = sessionStorage.getItem("vendor_email")
//     let phno = sessionStorage.getItem("vendor_phno")
//     let phno2 = sessionStorage.getItem("vendor_phno2")
//     let addr = sessionStorage.getItem("vendor_addr")
//     let owner = sessionStorage.getItem("vendor_owner")
//     let star = sessionStorage.getItem("vendor_star")
//     let tin = sessionStorage.getItem("vendor_tin")
//     let cst = sessionStorage.getItem("vendor_cst")
//     let pan = sessionStorage.getItem("vendor_pan")
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
//     let desg1=sessionStorage.getItem("desgnation3")
//       let desg2=sessionStorage.getItem("desgnation4")

//     console.log("desg",desg1,desg2)


//     //  console.log("bill value",this.state.bill[0].BillAddress)

//     fetch("http://35.161.99.113:9000/webapi/t_vendor/editVendor", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         vendorId: this.state.vendorData.id,
//         name: name,
//         star: star,
//         address: addr,
//         number: phno,
//         number2: phno2,
//         email: email,
//         owner: owner,
//         type: typeTransmute,
//         // leadType:typeTransmute,
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
//         designation1:desg1,
//         designation2:desg2,
//         cname1:cname,
//         cname2:cname2,

//         // clientId:this.state.clientData.id,
//         bAddress1: this.state.address,
//         bAddress2: this.state.address2,
//         bAddress3: this.state.address3,
//         bAddress4: this.state.address4,
//         bAddress5: this.state.address5,
//         sAddress1: this.state.sAddress1,
//         sAddress2: this.state.sAddress2,
//         sAddress3: this.state.sAddress3,
//         sAddress4: this.state.sAddress4,
//         sAddress5: this.state.sAddress5
//       })
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         console.log("data", data)
//         // console.log("data",data.records)
//         if (data.message == "Vendor Updated") {
//           this.setState({ msg: "succesfully updated" })
//           this.setState({btndisable:true})
//               this.setState({isSucess:true ,Smsg:data.message})
//               setTimeout(()=>{
//               this.setState({isSucess:false,redirectToVendor:true})
//               },1000)
//         } else {
//           this.setState({ isopen: true, errorMsg: data.error })
//           this.setState({ msg: "Sorry ! something went wrong ..." })
//         }
//       })
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
//       value: this.state.address2,
//       onChange: this.onChange1
//     }

//     const inputProps2 = {
//       value: this.state.address3,
//       onChange: this.onChange2
//     }

//     const inputProps3 = {
//       value: this.state.address4,
//       onChange: this.onChange3
//     }

//     const inputProps4 = {
//       value: this.state.address5,
//       onChange: this.onChange4
//     }

//     const ShipProps = {
//       value: this.state.sAddress1,
//       onChange: this.handleShipaddr1
//     }

//     const ShipProps1 = {
//       value: this.state.sAddress2,
//       onChange: this.handleShipaddr2
//     }

//     const ShipProps2 = {
//       value: this.state.sAddress3,
//       onChange: this.handleShipaddr3
//     }

//     const ShipProps3 = {
//       value: this.state.sAddress4,
//       onChange: this.handleShipaddr4
//     }

//     const ShipProps4 = {
//       value: this.state.sAddress5,
//       onChange: this.handleShipaddr5
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
//       address,
//       address2,
//       address3,
//       address4,
//       address5,
//       sAddress1,
//       sAddress2,
//       sAddress3,
//       sAddress4,
//       sAddress5,
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
//             <Link to="/EditVendor">
//               <IconDiv>
//                 <Icon name="arrow left" />
//               </IconDiv>
//             </Link>
//             <HeadingDiv>
//               <HeadingText>Edit Vendor Here !</HeadingText>
//             </HeadingDiv>
//           </div>

//           <IconDivShare>
//             <EditBillingInfoDiv>
//               <Segment>
//                 <Form>
//                 <Form.Field label='GST No.' />
                   
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
//                           <option value={i.state} key={i.state}>
//                             {i.state} - ({i.state_code})
//                           </option>
//                         ))}
//                       </select>
//                     </Form.Group>
//                   </Form>
//                 </List.Item>

//               </Segment>
//             </EditBillingInfoDiv>
//           </IconDivShare>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: "1%"
//             }}
//           >
//             <IconDivShare>
//               <Link to="/EditVendor">
//                 <Icon name="reply" size="big" />
//               </Link>
//             </IconDivShare>
//             <EditInfoDiv>
//               <Segment>
//                 <Header>Billing Address</Header>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex: 99}}>
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Billing Address 1
//                       <PlacesAutocomplete inputProps={inputProps} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex: 98}}>
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Billing Address 2
//                       <PlacesAutocomplete inputProps={inputProps1} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex: 97}}>
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Billing Address 3
//                       <PlacesAutocomplete inputProps={inputProps2} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }} className="locationstyle">
//                   <Card.Content style={{zIndex: 96}}>
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Billing Address 4
//                       <PlacesAutocomplete inputProps={inputProps3} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content >
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Billing Address 5
//                       <PlacesAutocomplete inputProps={inputProps4} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//               </Segment>
//             </EditInfoDiv>
//             <EditInfo>
//               <Segment>
//                 <Header>Shipping Address</Header>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex: 100}}>
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Shipping Address 1
//                       <PlacesAutocomplete inputProps={ShipProps} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex:99}}>
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Shipping Address 2
//                       <PlacesAutocomplete inputProps={ShipProps1} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex: 98}}>
//                     <Card.Header>
//                       <Icon name="marker" size="small" />
//                       Shipping Address 3
//                       <PlacesAutocomplete inputProps={ShipProps2} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex: 97}}>
//                     <Card.Header>
//                       <Icon name="marker" size="tiny" />
//                       Shipping Address 4
//                       <PlacesAutocomplete inputProps={ShipProps3} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//                 <Card style={{ width: "100%" }}>
//                   <Card.Content style={{zIndex: 96}}>
//                     <Card.Header>
//                       <Icon name="marker" size="tiny" />
//                       Shipping Address 5
//                       <PlacesAutocomplete inputProps={ShipProps4} />
//                     </Card.Header>
//                   </Card.Content>
//                 </Card>
//                 <br></br>
//               </Segment>
//             </EditInfo>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: "1%"
//             }}
//           >
//             <Button disabled={btndisable} primary onClick={() => this.update()}>
//               UPDATE
//             </Button>
//             {this.state.redirectToVendor && <Redirect to="/VendorView" />}
//           </div>
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

//           {isSucess == true ? (
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

// export default EditVendorBillingInfo
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
  FormText,
  Form2Div,
  BillingInfoDiv,
  EditBillingInfoDiv,
  EditInfoDiv,
  EditInfo
} from "../styledComps.js"

class EditVendorBillingInfo extends Component {
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
    ddress: "",
    Shipaddress: "",
    Shipcount: 0,
    Billcount: 0,
    clientData: [],
    bAddress1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    sAddress1: "",
    sAddress2: "",
    sAddress3: "",
    sAddress4: "",
    sAddress5: "",
    vendorData: [],
    isopen: false,
    State: [],
    place_Of_Supply: "",
    gstno: "",
    btndisable:false,
    isSucess:false,
    designation1:"",
    designation2:""
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
    let vendorData = JSON.parse(sessionStorage.getItem("editTicket"))
    if (!vendorData) {
      this.setState({ msg: "No Data Available" })
    } else {
      this.setState({
        vendorData: vendorData,

        gstno: vendorData.gstNo,
        place_Of_Supply: vendorData.place_Of_Supply
      })

      if (vendorData.bAddress1 == "undefined") {
        this.setState({ address: "" })
      } else {
        this.setState({ address: vendorData.bAddress1 })
      }
      if (vendorData.bAddress2 == "undefined") {
        this.setState({ address2: "" })
      } else {
        this.setState({ address2: vendorData.bAddress2 })
      }
      if (vendorData.bAddress3 == "undefined") {
        this.setState({ address3: "" })
      } else {
        this.setState({ address3: vendorData.bAddress3 })
      }
      if (vendorData.bAddress4 == "undefined") {
        this.setState({ address4: "" })
      } else {
        this.setState({ address4: vendorData.bAddress4 })
      }
      if (vendorData.bAddress5 == "undefined") {
        this.setState({ address5: "" })
      } else {
        this.setState({ address5: vendorData.bAddress5 })
      }

      if (vendorData.sAddress1 == "undefined") {
        this.setState({ sAddress1: "" })
      } else {
        this.setState({ sAddress1: vendorData.sAddress1 })
      }
      if (vendorData.sAddress2 == "undefined") {
        this.setState({ sAddress2: "" })
      } else {
        this.setState({ sAddress2: vendorData.sAddress2 })
      }
      if (vendorData.sAddress3 == "undefined") {
        this.setState({ sAddress3: "" })
      } else {
        this.setState({ sAddress3: vendorData.sAddress3 })
      }
      if (vendorData.sAddress4 == "undefined") {
        this.setState({ sAddress4: "" })
      } else {
        this.setState({ sAddress4: vendorData.sAddress4 })
      }
      if (vendorData.sAddress5 == "undefined") {
        this.setState({ sAddress5: "" })
      } else {
        this.setState({ sAddress5: vendorData.sAddress5 })
      }
    }
  }

  validateGSTIN = gstin => {
    let gst = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
    return gst.test(gstin)
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

  onChange = address => {
    console.log("Address is", address)
    this.setState({ address, msg: "" })
  }

  onChange1 = address2 => {
    console.log("Address is", address2)
    this.setState({ address2, msg: "" })
  }

  onChange2 = address3 => {
    console.log("Address is", address3)
    this.setState({ address3, msg: "" })
  }

  onChange3 = address4 => {
    console.log("Address is", address4)
    this.setState({ address4, msg: "" })
  }

  onChange4 = address5 => {
    console.log("Address is", address5)
    this.setState({ address5, msg: "" })
  }

  handleShipaddr1 = sAddress1 => {
    console.log("Address is", sAddress1)
    this.setState({ sAddress1, msg: "" })
  }

  handleShipaddr2 = sAddress2 => {
    console.log("Address is", sAddress2)
    this.setState({ sAddress2, msg: "" })
  }
  handleShipaddr3 = sAddress3 => {
    console.log("Address is", sAddress3)
    this.setState({ sAddress3, msg: "" })
  }

  handleShipaddr4 = sAddress4 => {
    console.log("Address is", sAddress4)
    this.setState({ sAddress4, msg: "" })
  }

  handleShipaddr5 = sAddress5 => {
    console.log("Address is", sAddress5)
    this.setState({ sAddress5, msg: "" })
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

  update = () => {

    // if (this.state.bill.length == []) {
    //   return this.setState({ msg: "Please Enter Billing Address", isopen: true })
    // }
    
    // if (this.state.ship.length == []) {
    //   return this.setState({ msg: "Please Enter Ship Address", isopen: true })
    // }

    console.log("Name OF company", sessionStorage.getItem("vendor_name"))
    let name = sessionStorage.getItem("vendor_name")
    let email = sessionStorage.getItem("vendor_email")
    let phno = sessionStorage.getItem("vendor_phno")
    let phno2 = sessionStorage.getItem("vendor_phno2")
    let addr = sessionStorage.getItem("vendor_addr")
    let owner = sessionStorage.getItem("vendor_owner")
    let star = sessionStorage.getItem("vendor_star")
    let tin = sessionStorage.getItem("vendor_tin")
    let cst = sessionStorage.getItem("vendor_cst")
    let pan = sessionStorage.getItem("vendor_pan")
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
    let desg1=sessionStorage.getItem("desgnation3")
      let desg2=sessionStorage.getItem("desgnation4")

    console.log("desg",desg1,desg2)


    //  console.log("bill value",this.state.bill[0].BillAddress)

    fetch("http://35.161.99.113:9000/webapi/t_vendor/editVendor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vendorId: this.state.vendorData.id,
        name: name,
        star: star,
        address: addr,
        number: phno,
        number2: phno2,
        email: email,
        owner: owner,
        type: typeTransmute,
        // leadType:typeTransmute,
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
        designation1:desg1,
        designation2:desg2,
        cname1:cname,
        cname2:cname2,

        // clientId:this.state.clientData.id,
        bAddress1: this.state.address,
        bAddress2: this.state.address2,
        bAddress3: this.state.address3,
        bAddress4: this.state.address4,
        bAddress5: this.state.address5,
        sAddress1: this.state.sAddress1,
        sAddress2: this.state.sAddress2,
        sAddress3: this.state.sAddress3,
        sAddress4: this.state.sAddress4,
        sAddress5: this.state.sAddress5
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        // console.log("data",data.records)
        if (data.message == "Vendor Updated") {
          this.setState({ msg: "succesfully updated" })
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
      value: this.state.address2,
      onChange: this.onChange1
    }

    const inputProps2 = {
      value: this.state.address3,
      onChange: this.onChange2
    }

    const inputProps3 = {
      value: this.state.address4,
      onChange: this.onChange3
    }

    const inputProps4 = {
      value: this.state.address5,
      onChange: this.onChange4
    }

    const ShipProps = {
      value: this.state.sAddress1,
      onChange: this.handleShipaddr1
    }

    const ShipProps1 = {
      value: this.state.sAddress2,
      onChange: this.handleShipaddr2
    }

    const ShipProps2 = {
      value: this.state.sAddress3,
      onChange: this.handleShipaddr3
    }

    const ShipProps3 = {
      value: this.state.sAddress4,
      onChange: this.handleShipaddr4
    }

    const ShipProps4 = {
      value: this.state.sAddress5,
      onChange: this.handleShipaddr5
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
      address,
      address2,
      address3,
      address4,
      address5,
      sAddress1,
      sAddress2,
      sAddress3,
      sAddress4,
      sAddress5,
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
            <Link to="/EditVendor">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Edit Vendor Here !</HeadingText>
            </HeadingDiv>
          </div>

          <IconDivShare>
            <EditBillingInfoDiv>
              <Segment>
                <Form
                  style={{ fontSize: "16px" }}        //Aishwarya
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
                    style={{ fontSize: "16px" }}        //Aishwarya
                  >
                    <label>
                      <b>Place Of Supply </b>
                    </label>
                    <Form.Group
                      style={{ width: "290px", height: "38px", marginTop: "10px", marginLeft: "1px" }}              //Aishwarya
                    >
                      <select
                        value={place_Of_Supply}
                        onChange={this.handlePlace}
                      >
                        <option value="" disabled selected hidden>
                          Select Place Of Supply
                        </option>
                        {State.map(i => (
                          <option value={i.state} key={i.state}>
                            {i.state} - ({i.state_code})
                          </option>
                        ))}
                      </select>
                    </Form.Group>
                  </Form>
                </List.Item>

              </Segment>
            </EditBillingInfoDiv>
          </IconDivShare>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%"
            }}
          >
            <IconDivShare>
              <Link to="/EditVendor">
                <Icon name="reply" size="big" />
              </Link>
            </IconDivShare>
            <EditInfoDiv>
              <Segment>
                <Header>Billing Address</Header>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex: 99}}>
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Billing Address 1
                      <PlacesAutocomplete inputProps={inputProps} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex: 98}}>
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Billing Address 2
                      <PlacesAutocomplete inputProps={inputProps1} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex: 97}}>
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Billing Address 3
                      <PlacesAutocomplete inputProps={inputProps2} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }} className="locationstyle">
                  <Card.Content style={{zIndex: 96}}>
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Billing Address 4
                      <PlacesAutocomplete inputProps={inputProps3} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }}>
                  <Card.Content >
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Billing Address 5
                      <PlacesAutocomplete inputProps={inputProps4} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
              </Segment>
            </EditInfoDiv>
            <EditInfo>
              <Segment>
                <Header>Shipping Address</Header>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex: 100}}>
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Shipping Address 1
                      <PlacesAutocomplete inputProps={ShipProps} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex:99}}>
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Shipping Address 2
                      <PlacesAutocomplete inputProps={ShipProps1} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex: 98}}>
                    <Card.Header>
                      <Icon name="marker" size="small" />
                      Shipping Address 3
                      <PlacesAutocomplete inputProps={ShipProps2} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex: 97}}>
                    <Card.Header>
                      <Icon name="marker" size="tiny" />
                      Shipping Address 4
                      <PlacesAutocomplete inputProps={ShipProps3} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
                <Card style={{ width: "100%" }}>
                  <Card.Content style={{zIndex: 96}}>
                    <Card.Header>
                      <Icon name="marker" size="tiny" />
                      Shipping Address 5
                      <PlacesAutocomplete inputProps={ShipProps4} />
                    </Card.Header>
                  </Card.Content>
                </Card>
                <br></br>
              </Segment>
            </EditInfo>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%"
            }}
          >
            <Button disabled={btndisable} primary onClick={() => this.update()}>
              UPDATE
            </Button>
            {this.state.redirectToVendor && <Redirect to="/VendorView" />}
          </div>
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

export default EditVendorBillingInfo
