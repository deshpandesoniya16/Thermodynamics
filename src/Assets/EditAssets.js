import React, { Component } from "react"
import Side from "../component/Sidenav"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Sidebar,
  Search,
  Divider,
  Container,
  Grid,
  Rating,
  Card,
  List,
  Radio,
  Segment,
  Progress,
  Popup,
  Button,
  TextArea,
  Menu,
  Image,
  Icon,
  Header,
  Input,
  Table,
  Modal,
  Form
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import Carousel from "nuka-carousel"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import SmartUpload from "../component/SmartUpload"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { Asset_fbs } from "../component/base"
import  ErrorModal from "../component/ErrorModal";

import {
  vendorGodview,
  verticallist,
  addVertical,
  VendorBasedProduct,
  StakeList,
  StakeImage,
  updateStack,
  grouplist,grpBasedsubgrp,fuelTypelist,fuelNamelist,serieslist,
  verticalBasedgrp
} from "../component/Api"
import SuccessModal from "../component/SuccessModal"
import StarRatingComponent from 'react-star-rating-component';
import RawCarousel from "../component/RawCarousel"


import {
  PageContainer,
  IconDiv,
  HeadingDiv,
  HeadingText,
  FormDiv,
  FormBorder,
  MainDiv,
  Form1Div,
  IconDivShare,
  FormText,
  ContentArea,
  Form2Div,
  TixyContent,
  PageContainer2,
  TableContent,
  Box,
  Box2,
  MainDiv2,
  MainDivHolder
} from "../styledComps.js"



class EditAssets extends Component {
  state = {
    menuVisible: false,
    lastAction: moment(),
    Name: "",
    Address: "",
    Phno: "",
    discription: "",
    lastsolved: "",
    search: "",
    isLoading: false,
    value: "",
    results: [],
    SelectedResult: {},

    isOpen: false,
    status: "",
    solution: "",
    clientData: [],
    rating: 0,
    maxRating: 0,
    Solvediscription: "",

    isLoadingAssign: false,
    valueAssign: "",
    resultsAssign: [],
    SelectedResultAssign: {},
    isOpenHold: false,
    isOpenReject: false,
    isOpenClose: false,
    AssignedUser: [],
    ProductType: "",
    group: "",
    Machnie: "",

    aname: "",
    srno: "",


    startDate:  moment(),
    ToDate: moment(),
    doc: moment(),

    TotalPrice: "",
    pname: "",
    assetName: "",
    isOpenAsset: false,
    ptype: "",
    qty: true,
    AssetData: [],
    ProductData: [],
    asset_status: "",
    isopen:false,
    Vname:"",
    unitPrice:"",

    AssetImage:[],
    uploadedfileurl:"",

    clientData:[],
    owner:"",
    AssetDetails:{},
    VendorData:[],
    assetId:"",
    isSucess:false,
    SuccessMsg:"",


    StackData:[],
    Stackholderdata:[],
    StackListData:[],
    stackImages:[],
    asid:"",

    next:0,
    prev:0,
    count:0,

    auname:"",
    cid:"",
    vid:"",
    vendor_name:"",ProductUpdate:false,vendorUpdate:false,
    ImageData:[],
    ImageData1:[],
    prevdisable:true,
    nxtdisable:true,
    verticalData:[],
    vertical:"",
    serialCode:"",
    groupData:[],
    subGroupData:[],
    grpid:"",
    sgrpid:"",
    GrupName:"",
    fuelTypeData:[],
    fuelNameData:[],
    fuelname:"",
    ftype:"",
    seriesData:[],
    product_name:"",
    finalsrno:"",
    fuelCombuster:"",
    fuelFieding:"",
    verticalName:"",
    disableN:false,
    disableNS:false,
    disableI:false,
    disableNI:false,
    checkI:false,
    checkNI:false,
    astatusn:''
  }


  listVertical = () =>{

    fetch(verticallist, {
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
         console.log("vertical list",data.records)
         if(data.records){
           this.setState({verticalData:data.records})
           let Asset = JSON.parse(sessionStorage.getItem("editTicket"))
           let vid
           data.records.map(i=>{
            if(i.id == Asset.vertical){
              console.log('vertical', i.vertical);
              console.log('Asset.vertical', Asset.vertical);
              vid=i.id            
            }
          })
          this.listGroup(vid)
         }else{
           console.log("No vertical")
           this.setState({verticalData:[]})
         }
    })

  }


  listSeries= ()=>{

    fetch(serieslist, {
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
       console.log("Series Name List ",data.records)
       if(data.records){
         this.setState({seriesData:data.records})

       }else{
         console.log("No Series Name")
         this.setState({seriesData:[]})
       }
  })
  }




  listFuelType = () =>{

    fetch(fuelTypelist, {
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
         console.log("Fuel Type list",data.records)
         if(data.records){
           this.setState({fuelTypeData:data.records})

         }else{
           console.log("No Fuel Type ")
           this.setState({fuelTypeData:[]})
         }
    })

  }



  listFuelName = () =>{

    fetch(fuelNamelist, {
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
         console.log("Fuel Name list",data.records)
         if(data.records){
           this.setState({fuelNameData:data.records})

         }else{
           console.log("No Fuel Type ")
           this.setState({fuelNameData:[]})
         }
    })

  }


  listGroup = (id) =>{
    fetch(verticalBasedgrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vid:id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(async data => {
        console.log("data", data)
        console.log("Group List ", data.records)
        if (data.records) {
          await this.setState({ groupData: data.records })
          let user = JSON.parse(sessionStorage.getItem("editTicket"))
          let gid = ''
          data.records.filter(i=>{
            if(i.name == user.groupName){
              console.log('user.groupName', user.groupName);
              gid = i.id
              console.log('gid', gid);
            }
          })
          this.handleGroup(gid)
        } else {
          console.log("No Group")
          this.setState({ groupData: [] })
        }
      })

  }


  listSubGroup = (id) =>{
    fetch(grpBasedsubgrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        grpid:id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Sub Group List ", data.records)
        if (data.records) {
          this.setState({ subGroupData: data.records })
          this.handleSubgrpID(this.state.sgrpid)

        } else {
          console.log("No Sub Group")
          this.setState({ subGroupData: [] })
        }
      })

  }

