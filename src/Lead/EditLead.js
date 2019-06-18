import React, { Component } from "react"
import Side from "../component/Sidenav"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar,Search,Progress,Divider,List,Container,Grid,Rating,Card,Segment,Popup,Button,TextArea,Menu, Image, Icon, Header ,Input,Table,Modal,Form, ModalDescription} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import moment from "moment"
import cold from "../component/Image/cold.png"
import warm from "../component/Image/warm.png"
import hot from "../component/Image/hot.png"

import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {Lead_fbs, meeting_fbs, visit_fbs, call_fbs} from "../component/base"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorModal from '../component/ErrorModal'
import SuccessModal from "../component/SuccessModal";
import Carousel from 'nuka-carousel';
import SmartUpload from "../component/SmartUpload";
import {productListapi,AssetList,verticallist,addVertical,leadSourcelist,addleadSource} from  "../component/Api"
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
  TableContent
} from "../styledComps.js"

class EditLead extends Component {
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
        startDate:moment(),
        action:"",
        address: '' ,
        email:"",
        open:false,
        userInfo:{},
        leadHandler:"",
        clientID:"",
        assigneId:"",

        isMeeting:false,
    isCall:false,
    isVisit:false,

    startDate: moment(),
        exOutCome:0,
        actualOutcome:0,
        travel:0,
        vamount:0,
        ToDate:moment(),
        FromDate:moment(), 
        username: '',
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: '',
        action:"",
        checked:true,
        isopen:false,
        AssetData:[],
        ProductData:[],
        ImageData:[],
        SelectedProduct:"",
        SelectedAsset:"",
        Mdiscription:"",
        MactualOutcome:0,
        MexOutCome:0,meeting_Type:"",
        MDate:moment(),

        call:"",
        CallexOutCome:0,
        CallactualOutcome:0,
        Calldiscription:"",
        CallDate:moment(),
        Vertical:"",
        isHOD:false,
        SelectLead:"",
        Proposal_Stage:"",
        leadsourceData:[],
        leadsourcename:"",
        isleadSource:false,
        verticalData:[],
        isOpenVeritcal:false,
        vname:"",
        ImageData1:[]

        
    }



    lead_s_list = () =>{

        fetch(leadSourcelist, {
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
           console.log("lead source List ",data.records)
           if(data.records){
             this.setState({leadsourceData:data.records})
    
           }else{
             console.log("No lead source")
             this.setState({leadsourceData:[]})
           }
      })
    
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
    
             }else{
               console.log("No vertical")
               this.setState({verticalData:[]})
             }
        })
    
      }


      leadImages =(id)=>{

        fetch("http://35.161.99.113:9000/webapi/t_lead/l_getLink", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            lid: id
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            if(data.records == []){
              this.setState({ ImageData: []})
            console.log("No Images is available")
            }else{
              //sessionStorage.setItem("lead_Img", JSON.stringify(data.records))
              this.setState({ ImageData: data.records })
            }
          })
      
        }
      

      
  
componentDidMount(){
    let user = JSON.parse(sessionStorage.getItem("editTicket"))

    if (user) {
      console.log("In User List", user)
      this.state.userInfo=user
      this.setState({
        userInfo:user,
        status:user.leadStatus,
        Name:user.company_name,
        email:user.email,
        leadHandlerName: user.name,
        clientID:user.clientId,
        assigneId:user.leadHandler,
        lastAction:user.lastActionTime,
        Phno:user.number,
        rating:user.star,
        Address:user.address,
        discription:user.leadDescription,
        Solvediscription:user.solution,
        Proposal_Stage:user.proposalStage,
        Vertical:user.vertical,
        SelectedProduct:user.product,
        SelectLead:user.leadSource,
        action:user.action,
        
      })

      this.leadImages(user.id)
    } else {
      console.log("No User here")
    }
    console.log("user is",this.state.userInfo)

        fetch('http://35.161.99.113:9000/webapi/t_lead/leadHistory ', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            leadId:user.id
        })
    }).then(data => {
        return data.json();
    }).then(data => {
         console.log("data",data)
         console.log("lead  history data",data.records)
         if(data.records){
           this.setState({leadHistory:data.records})

         }else{
           console.log("No Client")
           this.setState({leadHistory:[]})
         }
    })




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
           console.log("No user")
           this.setState({AssignedUser:[]})
         }
    })


    fetch(productListapi, {
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
         console.log("Product data",data.records)
         if(data.records){
           this.setState({ProductData:data.records})
          
         }else{
           console.log("No Product")
           this.setState({clientData:[]})
         }
    })       

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
         console.log("client data",data.records)
         if(data.records){
           this.setState({AssetData:data.records})
          
         }else{
           console.log("No Asset Data")
           this.setState({AssetData:[]})
         }
    })



    this.lead_s_list()
    
    
    this.listVertical();


}


    handleOpen = () => {
      this.setState({ isOpen: true })
  
      this.timeout = setTimeout(() => {
        this.setState({ isOpen: false,isOpenReject:false })
      }, 2000)
    }
  

    handleOpenReject = () => {
        this.setState({ isOpenReject: true })
    
        this.timeout = setTimeout(() => {
          this.setState({ isOpenReject: false })
        }, 2000)
      }

      
      handleOpenHold = () => {
        this.setState({ isOpenHold: true })
    
        this.timeout = setTimeout(() => {
          this.setState({ isOpenHold: false })
        }, 2000)
      }

      handleOpenClose = () => {
        this.setState({ isOpenClose: true })
    
        this.timeout = setTimeout(() => {
          this.setState({ isOpenClose: false })
        }, 2000)
      }
    

    handleClose = () => {
      this.setState({
          open:false,
         isOpen: false ,
        isOpenHold:false,
        isOpenReject:false,
        isOpenClose:false,
        isCall:false,
        isMeeting:false,
        isVisit:false,
        isopen:false
    })
      clearTimeout(this.timeout)
    }
  

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    }

    handleName = e => {
      this.setState({ Name: e.target.value })
    }

