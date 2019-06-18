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
  Popup,
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
import { VictoryBar } from "victory"
import escapeRegExp from "escape-string-regexp"
//import { auth,ref,app } from "./base"
import ReactDOMServer from "react-dom/server"
//import BarChart from 'react-bar-chart';
import { ResponsiveBar } from "@nivo/bar"
import ErrorModal from "../component/ErrorModal"
import { teamUpload } from "../component/Api"
import { Scrollbars } from "react-custom-scrollbars"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts"

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
  TextColor,
  SalesManger,
  SalesEngg,
  Back_off_Ex,
  Service_Engg,
  BackOfficeSupport,
  HTM,
  HE,
  AM,
  AE,
  OM,
  Atlas_Sales,
  Thermax_Sales,
  Bhular_Sales,
  Atlas_Service,
  Thermax_Service,
  Bhular_Service
} from "../styledComps.js"
import ReactTable from "react-table"
import "react-table/react-table.css"
import matchSorter from "match-sorter"

class MyTeam extends Component {
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

    TeamData: [],
    Admin1: 0,
    CEO1: 0,
    Business_Manager1: 0,
    Service_Manager1: 0,
    Sales_Manager1: 0,
    Sales_Engineer1: 0,
    Service_Engineer1: 0,
    Back_Office_Executive1: 0,
    Back_Office_Support1: 0,
    IT_Manager1: 0,
    HR_Executive1: 0,
    Accounts_Manager1: 0,
    Accounts_Executive1: 0,
    Operations_Manager1: 0,
    status: "Denie",
    statusMsg: "Change Status To Approved",

    activeIndex: "",
    allowedRoles: ["Manager", "Admin"],
    rolesOfUser: [],
    allowedHere: true,
    ApprovedUser: 0,
    DeniedUser: 0,
    isupload: false,
    graphData: []
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {
    fetch("http://35.161.99.113:9000/webapi/t_login/list ", {
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
        console.log("Team data", data.records)
        if (data.records) {
          let teamdatagraph = data.records
          this.setState({ graphData: teamdatagraph })

          let tdata = []
          let teamData = data.records

          teamData.map(i => {
            let unique = true
            tdata.map(j => {
              if (i.id == j.id) unique = false
            })
            if (unique) tdata.push(i)
          })

          this.setState({ TeamData: tdata })

          let ap = 0
          let denie = 0
          tdata.map(i => {
            if (i.status == "Approved") {
              ap++
            } else if (i.status == "Denie") {
              denie++
            }
          })

          this.setState({ ApprovedUser: ap, DeniedUser: denie })

          //  let tdata1=tdata.filter((val, mobile_num, array) => {
          //   return array.indexOf(val) == mobile_num
          //  })

          //  console.log("tdata 1 is",tdata1)
        } else {
          console.log("No Team")
          this.setState({ TeamData: [] })
        }
      })

    // setTimeout(() => {
    //  this.state.TeamData.map(i=>{
    //    this.setState({status:i.status})
    //  })
    //     }, 1000)
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
    this.JSONToCSVConvertor(this.state.TeamData, "Data", true)
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
    var fileName = "TeamReport_"
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
    console.log("i", i)
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
  }

