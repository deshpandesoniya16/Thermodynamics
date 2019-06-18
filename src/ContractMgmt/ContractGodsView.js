import React, { Component } from "react"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Button,
  Container,
  Header,
  Responsive,
  Rating,
  Modal,
  Form,
  Input,
  Grid,
  Progress,
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
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
import { auth, ref, app } from "../component/base"
import ReactDOMServer from "react-dom/server"
import SmartUpload from "../component/SmartUpload"
import ErrorModal from "../component/ErrorModal"
import ReactTable from "react-table"
import "react-table/react-table.css"
import matchSorter from "match-sorter"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { tixy_fbs } from "../component/base"
import { tixyUpload, contractGodsview, deleteContract, uploadContract, uploadContractItems, } from "../component/Api"

import styled from "styled-components"
import { Scrollbars } from "react-custom-scrollbars"

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
  TextColor,
} from "../styledComps.js"

class ContractGodsView extends Component {
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
    isopen: false,
    errorMsg: "",
    isupload: false,
    fileData: "",
    csvData: [],
    isassetUpload: false,
    isassetStackUpload: false,
    contractItemData: []
  }

  componentDidMount() {
    fetch(contractGodsview, {
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
        console.log("client data", data.records)
        if (data.records) {
          this.setState({ clientData: data.records })
        } else {
          console.log("No Client")
          this.setState({ clientData: [] })
        }
      })
  }

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
    this.setState({ size })
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
    this.JSONToCSVConvertor(this.state.clientData, "Data", true)
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
    var fileName = "ContractMgmtReport_"
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
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
  }

  delete = i => {
    //console.log(i.id)
    console.log(this.state.SelectedTicket.id)
    fetch(deleteContract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contractId: this.state.SelectedTicket.id
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

  handleChangeUsername = event =>
    this.setState({ username: event.target.value })
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
  handleProgress = progress => this.setState({ progress })
  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }
  handleUploadSuccess = filename => {
    this.setState({
      uploadedfileName: filename,
      progress: 100,
      isUploading: false
    })
    tixy_fbs
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.state.ImageData.push(url)
        this.setState({ uploadedfileurl: url })
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

      fetch(uploadContract, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contractData: this.state.csvData
        })
      })
        .then(data => {
          console.log("data", data)
          console.log("data", data.statusText)
          // return data.json();
          if (data.statusText == "OK") {
            this.setState({ Uploadmsg: "Data Upload SuccessFully" })
            setTimeout(() => {
              this.setState({ Uploadmsg: "" })
              window.location.reload()
            }, 1000)
          } else {
            this.setState({ Uploadmsg: "Something Went Wrong" })
          }
        })
        .then(data => {
          console.log("data", data)

          if (data.message == "Contract Upload Successfully") {
            this.setState({ msg: "Contract Upload Successfully" })
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          } else {
            this.setState({ isopen: true, errorMsg: data.error })
            this.setState({ msg: "Sorry ! something went wrong ..." })
          }
        })
    }, 1500)
  }


  handleContractUpload = () => {
    let jsonOutput

    this.setState({ warning: "" })
    console.log("handle upload clicked")
    let x = document.getElementById("uploadFile1")
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

      this.setState({ contractItemData: jsonOutput })

      //console.log(jsonOutputModded)
    }
    fReader.readAsArrayBuffer(y)

    // if(jsonOutput.length < 0){
    //   console.log("No Data")
    // }else{

    setTimeout(() => {
      console.log("inside api json data", jsonOutput)
      console.log("inside api", this.state.contractItemData)

      fetch(uploadContractItems, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: this.state.contractItemData
        })
      })
        .then(data => {
          console.log("data", data)
          console.log("data", data.statusText)

          if (data.statusText == "OK") {
            this.setState({ msg: "contract Item added" })
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          } else {
            this.setState({ isopen: true, errorMsg: data.error })
            this.setState({ msg: "Sorry ! something went wrong ..." })
          }
        })
    }, 1500)
  }

  assetUpload = () => {
    this.setState({ isupload: false, isassetUpload: true })
  }

  assetStackupload = () => {
    this.setState({ isupload: false, isassetStackUpload: true })
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
      clientData,
      rejected1,
      OnHold1,
      Closed1,
      UnderProgress1,
      listData,
      flag,
      isopen,
      isupload,
      fileData,
      isassetStackUpload, isassetUpload
    } = this.state

    // if (!flag) {
    //   listToShow = clientData
    //   console.log("listToShow - User", listToShow)
    // } else {
    //   listToShow = listData
    //   console.log("listToShow - list", listToShow)
    // }

    // if (query.search(/[^a-zA-Z]+/) === -1) {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   let Filtereduserdata = listToShow.filter(i => match.test(i.company_name))
    //   listToShow = Filtereduserdata
    // } else if (!listToShow) {
    //   console.log("No data")
    // } else {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   let Filtereduserdata = listToShow.filter(i => match.test(i.id))
    //   listToShow = Filtereduserdata
    // }

    // let rejected = 0
    // let OnHold = 0
    // let Closed = 0
    // let UnderProgress = 0

    // let rejectedCount = []
    // let OnHoldCount = []
    // let ClosedCount = []
    // let UnderProgressCount = []

    // console.log("flag", flag)
    // console.log("list data", listData)

    // this.state.clientData.map(i => {
    //   if (i.status == "Rejected") {
    //     rejected++
    //     rejectedCount.push(i)
    //     console.log("rejected list", rejectedCount)
    //   } else if (i.status == "hold") {
    //     OnHold++
    //     OnHoldCount.push(i)
    //   } else if (i.status == "Closed") {
    //     Closed++
    //     ClosedCount.push(i)
    //   } else if (i.status == "UnderProgress") {
    //     UnderProgress++
    //     UnderProgressCount.push(i)
    //   }
    // })
    // ;(rejected1 = rejected),
    //   (OnHold1 = OnHold),
    //   (Closed1 = Closed),
    //   (UnderProgress1 = UnderProgress)
    // console.log("ra is", rejected1)
    // console.log("rm is", OnHold1)
    // console.log("ch is", Closed1)
    // console.log("Under Progress", UnderProgress1)

    // let piedata = [
    //   {
    //     id: "Rejected",
    //     x: "Rejected",
    //     y: rejected1,
    //     color: "hsl(44, 100%, 58%)"
    //   },
    //   {
    //     id: "hold",
    //     x: "hold",
    //     y: OnHold1,
    //     color: "hsl(0, 75%, 50%)"
    //   },
    //   {
    //     id: "Closed",
    //     x: "Closed",
    //     y: Closed1,
    //     color: "hsl(128, 70%, 40%)"
    //   },
    //   {
    //     id: "UnderProgress",
    //     x: "UnderProgress",
    //     y: UnderProgress1,
    //     color: "hsl(40, 70%, 40%)"
    //   }
    // ]

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
                  <HeadingText>Contract Managment View</HeadingText>
                </HeadingDiv>
              </div>
              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
                <ContentArea style={{ justifyContent: "center" }}>
                  {/* <GraphDiv>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <NewLeadDiv />
                        <SubHeadingText>New</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <AssetDiv />
                        <SubHeadingText>Renewal</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <ProductDiv />
                        <SubHeadingText>GPM</SubHeadingText>
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
                        style={{ labels: { fontSize: 22, fill: "white" } }}
                        labelRadius={110}
                        colorScale={["orange", "#00aa8a", "#643C31", "#6975A9"]}
                        labels={d => (d.y == 0 ? `${""}` : `${d.y}`)}
                        events={[
                          {
                            target: "data",
                            eventHandlers: {
                              onClick: () => {
                                let h, p, r, c
                                return [
                                  {
                                    target: "data",

                                    mutation: props => {
                                      // console.log(target)
                                      console.log(props)
                                      switch (props.datum.id) {
                                        case "hold":
                                          if (props.datum.eventKey != 0) {
                                            // hold=OnHoldCount

                                            this.setState({
                                              flag: true,
                                              listData: OnHoldCount
                                            })

                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "UnderProgress":
                                          if (
                                            props.datum.id == "UnderProgress"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: UnderProgressCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "Rejected":
                                          if (props.datum.id == "Rejected") {
                                            this.setState({
                                              flag: true,
                                              listData: rejectedCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Closed":
                                          if (props.datum.id == "Closed") {
                                            this.setState({
                                              flag: true,
                                              listData: ClosedCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        default:
                                          break
                                      }

                                      // const fill = props.style && props.style.fill;
                                      // return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                                    }
                                  },
                                  {
                                    // target: "labels"
                                    // mutation: (props) => {
                                    //   return props.text === "clicked" ? null : { text: "clicked" };
                                    // }
                                  }
                                ]
                              }
                            }
                          }
                        ]}
                      />
                    </svg>
                  </GraphDiv> */}
                  <TableDiv>
                    <Link to="/AddContract">
                      <Button
                        style={{
                          marginLeft: "2px",
                          backgroundColor: "#863577",
                          color: "#fff"
                        }}
                      >
                        Add ContractMgmt
                      </Button>
                    </Link>
                    <br />
                    <br />

                    <div style={{ backgroundColor: "white" }}>
                      <ReactTable
                        data={this.state.clientData}
                        style={{ width: 1000 }}
                        getTrProps={this.onRowClick}          //Aishwarya 29 may
                        filterable
                        defaultFilterMethod={(filter, row) =>
                          String(row[filter.id]) === filter.value
                        }
                        columns={[
                          {
                            Header: "",
                            columns: [
                              {
                                Header: <strong>ID</strong>,
                                id: "id",
                                accessor: d => d.id,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["id"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Company Name</strong>,
                                id: "company_name",
                                accessor: d => d.company_name,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["company_name"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Phone Number</strong>,
                                id: "number",
                                accessor: d => d.number,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["number"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Once In Two Month</strong>,
                                id: "oit",
                                accessor: d => d.oit,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["oit"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>OverHuling</strong>,
                                id: "overhauling",
                                accessor: d => d.overhauling,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["overhauling"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>BreakDown</strong>,
                                id: "breakdown",
                                accessor: d => d.breakdown,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["breakdown"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Check Date</strong>,
                                id: "checkDate",
                                accessor: d => d.checkDate,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["checkDate"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Last Action</strong>,
                                id: "lastAction",
                                accessor: d => d.lastAction,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["lastAction"]
                                  }),
                                filterAll: true
                              },

                              // {
                              //   Header: <strong>Action</strong>,
                              //   id: "id",
                              //   accessor: d => d.id,
                              //   Cell: row => (
                              //     <Button
                              //       style={{
                              //         backgroundColor: "#863577",
                              //         color: "#ffffff"
                              //       }}
                              //       name="edit"
                              //       size="large"
                              //       onClick={() =>
                              //         this.EditTicket(row.original)
                              //       }
                              //     >
                              //       Edit
                              //     </Button>
                              //   )
                              // },

                              // {
                              //   Header: "",
                              //   id: "id",
                              //   accessor: d => d.id,
                              //   Cell: row => (
                              //     <Button
                              //       style={{
                              //         backgroundColor: "#863577",
                              //         color: "#ffffff"
                              //       }}
                              //       name="user"
                              //       size="large"
                              //       onClick={() =>
                              //         this.ViewTicket(row.original)
                              //       }
                              //     >
                              //       View
                              //     </Button>
                              //   )
                              // },
                              // {
                              //   id: "id",
                              //   accessor: d => d.id,
                              //   Cell: row => (
                              //     <Button
                              //       style={{
                              //         backgroundColor: "#863577",
                              //         color: "#ffffff"
                              //       }}
                              //       name="user close"
                              //       size="large"
                              //       onClick={() =>
                              //         this.show("tiny", row.original)
                              //       }
                              //     >
                              //       Delete
                              //     </Button>
                              //   )
                              // }
                            ]
                          }
                        ]}
                        defaultPageSize={10}
                      />
                    </div>



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

            {this.state.redirectToEdit && <Redirect to="/EditContract" />}

            {this.state.redirectToview && <Redirect to="/ViewContract" />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Modal size={size1} open={open1} onClose={() => this.close()} closeIcon>
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
            <Button onClick={() => this.assetUpload()} style={{ backgroundColor: "#863577", color: "#ffffff" }}>Contract Upload</Button>
            <Button onClick={() => this.assetStackupload()} style={{ backgroundColor: "#863577", color: "#ffffff" }}>Contract Item Upload</Button>
          </Modal.Content>
        </Modal>



        <Modal
          open={isassetUpload}
          onClose={this.handleClose}
          closeIcon
          className="alertOfFileds"
        >
          <Modal.Header>Upload Excel Report</Modal.Header>
          <Modal.Content>
            <input id="uploadFile" type="file" required />
            <button onClick={() => this.handleUpload()}>Submit</button><br />
            <p><font color="red">{this.state.Uploadmsg}</font></p>
          </Modal.Content>
        </Modal>


        <Modal
          open={isassetStackUpload}
          onClose={this.handleClose}
          closeIcon
          className="alertOfFileds"
        >
          <Modal.Header>Upload Excel Report</Modal.Header>
          <Modal.Content>
            <input id="uploadFile1" type="file" required />
            <button onClick={() => this.handleContractUpload()}>Submit</button><br />
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

const onRowClick = (state, rowInfo, column, instance, open) => {
  return {
    onClick: e => {
      console.log("A Td Element was clicked!")
      console.log("it produced this event:", e)
      console.log("It was in this column:", column)
      console.log("It was in this row:", rowInfo)
      console.log("It was in this table instance:", instance)
      console.log("value of open is", open)
    }
  }
}

export default ContractGodsView