handleEmail=e=>{
    this.setState({email:e.target.value})
}

handlelastAction=e=>{
    this.setState({lastAction:e.target.value})
}


handleAction =()=>{

    this.setState({open:true})
}

handleAddress=e=>{
    this.setState({Address:e.target.value})    
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

handleDiscribe=e=>{
    this.setState({discription:e.target.value})
}

handlelastSolved=e=>{
    this.setState({lastsolved:e.target.value})
}

handleDelete =()=>{
    console.log("hot is Done")
    this.setState({status:"hot"})
}


handleHold =()=>{
    console.log("warm is Done")
    this.setState({status:"warm"})
}


handleFinalSovle =()=>{
    console.log("cold is Done")
    this.setState({status:"cold"})
}

handleProgress=()=>{
    console.log("In Progress")
    this.setState({status:"underProgress"})
}

handleMachnie=e=>{
    console.log("product Group", e.target.value)
    let ch="";
    switch (e.target.value) {
      case 'call':
        this.setState({isCall:true})
        
        break;
    
        case 'visit':
        this.setState({isVisit:true})
        
        break;
    
        case 'meeting':
        this.setState({isMeeting:true})
        break;
    
      default:
        break;
    }
    
    this.setState({
      action: e.target.value
      // checked: this.state.checked
    })
}

//Search
resetComponent = () =>{
    this.setState({ isLoading: false, results: [], value: "" })
}

  handleResultSelect = (e, { result }) => {
    this.setState({ value:  result.company_name })
    this.setState({ SelectedResult: result })
    setTimeout(() => {
        // let active=true
        if(this.state.SelectedResult){
            this.setState({
                Name: this.state.SelectedResult.company_name,
                Phno:this.state.SelectedResult.number,
                Address:this.state.SelectedResult.address,
                rating:this.state.SelectedResult.star,
                clientID:this.state.SelectedResult.id
            })
        }
    }, 1000);
    
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value:value })

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
  resetComponentAssign = () =>{
    this.setState({ isLoadingAssign: false, resultsAssign: [], valueAssign: "" })
  }

  handleResultSelectAssign = (e, { result }) => {
    this.setState({ valueAssign:result.name })
    this.setState({ SelectedResultAssign: result })
    if(result){
      this.setState({assigneId:result.id})
    }
    
    setTimeout(() => {
        // let active=true
        if(this.state.SelectedResultAssign){
            this.setState({
                assignID: this.state.SelectedResultAssign.id,
                
            })
        }
    }, 1000);
  }

  handleSearchChangeAssign = (e, { value }) => {
    this.setState({ isLoadingAssign: true, valueAssign:value })

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


handleUser=()=>{
    if(!this.state.Name){
        this.setState({Clientmsg:"Please Enter Company Name"})
      }else if(!this.state.Phno){
        this.setState({Clientmsg:"Please Enter Phno"})
      }else if(!this.state.address){
        this.setState({Clientmsg:"Please Enter Address"})
    }else{ 
    fetch('http://35.161.99.113:9000/webapi/t_client/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name:this.state.Name,
            number:this.state.Phno,
            address :this.state.Address,
            star:this.state.rating

})

        
    }).then(data => {
        return data.json();
    }).then(data => {
         console.log("data",data)
         console.log("data",data.records)
         this.setState({msg:"User is Created"})
         setTimeout(() => {
             
             window.location.reload()
         }, 1000);
        //  if(data.records){
        //    sessionStorage.setItem("user",JSON.stringify(data.records))
        //    this.setState({user:data.records})
        //    this.setState({redirectToWelcome:true})
        //  }else{
        //    console.log("No User")
        //    this.setState({msg:"Invalid User"})
        //  }
    })
    }
}


    handleSubmit = () =>{
      if(!this.state.Name){
        this.setState({msg1:"Please Select Company "})
    } if(!this.state.Vertical){
      this.setState({msg1:"Please Select Vertical"})
    // }else if(!this.state.status){
    //   this.setState({msg1:"Please Select Status"})
    // }else if (this.state.action.length < 0) {
    //   this.setState({ msg1: "Please Select Action" })
    } else {

            fetch('http://35.161.99.113:9000/webapi/t_lead/editLead ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId:this.state.clientID,
                    leadHandler:this.state.assigneId,
                    lastActionTime:this.state.lastAction,
                    action:this.state.action,
                    leadDescription:this.state.discription,
                    leadStatus:this.state.status,
                    transmuteAction:this.state.Solvediscription,
                    leadId:this.state.userInfo.id,
                    imageLink:this.state.ImageData1,
                      product:this.state.SelectedProduct,
                      vertical:this.state.Vertical,
                      proposalStage:this.state.Proposal_Stage,
                      leadSource:this.state.SelectLead,
        })
            }).then(data => {
                return data.json();
            }).then(data => {
                 console.log("data",data)
                 console.log("data",data.records)
                // // window.location.reload()
                 if(data.message=="Lead updated"){
                  this.setState({btndisable:true})
                  this.setState({isSucess:true ,Smsg:data.message})
                  setTimeout(()=>{
                  this.setState({isSucess:false,redirectToTixy:true})
                  },1000)
                 }else{
                    this.setState({isopen:true ,errorMsg:data.error})
                   console.log("No User")
                   this.setState({msg:"Invalid User"})
                 }
            })
            }
        
    }


