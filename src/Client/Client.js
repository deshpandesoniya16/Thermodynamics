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
// import Search from "semantic-ui-react/dist/commonjs/modules/Search/Search"
// import Side from "../component/Sidenav"
// import escapeRegExp from "escape-string-regexp"
// import PlacesAutocomplete from "react-places-autocomplete"
// import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"

// import Select from "react-select"
// import EditableDropDown from "../component/EditableDropDown"
// import StarRatingComponent from 'react-star-rating-component';
// import rawSpan from "../component/span";

// import {
//   industryAdd,
//   industryList,
//   industryDelete,
//   SubIndustryadd,
//   SubIndustrylist,
//   addProductService,
//   pslist,
//   deletePS,
//   industryBasedsubindustry
// } from ".././component/Api"

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
//   Form2Div
// } from "../styledComps.js"

// class Client extends Component {
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
//     mop: "",
//     query: "",
//     address: "",
//     getLatLng: {},
//     CompanyName: "",
//     phno: "",
//     owner: "",
//     type: "",
//     email: "",
//     phno2: "",
//     cname: "",
//     Machnie: "",
//     cname2: "",
//     panno: "",
//     panmsg: "",
//     No_of_Emp: "",
//     Description: "",
//     isIndustry: false,
//     isSubIndustry: false,
//     IndustryName: "",
//     SubIndustryName: "",
//     ProducrService: false,
//     ProducrServiceName: "",
//     Semail: "",
//     industryData: [],
//     subindustryData: [],
//     iname: "",
//     istype: "",
//     pstype: "",
//     psData: [],
//     rating:0,
//     designation1:"",
//     designation2:""
//   }

//   IndustryList = () => {
//     fetch(industryList, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({})
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         console.log("data", data)
//         console.log("industry List ", data.records)
//         if (data.records) {
//           this.setState({ industryData: data.records })
//         } else {
//           console.log("No vertical")
//           this.setState({ industryData: [] })
//         }
//       })
//   }

//   subIndustrylist = (id) => {
//     fetch(industryBasedsubindustry, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         indid:id
//       })
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         console.log("data", data)
//         console.log("Sub industry List ", data.records)
//         if (data.records) {
//           this.setState({ subindustryData: data.records,istype:'' })
//         } else {
//           console.log("No industry")
//           this.setState({ subindustryData: [],istype:'' })
//         }
//       })
//   }

//   productServiceList = () => {
//     fetch(pslist, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({})
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         console.log("data", data)
//         console.log("Product Service List ", data.records)
//         if (data.records) {
//           this.setState({ psData: data.records })
//         } else {
//           console.log("No Product Service")
//           this.setState({ psData: [] })
//         }
//       })
//   }

//   componentDidMount() {
//     this.IndustryList()

//     this.subIndustrylist()

//     this.productServiceList()
//   }



//   onStarClick=(nextValue, prevValue, name)=> {
//     this.setState({rating: nextValue});
//   }




//   validateNumber = input => {
//     if (input === "") {
//       return true
//     }
//     let pattern = /^\d+(\.\d{1,2})?$/
//     return pattern.test(input)
//   }

//   validateEmail = email => {
//     var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
//     return re.test(email)
//   }

//   validatePan = panno => {
//     let re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
//     return re.test(panno)
//   }

//   onChange = address => {
//     console.log("Address is", address)
//     this.setState({ address })
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

//   handleEmail = e => {
//     console.log("email", e.target.value)
//     this.setState({ email: e.target.value })

//     setTimeout(() => {
//       if (this.validateEmail(this.state.email)) {
//         this.setState({ email: this.state.email, EmailMsg: "" })
//       } else {
//         this.setState({ EmailMsg: "Please Enter Valid Email." })
//       }
//     }, 1000)
//   }

//   handlePhno = e => {
//     if (this.validateNumber(e.target.value)) {
//       this.setState({ phno: e.target.value })
//     } else {
//       this.setState({ msg: "Not Valid no." })
//     }
//   }

//   handlePhno2 = e => {
//     if (this.validateNumber(e.target.value)) {
//       this.setState({ phno2: e.target.value })
//     } else {
//       this.setState({ msg: "Not Valid no." })
//     }
//   }

