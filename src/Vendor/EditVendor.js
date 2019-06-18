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

// import escapeRegExp from "escape-string-regexp"
// import PlacesAutocomplete from "react-places-autocomplete"
// import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
// import StarRatingComponent from 'react-star-rating-component';

// import Side from "../component/Sidenav"
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
//   EditInfo,
//   Box,
//   Box2,
//   MainDiv2,
//   MainDivHolder
// } from "../styledComps.js"

// class EditVendor extends Component {
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
//     clientData: {},
//     Machnie: "",
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
//     cname2: "",
//     rating:0,
//     designation1:"",
//     designation2:"",
//     panno:""
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
//           let iid = ''
//           data.records.filter(i=>{
//             if(i.name == this.state.IndustryName){
//               iid = i.id
//               this.setState({IndustryName:i.name})
//             }
//           })
//           this.subIndustrylist(iid)     
//         } else {
//           console.log("No industry")
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
//           this.setState({ subindustryData: data.records })
//         } else {
//           console.log("No Subindustry")
//           this.setState({ subindustryData: [] })
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
//     console.log(
//       "data in session",
//       JSON.parse(sessionStorage.getItem("editTicket"))
//     )
//     let clientData = JSON.parse(sessionStorage.getItem("editTicket"))
//     if (!clientData) {
//       this.setState({ msg: "No Data Available" })
//     } else {

//       this.setState({
//         clientData: clientData,
//         CompanyName: clientData.vendor_name,
//         email: clientData.email,
//         phno: clientData.number,
//         phno2: clientData.number2,
//         address: clientData.address,
//         owner: clientData.owner,
//         type: clientData.type,
//         rating: clientData.star,
//         IndustryName: clientData.indType,
//         istype: clientData.indSubType,
//         Description: clientData.description,
//         No_of_Emp: clientData.noEmp,
//         cname: clientData.cname1,
//         cname2: clientData.cname2,
//         Machnie:clientData.type,  
//         designation1:clientData.Designation1,
//         designation2:clientData.Designation2,
//         panno:clientData.panNo,
//         pstype:clientData.ps
//       })


//       this.IndustryList()

//       this.subIndustrylist()
  
//       this.productServiceList()

//     }
   
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
//     } else if (!this.state.phno) {
//       this.setState({ open: true, msg: "Please Enter Primary Contact No." })
//     } else if (!this.state.cname) {
//       this.setState({ open: true, msg: "Please Enter Contact Person Name" })
//      //} 
//      //else if (!this.state.Machnie) {
//     //   this.setState({ open: true, msg: "Please Select Type of Vendor" })
//      } else if (this.state.address.length <= 0) {
//       this.setState({ open: true, msg: "Please Enter Address" })
//     } else {
//       sessionStorage.setItem("vendor_name", this.state.CompanyName)
//       sessionStorage.setItem("vendor_email", this.state.email)
//       sessionStorage.setItem("vendor_phno", this.state.phno)
//       sessionStorage.setItem("vendor_phno2", this.state.phno2)
//       sessionStorage.setItem("vendor_addr", this.state.address)
//       sessionStorage.setItem("vendor_owner", this.state.owner)
//       sessionStorage.setItem("owner", this.state.owner)
//       sessionStorage.setItem("vendor_type", this.state.type)
//       sessionStorage.setItem("vendor_star", this.state.rating)
//       sessionStorage.setItem("cname", this.state.cname)
//       sessionStorage.setItem("cname2", this.state.cname2)
//       sessionStorage.setItem("vendor_typeOfTransmute", this.state.Machnie)
//       sessionStorage.setItem("itype", this.state.IndustryName)
//       sessionStorage.setItem("istype", this.state.istype)
//       sessionStorage.setItem("Description", this.state.Description)
//       sessionStorage.setItem("semail", this.state.Semail)
//       sessionStorage.setItem("no_emp", this.state.No_of_Emp),
//       sessionStorage.setItem("psname", this.state.pstype),
//       sessionStorage.setItem("desgnation3", this.state.designation1)
//       sessionStorage.setItem("desgnation4", this.state.designation2)
//       sessionStorage.setItem("vendor_pan", this.state.panno)


