import React, { Component } from "react"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Divider,Container,Grid,Rating,Card,Segment,Popup,Button, Image, Icon, Header ,Input,Table,Modal,Form} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import tick from './Image/tick.png'

class SuccessModal extends React.Component {

    state={
        isopen:false
    }
    
    handleClose=()=>{
        this.setState({isopen:false})
    }

    render(){

      const{
          isopen
      }=this.state

      console.log("props",this.props)

      console.log("props",this.props.msg)
        return(

            <div>
              
    <Modal open={this.props.isopen} size="small" onClose={this.props.onClose} style={alert}>
    
    {/* <Header style={{fontFamily:'Pacifico',backgroundColor:"#66ff66",color:"black"}} content='Successfully Job is Done' /> */}
    <Modal.Content>

        <Grid centered columns={1}>
    <Grid.Column>
    <center><Image
        size='medium'
        src={tick}
        wrapped
        centered
      /></center>
    </Grid.Column>

    
    </Grid>

      
      <Modal.Description>
        <Header textAlign="center"><b>{this.props.msg}</b></Header>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary onClick={this.props.onClose}>
      Close <Icon name='close' />
      </Button>
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

export default SuccessModal