//   handleOwner = e => {
//     this.setState({ owner: e.target.value })
//   }

//   handleType = e => {
//     this.setState({ type: e.target.value })
//   }

//   handleTransmute = () => {
//     if (!this.state.CompanyName) {
//       this.setState({ open: true, msg: "Please Enter Company Name" })
//     }else if(this.state.email.length <=0){
//       this.setState({ open: true, msg: "Please Enter Email Id." })
//     } else if (!this.state.phno) {
//       this.setState({ open: true, msg: "Please Enter Primary Contact No." })
//     } else if (!this.state.cname) {
//       this.setState({ open: true, msg: "Please Enter Primary Contact Person Name" })
//     }else if(this.state.designation1.length <=0){

//       this.setState({ open: true, msg: "Please Enter Primary Designation" })
//     }else if(this.state.address.length <= 0){
//       this.setState({ open: true, msg: "Please Enter Address" })

//     }else{
//     // } else if (!this.state.Machnie) {
//     //   this.setState({ open: true, msg: "Please Select Type of Client" })
//     // } else {
//       sessionStorage.setItem("name", this.state.CompanyName)
//       sessionStorage.setItem("email", this.state.email)
//       sessionStorage.setItem("phno", this.state.phno)
//       sessionStorage.setItem("phno2", this.state.phno2)
//       sessionStorage.setItem("addr", this.state.address)
//       sessionStorage.setItem("owner", this.state.owner)
//       sessionStorage.setItem("owner", this.state.owner)
//       sessionStorage.setItem("type", this.state.type)
//       sessionStorage.setItem("star", this.state.rating)
//       sessionStorage.setItem("cname", this.state.cname)
//       sessionStorage.setItem("cname2", this.state.cname2)
//       sessionStorage.setItem("type", this.state.Machnie)
//       sessionStorage.setItem("pan", this.state.panno)

//       sessionStorage.setItem("itype", this.state.iname)
//       sessionStorage.setItem("istype", this.state.istype)
//       sessionStorage.setItem("Description", this.state.Description)
//       sessionStorage.setItem("semail", this.state.Semail)
//       sessionStorage.setItem("no_emp", this.state.No_of_Emp),
//         sessionStorage.setItem("psname", this.state.pstype)
//         sessionStorage.setItem("desgnation1", this.state.designation1)
//         sessionStorage.setItem("desgnation2", this.state.designation2)

//       this.setState({ redirectToBilling: true })
//     }
//   }

//   handleOpen = () => {
//     this.setState({ modalOpen: true })
//   }
//   handleClose = () => {
//     this.setState({
//       open: false,
//       isIndustry: false,
//       isSubIndustry: false,
//       ProducrService: false
//     })
//   }

//   handleSubmit = () => {
//     console.log(this.state.address)
//     console.log(this.state.CompanyName)
//     console.log(this.state.email)
//     console.log(this.state.phno)
//     console.log(this.state.type)
//   }

//   handleCname = e => {
//     this.setState({ cname: e.target.value })
//   }

//   handleMachnie = e => {
//     console.log("product Group", e.target.value)
//     this.setState({
//       Machnie: e.target.value
//       // checked: this.state.checked
//     })
//   }

//   handleSCname = e => {
//     this.setState({ cname2: e.target.value })
//   }

//   handlePan = e => {
//     this.setState({ panno: e.target.value })

//     // this.setState({ panno: e.target.value })
//     setTimeout(() => {
//       if (this.validatePan(this.state.panno)) {
//         this.setState({ panno: this.state.panno, panmsg: "" })
//       } else {
//         this.setState({ panmsg: "Please Enter Valid Pan no." })
//       }
//     }, 1000)
//   }

//   handleNoEmp = e => {
//     this.setState({ No_of_Emp: e.target.value })
//   }

//   handleDescription = e => {
//     this.setState({ Description: e.target.value })
//   }

//   addAssetType = () => {
//     this.setState({ isOpenAsset: true })
//   }

//   handleIndustryName = e => {
//     this.setState({ IndustryName: e.target.value })
//   }

