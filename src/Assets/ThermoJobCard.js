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

class ThermoJobCard extends Component {

    download = () =>{

        const input = document.getElementById('demo');
        html2canvas(input)
          .then((canvas) => {
        
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF("p", "mm", "a4");
         
          pdf.addImage(imgData, 'JPEG', 0, 0 , 250, 180);
          // pdf.output('dataurlnewwindow');
          pdf.save("download.pdf");
          })
        ;
    }

  render() {
   
    return (
    
        <div>
            <div id="demo">
            <center>
                <h4 style={{marginTop: "2%",}}>Job Card</h4>
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
                            <p>Invoice No. </p> 
                            <p>Invoice Date  </p>
                            <p>Delivery Date  </p>
                            <p>Delivery Note Number  </p>
                            <p>PO Number  </p>
                            <p>PO Date  </p>
                        </Grid.Column>
                        <Grid.Column width={1} style={{borderLeft:"1px solid #111"}}>
                            
                        </Grid.Column>
                        <Grid.Column width={2}>
                           <p>1235</p>
                           <p>1235</p>
                           <p>1235</p>
                           <p>1235</p>
                           <p>1235</p>
                           <p>1235</p>
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>

                <hr style={hrColor}/>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <p>Client Name </p>
                            <p>Address </p>
                            <p>State Name:Utter Pradesh    Code : 09 </p>
                            <p>Email: info@thermodynamic.co.in</p>
                        </Grid.Column>
                        <Grid.Column width={1} style={{borderLeft:"1px solid #111"}}>
                            
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <p>Shipping Address  </p>
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
                        <Table.Row>
                            <Table.Cell >1</Table.Cell>
                            <Table.Cell >Approved</Table.Cell>
                            <Table.Cell >fgggg</Table.Cell>
                            <Table.Cell >2</Table.Cell>
                            <Table.Cell >2</Table.Cell>
                            <Table.Cell >3232</Table.Cell>
                            <Table.Cell >443</Table.Cell>
                            <Table.Cell >323</Table.Cell>
                        </Table.Row>                        
                    </Table.Body>
                </Table>

                <Table celled fixed singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Taxable Value</Table.HeaderCell>
                            <Table.HeaderCell>CGST</Table.HeaderCell>
                            <Table.HeaderCell>SGST</Table.HeaderCell>
                            <Table.HeaderCell>Total</Table.HeaderCell>
                        </Table.Row>
                        
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>3232</Table.Cell>
                            <Table.Cell>443</Table.Cell>
                            <Table.Cell>323</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            
                <hr style={hrColor}/>
                    <p>In Word</p>
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
    width:"50%",
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



export default ThermoJobCard;
