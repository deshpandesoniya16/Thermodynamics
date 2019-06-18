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

class ViewTransmute extends Component {

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
    mop:"",       
    query:"",
    address: '' ,
    getLatLng:{},
    Machnie:"",
    tin:"",
    CST:"",
    panno:"",
    gstno:"",
    ECC:"",
    Excise:"",
    Collectorate:"",
    clientData:{}
    }

    
    componentDidMount(){           
    
        console.log("data in session",JSON.parse(sessionStorage.getItem("editTicket")))
        let clientData=JSON.parse(sessionStorage.getItem("editTicket"))
        if(!clientData){
            this.setState({msg:"No Data Available"})
        }else{
            this.setState({
                clientData:clientData,
                tin:clientData.tinNo,
                CST:clientData.cstNo,
                panno:clientData.panNo,
                gstno:clientData.gstNo,
                ECC:clientData.ecc,
                Collectorate:clientData.exciseCollectorate,
                Excise:clientData.exciseDivision,
                Machnie:clientData.leadType
            })
        }
    }

    tinValidation=input=>{

        let pattern = /^\d+(\.\d{1,2})?$/
        return pattern.test(input)
    }


    validatePan = (panno) => {
        let re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        return re.test(panno)
    }



    onChange = (address) =>{
console.log("Address is",address)
        this.setState({ address })
     
    } 

    handleMachnie=e=>{
        console.log("product Group",e.target.value)
        this.setState({
            Machnie: e.target.value,
           // checked: this.state.checked  
          
          })
    }


    handleFormSubmit = (event) => {
        event.preventDefault()
    
        geocodeByAddress(this.state.address)
          .then(results => this.state.getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error))
      }

      
handleRate = (e, { rating, maxRating }) =>{

    console.log("Rating given by",rating)
      this.setState({ rating, maxRating })
  }





  handleTin = e =>{
    if(this.tinValidation(e.target.value)){
        this.setState({tin:e.target.value,message:""})
    }else{
        this.setState({message:"Not Valid tin no."})
    }    
    
  }

  handleCST = e =>{
    this.setState({CST:e.target.value})
}

handleExcise = e =>{
    this.setState({Excise:e.target.value})
}

handleCollectorate =e =>{
    this.setState({Collectorate:e.target.value})
}


handlePan =e=>{
    this.setState({panno:e.target.value})

    // this.setState({ panno: e.target.value })
    setTimeout(() => {
        if (this.validatePan(this.state.panno)) {
            this.setState({ panno: this.state.panno ,panmsg:""})
        } else {
            this.setState({ panmsg: "Please Enter Valid Pan no." })
        }
    }, 1000);
    }

handleECC =e=>{
    this.setState({ECC:e.target.value})
}


handleSubmit=()=>{
console.log(this.state.tin)
console.log(this.state.CST)
console.log(this.state.ECC)
console.log(this.state.Excise)
console.log(this.state.panno)
console.log(this.state.Collectorate)
}


  handleBack = ()=>{
    this.setState({redirectToBack:true})
}

  handleTransmute = ()=>{
      this.setState({redirectToBilling:true})
  }



        // handleSubmit =()=>{
        //     console.log("Transmute")
        // }


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
    gstno,
    tin,
    CST,
    panno,ECC,Excise,Collectorate,Machnie,clientData
}=this.state

console.log("invoices are",this.state.InvoiceList)
console.log("invoices  data are",this.state.InvoiceData)
let data=[]
if(InvoiceList){

    data=InvoiceList
}else{
data=[]
}

