import React, { Component } from "react"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Button,
  Container,
  Header,
  Rating,
  Modal,
  Form,
  Input,
  Grid,
  Image,
  Navbar,
  Menu,
  Icon,
  Sidebar,
  Segment,
  Table,
  Divider
} from "semantic-ui-react"
import { Route, Redirect, Switch, Link } from "react-router-dom"
import Side from "../component/Sidenav"
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker.css"
//import moment from "moment"
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
// import { auth,ref,app } from "./base"
// import fb from 'firebase'
import ReactDOMServer from "react-dom/server"
import { Scrollbars } from "react-custom-scrollbars"
import styled from "styled-components"
import {leadUpload} from "../component/Api"


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
  Inprogress,
  TextColor
} from "../styledComps.js"

class Lead extends Component {
  state = {
    menuVisible: false,
    startdate: "",
    dataList: [],
    date: "",
    msg: "",
    size: "",
    open: false,
    query: "",

    TixyData: [
      { no: 1, name: "Ford" },
      { no: 2, name: "BMW" },
      { no: 3, name: "Fiat" }
    ],
    currentPage: 1,
    todosPerPage: 3,
    open1: false,
    clientData: [],
    SelectedTicket: {},
    rejected1: 0,
    OnHold1: 0,
    Closed1: 0,
    UnderProgress1: 0,
    clientBackupData: [],
    listData: [],
    flag: false,
    upFile: "",

    LeadData: [],
    hot1: 0,
    warm1: 0,
    cold1: 0,
    isupload: false,
    fileData: ""
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {
    fetch("http://35.161.99.113:9000/webapi/t_lead/list", {
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
        console.log("lead data", data.records)
        if (data.records) {
          this.setState({ LeadData: data.records })
          this.setState({ clientBackupData: data.records })
        } else {
          console.log("No Lead")
          this.setState({ clientData: [] })
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

  add = (size, Ticketdata) => {
    //  this.setState({redirectToView:true})
    this.setState({ size, open: true })
    this.setState({ SelectedTicket: Ticketdata })

  }
  download = () => {
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
    this.JSONToCSVConvertor(this.state.LeadData, "Data", true)
  }
  JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData

    var CSV = ""
    //Set Report title in first row or line

    CSV += ReportTitle + "\r\n\n"

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = ""

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ","
      }

      row = row.slice(0, -1)

      //append Label row with line break
      CSV += row + "\r\n"
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = ""

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",'
      }

      row.slice(0, row.length - 1)

      //add a line break after each row
      CSV += row + "\r\n"
    }

    if (CSV == "") {
      alert("Invalid data")
      return
    }

    //Generate a file name
    var fileName = "LeadReport_"
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_")

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV)

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a")
    link.href = uri

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden"
    link.download = fileName + ".csv"

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  upload = e => {
    console.log("upload")
    // get File
    //      let file= e.target.files[0]
    // //create a storage ref

    // let storageRef = fb.storage().ref('/Photos'+file.name)

    // // upload file

    // let task= storageRef.put(file)

    // console.log(task)
  }

  handleUpload = e => {
    this.setState({ upFile: e.target.files[0] })
    //this.state.upFile = e.target.files[0]
    console.log("file is", e.target.files)
    console.log("file is", e.target.value)
  }

  EditTicket = i => {
    sessionStorage.setItem("editTicket", JSON.stringify(i))
    this.setState({ redirectToEdit: true })
  }

  ViewTicket = i => {
    console.log("user edit", this.state.SelectedUser)
    sessionStorage.setItem("editTicket", JSON.stringify(i))
    this.setState({ redirectToview: true })
  }

  show = size1 => {
    this.setState({ size1, open1: true })
  }

  delete = i => {
    console.log(this.state.SelectedTicket.id)
    fetch("http://35.161.99.113:9000/webapi/t_lead/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        l_id: this.state.SelectedTicket.id
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

  upload = () => {
    this.setState({ isupload: true })
  }

  handleClose = () => {
    this.setState({ isupload: false })
  }
 
  handleUpload = () => {
    let jsonOutput
    this.setState({ warning: "" })
    console.log("handle upload clicked")
    let x = document.getElementById("uploadFile")
    let y = x.files[0]
    if (typeof y === "undefined") {
      this.setState({ warning: "Select a proper excel file" })
      return
    }

    let fReader = new FileReader()
    fReader.onload = e => {
      let data1 = e.target.result
      let data = new Uint8Array(data1)
      let workbook = XLSX.read(data, { type: "array" }) // eslint-disable-line

      /* DO SOMETHING WITH workbook HERE */
      let first_sheet_name = workbook.SheetNames[0]

      /* Get worksheet */
      let worksheet = workbook.Sheets[first_sheet_name]
      jsonOutput = XLSX.utils.sheet_to_json(worksheet) // eslint-disable-line

      console.log("csv to json", jsonOutput)

      // console.log("parse",JSON.parse(jsonOutput))

      console.log("Stringify", JSON.stringify(jsonOutput))

      this.setState({ csvData: jsonOutput })

      //console.log(jsonOutputModded)
    }
    fReader.readAsArrayBuffer(y)

    // if(jsonOutput.length < 0){
    //   console.log("No Data")
    // }else{

    setTimeout(() => {
      console.log("inside api json data", jsonOutput)
      console.log("inside api", this.state.csvData)

      fetch(leadUpload, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          leadData: this.state.csvData
        })
      })
        .then(data => {
          console.log("data", data)
          console.log("data", data.statusText)
          // return data.json();
             if(data.statusText == "OK"){
         this.setState({Uploadmsg:"Data Upload SuccessFully"})
         setTimeout(()=>{
           this.setState({Uploadmsg:""})
          window.location.reload()
         },1000)
          }else{
            this.setState({Uploadmsg:"Something Went Wrong"})
          }
        
        })
        .then(data => {
          console.log("data", data)
         // console.log("data", data.statusText)
        //   if(data.statusText == "OK"){
        //  this.setState({Uploadmsg:"Data Upload SuccessFully"})
        //  setTimeout(()=>{
        //    this.setState({ isupload: false })
        //  },1000)
        //   }else{
        //     this.setState({Uploadmsg:"Something Went Wrong"})
        //   }
        
          // console.log("data",data.records)
          //  if(data.message == "Client Added"){
          //       this.setState({msg:"Client Added"})
          //      setTimeout(() => {
          //          this.setState({redirectToClient:true})
          //      }, 2000);
          //  }else{
          //     this.setState({isopen:true ,errorMsg:data.error})
          //     this.setState({msg:"Sorry ! something went wrong ..."})
          //  }
        })
    }, 1500)
  }


