import React, { Component } from "react"
import Side from "../component/Sidenav"
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar,Search,Divider,List,Container,Grid,Rating,Card,Segment,Popup,Button,TextArea,Menu, Image, Icon, Header ,Input,Table,Modal,Form} from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import cold from "../component/Image/cold.png"
import warm from "../component/Image/warm.png"
import hot from "../component/Image/hot.png"
import Carousel from 'nuka-carousel';

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
  Box,
  Box2,
  MainDiv2,
  MainDivHolder
} from "../styledComps.js"
import RawCarousel from "../component/RawCarousel"



class ViewLead extends Component {
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
        email:"",
        lastAction:"",
        leadHandlerName:"",
        leadHistory:[],
        open:false,
        leadStatus:"",
        leadAction:"",
        ImageData:[]
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

    // if (JSON.parse(sessionStorage.getItem("lead_Img") == 'undefined')) {
    //     console.log("Nodata")
    // }else{
    // let leadImg = JSON.parse(sessionStorage.getItem("lead_Img"))
    //     console.log("Image of lead",leadImg)
    //     this.setState({ImageData:leadImg})
    // }

    if (user) {
      console.log("In User List", user)
      this.state.userInfo=user
      this.setState({
        userInfo:user,
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
        leadStatus:user.leadStatus,
        leadAction:user.action,
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

   
}

handleAction =()=>{
    
        this.setState({open:true})
    }
    
    
    handleCloseModal=()=>{
        this.setState({open:false})
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
      this.setState({ isOpen: false ,isOpenHold:false,isOpenReject:false,isOpenClose:false})
      clearTimeout(this.timeout)
    }
  

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    }



handleName=e=>{
    this.setState({Name:e.target.value})
}

handlelastAction=e=>{
    this.setState({lastAction:e.target.value})
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
    console.log("Delete is Done")
    this.setState({status:"Rejected"})
}


handleHold =()=>{
    console.log("hold is Done")
    this.setState({status:"hold"})
}


handleFinalSovle =()=>{
    console.log("Final is Done")
    this.setState({status:"Closed"})
}

handleProgress=()=>{
    console.log("In Progress")
    this.setState({status:"underProgress"})
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
// if(!this.state.lastAction){
//     this.setState({msg:"Please Enter Time"})
// }else 

// if(!this.state.Phno){
//     this.setState({msg:"Please Enter Phno"})
// }else if(!this.state.Address){
//     this.setState({msg:"Please Enter Address"})
// }else if(!this.state.Name){
//     this.setState({msg:"Please Enter Name"})
// }else{
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
  //  }
}


    handleSubmit = () =>{
        if(this.state.SelectedResult){
            console.log("id is there")
          //  this.setState({msg1:"Please Select Client Id"})
        } else {
            this.setState({msg1:"Please Select Client Id"})
        }
        if(!this.state.discription){
            this.setState({msg1:"Please Enter Discription"})
        } else {
            fetch('http://35.161.99.113:9000/webapi/t_ticket/add ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id:this.state.SelectedResult.id,
                    priority:this.state.rating,
                    description:this.state.discription,
                    status:this.state.status,
                    solution:this.state.Solvediscription,
                    assigneId:this.state.SelectedResultAssign.id
        })
        
                
            }).then(data => {
                return data.json();
            }).then(data => {
                 console.log("data",data)
                 console.log("data",data.records)
                // window.location.reload()
                 if(data.message=="Ticket Created"){

    

                    let authkey = "133779ATT6JFXy0k5850e783"
                    let sender = "SHMGMT"
                    let route = "4"
                    let number = this.state.Phno
                    let message = "Hi your ticket is created :" 
                    let url= "http://bhashsms.com/api/sendmsg.php?"+'user=TEAM_MHOURZ&pass=MECHATRON&text='+message+'&sender=MHOURZ&phone='+number+'&priority=ndnd&stype=normal'
                    console.log("url",url)
                    fetch(url, {mode: 'no-cors'}).then(response =>{
                        console.log(response)
                        this.setState({redirectToTixy:true})
                    })
                 }else{
                   console.log("No User")
                   this.setState({msg:"Invalid User"})
                 }
            })
            }
        
    }

// handleFormSubmit = (event) => {
//     event.preventDefault()

//     geocodeByAddress(this.state.address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error))
//   }

//  onChange = (address) => this.setState({ address })


handleRate = (e, { rating, maxRating }) =>{

    console.log("Rating given by",rating)
      this.setState({ rating, maxRating })
  }

  handleSolveDiscribe =e=>{
      this.setState({Solvediscription:e.target.value})
  }

  handlePstage=e=>{
    console.log("pstage",e.target.value)
    this.setState({Proposal_Stage:e.target.value})
  }

