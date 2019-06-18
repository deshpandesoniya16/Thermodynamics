import React, { Component } from "react"
import Side from "../component/Sidenav"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar,Search,Divider,Container,Grid,Rating,Card,List,Radio,Progress,Segment,Popup,Button,TextArea,Menu, Image, Icon, Header ,Input,Table,Modal,Form} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import Carousel from 'nuka-carousel';
import moment from "moment"
import SmartUpload from "../component/SmartUpload";
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {products_fbs} from "../component/base"

import  ErrorModal from "../component/ErrorModal";
import SuccessModal from "../component/SuccessModal"
import StarRatingComponent from 'react-star-rating-component';
import { placeofSupply,verticallist,grouplist,grpBasedsubgrp,verticalBasedgrp} from "../component/Api";



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
import RawCarousel from "../component/RawCarousel"


class EditProduct extends Component {
   
    state={
        menuVisible: false,
        lastAction:"",
        Name:"",
        Address:"",
        Phno:"",
        discription:"",
        lastsolved:"",
        search: "",
        isLoading: false,
        value: "",
        results: [],
        SelectedResult:{},
        startDate:moment(),
        isOpen: false,
        status:"",
        solution:"",
        clientData:[],
        rating:0,
        maxRating:0,
        Solvediscription:"",

        isLoadingAssign: false,
        valueAssign: "",
        resultsAssign: [],
        SelectedResultAssign:{},
        isOpenHold:false,
        isOpenReject:false,
        isOpenClose:false,
        AssignedUser:[],
        ProductType:"",
        group:"",
        Machnie:"",
        VendorData:[],
        pno:"",
        opno:"",
        modalName:"",
        srno:"",
        ManufacturerName:"",
        stock:"",
        Purchase:"",
        photo:null,
        pname:"",
        groupid:"",


        username: '',
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: '',
        s_status:true,
        unitPrice:"",
        product:{},
        ManufacturerData:[],
        m_status:"",
        p_status:"",

        email:"",type:"",tinNo:"",panno:"",owner:"",number:"",number2:"",gstNo:"",cstNo:"",
        HsnCode:"",
        place_Of_Supply:"",
        ImageData:[],
        uploadedfileurl:"",
        product:{},
        productImg:{},
        
        Active:"",
        errorMsg:"",
        isSucess:false,
        SuccessMsg:"",
        error:false,
        State:[],
        btndisable:false,
        isSucess:false,
        ImageData1:[],
        vid:"",
        verticalData:[],
        Vertical:"",
        groupData:[],
        subGroupData:[],
        grpid:"",
        sgrpid:"",GrupName:"",
        productDiscription:""

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
           let vid
           data.records.map(i=>{
             if(i.vertical == this.state.Vertical){
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
          this.setState({ subGroupData: data.records,sgrpid:"" })
          this.handleSubgrpID(this.state.sgrpid)

        } else {
          console.log("No Sub Group")
          this.setState({ subGroupData: [],sgrpid:"" })
        }
      })

  }