//   handleSubIndustryName = e => {
//     this.setState({ SubIndustryName: e.target.value })
//   }

//   handleProductServiceName = e => {
//     this.setState({ ProducrServiceName: e.target.value })
//   }

//   handleSEmail = e => {
//     console.log("email", e.target.value)
//     this.setState({ Semail: e.target.value })

//     setTimeout(() => {
//       if (this.validateEmail(this.state.Semail)) {
//         this.setState({ Semail: this.state.Semail, SEmailMsg: "" })
//       } else {
//         this.setState({ SEmailMsg: "Please Enter Valid Email." })
//       }
//     }, 1000)
//   }

//   handleItype=e=>{
//     let industryId = e.target.value  
//     let id;
//     console.log('industryId', industryId);  
//     this.state.industryData.map(i=>{
//       if(i.name==industryId){
//         id=i.id
//       }
//     })
//     this.subIndustrylist(id)
//     this.setState({ iname: industryId })
//   }

//   handleStype = e => {
//     this.setState({ istype: e.target.value })
//   }

//   handlePStype = e => {
//     this.setState({ pstype: e.target.value })
//   }

//   handleDesignation=e=>{
//     this.setState({designation1:e.target.value})
//   }

//   designationhandle=e=>{
//     this.setState({designation2:e.target.value})
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
//       CompanyName,
//       phno,
//       owner,
//       type,
//       phno2,
//       cname,
//       cname2,
//       panno,
//       No_of_Emp,
//       Description,
//       isIndustry,
//       isSubIndustry,
//       IndustryName,
//       SubIndustryName,
//       ProducrService,
//       ProducrServiceName,
//       Semail,
//       industryData,
//       subindustryData,
//       iname,
//       istype,
//       psData,rating,designation1,designation2
//     } = this.state

//     console.log("invoices are", this.state.InvoiceList)
//     console.log("invoices  data are", this.state.InvoiceData)
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
//       <div style={{ backgroundColor: "#eee" }}>
//         <PageContainer2>
//           <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
//             <Link to="/ClientGodView">
//               <IconDiv>
//                 <Icon name="arrow left" />
//               </IconDiv>
//             </Link>
//             <HeadingDiv>
//               <HeadingText>Add New Client Here !</HeadingText>
//             </HeadingDiv>
//           </div>

//           <FormDiv>
//             <FormBorder>
//               <FormText>
//                 <Icon name="add user" size="huge" />
//                 <br />
//                <br/>
//                 <div>

// <StarRatingComponent 
//   name="rate1" 
//   starCount={5}
//   value={rating}
//   onStarClick={this.onStarClick.bind(this)}
//   className="dv-star-rating-input"
// />
// </div>
//                 <br />
//                 <div style={{ display: "flex" }}>
//                   {/* <Form.Group inline widths={3}>
//                     <input
//                       type="radio"
//                       id="radio1"
//                       name="radio1"
//                       value="New Lead"
//                       onChange={this.handleMachnie}
//                     />
//                     <label
//                       htmlFor="radio1"
//                       style={{ padding: "0px 8px 0px 8px" }}
//                     >
//                       New Lead
//                     </label> */}
//                      {/*
//                     <input
//                       type="radio"
//                       id="radio2"
//                       name="radio1"
//                       value="Asset owner"
//                       onChange={this.handleMachnie}
//                     />
//                     <label
//                       htmlFor="radio2"
//                       style={{ padding: "0px 8px 0px 8px" }}
//                     >
//                       Asset owner
//                     </label>
//                     <input
//                       type="radio"
//                       id="radio2"
//                       name="radio1"
//                       value="Product owner"
//                       onChange={this.handleMachnie}
//                     />
//                     <label
//                       htmlFor="radio2"
//                       style={{ padding: "0px 8px 0px 8px" }}
//                     >
//                       Product owner
//                     </label> */}
//                   {/* </Form.Group> */}
//                 </div>
//               </FormText>
//               <br />
//               <MainDiv>
//                 <Form1Div>
//                   <Form>
//                     <Form.Field label='Enter Company Name' 
//                     required/>
                      