handleRate = (e, { rating, maxRating }) =>{

    console.log("Rating given by",rating)
      this.setState({ rating, maxRating })
  }

  handleSolveDiscribe =e=>{
      this.setState({Solvediscription:e.target.value})
  }

  onChange = (address) =>{
    console.log("Address is",address)
            this.setState({ Address:address })
         
        } 

        handleAoutCome=e=>{
            this.setState({travel:e.target.value,msg1:""})
          }
          handleTravel=e=>{
            this.setState({travel:e.target.value,msg1:""})
          }
        
          handleiVsitAmount=e=>{
              this.setState({vamount:e.target.value,msg1:""})
          }
        
          handleExoutCome=e=>{
              this.setState({exOutCome:e.target.value,msg1:""})
          }
        
          handleFrom=date=>{
              this.setState({FromDate:date,msg1:""})
          }
          
          ToDate=date=>{
              this.setState({ToDate:date,msg1:""})
          }
        
          handleChangeUsernameLead = (event) => this.setState({username: event.target.value});
handleUploadStartLead = () => this.setState({isUploading: true, progress: 0});
handleProgressLead = (progress) => this.setState({progress});
handleUploadErrorLead = (error) => {
  this.setState({isUploading: false});
  console.error(error);
}
handleUploadSuccessLead =  (filename) => {
    this.setState({uploadedfileName: filename, progress: 100, isUploading: false});
    Lead_fbs.child(filename).getDownloadURL().then(url =>{
      this.state.ImageData1.push(url)
         this.state.ImageData.push({"link":url})
       this.setState({uploadedfileurl: url})
     }); 
     if(this.state.progress == 100){
      this.setState({progress:0})
    }
    }

        handleSelectedAsset=e=>{
          console.log("assets is",e.target.value)
          this.setState({SelectedAsset:e.target.value})
        }

        handleSelectedProduct=e=>{
          console.log("Product is",e.target.value)
          this.setState({SelectedProduct:e.target.value})
        }

// Meeting

handleMeeting =e=>{
    console.log("selected meeting",e.target.value)
    this.setState({meeting_Type:e.target.value})
  }


  handleMExoutCome=e=>{
    this.setState({MexOutCome:e.target.value})
  }


  handleMoutCome=e=>{
    this.setState({MactualOutcome:e.target.value})
  }

  handleMdiscribe=e=>{
    this.setState({Mdiscription:e.target.value})
  }

  handleMdate=date=>{
    this.setState({MDate:date})
  }

  // Call 

  handleCalldate=date=>{
    this.setState({CallDate:date})
  }

  handleCall=e=>{
    this.setState({call:e.target.value})
  }

  handleCallExoutCome=e=>{
    this.setState({CallexOutCome:e.target.value})
  }

  handleCallAoutCome=e=>{
    this.setState({CallactualOutcome:e.target.value})
  }

  handleCallDiscribe=e=>{
    this.setState({Calldiscription:e.target.value})
  }

  handleVertical=e=>{
    this.setState({Vertical:e.target.value,isHOD:true})
}


handleSelectLead=e=>{
    this.setState({SelectLead:e.target.value})
  }

  handlePstage=e=>{
    console.log("pstage",e.target.value)
    this.setState({Proposal_Stage:e.target.value})
  }

  addleadSourceData = () =>{

    if(!this.state.leadsourcename){
      this.setState({msg:"Please Enter lead source Name"})
    }else{
  fetch(addleadSource, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: this.state.leadsourcename
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("data", data)
      console.log("data", data.records)

      if (data.message == "source Added") {
        this.setState({lsmsg:data.message})
        setTimeout(()=>{
        this.lead_s_list();
        this.setState({isleadSource:false})
        },1000)
      } else {
        this.setState({lsmsg:"Something went wrong !!!!!!!"})
        console.log("Something went wrong !!!!!!!")
      }
    })

}


  }

  handleleadSourcetype=()=>{
    this.setState({isleadSource:true})
  }

  handleClose=()=>{
    this.setState({isleadSource:false,isOpenVeritcal:false,
    isCall:false,
    isMeeting:false,
    isVisit:false,
    })
  }

  handleLeadSourceName=e=>{
    this.setState({leadsourcename:e.target.value})
  }

  handleVertical=e=>{
    this.setState({Vertical:e.target.value,isHOD:true})
}