    ProductImages = (id) =>{

      fetch("http://35.161.99.113:9000/webapi/t_product/t_getLink", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: id
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("Product images Data", data.records)
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


    componentDidMount(){

        if (JSON.parse(sessionStorage.getItem("editTicket")  === null)) {
            console.log("Nodata")
        }else{
    
        let product = JSON.parse(sessionStorage.getItem("editTicket"))

        //productImg = JSON.parse(sessionStorage.getItem("Product_Image"))
        
       

        if (product) {
          console.log("In User List", product)
          this.state.product=product
          this.setState({
           pname:product.name,
           pno:product.productNumber,
           ProductType:product.p_type,
           Active:product.p_status,
           Machnie:product.m_status,
            opno:product.p_old_number,
            srno:product.p_sr_number,
            value:product.vendor_name,
            vid:product.vendorId,
            stock:product.stock_qty,
            Purchase:product.purchase_qty,
            unitPrice:product.unitPrice,
            modalName:product.modalName,
            productDiscription:product.description,
            groupid:product.manufacturer,
            Name:product.vendor_name,
            Address:product.address,
            number:product.number,
            type:product.type,
            tinNo:product.tinNo,
            panno:product.panNo,
            number2:product.number2,
            cstNo:product.cstNo,
            gstNo:product.gstNo,
            groupid:product.manufacturer,
            owner:product.owner,
            HsnCode:product.hsnCode,
            rating:product.star,
            sgrpid:product.subGroupName,
            Vertical:product.vertical,
            GrupName:product.groupName,
            // grpid:product.groupName
          })

          this.ProductImages(product.productId);
        } else {
          console.log("No User here")
        }
        console.log("user is",this.state.prduct)

      
    }  
    
    // if (JSON.parse(sessionStorage.getItem("Product_Image") == "undefined")) {
    //     console.log("Nodata")
    // }else{
    // let productImg = JSON.parse(sessionStorage.getItem("Product_Image"))
    // let img=[];
    //     console.log("Image of product",productImg)
        
        
    //     this.setState({ImageData:productImg})

        // productImg.map(i=>{
        //     if(i.link){
        //         this.state.ImageData.push(i.link)
        //     }
        // })


        console.log("image data",this.setState.ImageData)
   // }

    

        
        fetch('http://35.161.99.113:9000/webapi/t_vendor/list', {
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
             console.log("Vendor data",data.records)
             if(data.records){
               this.setState({VendorData:data.records})
               this.setState({clientBackupData:data.records})
    
             }else{
               console.log("No Client")
               this.setState({VendorData:[]})
             }
        })


       

        fetch(placeofSupply)
        .then(results => {
          return results.json();
        })
        .then(data => {
          console.log("data of place of Supply", data.records);
          this.setState({ State: data.records });
          //this.setState({ state: data.records })
        });

        this.listVertical();

        this.listGroup();

}



handleChangeUsername = (event) => this.setState({username: event.target.value});
handleUploadStart = () => this.setState({isUploading: true, progress: 0});
handleProgress= (progress) => this.setState({progress});
handleUploadError = (error) => {
  this.setState({isUploading: false});
  console.error(error);
}
handleUploadSuccess =  (filename) => {
    this.setState({uploadedfileName: filename, progress: 100, isUploading: false});
    products_fbs.child(filename).getDownloadURL().then(url =>{
      
      this.state.ImageData1.push(url)
      this.state.ImageData.push({"link":url})
      this.setState({uploadedfileurl: url})
     }); 
     if(this.state.progress == 100){
      this.setState({progress:0})
    }
    }


handleProduct=e=>{
    console.log("product type",e.target.value)
    this.setState({
        ProductType: e.target.value,
       // checked: this.state.checked  
      errorMsg:""
      })
}

handleGroupBy=e=>{
    console.log("product Group",e.target.value)
    this.setState({
        groupid: e.target.value,
       // checked: this.state.checked  
       errorMsg:""
      })
}


// handleGroup=e=>{
//     console.log("Group",e.target.value)
// this.setState({Active:e.target.value, errorMsg:""})
// }

handleMachnie=e=>{
    console.log("product Group",e.target.value)
    this.setState({
        Machnie: e.target.value,
       // checked: this.state.checked  
       errorMsg:""
      })
}

handleDiscription=e=>{
    console.log("discrption is",e.target.value)
    this.setState({discription:e.target.value})
}


handleProductName=e=>{
    this.setState({pname:e.target.value, errorMsg:""})
}

      handleOpenClose = () => {
        this.setState({ isOpenClose: true })
    
        this.timeout = setTimeout(() => {
          this.setState({ isOpenClose: false })
        }, 2000)
      }
    

    handleClose = () => {
      this.setState({ isOpen: false ,isSucess:false,isOpenHold:false,isOpenReject:false,isOpenClose:false,isopen:false})
      clearTimeout(this.timeout)
    }
  

 

handleProductNo=e=>{
    this.setState({pno:e.target.value, errorMsg:""})
}

handleOldProduct=e=>{
    this.setState({opno:e.target.value, errorMsg:""})
}

handleModal=e=>{
    this.setState({modalName:e.target.value, errorMsg:""})
}


handleSrno=e=>{
    this.setState({srno:e.target.value, errorMsg:""})
}

handlelastAction=e=>{
    this.setState({lastAction:e.target.value})
}



handleManufacturer=e=>{
    this.setState({ManufacturerName:e.target.value, errorMsg:""})
}





handlePurchase=e=>{
  if(this.validateNumber(e.target.value)){

    let pusrchaseStock = e.target.value
    if(pusrchaseStock > 0){
      this.setState({Purchase:pusrchaseStock, errorMsg:"",s_status:false})
    }else{
      pusrchaseStock = 0
      this.setState({Purchase:pusrchaseStock, errorMsg:"",s_status:false})
    }
  
}
}

handleAddress=e=>{
    this.setState({Address:e.target.value, errorMsg:"",})    
}

validateNumber = input => {
    if(input === ""){
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
}


handlephno=e=>{
    if(this.validateNumber(e.target.value)){
        this.setState({Phno:e.target .value})
    }   
}

handleUnitPrice=e=>{
    if(this.validateNumber(e.target.value)){
        this.setState({unitPrice:e.target .value})
    }   
}

//Search
resetComponent = () =>{
    this.setState({ isLoading: false, results: [], value: "" })
}

  handleResultSelect = (e, { result }) => {
    this.setState({ value:  result.vendor_name })
    this.setState({ SelectedResult: result })
    setTimeout(() => {
        // let active=true
        if(this.state.SelectedResult){
            this.setState({
                Name: this.state.SelectedResult.vendor_name,
                Phno:this.state.SelectedResult.number,
                Address:this.state.SelectedResult.address,
                type:this.state.SelectedResult.type,
                tinNo:this.state.SelectedResult.tinNo,
                panno:this.state.SelectedResult.panNo,
                owner:this.state.SelectedResult.owner,
                number:this.state.SelectedResult.number,
                number2:this.state.SelectedResult.number2,
                gstNo:this.state.SelectedResult.gstNo,
                email:this.state.SelectedResult.email,
                cstNo:this.state.SelectedResult.cstNo,
                vid:this.state.SelectedResult.id
            })
        }
    }, 1000);
    
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value:value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.vendor_name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.VendorData, isMatch)
      })
    }, 500)
  }


    handleSubmit = () =>{


      if(!this.state.pname){
        this.setState({errorMsg:"Please Enter Product Name",error:true,isopen:true})
       }else if(!this.state.Vertical){
         this.setState({errorMsg:"Please Select Vertical.",error:true,isopen:true})
       }else if(this.state.GrupName.length <= 0){
         this.setState({errorMsg:"Please Select Group .",error:true,isopen:true})
       }else if(this.state.sgrpid.length <= 0){
         this.setState({errorMsg:"Please Select Sub Group .",error:true,isopen:true})
       }else if(this.state.ProductType.length <= 0){
         this.setState({errorMsg:"Please Select Product Type .",error:true,isopen:true})
       }else if(!this.state.pno){
           this.setState({errorMsg:"Please Enter Part No.",error:true,isopen:true})
        // }else if(this.state.modalName.length <=0){
        //  this.setState({errorMsg:"Please Enter Modal Name.",error:true,isopen:true})
        }else if(this.state.Name.length <= 0){
         this.setState({errorMsg:"Please Select Vendor.",error:true,isopen:true})

        //    }else if(!this.state.opno){
        //        this.setState({errorMsg:"Please Enter Old Part No.",error:true,isopen:true})
        //    }else if(!this.state.ProductType){
        //        this.setState({errorMsg:"Please Select Product Type.",error:true,isopen:true})
        //    }else if(!this.state.modalName){
        //        this.setState({errorMsg:"Please Enter Modal Name",error:true,isopen:true})
        //    }else if(!this.state.HsnCode){
        //        this.setState({errorMsg:"Please Enter Hsn Code",error:true,isopen:true})
        //    }else if(!this.state.Machnie){
        //        this.setState({errorMsg:"Please Select State of Product",error:true,isopen:true}) 
        //    }else if(!this.state.srno){
        //        this.setState({errorMsg:"Please Enter Serial No.",error:true,isopen:true})
        //    }else if(!this.state.unitPrice){
        //        this.setState({errorMsg:"Please Enter Unit Price",error:true,isopen:true})
        //    }else if(!this.state.Active){
        //        this.setState({errorMsg:"Please Select Status of Product",error:true,isopen:true})
        //    }else if(!this.state.discription){
        //        this.setState({errorMsg:"Please Enter Discription",error:true,isopen:true})
          //  }else if(!this.state.vid){
          //      this.setState({errorMsg:"Please Select Vendor.",error:true,isopen:true})
          //  }else if(!this.state.Purchase){
          //      this.setState({errorMsg:"Please Enter Purchase Stock",error:true,isopen:true})
          //  }else if(!this.state.stock){
          //      this.setState({errorMsg:"Please Enter Stock",error:true,isopen:true})
           }else{
            fetch('http://35.161.99.113:9000/webapi/t_product/t_editProduct ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    p_id:this.state.product.productId,
                     name : this.state.pname,
                     lastActionTime :this.state.startDate,
                    star:this.state.rating,
                     p_old_number:this.state.opno,
                     p_type: this.state.ProductType,
                     p_group: "",
                     p_sr_number: this.state.srno,
                     p_status: this.state.Active,
                     m_status: this.state.Machnie,
                     vendor_id : this.state.vid,
                     stock_qty:'',  
                     purchase_qty:'',
                     modalName:this.state.modalName,
                     productNumber:this.state.pno,
                     manufacturer:this.state.groupid,
                     unitPrice:"",
                     description:this.state.productDiscription,
                     hsnCode:this.state.HsnCode,
                     imageLink:this.state.ImageData1,
                     vertical:this.state.Vertical,
                     groupName:this.state.GrupName,
                     subGroupName:this.state.sgrpid,
                  
                      //placeOfSuply:this.state.place_Of_Supply
        })
        
                
            }).then(data => {
                return data.json();
            }).then(data => {
                 console.log("data",data)
                 console.log("data",data.records)
                // window.location.reload()
                  if(data.message=="Product Updated"){
                  this.setState({btndisable:true})
                  this.setState({isSucess:true ,SuccessMsg:data.message})
                  setTimeout(()=>{
                  this.setState({isSucess:false,redirectToTixy:true})
                  },1000)
                }else{
                  this.setState({isopen:true ,errorMsg:data.error,error:true})
                    console.log("Something went wrong !!!!!")
                }
            })
         }
        
    }

    handleStock=e=>{
      if(this.validateNumber(e.target.value)){

        let stock = e.target.value
       

          if(stock > 0){
            
                if(stock <= parseInt(this.state.Purchase)){
                  this.setState({stock:stock,errorMsg:""})
                }else{
                  this.setState({errorMsg:"Enter Stock less than to Purchase Stock",isopen:true})
                }
              
          }else{

              this.setState({stock:0})
          }
  }
}

   