//       this.setState({ redirectToBilling: true })
//     }
//   }

//   handleClose = () => {
//     this.setState({ open: false })
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

//   handleNoEmp = e => {
//     this.setState({ No_of_Emp: e.target.value })
//   }

//   handleDescription = e => {
//     this.setState({ Description: e.target.value })
//   }

//   handleIndustry = () => {
//     this.setState({ isIndustry: true })
//   }

//   handleSubIndustry = () => {
//     this.setState({ isSubIndustry: true })
//   }

//   handleProductService = () => {
//     this.setState({ ProducrService: true })
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

//   handleSubIndustryType = () => {
//     if (!this.state.SubIndustryName) {
//       this.setState({ msg: "Please Enter Industry Name" })
//     } else {
//       fetch(SubIndustryadd, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: this.state.SubIndustryName
//         })
//       })
//         .then(data => {
//           return data.json()
//         })
//         .then(data => {
//           console.log("data", data)
//           console.log("data", data.records)

//           if (data.message == "Industry Added") {
//             this.setState({ msg: data.message })
//             setTimeout(() => {
//               window.location.reload()
//             }, 1000)
//           } else {
//             console.log("Something went wrong !!!!!!!")
//           }
//         })
//     }
//   }

//   handleProductServiceName = e => {
//     this.setState({ ProducrServiceName: e.target.value })
//   }

//   handleSubIndustryType = () => {
//     if (!this.state.SubIndustryName) {
//       this.setState({ subIndustrymsg: "Please Enter Industry Name" })
//     } else {
//       fetch(SubIndustryadd, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: this.state.SubIndustryName
//         })
//       })
//         .then(data => {
//           return data.json()
//         })
//         .then(data => {
//           console.log("data", data)
//           console.log("data", data.records)

//           if (data.message == "Sub Industry Added") {
//             this.setState({ subIndustrymsg: data.message })
//             setTimeout(() => {
//               this.setState({ subIndustrymsg: "", isSubIndustry: false })
//             }, 1000)
//           } else {
//             console.log("Something went wrong !!!!!!!")
//           }
//         })
//     }
//   }

//   handleIndustryType = () => {
//     if (!this.state.IndustryName) {
//       this.setState({ industrymsg: "Please Enter Industry Name" })
//     } else {
//       fetch(industryAdd, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: this.state.IndustryName
//         })
//       })
//         .then(data => {
//           return data.json()
//         })
//         .then(data => {
//           console.log("data", data)
//           console.log("data", data.records)

//           if (data.message == "Industry Added") {
//             this.setState({ industrymsg: data.message })
//             setTimeout(() => {
//               this.setState({ isIndustry: false, industrymsg: "" })
//             }, 1000)
//           } else {
//             console.log("Something went wrong !!!!!!!")
//           }
//         })
//     }
//   }

//   addProductservice = () => {
//     if (!this.state.ProducrServiceName) {
//       this.setState({ psmsg: "Please Enter Product/Service" })
//     } else {
//     fetch(addProductService, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: this.state.ProducrServiceName
//       })
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         console.log("data", data)
//         if (data.message == "Product / Services  Added") {
//           this.setState({ psmsg: data.message })
//           setTimeout(() => {
//             this.setState({ ProducrService: false, psmsg: "" })
//           }, 1000)
//         } else {
//           console.log("Something went wrong !!!!!!!")
//         }
//       })
//   }
// }


//   handleSEmail = e => {
//     console.log("email", e.target.value)
//     this.setState({ Semail: e.target.value })

//     setTimeout(() => {
//       if (this.validateEmail(this.state.Semail)) {
//         this.setState({ Semail: this.state.Semail, EmailMsg: "" })
//       } else {
//         this.setState({ EmailMsg: "Please Enter Valid Email." })
//       }
//     }, 1000)
//   }

//   handleItype = e => {
//     let industryId = e.target.value  
//     console.log('industryId', industryId);  
//       let name;
//       let id;
//       console.log('industryId', industryId);  
//       this.state.industryData.map(i=>{
//         if(i.name==industryId){
//           id=i.id
//         }
//       })
//       this.subIndustrylist(id)
//     this.setState({IndustryName:name})
//     // this.setState({ iname: name })
//   }

 

