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
  List,
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
import Thermometer from "react-thermometer-component"

import { vendorUpload } from "../component/Api"

import styled from "styled-components"
import { Scrollbars } from "react-custom-scrollbars"
import {
  PageContainer3,
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
import Workbook from 'react-excel-workbook'
import ReactTable from "react-table"
import "react-table/react-table.css"
import matchSorter from "match-sorter"


class VendorView extends Component {
  state = {
    menuVisible: false,
    startdate: "",
    dataList: [],
    date: "",
    msg: "",
    size: "",
    open: false,
    query: "",

    currentPage: 1,
    todosPerPage: 3,
    open1: false,
    VendorData: [],
    SelectedTicket: {},
    rejected1: 0,
    OnHold1: 0,
    Closed1: 0,
    UnderProgress1: 0,
    clientBackupData: [],
    listData: [],
    flag: false,
    upFile: "",

    OutstandingMeter: 0,
    DisburseMeter: 0,
    outstandingdata: [],
    disbursedata: [],
    isupload: false,
    fileData: ""
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {
    fetch("http://35.161.99.113:9000/webapi/t_vendor/list", {
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
        console.log("Vendor data", data.records)
        if (data.records) {
          this.setState({ VendorData: data.records })
          this.setState({ clientBackupData: data.records })
        } else {
          console.log("No Client")
          this.setState({ VendorData: [] })
        }
      })

    let Outstanding = 0

    let Disburse = 0

    let i = 0

    setTimeout(() => {
      console.log("vendor is ", this.state.VendorData.length)

      for (i = 0; i < this.state.VendorData.length; i++) {
        console.log("type of vendor", this.state.VendorData[i].type)

        if (this.state.VendorData[i].type == "outstanding") {
          Outstanding++
          this.state.outstandingdata.push(this.state.VendorData[i])
        }

        if (this.state.VendorData[i].type == "disburse") {
          Disburse++
          this.state.disbursedata.push(this.state.VendorData[i])
        }
      }

      console.log("outstanding is", this.state.outstandingdata)

      console.log("outstanding is", Outstanding)
      console.log("disburse is", Disburse)

      this.setState({ OutstandingMeter: Outstanding, DisburseMeter: Disburse })
    }, 1000)
  }

  DisburseData = () => {
    console.log("disbusrse clicked", this.state.disbursedata)
    this.setState({ VendorData: this.state.disbursedata })
  }

  OutstandingData = () => {
    this.setState({ VendorData: this.state.outstandingdata })
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
    this.JSONToCSVConvertor(this.state.VendorData, "Data", true)
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
    var fileName = "VendorReport_"
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

  EditTicket = i => {
    sessionStorage.setItem("editTicket", JSON.stringify(i))
    this.setState({ redirectToEdit: true })
  }

  ViewTicket = i => {
    console.log("user edit", this.state.SelectedUser)
    sessionStorage.setItem("editTicket", JSON.stringify(i))
    this.setState({ redirectToview: true })
  }

  show = (size1, i) => {
    this.setState({ size1, open1: true, SelectedTicket: i })
  }

  delete = i => {
    console.log(this.state.SelectedTicket.id)
    fetch("http://35.161.99.113:9000/webapi/t_vendor/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        v_id: this.state.SelectedTicket.id
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

      fetch(vendorUpload, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vdata: this.state.csvData
        })
      })
        .then(data => {
          console.log("data", data)
          return data.json();
        })
        .then(data => {
          console.log("data", data)
          this.setState({ isupload: false })
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

  //Aishwarya 28 may
  onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        // this.state.redirectToview && <Redirect to="/ViewTixy" />
        // this.setState({ redirectToview: true && <Redirect to="/ViewTixy" /> });
        // <Redirect to="/ViewTixy" />

        this.ViewTicket(rowInfo.original)                       //Aishwarya 29 May

        // console.log('A Td Element was clicked!')
        // console.log('it produced this event:', e)
        // console.log('It was in this column:', column)
        // console.log('It was in this row:', rowInfo)
        // console.log('It was in this table instance:', instance)
      }
    }
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
      VendorData,
      rejected1,
      OnHold1,
      Closed1,
      UnderProgress1,
      listData,
      flag,
      OutstandingMeter,
      DisburseMeter,
      isupload,
      fileData
    } = this.state

    if (!flag) {
      listToShow = VendorData
      console.log('listToShow - User', listToShow);
    }
    else {
      listToShow = listData
      console.log('listToShow - list', listToShow);
    }

    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), "i")
      let Filtereduserdata = listToShow.filter(i => match.test(i.vendor_name))
      listToShow = Filtereduserdata
    } else if (!listToShow) {
      console.log("No data")
    } else {
      const match = new RegExp(escapeRegExp(query), "i")
      let Filtereduserdata = listToShow.filter(i => match.test(i.id))
      listToShow = Filtereduserdata
    }
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
            <PageContainer3>
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
                  <HeadingText>Vendor God's View</HeadingText>
                </HeadingDiv>
              </div>
              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
                <ContentArea style={{ justifyContent: "center" }}>
                  <GraphDiv>
                    <div>
                      {/* <div style={{ display: "flex", margin: "8px" }}>
                        <div style={{ flex: 1 }}>
                          <List.List>
                            <List.Item>
                              <Thermometer
                                theme="light"
                                value={OutstandingMeter}
                                max="50"
                                steps="6"
                                size="small"
                                height="300"
                              />
                              <br />

                              <Button
                                style={{
                                  backgroundColor: "#863577",
                                  color: "#ffffff"
                                }}
                                onClick={() => this.OutstandingData()}
                              >
                                Outstanding
                              </Button>
                            </List.Item>
                          </List.List>
                        </div>
                        <div style={{ flex: 1 }}>
                          <List.Item>
                            <Thermometer
                              style={{ backgroundColor: "green" }}
                              theme="green"
                              value={DisburseMeter}
                              max="50"
                              steps="6"
                              size="small"
                              height="300"
                            />
                            <br />

                            <Button
                              style={{
                                backgroundColor: "#863577",
                                color: "#ffffff"
                              }}
                              onClick={() => this.DisburseData()}
                            >
                              Disburse
                            </Button>
                          </List.Item>
                        </div>
                      </div> */}
                    </div>
                  </GraphDiv>
                  <TableDiv>
                    {/* <Input
                      size="big"
                      type="text"
                      placeholder="Search here by Id or Company Name !!!"
                      size="large"
                      value={query}
                      onChange={event => this.updateQuery(event.target.value)}
                    /> */}
                    <Link to="/Vendor">
                      <Button
                        style={{
                          marginLeft: "3px",
                          backgroundColor: "#863577",
                          color: "#fff"
                        }}
                      >
                        Add Vendor
                      </Button>
                    </Link>
                    <br />
                    <br />

                    <div style={{ backgroundColor: "white", display: "flex" }}>

                      <ReactTable
                        data={listToShow}
                        style={{ width: 1100 }}                 //Aishwarya 30 may
                        getTrProps={this.onRowClick}          //Aishwarya 29 may
                        filterable
                        defaultFilterMethod={(filter, row) =>

                          String(row[filter.id]) === filter.value}
                        columns={[

                          {
                            Header: "",
                            columns: [
                              {
                                Header: <strong>Vendor ID</strong>,
                                id: "id",
                                accessor: d => d.id,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["id"] }),
                                filterAll: true,
                              },

                              {

                                Header: <strong>Vendor Name</strong>,
                                id: "vendor_name",
                                accessor: d => d.vendor_name,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["vendor_name"] }),
                                filterAll: true,

                              },
                              {
                                Header: <strong>Phone Number</strong>,
                                id: "number",
                                accessor: d => d.number,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["number"] }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Address</strong>,
                                id: "address",
                                accessor: d => d.address,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["address"] }),
                                filterAll: true
                              },
                              //                               {
                              //                                 Header: <strong>Action</strong>,
                              //                                 id: "id",
                              //                                 accessor: d => d.id,
                              //                                 Cell: row => (
                              //                                   <Button
                              //                                     style={{
                              //                                       backgroundColor: "#863577",
                              //                                       color: "#ffffff"
                              //                                     }}
                              //                                     name="edit"
                              //                                     size="large"
                              //                                     onClick={() => this.EditTicket(row.original)}
                              //                                   >
                              //                                     Edit
                              // </Button>
                              //                                 )
                              //                               },

                              //                               {
                              //                                 Header: "",
                              //                                 id: "id",
                              //                                 accessor: d => d.id,
                              //                                 Cell: row => (
                              //                                   <Button
                              //                                     style={{
                              //                                       backgroundColor: "#863577",
                              //                                       color: "#ffffff"
                              //                                     }}
                              //                                     name="user"
                              //                                     size="large"
                              //                                     onClick={() => this.ViewTicket(row.original)}
                              //                                   >
                              //                                     View
                              //            </Button>


                              //                                 ),

                              //                               },
                              //                               {

                              //                                 id: "id",
                              //                                 accessor: d => d.id,
                              //                                 Cell: row => (
                              //                                   <Button
                              //                                     style={{
                              //                                       backgroundColor: "#863577",
                              //                                       color: "#ffffff"
                              //                                     }}
                              //                                     name="user close"
                              //                                     size="large"
                              //                                     onClick={() => this.show("tiny", row.original)}
                              //                                   >
                              //                                     Delete
                              // </Button>


                              //                                 ),

                              //                               }


                            ]
                          },



                        ]}
                        defaultPageSize={10}
                      />
                    </div>

                    <br />
                    <br />
                    <Workbook filename="VendorReport.xlsx" element={<Button
                      style={{
                        backgroundColor: "#863577",
                        color: "#ffffff"
                      }}

                    >
                      <Icon
                        name="cloud download"
                        size="large"
                        className="icon_size"
                      />
                      Smart Download
                    </Button>}>
                      <Workbook.Sheet data={listToShow} name="Sheet A">
                        <Workbook.Column label="id" value="id" />
                        <Workbook.Column label="Type" value="type" />
                        <Workbook.Column label="Star" value="star" />
                        <Workbook.Column label="Vendor Name" value="vendor_name" />
                        <Workbook.Column label="Primary Contact Name" value="cname1" />
                        <Workbook.Column label="Primary Phone Number" value="number" />
                        <Workbook.Column label="Secondary Contact Name" value="cname2" />
                        <Workbook.Column label="Secondary Phone Number" value="number2" />
                        <Workbook.Column label="Primary Email" value="email" />
                        <Workbook.Column label="Address" value="address" />
                        <Workbook.Column label="Owner" value="owner" />
                        <Workbook.Column label="Pan No." value="panNo" />
                        <Workbook.Column label="Gst No." value="gstNo" />
                        <Workbook.Column label="Place Of Supply." value="place_Of_Supply" />
                        <Workbook.Column label="Industry" value="indType" />
                        <Workbook.Column label="Industry Sub Type" value="indSubType" />
                        <Workbook.Column label="No. of Empoloyee" value="noEmp" />
                        <Workbook.Column label="Discription" value="description" />
                        <Workbook.Column label="Product/Service" value="ps" />
                        <Workbook.Column label="Billing Address 1" value="bAddress1" />
                        <Workbook.Column label="Billing Address 2" value="bAddress2" />
                        <Workbook.Column label="Billing Address 3" value="bAddress3" />
                        <Workbook.Column label="Billing Address 4" value="bAddress4" />
                        <Workbook.Column label="Billing Address 5" value="bAddress5" />
                        <Workbook.Column label="Shipping Address 1" value="sAddress1" />
                        <Workbook.Column label="Shipping Address 2" value="sAddress2" />
                        <Workbook.Column label="Shipping Address 3" value="sAddress3" />
                        <Workbook.Column label="Shipping Address 4" value="sAddress4" />
                        <Workbook.Column label="Shipping Address 5" value="sAddress5" />

                      </Workbook.Sheet>
                    </Workbook>


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
            </PageContainer3>

            {this.state.redirectToEdit && <Redirect to="/EditVendor" />}

            {this.state.redirectToview && <Redirect to="/View" />}
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
            <button onClick={() => this.handleUpload()}>Submit</button>
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

export default VendorView