handleaddVertical=e=>{
this.setState({vname:e.target.value})
}

addVertical=()=>{
if(!this.state.vname){

  this.setState({
  lsmsg:"Please Enter Name of Vertical"    
  })
}else{
  fetch(addVertical, {
method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify({
vertical : this.state.vname
})
})
.then(data => {
return data.json()
})
.then(data => {
console.log("data", data)
console.log("data", data.records)

if (data.message == "Vertical Added") {
this.setState({lsmsg:data.message})

setTimeout(()=>{
this.listVertical();

this.setState({isOpenVeritcal:false})
},1000)
} else {
  this.setState({lsmsg:"Something went wrong !!!!!!!"})
console.log("Something went wrong !!!!!!!")
}
})
}
}

handleAddVertical=()=>{
this.setState({isOpenVeritcal:true})
}


handleVertical=e=>{
this.setState({Vertical:e.target.value,isHOD:true})
}

handleaddVertical=e=>{
this.setState({vname:e.target.value})
}



render(){
  
    const inputProps = {
        value: this.state.Address,
        onChange: this.onChange,
      }

      
      let{
          
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
          email,
          open,
          leadHandlerName,
          leadHistory,isCall,isMeeting,isVisit,startDate,visit,exOutCome,actualOutcome,travel,handleiVsitAmount,vamount,
          action,
          checked,
          isopen,
          ProductData,isSucess,btndisable,
            AssetData,
            ImageData,SelectedProduct,SelectedAsset,vname,
            Mdiscription,MactualOutcome,MexOutCome,meeting_Type,MDate,isleadSource,leadsourcename,
            call,CallexOutCome,CallactualOutcome,Calldiscription,Vertical,isHOD
            ,SelectLead,leadsourceData,verticalData,isOpenVeritcal,userInfo,Proposal_Stage

        }=this.state
        
      
        console.log("Selected Result",SelectedResult)

        console.log("status is",status)

let active=false
     
        
        if(!SelectedResult.company_name){
                    active=false
        }else{
            active=true
        }
        
        return(
          
          <div>

          <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Lead">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Lead</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded className="icon_name" style={{ height: "100%" }}>
                <label className="labelcolor">Company Name</label>
                <hr />
                <div style={{width:400}}>

                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  resultRenderer={resultRenderer}
                  aligned="right"
                  {...this.props}
                />
                </div>
                <br />

                <Form>
                  <Form.Group widths={1}>
                    <label className="labelcolor">
                      Last Action Taken - {lastAction} Before{" "}
                    </label>
                  </Form.Group>
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Name"
                      placeholder="Name"
                      value={Name}
                      onChange={this.handleName}
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Input
                      label="Email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleEmail}
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Input
                      label="Phone"
                      placeholder="Enter Phone No."
                      type="tel"
                      value={Phno}
                      onChange={this.handlephno}
                      maxLength="10"
                      required
                    />
                  </Form.Group>

                  <Form.Group widths={1}>
                    <Form.Field>
                      <label className="labelcolor">Address : </label>
                      <PlacesAutocomplete
                        className="locationstyle"
                        inputProps={inputProps}
                        required
                      />
                    </Form.Field>
                  </Form.Group>
                  <font color="red">{this.state.msg}</font>
                  <Button
                    disabled={active}
                    onClick={() => this.handleUser()}
                    style={{
                      backgroundColor: "#863577",
                      color: "#ffffff"
                    }}
                  >
                    Add Client
                  </Button>
                  <font color="red">{this.state.msg}</font>
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label>Description</label>

                <hr />

                <Form.Group widths={1}>
                  <label>Last Action Taken - {lastAction} Hours Before </label>
                </Form.Group>
                <br />
                <Form.Group widths={1}>
                  <List.List>
                    <List.Item>
                      <label>
                        <Icon name="user" />
                        {leadHandlerName} (Lead Handler)
                      </label>
                    </List.Item>
                    <br />
                    <List.Item>
                      <label onClick={() => this.handleAction()}>
                        <Icon name="clock" />Action History
                      </label>
                    </List.Item>
                  </List.List>
                </Form.Group>
                <hr />

                <Form>
                  <TextArea
                    placeholder="Enter Description"
                    value={discription}
                    onChange={this.handleDiscribe}
                    rows={12}
                    required
                  />
                </Form>
                <br />
                <Form />


                            <Form.Group inline widths={3}>

                          <span>Proposal_Stage is :- {Proposal_Stage}</span>
                    <br/>
                    {Proposal_Stage == "Evaluation" ?(
                      
                        <label htmlFor="radio1">
                      <input type="radio"
                  id="radio1"
                  name="radio1"
                  value="Evaluation"
                  onChange={this.handlePstage} 
                  defaultChecked              
                  />
                  Evaluation</label>
                    ):(
                      
                      <label htmlFor="radio1">
                      <input type="radio"
                  id="radio1"
                  name="radio1"
                  value="Evaluation"
                  onChange={this.handlePstage} 
                  />
                  Evaluation</label>
                    )}
                  
                    {Proposal_Stage == "Prepared" ?(
                        <label htmlFor="radio2">
                  <input type="radio"
                  id="radio2"
                  name="radio1"              
                  value="Prepared"
                  onChange={this.handlePstage}
                  defaultChecked
                  />
                  Prepared</label>               
                        
                    ):(
                  <label htmlFor="radio2">
                  <input type="radio"
                  id="radio2"
                  name="radio1"              
                  value="Prepared"
                  onChange={this.handlePstage}
                  />
                  Prepared</label>      
                    )}
                  
                    {Proposal_Stage == "Submitted" ?(
                      <label htmlFor="radio2">
                  <input type="radio"
                  id="radio2"
                  name="radio1"              
                  value="Submitted"
                  onChange={this.handlePstage}
                  defaultChecked
                  />
                  Submitted</label>         
                    ):(
                  <label htmlFor="radio2">
                  <input type="radio"
                  id="radio2"
                  name="radio1"              
                  value="Submitted"
                  onChange={this.handlePstage}
                  />
                  Submitted</label>  
                  
                    )}
                  
                        
                  </Form.Group>
                  <br/>

                <Form>
                    Product :
                    <select value={SelectedProduct} onChange={this.handleSelectedProduct}>
                    <option value="" disabled selected hidden>Select Product</option>
                    {ProductData.map(i => (
                    <option value={i.id} key={i.id}>{i.name}</option>
                  ))}
                    </select>
                    <br/>
                    <label>Lead Source</label>
                    
                    <select value={SelectLead} onChange={this.handleSelectLead}>
                    <option value="" disabled selected hidden>Select Lead</option>
                    {leadsourceData.map(i=>(
                      <option value={i.name} key={i.id}>{i.name}</option>
                      
                    ))}
                    </select>
                    <br/> <br/>
                    <label>Vertical</label>
                  <select value={Vertical} onChange={this.handleVertical}>

<option value="" disabled selected hidden>
               Select Vertical
</option>
 {verticalData.map(i=>(

 <option value={i.vertical} key={i.vertical}>{i.vertical}</option>
 ))}

 </select><br/>

                
                  <br />
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label>Image</label>
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
                </Progress> <br/><br />
                
                 
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={Lead_fbs}
                    onUploadStart={this.handleUploadStartLead}
                    onUploadError={this.handleUploadErrorLead}
                    onUploadSuccess={this.handleUploadSuccessLead}
                    onProgress={this.handleProgressLead}
                  />
                </form>
                <br />
                
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea>
            <TixyContent>
              <Segment padded>
                <label>Transmute</label>
                <hr />
                <Form.Group widths={2}>
                  <label>Last Action Taken - {lastAction} Hours Before </label>
                </Form.Group>
                <hr />
                <label>Assign Employee</label>
                <div style={{width:400}}>

                <Search
                  loading={isLoadingAssign}
                  onResultSelect={this.handleResultSelectAssign}
                  onSearchChange={this.handleSearchChangeAssign}
                  results={resultsAssign}
                  value={valueAssign}
                  resultRenderer={resultRendererAssign}
                  aligned="right"
                  />
                  <hr />  
                </div>
                <Form>
                 

              
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 12 }}>
                      <label>Transmute Action Comments -</label>
                    </div>
                    <TextArea
                      placeholder="Tell us more"
                      value={Solvediscription}
                      onChange={this.handleSolveDiscribe}
                      rows={7}
                      required
                    />
                  </div>
                  <hr />

                  <br />
                </Form>
                <hr />
                <label>Action</label>
                {!Solvediscription && (
                  <p>Please Enter Description Then You Can Do Action</p>
                )}

                {Solvediscription && (
                  <center>
                   <Form.Group inline widths={3}>

{action == "call" ?(
    <label htmlFor="radio1">
    <input type="radio"
      id="radio1"
      name="radio1"
      value="call"
      onChange={this.handleMachnie}  
      defaultChecked               
    />&nbsp;&nbsp;
    Call</label>              
):(
  <label htmlFor="radio1">
  <input type="radio"
    id="radio1"
    name="radio1"
    value="call"
    onChange={this.handleMachnie}                
  />&nbsp;&nbsp;
  Call</label>            
)}
              

{action == "visit" ?(
<label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="visit"
onChange={this.handleMachnie}
defaultChecked
/>
Visit</label> 
):(
<label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="visit"
onChange={this.handleMachnie}
/>
Visit</label> 
)}
             
              
{action == "meeting" ?(
    <label htmlFor="radio2">
<input type="radio"
id="radio2"
name="radio1"              
value="meeting"
onChange={this.handleMachnie}
defaultChecked
/>
Meeting</label>
):(
  <label htmlFor="radio2">
  <input type="radio"
  id="radio2"
  name="radio1"              
  value="meeting"
  onChange={this.handleMachnie}
  />
 Meeting</label>
)}

</Form.Group>
</center>
                )}

                <hr />

                <Form>
                  <label>Select Lead Status -  {status}</label>
                  <br />

                  <TableContent>
                    <Popup
                      trigger={
                        <Button
                          icon
                          size="large"
                          style={{
                            backgroundColor: "#863577",
                            color: "#ffffff"
                          }}
                          onClick={() => this.handleDelete()}
                        >
                          Hot
                        </Button>
                      }
                      content={`Status Changed to Hot Lead`}
                      on="click"
                      open={this.state.isOpenReject}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenReject}
                      position="top right"
                    />

                    <Popup
                      trigger={
                        <Button
                          icon
                          size="large"
                          style={{
                            backgroundColor: "#863577",
                            color: "#ffffff"
                          }}
                          onClick={() => this.handleHold()}
                        >
                          Warm
                        </Button>
                      }
                      content={`Status Changed to warm lead`}
                      on="click"
                      open={this.state.isOpenHold}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenHold}
                      position="top right"
                    />
                    <Popup
                      trigger={
                        <Button
                          icon
                          size="large"
                          style={{
                            backgroundColor: "#863577",
                            color: "#ffffff"
                          }}
                          onClick={() => this.handleFinalSovle()}
                        >
                          Cold
                        </Button>
                      }
                      content={`Status Changed to cold lead`}
                      on="click"
                      open={this.state.isOpenClose}
                      onClose={this.handleClose}
                      onOpen={this.handleOpenClose}
                      position="top right"
                    />
                  </TableContent>
                </Form>

                <br />
              </Segment>
            </TixyContent>
          </ContentArea>
          <p style={{marginRight:"2%",textAlign:"right"}}><font color="red">{this.state.msg1}</font></p>

          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
          
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubmit()}
              disabled={btndisable}
            >
              Update Lead
            </Button>
          </ContentArea>

          {this.state.redirectToTixy && <Redirect to="/Lead" push />}
        </PageContainer2>








