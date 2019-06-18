import React, { Component } from 'react';
import '../../App.css';
//import '../../dashboard';
import 'semantic-ui-css/semantic.min.css';
import { Button,Search,Container,List,Dimmer,Loader,Header,Responsive,Rating,Modal,Form ,Input, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
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

import {
  PageContainer,
  IconDiv,
  HeadingDiv,
  HeadingText,
  ContentArea,
  GraphDiv,
  TableDiv,
  TableContent,
  NewLeadDiv,
  AssetDiv,
  ProductDiv,
  SubHeadingText,
  TixyContent,
  PageContainer2,
  Box,
  Box2,
  MainDiv2,
  MainDivHolder
} from "../../styledComps.js"

class QuoatationCart extends Component {

  state = {
    clientData:{},
    AssetCart:[],
    SelectedAsset:[],
    modalOpen:false,
    discountData:{},
    size:"",
    discountRS:0,
    disrs:0,
    totalAmount:0,
    Disprice:0,
    rdData:{},
    RD:false,
    rdisrs:0,
    RDisprice:0,
    totalAmountWithoutDis:0
  }

  componentDidMount(){


  let clientInfo =JSON.parse(sessionStorage.getItem("client"))

  this.setState({clientData:clientInfo})
  let assetobj = JSON.parse(sessionStorage.getItem("assetArray"))
  console.log("asserData",assetobj)
  this.setState({AssetCart:assetobj})

  let tempArr = [];
  setTimeout(() => {
    this.setState({ loading: false });
    this.state.AssetCart.map(i => {
      if (i.TaxableValue && i.qty) {
        tempArr.push(i);
        this.setState({ SelectedAsset: tempArr });
      }
    });
   // sessionStorage.setItem("AssetCart", JSON.stringify(this.state.SelectedAsset))
  }, 1000);



  }  
  


  validateNumber = input => {
    if (input === "") {
      return true;
    }
    let pattern = /^\d+(\.\d{1,2})?$/;
    return pattern.test(input);
  };


  show = (size, item) => {
    this.setState({ size, modalOpen: true,discountData:{} });
    console.log("id of data is", item);
    this.setState({ discountData: item });
  };
            
  handleNext =() =>{
    sessionStorage.setItem("AssetCart", JSON.stringify(this.state.SelectedAsset))
    this.setState({redirectToNext:true})
            }

//       addDiscoint = (i) =>{
// console.log("data in dis",i)
// this.setState({modalOpen:true,discountData:i})
//       }

handleCloseDis = () =>{
this.setState({modalOpen:false,RD:false})
}


handleDisRs = e => {
if (this.validateNumber(e.target.value)) {
  this.setState({ disrs: e.target.value });

  console.log("Discounted price is ", e.target.value);
}

let discvalue = e.target.value
if(discvalue > 0 ){

let discPercent = discvalue / 100

// console.log("after discount percent",discPercent)

let discontedPrice = this.state.discountData.unitPrice - (this.state.discountData.unitPrice*discPercent)

console.log("discount in percent is",discontedPrice)


// let Disprice
// console.log("Dis price", Disprice);
 let totalAmount = discontedPrice * this.state.discountData.qty;
 console.log("total Amt", totalAmount);
let totalDiscount = discontedPrice*this.state.discountData.qty
  this.setState({ disrs:discvalue });
  this.setState({ Disprice: totalDiscount });
  this.setState({ totalAmount: Math.floor(totalAmount).toFixed(2) });
}else{

  discvalue=0
  let discPercent = discvalue / 100
  // console.log("after discount percent",discPercent)
  let discontedPrice = this.state.discountData.unitPrice - (this.state.discountData.unitPrice*discPercent)
  

  
  console.log("discount in percent is",discontedPrice)
  // let Disprice
  // console.log("Dis price", Disprice);
   let totalAmount = discontedPrice * this.state.discountData.qty;
   console.log("total Amt", totalAmount);
  let totalDiscount = discontedPrice*this.state.discountData.qty
  this.setState({disrs:discvalue});
   this.setState({Disprice: 0 });
   this.setState({totalAmount: Math.floor(totalAmount).toFixed(2) });
}
};

handleDiscount = () =>{
this.state.discountData['discount'] = this.state.disrs
this.state.discountData['discountPrice'] = this.state.Disprice
this.state.discountData['TaxableValue'] = this.state.totalAmount

console.log("after add discount",this.state.discountData)
this.setState({  disrs:"",modalOpen:false})

}


//Remove DisCount

removeDiscount = (size, item) => {

console.log("Remove is Called",item)
this.state.totalAmountWithoutDis = parseInt(item.unitPrice) * parseInt(item.qty)
console.log("after remove discount",this.state.totalAmountWithoutDis)
this.state.discountData['TaxableValue']=this.state.totalAmountWithoutDis
this.state.discountData['discount'] = 0
this.state.discountData['discountPrice'] = 0
this.setState({ })

}



  render(){


    const{
      clientData,
      AssetCart,
      SelectedAsset,
      modalOpen,size,discountData,discountRS,
      totalAmount,Disprice,disrs,

      rdData,
      RD,rdisrs,
      RDisprice,
      totalAmountWithoutDis
    }=this.state

   // console.log("SelectedAsset is",SelectedAsset)

      return(
          <div>


<PageContainer2 style={{ height: "100vh" }}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/QuoatationBill">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Cart</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea style={{ justifyContent: "center" }}>
            <div style={{ width: "100vh" }}>
              <div
                style={{
                  border: "1px solid #863577",
                  backgroundColor: "#863577",
                  height: "50px"
                }}
              >
                <font
                  style={{
                    color: "white",
                    fontSize: "17px "
                  }}
                  className="Cart-for"
                >
                  Here are order details
                </font>
              </div>

              <Form>
                <Form.Group style={{ marginLeft: "87px", marginTop: "16px" }}>
                  <label>Name : {clientData.company_name}</label>

                  <span style={{ marginLeft: "10px" }}>
                    <font color="white" />
                  </span>
                </Form.Group>
                <Form.Group style={{ marginLeft: "87px" }}>
                  <label>Mobile No : {clientData.number}</label>
                  <span style={{ marginLeft: "10px" }}>
                    <font color="white" />
                  </span>
                </Form.Group>
                <Form.Group
                  style={{ marginLeft: "87px", marginBottom: "17px" }}
                >
                  <label>Mail ID : {clientData.email}</label>
                  <span style={{ marginLeft: "10px" }}>
                    <font color="white" />
                  </span>
                </Form.Group>
              </Form>
              <Table striped selectable celled className="table_structure">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell style={tableStyle}>
                      Asset Name
                    </Table.HeaderCell>
                    <Table.HeaderCell style={tableStyle}>
                      Asset Qty
                    </Table.HeaderCell>
                    <Table.HeaderCell style={tableStyle}>
                      Total Price
                    </Table.HeaderCell>
                    <Table.HeaderCell style={tableStyle}>
                      Action
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {SelectedAsset.map(i => (
                    <Table.Row key={i.id}>
                      <Table.Cell className="table_border" style={tableRow}>
                        {i.name}
                      </Table.Cell>
                      <Table.Cell className="table_border" style={tableRow}>
                        {i.qty}
                      </Table.Cell>
                      <Table.Cell className="table_border" style={tableRow}>
                        {i.TaxableValue}
                      </Table.Cell>
                      <Table.Cell className="table_border" style={tableRow}>
                        <Button.Group>
                          <Button
                            style={btnclr}
                            onClick={() => this.show("small", i)}
                          >
                            Add Discount
                          </Button>
                          <Button> </Button>
                          <Button
                            style={btnclr}
                            onClick={() => this.removeDiscount("small", i)}
                          >
                            Remove Discount
                          </Button>
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
                <font color="red">{this.state.msg1}</font>

                <Button
                  style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  onClick={() => this.handleNext()}
                >
                  Next
                </Button>
              </ContentArea>
            </div>
          </ContentArea>
          {this.state.redirectToNext && <Redirect to="/QuotationBillpay" />}
        </PageContainer2>


<div>
          <Dimmer>
            <Loader inline>
              Please wait Item is added in cart<br />
            </Loader>
          </Dimmer>
        </div>

       
   
 

<Modal className ="alertOfFileds"
                      size={size}
                      open={modalOpen}
                      onClose={()=>this.handleCloseDis}
                      style={{marginTop:"-20px"}}
                      >
                  
                      <Modal.Header>

                        <Grid columns={3} style={{ lineHeight: "0px" }}>
                          <Grid.Column>

                        
                          </Grid.Column>
                          <Grid.Column>
                            <center ><p style={{ margin: "-12px" }} className="text_clr">
                              Add Instant Discount
                    </p></center>

                          </Grid.Column>
                          <Grid.Column>

                            

                          </Grid.Column>
                        </Grid>

                      </Modal.Header>
                      <Modal.Content >
                        <Table>
                         
                          <Table.Body>
                            <Table.Row key>
                              <Grid relaxed columns={3} centered>
                                <Grid.Column>
                                  <label>
                                    <font>Asset Name:</font>
                                  </label>
                                </Grid.Column>
                                <Grid.Column>
                                  <label>
                                   {discountData.name}
                                  </label>
                                </Grid.Column>
                              </Grid>

                              <Grid relaxed columns={3} centered>
                                <Grid.Column>
                                  <label>
                                   Unit Price:
                                  </label>
                                </Grid.Column>
                                <Grid.Column>
                                  <label>
                                   {discountData.unitPrice}
                                  </label>
                                </Grid.Column>
                              </Grid>

                              <Grid relaxed columns={3} centered>
                                <Grid.Column>
                                  <label>
                                    Discounted Rs:
                                  </label>
                                </Grid.Column>
                                <Grid.Column>
                                  <label>
                                   {discountData.discount}
                                  </label>
                                </Grid.Column>
                              </Grid>

                              <Grid relaxed columns={3} centered>
                                <Grid.Column>
                                  <label>
                                   
                                      Discounted Price:
                                     
                                  </label>
                                </Grid.Column>
                                <Grid.Column>
                                  <label>
                        
                                  </label>
                                </Grid.Column>
                              </Grid>
                            </Table.Row>

                            <div
                              className="content_border"
                              style={{ marginTop: "13px" }}
                            />
                            <center>
                              <Header
                                as="h5"
                                style={{
                                  marginTop: "5px",
                                  marginBottom: "5px"
                                }}
                              >
                                <font color="green">Add Discount Here: </font>
                              </Header>
                            </center>

                            <Grid relaxed columns={3} centered>
                              <Grid.Column>
                                <label>
                                  <label>Unit Price:</label>
                                </label>
                              </Grid.Column>
                              <Grid.Column>
                                <label>
                                 {discountData.unitPrice}
                                </label>
                              </Grid.Column>
                            </Grid>

                             <Grid relaxed columns={3} centered>
                              <Grid.Column>
                                <label>
                                  <label>Total qty:</label>
                                </label>
                              </Grid.Column>
                              <Grid.Column>
                                <label>{discountData.qty}</label>
                              </Grid.Column>
                            </Grid>

                              <Grid relaxed columns={3} centered>
                              <Grid.Column>
                                <label>
                                  <label>Total Price:</label>
                                </label>
                              </Grid.Column>
                              <Grid.Column>
                                <label>{discountData.TaxableValue}</label>
                              </Grid.Column>
                            </Grid>


                            <Grid relaxed columns={3} centered>
                              <Grid.Column style={{ width: "200px", marginRight: "20px" }}>
                                <label>
                                  <font color="green">Discount in Percent: </font>
                                </label>
                              </Grid.Column>
                              <Grid.Column style={{ width: "-10px", marginRight: "15px" }}>
                                <label>
                                  {/* <Icon name="rupee" className="add_data" /> */}

                                  <Form.Group widths="equal">
                                    <input
                                      fluid
                                     value={disrs}
                                      onChange={this.handleDisRs}
                                      placeholder="Enter Discount Here"
                                      className="formInput"
                                    />
                                  </Form.Group>
                                </label>
                              </Grid.Column>
                            </Grid>

                            <Grid relaxed columns={3} centered>
                              <Grid.Column>
                                <label>
                                  <font color="green">Discount in Percent:</font>
                                </label>
                              </Grid.Column>
                              <Grid.Column>
                                <label>
                                  {/* <Icon name="rupee" className="add_data" /> */}
                                  {Disprice}
                                </label>
                              </Grid.Column>
                            </Grid>

                           

                            <Grid relaxed columns={3} centered>
                              <Grid.Column>
                                <label>
                                  <label>Total Amount:</label>
                                </label>
                              </Grid.Column>
                              <Grid.Column>
                                      {/* <Icon name="rupee" className="add_data" /> */}
                                  <label>{totalAmount}</label>
                               
                              </Grid.Column>
                            </Grid>
                            <div
                              className="content_border"
                              style={{ marginTop: "13px" }}
                            />

                            <center>
                           
                                <Button
                                  style={{
                                    backgroundColor: "black",
                                    marginTop: "10px"
                                  }}
                                  onClick={() => this.handleCloseDis()}
                                >
                                  <font color="white">Cancel</font>
                                </Button>
                            

                              <Button
                                style={{
                                  backgroundColor: "#863577",
                                  marginTop: "10px"
                                }}
                                onClick={() => this.handleDiscount()}
                              >
                                <font color="white">Add Discount</font>
                              </Button>
                            </center>
                          </Table.Body>
                        </Table>
                      </Modal.Content>
                    </Modal>






              </div>
      )
  }
}

const searchInputStyle = {
  borderRadius: "0%",

  border: "1px solid #D7A01D",
  color: "#ffffff"
};

const searchStyle = {
  backgroundColor: "#D7A01D",
  width: "90%",
  borderRadius: "0%",
  color: "#ffffff",
  height: "3.3em"
};

const bodyStyle = {
  width: "50em"
};

const table_structure = {
  height: "400px",
  maxWidth: "100%",
  overflow: "scroll",
  display: "block",
  borderTop: "2px solid #D7A01D",
  backgroundColor: "#111111"
}


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


export default QuoatationCart