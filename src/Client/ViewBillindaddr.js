import React, { Component } from 'react';
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Button,Input,Container,Card,Rating,Dropdown,Header,Modal,List,Form ,TextArea, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
import {Route, Switch,Link, Redirect} from "react-router-dom"
//import SidebarUI from "./SidebarUI";
import Select from 'semantic-ui-react/dist/commonjs/addons/Select/Select';
import Search from 'semantic-ui-react/dist/commonjs/modules/Search/Search';
import Side from "../component/Sidenav"
import escapeRegExp from "escape-string-regexp"
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import ShipAddrList from './ShipAddrList';
import { placeofSupply } from "../component/Api";

import styled from "styled-components"

import {
  PageContainer,
  IconDiv,
  HeadingDiv,
  HeadingText,
  FormDiv,
  FormBorder,
  Box,
  Box2,
  MainDiv2,
  MainDivHolder,
  IconDivShare,
  FormText,
  Form2Div,
  BillingInfoDiv,
  EditBillingInfoDiv,
  EditInfoDiv,
  EditInfo
} from "../styledComps.js"

class ViewBillindaddr extends Component {

    state={
        isLoading: false,
        value: "",
        results: [],
        InvoiceList:[],
        InvoiceData:{},
        invoice_id:"",
        size: "",
        open: false,
        name:"",
        email:"",
        mobileNo:"",
        created_Date:"",
        taxablevalue:"",
       totalgst:"",
        igst:"",
        cgst:"",
        sgst:"",
        total:"",
        qno:"",
        ItemList:[],
        total_qty:"",
        paidAmount:"",
        balance_due:"",
        open1:false,
        AddRemain:"",
        billbackup:[],
    BillAddress:"",
    bill:[],
    ship:[],
    bAddress1:"",
    bAddress2:"",
    bAddress3:"",
    bAddress4:"",
    bAddress5:"",
    sAddress1:"",
    sAddress2:"",
    sAddress3:"",
    sAddress4:"",
    sAddress5:"",
    place_Of_Supply:"",
    State:[],
    gstno:"",
    }

    placOfSupply=()=>{

        fetch(placeofSupply)
      .then(results => {
        return results.json();
      })
      .then(data => {
        console.log("data of place of Supply", data.records);
        this.setState({ State: data.records });
        //this.setState({ state: data.records })
      });

    }
    
    
    componentDidMount(){          
        
        this.placOfSupply()
        
        console.log("data in session",JSON.parse(sessionStorage.getItem("editTicket")))
        let clientData=JSON.parse(sessionStorage.getItem("editTicket"))
        if(!clientData){
            this.setState({msg:"No Data Available"})
        }else{
            this.setState({
                bAddress1:clientData.bAddress1,
                bAddress2:clientData.bAddress2,
                bAddress3:clientData.bAddress3,
                bAddress4:clientData.bAddress4,
                bAddress5:clientData.bAddress5,
                sAddress1:clientData.sAddress1,
                sAddress2:clientData.sAddress2,
                sAddress3:clientData.sAddress3,
                sAddress4:clientData.sAddress4,
                sAddress5:clientData.sAddress5,
                gstno:clientData.gstNo,
                place_Of_Supply:clientData.placeOfSuply

            })
        }
    
    }






  handleCompany = e =>{
      this.setState({CompanyName:e.target.value})
  }


  handleBack = ()=>{
    this.setState({redirectToBack:true})
}

  handleTransmute = ()=>{
      this.setState({redirectToBilling:true})
  }

handleOpen = () => {
    this.setState({ modalOpen: true })
}
handleClose = () => this.setState({ modalOpen: false })

show = (size1, q) => {
    this.setState({ size1, open: true })
    console.log("id of data is", q)
}

show1 = (size1) => {
    this.setState({ size1, open1: true })
}


        handleInvoice = () =>{
            this.setState({redirectToInvoice:true})
        }

    render() {

        const option = [{
            ProductName: "samsung",
            StorageQty: "10",
            StockQty: "50"
        }]


        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
          }


const{
    isLoading,
    bAddress1,
    bAddress2,
    bAddress3,
    bAddress4,
    bAddress5,
    sAddress1,
    sAddress2,
    sAddress3,
    sAddress4,
    sAddress5,
    place_Of_Supply,gstno,    
}=this.state



    //console.log("invoice id",InvoiceData.invoice_id)