//                       <Form.Input
//                         placeholder="Enter Company Name"
//                         type="text"
//                         value={CompanyName}
//                         onChange={this.handleCompany}
//                       />
                  
//                   <Form.Field label='E-mail ID :'required/>
                     
//                      <Form.Input
//                        placeholder="Enter E-mail ID"
//                        type="email"
//                        value={email}
//                        onChange={this.handleEmail}
//                        required
//                      />
                  
//                    <p>
//                      <font color="red">{this.state.EmailMsg}</font>
//                    </p>
                   
                  
//                     <Form.Field label='Primary Contact Person Name' required />
//                       <Form.Input
//                         placeholder="Primary Contact Person Name."
//                         value={cname}
//                         onChange={this.handleCname}
//                         required
//                       />


                   
                

//                     <Form.Field label='Secondary Contact Person Name.'  />
//                       <Form.Input
//                         placeholder="Secondary Contact Person Name."
//                         value={cname2}
//                         onChange={this.handleSCname}
                        
//                       />

//                          <Form.Field label='Primary Designation'  />
//                       <Form.Input
//                         placeholder="Designation."
//                         value={designation1}
//                         onChange={this.handleDesignation}
                        
//                       />


//                         <Form.Field label='Type Of Industry :'  />
                      
//                       <select value={iname} onChange={this.handleItype}>
//                       <option value="" disabled selected hidden>type of industry</option>
//                       <option></option>
//                         {industryData.map(i => (
//                           <option value={i.name} key={i.id}>
//                             {i.name}
//                           </option>
//                         ))}
//                       </select>
//                       <br />
                     

                     

                  

//                     <Form.Field label='Client Product/Service' />
                     
//                       <select
//                         value={this.state.pstype}
//                         onChange={this.handlePStype}
//                       >
//                         <option value="" disabled selected hidden>Select Client Product/Service</option>
//                         {psData.map(i => (
//                           <option value={i.name} key={i.id}>
//                             {i.name}
//                           </option>
//                         ))}
//                       </select>
//                       <br />
                     
//                     {/*
//                   <Form.Field>
//                       <Header as="h4">Type:</Header>
//                       <input
//                         type="text"
//                         placeholder="Type"
//                         value={type}
//                         onChange={this.handleType}
//                         required
//                       />
//                     </Form.Field>
// */}
//                   </Form>
//                 </Form1Div>

//                 <Form.Group widths="equal">
//                   <Button.Group />
//                 </Form.Group>

//                 <Form.Group widths="equal">
//                   <Button.Group />
//                 </Form.Group>

//                 <Form2Div>
//                   <Form>
//                     <Form.Field label='No. Of Employee :' />
                     
//                       <Form.Input
//                         placeholder="Enter No. Of Employee"
//                         type="text"
//                         value={No_of_Emp}
//                         onChange={this.handleNoEmp}
//                       />



//                        <Form.Field label='Pan No.'/>
                      
//                       <Form.Input
//                         placeholder="Enter Pan No. number"
//                         value={panno}
//                         onChange={this.handlePan}
//                         maxLength="10"
//                       />
//                       <p style={{ color: "red" }}>{this.state.panmsg}</p>

                 

//                     <Form.Field label='Primary Mobile number:' required/>
                     
//                       <Form.Input
//                         placeholder="Enter Primary Mobile number"
//                         value={phno}
//                         onChange={this.handlePhno}
//                          maxLength="10"
//                         required
//                       />
                  
//                     <Form.Field label='Secondary Mobile number:'/>
                     
//                       <Form.Input
//                         placeholder="Enter Secondary Mobile number"
//                         value={phno2}
//                         onChange={this.handlePhno2}
//                         maxLength="10"
//                         required
//                       />


//                          <Form.Field label='Secondary Designation'  />
//                       <Form.Input
//                         placeholder="Designation."
//                         value={designation2}
//                         onChange={this.designationhandle}
                        
//                       />
                  
                  
                

//                     <Form.Field label='Sub type of industry:' />
                   
