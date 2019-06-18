import React, { Component } from "react"
import "../../App.css"
import "../../dashboard.css"
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
import Side from "../../component/Sidenav"
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker.css"
//import moment from "moment"
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
import { QuotationList } from "../../component/Api"
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
  SubHeadingText
} from "../../styledComps.js"

class QuotationGodView extends Component {
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
    upFile: "",
    QuotationData: []
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  QuotationGodsview = () => {
    fetch(QuotationList, {
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
        console.log("Quotation data", data.records)
        if (data.records) {
          this.setState({ QuotationData: data.records })
        } else {
          console.log("No Invoice ")
          this.setState({ QuotationData: [] })
        }
      })
  }

  componentDidMount() {
    this.QuotationGodsview()
  }

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
      flag,
      QuotationData
    } = this.state

    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), "i")
      clientData = clientData.filter(i => match.test(i.company_name))
    } else if (!clientData) {
      console.log("No data")
    } else {
      const match = new RegExp(escapeRegExp(query), "i")
      clientData = clientData.filter(i => match.test(i.id) )
      clientData = clientData

      // if(clientData.length < 0){
      //   clientData = clientData.filter(i => match.test(i.partno) )
      //   clientData = clientData
      // }
    } 



    return (
      <div>
        <PageContainer>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Sale">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Quotation God's View</HeadingText>
            </HeadingDiv>
          </div>

          <ContentArea style={{ justifyContent: "center" }}>
            <TableDiv>
              <Input
                size="big"
                type="text"
                placeholder="Search Here!!!"
                size="large"
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
              />
              <Link to="/QuoatationInvoice">
                <Button
                  style={{
                    marginLeft: "12px",
                    backgroundColor: "#863577",
                    color: "#fff"
                  }}
                >
                  Add Quotation
                </Button>
              </Link>
              <br />
              <br />
              <div>
                {QuotationData.length > 0 ? (
                  <Table celled className="table_structure">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Client</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Amount Paid</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        <Table.HeaderCell>Handler</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {QuotationData.map(i => (
                        <Table.Row
                          key={i.id}
                          onClick={() => this.add("tiny", i)}
                        >
                          <Table.Cell className="table_border">
                            {i.id}
                          </Table.Cell>
                          <Table.Cell className="table_border">
                            {i.company_name}
                          </Table.Cell>
                          <Table.Cell className="table_border">
                            {i.total}
                          </Table.Cell>
                          <Table.Cell className="table_border">
                            {i.amount_paid}
                          </Table.Cell>
                          <Table.Cell className="table_border">
                            {i.balance_due}
                          </Table.Cell>
                          <Table.Cell className="table_border">
                            {i.name}
                          </Table.Cell>
                          <Table.Cell className="table_border">
                            {i.created_date}
                          </Table.Cell>
                          <Table.Cell className="table_border">
                            {i.status}
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
                                //onClick={() => this.EditTicket(i)}
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
                                //onClick={() => this.ViewTicket(i)}
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
                                //onClick={() => this.show("tiny")}
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
                        <Table.HeaderCell>Client</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Amount Paid</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        <Table.HeaderCell>Handler</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
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
                />Smart Download
              </Button>

              
            </TableDiv>
          </ContentArea>
        </PageContainer>

       

        <Modal
          size={size1}
          open={open1}
          onClose={() => this.close()}
          closeIcon
          className="alertOfFileds"
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

        <Modal onClose={this.handleClose} closeIcon className="alertOfFileds">
          <Modal.Header>Upload Excel Report</Modal.Header>
          <Modal.Content>
            <input
              type="file"
              id="output"
              onChange={e => this.handleSmartUpload(e)}
            />
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

export default QuotationGodView
