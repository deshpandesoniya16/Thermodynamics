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
import { AssetList } from "../../component/Api";
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

class InvoiceBill extends Component {


    state = {

      AssetData:[],
      query:"",
      assetArray:[],
      finalAsset:[],
      flag:true,
      Amount:0,
      TaxableValue:0,
      TotalAmount:0,
      cartItems:0
    }

    getAssetList = () =>{
      fetch(AssetList, {
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
     console.log("Asset data",data.records)
     if(data.records){
       let tempAsset = data.records

       tempAsset.map(asset=>{
        asset['qty']=0;
        asset['Amount']=0;
        asset['TaxableValue']=0
        asset['gst']=18,
        asset['discount']=0
        this.state.assetArray.push(asset)
        this.setState({finalAsset:this.state.assetArray})
       })
       this.setState({AssetData:data.records})

     }else{
       console.log("No Assets")
       this.setState({AssetData:[]})
     }
})       
}

    componentDidMount(){

          let entery = sessionStorage.getItem("checkEntry");

          if (entery == "secondEnrty") {
            let k, tempAmount;
            let tempvalue = 0;
            let tempQty = 0;
      
           // this.state.IteamsArray = JSON.parse(sessionStorage.IteamARR);

         
              //this.setState({assetArray:JSON.parse(sessionStorage.getItem("assetArray"))})
              let assetSession = JSON.parse(sessionStorage.getItem("assetArray"))
              
              console.log("array in asset",assetSession)

               this.state.assetArray = assetSession

              console.log("assetArray in secondentry ", this.state.assetArray);
              this.setState({finalAsset:this.state.assetArray})

                for (k = 0; k < this.state.assetArray.length; k++) {
            
               
                tempQty = parseInt(tempQty) + parseInt(this.state.assetArray[k].qty);
                tempAmount =
                  this.state.assetArray[k].qty *
                  this.state.assetArray[k].unitPrice;
                console.log("tempamount ", parseFloat(tempAmount));
                tempvalue = parseFloat(tempvalue) + parseFloat(tempAmount);
      
                console.log("tempvalue inside for loop ", parseFloat(tempvalue));
                console.log("tempqty",tempQty)
              
            
            }
            this.setState({
              TotalAmount: parseFloat(Math.round(tempvalue * 100) / 100).toFixed(2)
              // TotalAmount: tempvalue
            });
            
            console.log("tempqty",tempQty)
            this.setState({ cartItems: tempQty });
           
         
  }
  
  



          if (entery == "firstEnrty") {

           this.getAssetList();
              console.log("entry value", entery);

        }else{
          this.setState({ finalAsset: this.state.assetArray });
        }


      }

    updateQuery = query => {
      this.setState({ query: query.trim() })
      }
    
      
    Increment = (asset) =>{


      console.log("Asset is",parseInt(asset.stock_qty))
      console.log("Asset is",asset)
      sessionStorage.setItem("checkEntry", "secondEnrty");
      if (asset.qty < parseInt(asset.stock_qty)) {
        asset.qty = asset.qty + 1;
      console.log(asset.qty);

      asset["qty"] = asset.qty;
      this.setState({ flag: false });
      this.setState({ loading: true });


//calculate amount and taxable value for that asset only
     
          //this.state.Amount= (parseInt(asset.qty) * parseInt(asset.unitPrice))
          this.state.TaxableValue= parseInt(asset.qty) * (parseInt(asset.unitPrice) - parseInt(asset.discount))
          

      var sum = null;
      
      setTimeout(() => {
       // asset["Amount"] = this.state.Amount;
        asset["TaxableValue"] = this.state.TaxableValue;
        this.setState({ loading: false });
      }, 1000);
      
   


    let k, tempAmount;
    let tempvalue = 0;
    let tempQty = 0;

//calcualte amount,qty,totalAmount,cartItems


  console.log("assetArray with Calculation", this.state.assetArray);
  for (k = 0; k < this.state.assetArray.length; k++) {
    // if (this.state.assetArray[k].qty != 0) {
      tempQty = parseInt(tempQty) + parseInt(this.state.assetArray[k].qty);
      tempAmount =(parseInt(this.state.assetArray[k].qty) * parseInt(this.state.assetArray[k].unitPrice));
      console.log("tempamount ", parseFloat(tempAmount));
      tempvalue = parseFloat(tempvalue) + parseFloat(tempAmount);

      console.log("tempvalue inside for loop ", parseFloat(tempvalue));
  //  }
  }

    this.setState({
      TotalAmount: parseFloat(Math.round(tempvalue * 100) / 100).toFixed(2)
      // TotalAmount: tempvalue
    });

     this.setState({ cartItems: tempQty });

    // if (tempQty) {
    // }

    console.log("QTY", asset.qty);
    console.log("Taxable value", this.state.TaxableValue);
    console.log("Increment", JSON.stringify(asset));
    console.log("Increment", JSON.stringify(this.state.TaxableValue));
    console.log("Item ARR", asset);

    sessionStorage.setItem("assetArray",JSON.stringify(this.state.assetArray))
    }

      

    else {
      this.setState({ msg: "Item is No more availble in stock" });
    }

  }
 


