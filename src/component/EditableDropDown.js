import React, { Component } from 'react';
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Button,Input,Container,Card,Rating,Dropdown,Header,Modal,List,Form ,TextArea, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
import {Route, Switch,Link, Redirect} from "react-router-dom"

class EditableDropDown extends Component {


  
  state={
    isopen:false
}

handleClose=()=>{
  this.setState({isopen:false})
}

    render (){

      const{
        isopen
    }=this.state



    console.log("props",this.props)

    console.log("props",this.props.msg)


        return (

            <div>
{/*         
        <Modal
        open={isOpenAsset}
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
                value={assetName}
                onChange={this.handleAsset}
                required
              />
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.handleAddAsset()}
              >
                Add Asset Type
              </Button>
            </Form.Group>
          </Form>
        </Modal.Content>
        </Modal> */}


                </div>
        )
    }
}

export default EditableDropDown