//   handleStype = e => {
//     this.setState({ istype: e.target.value })
//   }

//   handleSCname = e => {
//     this.setState({ cname2: e.target.value })
//   }

//   handleDesignation=e=>{
//     this.setState({designation1:e.target.value})
//   }

//   designationhandle=e=>{
//     this.setState({designation2:e.target.value})
//   }

//   validatePan = panno => {
//     let re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
//     return re.test(panno)
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

  
//   handlePStype = e => {
//     this.setState({ pstype: e.target.value })
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
//       phno2,
//       CompanyName,
//       phno,
//       owner,
//       type,
//       cname,
//       clientData,
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
//       psData,
//       cname2,rating,designation1,designation2,panno
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
//       <div>
//         <PageContainer2>
//           <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
//             <Link to="/VendorView">
//               <IconDiv>
//                 <Icon name="arrow left" />
//               </IconDiv>
//             </Link>
//             <HeadingDiv>
//               <HeadingText>Update Vendor Here !</HeadingText>
//             </HeadingDiv>
//           </div>

//           <FormDiv>
//             <FormBorder>
//               <FormText>
//                 <Icon name="add user" size="huge" />
//                 <br />
//                 <br/>  
//                 <div>
// <StarRatingComponent 
//   name="rate1" 
//   starCount={5}
//   value={rating}
//   onStarClick={this.onStarClick.bind(this)}
// className="dv-star-rating-input"
// />
// </div>
// <br/>
//                 {/* <div style={{ display: "flex" }}>
//                   <Form.Group inline widths={3}>
//                     {clientData.type == "outstanding" ? (
//                       <label htmlFor="radio1">
//                         <input
//                           type="radio"
//                           id="radio1"
//                           name="radio1"
//                           value="outstanding"
//                           onChange={this.handleMachnie}
//                           defaultChecked
//                         />
//                         &nbsp;&nbsp; Outstanding
//                       </label>
//                     ) : (
//                       <label htmlFor="radio1">
//                         <input
//                           type="radio"
//                           id="radio1"
//                           name="radio1"
//                           value="outstanding"
//                           onChange={this.handleMachnie}
//                         />
//                         &nbsp;&nbsp; Outstanding
//                       </label>
//                     )}

//                     {clientData.type == "disburse" ? (
//                       <label htmlFor="radio2">
//                         <input
//                           type="radio"
//                           id="radio2"
//                           name="radio1"
//                           value="disburse"
//                           onChange={this.handleMachnie}
//                           defaultChecked
//                         />
//                         Disburse
//                       </label>
//                     ) : (
//                       <label htmlFor="radio2">
//                         <input
//                           type="radio"
//                           id="radio2"
//                           name="radio1"
//                           value="disburse"
//                           onChange={this.handleMachnie}
//                         />
//                         Disburse
//                       </label>
//                     )}
//                   </Form.Group> 
//                 </div>
//                 */}
//               </FormText>
//               <br />
//               <MainDiv>
//                 <Form1Div>
//                   <Form>
//                   <Form.Field label='Enter Company Name:' 
//                     required/>
                      
//                       <Form.Input
//                         placeholder="Enter Company Name"
//                         type="text"
//                         required
//                         value={CompanyName}
//                         onChange={this.handleCompany}

//                       />
                  

//    <Form.Field label='Primary E-mail ID :' />
                     
//                      <Form.Input
//                         placeholder="Enter E-mail ID:"
//                         type="email"
//                         value={email}
//                         onChange={this.handleEmail}
//                         required
//                       /> 
//                       <p>
//                       <font color="red">{this.state.EmailMsg}</font>
//                     </p>

//                  <Form.Field label='Primary Contact Person Name' required />
//                       <Form.Input
//                         placeholder="Contact Person No:"
//                         value={cname}
//                         onChange={this.handleCname}
//                         required
//                       />

//                          <Form.Field label='Secondary Contact Person Name:'  />
//                             <Form.Input
//                               placeholder="Contact Person No."
//                               value={cname2}
//                               onChange={this.handleSCname}
//                               required
//                             />