        return (
            
            <div>


                <PageContainer>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/ViewClient">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Client Here !</HeadingText>
            </HeadingDiv>
          </div>

          
          <IconDivShare>
            <EditBillingInfoDiv>
              <Segment>
                <Form style={{fontSize:"16px"}}>            {/**aishwarya */}
                  <Form.Field>
                    <Header as="h4">GST No.:</Header>
                    <div className="space" />
                    {gstno}
                  </Form.Field>
                </Form>
                <div className="space" />
                <p style={{ color: "red" }}>{this.state.gstmsg}</p>

 
                 <List.Item>
                  <Form style={{fontSize:"16px"}}>            {/**aishwarya */}
                     <label>
                      <b>Place Of Supply </b>
                     </label>
                     <Form.Group widths={1}>
                     {place_Of_Supply}
                     </Form.Group>
                   </Form>
                 </List.Item>
              </Segment>
            </EditBillingInfoDiv>
          </IconDivShare>



          <FormDiv>
            <IconDivShare>
              <Link to="/ViewClient">
                <Icon name="reply" size="big" />
              </Link>
            </IconDivShare>
            <FormBorder>
              <FormText>
                <HeadingText>Billing Address</HeadingText>
                <br />
              </FormText>
              <MainDivHolder>

                  {bAddress1 == "undefined" ?(
                <div>
                </div>
            ):(
                <MainDiv2>
                  <Box>
                    <span>Billing Address 1 :</span>
                  </Box>
                  <Box2>
                    <span>{bAddress1}</span>
                  </Box2>
                </MainDiv2>
            )}
                <br/>

                {bAddress2 == "undefined" ?(
                <div>
                </div>
            ):(
                <MainDiv2>
                  <Box>
                    <span>Billing Address 2 :</span>
                  </Box>
                  <Box2>
                    <span>{bAddress2}</span>
                  </Box2>
                </MainDiv2>
              )}
                <br />


                 {bAddress3 == "undefined" ?(
                <div>
                </div>
            ):(
                <MainDiv2>
                  <Box>
                    <span>Billing Address 3 :</span>
                  </Box>
                  <Box2>
                    <span>{bAddress3}</span>
                  </Box2>
                </MainDiv2>
            )}
                <br />

            {bAddress4 == "undefined" ?(
                   <div>
                   </div>
               ):(
                <MainDiv2>
                  <Box>
                    <span>Billing Address 4 :</span>
                  </Box>
                  <Box2>
                    <span>{bAddress4}</span>
                  </Box2>
                </MainDiv2>
                )}
                <br />


 {bAddress5 == "undefined" ?(
        <div>
        </div>
    ):(
                <MainDiv2>
                  <Box>
                    <span>Billing Address 5 :</span>
                  </Box>
                  <Box2>
                    <span>{bAddress5}</span>
                  </Box2>
                </MainDiv2>
                 )}
                <br />
              </MainDivHolder>

              <FormText>
                <HeadingText>Shipping Address</HeadingText>
                <br />
              </FormText>
              <MainDivHolder>
                           
{sAddress1 == "undefined" ?(
  <div>
  </div>
):(
              <MainDiv2>
                <Box>
                  <span>Shipping Address 1 :</span>
                </Box>
                <Box2>
                  <span>{sAddress1}</span>
                </Box2>
              </MainDiv2>
)}
              <br />

                            
{sAddress2 == "undefined" ?(
  <div>
  </div>
):(
              <MainDiv2>
                <Box>
                  <span>Shipping Address 2 :</span>
                </Box>
                <Box2>
                  <span>{sAddress2}</span>
                </Box2>
              </MainDiv2>
)}
              <br />

                                   
{sAddress3 == "undefined" ?(
  <div>
  </div>
):(
              <MainDiv2>
                <Box>
                  <span>Shipping Address 3 :</span>
                </Box>
                <Box2>
                  <span>{sAddress3}</span>
                </Box2>
              </MainDiv2>
)}
              <br />

              
                                   
{sAddress4 == "undefined" ?(
  <div>
  </div>
):(
              <MainDiv2>
                <Box>
                  <span>Shipping Address 4 :</span>
                </Box>
                <Box2>
                  <span>{sAddress4}</span>
                </Box2>
              </MainDiv2>
)}
              <br />


                                   
{sAddress5 == "undefined" ?(
  <div>
  </div>
):(
              <MainDiv2>
                <Box>
                  <span>Shipping Address 5 :</span>
                </Box>
                <Box2>
                  <span>{sAddress5}</span>
                </Box2>
              </MainDiv2>
)}
              <br />
              </MainDivHolder>
            </FormBorder>
          </FormDiv>
        </PageContainer>


    
                      
                        </div>
                    )
    }

}
{/*

    const resultRenderer = ({ invoice_id, item_name }) => <span><Header as="h4">{invoice_id}</Header><p>{item_name}</p></span>
*/}


const logButton = {
    // background: "transparent",
    boxShadow: "0 0 0 1px #D7A01D inset",
    padding: "16px 16%",
    color: "#ffffff"
  }
  
  const formInput = {
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color:"#ffffff",
  padding:"14px"
  }
  
  const formLabel = {
  fontWeight:"400",
  fontSize:"16px"
  }
  
  const resetStyle = {
  backgroundColor: "#D7A01D",
  padding: "14px 10%",
  color:"#fff",
  fontSize:"20px",
  fontWeight:"300"
  }
  
  const resetStyle1 = {
  backgroundColor: "transparent",
  padding: "14px 6%",
  color:"#fff",
  fontSize:"20px",
  fontWeight:"300"
  }
  
  const white = {
  fontSize:"18px"
  }
  
  const header = {
  color:"#ffffff",
  fontSize:"16px"
  }
  
  const w1 = {
  fontSize:"16px"
  }
  

export default ViewBillindaddr