  delete = i => {
    console.log(this.state.SelectedTicket.id)
    fetch("http://35.161.99.113:9000/webapi/t_team/t_deleteMember", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        memberId: this.state.SelectedTicket.id
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

  handleBarClick(data, id) {
    console.log(`The  with id ${id} was clicked`)
  }

  handleStatus = i => {
    if (i.status == "Approved") {
      fetch("http://35.161.99.113:9000/webapi/t_team/t_changeStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "denie",
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
      fetch("http://35.161.99.113:9000/webapi/t_team/t_changeStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "Approved",
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

      fetch(teamUpload, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tData: this.state.csvData
        })
      })
        .then(data => {
          console.log("data", data)
          // return data.json();
        })
        .then(data => {
          console.log("data", data)
          this.setState({ isupload: false })
          // console.log("data",data.records)
          if (data.message == "Team Uploaded") {
            this.setState({ msg: "Team Uploaded" })
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

      TeamData,
      Admin1,
      CEO1,
      Business_Manager1,
      Service_Manager1,
      Sales_Manager1,
      Sales_Engineer1,
      Service_Engineer1,
      Back_Office_Executive1,
      Back_Office_Support1,
      IT_Manager1,
      HR_Executive1,
      Accounts_Manager1,
      Accounts_Executive1,
      Operations_Manager1,
      status,
      statusMsg,
      activeIndex,
      ApprovedUser,
      DeniedUser,
      isupload
    } = this.state

    if (!flag) {
      listToShow = TeamData
      console.log("listToShow - User", listToShow)
    } else {
      listToShow = listData
      console.log("listToShow - list", listToShow)
    }

    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), "i")
      let Filtereduserdata = listToShow.filter(i => match.test(i.name))
      listToShow = Filtereduserdata
    } else if (!listToShow) {
      console.log("No data")
    } else {
      const match = new RegExp(escapeRegExp(query), "i")
      let Filtereduserdata = listToShow.filter(i => match.test(i.id))
      listToShow = Filtereduserdata
    }

    let Admin = 0
    let CEO = 0
    let Business_Manager = 0
    let Service_Manager = 0
    let Sales_Manager = 0
    let Sales_Engineer = 0
    let Service_Engineer = 0
    let Back_Office_Executive = 0
    let Back_Office_Support = 0
    let IT_Manager = 0
    let HR_Executive = 0
    let Accounts_Manager = 0
    let Accounts_Executive = 0
    let Operations_Manager = 0

    let asCount = 0
    let tsCount = 0
    let bsCount = 0
    let atlasServiceCount = 0
    let thermaxServiceCount = 0
    let bhularServiceCount = 0

    let AdminCount = []
    let CEOCount = []
    let Business_ManagerCount = []
    let Service_ManagerCount = []
    let Sales_ManagerCount = []
    let Sales_EngineerCount = []
    let Service_EngineerCount = []
    let Back_Office_ExecutiveCount = []
    let Back_Office_SupportCount = []
    let IT_ManagerCount = []
    let HR_ExecutiveCount = []
    let Accounts_ManagerCount = []
    let Accounts_ExecutiveCount = []
    let Operations_ManagerCount = []

    let AS = []
    let BS = []
    let TS = []

    let Atlas_Service = []
    let Thermax_Service = []
    let Bhular_Service = []

    console.log("flag", flag)
    console.log("list data", listData)
    console.log("team data", TeamData)

    this.state.graphData.map(i => {
      switch (i.role) {
        case "Admin":
          Admin1++
          Admin++
          AdminCount.push(i)
          console.log("Admin ", Admin)

          break

        case "CEO/Director":
          CEO1++
          CEO++
          CEOCount.push(i)
          console.log("CEO ", CEO)

          break

        case "Business Manager":
          Business_Manager1++
          Business_Manager++
          Business_ManagerCount.push(i)
          break

        case "Service Manager":
          Service_Manager1++
          Service_Manager++
          Service_ManagerCount.push(i)
          break

        case "Sales Manager":
          Sales_Manager1++
          Sales_Manager++
          Sales_ManagerCount.push(i)
          break

        case "Sales Engineer":
          Sales_Engineer1++
          Sales_Engineer++
          Sales_EngineerCount.push(i)
          break

        case "Service Engineer":
          Service_Engineer1++
          Service_Engineer++
          Service_EngineerCount.push(i)
          break

        case "Back Office Executive":
          Back_Office_Executive1++
          Back_Office_Executive++
          Back_Office_ExecutiveCount.push(i)
          break

        case "Back Office Support":
          Back_Office_Support1++
          Back_Office_Support++
          Back_Office_SupportCount.push(i)
          break

        case "HR/ IT Manager":
          IT_Manager1++
          IT_Manager++
          IT_ManagerCount.push(i)
          break

        case "HR Executive":
          HR_Executive1++
          HR_Executive++
          HR_ExecutiveCount.push(i)
          break

        case "Accounts Manager":
          Accounts_Manager1++
          Accounts_Manager++
          Accounts_ManagerCount.push(i)
          break

        case "Accounts Executive":
          Accounts_Executive1++
          Accounts_Executive++
          Accounts_ExecutiveCount.push(i)
          break

        case "Operations Manager":
          Operations_Manager1++
          Operations_Manager++
          Operations_ManagerCount.push(i)
          break

        case "Atlas Sales- HOD":
          asCount++
          AS.push(i)
          break

        case "Thermax Sales - HOD":
          tsCount++
          TS.push(i)
          break

        case "Buhler Sales - HOD":
          bsCount++
          BS.push(i)
          break

        case "Atlas Service- HOD":
          atlasServiceCount++
          Atlas_Service.push(i)
          break

        case "Buhler Service-HOD":
          bhularServiceCount++
          Bhular_Service.push(i)
          break

        case "Thermax Service- HOD":
          thermaxServiceCount++
          Thermax_Service.push(i)
          break

        default:
          console.log("No count")
          break
      }
    })

    const data3 = {
      data2: [
        { name: "Admin", MyTeam: Admin },
        { name: "CEO", MyTeam: CEO },
        { name: "Business_Manager", MyTeam: this.state.Business_Manager1 },
        { name: "Service Manager", MyTeam: this.state.Service_Manager1 },
        { name: "Sales Manager", MyTeam: this.state.Sales_Manager1 },
        { name: "Sales Engineer", MyTeam: this.state.Sales_Engineer1 },
        { name: "Service Engineer", MyTeam: this.state.Service_Engineer1 },
        { name: "HR/ IT Manager", MyTeam: this.state.IT_Manager1 },
        { name: "HR Executive", MyTeam: this.state.HR_Executive1 },
        { name: "Accounts Manager", MyTeam: this.state.Accounts_Manager1 },
        { name: "Accounts Executive", MyTeam: this.state.Accounts_Executive1 },
        { name: "Operations Manager", MyTeam: this.state.Operations_Manager1 }
      ],
      activeIndex: 0
    }

    const activeItem = data3.data2[activeIndex]

    const data4 = [
      { name: "Admin", MyTeam: Admin },
      { name: "CEO", MyTeam: CEO },
      { name: "Business_Manager", MyTeam: Business_Manager },
      { name: "Service Manager", MyTeam: Service_Manager },
      { name: "Sales Manager", MyTeam: Sales_Manager },
      { name: "Sales Engineer", MyTeam: Sales_Engineer },
      { name: "Service Engineer", MyTeam: Service_Engineer },
      { name: "HR/ IT Manager", MyTeam: IT_Manager },
      { name: "HR Executive", MyTeam: HR_Executive },
      { name: "Accounts Manager", MyTeam: Accounts_Manager },
      { name: "Accounts Executive", MyTeam: Accounts_Executive },
      { name: "Operations Manager", MyTeam: Operations_Manager }
    ]

    let piedata = [
      {
        id: "Admin",
        x: "Admin",
        y: Admin
      },
      {
        id: "CEO/ Director",
        x: "CEO/ Director",
        y: CEO
      },
      {
        id: "Business Manager",
        x: "Business Manager",
        y: Business_Manager
      },
      {
        id: "Sales Manager",
        x: "Sales Manager",
        y: Sales_Manager
      },
      {
        id: "Sales Engineer",
        x: "Sales Engineer",
        y: Sales_Engineer
      },
      {
        id: "Service Engineer",
        x: "Service Engineer",
        y: Service_Engineer
      },
      {
        id: "Back Office Executive",
        x: "Back Office Executive",
        y: Back_Office_Executive
      },
      {
        id: "Back Office Support",
        x: "Back Office Support",
        y: Back_Office_Support
      },
      {
        id: "HR/ IT Manager",
        x: "HR/ IT Manager",
        y: IT_Manager
      },
      {
        id: "HR Executive",
        x: "HR Executive",
        y: HR_Executive
      },
      {
        id: "Accounts Manager",
        x: "Accounts Manager",
        y: Accounts_Manager
      },
      {
        id: "Accounts Executive",
        x: "Accounts Executive",
        y: Accounts_Executive
      },
      {
        id: "Operations Manager",
        x: "Operations Manager",
        y: Operations_Manager
      },
      {
        id: "Atlas Sales- HOD",
        x: "Atlas Sales- HOD",
        y: asCount
      },
      {
        id: "Thermax Sales - HOD",
        x: "Thermax Sales - HOD",
        y: tsCount
      },
      {
        id: "Buhler Sales - HOD",
        x: "Buhler Sales - HOD",
        y: bsCount
      },
      {
        id: "Atlas Service- HOD",
        x: "Atlas Service- HOD",
        y: atlasServiceCount
      },
      {
        id: "Thermax Service- HOD",
        x: "Thermax Service- HOD",
        y: thermaxServiceCount
      },
      {
        id: "Buhler Service-HOD",
        x: "Buhler Service-HOD",
        y: bhularServiceCount
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
            <PageContainer3>
              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
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
                    <HeadingText>My Team View</HeadingText>
                  </HeadingDiv>
                </div>
                <ContentArea>
                  <GraphDiv>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ display: "flex", margin: "8px" }}>
                        <NewLeadDiv />
                        <SubHeadingText>Admin</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <ProductDiv />
                        <SubHeadingText>CEO/Director</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <AssetDiv />
                        <SubHeadingText>Business Manager</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <SalesManger />
                        <SubHeadingText>Sales Manager</SubHeadingText>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <SalesEngg />
                      <SubHeadingText>Sales Engineer</SubHeadingText>

                      <Service_Engg />
                      <SubHeadingText>Service Engginer</SubHeadingText>

                      <Back_off_Ex />
                      <SubHeadingText>Back Office Executive</SubHeadingText>

                      <BackOfficeSupport />
                      <SubHeadingText>Back Office Support</SubHeadingText>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <HTM />
                      <SubHeadingText>HR/IT Manager</SubHeadingText>

                      <HE />
                      <SubHeadingText>HR Executive</SubHeadingText>

                      <AM />
                      <SubHeadingText>Accounts Manger</SubHeadingText>

                      <AE />
                      <SubHeadingText>Accounts Excutive</SubHeadingText>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <OM />
                      <SubHeadingText>Operation Manger</SubHeadingText>

                      <Atlas_Sales />
                      <SubHeadingText>Atlas Sales- HOD</SubHeadingText>

                      <Thermax_Sales />
                      <SubHeadingText>Thermax Sales - HOD</SubHeadingText>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <OM />
                      <SubHeadingText>Buhler Sales - HOD</SubHeadingText>

                      <OM />
                      <SubHeadingText>Thermax Service- HOD</SubHeadingText>

                      <OM />
                      <SubHeadingText>Buhler Service-HOD</SubHeadingText>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <OM />
                      <SubHeadingText>Operation Manger</SubHeadingText>
                    </div>

                    {/* <div style={{ display: "flex", justifyContent: "center" }}>
                     
                     
                      <div style={{ display: "flex", margin: "8px" }}>
                        <NewLeadDiv />
                        <SubHeadingText>Service Enigineer</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <AssetDiv />
                        <SubHeadingText>Manager</SubHeadingText>
                      </div>

                      <div style={{ display: "flex", margin: "8px" }}>
                        <ProductDiv />
                        <SubHeadingText>Sale</SubHeadingText>
                      </div>
                    </div> */}

                    {/* <BarChart
                      width={500}
                      height={650}
                      data={data4}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="MyTeam" fill="#8884d8" />
                    </BarChart> */}

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
                        style={{
                          labels: { fontSize: 22, fill: "white" }
                        }}
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
                          "#FFEB3B",
                          "#795548",
                          "#4615b2",
                          "#b2102f",
                          "#9500ae",
                          "#ff6361",
                          "#3498DB",
                          "#D35400",
                          "#33CCFF",
                          "#FFF176",
                          "#D7CCC8"
                        ]}
                        labels={d => (d.y == 0 ? "" : `${d.y}`)}
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
                                        case "Admin":
                                          if (props.datum.id == "Admin") {
                                            this.setState({
                                              flag: true,
                                              listData: AdminCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Business Manager":
                                          if (
                                            props.datum.id == "Business Manager"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Business_ManagerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "CEO/ Director":
                                          if (
                                            props.datum.id == "CEO/ Director"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: CEOCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break
                                        case "Service Manager":
                                          if (
                                            props.datum.id == "Service Manager"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Service_ManagerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }
                                          break

                                        case "Sales Manager":
                                          if (
                                            props.datum.id == "Sales Manager"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Sales_ManagerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Sales Engineer":
                                          if (
                                            props.datum.id == "Sales Engineer"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Sales_EngineerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Service Engineer":
                                          if (
                                            props.datum.id == "Service Engineer"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Service_EngineerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Back Office Executive":
                                          if (
                                            props.datum.id ==
                                            "Back Office Executive"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Back_Office_ExecutiveCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Back Office Support":
                                          if (
                                            props.datum.id ==
                                            "Back Office Support"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Back_Office_SupportCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "HR/ IT Manager":
                                          if (
                                            props.datum.id == "HR/ IT Manager"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: IT_ManagerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "HR Executive":
                                          if (
                                            props.datum.id == "HR Executive"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: HR_ExecutiveCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Accounts Manager":
                                          if (
                                            props.datum.id == "Accounts Manager"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Accounts_ManagerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Accounts Executive":
                                          if (
                                            props.datum.id ==
                                            "Accounts Executive"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Accounts_ExecutiveCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Operations Manager":
                                          if (
                                            props.datum.id ==
                                            "Operations Manager"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Operations_ManagerCount
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Atlas Sales- HOD":
                                          if (
                                            props.datum.id == "Atlas Sales- HOD"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: AS
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Thermax Sales - HOD":
                                          if (
                                            props.datum.id ==
                                            "Thermax Sales - HOD"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: TS
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Buhler Sales - HOD":
                                          if (
                                            props.datum.id ==
                                            "Buhler Sales - HOD"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: BS
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Atlas Service- HOD":
                                          if (
                                            props.datum.id ==
                                            "Atlas Service- HOD"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Atlas_Service
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Thermax Service- HOD":
                                          if (
                                            props.datum.id ==
                                            "Thermax Service- HOD"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Thermax_Service
                                            })
                                          } else {
                                            this.setState({ msg: "No data" })
                                          }

                                          break

                                        case "Buhler Service-HOD":
                                          if (
                                            props.datum.id ==
                                            "Buhler Service-HOD"
                                          ) {
                                            this.setState({
                                              flag: true,
                                              listData: Bhular_Service
                                            })
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

                    <TableDiv>
                      <Button
                        style={{
                          backgroundColor: "#863577",
                          color: "#ffffff"
                        }}
                      >
                        Approved User : {ApprovedUser}
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#863577",
                          color: "#ffffff",
                          float: "right"
                        }}
                      >
                        Denie User : {DeniedUser}
                      </Button>
                    </TableDiv>
                  </GraphDiv>
                  <TableDiv>
                    {/* <Input
                      size="big"
                      type="text"
                      placeholder="Search here by id or name !!!"
                      size="large"
                      value={query}
                      onChange={event => this.updateQuery(event.target.value)}
                    /> */}
                    <Link to="/AddTeam">
                      <Button
                        style={{
                          marginLeft: "100px",  //Aishwarya 29 may  
                          backgroundColor: "#863577",
                          color: "#fff"
                        }}
                      >
                        Add Team
                      </Button>
                    </Link>
                    <br />
                    <br />

                    <div style={{ backgroundColor: "white", marginLeft: "100px" }}>   {/*Aishwarya 29 may*/}
                      <ReactTable
                        data={listToShow}
                        style={{ width: 900 }}                 //Aishwarya 29 may
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
                                Header: <strong>Team ID</strong>,
                                id: "id",
                                accessor: d => d.id,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["id"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Name</strong>,
                                id: "name",
                                accessor: d => d.name,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["name"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Phone Number</strong>,
                                id: "mobile_num",
                                accessor: d => d.mobile_num,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["mobile_num"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Address</strong>,
                                id: "Address",
                                accessor: d => d.Address,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["Address"]
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Employee Code</strong>,
                                id: "empcode",
                                accessor: d => d.empcode,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["empcode"]
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Status</strong>,
                                id: "status",
                                accessor: d => d.status,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ["status"]
                                  }),
                                filterAll: true,
                                Cell: row => {
                                  if (row.original.status == "Approved")
                                    return (
                                      <Popup
                                        trigger={
                                          <Button
                                            toggle
                                            onClick={() =>
                                              this.handleStatus(row.original)
                                            }
                                          >
                                            {row.original.status}
                                          </Button>
                                        }
                                        content="Change Status To Denie"
                                        wide
                                      />
                                    )

                                  if (row.original.status == "Denie")
                                    return (
                                      <Popup
                                        trigger={
                                          <Button
                                            toggle
                                            onClick={() =>
                                              this.handleStatus(row.original)
                                            }
                                          >
                                            {row.original.status}
                                          </Button>
                                        }
                                        content="Change Status To Approved"
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
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#863577",
                        color: "#ffffff",
                        marginLeft: "100px",        //Aishwarya 29 may
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
            </PageContainer3>
            {this.state.redirectToEdit && <Redirect to="/EditTeam" />}
            {this.state.redirectToview && <Redirect to="/ViewTeam" />}
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

const vertical = {
  width: "200px",
  height: "600px",

  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  margin: "auto",

  maxWidth: "100%",
  maxHeight: "100%",
  overflow: "auto"
}

export default MyTeam