//                   <Form.Field label='Primary Designation:'  />
//                       <Form.Input
//                         placeholder="Designation."
//                         value={designation1}
//                         onChange={this.handleDesignation}
//                         required
//                       />
                  

//                   <Form.Field label='Type Of Industry :'  />
//                       {/* <Header as="h4">Type Of Industry :</Header> */}
//                       <select value={this.state.IndustryName} onChange={this.handleItype}>
//                         <option value="">type of industry</option>

//                         {industryData.map(i => (
//                           <option value={i.name} key={i.id}>
//                             {i.name}
//                           </option>
//                         ))}
//                       </select>
//                       <br />
                     
                
                        
                  
                    
                    
               

//                 <Form.Field label='Vendor Product/Service:' />
            
//                       <select
//                         value={this.state.pstype}
//                         onChange={this.handlePStype}
//                       >
//                         <option value="">Select Client Product/Service</option>
//                         {psData.map(i => (
//                           <option value={i.name} key={i.id}>
//                             {i.name}
//                           </option>
//                         ))}
//                       </select>
//                       <br />
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
//                     <Form.Field>
//                     <Form.Field label='No. Of Employee :' />
                     
//                      <Form.Input
//                         placeholder="Enter No. Of Employee"
//                         type="text"
//                         value={No_of_Emp}
//                         onChange={this.handleNoEmp}
//                       />


                      
//                      <Form.Field label='Pan No:' />
                      
//                       <Form.Input
//                         placeholder="Enter Pan No. number"
//                         value={panno}
//                         onChange={this.handlePan}
//                         maxLength="10"
//                       />
                 
//                     <p style={{ color: "red" }}>{this.state.panmsg}</p>

                 
                   

//                    <Form.Field label='Primary Mobile Number:' required/>
                     
//                      <Form.Input
//                         placeholder="Enter Mobile number"
//                         value={phno}
//                         onChange={this.handlePhno}
//                         maxLength="10"
//                         required
//                       />


              

//                       <Form.Field label='Secondary Mobile Number:'/>
                     
//                      <Form.Input
//                         placeholder="Enter Mobile number"
//                         value={phno2}
//                         onChange={this.handlePhno2}
//                         maxLength="10"
//                       />
//                     </Form.Field>


//                        <Form.Field label='Secondary Designation:'/>
//                       <Form.Input
//                         placeholder="Designation."
//                         value={designation2}
//                         onChange={this.designationhandle}
                        
//                       />
                   

                  

//                     <Form.Field label = 'Sub type of industry:'/>

//                       <select value={istype} onChange={this.handleStype}>
//                         <option value="">Select Sub Type of Industry</option>
//                         {subindustryData.map(i => (
//                           <option value={i.name} key={i.id}>
//                             {i.name}
//                           </option>
//                         ))}
//                       </select>
//                       <br />
                     

                   
//                    <Form.Field label = 'Address:' />
//                       <PlacesAutocomplete inputProps={inputProps} />
//                       <br />

                      
//                       <Form.Field label='Owner ship:' />
//                       {/* <Header as="h4">Owner ship:</Header> */}

//                       <input
//                         type="text"
//                         placeholder="Owner ship"
//                         value={owner}
//                         onChange={this.handleOwner}
                        
//                       />
                   
//                    <br />

//                    <Form.Field label='Descripton :' />
//                       {/* <Header as="h4">Descripton :</Header> */}
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
//               {this.state.redirectToBilling && (
//                 <Redirect to="/EditVendorBillingInfo" />
//               )}
//             </IconDivShare>
//           </FormDiv>
//         </PageContainer2>

//         <center>
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
//                 <font color="#fff">{this.state.msg}</font>
//               </Header>
//             </Modal.Content>
//             <Modal.Actions>
//               <Button basic color="red" inverted>
//                 <Icon name="remove" onClick={() => this.handleClose()} /> No
//               </Button>
//             </Modal.Actions>
//           </Modal>
//         </center>