  render() {
    
    let listToShow = []

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
      flag,
      LeadData,
      hot1,
      cold1,
      warm1,
      isupload,
      fileData
    } = this.state

    if(!flag){
      listToShow = LeadData
      console.log('listToShow - User', listToShow);
  } 
  else {
    listToShow = listData
    console.log('listToShow - list', listToShow);
  }

  if (query.search(/[^a-zA-Z]+/) === -1) {
    const match = new RegExp(escapeRegExp(query), "i")
    let Filtereduserdata = listToShow.filter(i => match.test(i.company_name))
    listToShow = Filtereduserdata
  } else if (!listToShow) {
    console.log("No data")
  } else {
    const match = new RegExp(escapeRegExp(query), "i")
    let Filtereduserdata = listToShow.filter(i => match.test(i.id))
    listToShow = Filtereduserdata
  }

    let hot = 0
    let cold = 0
    let warm = 0
    let UnderProgress = 0

    let hotCount = []
    let coldCount = []
    let warmCount = []
    //let UnderProgressCount=[]


    console.log("flag", flag)
    console.log("list data", listData)

    this.state.LeadData.map(i => {
      if (i.leadStatus == "hot") {
        hot++
        hotCount.push(i)
        // console.log("rejected list",hotCount)
      } else if (i.leadStatus == "warm") {
        warm++
        warmCount.push(i)
      } else if (i.leadStatus == "cold") {
        cold++
        coldCount.push(i)
      }
    })
    ;(hot1 = hot), (cold1 = cold), (warm1 = warm), console.log("hot is", hot1)
    console.log("warm  is", warm1)
    console.log("cold is", cold1)

    let piedata = [
      {
        id: "hot",
        x: "hot",
        y: hot1,
        color: "hsl(44, 100%, 58%)"
      },
      {
        id: "cold",
        x: "cold",
        y: cold1,
        color: "hsl(0, 75%, 50%)"
      },
      {
        id: "warm",
        x: "warm",
        y: warm1,
        color: "hsl(128, 70%, 40%)"
      }
    ]

