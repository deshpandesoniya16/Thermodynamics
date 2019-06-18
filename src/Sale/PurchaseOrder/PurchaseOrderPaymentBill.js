import React, { Component } from 'react';
import '../../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button,Search,Container,List,Dimmer,Loader,Header,Checkbox,Responsive,Rating,Modal,Form ,Input, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
import {Route,Redirect,Switch,Link} from "react-router-dom"
import Side from "../../component/Sidenav"
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker.css"
//import moment from "moment"
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
import {clientList,createPO} from "../../component/Api"
import _ from "lodash"
import {btnclr} from '../../InvoiceCss'
import  ErrorModal from "../../component/ErrorModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"


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

class PurchaseOrderPaymentBill extends Component {


    state = {
     
        taxvalue:"",
        FullAmount:"",
        BalanceDue:"",
        startDate: moment(),
        PO:"",
        deliveryNo:"",
        delDate:moment(),
        BillAddr:"",
        ShipAddr:"",
        AssetCart:[],

        IGST: "No",
        Item: [],
        shipping: 0,
        TotalAmount: 0,
        total_gst: 0,
        CGST: 0,
        SGST: 0,
        other_charges: 0,
        shipping_charges:0,
        checked: false,
        BalanceDue: "",
        ReverseChange: "No",
        ItemArray: [],
        SelectedItem: [],
        quotation: false,
        Selected_Customer: [],
        vendorInfo:{},
        userInfo:{},
        Total_Gst_Value:0


    
    }

    componentDidMount(){

        let billaddr = sessionStorage.getItem("Billaddr")
        let shipaddr = sessionStorage.getItem("Shipaddr")
        let AssetCart = JSON.parse(sessionStorage.getItem("AssetCart"))
        let userInfo = sessionStorage.getItem("userInfo")
        console.log("userInfo",userInfo)

        let vendorInfo =JSON.parse(sessionStorage.getItem("client"))
        console.log("Client Info",vendorInfo)


        if(billaddr && shipaddr){
            this.setState({BillAddr:billaddr,ShipAddr:shipaddr,vendorInfo:vendorInfo,userInfo:userInfo})
            this.setState({AssetCart:AssetCart})
        }else{
            console.log("Sorry for address is not there")
        }



        setTimeout(() => {
            let k = 0;

            for (let i = 0; i < this.state.AssetCart.length; i++) {
                // console.log("tax value", this.state.SelectedItem[i].Taxablevalue)

                k = k + parseFloat(this.state.AssetCart[i].TaxableValue);

                this.setState({ taxvalue: k });
            }

            console.log("value of k",k)
        }, 1000);



        //    this.setState({ taxvalue: JSON.parse(sessionStorage.TaxableValue) })

        setTimeout(() => {
            console.log("taxvalue", this.state.taxvalue);

            let totalGst = 0;
            let totalIgst = 0;
            let totalCgst = 0;
            let totalsgst = 0;
            let tempGst = 0;
            let total = 0;

            this.state.AssetCart.map(Item => {
                console.log("gst is", Item.gst);

                let gstper = Item.GST / 100
                let cal_gst = this.state.taxvalue * gstper
                console.log("cal_gst",totalGst)
                this.setState({total_gst:Math.round(cal_gst * 100) / 100})

                /// just new one
                tempGst = Item.TaxableValue * Item.GST / 100;
                totalGst = totalGst + tempGst;
                //IT is new field of in item array

                console.log("total gst",totalGst)
                
                Item["total_gst"] = totalGst;

                totalsgst = totalGst / 2;
                totalCgst = totalGst / 2;
                totalIgst = totalGst;

                console.log("Total GST added", Item);
                total = this.state.taxvalue + totalGst;
                 
            Item["totalTaxbleValue"] =  this.state.taxvalue;    
            Item["pO"] = this.state.PO;
            Item["CGST"] = totalCgst;
            Item["SGST"] = totalsgst;
            Item["IGST"] = this.state.IGST;
            Item["pDate"] = moment(this.state.startDate).format("DD-MM-YYYY");
            Item["dno"] = this.state.deliveryNo;
            Item["dDate"] = moment(this.state.delDate).format("DD-MM-YYYY");
            });

            this.setState({ total_gst: Math.round(totalGst * 100) / 100 });
            this.setState({ CGST: Math.round(totalCgst * 100) / 100 });
            this.setState({ SGST: Math.round(totalsgst * 100) / 100 });

            this.setState({ TotalAmount: Math.round(total * 100) / 100 });
        }, 1000);

    }


   
    handleIGSTChange = e => {

        let igst_value = e.target.value

        if(igst_value == "Yes"){
            
           this.setState({Total_Gst_Value:this.state.total_gst,
            CGST:0,
            SGST:0
        })
           
        }else if(igst_value == "No"){
           let tg=this.state.total_gst
           this.setState({Total_Gst_Value:0,
                            CGST:tg/2,
                            SGST:tg/2
        })


        }

        this.setState({
            IGST: e.target.value
            // checked: this.state.checked
        });
    };