  vendorGodview=()=>{

    fetch(vendorGodview, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
        })
    }).then(data => {
        return data.json();
    }).then(async data => {
         console.log("data",data)
         console.log("Vendor data",data.records)
         if(data.records){
          await this.setState({VendorData:data.records})

          let pid
          this.state.VendorData.map(i=>{
            if(i.id == this.state.Vname){
              console.log('this.state.vid',  this.state.Vname);
              pid=i.id
              // this.forceUpdat
            }
          })
          this.vendorBasedProduct(pid)
         }else{
           console.log("No vendor")
           this.setState({VendorData:[]})
         }
    })
  }


vendorBasedProduct=(vid)=>{
  
  fetch(VendorBasedProduct, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      vendorId:vid,
    })
}).then(data => {
    return data.json();
}).then(data => {
     console.log("data",data)
     console.log("Product data",data.records)
     if(data.records){
       this.setState({ProductData:data.records})
   
     }else{
       console.log("No Product")
       this.setState({ProductData:[],})
     }
})

}



  stackImages=(sid)=>{

    console.log("Stack holder data",this.state.Stackholderdata)
 window.dispatchEvent(new Event('resize'));
    fetch(StakeImage, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assetStake:sid
      })
  }).then(data => {
      return data.json();
  }).then(data => {
       console.log("Stack images data",data)
       console.log("Stack images",data.records)
       let pimages = data.records
       if(pimages && pimages.length >= 0){
         this.setState({ ImageData: data.records })
       }
      else{
         //sessionStorage.setItem("lead_Img", JSON.stringify(data.records))
       
         this.setState({ ImageData: []})
         console.log("No Images is available")
       }
     })
}




  componentDidMount() {
    
 
    let Asset = JSON.parse(sessionStorage.getItem("editTicket"))
    let sid;
    if (Asset) {
      console.log("In User List", Asset)
      let splitSerial;
      let splitSrno = Asset.serialNumber
      console.log('splitSrno', splitSrno);
       splitSerial = splitSrno.substring(0,3); 
      console.log('splitSerial', splitSerial);
      let splitNo = splitSrno.substring(3); 
       console.log('splitNo', splitNo);
  
     
      this.setState({
      AssetDetails:Asset,
      assetId:Asset.id,
      ptype:Asset.pid,
      vid:Asset.vid,
      vendor_name:Asset.vendor_name,
      product_name:Asset.name,
      Vname:Asset.vid,
      atype:Asset.asset_type,
      unitPrice:Asset.unitPrice,
      srno:splitNo,
      rating:Asset.star,
      Vertical:Asset.vertical,
      GrupName:Asset.groupName,
      sgrpid:Asset.subGroupName,
      seriesId:Asset.series,
      serialCode:splitSerial
      })


      this.vendorGodview();


    } else {
      console.log("No User here")
    }
    console.log("user is",this.state.prduct)

    console.log("asset id  is",Asset.id)



    fetch(StakeList, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assetId:Asset.id
      })
  }).then(data => {
      return data.json();
  }).then(data => {
       console.log(" data Stack data",data)
       console.log("Stack data",data.records)
       if(data.records){
         let Stackholderdata1 = data.records

         this.setState({Stackholderdata:data.records})
        
         let nxtdisable = true

         if(data.records.length>1){
           nxtdisable = false
         }
        
           sid=Stackholderdata1[0].id

          let date = this.state.Stackholderdata[0].fromDate
          let fdates = moment(date,'DD-MM-YYYY')

          console.log("fdates is",fdates)
          console.log("sid",sid)
            // let fdate= i.fromDate
            // let date = moment(i.fromDate).format('DD-MM-YYYY')
            // console.log("From date is",date)

           // 

          //  if(Stackholderdata1[0].service == "IN Service"){
          //     return this.setState({checkI:true})
          //  }else{
          //   return this.setState({checkI:false})
          //  }

           this.setState({  
                          asid:Stackholderdata1[0].id,
                          assetId :Stackholderdata1[0].assetId,
                          cid:Stackholderdata1[0].clientId,
                          auname:Stackholderdata1[0].assignee,
                          valueAssign:Stackholderdata1[0].assignee,
                          value:Stackholderdata1[0].company_name,
                          TotalPrice:Stackholderdata1[0].totalPrice,
                          startDate:moment(Stackholderdata1[0].fromDate,'DD-MM-YYYY'),
                          ToDate:moment(Stackholderdata1[0].toDate,'DD-MM-YYYY'),
                          aqty:Stackholderdata1[0].stockQty,
                          asset_status:Stackholderdata1[0].service,
                          astatus:Stackholderdata1[0].installed,
                          astatusn:Stackholderdata1[0].installed,
                          asset_statusN:Stackholderdata1[0].service,
                          Name:Stackholderdata1[0].company_name,
                          Phno:Stackholderdata1[0].number,
                          owner:Stackholderdata1[0].owner,
                          doc:moment(Stackholderdata1[0].doc,'DD-MM-YYYY'),
                          ftype:Stackholderdata1[0].fuel_Type,
                          fuelname:Stackholderdata1[0].fuelName,
                          fuelFieding:Stackholderdata1[0].fuelFieding,
                          fuelCombuster:Stackholderdata1[0].fuelCombuster,
                          nxtdisable
                        })
    
       
     
       }else{
         console.log("No Stackholder")
         this.setState({Stackholderdata:[]})
       }

       console.log("asid",this.state.asid)
       

  })



  setTimeout(() => {
    console.log("asid in stack image",this.state.asid)
    fetch(StakeImage, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assetStake:this.state.asid
      })
  }).then(data => {
      return data.json();
  }).then(data => {
       console.log("Stack images data",data)
       console.log("Stack images",data.records)
       let pimages = data.records
       if(pimages && pimages.length >= 0){
         this.setState({ ImageData: data.records })
       }
      else{
         //sessionStorage.setItem("lead_Img", JSON.stringify(data.records))
       
         this.setState({ ImageData: []})
         console.log("No Images is available")
       }
  })
  }, 1500)

 // this.stackImages(sid);



    fetch('http://35.161.99.113:9000/webapi/t_client/list ', {
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
       console.log("client data",data.records)
       if(data.records){
         this.setState({clientData:data.records})

       }else{
         console.log("No Client")
         this.setState({clientData:[]})
       }
  })


  fetch('http://35.161.99.113:9000/webapi/t_login/list ', {
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
         console.log("Assigned User",data.records)
         if(data.records){
           this.setState({AssignedUser:data.records})

         }else{
           console.log("No Assigned user")
           this.setState({AssignedUser:[]})
         }
    })


    fetch("http://35.161.99.113:9000/webapi/t_asset/t_typeList ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Asset  data", data.records)
        if (data.records) {
          this.setState({ AssetData: data.records })
          let astype;
          data.records.map(i=>{
            if(i.type == Asset.asset_type){
              astype= i.type
            }
          })

          this.setState({atype:astype})

        } else {
          console.log("No Assets ")
          this.setState({ AssetData: [] })
        }
      })

    
    
      this.listVertical();
    this.listGroup();
    this.listFuelType();
    this.listFuelName();
    this.listSeries();


    
  }

  handleChange = (e, { value }) => this.setState({ value })

 
  handleMachnie = e => {
    let name= e.target.value
    // if(name == "IN Service"){
    //   this.setState({disableI:true,disableNI:false})
    // }
    console.log("product Group", e.target.value)
    this.setState({
      asset_status: e.target.value,
      assetmsg:""

      // checked: this.state.checked
    })
  }

  handleMachnieN = e => {
    let name= e.target.value
    // if(name == "Not in Service"){
    //   this.setState({disableI:false,disableNI:true,checkI:false})
    // }
    console.log("product Group", e.target.value)
    this.setState({
      asset_statusN: e.target.value,
      assetmsg:""

      // checked: this.state.checked
    })
  }

  handleAssetStatus = e => {
    let name= e.target.value
    // if(name == "Installed"){
    //   this.setState({disableN:true,disableNS:false})
    // }
    console.log("handle A status", e.target.value)
    this.setState({ astatus: e.target.value })
  }


  handleAssetStatusN = e => {
    let name= e.target.value
    // if(name == "Not Installed"){
    //   this.setState({disableNS:true,disableN:false,checkNS:true })
    // }
    console.log("handle A status N", e.target.value)
    this.setState({ astatusn: e.target.value })
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false, isOpenReject: false })
    }, 2000)
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
      isOpenAsset: false,
      isOpenReject: false,
      isOpenClose: false,
      isopen:false,
      isSucess:false
    })
    clearTimeout(this.timeout)
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value })
  }

 

  handlelastAction = e => {
    this.setState({ lastAction: e.target.value })
  }

  validateNumber = input => {
    if (input === "") {
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
  }

  handlephno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ Phno: e.target.value })
    }
  }

 

  

  //Search
  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.company_name })
    this.setState({ SelectedResult: result })
    setTimeout(() => {
      // let active=true
      console.log("Selected",this.state.SelectedResult)
      if (this.state.SelectedResult) {
        this.setState({
          cid:this.state.SelectedResult.cid,
          Name: this.state.SelectedResult.company_name,
          Phno: this.state.SelectedResult.number,
          Address: this.state.SelectedResult.address,
       
          owner :this.state.SelectedResult.owner
        })
      }
    }, 1000)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value: value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.company_name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.clientData, isMatch)
      })
    }, 500)
  }

  //AssignedUser
  resetComponentAssign = () => {
    this.setState({
      isLoadingAssign: false,
      resultsAssign: [],
      valueAssign: ""
    })
  }

  handleResultSelectAssign = (e, { result }) => {
    this.setState({ valueAssign: result.name,auname:result.name })
    this.setState({ SelectedResultAssign: result })

    setTimeout(() => {
      // let active=true
      console.log("Selected",this.state.SelectedResultAssign)
      if (this.state.SelectedResultAssign) {
        this.setState({
          auname:this.state.SelectedResultAssign.name,
        })
      }
    }, 1000)

  }

  handleSearchChangeAssign = (e, { value }) => {
    this.setState({ isLoadingAssign: true, valueAssign: value })

    setTimeout(() => {
      if (this.state.valueAssign.length < 1) return this.resetComponentAssign()

      const re = new RegExp(_.escapeRegExp(value), "i")
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoadingAssign: false,
        resultsAssign: _.filter(this.state.AssignedUser, isMatch)
      })
    }, 500)
  }

  handleAddAssets = () => {
    console.log("Submit is called")
    if (!this.state.Vname) {
      this.setState({ assetmsg: "Please Select Vendor", isAsset: true })
    } else if (!this.state.ptype) {
      this.setState({ assetmsg: "Please Select Product", isAsset: true })
    } else if(this.state.Vertical.length <= 0) {
      this.setState({ assetmsg: "Please Select Vertical", isAsset: true })
    }else if(this.state.GrupName.length <=0){
      this.setState({ assetmsg: "Please Select Group Name", isAsset: true })
    }
    else if(this.state.sgrpid.length <=0){
      this.setState({ assetmsg: "Please Select Sub Group Name", isAsset: true })
    }else if(this.state.atype.length <=0){
       this.setState({ assetmsg: "Please Select Asset Type", isAsset: true })
    }else if(this.state.seriesId.length <=0){
       this.setState({ assetmsg: "Please Select Series", isAsset: true })
    }else if(this.state.finalsrno.length <=0){
       this.setState({ assetmsg: "Please Enter Serial No.", isAsset: true })
    }else{

      fetch("http://35.161.99.113:9000/webapi/t_asset/t_editAsset", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assetId:this.state.assetId,
          productId: this.state.ptype,
          vendorId:this.state.Vname,
          asset_type:this.state.atype,
          serialNumber: this.state.finalsrno,
          unitPrice:this.state.unitPrice,
          lastActionTime: moment(this.state.lastAction).format("DD-MM-YYYY"),
          star : this.state.rating,
          vertical:this.state.Vertical,
          groupName:this.state.GrupName,
          subGroupName:this.state.sgrpid,
          series:this.state.seriesId
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("data", data.records)

          if(data.message == "Asset Update"){
            this.setState({ assetmsg: "Asset is Update" })
         
          }else {

            this.setState({msg:"Something went wrong !!!"})

          }
          
        })
    }
  }

  UpdateStackholder = () => {

    if (this.state.cid <= 0) {
      this.setState({ msg: "Please Select Client", isopen: true })
    } else if (this.state.valueAssign.length <= 0) {
      this.setState({ msg: "Please Assign Employee", isopen: true })
    }else{
    // if(!this.state.assetId){
    // //   this.setState({msg:"Please Enter Asset Id",isopen:true})
    // if(!this.state.SelectedResult.id){
    //   this.setState({msg:"Please Select Client",isopen:true})
    // }else if(!this.state.SelectedResultAssign.name){
    //   this.setState({msg:"Please Assign Employee",isopen:true})
    // }else if(!this.state.TotalPrice){
    //   this.setState({msg:"Please Enter Total Price",isopen:true})
    // }else if(!this.state.aqty){
    //   this.setState({msg:"Please Enter Qty.",isopen:true})
    // }else if(!this.state.asset_status){
    //   this.setState({msg:"Please Select asset status",isopen:true})
    // }else if(!this.state.astatus){
    //   this.setState({msg:"Please Select Asset Service Status",isopen:true})
    // }else{
    fetch("http://35.161.99.113:9000/webapi/t_asset/t_editStakeAsset", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stakeId:this.state.asid,
        assetId: this.state.assetId,
        clientId: this.state.cid,
        assignee: this.state.auname,
        fromDate: moment(this.state.startDate).format("DD-MM-YYYY"),
        toDate: moment(this.state.ToDate).format("DD-MM-YYYY"),
        totalPrice: this.state.TotalPrice,
        qty: this.state.aqty,
        lastActionTime: this.state.lastAction,
        installed:this.state.astatus,
        service:this.state.asset_status,
        doc:moment(this.state.doc).format("DD-MM-YYYY"),
        fuelType:this.state.ftype,
        fuelName:this.state.fuelname,
        fuelFieding:this.state.fuelFieding,
        fuelCombuster:this.state.fuelCombuster,
        imageData:this.state.ImageData1,
        stakeId:this.state.asid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("data", data.records)
        if(data.message == "Asset Stakeholder Updated"){
          this.setState({isSucess:true,SuccessMsg:"Asset Stakeholder Updated"})
          this.empty();
          setTimeout(() => {
            this.setState({isSuccess:false,redirectToAsset: true})
          }, 1200)
        }else{

          this.setState({ msg: "Someting went wrong !!!",error:true,isopen:true })
        }
      })
 // }
}
}

