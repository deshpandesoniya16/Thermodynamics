import React, { Component } from 'react';
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Button,Input,Container,Card,Rating,Dropdown,Header,Modal,List,Form ,TextArea, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
import {Route, Switch,Link, Redirect} from "react-router-dom"
//import SidebarUI from "./SidebarUI";
import Select from 'semantic-ui-react/dist/commonjs/addons/Select/Select';
import Search from 'semantic-ui-react/dist/commonjs/modules/Search/Search';

import escapeRegExp from "escape-string-regexp"
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

class BillingAddrList extends Component {

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
    bill:[]
    }

    
    componentDidMount(){           
    

if(JSON.parse(sessionStorage.getItem("Bill"))){

    let billaddr=JSON.parse(sessionStorage.getItem("Bill"))

    console.log("billlist",billaddr)

    this.setState({bill:billaddr})
}else{
    console.log("Nouser")
}
    
    }


    onChange = (address) =>{
console.log("Address is",address)
        this.setState({ address })
     
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





  handleCompany = e =>{
      this.setState({CompanyName:e.target.value})
  }


  handleBack = ()=>{
    this.setState({redirectToBack:true})
}

  handleTransmute = ()=>{
      this.setState({redirectToBilling:true})
  }


handleAddRemain=e=>{
    this.setState({
        AddRemain:e.target.value
    })

}

save=()=>{

    sessionStorage.setItem("InvoiceHistory",true)
      this.setState({redirectToPayment:true})


    fetch('http://35.161.99.113:9000/webapi/invoice/updatepayment', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
        body: JSON.stringify({
        dbname: JSON.parse(sessionStorage.dbname),
        invoice_id:this.state.qno,
        mode:this.state.mop,
        amount_paid:this.state.paidAmount,
        transno:""
    
    })
    }).then(data => {
     return data.json();
    }).then(data => {
     console.log("data",data.records)
    })


}

handleOpen = () => {
    this.setState({ modalOpen: true })
}
handleClose = () => this.setState({ modalOpen: false })

show = (size1, q) => {
    this.setState({ size1, open: true })
    console.log("id of data is", q)
   
console.log("company is",JSON.stringify(q))
let name=q.customer_name
let email=q.email_id
let mobileNo=q.mobile_number
let created_Date=q.date_time
let taxablevalue=q.taxable_value
let totalgst=q.total_gst
let igst=q.igst
let cgst=q.cgst
let sgst=q.sgst
let total=q.total
let qno=q.invoice_id
let paidAmount=q.amount_paid
let balance_due=q.balance_due
let mop=q.mode_of_payment

this.setState({
    name:name,
    email:email,
    mobileNo:mobileNo,
    created_Date:created_Date,
    taxablevalue:taxablevalue,
   totalgst:totalgst,
    igst:igst,
    cgst:cgst,
    sgst:sgst,
    total:total,
    qno:qno,
    paidAmount:paidAmount,
    balance_due:balance_due,
    mop:mop
})

fetch('http://35.161.99.113:9000/webapi/invoice/itemInvoice', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
},
    body: JSON.stringify({
    dbname: JSON.parse(sessionStorage.dbname),
    invoice_id:qno

})
}).then(data => {
 return data.json();
}).then(data => {
 console.log("item data",data.records)
 if(!data.records){
     console.log("not")
     this.setState({msg:"Data not available"})
 }else{
    this.setState({ItemList:data.records})
 }
setTimeout(() => {
    let k=0
    this.state.ItemList.map(i=>{
       k=k+parseFloat(i.qty)
    })
    console.log("qty is",k)
    this.setState({total_qty:k})
}, 1000);
})
}

show1 = (size1) => {
    this.setState({ size1, open1: true })
}



    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
         this.setState({ value: result.invoice_id})
        this.setState({SelectedResult:result})
    }

  handleSearchChange = (e, { value }) => {

      this.setState({ isLoading: true, value })

      setTimeout(() => {
          
          fetch('http://35.161.99.113:9000/webapi/invoice/history', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
      
                  dbname:  JSON.parse(sessionStorage.dbname),
                  invoice_id:this.state.value
                  })
              }).then(data => {
                  return data.json();
              }).then(data => {
                      console.log("view invoice",data)
                    
                     
                          let indata=data.invoice_records
                          if(!indata){
                              console.log("Nodata")
                             // this.setState({InvoiceList:[]})
                          }else {
                          setTimeout(() => {
                              
                              this.setState({InvoiceList:data.invoice_records})
                          }, 3000);
                        }
              })

              console.log("data",this.state.InvoiceList)
             
            }, 3000);
                    

                    
      setTimeout(() => {

         
    //       if (this.state.value.length < 1) return this.resetComponent()

    //          const re = new RegExp(_.escapeRegExp(this.state.value),'i')
    //       const isMatch = result => re.test(result.invoice_id)
    
    //   this.setState({
    //     isLoading: false,
    //       results: _.filter(this.state.InvoiceList, isMatch),
    //       })
          
         

      }, 4000)
      
    }


    updateQuery = query => {
        this.setState({ query: query.trim()})

        setTimeout(() => {

        fetch('http://35.161.99.113:9000/webapi/invoice/history', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
      
                  dbname:  JSON.parse(sessionStorage.dbname),
                  invoice_id:query
                  })
              }).then(data => {
                  return data.json();
              }).then(data => {
                      console.log("view invoice",data)
                    
                     
                          let indata=data.invoice_records
                          if(!indata){
                              console.log("Nodata")
                              this.setState({InvoiceList:[]})
                          }else {
                          setTimeout(() => {
                              
                              this.setState({InvoiceList:data.invoice_records})
                          }, 1500);
                        }
              })

              console.log("data",this.state.InvoiceList)
             
            }, 2500)
                   
        }


        handleBillAddress =e=>{
            this.setState({
                BillAddress:e.target.value
            })
            
        }

        handleBill = (billaddr) =>{
            this.state.bill.push({
               "BillAddress": billaddr
            })
            sessionStorage.setItem("Bill",JSON.stringify(this.state.bill))
            this.setState({billbackup: this.state.bill})
            console.log("handele bill is clicked",this.state.bill)
            let billcounter=this.state.bill.length
            console.log("handele bill is clicked",this.state.bill.length)
setTimeout(() => {
    
    console.log("handele bill is clicked",this.state.billbackup)
    this.setState({redirectToBilladdr:true})
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

    tin,
    CST,
    panno,ECC,Excise,Collectorate,bill,BillAddress
}=this.state



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

    
            <Link to="/BillingInfo">
            <Icon name="arrow left"/>
            </Link>
            <Header size='large'>Billing Address</Header> <br/>                   
                                <div className="content_border" />
                                <div className="purchase_form">
                                <Grid columns={2}>
                                        
                           <Grid.Column>

                           <List as='ul'>
                           {bill.map(i=>(
    <List.Item as='li'>{i.BillAddress}</List.Item>
))}
    </List>

                          
                           </Grid.Column>
                           <Grid.Column>
                         

                         
                           </Grid.Column>
                                    </Grid>
                                </div>
                                    
                    
                      
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
  

export default BillingAddrList
