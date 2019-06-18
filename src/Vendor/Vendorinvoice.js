import React, { Component } from 'react';
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Header ,Rating,Modal,Form ,Input, Grid, Image,Navbar,Menu,Icon,Sidebar,Segment,Table,Divider} from 'semantic-ui-react'
import {Route,Redirect,Switch,Link} from "react-router-dom"
import Side from "../component/Sidenav"
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker.css"
//import moment from "moment"
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
// import { auth,ref,app } from "./base"
// import fb from 'firebase'
import ReactDOMServer from 'react-dom/server';




class Vendorinvoice extends Component {

  state = { 
    menuVisible: false,
    startdate:"",
    dataList:[],
    date:"",
    msg:"",
    size:"",
    open:false,
    query:"",

     TixyData: [
        { no:1,"name":"Ford"  },
        { no:2,"name":"BMW",},
        { no:3,"name":"Fiat",}
    ],
  currentPage:1,
  todosPerPage: 3,
  open1:false,
  clientData:[],
  SelectedTicket:{},
  rejected1:0,
  OnHold1:0,
  Closed1:0,
  UnderProgress1:0,
  clientBackupData:[],
  listData:[],
  flag:false,
  upFile:""
   }  

   handleClick=event=> {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
   
componentDidMount(){

    fetch('http://35.161.99.113:9000/webapi/t_ticket/list ', {
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
           this.setState({clientBackupData:data.records})

         }else{
           console.log("No Client")
           this.setState({clientData:[]})
         }
    })       
}

  ///   console.log(moment().format('YYYY-MM-DD'))
    // let currDate = moment().format('YYYY-MM-DD')

     //this.setState({date:currDate})
  updateQuery = query => {
    this.setState({ query: query.trim() })
    }
    
 handlestartdate = date => {
    this.setState({
      startdate: date
    })
 }

  close = () => this.setState({ open: false, open1: false })

 add=(size, Ticketdata)=>{
    //  this.setState({redirectToView:true})
    this.setState({ size, open: true })
    this.setState({SelectedTicket:Ticketdata})
 }
 download =()=>{
     console.log("download")
  //    fetch('http://35.161.99.113:9000/webapi/t_ticket/list ', {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
      
  //     })
  // }).then(data => {
  //     return data.json();
  // }).then(data => {
  //      console.log("data",data)
  //      console.log("client data",data.records)
  //      if(data.records){
  //        this.setState({clientData:data.records})
  //        this.JSONToCSVConvertor(data.records, "Data", true);

  //      }else{
  //        console.log("No Client")
  //        this.setState({clientData:[]})
  //      }
  // })     
    this.JSONToCSVConvertor(this.state.clientData, "Data", true);
}
    JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
  
      var CSV = "";
      //Set Report title in first row or line
  
      CSV += ReportTitle + "\r\n\n";
  
      //This condition will generate the Label/Header
      if (ShowLabel) {
        var row = "";
  
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
          //Now convert each value to string and comma-seprated
          row += index + ",";
        }
  
        row = row.slice(0, -1);
  
        //append Label row with line break
        CSV += row + "\r\n";
      }
  
      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
        var row = "";
  
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
          row += '"' + arrData[i][index] + '",';
        }
  
        row.slice(0, row.length - 1);
  
        //add a line break after each row
        CSV += row + "\r\n";
      }
  
      if (CSV == "") {
        alert("Invalid data");
        return;
      }
  
      //Generate a file name
      var fileName = "MyReport_";
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName += ReportTitle.replace(/ /g, "_");
  
      //Initialize file format you want csv or xls
      var uri = "data:text/csv;charset=utf-8," + escape(CSV);
  
      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension
  
      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");
      link.href = uri;
  
      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
  
      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
  }
 

 upload=(e)=>{
     console.log("upload")
   // get File
//      let file= e.target.files[0]
// //create a storage ref

// let storageRef = fb.storage().ref('/Photos'+file.name)

// // upload file

// let task= storageRef.put(file)

// console.log(task)

 }


 handleUpload =(e) => {
   this.setState({upFile:e.target.files[0]})
  //this.state.upFile = e.target.files[0]
  console.log("file is",e.target.files)
  console.log("file is",e.target.value)

 }
 
// // uploadFile = (iconFile, callback) => {

// //   fetch(''){

// //   }

//   const fileName = this.state.upFile
  
//   const uploadTask = ref().child('/icon'+ fileName).put(this.state.upFile)

//   uploadTask.on('state_changed', snapshot => {
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     callback({ progress });
//   }, error => {
//     callback({ error });
//   }, () => {
//     var downloadURL = uploadTask.snapshot.downloadURL;
//     callback({ downloadURL });
//   });
// } 

 
// //Search
// resetComponent = () =>{
//   this.setState({ isLoading: false, results: [], value: "" })
// }

