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



class ServiceOrderCart extends Component {


    state = {
      clientData:{},
      AssetCart:[],
      SelectedAsset:[]
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
        if (i.TaxableValue && i.ItemQty) {
          tempArr.push(i);
          this.setState({ SelectedAsset: tempArr });
        }
      });
     // sessionStorage.setItem("AssetCart", JSON.stringify(this.state.SelectedAsset))
    }, 1000);



    }  
    
    show = (size, item) => {
      this.setState({ size, modalOpen: true });
      console.log("id of data is", item);
      //this.setState({ ItemDiscount: item });
    };
              
    handleNext =() =>{
      sessionStorage.setItem("AssetCart", JSON.stringify(this.state.SelectedAsset))
      this.setState({redirectToNext:true})
              }

    render(){


      const{
        clientData,
        AssetCart,
        SelectedAsset
      }=this.state

      console.log("SelectedAsset is",SelectedAsset)

        return(
            <div>

      <PageContainer2 style={{ height: "100vh" }}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/ServiceOrderBill">
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
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {SelectedAsset.map(i => (
                    <Table.Row key={i.id} onClick={() => this.show("small", i)}>
                      <Table.Cell className="table_border" style={tableRow}>
                        {i.Itemname}
                      </Table.Cell>
                      <Table.Cell className="table_border" style={tableRow}>
                        {i.ItemUnitPrice}
                      </Table.Cell>
                      <Table.Cell className="table_border" style={tableRow}>
                        {i.TaxableValue}
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
          {this.state.redirectToNext && (
            <Redirect to="/ServiceOrderPaymentBill" />
          )}
        </PageContainer2>

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
  


export default ServiceOrderCart