//                <Modal
//           open={isIndustry}
//           onClose={this.handleClose}
//           className="alertOfFileds"
//           closeIcon
//         >
//           <Modal.Header>
//             <p>Add Industry</p>
//           </Modal.Header>
//           <Modal.Content>
//             <Form>
//               <Form.Group widths={1}>
//                 <Form.Input
//                   label="Add Industry "
//                   placeholder="Enter Industry "
//                   value={IndustryName}
//                   onChange={this.handleIndustryName}
//                   required
//                 />
//               </Form.Group>
//             </Form>
//             <p>
//               <font color="red">{this.state.industrymsg}</font>
//             </p>
//             <Button
//               style={{ backgroundColor: "#863577", color: "#ffffff" }}
//               onClick={() => this.handleIndustryType()}
//             >
//               Add Industry Type
//             </Button>
//           </Modal.Content>
//         </Modal>

//         <Modal
//           open={isSubIndustry}
//           onClose={this.handleClose}
//           className="alertOfFileds"
//           closeIcon
//         >
//           <Modal.Header>
//             <p>Add Sub Industry</p>
//           </Modal.Header>
//           <Modal.Content>
//             <Form>
//               <Form.Group widths={1}>
//                 <Form.Input
//                   label="Add Sub Industry "
//                   placeholder="Enter  Sub Industry "
//                   value={SubIndustryName}
//                   onChange={this.handleSubIndustryName}
//                   required
//                 />
//               </Form.Group>
//             </Form>
//             <p>
//               <font color="red">{this.state.subIndustrymsg}</font>
//             </p>
//             <Button
//               style={{ backgroundColor: "#863577", color: "#ffffff" }}
//               onClick={() => this.handleSubIndustryType()}
//             >
//               Add Sub Industry Type
//             </Button>
//           </Modal.Content>
//         </Modal>

//         <Modal
//           open={ProducrService}
//           onClose={this.handleClose}
//           className="alertOfFileds"
//           closeIcon
//         >
//           <Modal.Header>
//             <p>Add Product/Service</p>
//           </Modal.Header>
//           <Modal.Content>
//             <Form>
//               <Form.Group widths={1}>
//                 <Form.Input
//                   label="Add Product/Service "
//                   placeholder="Enter Product/Service Name "
//                   value={ProducrServiceName}
//                   onChange={this.handleProductServiceName}
//                   required
//                 />

               
//               </Form.Group>
//             </Form>
//             <p>
//               <font color="red">{this.state.psmsg}</font>
//             </p>
//             <Button
//               style={{ backgroundColor: "#863577", color: "#ffffff" }}
//               onClick={() => this.addProductservice()}
//             >
//               Add Product/Service
//             </Button>
//           </Modal.Content>
//         </Modal>
//       </div>
//     )
//   }
// }

// const logButton = {
//   // background: "transparent",
//   boxShadow: "0 0 0 1px #D7A01D inset",
//   padding: "16px 16%",
//   color: "#ffffff"
// }

// const formInput = {
//   boxShadow: "0 0 0 1px #ffffff inset",
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

// export default EditVendor
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
import StarRatingComponent from 'react-star-rating-component';

import Side from "../component/Sidenav"
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
  MainDivHolder
} from "../styledComps.js"