empty = () => {
  this.setState({
    asset_status: " ",
    astatus: " ",
    Name: "",
    Phno: "",
    aqty: "",
    TotalPrice: "",
    value: "",
    owner: "",
    valueAssign: "",
    startDate: moment(),
    ToDate: moment(),
    doc: moment(),
    AssetImage: [],
    progress: 0,
    isUploading: false,
    uploadedfileurl: "",
    uploadedfileName: "",
    fuelCombuster:"",
    fuelFieding:""
  })
}


 
handleChangeUsername = event =>
    this.setState({ username: event.target.value })
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
  handleProgress = progress => this.setState({ progress })
  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }
  handleUploadSuccess = filename => {
    this.setState({
      uploadedfileName: filename,
      progress: 100,
      isUploading: false
    })
    Asset_fbs.child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.ImageData1.push(url)
        this.state.ImageData.push({"link":url})
        this.setState({ uploadedfileurl: url })
      })

    console.log("asset images are", this.state.ImageData)
    setTimeout(() => {
      if (this.state.progress == 100) {
        this.setState({ filename: "", progress: 0 })
      } else {
        console.log("error in upload")
      }
    }, 1000)
  }


  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  handleAssetName = e => {
    this.setState({ aname: e.target.value,msg1:"" })
  }

  handleSrno = e => {
    let serialno = e.target.value
    let tuid = this.state.serialCode+serialno
    console.log(tuid)



   //  var NumVal = 1;
   //  var tradspec1 = "test1";
   //  var tradspec2 = "test2";
   //  var tradspec3 = "test3";

   //  alert(window["tradspec" + NumVal.toString()]);

   this.setState({ srno: e.target.value, msg1: "",finalsrno:tuid })
  }

  handleDate = date => {
    this.setState({ doc: date,msg1:"" })
  }

  handleToDate = date => {
    this.setState({ ToDate: date,msg1:"" })
  }

  handleFromDate = FromDate => {
    this.setState({ startDate: FromDate ,msg1:""})
  }

  handleTotalPrice = e => {
    this.setState({ TotalPrice: e.target.value ,msg1:""})
  }

  handleAsset = e => {
    this.setState({ assetName: e.target.value ,msg1:""})
  }

  handleAddAsset = () => {
    if(this.state.assetName.length < 0){
      this.setState({msg1:"Please Enter Asset Type Name",isopen:true})
    }else{

    fetch("http://35.161.99.113:9000/webapi/t_asset/t_typeAdd ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: this.state.assetName
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("data", data.records)

        if (data.message == "Manifacturer added") {
          this.setState({amsg:data.message})
          setTimeout(()=>{
            this.assetTypeList();
           this.setState({isOpenAsset:false})
          },1000)
        } else {
          this.setState({amsg:"Something went wrong !!!!!!!"})
          console.log("Something went wrong !!!!!!!")
        }
      })
    }
  }

  handlePname = e => {
    this.setState({ pname: e.target.value ,msg1:""})
  }

  handleAddProduct = () => {
    //api
    //  this.setState({pname:e.target.value})
  }

  addProduct = () => {
    this.setState({ isOpen: true })
  }

  addAsset = () => {
    this.setState({ isOpenAsset: true })
  }

  handleProducts = e => {
    console.log("i is", e.target.value)
    let pid = e.target.value

    if(!pid){
     return  pid=''
    }
    this.state.ProductData.filter(i=>{
      if(i.id == pid){
        this.setState({product_name:i.name})
      }
    })
 
    this.setState({ ptype:pid ,msg1:"",assetmsg:""})
  }

  handleAssetQty = e => {
    let tp = this.state.unitPrice * e.target.value
    this.setState({ aqty: e.target.value,TotalPrice:tp, qty: false,msg1:"" })
  }

  handlePinfo = i => {
    console.log("name is", i)
  }

  handleVname=e=>{
    let vid = e.target.value

    this.state.VendorData.filter(i=>{
      if(i.id == vid)
      this.setState({vendor_name:i.vendor_name})
    })

    this.setState({Vname:e.target.value, assetmsg:""})

    fetch(VendorBasedProduct, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vendorId:vid,
      })
  }).then(data => {
      return data.json();
  }).then(data => {
       console.log("data",data)
       console.log("Product data",data.records)
       if(data.records){
         this.setState({ProductData:data.records})
     
       }else{
         console.log("No Product")
         this.setState({ProductData:[],ptype:''})
       }
  })

 

  }

  handleUnitPrice=e=>{
    let tp = this.state.aqty * e.target.value
    this.setState({unitPrice:e.target.value,TotalPrice:tp,msg1:""})
  }

  ProductDetails=(i)=>{
console.log("Product is",i)
}