//                       <select value={istype} onChange={this.handleStype}>
//                       <option value="" disabled selected hidden>Select Sub Type of Industry</option>
//                         {subindustryData.map(i => (
//                           <option value={i.name} key={i.id}>
//                             {i.name}
//                           </option>
//                         ))}
//                       </select>
//                       <br />
                     
                   
//                       <Form.Field label='Address' />

// <PlacesAutocomplete inputProps={inputProps} />


// <Form.Field label='Owner ship:' />

// <Form.Input
// type="text"
// placeholder="Owner ship"
// value={owner}
// onChange={this.handleOwner}
// required
// />

                  
                  
//                     <Form.Field label='Descripton :' />
                     
//                       <div className="space" />
//                       <TextArea
//                         value={Description}
//                         onChange={this.handleDescription}
//                       />
                   
//                   </Form>
//                 </Form2Div>
//               </MainDiv>
//             </FormBorder>

//             <IconDivShare>
//               <Icon
//                 name="share"
//                 size="big"
//                 onClick={() => this.handleTransmute()}
//               />
//               {this.state.redirectToBilling && <Redirect to="/BillingInfo" />}
//             </IconDivShare>
//           </FormDiv>
//         </PageContainer2>


//         <div>
//           <Modal
//             open={open}
//             onClose={this.handleClose}
//             className="alertOfFileds"
//             basic
//             size="small"
//           >
//             <Header icon="alert" content="Alert Messages" />
//             <Modal.Content>
//               <Header>
//                 <font color="#ffffff">{this.state.msg}</font>
//               </Header>
//             </Modal.Content>
//             <Modal.Actions>
//               <Button basic color="red" inverted>
//                 <Icon name="remove" onClick={() => this.handleClose()} /> No
//               </Button>
//             </Modal.Actions>
//           </Modal>
//         </div>
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

// export default Client
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
import Search from "semantic-ui-react/dist/commonjs/modules/Search/Search"
import Side from "../component/Sidenav"
import escapeRegExp from "escape-string-regexp"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"

import Select from "react-select"
import EditableDropDown from "../component/EditableDropDown"
import StarRatingComponent from 'react-star-rating-component';
import rawSpan from "../component/span";

import {
  industryAdd,
  industryList,
  industryDelete,
  SubIndustryadd,
  SubIndustrylist,
  addProductService,
  pslist,
  deletePS,
  industryBasedsubindustry
} from ".././component/Api"

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
  Form2Div
} from "../styledComps.js"

