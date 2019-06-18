import React, { Component } from 'react';
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Header ,Rating,Modal,Form ,Input, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
import {Route,Redirect,Switch,Link} from "react-router-dom"
import Side from "../component/Sidenav"
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
import ReactDOMServer from 'react-dom/server';
//import { Document, Page } from 'react-pdf';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'
import moment from "moment"
let converter = require('number-to-words');

class ThermoPurchase extends Component {

 
    state = {
        invoiceData:[],
        clientData:{},
        BillAddr:"",
        ShipAddr:"",
        dDate:"",
        dno:"",
        po:"",
        pdate:"",
        cuurentDate:moment().format("DD-MM-YYY"),
        TotalTaxbleValue:"",CGST:"",SGST:"",TotalAmount:"",
        OtherCharges:"",
        ShippingCharges:"",
        WordAmt:""

    }


    componentDidMount(){

        let billaddr = sessionStorage.getItem("Billaddr")
        let shipaddr = sessionStorage.getItem("Shipaddr")
        let t_amt = sessionStorage.getItem("TotalAmount")
        console.log("Amount is",t_amt)
        let w_amt= converter.toWords(t_amt).toLocaleUpperCase()

        console.log("word amt",w_amt)

            this.setState({BillAddr:billaddr,ShipAddr:shipaddr,TotalAmount:t_amt,WordAmt:w_amt})
           
        let clientInfo =JSON.parse(sessionStorage.getItem("client"))
        console.log("Client Info",clientInfo)
        let invoiceInfo = JSON.parse(sessionStorage.getItem("FinalArray"))
        console.log("Invoice Date",invoiceInfo)
        console.log("dno",invoiceInfo[0].dno)
        console.log("dDate",invoiceInfo[0].dDate)


        this.setState({
            dDate:invoiceInfo[0].dDate,
            dno:invoiceInfo[0].dno,
            po:invoiceInfo[0].pO,
            pdate:invoiceInfo[0].pDate,
            TotalTaxbleValue:invoiceInfo[0].totalTaxbleValue,
            CGST:invoiceInfo[0].CGST,
            SGST:invoiceInfo[0].SGST,
            OtherCharges:invoiceInfo[0].other_charges,
            ShippingCharges:invoiceInfo[0].shipping_charges
        })

        this.setState({clientData:clientInfo,invoiceData:invoiceInfo})
    }




    download = () =>{

        const input = document.getElementById('demo');
        html2canvas(input)
          .then((canvas) => {
        
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF("p", "mm", "a4");
         
          pdf.addImage(imgData, 'JPEG', 0, 0 , 200, 180);
          // pdf.output('dataurlnewwindow');
          pdf.save("PurchaseOrder.pdf");
          })
        ;
    }