    handleReverseChange = e => {
        this.setState({
            ReverseChange: e.target.value
        });
    };

    handlePO = e =>{
        this.setState({PO:e.target.value})
    }

    handleDeliveryNo =e=>{
        this.setState({deliveryNo:e.target.value})
    }

    handleDate = date => {
        console.log("Date is", date)
        this.setState({startDate:date})
    }


    handleDelDate=date=>{
        console.log("Date is", date)
        this.setState({delDate:date})
    }

    calculateGst = (charges) =>{

        this.state.TotalAmount =  parseFloat(this.state.TotalAmount) + parseFloat(charges) 

    }
   
// calculateGst = (charges) =>{
//     let amt =
//     parseFloat(this.state.taxvalue) + parseFloat(charges)


//     setTimeout(() => {
//         console.log("taxvalue", amt);

//         let totalGst = 0;
//         let totalIgst = 0;
//         let totalCgst = 0;
//         let totalsgst = 0;
//         let tempGst = 0;
//         let total = 0;

//         this.state.AssetCart.map(Item => {
//             console.log("gst is", Item.gst);

//             let gstper = Item.gst / 100
//             let cal_gst = amt * gstper
//             console.log("cal_gst",cal_gst)
//             this.setState({total_gst:Math.round(cal_gst * 100) / 100})

//             /// just new one
//             tempGst = amt * Item.gst / 100;
//             totalGst = totalGst + tempGst;
//             //IT is new field of in item array

//             console.log("total gst",totalGst)
            
//             Item["total_gst"] = totalGst;

//             totalsgst = totalGst / 2;
//             totalCgst = totalGst / 2;
//             totalIgst = totalGst;

//             console.log("Total GST added", Item);
//             total = amt + totalGst;
    
//             Item["totalTaxbleValue"] =  amt;    
//             Item["pO"] = this.state.PO;
//             Item["CGST"] = this.state.CGST;
//             Item["SGST"] = this.state.SGST;
//             Item["IGST"] = this.state.IGST;
//             Item["pDate"] = moment(this.state.startDate).format("DD-MM-YYYY");
//             Item["dno"] = this.state.deliveryNo;
//             Item["dDate"] = moment(this.state.delDate).format("DD-MM-YYYY");
//         });

//         this.setState({taxvalue:amt})
//         this.setState({ total_gst: Math.round(totalGst * 100) / 100 });
//         this.setState({ CGST: Math.round(totalCgst * 100) / 100 });
//         this.setState({ SGST: Math.round(totalsgst * 100) / 100 });

//         this.setState({ TotalAmount: Math.round(total * 100) / 100 });
//     }, 1000);
// }