render(){
   

      
      let{
          
          lastAction,
          Name,
          Phno,
          Address,
          leadHandlerName,
          email,
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
          leadHistory,
          open,
          leadStatus,
          leadAction,
          ImageData,Proposal_Stage
        }=this.state
        
      
        console.log("Selected Result",SelectedResult)

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
              <HeadingText>View Lead</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded className="icon_name" style={{ height: "100%" }}>
                <label className="labelcolor">Company Name</label>
                <List.Item className="add_data">{Name} </List.Item>
                <hr />
                <List.Item className="add_data">Contact Name :{Name}</List.Item>
                <br />
                <Form.Group widths={1}>
                  <label className="labelcolor">
                    Last Action Taken - {lastAction} Hours Before{" "}
                  </label>
                </Form.Group>
                <hr />
                <List.Item className="add_data">Name :{Name}</List.Item>
                <br />
                <List.Item className="add_data">Email :{email}</List.Item>
                <br />
                <List.Item className="add_data">Phone No :{Phno}</List.Item>
                <br />
                <List.Item className="add_data">Address :{Address}</List.Item>
                <br />
                <font color="red">{this.state.msg}</font>
              </Segment>
            </TixyContent>

            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label className="labelcolor">Description</label>
                <Form>
                  <Form.Group widths={1}>
                    <label>
                      Last Action Taken - {lastAction} Hours Before{" "}
                    </label>
                  </Form.Group>
                  <hr />

                  <Form.Group widths={1}>
                    <List.List>
                      <List.Item>
                        <label>
                          <Icon name="user" /> {leadHandlerName} (Lead Handler)
                        </label>
                      </List.Item>
                      <List.Item onClick={() => this.handleAction()}>
                        <label>
                          <Icon
                            name="clock"
                            onClick={() => this.handleAction()}
                          />Action History
                        </label>
                      </List.Item>
                    </List.List>
                  </Form.Group>

                  <TextArea
                    placeholder="Tell us more"
                    value={discription}
                    onChange={this.handleDiscribe}
                    rows={12}
                  />
                </Form>
                <br/>

                 <Form.Group inline widths={3}>
                    
                    {Proposal_Stage == "Evaluation" &&(
                      
                        <label htmlFor="radio1">
                      <input type="radio"
                  id="radio1"
                  name="radio1"
                  value="Evaluation"
                  onChange={this.handlePstage} 
                  defaultChecked                
                  />
                  Evaluation</label>
                    )}
                  
                    {Proposal_Stage == "Prepared" &&(
                        <label htmlFor="radio2">
                  <input type="radio"
                  id="radio2"
                  name="radio1"              
                  value="Prepared"
                  onChange={this.handlePstage}
                  defaultChecked
                  />
                  Prepared</label>               
                        
                     
                    )}
                  
                    {Proposal_Stage === "Submitted" &&(

                      <label htmlFor="radio2">
                  <input type="radio"
                  id="radio2"
                  name="radio1"              
                  value="Submitted"
                  onChange={this.handlePstage}
                  defaultChecked
                  />
                  Submitted</label>         
                    )}
            
                  
                        
                  </Form.Group>
                  <br/>

                <Form>
                <label> Product : {this.state.SelectedProduct}</label>
                  
                    <br/>  <br/>
                    <label>Lead Source :{this.state.SelectLead}</label>
                    <br/> <br />
                    <label>Vertical : {this.state.Vertical}</label>
            
                  </Form>  
                    <br/>
                  
              </Segment>
            </TixyContent>

            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label>Image</label>

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
                <p>{leadHandlerName}</p>
                <br />
               
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

                <label>Action</label>
                <Form.Group inline widths={3}>
                  {leadAction == "call" && (
                    <label htmlFor="radio1">
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="call"
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      Call{" "}
                    </label>
                  )}

                  {leadAction == "visit" && (
                    <label htmlFor="radio2">
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="visit"
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      Visit
                    </label>
                  )}

                  {leadAction == "meeting" && (
                    <label htmlFor="radio2">
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="meeting"
                        onChange={this.handleMachnie}
                        defaultChecked
                      />
                      Meeting
                    </label>
                  )}
                </Form.Group>
                <hr />

                  <label className="labelcolor">Lead Status -</label>
                  <br />
                <Button.Group size="tiny">

                  {leadStatus == "hot" && (
                    <Popup
                      trigger={
                        <Button
                          icon
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
                  )}

                  {leadStatus == "warm" && (
                    <Popup
                      trigger={
                        <Button
                          icon
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
                  )}

                  {leadStatus == "cold" && (
                    <Popup
                      trigger={
                        <Button
                          icon
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
                  )}
                </Button.Group>
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }} />
          {this.state.redirectToTixy && <Redirect to="/Lead" push />}
        </PageContainer2>






<Modal open={open} onClose={this.handleCloseModal} closeIcon>
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



    <Table singleLine size="small" className="table_header">
                <Table.Header>
                   
                    <Table.Row >
                    <Table.HeaderCell style={tableStyle}>ID</Table.HeaderCell>
                    <Table.HeaderCell style={tableStyle}>Lead ID</Table.HeaderCell>
                    <Table.HeaderCell style={tableStyle}>Action</Table.HeaderCell>
                    <Table.HeaderCell style={tableStyle}>Transmute Action</Table.HeaderCell>              
                    </Table.Row>
                </Table.Header>
                    
                <Table.Body className="table_structure">
        
                {leadHistory.map(i => (
                    <Table.Row  key={i.id}>
                    <Table.Cell className="table_border" style={tableRow}>{i.id}</Table.Cell>
                    <Table.Cell className="table_border" style={tableRow}>{i.leadId}</Table.Cell>
                    <Table.Cell className="table_border" style={tableRow}>{i.action}</Table.Cell>
                    <Table.Cell className="table_border" style={tableRow}>{i.transmuteAction}</Table.Cell>
                    </Table.Row>
                    ))}
                    
                    
                </Table.Body>
              </Table>
            )}

         
</Modal.Content>
</Modal>

</div>

    )
}

}



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
    //  color:"#ffffff",
    width:'15em',
  }

export default ViewLead