Previous=async()=>{

  let prevdisable = false
  // let length = this.state.Stackholderdata.length
  // let index = 1
  

  if ( this.state.Stackholderdata.length > 0)
  {

  let count1=this.state.count
  console.log("count in prev in if ",count1,this.state.count)

 if(count1 > 0 && count1 < this.state.Stackholderdata.length){
  count1--
 }
 else{
  count1 = 0

   this.setState({msg:"Previous Limit is Exceded",isopen:true})
  // console.log(this.state.Stackholderdata[next])

 }

 if(count1==0){
   prevdisable=true
 }
 console.log(this.state.Stackholderdata[count1])

 this.setState({count:count1})

 this.setState({  
  asid:this.state.Stackholderdata[count1].id,
  assetId :this.state.Stackholderdata[count1].assetId,
  auname:this.state.Stackholderdata[count1].assignee,
  valueAssign:this.state.Stackholderdata[count1].assignee,
  cid:this.state.Stackholderdata[count1].clientId,
  value:this.state.Stackholderdata[count1].company_name,
  TotalPrice:this.state.Stackholderdata[count1].totalPrice,
  startDate:moment(this.state.Stackholderdata[count1].fromDate,'DD-MM-YYYY'),
  ToDate:moment(this.state.Stackholderdata[count1].toDate,'DD-MM-YYYY'),
  aqty:this.state.Stackholderdata[count1].stockQty,
  asset_status:this.state.Stackholderdata[count1].service,
  astatus:this.state.Stackholderdata[count1].installed,
  doc:moment(this.state.Stackholderdata[count1].doc,'DD-MM-YYYY'),
  Name:this.state.Stackholderdata[count1].company_name,
  Phno:this.state.Stackholderdata[count1].number,
  owner:this.state.Stackholderdata[count1].owner,
  nxtdisable: false,
  prevdisable
})

await 
console.log("assert status is ",this.state.asset_status)
console.log("assert status  service is ",this.state.astatus)

this.stackImages(this.state.Stackholderdata[count1].id);
// let pc =0
// for(let i=0;i<this.state.Stackholderdata.length;i++){
//   if(this.state.Stackholderdata[i] <= pc){
//     pc++

//     this.state.StackListData.push(this.state.Stackholderdata[i])
//   }
//}


}
else
{
   // Modal 
   this.setState({msg:"Previous Limit is Exceded",isopen:true})
}

}