if (query) {
    const match = new RegExp(escapeRegExp(query), "i")
 let invoice = data.filter(i =>
    match.test(i.invoice_id)
    )
    } else {
        data = []
    }
    
    console.log("Customer info", data)
    

    //console.log("invoice id",InvoiceData.invoice_id)

        return (
            
            <div>
            <Menu secondary attached="top" className="ui fixed inverted">
            <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
               <p className="text_clr"> <Icon name="sidebar"/>Transmute </p>
            </Menu.Item>          
            
        </Menu>
        <div className="content_border"></div>
        <Sidebar.Pushable as={Segment} attached="bottom" className="sidebar_hgt">
        
        <Side menuVisible={this.state.menuVisible}/>    
        
            <Sidebar.Pusher onClick={() => this.state.menuVisible && this.setState({ menuVisible: false })} dimmed={this.state.menuVisible}>
                <Segment>
    
                          
                            
                                <div className="purchase_form">
                                <Grid columns={3}>
                                        
                           <Grid.Column>
                           
                           <div style={{marginTop:"100%",marginLeft:"80%"}}>
                           <Link to="/ViewClient">
                           <Icon name="reply" color="black" size="big" />
                          </Link>
                           </div>

                           </Grid.Column>
                           <Grid.Column>
                           <div className="bck_border1" style={{height:"784px",width:"139%",marginLeft: "-14%"}}>
                       <Segment>
                       <center>
                       <Icon name="add user" size="massive"/>
                       </center>

<center>


<Form.Group inline widths={3}>

    {clientData.leadType == "New Lead" && (
        <label htmlFor="radio1">
    <input type="radio"
      id="radio1"
      name="radio1"
      value="New Lead"
      onChange={this.handleMachnie}
      defaultChecked                 
    />
   New Lead</label>              
                  
)} 

{clientData.leadType == "Asset owner" && (
<label htmlFor="radio2">              
<input type="radio"
id="radio2"
name="radio1"              
value="Asset owner"
onChange={this.handleMachnie}
defaultChecked
/>
Asset owner</label> 
)}          


{clientData.leadType == "Asset owner" && (
<label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="Product owner"
onChange={this.handleMachnie}
defaultChecked
/>
Product owner</label>
)}          

</Form.Group>
</center>
                       <Segment>

        


                       <Form>

                       <Form.Group widths='equal'>
                       <Form.Field>
                       <Header as="h4">TIN No. :</Header>
                  
                       <p>{tin}</p>
                     </Form.Field>
                     </Form.Group>


                     <Form.Field>
                     <Header as="h4">CST No. :</Header>
                     <p>{CST}</p>
                   </Form.Field>
                       
                       <Form.Field>
                       <Header as="h4">Pan No.:</Header>
                       <p>{panno}</p>
                       </Form.Field>
                       <div className="space"></div>
                     

                       <Form.Field>
                       <Header as="h4">Gst No.:</Header>
                       <p>{gstno}</p>
                       </Form.Field>
                       <div className="space"></div>
                     

                       <Form.Field>
                       <Header as="h4">ECC.:</Header>
                       <p>{ECC}</p>
                       </Form.Field>
                       <div className="space"></div>
                     
            
                       <Form.Field>
                       <Header as="h4">Excise Division:</Header>
                       <p>{Excise}</p>
                       </Form.Field>

                       <Form.Field>
                       <Header as="h4">Excise Collectorate:</Header>
                       <p>{Collectorate}</p>
                       </Form.Field>

                                           </Form>
                     <p style={{ color: "red" }}>{this.state.message}</p>
                       </Segment>
                       </Segment>
                         
                   </div>        
                           </Grid.Column>
                           <Grid.Column>
                           <div style={{marginTop:"100%",marginRight:"70%",marginLeft: "25%"}}>
                           <Icon name="share" size="big" onClick={()=>this.handleTransmute()}/>
                           {this.state.redirectToBilling && <Redirect to="/ViewBillindaddr" />}
                           </div>

                         
                           </Grid.Column>
                                    </Grid>
                                </div>
                                    
                                </Segment>
                                </Sidebar.Pusher>
                                </Sidebar.Pushable>
    
                      
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
  boxShadow: "0 0 0 1px #ffffff inset",
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
  

export default ViewTransmute