class Client extends Component {
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
    cname: "",
    Machnie: "",
    cname2: "",
    panno: "",
    panmsg: "",
    No_of_Emp: "",
    Description: "",
    isIndustry: false,
    isSubIndustry: false,
    IndustryName: "",
    SubIndustryName: "",
    ProducrService: false,
    ProducrServiceName: "",
    Semail: "",
    industryData: [],
    subindustryData: [],
    iname: "",
    istype: "",
    pstype: "",
    psData: [],
    rating:0,
    designation1:"",
    designation2:""
  }

  IndustryList = () => {
    fetch(industryList, {
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
        console.log("industry List ", data.records)
        if (data.records) {
          this.setState({ industryData: data.records })
        } else {
          console.log("No vertical")
          this.setState({ industryData: [] })
        }
      })
  }

  subIndustrylist = (id) => {
    fetch(industryBasedsubindustry, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        indid:id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Sub industry List ", data.records)
        if (data.records) {
          this.setState({ subindustryData: data.records,istype:'' })
        } else {
          console.log("No industry")
          this.setState({ subindustryData: [],istype:'' })
        }
      })
  }

  productServiceList = () => {
    fetch(pslist, {
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
        console.log("Product Service List ", data.records)
        if (data.records) {
          this.setState({ psData: data.records })
        } else {
          console.log("No Product Service")
          this.setState({ psData: [] })
        }
      })
  }

  componentDidMount() {
    this.IndustryList()

    this.subIndustrylist()

    this.productServiceList()
  }



  onStarClick=(nextValue, prevValue, name)=> {
    this.setState({rating: nextValue});
  }




  validateNumber = input => {
    if (input === "") {
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
  }

  validateEmail = email => {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return re.test(email)
  }

  validatePan = panno => {
    let re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
    return re.test(panno)
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
    console.log("email", e.target.value)
    this.setState({ email: e.target.value })

    setTimeout(() => {
      if (this.validateEmail(this.state.email)) {
        this.setState({ email: this.state.email, EmailMsg: "" })
      } else {
        this.setState({ EmailMsg: "Please Enter Valid Email." })
      }
    }, 1000)
  }

  handlePhno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ phno: e.target.value })
    } else {
      this.setState({ msg: "Not Valid no." })
    }
  }

  handlePhno2 = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ phno2: e.target.value })
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
    if (!this.state.CompanyName) {
      this.setState({ open: true, msg: "Please Enter Company Name" })
    }else if(this.state.email.length <=0){
      this.setState({ open: true, msg: "Please Enter Email Id." })
    } else if (!this.state.phno) {
      this.setState({ open: true, msg: "Please Enter Primary Contact No." })
    } else if (!this.state.cname) {
      this.setState({ open: true, msg: "Please Enter Primary Contact Person Name" })
    }else if(this.state.designation1.length <=0){

      this.setState({ open: true, msg: "Please Enter Primary Designation" })
    }else if(this.state.address.length <= 0){
      this.setState({ open: true, msg: "Please Enter Address" })

    }else{
    // } else if (!this.state.Machnie) {
    //   this.setState({ open: true, msg: "Please Select Type of Client" })
    // } else {
      sessionStorage.setItem("name", this.state.CompanyName)
      sessionStorage.setItem("email", this.state.email)
      sessionStorage.setItem("phno", this.state.phno)
      sessionStorage.setItem("phno2", this.state.phno2)
      sessionStorage.setItem("addr", this.state.address)
      sessionStorage.setItem("owner", this.state.owner)
      sessionStorage.setItem("owner", this.state.owner)
      sessionStorage.setItem("type", this.state.type)
      sessionStorage.setItem("star", this.state.rating)
      sessionStorage.setItem("cname", this.state.cname)
      sessionStorage.setItem("cname2", this.state.cname2)
      sessionStorage.setItem("type", this.state.Machnie)
      sessionStorage.setItem("pan", this.state.panno)

      sessionStorage.setItem("itype", this.state.iname)
      sessionStorage.setItem("istype", this.state.istype)
      sessionStorage.setItem("Description", this.state.Description)
      sessionStorage.setItem("semail", this.state.Semail)
      sessionStorage.setItem("no_emp", this.state.No_of_Emp),
        sessionStorage.setItem("psname", this.state.pstype)
        sessionStorage.setItem("desgnation1", this.state.designation1)
        sessionStorage.setItem("desgnation2", this.state.designation2)

      this.setState({ redirectToBilling: true })
    }
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }
  handleClose = () => {
    this.setState({
      open: false,
      isIndustry: false,
      isSubIndustry: false,
      ProducrService: false
    })
  }

  handleSubmit = () => {
    console.log(this.state.address)
    console.log(this.state.CompanyName)
    console.log(this.state.email)
    console.log(this.state.phno)
    console.log(this.state.type)
  }

  handleCname = e => {
    this.setState({ cname: e.target.value })
  }

  handleMachnie = e => {
    console.log("product Group", e.target.value)
    this.setState({
      Machnie: e.target.value
      // checked: this.state.checked
    })
  }

  handleSCname = e => {
    this.setState({ cname2: e.target.value })
  }

  handlePan = e => {
    this.setState({ panno: e.target.value })

    // this.setState({ panno: e.target.value })
    setTimeout(() => {
      if (this.validatePan(this.state.panno)) {
        this.setState({ panno: this.state.panno, panmsg: "" })
      } else {
        this.setState({ panmsg: "Please Enter Valid Pan no." })
      }
    }, 1000)
  }

  handleNoEmp = e => {
    this.setState({ No_of_Emp: e.target.value })
  }

  handleDescription = e => {
    this.setState({ Description: e.target.value })
  }

  addAssetType = () => {
    this.setState({ isOpenAsset: true })
  }

  handleIndustryName = e => {
    this.setState({ IndustryName: e.target.value })
  }

  handleSubIndustryName = e => {
    this.setState({ SubIndustryName: e.target.value })
  }

  handleProductServiceName = e => {
    this.setState({ ProducrServiceName: e.target.value })
  }

  handleSEmail = e => {
    console.log("email", e.target.value)
    this.setState({ Semail: e.target.value })

    setTimeout(() => {
      if (this.validateEmail(this.state.Semail)) {
        this.setState({ Semail: this.state.Semail, SEmailMsg: "" })
      } else {
        this.setState({ SEmailMsg: "Please Enter Valid Email." })
      }
    }, 1000)
  }

  handleItype=e=>{
    let industryId = e.target.value  
    let id;
    console.log('industryId', industryId);  
    this.state.industryData.map(i=>{
      if(i.name==industryId){
        id=i.id
      }
    })
    this.subIndustrylist(id)
    this.setState({ iname: industryId })
  }

  handleStype = e => {
    this.setState({ istype: e.target.value })
  }

  handlePStype = e => {
    this.setState({ pstype: e.target.value })
  }

  handleDesignation=e=>{
    this.setState({designation1:e.target.value})
  }

  designationhandle=e=>{
    this.setState({designation2:e.target.value})
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
      CompanyName,
      phno,
      owner,
      type,
      phno2,
      cname,
      cname2,
      panno,
      No_of_Emp,
      Description,
      isIndustry,
      isSubIndustry,
      IndustryName,
      SubIndustryName,
      ProducrService,
      ProducrServiceName,
      Semail,
      industryData,
      subindustryData,
      iname,
      istype,
      psData,rating,designation1,designation2
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
      <div style={{ backgroundColor: "#eee" }}>
        <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/ClientGodView">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Add New Client Here !</HeadingText>
            </HeadingDiv>
          </div>

          <FormDiv>
            <FormBorder>
              <FormText>
                <Icon name="add user" size="huge" />
                <br />
               <br/>
                <div>

<StarRatingComponent 
  name="rate1" 
  starCount={5}
  value={rating}
  onStarClick={this.onStarClick.bind(this)}
  className="dv-star-rating-input"
/>
</div>
                <br />
                <div style={{ display: "flex" }}>
                  {/* <Form.Group inline widths={3}>
                    <input
                      type="radio"
                      id="radio1"
                      name="radio1"
                      value="New Lead"
                      onChange={this.handleMachnie}
                    />
                    <label
                      htmlFor="radio1"
                      style={{ padding: "0px 8px 0px 8px" }}
                    >
                      New Lead
                    </label> */}
                     {/*
                    <input
                      type="radio"
                      id="radio2"
                      name="radio1"
                      value="Asset owner"
                      onChange={this.handleMachnie}
                    />
                    <label
                      htmlFor="radio2"
                      style={{ padding: "0px 8px 0px 8px" }}
                    >
                      Asset owner
                    </label>
                    <input
                      type="radio"
                      id="radio2"
                      name="radio1"
                      value="Product owner"
                      onChange={this.handleMachnie}
                    />
                    <label
                      htmlFor="radio2"
                      style={{ padding: "0px 8px 0px 8px" }}
                    >
                      Product owner
                    </label> */}
                  {/* </Form.Group> */}
                </div>
              </FormText>
              <br />
              <MainDiv>
                <Form1Div>
                  <Form
                    style={{ fontSize: "16px" }}              //Aishwarya
                  >
                    <Form.Field label='Enter Company Name:'
                      required />

                    <Form.Input
                      placeholder="Enter Company Name"
                      type="text"
                      value={CompanyName}
                      onChange={this.handleCompany}
                    />

                    <Form.Field label='E-mail ID :' required />

                    <Form.Input
                      placeholder="Enter E-mail ID"
                      type="email"
                      value={email}
                      onChange={this.handleEmail}
                      required
                    />

                    <p>
                      <font color="red">{this.state.EmailMsg}</font>
                    </p>


                    <Form.Field label='Primary Contact Person Name:' required />
                    <Form.Input
                      placeholder="Primary Contact Person Name."
                      value={cname}
                      onChange={this.handleCname}
                      required
                    />





                    <Form.Field label='Secondary Contact Person Name:' />
                    <Form.Input
                      placeholder="Secondary Contact Person Name."
                      value={cname2}
                      onChange={this.handleSCname}

                    />

                    <Form.Field label='Primary Designation:' required />
                    <Form.Input
                      placeholder="Designation."
                      value={designation1}
                      onChange={this.handleDesignation}
                      required
                    />


                    <Form.Field label='Type Of Industry :' />

                    <select value={iname} onChange={this.handleItype}>
                      <option value="" disabled selected hidden>type of industry</option>
                      <option></option>
                      {industryData.map(i => (
                        <option value={i.name} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <br />






                    <Form.Field label='Client Product/Service:' />

                    <select
                      value={this.state.pstype}
                      onChange={this.handlePStype}
                    >
                      <option value="" disabled selected hidden>Select Client Product/Service</option>
                      {psData.map(i => (
                        <option value={i.name} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <br />

                    {/*
                  <Form.Field>
                      <Header as="h4">Type:</Header>
                      <input
                        type="text"
                        placeholder="Type"
                        value={type}
                        onChange={this.handleType}
                        required
                      />
                    </Form.Field>
*/}
                  </Form>
                </Form1Div>

                <Form.Group widths="equal">
                  <Button.Group />
                </Form.Group>

                <Form.Group widths="equal">
                  <Button.Group />
                </Form.Group>

                <Form2Div>
                  <Form
                    style={{ fontSize: "16px" }}              //Aishwarya  
                  >
                    <Form.Field label='No. Of Employee :' />

                    <Form.Input
                      placeholder="Enter No. Of Employee"
                      type="text"
                      value={No_of_Emp}
                      onChange={this.handleNoEmp}
                    />



                    <Form.Field label='Pan No.:' />

                    <Form.Input
                      placeholder="Enter Pan No. number"
                      value={panno}
                      onChange={this.handlePan}
                      maxLength="10"
                    />
                    <p style={{ color: "red" }}>{this.state.panmsg}</p>



                    <Form.Field label='Primary Mobile number:' required />

                    <Form.Input
                      placeholder="Enter Primary Mobile number"
                      value={phno}
                      onChange={this.handlePhno}
                      maxLength="10"
                      required
                    />

                    <Form.Field label='Secondary Mobile number:' />

                    <Form.Input
                      placeholder="Enter Secondary Mobile number"
                      value={phno2}
                      onChange={this.handlePhno2}
                      maxLength="10"

                    />


                    <Form.Field label='Secondary Designation:' />
                    <Form.Input
                      placeholder="Designation."
                      value={designation2}
                      onChange={this.designationhandle}

                    />




                    <Form.Field label='Sub type of industry:' />

                    <select value={istype} onChange={this.handleStype}>
                      <option value="" disabled selected hidden>Select Sub Type of Industry</option>
                      {subindustryData.map(i => (
                        <option value={i.name} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <br />
                    <Form.Field label='Address:' required />
                    <PlacesAutocomplete inputProps={inputProps} />
                    <br />
                    <Form.Field label='Owner ship:' />
                    <Form.Input
                      type="text"
                      placeholder="Owner ship"
                      value={owner}
                      onChange={this.handleOwner}
                      required
                    />

                    <Form.Field label='Descripton :' />

                    <div className="space" />
                    <TextArea
                      value={Description}
                      onChange={this.handleDescription}
                    />

                  </Form>
                </Form2Div>
              </MainDiv>
            </FormBorder>

            <IconDivShare>
              <Icon
                name="share"
                size="big"
                onClick={() => this.handleTransmute()}
              />
              {this.state.redirectToBilling && <Redirect to="/BillingInfo" />}
            </IconDivShare>
          </FormDiv>
        </PageContainer2>


        <div>
          <Modal
            open={open}
            onClose={this.handleClose}
            className="alertOfFileds"
            basic
            size="small"
          >
            <Header icon="alert" content="Alert Messages" />
            <Modal.Content>
              <Header>
                <font color="#ffffff">{this.state.msg}</font>
              </Header>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color="red" inverted>
                <Icon name="remove" onClick={() => this.handleClose()} /> No
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
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

export default Client