<Modal open={open} onClose={this.handleClose} closeIcon>

<Modal.Header>
<label>Action History</label>
</Modal.Header>
<Modal.Content>
              
  <br />
  
  {!leadHistory ?(

      <Table singleLine size="small" className="table_structure" style={{borderTop:"2px solid #D7A01D",backgroundColor: "#111111"}}>
      <Table.Header>
                <Table.Row >
                <Table.HeaderCell style={tableStyle} >ID</Table.HeaderCell>
                <Table.HeaderCell style={tableStyle} >Lead ID</Table.HeaderCell>
                <Table.HeaderCell style={tableStyle} >Action</Table.HeaderCell>
                <Table.HeaderCell style={tableStyle}>Transmute Action</Table.HeaderCell>              
                </Table.Row>
                </Table.Header>
                
                <Table.Body>   
                <Table.Row key>
                <Table.Cell>Nothing To display</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                </Table.Row>
                </Table.Body>
                </Table>

  ):(


      <Table singleLine size="small" className="table_header" style={{borderTop:"1px solid #D7A01D",backgroundColor: "#111111"}}>
    <Table.Header>
    <Table.Row >
                <Table.HeaderCell style={tableStyle} >ID</Table.HeaderCell>
                <Table.HeaderCell style={tableStyle} >Lead ID</Table.HeaderCell>
                <Table.HeaderCell style={tableStyle} >Action</Table.HeaderCell>
                <Table.HeaderCell style={tableStyle}>Transmute Action</Table.HeaderCell>              
                </Table.Row>
    </Table.Header>
    
    <Table.Body className="table_structure">
    
    {leadHistory.map(i => (
    <Table.Row  key={i.id}>
    <Table.Cell className="table_border" style={tableRow}>{i.id}</Table.Cell>
    <Table.Cell className="table_border" style={tableRow}>{i.leadId}&nbsp;&nbsp;&nbsp;</Table.Cell>
    <Table.Cell className="table_border" style={tableRow}>{i.action}&nbsp;&nbsp;&nbsp;</Table.Cell>
    <Table.Cell className="table_border" style={tableRow}>{i.transmuteAction}&nbsp;&nbsp;&nbsp;</Table.Cell>
    </Table.Row>
    ))}
    
    
    </Table.Body>
    </Table>
  )}
            