Next= async()=>{
  let count2=this.state.count
  console.log('count2', count2);
  let nxtdisable = false
  
  console.log('this.state.Stackholderdata.length', this.state.Stackholderdata.length);
  
  if ( this.state.Stackholderdata.length > 0)
  {
    if(count2 >= 0 && count2 < this.state.Stackholderdata.length){
      count2++
      console.log("Count in if is",count2)
     }
     else{
      count2 = 0
      console.log("Count in else")
      //this.setState({msg:"Next Limit is Exceded",isopen:true})

     // console.log(this.state.Stackholderdata[next])
     }

 console.log("in the next",this.state.Stackholderdata[count2])
 
 let a = count2
     console.log('a', a);
  let b = this.state.Stackholderdata.length-1  
  console.log('b', b);
  if(a==b){
    nxtdisable=true
    console.log('nxtdisable', nxtdisable);
  }
 //this.setState({count :count2})

  this.setState({  
  asid:this.state.Stackholderdata[count2].id,
  assetId :this.state.Stackholderdata[count2].assetId,
  auname:this.state.Stackholderdata[count2].assignee,
  valueAssign:this.state.Stackholderdata[count2].assignee,
  cid:this.state.Stackholderdata[count2].clientId,
  value:this.state.Stackholderdata[count2].company_name,
  TotalPrice:this.state.Stackholderdata[count2].totalPrice,
  startDate:moment(this.state.Stackholderdata[count2].fromDate,'DD-MM-YYYY'),
  ToDate:moment(this.state.Stackholderdata[count2].toDate,'DD-MM-YYYY'),
  aqty:this.state.Stackholderdata[count2].stockQty,
  asset_status:this.state.Stackholderdata[count2].service,
  astatus:this.state.Stackholderdata[count2].installed,
  doc:moment(this.state.Stackholderdata[count2].doc,'DD-MM-YYYY'),
  Name:this.state.Stackholderdata[count2].company_name,
  Phno:this.state.Stackholderdata[count2].number,
  owner:this.state.Stackholderdata[count2].owner,
  count: count2,
  prevdisable: false,
  nxtdisable
})

await
this.stackImages(this.state.Stackholderdata[count2].id);

  }
  else
  {
    console.log("next limit")
    this.setState({msg:"Next Limit is Exceded",isopen:true})
    //Warning Model
  }
}