    let renderTodos
    let renderPageNumbers
    let total = 0
    let hold = []
    // let listData=[]

    return (
      <div>
        <Sidebar.Pushable
          as={Segment}
          attached="bottom"
          className="sidebar_hgt"
        >
          <Side menuVisible={this.state.menuVisible} />

          <Sidebar.Pusher
            onClick={() =>
              this.state.menuVisible && this.setState({ menuVisible: false })
            }
            dimmed={this.state.menuVisible}
            style={{ background: "#111111" }}
          >
            <PageContainer>
              <div
                style={{ display: "flex", borderBottom: "2px solid #863577" }}
              >
                <IconDiv
                  onClick={() =>
                    this.setState({ menuVisible: !this.state.menuVisible })
                  }
                >
                  <Icon name="sidebar" />
                </IconDiv>
                <HeadingDiv>
                  <HeadingText>Lead God's View</HeadingText>
                </HeadingDiv>
              </div>
              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
                <ContentArea>
                  <GraphDiv>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <NewLeadDiv />
                        <SubHeadingText> Hot Lead</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <AssetDiv />
                        <SubHeadingText>Cold Lead</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <ProductDiv />
                        <SubHeadingText>Warm Lead</SubHeadingText>
                      </div>
                    </div>
                    <svg width={500} height={500}>
                      <circle cx={265} cy={265} r={60} fill="#c43a31" />
                      <VictoryPie
                                padAngle={3}
                                height={530}
                                width={530}
                                innerRadius={300}
                                outerRadius={600}
                                data={piedata}
                                standalone={false}
                                innerRadius={98}
                                style={{ labels: { fontSize: 22 ,fill: "white"} }}
                                labelRadius={110}
                                colorScale={["orange","#00aa8a","#643C31","#6975A9" ]}
                                labels={d =>
                                  d.y == 0?( `${""}`):(`${d.y}`)
                                }
                            
                                events={[{
                                  target: "data",
                                  eventHandlers: {
                                    onClick: () => {
                                      let h,p,r,c;
                                      return [
                                        {
                                          target: "data",
                                          
                                          mutation: (props) => {
                                     // console.log(target)
                                      console.log(props)
                                      switch (props.datum.id) {
                                        case 'hot':

                                
                                        if(props.datum.id == "hot"){
                                          // hold=OnHoldCount
  
                                          this.setState({flag:true,listData:hotCount})


                                          console.log("flag",flag)
                                         
                                        }else{
                                          this.setState({msg:"No data"})
                                        }
                                          
                                          break;
                                          case 'cold':
                                          if(props.datum.eventKey != 0){
                                            this.setState({flag:true,listData:coldCount})
                                            console.log("flag",flag)
                                           
                                          }else{
                                            this.setState({msg:"No data"})
                                          }
                                            
                                            break;
                                          case 'warm':
                                          if(props.datum.id == "warm"){
                                            this.setState({flag:true,listData:warmCount})
                                            console.log("flag",flag)
                                            // if(r){
                                            //   this.setState({clientData:r})
                                            // }else{
                                            //   console.log("NO Data here")
                                            //   // this.setState({msg:"N"})
                                            // }
                                          }else{
                                            this.setState({msg:"No data"})
                                          }
                                            
                                            break;

                                           
                                            default:
                                          break;
                                      }
                                      
                                            // const fill = props.style && props.style.fill;
                                            // return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                                          }
                                        }, {
                                          // target: "labels"
                                          // mutation: (props) => {
                                          //   return props.text === "clicked" ? null : { text: "clicked" };
                                        // }
                                        }
                                      ];
                                    }
                                  }
                                }]}
                            
                                />
                    </svg>
                  </GraphDiv>
                  <TableDiv>
                    <Input
                      size="big"
                      type="text"
                      placeholder="Search here by Id or Company Name !!!"
                      size="large"
                      value={query}
                      onChange={event => this.updateQuery(event.target.value)}
                    />
                    <Link to="/AddLead">
                      <Button
                        style={{
                          marginLeft: "12px",
                          backgroundColor: "#863577",
                          color: "#fff"
                        }}
                      >
                        Add Lead
                      </Button>
                    </Link>
                    <br />
                    <br />
                    <div>
                      {listToShow.length > 0 ? (
                        <Table celled className="table_structure">
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>ID</Table.HeaderCell>
                              <Table.HeaderCell>Company Name</Table.HeaderCell>
                              <Table.HeaderCell>Phone Number</Table.HeaderCell>
                              <Table.HeaderCell>Lead Owner</Table.HeaderCell>
                              <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {listToShow.map(i => (
                              <Table.Row
                                key={i.no}
                                onClick={() => this.add("tiny", i)}
                              >
                                <Table.Cell className="table_border">
                                  {i.id}
                                </Table.Cell>
                                <Table.Cell className="table_border">
                                  {i.company_name}
                                </Table.Cell>
                                <Table.Cell className="table_border">
                                  {i.number}
                                </Table.Cell>
                                <Table.Cell className="table_border">
                                  {i.name}
                                </Table.Cell>
                                <Table.Cell className="table_border">
                                  <TableContent>
                                    <Button
                                      style={{
                                        backgroundColor: "#863577",
                                        color: "#ffffff"
                                      }}
                                      name="edit"
                                      size="large"
                                      onClick={() => this.EditTicket(i)}
                                    >
                                      Edit
                                    </Button>

                                    <Button
                                      style={{
                                        backgroundColor: "#863577",
                                        color: "#ffffff"
                                      }}
                                      name="user"
                                      size="large"
                                      onClick={() => this.ViewTicket(i)}
                                    >
                                      View
                                    </Button>

                                    <Button
                                      style={{
                                        backgroundColor: "#863577",
                                        color: "#ffffff"
                                      }}
                                      name="user close"
                                      size="large"
                                      onClick={() => this.show("tiny")}
                                    >
                                      Delete
                                    </Button>
                                  </TableContent>
                                </Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                      ) : (
                        <Table celled className="table_structure">
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>ID</Table.HeaderCell>
                              <Table.HeaderCell>Company Name</Table.HeaderCell>
                              <Table.HeaderCell>Phone Number</Table.HeaderCell>
                              <Table.HeaderCell>Lead Owner</Table.HeaderCell>
                              <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            <Table.Row>
                              <Table.Cell className="table_border">
                                Data Not Available
                              </Table.Cell>
                              <Table.Cell className="table_border" />
                              <Table.Cell className="table_border" />
                              <Table.Cell className="table_border" />
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      )}
                    </div>
                    <br />
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#863577",
                        color: "#ffffff"
                      }}
                      onClick={() => this.download()}
                    >
                      <Icon
                        name="cloud download"
                        size="large"
                        className="icon_size"
                      />
                      Smart Download
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "#863577",
                        color: "#ffffff",
                        float: "right"
                      }}
                      onClick={() => this.upload()}
                    >
                      <Icon
                        name="cloud upload"
                        size="large"
                        className="icon_size"
                      />
                      Smart Upload
                    </Button>

                
                  </TableDiv>
                </ContentArea>
              </Scrollbars>
            </PageContainer>

            {this.state.redirectToEdit && <Redirect to="/EditLead" />}

            {this.state.redirectToview && <Redirect to="/ViewLead" />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

     
        <Modal size={size1} open={open1} onClose={() => this.close()} closeIcon>
          <Modal.Content>
            <TextColor>Do you want to delete this item.</TextColor>
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

         <Modal
          open={isupload}
          onClose={this.handleClose}
          closeIcon
          className="alertOfFileds"
        >
          <Modal.Header>Upload Excel Report</Modal.Header>
          <Modal.Content>
            <input id="uploadFile" type="file" required />
            <button onClick={() => this.handleUpload()}>Submit</button><br/>
            <p><font color="red">{this.state.Uploadmsg}</font></p>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const tableStyle = {
  //  backgroundColor: "#111111" ,
  width: "50em",
  borderBottom: "1px solid #863577",
  //  color:"#D7A01D",
  fontSize: "16px",
  fontWeight: "400"
}

const tableRow = {
  //  color:"#ffffff"
}

const formInput = {
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color: "#ffffff",
  padding: "14px",
  width: "20em"
}

const resultRenderer = ({ company_name, number }) => (
  <span>
    <Header as="h4">{company_name}</Header>
    <p>{number}</p>
  </span>
)

export default Lead