    Decrement =(asset)=>{

      sessionStorage.setItem("checkEntry", "secondEnrty");
      if (asset.qty <= 0) {
        this.setState({ msg: "Please enter a valid quantity to add to cart." });
      } else {
        this.setState({ msg: "" });
        asset.qty = asset.qty - 1;
        console.log(asset.qty);
        asset["qty"] = asset.qty;
        console.log("price", asset.unitPrice);
        this.setState({ flag: false });


        setTimeout(() => {
          this.setState({
            //Amount: asset.qty * asset.unitPrice,
            TaxableValue: this.state.cartItems * (asset.unitPrice - asset.discount)
          });
        }, 500);
        setTimeout(() => {
          //asset["Amount"] = this.state.Amount;
          asset["TaxableValue"] = this.state.TaxableValue;
        }, 1000);
  

        console.log("Taxable value", this.state.TaxableValue);
        console.log("Increment", JSON.stringify(asset));
        //localStorage.tax=this.state.TaxableValue
        console.log("Increment", JSON.stringify(this.state.TaxableValue));

        console.log("Item ARR", asset);



        let k, tempAmount=0;
        let tempvalue = 0;
        let tempQty = 0;
  
        console.log("IteamsArray with Calculation", this.state.assetArray);
        for (k = 0; k < this.state.assetArray.length; k++) {
          if (this.state.assetArray[k].qty != 0) {
            tempQty = parseInt(tempQty) + parseInt(this.state.assetArray[k].qty);
            tempAmount =
            parseInt(this.state.assetArray[k].qty) * parseInt(this.state.assetArray[k].unitPrice);
            console.log("tempamount ", parseFloat(tempAmount));
            tempvalue = parseFloat(tempvalue) + parseFloat(tempAmount);
            console.log("tempvalue inside for loop ", parseFloat(tempvalue));
          }
        }
  
        this.setState({
          TotalAmount: (Math.round(tempvalue * 100) / 100).toFixed(2)
        });
  
        this.setState({ cartItems: tempQty });
        //sessionStorage.item = JSON.stringify()
  
        sessionStorage.setItem("assetArray",JSON.stringify(this.state.assetArray))
  
        // sessionStorage.TaxableValue=JSON.stringify(this.state.TaxableValue)
      }

    }



    //Bulk Qty add 

    UserChange = (event, item) => {
      console.log("Selected Item", item);
      sessionStorage.setItem("checkEntry", "secondEnrty");
  
      if (item.qty < item.stock_qty) {
        item.qty = event.target.value;
        console.log(item.qty);
  
        item["qty"] = item.qty;
        console.log("price", item.unitPrice);
        this.setState({ flag: false });
  
        this.setState({ loading: true });
      } else {
        this.setState({ msg: "Item is No more availble in stock" });
      }
  
      setTimeout(() => {
        this.setState({
          Amount: item.qty * item.unitPrice,
          TaxableValue: item.qty * (item.unitPrice - item.discount)
        });
      }, 500);
  
      var sum = null;
      setTimeout(() => {
      //  item["Amount"] = this.state.Amount;
        item["TaxableValue"] = this.state.TaxableValue;
        this.setState({ loading: false });
      }, 1000);
      // this.state.ArrayOfItem.forEach(function(value, index, arry){
      //     sum += value.qty;
  
      // });
      let k, tempAmount;
      let tempvalue = 0;
      let tempQty = 0;
  
      console.log("IteamsArray with Calculation", this.state.assetArray);
      for (k = 0; k < this.state.assetArray.length; k++) {
        if (this.state.assetArray[k].qty != 0) {
          tempQty = parseInt(tempQty) + parseInt(this.state.assetArray[k].qty);
          tempAmount =
            this.state.assetArray[k].qty * this.state.assetArray[k].Amount;
          console.log("tempamount ", parseFloat(tempAmount));
          tempvalue = parseFloat(tempvalue) + parseFloat(tempAmount);
  
          console.log("tempvalue inside for loop ", parseFloat(tempvalue));
        }
      }
  
      this.setState({
        TotalAmount: parseFloat(Math.round(tempvalue * 100) / 100).toFixed(2)
        // TotalAmount: tempvalue
      });
  
      this.setState({ cartItems: tempQty });
  
      if (tempQty) {
      }
  
      console.log("QTY", item.qty);
      console.log("Taxable value", this.state.TaxableValue);
      console.log("Increment", JSON.stringify(item));
      console.log("Increment", JSON.stringify(this.state.TaxableValue));
      console.log("Item ARR", item);
      sessionStorage.setItem("assetArray",JSON.stringify(this.state.assetArray))
    };
  