handeleProductUpdate = () =>{

  this.setState({ProductUpdate :true})
}

handeleVendorUpdate =() =>{
  this.setState({vendorUpdate :true})
}


onStarClick=(nextValue, prevValue, name)=> {
  this.setState({rating: nextValue});
}

// handleVertical=e=>{
//   let vname = e.target.value
//   let vid
//   this.state.verticalData.map(i=>{
//     if(i.vertical == vname){
//         vid=i.id
//     }
//   })
//   this.listGroup(vid)
//   this.setState({Vertical:e.target.value,isHOD:true})
// }


handleSerialCode=e=>{
  this.setState({serialCode:e.target.value})
}

handleAssetApplication = e => {
  this.setState({ assetApplication: e.target.value })
}

handleGroup=gid=>{

  // let gid =e.target.value
  console.log('gid', gid);

  this.state.groupData.filter(i=>{
    if(i.id == gid){
      this.setState({GrupName:i.name})
    }
  })

  this.listSubGroup(gid);
  this.setState({grpid:gid})


}

handleSubgrpID=sgid=>{
 // let sgid=e.target.value
  this.setState({sgrpid:sgid})
}



handleFuelType=e=>{
  let fuelType=e.target.value
  this.setState({ftype:fuelType})
}

handleFuelName=e=>{
  let fname= e.target.value
  this.setState({fuelname:fname})
}

handleSelectSeriesId=e=>{
  this.setState({seriesId:e.target.value})
}

handleVertical=e=>{
  let vname = e.target.value
    let vid
    this.state.verticalData.map(i=>{
      if(i.vertical == vname){
          vid=i.id
          this.setState({verticalName:i.vertical})
      }
    })
    this.listGroup(vid)
  this.setState({Vertical:vname,isHOD:true})
}


handlefuelFieding=e=>{
  this.setState({fuelFieding:e.target.value})

}

handleFuelCombuster=e=>{
this.setState({fuelCombuster:e.target.value})
}

