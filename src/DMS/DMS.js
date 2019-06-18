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

import { ProductList, dmsGodview, DeleteFile } from "../component/Api"
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
} from "../styledComps.js"
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'


class DMS extends Component {
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
    Product_Image: [],
    isupload: false,
    fileData: "",
    DMSData: []
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {
    fetch(dmsGodview, {
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
        console.log("DMS data", data.records)
        if (data.records) {
          this.setState({ DMSData: data.records })
        } else {
          console.log("No DMS")
          this.setState({ DMSData: [] })
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

    fetch("http://35.161.99.113:9000/webapi/t_product/t_getLink", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: Ticketdata.productId
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("Product images Data", data.records)
        sessionStorage.setItem("Product_Image", JSON.stringify(data.records))
        this.setState({ Product_Image: data.records })
      })
  }

  EditTicket = (i) => {
    sessionStorage.setItem(
      "editTicket",
      JSON.stringify(i)
    )
    this.setState({ redirectToEdit: true })
  }

  ViewTicket = (i) => {
    console.log("user edit", this.state.SelectedUser)
    sessionStorage.setItem(
      "editTicket",
      JSON.stringify(i)
    )
    this.setState({ redirectToview: true })
  }

  show = (size1, i) => {
    this.setState({ size1, open1: true, SelectedTicket: i })
  }
  delete = (i) => {
    console.log(this.state.SelectedTicket.id)
    fetch(DeleteFile, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        folderId: this.state.SelectedTicket.id
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

  handleSmartUpload = e => {
    //  e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      console.log("file value which is uploaded", e.target.value)

      console.log("file which is uploaded", e.target.files)
      console.log("file which is uploaded", e.target.files[0])
      let filedata = e.target.value

      const data = new FormData()
      data.append("file", e.target.files[0])
      data.append("name", "some value user types")
      data.append("description", "some value user types")
      console.log("data is", data)

      fetch("http://localhost:9000/webapi/t_asset/vendorimportdata", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          //file:data
          file: e.target.value
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("client data", data.records)
        })
    } else {
      this.setState({ msg: "No File Chosen" })
    }
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
      isupload,
      fileData,
      flag,
      DMSData
    } = this.state


    if (!flag) {
      listToShow = DMSData
      console.log('listToShow - User', listToShow);
    }
    else {
      listToShow = listData
      console.log('listToShow - list', listToShow);
    }

    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), "i")
      let Filtereduserdata = listToShow.filter(i => match.test(i.folderName))
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
                  <HeadingText>Document Management System</HeadingText>
                </HeadingDiv>
              </div>
              <ContentArea style={{ justifyContent: "center" }}>
                <TableDiv>
                  {/* <Input
                    size="big"
                    type="text"
                    placeholder="Search here by Id or Folder Name !!!"
                    size="large"
                    value={query}
                    onChange={event => this.updateQuery(event.target.value)}
                  /> */}
                  <Link to="/AddDMS">
                    <Button
                      style={{
                        marginLeft: "12px",
                        backgroundColor: "#863577",
                        color: "#fff"
                      }}
                    >
                      Add DMS
                    </Button>
                  </Link>
                  <br />
                  <br />

                  <div style={{ backgroundColor: "white" }}>

                    <ReactTable
                      data={listToShow}
                      style={{ width: 900 }}                 //Aishwarya 29 may
                      getTrProps={this.onRowClick}          //Aishwarya 29 may
                      filterable
                      defaultFilterMethod={(filter, row) =>

                        String(row[filter.id]) === filter.value}
                      columns={[

                        {
                          Header: "",
                          columns: [
                            {
                              Header: <strong>ID</strong>,
                              id: "id",
                              accessor: d => d.id,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["id"] }),
                              filterAll: true,

                            },

                            {

                              Header: <strong>Folder Name</strong>,
                              id: "folderName",
                              accessor: d => d.folderName,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["folderName"] }),
                              filterAll: true,

                            },
                            {
                              Header: <strong>Handler Name</strong>,
                              id: "handlerName",
                              accessor: d => d.handlerName,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["handlerName"] }),
                              filterAll: true
                            },

                            {
                              Header: <strong>Date</strong>,
                              id: "date",
                              accessor: d => d.date,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, { keys: ["date"] }),
                              filterAll: true
                            },
                            // {
                            // Header: <strong>Action</strong>,
                            // id:"id",
                            // accessor: d => d.test,
                            // Cell: row =>(
                            // <Button
                            // style={{
                            // backgroundColor: "#863577",
                            // color: "#ffffff"
                            // }}
                            // name="edit"
                            // size="large"
                            // onClick={() => this.EditTicket(row.original)}
                            // >
                            // Edit
                            // </Button>
                            // )
                            // },

                            // {
                            // Header: "",
                            // id:"id",
                            // accessor: d => d.id,
                            // Cell: row =>(
                            // <Button
                            //              style={{
                            //                backgroundColor: "#863577",
                            //                color: "#ffffff"
                            //              }}
                            //              name="user"
                            //              size="large"
                            //              onClick={() => this.ViewTicket(row.original)}
                            //            >
                            //              View
                            //            </Button>


                            // ),

                            // },
                            // {

                            // id:"id",
                            // accessor: d => d.id,
                            // Cell: row =>(
                            // <Button
                            // style={{
                            // backgroundColor: "#863577",
                            // color: "#ffffff"
                            // }}
                            // name="user close"
                            // size="large"
                            // onClick={() => this.show("tiny",row.original)}
                            // >
                            // Delete
                            // </Button>


                            // ),

                            // }


                          ]
                        },



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
                    />Smart Download
                  </Button>

                </TableDiv>
              </ContentArea>
            </PageContainer>

            {this.state.redirectToEdit && <Redirect to="/EditDMS" />}

            {this.state.redirectToview && <Redirect to="/ViewDMS" />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Modal
          size={size}
          open={open}
          onClose={() => this.close()}
          closeIcon
          className="alertOfFileds"
        >
          <Modal.Header>
            <Header as="h3" content="User Action">
              User Action
            </Header>
          </Modal.Header>

          <Modal.Content>
            <Segment.Group horizontal>
              <Segment>
                <Button
                  style={{
                    backgroundColor: "#863577",
                    color: "#ffffff"
                  }}
                  name="edit"
                  size="huge"
                  onClick={() => this.EditTicket()}
                >
                  Edit
                </Button>
                {this.state.redirectToEdit && <Redirect to="/EditDMS" />}
              </Segment>

              <Segment>
                <Button
                  style={{
                    backgroundColor: "#863577",
                    color: "#ffffff"
                  }}
                  name="user"
                  size="huge"
                  onClick={() => this.ViewTicket()}
                >
                  View
                </Button>
                {this.state.redirectToview && <Redirect to="/ViewDMS" />}
              </Segment>
              <Segment>
                {" "}
                <Button
                  style={{
                    backgroundColor: "#863577",
                    color: "#ffffff"
                  }}
                  name="user close"
                  size="huge"
                  onClick={() => this.show("tiny")}
                >
                  Delete
                </Button>
              </Segment>
            </Segment.Group>
          </Modal.Content>
        </Modal>

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

        <Modal
          open={isupload}
          onClose={this.handleClose}
          closeIcon
          className="alertOfFileds"
        >
          <Modal.Header>Upload Excel Report</Modal.Header>
          <Modal.Content>
            <input
              type="file"
              id="output"
              value={fileData}
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

export default DMS