    handleCart = () =>{
      this.setState({ loading: true });
      console.log("asset array", this.state.assetArray);
      sessionStorage.setItem("assetArray",JSON.stringify(this.state.assetArray))

        this.setState({redirectTocart : true})
    }



    render (){

      let {
        AssetData,query,finalAsset
      }=this.state

      console.log("final asset Array",this.state.finalAsset)

      if (query.search(/[^a-zA-Z]+/) === -1) {
        const match = new RegExp(escapeRegExp(query), "i")
        finalAsset = finalAsset.filter(i => match.test(i.name))
      } else if (!finalAsset) {
        console.log("No data")
      } else {
        const match = new RegExp(escapeRegExp(query), "i")
        finalAsset = finalAsset.filter(i => match.test(i.id))
        finalAsset = finalAsset
      }

      
        return(

            <div>



              


              <PageContainer2 style={{height:"100vh"}}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/AddInvoice">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Invoice</HeadingText>
            </HeadingDiv>
          </div>

          <ContentArea style={{ justifyContent: "center" }}>
            <TableDiv>
              <Input
                size="big"
                type="text"
                placeholder="Search Here!!!"
                size="large"
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
              />

              <br />
              <br />
              <div style={{ width: "100vh" }}>
                {finalAsset.length > 0 ? (
                  <Table striped selectable celled className="table_structure">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell style={tableStyle}>
                          ID
                        </Table.HeaderCell>
                        <Table.HeaderCell style={tableStyle}>
                          Asset Name
                        </Table.HeaderCell>
                        <Table.HeaderCell style={tableStyle}>
                          Asset Cost
                        </Table.HeaderCell>
                        <Table.HeaderCell style={tableStyle}>
                          Qty
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {finalAsset.map(i => (
                        <Table.Row key={i.id}>
                          <Table.Cell className="table_border" style={tableRow}>
                            {i.id}
                          </Table.Cell>
                          <Table.Cell className="table_border" style={tableRow}>
                            {i.name}
                          </Table.Cell>
                          <Table.Cell className="table_border" style={tableRow}>
                            {i.unitPrice}
                          </Table.Cell>
                          <Table.Cell className="table_border" style={tableRow}>
                            <Menu
                              style={{
                                borderRadius: "0px",
                                width: "0px"
                              }}
                            >
                              <Menu.Item
                                style={{
                                  backgroundColor: "#863577",
                                  width: "30px",
                                  height: "29px",
                                  marginLeft: "10px",
                                  borderRadius: "0px"
                                }}
                                onClick={() => this.Increment(i)}
                              >
                                <Icon
                                  marginTop="2px"
                                  size="small"
                                  name="add"
                                  style={{ color: "white" }}
                                />
                              </Menu.Item>

                              <input
                                style={{
                                  backgroundColor: "#ffffff",
                                  width: "30px",
                                  height: "29px"
                                }}
                                value={i.qty}
                                onChange={event => this.UserChange(event, i)}
                              />

                              <Menu.Item
                                style={{
                                  backgroundColor: "#863577",
                                  width: "30px",
                                  height: "29px"
                                }}
                                onClick={() => this.Decrement(i)}
                              >
                                <Icon
                                  size="small"
                                  style={{ color: "white" }}
                                  name="minus"
                                />
                              </Menu.Item>
                            </Menu>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                ) : (
                  <div />
                )}
              </div>
              <br />
              <br />
              <ContentArea>
                <TixyContent style={{ flex: 1 }}>
                  <MainDivHolder>
                    <MainDiv2>
                      <Box>
                        <span>Total Quantity :</span>
                      </Box>
                      <Box2>
                        <span>{this.state.cartItems}</span>
                      </Box2>
                    </MainDiv2>
                    <br />
                  </MainDivHolder>
                </TixyContent>
                <TixyContent style={{ flex: 1 }}>
                  <Button
                    style={{
                      backgroundColor: "#863577",
                      color: "#ffffff"
                    }}
                    onClick={() => this.handleCart()}
                  >
                    View Cart
                  </Button>
                </TixyContent>
                <TixyContent style={{ flex: 1 }}>
                  <MainDivHolder>
                    <MainDiv2>
                      <Box>
                        <span>Total Amount :</span>
                      </Box>
                      <Box2>
                        <span>{this.state.TotalAmount}</span>
                      </Box2>
                    </MainDiv2>
                    <br />
                  </MainDivHolder>
                </TixyContent>
              </ContentArea>
            </TableDiv>
          </ContentArea>
          {this.state.redirectTocart && <Redirect to="/Cart" />}
        </PageContainer2>
            
             
          
            <Dimmer size="small" active={this.state.loading}>
              <Loader inline>
                Please wait Asset is added in cart<br/>
              </Loader>
            </Dimmer>

          </div>
        );
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
    

export default InvoiceBill