// handleResultSelect = (e, { result }) => {
//   this.setState({ value:  result.company_name })
//   this.setState({ SelectedResult: result })
// }

// handleSearchChange = (e, { value }) => {
//   this.setState({ isLoading: true, value:value })

//   setTimeout(() => {
//     if (this.state.value.length < 1) return this.resetComponent()

//     const re = new RegExp(_.escapeRegExp(this.state.value), "i")
//     const isMatch = result => re.test(result.company_name)

//     this.setState({
//       isLoading: false,
//       results: _.filter(this.state.clientData, isMatch)
//     })
//   }, 500)
// }




 EditTicket =()=>{
  sessionStorage.setItem("editTicket",JSON.stringify(this.state.SelectedTicket))
  this.setState({ redirectToEdit: true })
 }

 ViewTicket =()=>{
    console.log("user edit", this.state.SelectedUser)
    sessionStorage.setItem("editTicket", JSON.stringify(this.state.SelectedTicket))
    this.setState({ redirectToview: true })
 }

 // console.log("startdate",moment(date).format("YYYY-MM-DD"))

   
//  componentWillUpdate(nextProps, nextState) {
//     // when the menu becomes visible, setup some handlers so we can close the menu easily
//     if (nextState.visible == true) {
//       document.addEventListener('keydown', this.handleKeyPress);
//       document.querySelector('.pusher').addEventListener('click', this.handleClick);
//     }
//     else {
//       document.removeEventListener('keydown', this.handleKeyPress);
//       document.querySelector('.pusher').removeEventListener('click', this.handleClick);
//     }
    
//   }

