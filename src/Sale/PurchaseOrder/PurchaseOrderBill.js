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


class PurchaseOrderBill extends Component {


    state = {

      AssetData:[],
      query:"",
      assetArray:[],
      finalAsset:[],
      flag:true,
      Amount:0,
      TaxableValue:0,
      TotalAmount:0,
      cartItems:0,
      AddItem:false,
      size:"",
      ItemName:"",
      ItemCost:"",
      ItemQty:0,
      ItemUnitPrice:"",
      ItemGST:"",
      ItemDiscount:"",
      ItemData:[],
      id:0

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


     // let item =sessionStorage.getItem("ItemData")
        //  this.setState({ItemData:item})
      // if(sessionStorage.getItem("ItemData") == undefined){
      //   console.log("Item has no data")
      //   this.setState({ItemData:[]})
      // }else{
      //  
      // }


          let entery = sessionStorage.getItem("checkEntry");

          if (entery == "secondEnrty") {
            let k, tempAmount;
            let tempvalue = 0;
            let tempQty = 0;
      
           // this.state.IteamsArray = JSON.parse(sessionStorage.IteamARR);

         
              //this.setState({assetArray:JSON.parse(sessionStorage.getItem("assetArray"))})
              let assetSession = JSON.parse(sessionStorage.getItem("assetArray"))
              
              console.log("array in asset",assetSession)

               this.state.ItemData = assetSession

              console.log("assetArray in secondentry ", this.state.ItemData);
              this.setState({finalAsset:this.state.ItemData})

                for (k = 0; k < this.state.ItemData.length; k++) {
            
               
                tempQty = parseInt(tempQty) + parseInt(this.state.ItemData[k].ItemQty);
                tempAmount =
                  this.state.ItemData[k].ItemQty *
                  this.state.ItemData[k].ItemUnitPrice;
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

         //  this.getAssetList();
              console.log("entry value", entery);

        }else{
          this.setState({ ItemData: this.state.ItemData });
        }


      }

    updateQuery = query => {
      this.setState({ query: query.trim() })
      }
    
      
    Increment = (Item) =>{


      console.log("Item is",parseInt(Item.ItemQty))
      console.log("Asset is",Item)
      sessionStorage.setItem("checkEntry", "secondEnrty");
    
        Item.ItemQty = parseInt(Item.ItemQty) + 1;
      console.log(Item.ItemQty);

      Item["ItemQty"] = parseInt(Item.ItemQty);
      this.setState({ flag: false });
      this.setState({ loading: true });


//calculate amount and taxable value for that asset only
     
          //this.state.Amount= (parseInt(asset.qty) * parseInt(asset.unitPrice))
          //this.state.TaxableValue= parseInt(Item.ItemQty) * parseInt(Item.ItemUnitPrice) - parseInt(Item.discount)

          this.state.TaxableValue= parseInt(Item.ItemQty) * parseInt(Item.ItemUnitPrice) - parseInt(Item.ItemDiscount)
          
          


          console.log("taxble Value",parseInt(this.state.TaxableValue))
      var sum = null;
      
      setTimeout(() => {
       // asset["Amount"] = this.state.Amount;
        Item["TaxableValue"] = parseInt(this.state.TaxableValue);
        this.setState({ loading: false });
      }, 1000);
      
   


    let k, tempAmount;
    let tempvalue = 0;
    let tempQty = 0;

//calcualte amount,qty,totalAmount,cartItems


  console.log("assetArray with Calculation", this.state.assetArray);
  for (k = 0; k < this.state.ItemData.length; k++) {
    // if (this.state.assetArray[k].qty != 0) {
      tempQty = parseInt(tempQty) + parseInt(this.state.ItemData[k].ItemQty);
      tempAmount =(parseInt(this.state.ItemData[k].ItemQty) * parseInt(this.state.ItemData[k].ItemUnitPrice));
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

    console.log("QTY", Item.qty);
    console.log("Taxable value", this.state.TaxableValue);
    console.log("Increment", JSON.stringify(Item));
    console.log("Increment", JSON.stringify(this.state.TaxableValue));
    console.log("Item ARR", Item);

    sessionStorage.setItem("assetArray",JSON.stringify(this.state.ItemData))
    }

 


    Decrement =(asset)=>{

      sessionStorage.setItem("checkEntry", "secondEnrty");
      if (asset.ItemQty <= 0) {
        this.setState({ msg: "Please enter a valid quantity to add to cart." });
      } else {
        this.setState({ msg: "" });
        asset.ItemQty = parseInt(asset.ItemQty) - 1;
        console.log(asset.ItemQty);
        asset["ItemQty"] = parseInt(asset.ItemQty);
        console.log("price", asset.ItemUnitPrice);
        this.setState({ flag: false });


        setTimeout(() => {
          this.setState({
            //Amount: asset.qty * asset.unitPrice,
            TaxableValue: parseInt(this.state.cartItems) * parseInt(asset.ItemUnitPrice) - parseInt(asset.ItemDiscount)
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
        for (k = 0; k < this.state.ItemData.length; k++) {
          // if (this.state.assetArray[k].qty != 0) {
            tempQty = parseInt(tempQty) + parseInt(this.state.ItemData[k].ItemQty);
            tempAmount =(parseInt(this.state.ItemData[k].ItemQty) * parseInt(this.state.ItemData[k].ItemUnitPrice));
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
      
        //sessionStorage.item = JSON.stringify()
  
        sessionStorage.setItem("assetArray",JSON.stringify(this.state.ItemData))
  
        // sessionStorage.TaxableValue=JSON.stringify(this.state.TaxableValue)
      }

    }



    //Bulk Qty add 

    UserChange = (event, item) => {
      console.log("Selected Item", item);
      sessionStorage.setItem("checkEntry", "secondEnrty");
  
     
        item.ItemQty = event.target.value;
        console.log(item.ItemQty);
  
        item["ItemQty"] = item.ItemQty;
        console.log("price", item.ItemQty);
        this.setState({ flag: false });
  
        this.setState({ loading: true });
    
        this.state.TaxableValue= parseInt(item.ItemQty) * parseInt(item.ItemUnitPrice) - parseInt(item.ItemDiscount)
          
          
  
        // this.setState({
        //   Amount: parseInt(item.ItemQty) * parseInt(item.ItemUnitPrice),
        //   TaxableValue: parseInt(item.ItemQty) * (parseInt(item.ItemUnitPrice) - parseInt(item.ItemDiscount))
        // });
     
  
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
  
      console.log("IteamsArray with Calculation", this.state.ItemData);
      for (k = 0; k < this.state.ItemData.length; k++) {
        if (this.state.ItemData[k].ItemQty != 0) {
          tempQty = parseInt(tempQty) + parseInt(this.state.ItemData[k].ItemQty);
          tempAmount =
            this.state.ItemData[k].ItemQty * this.state.ItemData[k].ItemUnitPrice;
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
      sessionStorage.setItem("assetArray",JSON.stringify(this.state.ItemData))
    };
  







    handleCart = () =>{
      this.setState({ loading: true });
      console.log("asset array", this.state.ItemData);
      sessionStorage.setItem("assetArray",JSON.stringify(this.state.ItemData))

        this.setState({redirectTocart : true})
    }


    handleAdd = (size) => {
      this.setState({ size, AddItem: true});
    }

    handleClose =()=>{
      this.setState({AddItem:false})
    }

    handleItemCost=e=>{
      console.log("")
      this.setState({ItemCost:e.target.value})
    }

    handleItemDiscount=e=>{
      this.setState({ItemDiscount:e.target.value})
    }

    handleItemGst=e=>{
      this.setState({ItemGST:e.target.value})
    }

    handleItemName=e=>{
      this.setState({ItemName:e.target.value})

    }


    handleItemQty=e=>{
      this.setState({ItemQty:e.target.value})

    }


    handleItemUnitPrice=e=>{
      this.setState({ItemUnitPrice:e.target.value})

    }



    addItem=()=>{
      console.log("ADD Item is clicked")

      this.state.id++
      
      console.log("id is",this.state.id)
this.state.ItemData.push(

  {
    "id":this.state.id,
    "Itemname":this.state.ItemName,
  "ItemCost":this.state.ItemCost,
  "ItemQty":this.state.ItemQty,
  "ItemUnitPrice":this.state.ItemUnitPrice,
  "GST":this.state.ItemGST,
  "ItemDiscount":this.state.ItemDiscount,
  "TaxableValue":this.state.TaxableValue
}
)

console.log("Item Data is",this.state.ItemData)




let k, tempAmount;
let tempvalue = 0;
let tempQty = 0;

//calcualte amount,qty,totalAmount,cartItems




console.log("assetArray with Calculation", this.state.ItemData);
for (k = 0; k < this.state.ItemData.length; k++) {



  
this.state.TaxableValue= parseInt(this.state.ItemData[k].ItemQty) * parseInt(this.state.ItemData[k].ItemUnitPrice) - parseInt(this.state.ItemData[k].ItemDiscount)

console.log("taxble Value",parseInt(this.state.TaxableValue))
var sum = null;


// asset["Amount"] = this.state.Amount;
this.state.ItemData[k]['TaxableValue'] = parseInt(this.state.TaxableValue);
this.setState({ loading: false })

// if (this.state.assetArray[k].qty != 0) {
  tempQty = parseInt(tempQty) + parseInt(this.state.ItemData[k].ItemQty);
  tempAmount =(parseInt(this.state.ItemData[k].ItemQty) * parseInt(this.state.ItemData[k].ItemUnitPrice));
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


// for(let i=0;i<ItemData.length;i++){

// }
sessionStorage.setItem("ItemData",JSON.stringify(this.state.ItemData))

this.setState({ItemName:"",ItemCost:"",ItemQty:0,ItemUnitPrice:0,ItemGST:0,ItemDiscount:0,TaxableValue:0,AddItem:false})
    }




    render (){

      let {
        AssetData,query,finalAsset,AddItem,size,
        ItemName,
        ItemCost,
        ItemQty,
        ItemUnitPrice,
        ItemGST,
        ItemDiscount,
        ItemData
      }=this.state

      console.log("final asset Array",this.state.finalAsset)

      if (query.search(/[^a-zA-Z]+/) === -1) {
        const match = new RegExp(escapeRegExp(query), "i")
        ItemData = ItemData.filter(i => match.test(i.Itemname))
      } else if (!ItemData) {
        console.log("No data")
      } else {
        const match = new RegExp(escapeRegExp(query), "i")
        ItemData = ItemData.filter(i => match.test(i.id))
        ItemData = ItemData
      }

      
        return(

            <div>

              <PageContainer2 style={{ height: "100vh" }}>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/PurchaseOrderInvoice">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Purchase</HeadingText>
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

              <Button
                style={{
                  marginLeft: "12px",
                  backgroundColor: "#863577",
                  color: "#fff"
                }}
                onClick={() => this.handleAdd("small")}
              >
                Add Item
              </Button>

              <br />
              <br />

              <div style={{ width: "100vh" }}>
                {ItemData.length > 0 ? (
                  <Table striped selectable celled className="table_structure">
                    <Table.Header>
                      <Table.Row>
                      <Table.HeaderCell style={tableStyle}>
                          ID
                        </Table.HeaderCell>
                        
                          <Table.HeaderCell style={tableStyle}>
                          Item Name
                        </Table.HeaderCell>
                        <Table.HeaderCell style={tableStyle}>
                          Unit Price
                        </Table.HeaderCell>

                        <Table.HeaderCell style={tableStyle}>
                          Qty
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {ItemData.map(i => (
                        <Table.Row key={i.id}>
                          <Table.Cell className="table_border" style={tableRow}>
                            {i.id}
                          </Table.Cell>
                          <Table.Cell className="table_border" style={tableRow}>
                            {i.Itemname}
                          </Table.Cell>
                          <Table.Cell className="table_border" style={tableRow}>
                            {i.ItemUnitPrice}
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
                                value={i.ItemQty}
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
                  <Table striped selectable celled className="table_structure">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell style={tableStyle}>
                          Item Name
                        </Table.HeaderCell>
                        <Table.HeaderCell style={tableStyle}>
                          Unit Price
                        </Table.HeaderCell>

                        <Table.HeaderCell style={tableStyle}>
                          Qty
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell className="table_border" style={tableRow}>
                          Data Not Available
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
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
          {this.state.redirectTocart && <Redirect to="/PurchaseOrderCart" />}
        </PageContainer2>




            
          
          
            <Dimmer size="small" active={this.state.loading}>
              <Loader inline>
                Please wait Asset is added in cart<br/>
              </Loader>
            </Dimmer>


            
  <Modal className ="alertOfFileds"
                        size={size}
                        open={AddItem}
                        onClose={()=>this.handleClose}
                        style={{marginTop:"-20px"}}
                        >
                    
                        <Modal.Header>

                          <Grid columns={3} style={{ lineHeight: "0px" }}>
                            <Grid.Column>

                          
                            </Grid.Column>
                            <Grid.Column>
                              <center ><p style={{ margin: "-12px" }} className="text_clr">
                                Add Item
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
                                      <font>Item Name:</font>
                                    </label>
                                  </Grid.Column>
                                  <Grid.Column>
                                    <label>
                                    <Form.Group widths="equal">
                                      <input
                                        fluid
                                        value = {ItemName}
                                        onChange={this.handleItemName}
                                        placeholder="Enter Item Name"
                                        style={formInput}
                                      />
                                    </Form.Group>
                                    </label>
                                  </Grid.Column>
                                </Grid>


                                

                      <Grid relaxed columns={3} centered>
                                  <Grid.Column>
                                    <label>
                                  Item Qty :
                                    </label>
                                  </Grid.Column>
                                  <Grid.Column>
                                 
                                    <Form.Group widths="equal">
                                      <input
                                        fluid
                                        value = {ItemQty}
                                        onChange={this.handleItemQty}
                                        placeholder="Enter Qty Here"
                                        style={formInput}
                                      />
                                    </Form.Group>
                                 
                                  </Grid.Column>
                                </Grid>
                                <Grid relaxed columns={3} centered>
                                  <Grid.Column>
                                    <label>
                                     Unit Price:
                                    </label>
                                  </Grid.Column>
                                  <Grid.Column>
                                  <Form.Group widths="equal">
                                      <input
                                        fluid
                                        value = {ItemUnitPrice}
                                        onChange={this.handleItemUnitPrice}
                                        placeholder="Enter Unit Price Here"
                                        style={formInput}
                                      />
                                    </Form.Group>
                                  </Grid.Column>
                                </Grid>

                                
                              <Grid relaxed columns={3} centered>
                                  <Grid.Column>
                                    <label>
                                   Discount :
                                    </label>
                                  </Grid.Column>
                                  <Grid.Column>
                                  <Form.Group widths="equal">
                                      <input
                                        fluid
                                        value = {ItemDiscount}
                                        onChange={this.handleItemDiscount}
                                        placeholder="Enter Discount Here"
                                      style={formInput}
                                      />
                                    </Form.Group>
                                  </Grid.Column>
                                </Grid>

{/*
                                  <Grid relaxed columns={3} centered>
                                  <Grid.Column>
                                    <label>
                                  Item Cost :
                                    </label>
                                  </Grid.Column>
                                  <Grid.Column>
                                 
                                    <Form.Group widths="equal">
                                      <input
                                        fluid
                                        value = {ItemCost}
                                        onChange={this.handleItemCost}
                                        placeholder="Enter Cost Here"
                                        style={formInput}
                                      />
                                    </Form.Group>
                                 
                                  </Grid.Column>
                                </Grid>

*/}

                                  <Grid relaxed columns={3} centered>
                                  <Grid.Column>
                                    <label>
                                    GST % :
                                    </label>
                                  </Grid.Column>
                                  <Grid.Column>
                                  <Form.Group widths="equal">
                                      <input
                                        fluid
                                        value = {ItemGST}
                                        onChange={this.handleItemGst}
                                        placeholder="Enter Gst Here"
                                        style={formInput}
                                      />

                                    </Form.Group>
                                  </Grid.Column>
                                </Grid>

                                
                              </Table.Row>

                             


                           
<br/><br/>
                              <center>
                             
                                  <Button
                                    style={{
                                      backgroundColor: "black",
                                      marginTop: "10px"
                                    }}
                                    onClick={() => this.handleClose()}
                                  >
                                    <font color="white">Cancel</font>
                                  </Button>
                              

                                <Button
                                  style={{
                                    backgroundColor: "#863577",
                                    marginTop: "10px"
                                  }}
                                  onClick={() => this.addItem()}
                                >
                                  <font color="white">Add Item</font>
                                </Button>
                              </center>
                            </Table.Body>
                          </Table>
                        </Modal.Content>
                      </Modal>




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
      padding:"14px",
      width:"20em"
    }
    

export default PurchaseOrderBill