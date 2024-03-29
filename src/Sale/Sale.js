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
import { auth, ref, app } from "../component/base"
import fb from "firebase"
import ReactDOMServer from "react-dom/server"
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
  Inprogress
} from "../styledComps.js"

class Sale extends Component {
  state = {
    menuVisible: false,
    startdate: "",
    dataList: [],
    date: "",
    msg: "",
    size: "",
    open: false,
    query: "",

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
    upFile: ""
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {}

  updateQuery = query => {
    this.setState({ query: query.trim() })
  }

  download = () => {
    console.log("download")

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
    var fileName = "MyReport_"
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

  EditTicket = () => {
    sessionStorage.setItem(
      "editTicket",
      JSON.stringify(this.state.SelectedTicket)
    )
    this.setState({ redirectToEdit: true })
  }

  ViewTicket = () => {
    console.log("user edit", this.state.SelectedUser)
    sessionStorage.setItem(
      "editTicket",
      JSON.stringify(this.state.SelectedTicket)
    )
    this.setState({ redirectToview: true })
  }

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
                  <HeadingText>Sale</HeadingText>
                </HeadingDiv>
              </div>
              <ContentArea style={{ justifyContent: "center" }}>
                <Link to="/InvoiceGodView">
                  <Button
                    className="Thermobtnclr"
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Invoices
                  </Button>
                </Link>
                <Link to="/QuotationGodView">
                  <Button
                    className="Thermobtnclr"
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Quotation
                  </Button>
                </Link>
                <Link to="/PurchaseOrderGodView">
                  <Button
                    className="Thermobtnclr"
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Purchase Order
                  </Button>
                </Link>
                <Link to="/PerformaGodView">
                  <Button
                    className="Thermobtnclr"
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Performa
                  </Button>
                </Link>
                <Link to="/ServiceOrderGodView">
                  <Button
                    className="Thermobtnclr"
                    style={{ backgroundColor: "#863577", color: "#ffffff" }}
                  >
                    Service
                  </Button>
                </Link>
              </ContentArea>
            </PageContainer>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

const resultRenderer = ({ company_name, number }) => (
  <span>
    <Header as="h4">{company_name}</Header>
    <p>{number}</p>
  </span>
)

export default Sale