    handleShipping = e => {

        let samount
        const re = /^[0-9\b]+$/;
        if (e.target.value == "" || re.test(e.target.value)) {
            this.setState({ shipping_charges: e.target.value });
            this.calculateGst(e.target.value);
        }else{
            e.target.value = 0
            this.calculateGst(e.target.value);
        }

        // let t_amt  = amt+(amt*this.state.AssetCart.gst)
        // console.log("amount is",t_amt)
        // console.log("amt", parseFloat(amt));
        // setTimeout(() => {
        //     this.setState({
        //         taxvalue:parseFloat(Math.round(amt * 100) / 100),
        //         TotalAmount:t_amt
        //     });
        // }, 500);
    };

    handleOtherCharges = e => {
        let samount
        const re = /^[0-9\b]+$/;
        if (e.target.value == "" || re.test(e.target.value)) {
            this.setState({ other_charges: e.target.value });
            this.calculateGst(e.target.value);

        }else{
            e.target.value = 0
            this.calculateGst(e.target.value);
        }

    
    };

    genrateInvoice = () =>{


        this.state.AssetCart.map(Item => {
            Item["totalAmount"] = this.state.TotalAmount;
            Item["pO"] = this.state.PO;
            Item["pDate"] = moment(this.state.startDate).format("DD-MM-YYYY");
            Item["dno"] = this.state.deliveryNo;
            Item["dDate"] = moment(this.state.delDate).format("DD-MM-YYYY");
            Item["other_charges"] = this.state.other_charges;
            Item["shipping_charges"] = this.state.shipping_charges;
        });


       
    console.log("data is",this.state.AssetCart)
    sessionStorage.setItem("FinalArray",JSON.stringify(this.state.AssetCart))
    sessionStorage.setItem("TotalAmount",this.state.TotalAmount)


    fetch(createPO, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            vendor_id :this.state.vendorInfo.id,
            billingAddress:this.state.BillAddr,
            shippingAddress:this.state.ShipAddr,
            taxable_value:this.state.AssetCart.totalTaxbleValue,
            total_gst:this.state.Total_Gst_Value,
            igst:this.state.IGST,
            cgst:this.state.CGST,
            sgst:this.state.SGST,
            shipping_charges :this.state.shipping_charges,
            other_charges : this.state.AssetCart.other_charges,
            total : this.state.TotalAmount,
            amount_paid : 0,
            balance_due :this.state.TotalAmount,
            created_by :this.state.userInfo.id,
            created_date : moment().format("DD/MM/YYYY"),
            itemArray :this.state.AssetCart
})

        
    }).then(data => {
        return data.json();
    }).then(data => {
         console.log("data",data)
         console.log("data",data.records)
        // window.location.reload()
        //  if(data.message=="Ticket Created"){

    })


           this.setState({redirectToInvoice:true})
     
          
    }



    render(){

        const{
            IGST,
            taxvalue,FullAmount,BalanceDue,startDate,PO,delDate,deliveryNo,BillAddr,ShipAddr,
                value,
                      Item,
                      shipping,
                      TotalAmount,
                      total_gst,
                      CGST,
                      SGST,
                      other_charges,
                      ReverseChange,
                      quotation,
                      shipping_charges,Total_Gst_Value
            
        }=this.state

        console.log("in cart value is",this.state.AssetCart)

        return(

            <div>


                   <PageContainer2 style={{ height: "100vh" }}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/PurchaseOrderCart">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Payment Details</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea style={{ justifyContent: "center" }}>
            <Segment style={{ width: "100vh" }}>
              <Form>
                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Purchase Order No :</span>
                    </Box>
                    <Box2>
                      <Input type="text" value={PO} onChange={this.handlePO} />
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Purchase Order Date :</span>
                    </Box>
                    <Box2>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleDate}
                        dateFormat="YYYY-MM-DD"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onFocus={e => e.target.blur()}
                        placeholderText="Select Date"
                      />
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Delivery Note Number :</span>
                    </Box>
                    <Box2>
                      <Input
                        type="text"
                        value={deliveryNo}
                        onChange={this.handleDeliveryNo}
                      />
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Delivery Date :</span>
                    </Box>
                    <Box2>
                      <DatePicker
                        selected={this.state.delDate}
                        onChange={this.handleDelDate}
                        dateFormat="YYYY-MM-DD"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onFocus={e => e.target.blur()}
                        placeholderText="Select Date"
                      />
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Billing Address :</span>
                    </Box>
                    <Box2>
                      <span>{BillAddr}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Shipping Address :</span>
                    </Box>
                    <Box2>
                      <span>{ShipAddr}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>IGST :</span>
                    </Box>
                    <Box2>
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="Yes"
                        onChange={this.handleIGSTChange}
                        style={{ marginLeft: "10px" }}
                      />
                      <label htmlFor="radio1" style={{ marginLeft: "10px" }}>
                        Yes
                      </label>

                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="No"
                        onChange={this.handleIGSTChange}
                        style={{ marginLeft: "10px" }}
                      />
                      <label htmlFor="radio2" style={{ marginLeft: "10px" }}>
                        No
                      </label>
                    </Box2>
                  </MainDiv2>
                  <br />
                  {IGST == "No" && (
                    <MainDiv2>
                      <Box>
                        <span>CGST :</span>
                      </Box>
                      <Box2>
                        <span>{CGST}</span>
                      </Box2>
                    </MainDiv2>
                  )}

                  {IGST == "No" && (
                    <MainDiv2>
                      <Box>
                        <span>SGST :</span>
                      </Box>
                      <Box2>
                        <span>{SGST}</span>
                      </Box2>
                    </MainDiv2>
                  )}

                  {IGST == "No" && (
                    <MainDiv2>
                      <Box>
                        <span>Total GST :</span>
                      </Box>
                      <Box2>
                      <span>{Total_Gst_Value}</span>
                      </Box2>
                    </MainDiv2>
                  )}

                  {IGST == "Yes" && (
                    <MainDiv2>
                      <Box>
                        <span>Total GST :</span>
                      </Box>
                      <Box2>
                      <span>{Total_Gst_Value}</span>
                      </Box2>
                    </MainDiv2>
                  )}

                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Other Charges :</span>
                    </Box>
                    <Box2>
                      <input
                        placeholder="Enter Amount Here"
                        value={other_charges}
                        onChange={this.handleOtherCharges}
                      />
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Shipping Charges :</span>
                    </Box>
                    <Box2>
                      <input
                        type="text"
                        placeholder="Enter Amount Here"
                        value={shipping_charges}
                        onChange={this.handleShipping}
                      />
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Taxable Value :</span>
                    </Box>
                    <Box2>
                      <span>{taxvalue}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Amount :</span>
                    </Box>
                    <Box2>
                      <span>{TotalAmount}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                </MainDivHolder>
              </Form>

              <center>
                <Button
                  style={{
                    background: "#863577",
                    color: "#ffffff",
                    borderRadius: "0px",
                    marginTop: "18px"
                  }}
                  compact
                  size="large"
                >
                  <font color="white">Print</font>
                </Button>

                <Button
                  style={{
                    background: "#863577",
                    color: "#ffffff",
                    borderRadius: "0px",
                    marginTop: "18px"
                  }}
                  compact
                  size="large"
                  onClick={() => this.genrateInvoice()}
                >
                  <font color="white">Submit</font>
                </Button>
              </center>
            </Segment>
          </ContentArea>
          {this.state.redirectToInvoice && <Redirect to="/purchase" />}
          <font color="red">{this.state.msg}</font>
        </PageContainer2>






            </div>
        )
    }
}


const font = {
    fontSize: "17px"
};

const coloredFont = {
    fontSize: "17px"
};

const formInput = {
    background: "transparent",
    color: "#ffffff",
    padding: "10px",
    width: "20em",
    marginLeft: "1.5em",
    border: "1px solid #ffffff"
};


export default PurchaseOrderPaymentBill