  render() {


    const {
        invoiceData,
        clientData,
        BillAddr,ShipAddr,dDate,dno,pdate,po,TotalAmount,cuurentDate,
        shipping_charges,other_charges,WordAmt
    }=this.state
   
    console.log("TotalAmount is,",TotalAmount)
    console.log("Date is,",invoiceData.dDate)
    return (
    
        <div>
            <div id="demo">
            <center>
                <h4 style={{marginTop: "2%",}}>Purchase Order</h4>
            </center>
            <Container style={outline}>
            
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h4>Thermo Dyanamic Service</h4>
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <p>117\49 , Sarvodaya Nagar , Kanpur </p>
                            <p>GSTIN /UIN :09AABFT3186B1ZB </p>
                            <p>Service Tax Number :KR-5468162 </p>
                            <p>State Name:Utter Pradesh    Code : 09 </p>
                            <p>Email: info@thermodynamic.co.in</p>
                        </Grid.Column>
                        <Grid.Column width={1} style={{borderLeft:"1px solid #111"}}>
                            
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <p>PO Number </p>
                            <p>PO Date</p>
                          
                            <p>Delivery Date   </p>
                            <p>Delivery Note Number  </p>
                         
                        </Grid.Column>
                        <Grid.Column width={1} style={{borderLeft:"1px solid #111"}}>
                            
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <p>{po}</p>
                           <p>{pdate}</p>
                           <p>{dno}</p>
                           <p>{dDate}</p>
                         
                         
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>

                <hr style={hrColor}/>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <p>Client Name : {clientData.vendor_name} </p>
                            <p>Address : {BillAddr} </p>
                            <p>{clientData.placeOfSuply} </p>
                            <p>Email: {clientData.email}</p>
                        </Grid.Column>
                        <Grid.Column width={1} style={{borderLeft:"1px solid #111"}}>
                            
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <p>Shipping Address  : {ShipAddr} </p>
                        </Grid.Column>
                       
                        <Grid.Column width={2}>
                           
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>
                <hr style={hrColor}/>

                <Table celled Fixed singleLine >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={tableStyle}>No</Table.HeaderCell>
                            <Table.HeaderCell style={tableStyle}>Goods Name</Table.HeaderCell>
                            <Table.HeaderCell style={tableStyle}>HSN/SAC</Table.HeaderCell>
                            <Table.HeaderCell style={tableStyle}>GST</Table.HeaderCell>
                            <Table.HeaderCell style={tableStyle}>QTY</Table.HeaderCell>
                            <Table.HeaderCell style={tableStyle}>Unit Price</Table.HeaderCell>
                            <Table.HeaderCell style={tableStyle}>Discount</Table.HeaderCell>
                            <Table.HeaderCell style={tableStyle}>Amount</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {invoiceData.map(i=>(

                        <Table.Row>
                            <Table.Cell >{i.id}</Table.Cell>
                            <Table.Cell >{i.Itemname}</Table.Cell>
                            <Table.Cell >fgggg</Table.Cell>
                            <Table.Cell >{i.GST}</Table.Cell>
                            <Table.Cell >{i.ItemQty}</Table.Cell>
                            <Table.Cell >{i.ItemUnitPrice}</Table.Cell>
                            <Table.Cell >{i.ItemDiscount}</Table.Cell>
                            <Table.Cell >{i.TaxableValue}</Table.Cell>
                        </Table.Row>                        
                        ))}
                    </Table.Body>
                </Table>

                <Table celled fixed singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Taxable Value</Table.HeaderCell>
                            <Table.HeaderCell>CGST</Table.HeaderCell>
                            <Table.HeaderCell>SGST</Table.HeaderCell>
                            <Table.HeaderCell>Other Charges</Table.HeaderCell>
                            <Table.HeaderCell>Shipping Charges</Table.HeaderCell>
                            <Table.HeaderCell>Total</Table.HeaderCell>
                        </Table.Row>
                        
                    </Table.Header>

                    <Table.Body>
                    
                        <Table.Row>
                            <Table.Cell>{this.state.TotalTaxbleValue}</Table.Cell>
                            <Table.Cell>{this.state.CGST}</Table.Cell>
                            <Table.Cell>{this.state.SGST}</Table.Cell>
                            <Table.Cell>{this.state.OtherCharges}</Table.Cell>
                            <Table.Cell>{this.state.ShippingCharges}</Table.Cell>
                            <Table.Cell>{this.state.TotalAmount}</Table.Cell>
                        </Table.Row>
                  
                    </Table.Body>
                </Table>
            
                <hr style={hrColor}/>
                <p>In Word - <b>{WordAmt}</b></p>
                <hr style={hrColor}/>

                <Table celled fixed singleLine>
                    <Table.Body>
                    <Table.Row>
                        <Table.Cell style={{paddingTop:"5%"}}>Authorised Signatory </Table.Cell>
                        <Table.Cell style={{paddingTop:"5%"}}>Thermodynamic Services Issuing Signature </Table.Cell>
                        
                    </Table.Row>
                    </Table.Body>
                </Table>
                
                <hr style={hrColor}/>
                <center><p>SUBJECT TO KANPUR  JURDISDICTION</p></center>
                <hr style={hrColor}/>
                <center><p>Product By - vertical name</p></center>
                 
            </Container>
            </div>

            <center> <Button primary onClick={this.download}>Download</Button></center>
            <br/>
        </div>
    );
  }
}

const outline = {
    padding: "10px",
    border: "2px solid #111",
    width:"64%",
    marginBottom:"5px"
}

const hrColor = {
    borderColor:"#111111"
}

const table_structure = {
    height:"200px",
    maxWidth:"100%",
    overflow:"scroll",    
    display:"block"
}

const tableRow = {
    color:"#111111",
    width: "50em",
    borderTop:"1px solid #111111",
    borderBottom:"1px solid #111111"
}

const tableStyle = {
    fontSize:"16px",
    fontWeight:"400",
    width: "50em"
}

// const table_structure = {
//     height: "400px",
//     maxWidth: "100%",
//     overflow: "scroll",
//     display: "block",
//     borderTop: "2px solid #D7A01D",
//     backgroundColor: "#111111"
//   }


export default ThermoPurchase;
