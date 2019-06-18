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
  Divider, Popup
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
import { tixyUpload, leadUploadData } from "../component/Api"

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
  SalesManger,
  SalesEngg,
  Back_off_Ex,
  Service_Engg,
  BackOfficeSupport,
  HTM,
  Inprogress,
  TextColor
} from "../styledComps.js"

class LeadGodsView extends Component {
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
    csvData: []
  }

  componentDidMount() {
    fetch("http://35.161.99.113:9000/webapi/leadmgmt/list", {
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
          this.setState({ clientBackupData: data.records })
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
    fetch('http://35.161.99.113:9000/webapi/leadmgmt/list', {
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
      console.log("data", data)
      console.log("client data", data.records)
      if (data.records) {
        this.setState({ clientData: data.records })
        this.JSONToCSVConvertor(data.records, "Data", true);

      } else {
        console.log("No Client")
        this.setState({ clientData: [] })
      }
    })
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
    var fileName = "LeadReport"
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

  EditLead = i => {
    //console.log("lead data",i)
    sessionStorage.setItem("editLead", JSON.stringify(i))
    this.setState({ redirectToEdit: true })
  }

  ViewLead = i => {
    sessionStorage.setItem("viewLead", JSON.stringify(i))
    this.setState({ redirectToview: true })
  }

  show = (size1, i) => {
    console.log('i:', i)
    this.setState({ size1, open1: true, SelectedTicket: i })
  }

  delete = i => {
    //console.log(i.id)
    console.log(this.state.SelectedTicket.id)
    fetch("http://35.161.99.113:9000/webapi/leadmgmt/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.SelectedTicket.id
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

      fetch(leadUploadData, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lData: this.state.csvData
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
        })
    }, 1500)
  }


  handleStatus = i => {
    if (i.lead_status == "Active") {
      fetch("http://35.161.99.113:9000/webapi/leadmgmt/leadChangeStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "Inactive",
          memberId: i.id
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
    } else {
      fetch("http://35.161.99.113:9000/webapi/leadmgmt/leadChangeStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "Active",
          memberId: i.id
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
  }
  //Aishwarya 30 may
  onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        // this.state.redirectToview && <Redirect to="/ViewTixy" />
        // this.setState({ redirectToview: true && <Redirect to="/ViewTixy" /> });
        // <Redirect to="/ViewTixy" />

        this.ViewLead(rowInfo.original)                       //Aishwarya 29 May

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
      fileData
    } = this.state

    if (!flag) {
      listToShow = clientData
      console.log("listToShow - User", listToShow)
    } else {
      listToShow = listData
      console.log("listToShow - list", listToShow)
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

    let leadQualification = 0
    let Tech_spec = 0
    let project_feasibility = 0
    let man_to_man = 0

    let order_analysis = 0
    let ref_showing = 0
    let obj_handling = 0
    let sales_order = 0
    let lead_create = 0

    let lead_createCount = []
    let leadQualificationCount = []
    let Tech_specCount = []
    let project_feasibilityCount = []
    let man_to_manCount = []

    let order_analysisCount = []
    let ref_showingCount = []
    let obj_handlingCount = []
    let sales_orderCount = []

    let rejectedCount = []
    let OnHoldCount = []
    let ClosedCount = []
    let UnderProgressCount = []

    console.log("flag", flag)
    console.log("list data", listData)

    this.state.clientData.map(i => {
      switch (i.leadPhase) {
        case "Lead Created":
          lead_create++
          lead_createCount.push(i)
          break
        case "Lead Qualification":
          leadQualification++
          leadQualificationCount.push(i)
          break
        case "Tech Specification":
          Tech_spec++
          Tech_specCount.push(i)
          break
        case "Project Feasibility":
          project_feasibility++
          project_feasibilityCount.push(i)
          break
        case "KYC":
          man_to_man++
          man_to_manCount.push(i)
          break
        case "Order Analysis":
          order_analysis++
          order_analysisCount.push(i)
          break
        case "Ref Showcasing":
          ref_showing++
          ref_showingCount.push(i)
          break
        case "Objection Handling":
          obj_handling++
          obj_handlingCount.push(i)
          break
        case "Sales Order":
          sales_order++
          sales_orderCount.push(i)
          break

        default:
          break
      }
    })

    console.log("lead_create", lead_create)
    console.log("lead Qualification is", leadQualification)

    let piedata = [
      {
        id: "lead_create",
        x: "lead_create",
        y: lead_create,
        color: "hsl(44, 100%, 58%)"
      },
      {
        id: "lead_qualification",
        x: "lead_qualification",
        y: leadQualification,
        color: "hsl(0, 75%, 50%)"
      },
      {
        id: "tech_specification",
        x: "tech_specification",
        y: Tech_spec,
        color: "hsl(128, 70%, 40%)"
      },
      {
        id: "project_feasibility",
        x: "project_feasibility",
        y: project_feasibility,
        color: "hsl(40, 70%, 40%)"
      },
      {
        id: "man_to_man",
        x: "man_to_man",
        y: man_to_man,
        color: "hsl(40, 70%, 40%)"
      },
      {
        id: "order_analysis",
        x: "order_analysis",
        y: order_analysis,
        color: "hsl(40, 70%, 40%)"
      },
      {
        id: "ref_showing",
        x: "ref_showing",
        y: ref_showing,
        color: "hsl(40, 70%, 40%)"
      },
      {
        id: "obj_handle",
        x: "obj_handle",
        y: obj_handling,
        color: "hsl(40, 70%, 40%)"
      },
      {
        id: "sale_order",
        x: "sale_order",
        y: sales_order,
        color: "hsl(40, 70%, 40%)"
      }
    ]

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
                  <HeadingText>Lead Stages Analysis Dashboard</HeadingText>
                </HeadingDiv>
              </div>
              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
                <ContentArea>
                  <GraphDiv>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap"
                      }}
                    >
                      <div style={{ display: "flex", margin: "8px" }}>
                        <NewLeadDiv />
                        <SubHeadingText>Lead Create</SubHeadingText>
                      </div>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <ProductDiv />
                        <SubHeadingText>Lead Qualification</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <AssetDiv />
                        <SubHeadingText>Tech Specification</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <SalesManger />
                        <SubHeadingText>Project Feasibility</SubHeadingText>
                      </div>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <SalesEngg />
                        <SubHeadingText>Man to Man</SubHeadingText>
                      </div>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <Service_Engg />
                        <SubHeadingText>Order Analysis</SubHeadingText>
                      </div>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <Back_off_Ex />
                        <SubHeadingText>Ref Showcasing</SubHeadingText>
                      </div>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <BackOfficeSupport />
                        <SubHeadingText>Objection Handling</SubHeadingText>
                      </div>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <HTM />
                        <SubHeadingText>Sales Order</SubHeadingText>
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
                        colorScale={[
                          "orange",
                          "#00aa8a",
                          "#643C31",
                          "#6975A9",
                          "#002884",
                          "#009688",
                          "#CDDC39",
                          "#76FF03",
                          "#FFEB3B"
                        ]}
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
                                        case "lead_create":
                                          if (props.datum.id == "lead_create") {
                                            // hold=OnHoldCount

                                            this.setState({
                                              flag: true,
                                              listData: lead_createCount
                                            })

                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "lead_qualification":
                                          if (
                                            props.datum.id ==
                                            "lead_qualification"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: leadQualificationCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "tech_specification":
                                          if (
                                            props.datum.id ==
                                            "tech_specification"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Tech_specCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "project_feasibility":
                                          if (
                                            props.datum.id ==
                                            "project_feasibility"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: project_feasibilityCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "man_to_man":
                                          if (props.datum.id == "man_to_man") {
                                            this.setState({
                                              flag: true,
                                              listData: man_to_manCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "order_analysis":
                                          if (
                                            props.datum.id == "order_analysis"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: order_analysisCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "ref_showing":
                                          if (props.datum.id == "ref_showing") {
                                            this.setState({
                                              flag: true,
                                              listData: ref_showingCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "obj_handle":
                                          if (props.datum.id == "obj_handle") {
                                            this.setState({
                                              flag: true,
                                              listData: obj_handlingCount
                                            })
                                            console.log("flag", flag)
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "sale_order":
                                          if (props.datum.id == "sale_order") {
                                            this.setState({
                                              flag: true,
                                              listData: sales_orderCount
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
                  </GraphDiv>
                  <TableDiv>
                    <Link to="/AddLeadMgmt">
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

                    <div style={{ backgroundColor: "white" }}>
                      <ReactTable
                        data={listToShow}
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
                                id: "productId",
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
                                    keys: ["vertical"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Lead Owner</strong>,
                                id: "owner",
                                accessor: d => d.owner,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["groupName"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Lead Phase</strong>,
                                id: "phase",
                                accessor: d => d.leadPhase,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["subGroupName"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Vertical</strong>,
                                id: "vertical",
                                accessor: d => d.vertical,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["number"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Sales Zone</strong>,
                                id: "salezone",
                                accessor: d => d.saleZone,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["aname"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Status</strong>,
                                id: "lead_status",
                                accessor: d => d.lead_status,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["lead_status"]
                                  }),
                                filterAll: true,
                                Cell: row => {
                                  if (row.original.lead_status == "Active")
                                    return (
                                      <Popup
                                        trigger={
                                          <Button
                                            toggle
                                            onClick={() =>
                                              this.handleStatus(row.original)
                                            }
                                          >
                                            {row.original.lead_status}
                                          </Button>
                                        }
                                        content="Change Status To Inactive"
                                        wide
                                      />
                                    )

                                  if (row.original.lead_status == "Inactive")
                                    return (
                                      <Popup
                                        trigger={
                                          <Button
                                            toggle
                                            onClick={() =>
                                              this.handleStatus(row.original)
                                            }
                                          >
                                            {row.original.lead_status}
                                          </Button>
                                        }
                                        content="Change Status To Active"
                                        wide
                                      />
                                    )
                                }
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
                              //       onClick={() => this.EditLead(row.original)}
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
                              //       onClick={() => this.ViewLead(row.original)}
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

            {this.state.redirectToEdit && <Redirect to="/EditLeadMgmt" />}

            {this.state.redirectToview && <Redirect to="/ViewLeadMgmt" />}
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
            <input id="uploadFile" type="file" required />
            <button onClick={() => this.handleUpload()}>Submit</button>
            <br />
            <p>
              <font color="red">{this.state.Uploadmsg}</font>
            </p>
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

export default LeadGodsView
