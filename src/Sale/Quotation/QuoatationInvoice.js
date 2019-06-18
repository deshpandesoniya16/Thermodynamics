import React, { Component } from 'react';
import '../../App.css';
//import '../../dashboard';
import 'semantic-ui-css/semantic.min.css';
import { Button,Search,Container,List,Header,Responsive,Rating,Modal,Form ,Input, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
import {Route,Redirect,Switch,Link} from "react-router-dom"
import Side from "../../component/Sidenav"
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker.css"
//import moment from "moment"
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
import {clientList} from "../../component/Api"
import _ from "lodash"
import {btnclr} from '../../InvoiceCss'
import  ErrorModal from "../../component/ErrorModal"
import './invoice.css';


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
} from "../../styledComps.js"



class QuoatationInvoice extends Component {

  state = { 
    menuVisible: false,
    startdate:"",
    dataList:[],
    date:"",
    msg:"",
    size:"",
    open:false,
    query:"",

  open1:false,
  clientData:[],
  SelectedTicket:{},
  rejected1:0,
  OnHold1:0,
  Closed1:0,
  UnderProgress1:0,
  clientBackupData:[],
  listData:[],
  flag:false,
  upFile:"",
  value:"",
  isLoading:false,
  results:[],
  SelectedResult:[],

  billaddr:"",
  shipaddr:"",
  isopen:false
   }  

   handleClick=event=> {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }


  getclientList = ()=>{

    fetch(clientList, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      
      })
  }).then(data => {
      return data.json();
  }).then(data => {
       console.log("data",data)
       console.log("client data",data.records)
       if(data.records){
         this.setState({clientData:data.records})

       }else{
         console.log("No Client")
         this.setState({clientData:[]})
       }
  })
  }

  
   
