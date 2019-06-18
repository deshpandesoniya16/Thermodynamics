import React, { Component } from "react"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Divider,Container,Grid,Rating,Card,Segment,Popup,Button, Image, Icon, Header ,Input,Table,Modal,Form,Loder} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import error from './Image/warning_blue.png'



import {
    industryAdd,
    industryList,
    industryDelete,
    SubIndustryadd,
    SubIndustrylist,
    addProductService,
    pslist,
    deletePS,
    AssetTypeList,
    verticallist,
    addVertical,
    deleteVertical,
    deleteAssetType,
    deleteSubInd,
    grouplist,
    addGroup,
    deleteGroup,
    subgrplist,
    addSubgrp,
    deletSubGrp,
    leadSourcelist,
    addleadSource,
    deleteleadSource,
    fuelTypelist,
    fuelTypeadd,
    fuelTypedelete,
    fuelNamelist,
    fuelNameAdd,
    deletefuelName,
    serieslist,
    seriesadd,
    seiesdelete,
    callTypelist,
    addcallType,
    deleteCallType,
    visitTypeList,
    addvisitTypeadd,
    deleteVisitType,
    meetingTypeList,
    addMeetingType,
    deleteMeeting,
    addLead_Contract,
    deleteLead_Contract,
    listLead_Contract,
  
  } from ".././component/Api"

class GenricModal extends React.Component {

    state={
        isopen:false,
        name:'',
        verticalData: this.props.verticalData || [],
        vname: "",
        Vertical: "",
        isLoading:true
    }
    
    handleClose=()=>{
        this.setState({isopen:false})
    }

    handleName=e=>{
        this.setState({name:e.target.value})
    }

    lead_Contractadd = (name,tableName) =>{


      switch (this.props.tableName) {
        case 'oit':
        if(!this.state.Vertical){
        return  this.setState({errmsg:"Please Select Vertical "})
      }
          break;

          case 'breakdown':
          if(!this.state.Vertical){
            return  this.setState({errmsg:"Please Select Vertical "})
          }
          break;

          case 'overhauling':
          if(!this.state.Vertical){
            return  this.setState({errmsg:"Please Select Vertical "})
          }
          break;
      
        default:
        console.log("out from loop")
          break;
      }
     


      if(!this.state.name){
         this.setState({errmsg:"Please Enter Specified Value "})
      }else{
        console.log('tableName', tableName);
        console.log('name', this.state.name);
        fetch(addLead_Contract, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name :this.state.name,
            tablename:this.props.tableName ,
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            if (data.message == "item added") {
              this.setState({ psmsg: data.message })
              setTimeout(() => {
                  window.location.reload()
                this.setState({ errmsg: "",  })
              }, 1000)
            } else {
              this.setState({errmsg:"Something Went Wrong !!!"})
            }
          })
      }
      }

      handleSelectvertical = e => {
        this.setState({ Vertical: e.target.value, isHOD: true })
      }


    render(){

      const{
          isopen,Vertical,verticalData
      }=this.state

      console.log("props",this.props)

      console.log("props",this.props.msg)
        return(

            <div>
              
    <Modal open={this.props.isopen} size="small" onClose={this.props.onClose} style={alert} closeIcon>
       <Modal.Content>

        <Form>

        {/* "breakdown" || "overhauling" ? */}
{this.props.tableName ==="oit"  && (
 <Form.Group label="Select Vertical" required>
 <select
     value={Vertical}
     onChange={this.handleSelectvertical}
   >
     <option value="" disabled selected hidden>
       Select Vertical
     </option>
     {verticalData.map(i => (
       <option value={i.id} key={i.id}>
         {i.vertical}
       </option>
     ))}
   </select>
</Form.Group>
  )}

{this.props.tableName === "overhauling" && (
 <Form.Group label="Select Vertical" required>
 <select
     value={Vertical}
     onChange={this.handleSelectvertical}
   >
     <option value="" disabled selected hidden>
       Select Vertical
     </option>
     {verticalData.map(i => (
       <option value={i.id} key={i.id}>
         {i.vertical}
       </option>
     ))}
   </select>
</Form.Group>
  )}


{this.props.tableName === "breakdown"  && (
 <Form.Group label="Select Vertical" required>
 <select
     value={Vertical}
     onChange={this.handleSelectvertical}
   >
     <option value="" disabled selected hidden>
       Select Vertical
     </option>
     {verticalData.map(i => (
       <option value={i.id} key={i.id}>
         {i.vertical}
       </option>
     ))}
   </select>
</Form.Group>
  )}




              <Form.Group>
                <Form.Input
                  label={this.props.label}
                  placeholder={this.props.placeholderText}
                  value={this.state.name}
                  onChange={this.handleName}
                  required
                />
              </Form.Group>
              <p>
                <font color="red">{this.state.cmsg}</font>
              </p>
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.lead_Contractadd(this.state.name,this.props.tableName)}
              >
            Submit              
            </Button>
            <font color="red">{this.state.errmsg}</font>
            <font color="red">{this.state.psmsg}</font>
            </Form>
    </Modal.Content>
   
  </Modal>
            </div>
        )

    }
}


const alert ={
   
        "margin": "0",
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "margin-right":" -50%",
        "transform": "translate(-50%, -50%)"
    
}

export default GenricModal