//   handleClick = () => {
//     if (this.state.menuVisible) {
//       this.setState({ menuVisible: false });
//     }
//   }
//   handleKeyPress = (e) => {
//     if(e.keyCode === 27 && this.state.menuVisible) {
//       this.setState({ menuVisible: false })
//     }
//   }
show = size1 => {
    this.setState({ size1, open1: true })
  }

  delete = () => {
    console.log(this.state.SelectedTicket.id)
    fetch("http://35.161.99.113:9000/webapi/t_ticket/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        t_id: this.state.SelectedTicket.id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("data", data.records)
        this.close()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
  }
  
  handleQuotation = () =>{
    this.setState({redirectToInvoice:true})
  }

  handleBack = ()=>{
    this.setState({redirectToBack:true})
}

  render() {
    let { 
        startdate,
        dataList,
        msg,
        size,
        open,
        query,
        TixyData,
        currentPage,
        todosPerPage,
        open1,
        size1,
        clientData,
        rejected1,
        OnHold1,
        Closed1,
        UnderProgress1,
      listData,
      flag
    } = this.state

    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), "i")
      clientData = clientData.filter(i => match.test(i.company_name))
    } else if (!clientData) {
      console.log("No data")
    } else {
      const match = new RegExp(escapeRegExp(query), "i")
      clientData = clientData.filter(i => match.test(i.id))
      clientData = clientData
    }




    return (
    
      <div>
      <Menu secondary attached="top" className="ui fixed inverted">
      <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
         <p className="text_clr"> <Icon name="sidebar" />Welcome </p>
      </Menu.Item>          
      
  </Menu>
  <div className="content_border"></div>
  <Sidebar.Pushable as={Segment} attached="bottom" className="sidebar_hgt">
  
  <Side menuVisible={this.state.menuVisible}/>    
  
      <Sidebar.Pusher onClick={() => this.state.menuVisible && this.setState({ menuVisible: false })} dimmed={this.state.menuVisible}>
          <Segment>
                  <Container>   
                      <center>
                    
                      <br/>
                      <Header as="h3">Invoice</Header>
                      </center>
                          <br/>
                      
                      <Container>     

                      <Grid  columns={3}>
                    
              
                      
                              <Grid.Column>
                              <div style={{marginTop:"100%",marginLeft:"80%"}}>
                              <Icon name="reply" size="big" onClick={()=>this.handleBack()} />
                              {this.state.redirectToBack && <Redirect to="/VendorBillingInfo" push/>}
                              </div>

                              </Grid.Column>


                              <Grid.Column>
                              <div className="bck_border1" style={{height:"784px",width:"110%",width:"139%",marginLeft: "-14%"}}>
                          <Segment>
                                                      </Segment>
                            
                                                      <Input size='big' 
                                                      type="text"
                                                      placeholder="Search Here!!!"
                                                    size="large" 
                                                      value={query}
                                                      onChange={event => this.updateQuery(event.target.value)}
                                                      style={formInput}  
                                                  />&nbsp;&nbsp;&nbsp;
                              
                              
                              <br /> 
                              {listData ? (
                              <Table celled>
                              <Table.Header>
                              <Table.Row>
                              <Table.HeaderCell  style={tableStyle}>ID</Table.HeaderCell>
                              <Table.HeaderCell style={tableStyle}>Product Name</Table.HeaderCell>
                              <Table.HeaderCell style={tableStyle}>Part Number</Table.HeaderCell>
                              <Table.HeaderCell style={tableStyle}>Qty Stock</Table.HeaderCell>
                              <Table.HeaderCell style={tableStyle}>Unit Price</Table.HeaderCell>
                             
                              
                              </Table.Row>
                              </Table.Header>
                              
                              <Table.Body>
                             
                              
                              <Table.Row   onClick={()=>this.add("medium")}> 
                              <Table.Cell  className="table_border" style={tableRow}>1</Table.Cell>   
                              <Table.Cell  className="table_border" style={tableRow}>abc</Table.Cell>
                              <Table.Cell  className="table_border" style={tableRow}>2</Table.Cell>   
                              <Table.Cell  className="table_border" style={tableRow}>4</Table.Cell>   
                              <Table.Cell  className="table_border" style={tableRow}>857557</Table.Cell>   

                              </Table.Row>
                              
                            
                              </Table.Body>
                              </Table>
                              ):(
                              <div>
                              
                              </div>
                              )}
                              
                              
                              
                              {/*
                              <Table.Footer style={{backgroundColor:"black"}} >
                              <Table.Row style={{backgroundColor:"black"}}>
                              <Table.HeaderCell  style={{backgroundColor:"#111111"}}  colSpan='4'>
                              <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                  <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                  <Icon name='chevron right' />
                                </Menu.Item>
                              </Menu>
                              </Table.HeaderCell>
                              </Table.Row>
                              </Table.Footer>
                              </Table>
                              */}
                              
                              
                              <Button style={{ backgroundColor: "#863577",color: "#ffffff" }} onClick={()=>this.download()}><Icon name="cloud download" size="large" className="icon_size" />Smart Download</Button>
                              
                              {/*
                              
                              <input id="uploadFile" type="file" onChange={this.handleUpload} required />  <button onClick={()=>this.uploadFile()}>Submit</button>
                              */}
                      </div>        
                

                              </Grid.Column>

<Grid.Column>
{/*

  <div style={{marginTop:"100%",marginRight:"70%",marginLeft: "25%"}}>
  <Icon name="share" size="big" onClick={()=>this.handleQuotation()}/>
  {this.state.redirectToInvoice}
  </div>
*/}

  </Grid.Column>

</Grid>
<Grid columns={2}>


  <Grid.Column>
  <div className="text add_data">
  </div>
  </Grid.Column>

  {/*
  
      <Modal
      size={size}
      open={open}
      onClose={() => this.close()}
      closeIcon
      style={{
        marginTop: '0px !important',
        marginLeft: '-40%',
        marginRight: 'auto'
      }}
  >
      <Modal.Header>
      <Header as="h3" content="User Action">
          User Action
      </Header>
      </Modal.Header>
  
      <Modal.Content>
      <Segment.Group horizontal>
        
          <Segment>
          <Icon
              name="edit"
              size="huge"
              onClick={() => this.EditTicket()}
          />
          {this.state.redirectToEdit && (
              <Redirect to="/EditTixy" />
          )}
          </Segment>
  
          <Segment>
          <Icon
              name="user"
              size="huge"
              onClick={() => this.ViewTicket()}
          />
          {this.state.redirectToview && (
              <Redirect to="/ViewTixy" />
          )}
          </Segment>
          <Segment>
          {" "}
          <Icon
              name="user close"
              size="huge"
              onClick={() => this.show("tiny")}
          />
          </Segment>
      </Segment.Group>
      </Modal.Content>
  </Modal>
  
      */}
                            </Grid>
                              </Container>
                              <br/>
                              <Modal
                              size={size1}
                              open={open1}
                              onClose={() => this.close()}
                              closeIcon
                            >
                              <Modal.Content>
                                <h3>Do you want to delete this item.</h3>
                              </Modal.Content>
                              <Modal.Actions>
                                <Button negative onClick={() => this.close()}>
                                  No
                                </Button>
                                <Button
                                  positive
                                  icon="checkmark"
                                  onClick={() => this.delete()}
                                  labelPosition="right"
                                  content="Yes"
                                />
                              </Modal.Actions>
                            </Modal>
                       
                          
                          <br/>
                          </Container>  
                          </Segment>
                          </Sidebar.Pusher>
                          </Sidebar.Pushable>

    </div>
    );
  }
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
}

const formInput = {
    background: "transparent",
    boxShadow: "0 0 0 1px #ffffff inset",
    color:"#ffffff",
    padding:"14px",
    width:"20em"
  }

  const resultRenderer = ({ company_name, number }) => (
    <span>
      <Header as="h4">{ company_name}</Header>
      <p>{number}</p>
    </span>
)



export default Vendorinvoice;
