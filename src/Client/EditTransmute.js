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

class EditTransmute extends Component {

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
        tin:"",
        CST:"",
        panno:"",
        gstno:"",
         ECC:"",
        Excise:"",
        Collectorate:"",
        isChecked:false,
        isProduct:false,
        isAsset:false,
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
                        if(clientData.leadType=="New Lead"){
                            this.setState({isChecked:true})
                        }else if(this.state.Machnie=="Asset owner"){
                            this.setState({isAsset:true})
                        }else if(this.state.Machnie=="Product owner"){
                            this.setState({isProduct:true})
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

    validateGSTIN = (gstin) => {
        let gst = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
        return gst.test(gstin);
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

    if(!this.state.tin || !this.state.CST || !this.state.panno || !this.state.gstno || !this.state.ECC || !this.state.Excise || !this.state.Collectorate || !this.state.Machnie){
        this.setState({open:true, msg:"All Fields Are Mandatory"})
    }else{
    sessionStorage.setItem("tin",this.state.tin)
    sessionStorage.setItem("cst",this.state.CST)
    sessionStorage.setItem("pan",this.state.panno)
    sessionStorage.setItem("gst",this.state.gstno)
    sessionStorage.setItem("ecc",this.state.ECC)
    sessionStorage.setItem("Excise",this.state.Excise)
    sessionStorage.setItem("collectorate",this.state.Collectorate)
sessionStorage.setItem("typeOfTransmute",this.state.Machnie)
      this.setState({redirectToBilling:true})
  }
}


handleClose = () => this.setState({ open: false })

        handleGst=e=>{
            console.log("gstnno",e.target.value)
            this.setState({gstno:e.target.value})

            setTimeout(() => {
                if (this.validateGSTIN(this.state.gstno)) {
                    this.setState({ gstno: this.state.gstno ,gstmsg:""})
                } else {
                    this.setState({ gstmsg: "Please Enter Valid GST No." })
                }
            }, 1000);
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
    panno,ECC,Excise,Collectorate,isChecked,isProduct,isAsset,clientData
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
               <p className="text_clr"> <Icon name="sidebar" />Transmute </p>
            </Menu.Item>          
            
        </Menu>
        <div className="content_border"></div>
        <Sidebar.Pushable as={Segment} attached="bottom" className="sidebar_hgt">
        
        <Side menuVisible={this.state.menuVisible}/>    
        
            <Sidebar.Pusher onClick={() => this.state.menuVisible && this.setState({ menuVisible: false })} dimmed={this.state.menuVisible}>
                <Segment>
    
                <center>
                <Modal open={open} onClose={this.handleClose}  basic size='small'>
                <Header icon='alert' content='Alert Messages' />
                <Modal.Content>
                  <Header><font color="#863577">{this.state.msg}</font></Header>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic color='red' inverted>
                    <Icon name='remove' onClick={()=>this.handleClose()} /> No
                  </Button>
                </Modal.Actions>
              </Modal>
              </center> 
                            
                                <div className="purchase_form">
                                <Grid columns={3}>
                                        
                           <Grid.Column>
                           
                           <div style={{marginTop:"100%",marginLeft:"80%"}}>
                           <Link to="/EditClient">
                           <Icon name="reply" color="black" size="big" />
                          </Link>
                           </div>

                           </Grid.Column>
                           <Grid.Column>
                           <div  style={{height:"830px",width:"139%",marginLeft: "-14%"}}>
                           <Card link fluid>
                       <Segment>
                       <center>
                       <Icon name="add user" size="massive"/>
                       </center>

<center>





<Form.Group inline widths={3}>

 {clientData.leadType == "New Lead" ?(
<label htmlFor="radio1">          
<input type="radio"
  id="radio1"
  name="radio1"
  value="New Lead"
  onChange={this.handleMachnie} 
  defaultChecked
/>
New Lead</label>   
 ):(
<label htmlFor="radio1">          
<input type="radio"
  id="radio1"
  name="radio1"
  value="New Lead"
  onChange={this.handleMachnie}/>
  New Lead</label>   
 )}
              
{clientData.leadType == "Asset owner" ?(
<label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="Asset owner"
onChange={this.handleMachnie}
defaultChecked
/>
Asset owner</label>               
):(
<label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="Asset owner"
onChange={this.handleMachnie}
/>
Asset owner</label>
)}

{clientData.leadType == "Product owner" ?(
<label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="Product owner"
onChange={this.handleMachnie}
defaultChecked
/>
Product owner</label>
):(
<label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="Product owner"
onChange={this.handleMachnie}
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
                  
                       <input placeholder='Enter Tin No.' 
                       type='text'
                       required
                       value={tin}
                     onChange={this.handleTin}
                     maxLength="11"
                       />
                     </Form.Field>
                     </Form.Group>


                     <Form.Field>
                     <Header as="h4">CST No. :</Header>
                     <div className="space"></div>
                     <input placeholder='Enter CST No.' 
                     type='tel'
                     value={CST}
                     onChange={this.handleCST}
                     required
                     />
                   </Form.Field>
                       
                       <Form.Field>
                       <Header as="h4">Pan No.:</Header>
                         <div className="space"></div>
                         <input placeholder='Enter Pan No. number' 
                         value={panno}
                         onChange={this.handlePan}
                       
                         maxLength="10"
                         />
                       </Form.Field>
                       <div className="space"></div>
                       <p style={{ color: "red" }}>{this.state.panmsg}</p>

                       <Form.Field>
                       <Header as="h4">gst No.:</Header>
                         <div className="space"></div>
                         <input placeholder='Enter Pan No. number' 
                         value={gstno}
                         onChange={this.handleGst}
                       
                         maxLength="15"
                         />
                       </Form.Field>
                       <div className="space"></div>
                       <p style={{ color: "red" }}>{this.state.gstmsg}</p>
                     
                       <Form.Field>
                       <Header as="h4">ECC.:</Header>
                         <div className="space"></div>
                         <input placeholder='Enter ECC' 
                         value={ECC}
                         onChange={this.handleECC}
                       
                         maxLength="10"
                         />
                       </Form.Field>
                       <div className="space"></div>
                     
            
                       <Form.Field>
                       <Header as="h4">Excise Division:</Header>
                         <div className="space"></div>
                         <input type="text" placeholder='Excise Division' 
                         value={Excise}
                         onChange={this.handleExcise}
                         />
                       </Form.Field>

                       <Form.Field>
                       <Header as="h4">Excise Collectorate:</Header>
                         <div className="space"></div>
                         <input type="text" placeholder='Excise Collectorate' 
                         value={Collectorate}
                         onChange={this.handleCollectorate}
                         />
                       </Form.Field>
                        {/*
                       <center><Button primary onClick={()=>this.handleSubmit()}>Submit</Button></center>
                     */}
                       </Form>
                     <p style={{ color: "red" }}>{this.state.message}</p>
                       </Segment>
                       </Segment>
                         </Card>
                   </div>        
                           </Grid.Column>
                           <Grid.Column>
                           <div style={{marginTop:"100%",marginRight:"70%",marginLeft: "25%"}}>
                           <Icon name="share" size="big" onClick={()=>this.handleTransmute()}/>
                            {this.state.redirectToBilling && <Redirect to="/EditBillingInfo" />}
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
  

export default EditTransmute