handleRate = (e, { rating, maxRating }) =>{

    console.log("Rating given by",rating)
      this.setState({ rating, maxRating })
  }

  
handleMname=e=>{
    console.log(e.target.value)
    this.setState({mname:e.target.value})
}


handleProductDiscription=e=>{
let pdes = e.target.value
this.setState({productDiscription:pdes})
}




  handleManufacturer=()=>{

    
    fetch('http://35.161.99.113:9000/webapi/t_product/t_addman ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                     name : this.state.mname,
        })
        
                
            }).then(data => {
                return data.json();
            }).then(data => {
                 console.log("data",data)
                 console.log("data",data.records)
                
                  if(data.message=="Manifacturer added"){
                    window.location.reload()
                  }else{
                    console.log("Something went wrong !!!!!!!")
                  }
            })
         }


  addManufac=()=>{
    this.setState({isOpen:true})
}
handleHsn=e=>{
    this.setState({HsnCode:e.target.value,errorMsg:""})
}

handlePlace=e=>{
  console.log("Place Code",e.target.value)
    this.setState({place_Of_Supply:e.target.value,errorMsg:""})
}

onStarClick=(nextValue, prevValue, name)=> {
  this.setState({rating: nextValue});
}

 handleVertical=e=>{
  let vname = e.target.value
  let vid
  this.state.verticalData.map(i=>{
    if(i.vertical == vname){
        vid=i.id
    }
  })
  this.listGroup(vid)
    this.setState({Vertical:e.target.value,isHOD:true})
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


render(){
  
      let{
          
          lastAction,
          Name,
          Phno,
          Address,
          pno,
          opno,
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
          modalName,
          srno,
          ManufacturerName,
          stock,
          Purchase,
          pname,
          groupid,
          s_status,
          unitPrice,
          ManufacturerData,
          isOpen,
          mname,
          ProductType,
          m_status,
          p_status,
          group,
          Machnie,isopen,
          HsnCode,place_Of_Supply,psid,ImageData,
          email,type,tinNo,panno,verticalData,
          owner,number,number2,gstNo,cstNo,State,Active,btndisable,isSucess,ImageData1,Vertical
          ,groupData,subGroupData,grpid,sgrpid,productDiscription,GrupName
        }=this.state
        
      
        console.log("Selected Result",SelectedResult)
        console.log("Data of img",ImageData1)

        console.log("Data of img",this.state.ImageData)

return (
          <div>


           <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Product">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Product</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment>
                <label style={{ fontSize: "16px", fontWeight: "bold" }}>Product Details</label>           {/*Aishwarya 17/5/19*/}
                <hr />
                <Form style={{ fontSize: "16px" }}>            {/*Aishwarya 17/5/19*/}
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Product Name."
                      placeholder="Product Name."
                      value={pname}
                      onChange={this.handleProductName}
                      required
                    />
                  </Form.Group>
                </Form>

                <div>

                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                    className="dv-star-rating-input"
                  />
                </div>
                <hr />

                <Form>

                  {/* <List.Item className="labelcolor">
                    <Form.Group widths={1}>
                      <Form.Input
                        label="Old Part Number"
                        placeholder="Old Part Number ."
                        value={opno}
                        onChange={this.handleOldProduct}
                        required
                      />
                    </Form.Group>
                  </List.Item> */}

                  <Form
                    style={{ fontSize: "16px" }}                //Aishwarya 17/5/19  
                  >
                    <div>
                      <Form.Field label='Vertical' required />
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1, marginRight: 12 }}>

                          <select value={Vertical} onChange={this.handleVertical}>

                            <option value="" disabled selected hidden>
                              Select Vertical
                  </option>
                            {verticalData.map(i => (

                              <option value={i.vertical} key={i.vertical}>{i.vertical}</option>
                            ))}

                          </select>
                        </div>
                      </div>

                      {/* <Button
                      style={{ backgroundColor: "#863577", color: "#ffffff" }}
                      onClick={() => this.handleAddVertical()}
                    >
                      Add Vertical
                    </Button> */}

                      <br />

                      <Form.Field label='Group' required />
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1, marginRight: 12 }}>


                          <select value={grpid} onChange={(e) => this.handleGroup(e.target.value)}>


                            <option value="" disabled selected hidden>
                              Select group
                                  </option>
                            {groupData.map(i => (

                              <option value={i.id} key={i.id}>{i.name}</option>
                            ))}

                          </select>
                        </div>
                      </div>
                      <br />

                      <Form.Field label='SubGroup' required />
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1, marginRight: 12 }}>
                          <select value={sgrpid} onChange={(e) => this.handleSubgrpID(e.target.value)}>
                            <option value="" disabled selected hidden>
                              Select Sub Group
                  </option>
                            {subGroupData.map(i => (
                              <option value={i.name} key={i.id}>{i.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>


                    </div>
                  </Form>
                  <br />

                  <p
                    style={{ fontSize: "16px", fontWeight: "bold" }}          //Aishwarya   17/5/19  
                  >Selected Product Type  - {ProductType}</p>


                  <div style={{ display: "flex" }}>

                    <Form.Group inline widths={3}>
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="Spare"
                        onChange={this.handleProduct}
                        required
                      />
                      <label
                        htmlFor="radio1"
                        style={{ padding: "0px 8px 0px 8px" }}
                      >
                        Spare
                      </label>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="Equipment"
                        onChange={this.handleProduct}
                        required
                      />
                      <label
                        htmlFor="radio2"
                        style={{ padding: "0px 8px 0px 8px" }}
                      >
                        Equipment
                      </label>

                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="Chemical/Oil"
                        onChange={this.handleProduct}
                        required
                      />
                      <label
                        htmlFor="radio2"
                        style={{ padding: "0px 8px 0px 8px" }}
                      >
                        Chemical/Oil
                      </label>
                    </Form.Group>
                  </div>


                  {/* {ProductType == "Vertical" ? (
                      <div>
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value={ProductType}
                          onChange={this.handleProduct}
                          defaultChecked
                        />
                        <label htmlFor="radio2" className="labelcolor">
                        Vertical
                        </label>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value={ProductType}
                          onChange={this.handleProduct}
                          defaultChecked
                        />
                        <label htmlFor="radio2" className="labelcolor">
                        Vertical
                        </label>
                      </div>
                    )} */}
                  <br />

                  <List.Item className="labelcolor" style={{ fontSize: "16px" }}>                   {/*Aishwarya 17/5/19 */}
                    <Form.Group widths={1}>
                      <Form.Input
                        label="Part No."
                        placeholder="Product No."
                        value={pno}
                        onChange={this.handleProductNo}
                        required
                      />
                    </Form.Group>
                  </List.Item>

                  <Form.Group widths={1} style={{ fontSize: "16px" }}>                   {/*Aishwarya 17/5/19 */}
                    <Form.Input
                      label="Model No."
                      placeholder="Model No."
                      value={modalName}
                      onChange={this.handleModal}

                    />
                  </Form.Group>

                  <List.List style={{ fontSize: "16px" }}>                   {/*Aishwarya 17/5/19 */}
                    <List.Item>
                      <Form.Group widths={1}>
                        <Form.Input
                          label="HSN Code"
                          placeholder="HSN Code"
                          value={HsnCode}
                          onChange={this.handleHsn}

                        />
                      </Form.Group>
                    </List.Item>
                    {/*
                    <List.Item>
                      <label>
                        <b>Place Of Supply </b>
                      </label>
                      <Form.Group widths={1}>
                        <select
                          value={place_Of_Supply}
                          onChange={this.handlePlace}
                        >
                          <option value="" disabled selected hidden>
                            Select Place Of Supply
                          </option>
                          {State.map(i => (
                            <option value={i.state} key={i.state}>
                              {i.state}
                            </option>
                          ))}
                        </select>
                      </Form.Group>
                    </List.Item>
*/}
                    {/* <Form.Group inline widths={3}>
                      {Active == "Active" ? (
                        <div>
                          <input
                            type="radio"
                            id="radio1"
                            name="Groupbyradio1"
                            value="Active"
                            onChange={this.handleGroup}
                            defaultChecked
                          />&nbsp;&nbsp;
                          <label htmlFor="radio1" className="labelcolor">
                            Active
                          </label>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="radio"
                            id="radio1"
                            name="Groupbyradio1"
                            value="Active"
                            onChange={this.handleGroup}
                          />&nbsp;&nbsp;
                          <label htmlFor="radio1" className="labelcolor">
                            Active
                          </label>
                        </div>
                      )}

                      {Active == "Inactive" ? (
                        <div>
                          <input
                            type="radio"
                            id="radio2"
                            name="Groupbyradio1"
                            value="Inactive"
                            onChange={this.handleGroup}
                            defaultChecked
                          />
                          <label htmlFor="radio2" className="labelcolor">
                            Inactive
                          </label>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="radio"
                            id="radio2"
                            name="Groupbyradio1"
                            value="Inactive"
                            onChange={this.handleGroup}
                          />
                          <label htmlFor="radio2" className="labelcolor">
                            Inactive
                          </label>
                        </div>
                      )}
                    </Form.Group>
                   
                    <List.Item>
                      <Form.Group widths={1}>
                        <Form.Input
                          label="Serial No."
                          placeholder="Serial No."
                          value={srno}
                          onChange={this.handleSrno}
                          required
                        />
                      </Form.Group>
                    </List.Item> 
                  */}
                    {/*
                    <List.Item>
                      <Form.Group widths={1}>
                        <Form.Input
                          label="Unit Price."
                          placeholder="Unit Price."
                          value={unitPrice}
                          onChange={this.handleUnitPrice}
                          required
                        />
                      </Form.Group>
                    </List.Item>
                    */}

                    {/*

                    <label>Machnie</label>
                    <Form.Group inline widths={3}>
                      {Machnie == "Installed" ? (
                        <div>
                          <input
                            type="radio"
                            id="Machnieradio1"
                            name="Machnieradio1"
                            value="Installed"
                            onChange={this.handleMachnie}
                            defaultChecked
                          />&nbsp;&nbsp;
                          <label htmlFor="Machnieradio1" className="labelcolor">
                            Installed
                          </label>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="radio"
                            id="Machnieradio1"
                            name="Machnieradio1"
                            value="Installed"
                            onChange={this.handleMachnie}
                          />&nbsp;&nbsp;
                          <label htmlFor="Machnieradio1" className="labelcolor">
                            Installed
                          </label>
                        </div>
                      )}

                      {Machnie == "Not Installed" ? (
                        <div>
                          <input
                            type="radio"
                            id="radio2"
                            name="Machnieradio1"
                            value="Not Installed"
                            onChange={this.handleMachnie}
                          />
                          <label htmlFor="radio2" className="labelcolor">
                            Not Installed
                          </label>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="radio"
                            id="radio2"
                            name="Machnieradio1"
                            value="Not Installed"
                            onChange={this.handleMachnie}
                          />
                          <label htmlFor="radio2" className="labelcolor">
                            Not Installed
                          </label>
                        </div>
                      )}
                    </Form.Group>
                    <label className="labelcolor">Description</label>
                    <TextArea
                      label="Discription"
                      rows={9}
                      placeholder="Enter Discription here!!!"
                      value={discription}
                      onChange={this.handleDiscription}
                      required
                    />
                    */}

                    <List.Item style={{ fontSize: "16px" }}>                   {/*Aishwarya 17/5/19 */}
                      <Form.Group widths={1}>
                        <Form.TextArea
                          label="Product Description"
                          placeholder="Product Description"
                          value={productDiscription}
                          onChange={this.handleProductDiscription}
                          required
                        />
                      </Form.Group>
                    </List.Item>



                  </List.List>
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label style={{ fontSize: "16px" }}>Image</label>                 {/*Aishwarya 17/5/19 */}
                <hr />
                {/* {ImageData && ImageData.length > 0 && (
                  <Carousel>
                    {ImageData.map(i => (
                      <center>
                        <img
                          src={i.link}
                          style={{
                            width: "60%",
                            position: "relative",
                            height: "22em"
                          }}
                        />
                      </center>
                    ))}
                  </Carousel>
                )} */}

                <RawCarousel imageData={ImageData && ImageData.length >= 0 && ImageData || []} />

                <form>
                  <Progress percent={this.state.progress} active color="green">
                    Smart Speed
                </Progress>
                  <br />
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={products_fbs}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </form>


              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label style={{ fontSize: "16px" }}>Vendor Name</label>                 {/*Aishwarya 17/5/19 */}
                <hr />
                {/*<FormText>*/}
                <div style={{ width: 400 }}>
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                    aligned="right"
                  />
                  <hr />
                </div>

                <br />
                {/*</FormText>*/}                                {/*Aishwarya 17/5/19 */}

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
                  {/* <MainDiv2>
                    <Box>
                      <span>Type :</span>
                    </Box>
                    <Box2>
                      <span>{type}</span>
                    </Box2>
                  </MainDiv2> */}
                  <MainDiv2>
                    <Box>
                      <span>Owner :</span>
                    </Box>
                    <Box2>
                      <span>{owner}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Address :</span>
                    </Box>
                    <Box2>
                      <span>{Address}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Primary No :</span>
                    </Box>
                    <Box2>
                      <span>{number}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Seconadary No :</span>
                    </Box>
                    <Box2>
                      <span>{number2}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>PAN NO :</span>
                    </Box>
                    <Box2>
                      <span>{panno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Gst No :</span>
                    </Box>
                    <Box2>
                      <span>{gstNo}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                </MainDivHolder>
                <br />
                <hr />
                <br />
                {/* <Form>
                  <Form.Input
                    label="Stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={this.handleStock}
                    required
                    disabled={s_status}
                  />
                  <Form.Input
                    label="Purchase"
                    placeholder="Purchase"
                    value={Purchase}
                    onChange={this.handlePurchase}
                    required
                  />
                </Form> */}
              </Segment>
            </TixyContent>
          </ContentArea>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>

            <Button disabled={this.state.btndisable}
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubmit()}
            >
              Update Product
            </Button>
          </ContentArea>
          {this.state.redirectToTixy && <Redirect to="/Product" push />}
        </PageContainer2>







        {isopen == true ? (
          <ErrorModal isopen={this.state.isopen} msg={this.state.errorMsg} onClose={this.handleClose} />
        ) : (
            <div>
            </div>
          )}


        {isSucess == true ? (
          <SuccessModal isopen={this.state.isSucess} msg={this.state.SuccessMsg} onClose={this.handleClose} />
        ) : (
            <div>
            </div>
          )}

      </div>

    )
  }

}

// AddTixy.propTypes = {
//     googleMaps: PropTypes.object,
//   }

const searchStyle = {
  width: "19em"
}
const resultRenderer = ({ vendor_name, number }) => (
  <span>
    <Header as="h4">{vendor_name}</Header>
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


export default EditProduct
