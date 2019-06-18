import React, { Component } from "react"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Divider,Container,Grid,Rating,Card,Segment,Popup,Button, Image, Icon, Header ,Input,Table,Modal,Form} from "semantic-ui-react"
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
    TextColor
  } from "../styledComps.js"
  
class GenrericDelete extends React.Component {

    state={
        isopen:false,
        name:'',
    }
    
    handleClose=()=>{
        this.setState({isopen:false})
    }

    handleName=e=>{
        this.setState({name:e.target.value})
    }

    lead_ContractDelete = (id,tableName) =>{
        console.log('tableName', tableName);
        console.log('name', id);

        if(id.length && tableName.length > 0){

            fetch(deleteLead_Contract, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                id:id,
                tablename:tableName      
              })
            })
              .then(data => {
                return data.json()
              })
              .then(data => {
                console.log("data", data)
                if (data.message == "Item Deleted") {
                  this.setState({ psmsg: data.message })
                  setTimeout(() => {
                      window.location.reload()
                    this.setState({ psmsg: "", open1: false })
                  }, 1000)
                } else {
                  console.log("Something went wrong !!!!!!!")
                }
              })
          }else{
            alert("Something went wrong !!!!!!!")
          }
        }

    render(){

      const{
          isopen
      }=this.state

      console.log("props",this.props)

      console.log("props",this.props.msg)
        return(

            <div>

                 <Modal
          className="alertOfFileds"
          size="small"
          open={this.props.isopen}
          onClose={this.props.onClose}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.lead_ContractDelete(this.props.id,this.props.tableName)}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
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

export default GenrericDelete