class EditVendor extends Component {
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
    clientData: {},
    Machnie: "",
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
    cname2: "",
    rating:0,
    designation1:"",
    designation2:"",
    panno:""
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
          let iid = ''
          data.records.filter(i=>{
            if(i.name == this.state.IndustryName){
              iid = i.id
              this.setState({IndustryName:i.name})
            }
          })
          this.subIndustrylist(iid)     
        } else {
          console.log("No industry")
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
          this.setState({ subindustryData: data.records })
        } else {
          console.log("No Subindustry")
          this.setState({ subindustryData: [] })
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
        IndustryName: clientData.indType,
        istype: clientData.indSubType,
        Description: clientData.description,
        No_of_Emp: clientData.noEmp,
        cname: clientData.cname1,
        cname2: clientData.cname2,
        Machnie:clientData.type,  
        designation1:clientData.Designation1,
        designation2:clientData.Designation2,
        panno:clientData.panNo,
        pstype:clientData.ps
      })


      this.IndustryList()

      this.subIndustrylist()
  
      this.productServiceList()

    }
   
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
    } else if (!this.state.phno) {
      this.setState({ open: true, msg: "Please Enter Primary Contact No." })
    } else if (!this.state.cname) {
      this.setState({ open: true, msg: "Please Enter Contact Person Name" })
     //} 
     //else if (!this.state.Machnie) {
    //   this.setState({ open: true, msg: "Please Select Type of Vendor" })
     } else if (this.state.address.length <= 0) {
      this.setState({ open: true, msg: "Please Enter Address" })
    } else {
      sessionStorage.setItem("vendor_name", this.state.CompanyName)
      sessionStorage.setItem("vendor_email", this.state.email)
      sessionStorage.setItem("vendor_phno", this.state.phno)
      sessionStorage.setItem("vendor_phno2", this.state.phno2)
      sessionStorage.setItem("vendor_addr", this.state.address)
      sessionStorage.setItem("vendor_owner", this.state.owner)
      sessionStorage.setItem("owner", this.state.owner)
      sessionStorage.setItem("vendor_type", this.state.type)
      sessionStorage.setItem("vendor_star", this.state.rating)
      sessionStorage.setItem("cname", this.state.cname)
      sessionStorage.setItem("cname2", this.state.cname2)
      sessionStorage.setItem("vendor_typeOfTransmute", this.state.Machnie)
      sessionStorage.setItem("itype", this.state.IndustryName)
      sessionStorage.setItem("istype", this.state.istype)
      sessionStorage.setItem("Description", this.state.Description)
      sessionStorage.setItem("semail", this.state.Semail)
      sessionStorage.setItem("no_emp", this.state.No_of_Emp),
      sessionStorage.setItem("psname", this.state.pstype),
      sessionStorage.setItem("desgnation3", this.state.designation1)
      sessionStorage.setItem("desgnation4", this.state.designation2)
      sessionStorage.setItem("vendor_pan", this.state.panno)


      this.setState({ redirectToBilling: true })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
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

  handleNoEmp = e => {
    this.setState({ No_of_Emp: e.target.value })
  }

  handleDescription = e => {
    this.setState({ Description: e.target.value })
  }

  handleIndustry = () => {
    this.setState({ isIndustry: true })
  }

  handleSubIndustry = () => {
    this.setState({ isSubIndustry: true })
  }

  handleProductService = () => {
    this.setState({ ProducrService: true })
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

  handleSubIndustryType = () => {
    if (!this.state.SubIndustryName) {
      this.setState({ msg: "Please Enter Industry Name" })
    } else {
      fetch(SubIndustryadd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.SubIndustryName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)

          if (data.message == "Industry Added") {
            this.setState({ msg: data.message })
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } else {
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleProductServiceName = e => {
    this.setState({ ProducrServiceName: e.target.value })
  }

  handleSubIndustryType = () => {
    if (!this.state.SubIndustryName) {
      this.setState({ subIndustrymsg: "Please Enter Industry Name" })
    } else {
      fetch(SubIndustryadd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.SubIndustryName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)

          if (data.message == "Sub Industry Added") {
            this.setState({ subIndustrymsg: data.message })
            setTimeout(() => {
              this.setState({ subIndustrymsg: "", isSubIndustry: false })
            }, 1000)
          } else {
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleIndustryType = () => {
    if (!this.state.IndustryName) {
      this.setState({ industrymsg: "Please Enter Industry Name" })
    } else {
      fetch(industryAdd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.IndustryName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)

          if (data.message == "Industry Added") {
            this.setState({ industrymsg: data.message })
            setTimeout(() => {
              this.setState({ isIndustry: false, industrymsg: "" })
            }, 1000)
          } else {
            console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  addProductservice = () => {
    if (!this.state.ProducrServiceName) {
      this.setState({ psmsg: "Please Enter Product/Service" })
    } else {
    fetch(addProductService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.ProducrServiceName
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        if (data.message == "Product / Services  Added") {
          this.setState({ psmsg: data.message })
          setTimeout(() => {
            this.setState({ ProducrService: false, psmsg: "" })
          }, 1000)
        } else {
          console.log("Something went wrong !!!!!!!")
        }
      })
  }
}


  handleSEmail = e => {
    console.log("email", e.target.value)
    this.setState({ Semail: e.target.value })

    setTimeout(() => {
      if (this.validateEmail(this.state.Semail)) {
        this.setState({ Semail: this.state.Semail, EmailMsg: "" })
      } else {
        this.setState({ EmailMsg: "Please Enter Valid Email." })
      }
    }, 1000)
  }

  handleItype = e => {
    let industryId = e.target.value  
    console.log('industryId', industryId);  
      let name;
      let id;
      console.log('industryId', industryId);  
      this.state.industryData.map(i=>{
        if(i.name==industryId){
          id=i.id
        }
      })
      this.subIndustrylist(id)
    this.setState({IndustryName:name})
    // this.setState({ iname: name })
  }

 

  handleStype = e => {
    this.setState({ istype: e.target.value })
  }

  handleSCname = e => {
    this.setState({ cname2: e.target.value })
  }

  handleDesignation=e=>{
    this.setState({designation1:e.target.value})
  }

  designationhandle=e=>{
    this.setState({designation2:e.target.value})
  }

  validatePan = panno => {
    let re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
    return re.test(panno)
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

  
  handlePStype = e => {
    this.setState({ pstype: e.target.value })
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
      cname,
      clientData,
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
      psData,
      cname2,rating,designation1,designation2,panno
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
            <Link to="/VendorView">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Vendor Here !</HeadingText>
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
<br/>
                {/* <div style={{ display: "flex" }}>
                  <Form.Group inline widths={3}>
                    {clientData.type == "outstanding" ? (
                      <label htmlFor="radio1">
                        <input
                          type="radio"
                          id="radio1"
                          name="radio1"
                          value="outstanding"
                          onChange={this.handleMachnie}
                          defaultChecked
                        />
                        &nbsp;&nbsp; Outstanding
                      </label>
                    ) : (
                      <label htmlFor="radio1">
                        <input
                          type="radio"
                          id="radio1"
                          name="radio1"
                          value="outstanding"
                          onChange={this.handleMachnie}
                        />
                        &nbsp;&nbsp; Outstanding
                      </label>
                    )}

                    {clientData.type == "disburse" ? (
                      <label htmlFor="radio2">
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value="disburse"
                          onChange={this.handleMachnie}
                          defaultChecked
                        />
                        Disburse
                      </label>
                    ) : (
                      <label htmlFor="radio2">
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value="disburse"
                          onChange={this.handleMachnie}
                        />
                        Disburse
                      </label>
                    )}
                  </Form.Group> 
                </div>
                */}
              </FormText>
              <br />
              <MainDiv>
                <Form1Div>
                  <Form
                    style={{ fontSize: "16px" }}    //Aishwarya    
                  >
                    <Form.Field label='Enter Company Name'
                      required />

                    <Form.Input
                      placeholder="Enter Company Name"
                      type="text"
                      required
                      value={CompanyName}
                      onChange={this.handleCompany}

                    />


                    <Form.Field label='Primary E-mail ID :' />

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

                    <Form.Field label='Primary Contact Person Name' required />
                    <Form.Input
                      placeholder="Contact Person No."
                      value={cname}
                      onChange={this.handleCname}
                      required
                    />

                    <Form.Field label='Secondary Contact Person Name.' />
                    <Form.Input
                      placeholder="Contact Person No."
                      value={cname2}
                      onChange={this.handleSCname}
                      required
                    />



                    <Form.Field label='Primary Designation' required />      {/*Aishwarya*/}
                    <Form.Input
                      placeholder="Designation."
                      value={designation1}
                      onChange={this.handleDesignation}
                      required
                    />


                    <Form.Field label='Type Of Industry :' />             {/*Aishwarya*/}
                    {/*<Header as="h4">Type Of Industry :</Header>*/}
                    <select value={this.state.IndustryName} onChange={this.handleItype}>
                      <option value="">type of industry</option>

                      {industryData.map(i => (
                        <option value={i.name} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <br />
                    <Form.Field label='Vendor Product/Service' />

                    <select
                      value={this.state.pstype}
                      onChange={this.handlePStype}
                    >
                      <option value="">Select Client Product/Service</option>
                      {psData.map(i => (
                        <option value={i.name} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <br />
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
                    style={{ fontSize: "16px" }}    //Aishwarya      
                  >
                    <Form.Field>
                      <Form.Field label='No. Of Employee :' />

                      <Form.Input
                        placeholder="Enter No. Of Employee"
                        type="text"
                        value={No_of_Emp}
                        onChange={this.handleNoEmp}
                      />



                      <Form.Field label='Pan No.' />

                      <Form.Input
                        placeholder="Enter Pan No. number"
                        value={panno}
                        onChange={this.handlePan}
                        maxLength="10"
                      />

                      <p style={{ color: "red" }}>{this.state.panmsg}</p>




                      <Form.Field label='Primary Mobile Number:' required />

                      <Form.Input
                        placeholder="Enter Mobile number"
                        value={phno}
                        onChange={this.handlePhno}
                        maxLength="10"
                        required
                      />




                      <Form.Field label='Secondary Mobile Number:' />

                      <Form.Input
                        placeholder="Enter Mobile number"
                        value={phno2}
                        onChange={this.handlePhno2}
                        maxLength="10"
                      />
                    </Form.Field>


                    <Form.Field label='Secondary Designation' />
                    <Form.Input
                      placeholder="Designation."
                      value={designation2}
                      onChange={this.designationhandle}

                    />




                    <Form.Field label='Sub type of industry' />

                    <select value={istype} onChange={this.handleStype}>
                      <option value="">Select Sub Type of Industry</option>
                      {subindustryData.map(i => (
                        <option value={i.name} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <br />



                    <Form.Field label='Address' />
                    <PlacesAutocomplete inputProps={inputProps} />
                    <br />
                    <Form.Field label='Owner ship:' />                              {/*Aishwarya*/}
                    {/* <Header as="h4">Owner ship:</Header>*/}

                    <input
                      type="text"
                      placeholder="Owner ship"
                      value={owner}
                      onChange={this.handleOwner}

                    />
                    <br />
                    <br />
                    <Form.Field label='Description:' />                              {/*Aishwarya*/}
                    {/* <Header as="h4">Owner ship:</Header>*/}
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
              {this.state.redirectToBilling && (
                <Redirect to="/EditVendorBillingInfo" />
              )}
            </IconDivShare>
          </FormDiv>
        </PageContainer2>

        <center>
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
                <font color="#fff">{this.state.msg}</font>
              </Header>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color="red" inverted>
                <Icon name="remove" onClick={() => this.handleClose()} /> No
              </Button>
            </Modal.Actions>
          </Modal>
        </center>

        <Modal
          open={isIndustry}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Industry</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Industry "
                  placeholder="Enter Industry "
                  value={IndustryName}
                  onChange={this.handleIndustryName}
                  required
                />
              </Form.Group>
            </Form>
            <p>
              <font color="red">{this.state.industrymsg}</font>
            </p>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleIndustryType()}
            >
              Add Industry Type
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={isSubIndustry}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Sub Industry</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Sub Industry "
                  placeholder="Enter  Sub Industry "
                  value={SubIndustryName}
                  onChange={this.handleSubIndustryName}
                  required
                />
              </Form.Group>
            </Form>
            <p>
              <font color="red">{this.state.subIndustrymsg}</font>
            </p>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubIndustryType()}
            >
              Add Sub Industry Type
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={ProducrService}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Product/Service</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Product/Service "
                  placeholder="Enter Product/Service Name "
                  value={ProducrServiceName}
                  onChange={this.handleProductServiceName}
                  required
                />


              </Form.Group>
            </Form>
            <p>
              <font color="red">{this.state.psmsg}</font>
            </p>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addProductservice()}
            >
              Add Product/Service
            </Button>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const logButton = {
  // background: "transparent",
  boxShadow: "0 0 0 1px #D7A01D inset",
  padding: "16px 16%",
  color: "#ffffff"
}

const formInput = {
  boxShadow: "0 0 0 1px #ffffff inset",
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

export default EditVendor