componentDidMount(){
  
  this.getclientList();
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
    console.log("Selected",this.state.SelectedResult)
    if (this.state.SelectedResult) {
      this.setState({
        Name: this.state.SelectedResult.company_name,
        Phno: this.state.SelectedResult.number,
        Address: this.state.SelectedResult.address,
        rating: this.state.SelectedResult.star,
        owner :this.state.SelectedResult.owner
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

handleClose=()=>{
  this.setState({isopen:false})
}
  

handleBilladdr=e=>{
  console.log("bill addr is",e.target.value)
  this.setState({billaddr:e.target.value})
}

handleShipaddr=e=>{
  console.log("ship addr is",e.target.value)
  this.setState({shipaddr:e.target.value})
}

handleBill = () =>{

  if(this.state.billaddr.length <= 0){
    this.setState({msg:"Please Select One Bill Address",isopen:true})
  }else if(this.state.shipaddr.length <= 0){
    this.setState({msg:"Please Select One Ship Address",isopen:true})
  }else{
    sessionStorage.setItem("client",JSON.stringify(this.state.SelectedResult))
    sessionStorage.setItem("checkEntry", "firstEnrty");
    sessionStorage.setItem("Billaddr",this.state.billaddr)
    sessionStorage.setItem("Shipaddr",this.state.shipaddr)
  this.setState({redirectToBill : true})
}
}


  render() {
    let { 
        startdate,
        dataList,
        msg,
        size,
        open,
        query,
        TixyData,
        currentPage,
        todosPerPage,
        open1,
        size1,
        clientData,
        rejected1,
        OnHold1,
        Closed1,
        UnderProgress1,
      listData,
      flag, 
      value,
      isLoading,
      results,
      SelectedResult,isopen
    } = this.state

    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), "i")
      clientData = clientData.filter(i => match.test(i.company_name))
    } else if (!clientData) {
      console.log("No data")
    } else {
      const match = new RegExp(escapeRegExp(query), "i")
      clientData = clientData.filter(i => match.test(i.id))
      clientData = clientData
    }

 

    return (
    
        <div>

           <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/QuotationGodView">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Add Quoatation</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Company Details</label>
                <hr />
                <Search
                  loading={isLoading}
                  placeholderText="Select Client"
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  resultRenderer={resultRenderer}
                  aligned="center"
                  {...this.props}
                />
                <hr />
                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Comapny Name :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.company_name}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Email :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.email}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Primary Conatct Name :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.cname1}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Primary Contact Number :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.number}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Secondary Contact Name :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.cname2}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Secondary Contact Number :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.number2}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  
                  <MainDiv2>
                    <Box>
                      <span>Address :</span>
                    </Box>`
                    <Box2>
                      <span>{SelectedResult.address}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  
                </MainDivHolder>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Owner Details</label>
                <hr />
                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Owner Name :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.owner}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Lead Owner Name :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.leadType}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Pan Number :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.panno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>GST Number :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.gstnno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Type :</span>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.type}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                </MainDivHolder>
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Billing Information</label>
                <hr />
                <MainDivHolder>
                  
{SelectedResult.bAddress1 === "undefined" ?(
  <p>

  </p>):(
  
                  <div>
                  <MainDiv2>
                  
                  
                    <Box>
                      <input
                        type="radio"
                        id="billaddr"
                        name="billaddr"
                        value={SelectedResult.bAddress1}
                        onChange={this.handleBilladdr}
                      />
                      <label htmlFor="billaddr">
                        <b>Bill Address 1 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.bAddress1}</span>
                    </Box2>
               
                  </MainDiv2>
                  <br />
                  </div>
 )}

                 
{SelectedResult.bAddress1 === undefined ?(
  <p>

  </p>):(
  
                  <div>
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="billaddr"
                        name="billaddr"
                        value={SelectedResult.bAddress2}
                        onChange={this.handleBilladdr}
                      />&nbsp;&nbsp;
                      <label htmlFor="billaddr">
                        <b>Bill Address 2 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.bAddress2}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  </div>
  )}
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="billaddr"
                        name="billaddr"
                        value={SelectedResult.bAddress3}
                        onChange={this.handleBilladdr}
                      />&nbsp;&nbsp;
                      <label htmlFor="billaddr">
                        <b>Bill Address 3 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.bAddress3}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="billaddr"
                        name="billaddr"
                        value={SelectedResult.bAddress4}
                        onChange={this.handleBilladdr}
                      />&nbsp;&nbsp;
                      <label htmlFor="billaddr">
                        <b>Bill Address 4 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.bAddress4}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="billaddr"
                        name="billaddr"
                        value={SelectedResult.bAddress5}
                        onChange={this.handleBilladdr}
                      />&nbsp;&nbsp;
                      <label htmlFor="billaddr">
                        <b>Bill Address 5 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.bAddress5}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                </MainDivHolder>
              </Segment>
            </TixyContent>

            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Shipping Information</label>
                <hr />
                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="Shipaddr"
                        name="Shipaddr"
                        value={SelectedResult.sAddress1}
                        onChange={this.handleShipaddr}
                      />&nbsp;&nbsp;
                      <label htmlFor="billaddr">
                        <b>Shipping Address 1 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.sAddress1}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="Shipaddr"
                        name="Shipaddr"
                        value={SelectedResult.sAddress2}
                        onChange={this.handleShipaddr}
                      />&nbsp;&nbsp;
                      <label htmlFor="billaddr">
                        <b>Shipping Address 2 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.sAddress2}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="Shipaddr"
                        name="Shipaddr"
                        value={SelectedResult.sAddress3}
                        onChange={this.handleShipaddr}
                      />
                      <label htmlFor="billaddr">
                        <b>Shipping Address 3 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.sAddress3}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="Shipaddr"
                        name="Shipaddr"
                        value={SelectedResult.sAddress4}
                        onChange={this.handleShipaddr}
                      />
                      <label htmlFor="billaddr">
                        <b>Shipping Address 4 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.sAddress4}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <input
                        type="radio"
                        id="Shipaddr"
                        name="Shipaddr"
                        value={SelectedResult.sAddress5}
                        onChange={this.handleShipaddr}
                      />&nbsp;&nbsp;
                      <label htmlFor="billaddr">
                        <b>Shipping Address 5 : </b>
                      </label>
                    </Box>
                    <Box2>
                      <span>{SelectedResult.sAddress5}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                </MainDivHolder>
              </Segment>
            </TixyContent>
          </ContentArea>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>

            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleBill()}
            >
              Procedd to Billing
            </Button>
          </ContentArea>

          {this.state.redirectToBill && <Redirect to="/QuoatationBill" />}
        </PageContainer2>



                 {isopen == true ?(
          <ErrorModal isopen={this.state.isopen} msg={this.state.msg} onClose={this.handleClose}/>
        ):(
          <div>
          </div>
        )}

      </div>
    );
  }
}

const resultRenderer = ({ company_name, number }) => (
  <center>
    <span>
    <Header as="h4">{company_name}</Header>
    <p>{number}</p>
  </span>
  </center>
)

const tableStyle = {
  //  backgroundColor: "#111111" ,
    width:'50em',
    borderBottom:"1px solid #863577",
  //  color:"#D7A01D",
    fontSize:"16px",
    fontWeight:"400"
}

const tableRow = {
  //  color:"#ffffff"
}

const formInput = {
    background: "transparent",
    boxShadow: "0 0 0 1px #ffffff inset",
    color:"#ffffff",
    padding:"14px",
    width:"20em"
  }




export default QuoatationInvoice;