</Modal.Content>
</Modal>








            <Modal open={isCall} className="alertOfFileds" style={{marginTop:"2em"}} closeIcon onClose={this.handleClose} >
            <Modal.Header>
              <center><Icon name="call" size="big" color="black"/></center>
              </Modal.Header>

              <Modal.Content>
              <div>


<label className="labelcolor" style={{width:"5em"}}><b>Action Info :-</b></label><br/>   

<Form  widths='equal'>
<Form.Group >
<label className="labelcolor" style={{width:"5em"}}>Date :</label><br/><br/>

<br/>
<DatePicker
selected={this.state.CallDate}
onChange={this.handleCalldate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormatCalendar="MMMM"
scrollableYearDropdown
yearDropdownItemNumber={15}
style={{width:"9em"}}
/> 
<br/>


<hr />

<label className="labelcolor" style={{width:"5em"}}>Type of Call :-</label><br/>   
<br/>
<select value={call} onChange={this.handleCall}>
<option value="Sale">Sale</option>
<option value="Service">Service</option>
<option value="other">other</option>
</select>
<hr />
</Form.Group>

<Form>


<Form.Group widths='equal'>
<Form.Input
label='Call Expected Outcome'           
placeholder="Call Expected Outcome" 
type="text"
value={CallexOutCome}
onChange={this.handleCallExoutCome}
required
/>         

<Form.Input
label='Call actual outcome'           
placeholder="Call actual outcome" 
type="text"
value={CallactualOutcome}
onChange={this.handleCallAoutCome}
required
/>         
</Form.Group> 

<label className="labelcolor">Call Discription :</label><br/>   
<br/>
<TextArea 
placeholder='Tell us more'
value={Calldiscription}
onChange={this.handleCallDiscribe} 
rows={10}   
/>

</Form>
<br/>
<center>
<form>
       
       {this.state.isUploading &&
         <p>Progress: {this.state.progress}</p>
       }
       {this.state.avatarURL &&
         <img src={this.state.avatarURL} />
       }
       <FileUploader
         accept="image/*"
         name="avatar"
         multiple
         randomizeFilename
         storageRef={call_fbs}
         onUploadStart={this.handleUploadStart}
         onUploadError={this.handleUploadError}
         onUploadSuccess={this.handleUploadSuccess}
         onProgress={this.handleProgress}
       />
     </form>
<br/>
     <Progress percent={this.state.progress} active color="green">
     Smart Speed
   </Progress>    </center>

    <Button style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={()=>this.handleCall()}>Add Call</Button>
</Form>
</div>
              </Modal.Content>

              </Modal>



            <Modal open={isMeeting} className="alertOfFileds" style={{marginTop:"2em"}} closeIcon onClose={this.handleClose} >
            <Modal.Header>
              <center><Icon name="users" size="big" color="black"/></center>
              </Modal.Header>

              <Modal.Content>
              <div>


<label className="labelcolor" style={{width:"5em"}}><b>Action Info :-</b></label><br/>   

<Form  widths='equal'>
<Form.Group >
<label className="labelcolor" style={{width:"5em"}}>Date :</label><br/><br/>

<br/>
<DatePicker
selected={this.state.MDate}
onChange={this.handleMdate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormatCalendar="MMMM"
scrollableYearDropdown
yearDropdownItemNumber={15}
style={{width:"9em"}}
/> 
<br/>


<hr />

<label className="labelcolor" style={{width:"5em"}}>Type of Meeting :-</label><br/>   
<br/>
<select value={meeting_Type} onChange={this.handleMeeting}>
<option value="Sale">Sale</option>
<option value="Service">Service</option>
<option value="other">other</option>
</select>
<hr />
</Form.Group>

<Form>


<Form.Group widths='equal'>
<Form.Input
label='Meeting Expected Outcome'           
placeholder="Visit Expected Outcome" 
type="text"
value={MexOutCome}
onChange={this.handleMExoutCome}
required
/>         

<Form.Input
label='Meeting actual outcome'           
placeholder="Visit actual outcome" 
type="text"
value={MactualOutcome}
onChange={this.handleMoutCome}
required
/>         
</Form.Group> 

<label className="labelcolor">Meeting Discription :</label><br/>   
<br/>
<TextArea 
placeholder='Tell us more'
value={Mdiscription}
onChange={this.handleMdiscribe} 
rows={10}   
/>

</Form>
<br/>
<center>
<form>
       
       {this.state.isUploading &&
         <p>Progress: {this.state.progress}</p>
       }
       {this.state.avatarURL &&
         <img src={this.state.avatarURL} />
       }
       <FileUploader
         accept="image/*"
         name="avatar"
         multiple
         randomizeFilename
         storageRef={meeting_fbs}
         onUploadStart={this.handleUploadStart}
         onUploadError={this.handleUploadError}
         onUploadSuccess={this.handleUploadSuccess}
         onProgress={this.handleProgress}
       />
     </form>
<br/>
     <Progress percent={this.state.progress} active color="green">
     Smart Speed
   </Progress>    </center>

      <Button style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={()=>this.handleMeeting()}>Add Meeting</Button>

</Form>
</div>
              </Modal.Content>

              </Modal>


                <Modal open={isVisit} className="alertOfFileds"  style={{marginTop:"2em"}} closeIcon onClose={this.handleClose}>
            <Modal.Header>
              <center><Icon name="users" size="big" color="black"/></center>
              </Modal.Header>

            <Modal.Content>
            <div>
            <label className="labelcolor" style={{width:"5em"}}><b>Action Info :-</b></label><br/>   

    <div>

    <Form>
    <Form.Group widths="equal">
    <label className="labelcolor" style={{width:"5em"}}>Date :</label><br/>   
    <br/>
    <DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    onFocus={e => e.target.blur()}
    showYearDropdown
    dateFormatCalendar="MMMM"
    scrollableYearDropdown
    yearDropdownItemNumber={15}
    style={{width:"9em"}}
    /> 
    <br/>
    
    
    <hr />

    <label className="labelcolor" style={{width:"5em"}}>Type of Visit :-</label><br/>   
    <br/>
    <select value={visit} onChange={this.handleVisit}>
    <option value="Sale">Sale</option>
    <option value="Service">Service</option>
    <option value="other">other</option>
    </select>
    <hr />
    </Form.Group>
</Form>
    
    <Form>
    <label className="labelcolor">Visit Discription :</label><br/>   
    <br/>
<TextArea 
placeholder='Tell us more'
value={discription}
onChange={this.handleDiscribe} 
rows={6}   
/>


<Form.Group widths="equal">
<Form.Input
label='Visit Expected Outcome'           
placeholder="Visit Expected Outcome" 
type="text"
value={exOutCome}
onChange={this.handleExoutCome}
required
/>         

<Form.Input
label='Visit actual outcome'           
placeholder="Visit actual outcome" 
type="text"
value={actualOutcome}
onChange={this.handleAoutCome}
required
/>         
</Form.Group> 

<Form.Group widths="equal">
<Form.Input
label='Km`s  Travlled'             
placeholder="Km`s  Travlled" 
type="text"
value={travel}
onChange={this.handleTravel}
required
/>         

<Form.Input
label='Visit Amount'           
placeholder="Visit Amount" 
type="text"
value={vamount}
onChange={this.handleiVsitAmount}
required
/>         
</Form.Group> 

<Form.Group widths="equal">
<label>From :-</label><br/>
<DatePicker
selected={this.state.FromDate}
onChange={this.handleFrom}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormatCalendar="MMMM"
scrollableYearDropdown
yearDropdownItemNumber={15}
/> 
<br/>

<label style={{marginLeft:"16em"}}>To :-</label><br/>
<DatePicker
selected={this.state.ToDate}
onChange={this.ToDate}
onFocus={e => e.target.blur()}
showYearDropdown
dateFormatCalendar="MMMM"
scrollableYearDropdown
yearDropdownItemNumber={15}
/> 
<br/>
</Form.Group> 
</Form>
<br/>
<center>
<form>
           
           {this.state.isUploading &&
             <p>Progress: {this.state.progress}</p>
           }
           {this.state.avatarURL &&
             <img src={this.state.avatarURL} />
           }
           <FileUploader
             accept="*"
             name="avatar"
             multiple
             randomizeFilename
             storageRef={visit_fbs}
             onUploadStart={this.handleUploadStart}
             onUploadError={this.handleUploadError}
             onUploadSuccess={this.handleUploadSuccess}
             onProgress={this.handleProgress}
           />
         </form>
<br/>
         <Progress percent={this.state.progress} active color="green">
         Smart Speed
       </Progress>    </center>
       
    </div>
    <Button style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={()=>this.handleVisit()}>Add Visit</Button>

</div>

           </Modal.Content>
                </Modal>


                {isopen == true ?(
                    <ErrorModal isopen={this.state.isopen} msg={this.state.errorMsg} onClose={this.handleClose}/>
                  ):(
                    <div>
                    </div>
                  )}


                  {isSucess == true ? (
          <SuccessModal
            isopen={this.state.isSucess}
            msg={this.state.Smsg}
            onClose={this.handleClose}
          />
        ) : (
          <div />
        )}

                                 
 <Modal
        open={isleadSource}
        onClose={this.handleClose}
        className="alertOfFileds"
        closeIcon
        >
        <Modal.Header>
          <p>Add Lead Source</p>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths={1}>
              <Form.Input
                label="Add Lead Source "
                placeholder="Enter Lead Name "
                value={leadsourcename}
                onChange={this.handleLeadSourceName}
                required
              />

            </Form.Group>
              <p><font color="red">{this.state.lsmsg}</font></p>
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addleadSourceData()}
              >
                Add Lead Source
              </Button>
          </Form>
        </Modal.Content>
        </Modal>



        
        <Modal
          open={isOpenVeritcal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Vertical</p>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Vertical"
                  placeholder="Enter Vertical Name"
                  value={vname}
                  onChange={this.handleaddVertical}
                  required
                />

                
                <Button
                  style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  onClick={() => this.addVertical()}
                >
                  Add Vertical
                </Button>

                <font color="red">{this.state.lsmsg}</font>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>

</div>

    )
}

}

// AddTixy.propTypes = {
//     googleMaps: PropTypes.object,
//   }

const searchStyle={
    width:"19em"
}
const resultRenderer = ({ company_name, number }) => (
    <span>
      <Header as="h4">{ company_name}</Header>
      <p>{number}</p>
    </span>
)

const resultRendererAssign = ({ name, mobile_num,role }) => (
    <span>
      <Header as="h4">{name}</Header>
      <p>{mobile_num}</p>
      <p>{role}</p>
    </span>
)

const formInput = {
    background: "transparent",
    boxShadow: "0 0 0 1px #ffffff inset",
    color:"#ffffff",
    padding:"14px",
    width:"31em"
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
    width:'15em',
  }
  
export default EditLead