handleAssets = e => {
  console.log("Assets Value are", e.target.value)
  this.setState({ atype: e.target.value })
}




  render() {
   

    console.log("props", this.props)

    let {
      lastAction,
      Name,
      Phno,
      Address,
      discription,
      lastsolved,
      search,
      value,
      isLoading,
      results,
      SelectedResult,
      status,
      clientData,
      Solvediscription,
      rating,
      isLoadingAssign,
      valueAssign,
      resultsAssign,
      isOpen,
      aname,
      srno,
      ToDate,
      startDate,
      TotalPrice,
      atype,
      isOpenAsset,
      pname,
      assetName,
      ptype,
      aqty,
      qty,vid,
      AssetData,assetId,isSucess,VendorData,asset_status,astatus,stackImages,
      ProductData,isopen,Vname,unitPrice,AssetImage,uploadedfileurl,owner,
      ImageData,prevdisable,nxtdisable,Vertical,verticalData,assetApplication,
      groupData,subGroupData,grpid,sgrpid,
      fuelNameData,fuelTypeData,fuelname,ftype,serialCode,seriesId,seriesData,
      fuelCombuster,fuelFieding,product_name,GrupName,subGroupName,series,verticalName,
      disableN,disableNS,checkNS,checkI,checkNI
    } = this.state

    // console.log("Selected Result", AssetImage)


    console.log("StackImagess ", stackImages)
    let active = false
    

    if (!SelectedResult.company_name) {
      active = false
    } else {
      active = true
    }

    return (
      <div>

 <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Assets">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Asset</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label style={{ fontSize: "16px", fontWeight: "bold" }} className="labelcolor">Asset</label>            {/*Aishwarya   17/5/19*/}
                <hr />
                <div>

<StarRatingComponent 
  name="rate1" 
  starCount={5}
  value={rating}
  onStarClick={this.onStarClick.bind(this)}
  className="dv-star-rating-input"
/>
</div>
                <br />

                <Form
                  style={{ fontSize: "16px" }}                //Aishwarya   17/5/19  
                >
                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label='Vendor' required />
                        <select
                          style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                          value={Vname} onChange={this.handleVname}>
                          <option value="" disabled selected hidden>
                            Select Vendor
                          </option>
                          {VendorData.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.vendor_name}
                            </option>
                          ))}
                        </select>
                        <br />
                      </List.Item>
                    </List.List>
                  </Form.Group>



                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label='Product' required />
                        <select
                          style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                          value={ptype} onChange={this.handleProducts}>
                          <option value="" disabled selected hidden>
                            Select Product
                          </option>
                          {ProductData.map(i => (
                            <option value={i.id} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                        <br />
                      </List.Item>
                    </List.List>
                  </Form.Group>


                   <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                      <Form.Field label='Vertical' required />
              <div style={{ display: "flex" }}>
              <div style={{ flex: 1, marginRight: 12 }}>

                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                              value={Vertical} onChange={this.handleVertical}>

                  <option value="" disabled selected hidden>
                                  Select Vertical
                  </option>
                 
                    {verticalData.map(i=>(

                    <option value={i.vertical} key={i.id}>{i.vertical}</option>
                    ))}
                  
                    </select>
                    </div>
                    </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>

                      <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label='Group' required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                              value={grpid} onChange={e => this.handleGroup(e.target.value)}>


                      <option value="" disabled selected hidden>
                                      Select group
                                      </option>
                        {groupData.map(i=>(

                        <option value={i.id} key={i.id}>{i.name}</option>
                        ))}

                        </select>
                    </div>
                    </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>


                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                      <Form.Field label='SubGroup' required />
                      <div style={{ display: "flex" }}>
              <div style={{ flex: 1, marginRight: 12 }}>

                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                              value={sgrpid} onChange={e => this.handleSubgrpID(e.target.value)}>

                <option value="" disabled selected hidden>
                                Select Sub Group
                </option>
                  {subGroupData.map(i=>(
                  <option value={i.name} key={i.id}>{i.name}</option>
                  ))}
                </select>
                    </div>
                    </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>





                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        {/* <p>  Asset Type - </p><br />*/}
                        <Form.Field label='Asset Type' />                           {/*Aishwarya   17/5/19 */}
                        <select
                          style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                          value={atype} onChange={this.handleAssets}>
                          <option />
                          {AssetData.map(i => (
                            <option value={i.type} key={i.id}>{i.type}</option>
                          ))}
                        </select>
                        <br />
                    
                      </List.Item>
                    </List.List>
                  </Form.Group>
                  



                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label='Series' required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>

                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                              value={seriesId}
                              onChange={this.handleSelectSeriesId}
                            >
                              <option value="" disabled selected hidden>Select Series Name</option>
                              {seriesData.map(i => (
                                <option value={i.name} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>

                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>




                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field label='Serial No.' required />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>
                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px" }}                //Aishwarya   17/5/19  
                              value={serialCode} onChange={this.handleSerialCode}>

                              <option value="" disabled selected hidden>
                                Select Serial No.
                              </option>
                              <option value="PNA">PNA</option>
                              <option value="PNE">PNE</option>
                              <option value="TUID">TUID</option>

                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>



                  <Form.Group widths={1}>
                    <List.List>
                      <Form.Input
                        label="Asset serial Number"
                        placeholder="Enter Serial Number"
                        value={srno}
                        onChange={this.handleSrno}
                      />
                      <br />

                      {/* <Form.Group widths={1}>
                        <Form.Input
                          label="Unit Price"
                          placeholder="Unit Price"
                          value={unitPrice}
                          onChange={this.handleUnitPrice}
                        />
                      </Form.Group> */}
                      <br />

                      {/* <label style={{ color: "black" }}>
                        Asset Application{" "}
                      </label>
                      <Form.Group widths={1}>
                        <TextArea
                          label="Asset Application"
                          placeholder="Asset Application"
                          value={assetApplication}
                          onChange={this.handleAssetApplication}
                          required
                        />
                      </Form.Group>
                      <br /> */}
                    </List.List>
                  </Form.Group>
                  <font color="red">{this.state.assetmsg}</font>

                  <Button
                    style={{
                      backgroundColor: "#863577",
                      color: "#ffffff"
                    }}
                    onClick={() => this.handleAddAssets()}
                  >
                    Update Asset
                  </Button>
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}                   //Aishwarya   17/5/19  
                >Client</label>
                <hr />
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}                   //Aishwarya   17/5/19   
                >Select Client</label>
                <br />
                <FormText>
                  <div style={{ width: 400, marginTop: "7px" }}>              {/*Aishwarya   17/5/19 */}
                    <Search
                      loading={isLoading}
                      placeholderText="Select Client"
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={this.handleSearchChange}
                      results={results}
                      value={value}
                      resultRenderer={resultRenderer}
                      aligned="right"
                    />
                    <br />
                  </div>
                </FormText>

                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Name :</span>
                    </Box>
                    <Box2>
                      <span>{this.state.Name}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Mobile No :</span>
                    </Box>
                    <Box2>
                      <span>{this.state.Phno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Assign To :</span>
                    </Box>
                    <Box2>
                      <span>{owner}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  {/*<MainDiv2>
                    <Box>
                      <span>Assign By :</span>
                    </Box>
                    <Box2>
                      <span>{}</span>
                    </Box2>
                  </MainDiv2>
                  <br />*/}
                </MainDivHolder>
                <label style={{ fontSize: "16px", fontWeight: "bold" }}>Assign By</label>                    {/*Aishwarya   17/5/19*/}
                <FormText>
                  <div style={{ width: 400, marginTop: "7px" }}>              {/*Aishwarya   17/5/19 */}

                    <Search
                      loading={isLoadingAssign}
                      onResultSelect={this.handleResultSelectAssign}
                      onSearchChange={this.handleSearchChangeAssign}
                      results={resultsAssign}
                      value={valueAssign}
                      resultRenderer={resultRendererAssign}
                      aligned="right"
                    />
                    <br />
                  </div>
                </FormText>
                <Form
                  style={{ fontSize: "16px" }}          //Aishwarya   17/5/19
                >
                  <List.List className="add_data">
                    <List.Item>
                      <Form.Field label=' From Date :- ' required />

                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleFromDate}
                        dateFormat="DD-MM-YYYY"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onFocus={e => e.target.blur()}
                        placeholderText="Select Date"
                      />
                    </List.Item>
                    <br />
                    <List.Item>
                    <Form.Field label='To Date :-  ' required />
                    
                      <DatePicker
                        selected={this.state.ToDate}
                        onChange={this.handleToDate}
                        dateFormat="DD-MM-YYYY"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onFocus={e => e.target.blur()}
                        placeholderText="Select Date"
                      />
                    </List.Item>
                  </List.List>
                  <br />
                  {/* <Form.Group widths={1}>
                    <Form.Input
                      label="Asset Qty"
                      placeholder="Asset Qty."
                      value={aqty}
                      onChange={this.handleAssetQty}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Total Price."
                      placeholder="Total Price."
                      value={TotalPrice}
                      onChange={this.handleTotalPrice}
                      required
                    />
                  </Form.Group> */}
                  <br />
                  <Form.Group inline widths={3}>
                  
                      <div style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          id="Machnieradio1"
                          name="Machnieradio1"
                          value="Installed"
                          onChange={this.handleAssetStatus}
                          disabled={this.state.disableNI}
                          checked={astatus == "Installed"?true:false}

                        />
                        <label htmlFor="Machnieradio1">Installed</label>
                      </div>
                  
                      <div>
                        <input
                          type="radio"
                          id="radio2"
                          name="Machnieradio1"
                          value="Not Installed"
                          onChange={this.handleAssetStatusN}
                          checked={this.state.asset_statusN == "Not Installed"?true:false}
                          disabled={this.state.disableI}
                        />
                        <label htmlFor="radio2">Not Installed</label>
                      </div>
                   
                  </Form.Group>
                  <br />
                  <Form.Group inline widths={3}>
                      <div style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          id="radio1"
                          name="radio1"
                          value="IN Service"
                          onChange={this.handleMachnie}
                         checked={asset_status == "IN Service"?true:false}
                          disabled={this.state.disableNS}
                        />
                        <label htmlFor="radio1">IN Service</label>
                      </div>
                   

                   
                      <div>
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value="Not in Service"
                          onChange={this.handleMachnieN}
                          checked={this.state.asset_statusN == "Not in Service"?true:false}
                          disabled={this.state.disableN}
                        />
                        <label htmlFor="radio2">Not in Service</label>
                      </div>
                   
                  </Form.Group>

                  <List.Item>
                    {/* Date of commissioning (DOC)<br />*/}
                    <Form.Field label=" Date of commissioning (DOC)" />       {/*Aishwarya   17/5/19*/}
                    <DatePicker
                      selected={this.state.doc}
                      onChange={this.handleDate}
                      onFocus={e => e.target.blur()}
                      placeholderText="Select Date"
                      dateFormat="DD-MM-YYYY"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onFocus={e => e.target.blur()}
                      placeholderText="Select Date"
                    />
                  </List.Item>
              


                  <br />                     {/*Aishwarya   17/5/19*/}
                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field
                          style={{ marginLeft: "10px" }}                    //Aishwarya   17/5/19    
                          label='Type Of Fuel' />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>

                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px", marginLeft: "10px" }}                //Aishwarya   17/5/19    
                              value={ftype} onChange={this.handleFuelType}>

                              <option value="" disabled selected hidden>
                                Type of Fuel
                </option>
                              {fuelTypeData.map(i => (

                                <option value={i.name} key={i.id}>{i.name}</option>
                              ))}

                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>


                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <Form.Field
                          style={{ marginLeft: "10px" }}                    //Aishwarya   17/5/19    
                          label='Fuel Name' />
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 1, marginRight: 12 }}>

                            <select
                              style={{ width: "290px", height: "38px", fontSize: "15px", marginLeft: "10px" }}                //Aishwarya   17/5/19
                              value={fuelname} onChange={this.handleFuelName}>

                              <option value="" disabled selected hidden>
                                Fuel Name
                  </option>
                              {fuelNameData.map(i => (

                                <option value={i.name} key={i.id}>{i.name}</option>
                              ))}

                            </select>
                          </div>
                        </div>
                      </List.Item>
                    </List.List>
                  </Form.Group>


                  <Form.Group widths={1}>
                    <Form.Input
                      label="Type Of Fuel Fieding"
                      placeholder="Type Of Fuel Fieding"
                      value={fuelFieding}
                      onChange={this.handlefuelFieding}

                    />
                  </Form.Group>
                  {/*  <br />*/}                                      {/*Aishwarya 17/5/19*/}
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Type Of Combuster"
                      placeholder="Type Of Combuster"
                      value={fuelCombuster}
                      onChange={this.handleFuelCombuster}
                    />
                  </Form.Group>
                  <br />

                </Form>


              </Segment>
              <Button disabled={prevdisable} floated="left" style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={() => this.Previous()}>Prev</Button>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold " }}                    //Aishwarya   17/5/19     
                >Image</label>
                <hr />

                {/* <Carousel>
                  {stackImages.map(i => (
                    <center>
                      <img src={i.link} style={{ width: "40%" }} />
                    </center>
                  ))}
                </Carousel> */}

                <RawCarousel imageData={ImageData && ImageData.length >= 0 && ImageData || []} />


                <form>
                  {this.state.isUploading && (
                    <p>Progress: {this.state.progress}</p>
                  )}
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={Asset_fbs}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </form>
                <br />
                <Progress percent={this.state.progress} active color="green">
                  Smart Speed
                </Progress>
              </Segment>
              <Button disabled={nxtdisable} floated="right" style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={() => this.Next()}>Next</Button>

            </TixyContent>

          </ContentArea>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>


            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff", marginTop: "10px" }}
              onClick={() => this.UpdateStackholder()}
            >
              Update Assets Stack Holder
            </Button>
          </ContentArea>
        </PageContainer2>

        {this.state.redirectToAsset && <Redirect to="/Assets" push />}





        <Modal
          open={isOpen}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Asset Type</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Asset Type"
                  placeholder="Enter Asset Type"
                  value={pname}
                  onChange={this.handlePname}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>


        {
          isopen == true ? (
            <ErrorModal isopen={this.state.isopen} msg={this.state.msg} onClose={this.handleClose} />
          ) : (
              <div>
              </div>
            )
        }

        {
          isSucess == true ? (
            <SuccessModal isopen={this.state.isSucess} msg={this.state.SuccessMsg} onClose={this.handleClose} />
          ) : (
              <div>
              </div>
            )
        }
      </div >
    )
  }
}

// AddTixy.propTypes = {
//     googleMaps: PropTypes.object,
//   }

const searchStyle = {
  width: "19em"
}
const resultRenderer = ({ company_name, number }) => (
  <span>
    <Header as="h4">{company_name}</Header>
    <p>{number}</p>
  </span>
)

const resultRendererAssign = ({ name, mobile_num, role }) => (
  <span>
    <Header as="h4">{name}</Header>
    <p>{mobile_num}</p>
    <p>{role}</p>
  </span>
)

const formInput = {
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color: "#ffffff",
  padding: "14px",
  width: "31em"
}

export default EditAssets
