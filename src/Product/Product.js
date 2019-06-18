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

import { ProductList, productUpload } from "../component/Api"
import { Scrollbars } from "react-custom-scrollbars"
import Workbook from 'react-excel-workbook'


import ReactTable from "react-table";
import "react-table/react-table.css";

import matchSorter from 'match-sorter'

import { placeofSupply, verticallist, grouplist, grpBasedsubgrp, verticalBasedgrp } from "../component/Api";


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
  TextColor
} from "../styledComps.js"

class Product extends Component {
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
    queryVertical: '',
    queryGroup: '',
    querySubGroup: '',
    groupData: [],
    subGroupData: [],
    verticalData: [],
    productData: [],
    flag2: false
  }


  listVertical = () => {

    fetch(verticallist, {
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
      //console.log("data",data)
      //console.log("vertical list",data.records)
      if (data.records) {
        this.setState({ verticalData: data.records })

      } else {
        //console.log("No vertical")
        this.setState({ verticalData: [] })
      }
    })

  }


  listGroup = (id) => {

    fetch(verticalBasedgrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("Group List ", data.records)
        if (data.records) {
          this.setState({ groupData: data.records })
        } else {
          //console.log("No Group")
          this.setState({ groupData: [] })
        }
      })

  }


  listSubGroup = (id) => {

    fetch(grpBasedsubgrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        grpid: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("Sub Group List ", data.records)
        if (data.records) {
          this.setState({ subGroupData: data.records, sgrpid: "" })
        } else {
          //console.log("No Sub Group")
          this.setState({ subGroupData: [], sgrpid: "" })
        }
      })

  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {
    fetch("http://35.161.99.113:9000/webapi/t_product/t_ProductList ", {
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
        //console.log("data", data)
        //console.log("Product data", data.records)
        if (data.records) {
          this.setState({ clientData: data.records, productData: data.records })
        } else {
          //console.log("No Client")
          this.setState({ clientData: [] })
        }
      })


    this.listVertical();

    this.listGroup();
  }

  ///   //console.log(moment().format('YYYY-MM-DD'))
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
    //console.log("download")
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
    //      //console.log("data",data)
    //      //console.log("client data",data.records)
    //      if(data.records){
    //        this.setState({clientData:data.records})
    //        this.JSONToCSVConvertor(data.records, "Data", true);

    //      }else{
    //        //console.log("No Client")
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
    var fileName = "ProductReport_"
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
    //console.log('i in edit', i);
    sessionStorage.setItem("editTicket", JSON.stringify(i))
    this.setState({ redirectToEdit: true })
  }

  ViewTicket = i => {
    //console.log("user edit", this.state.SelectedUser)
    sessionStorage.setItem("editTicket", JSON.stringify(i))
    this.setState({ redirectToview: true })
  }

  show = (size1, i) => {
    this.setState({ size1, open1: true, SelectedTicket: i })
  }

  delete = i => {
    //console.log(this.state.SelectedTicket.id)
    fetch("http://35.161.99.113:9000/webapi/t_product/t_deleteProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        l_id: this.state.SelectedTicket.productId
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)
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

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  handleUpload = async () => {
    let jsonOutput
    let uploadData
    this.setState({ warning: "" })
    //console.log("handle upload clicked")
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



      //console.log("csv to json", jsonOutput)
      if (jsonOutput.length > 0) {
        //console.log("inside api", this.state.csvData)
        this.setState({ csvData: jsonOutput })
        uploadData = jsonOutput

      } else {
        //console.log("No data is here")
      }

      // //console.log("parse",JSON.parse(jsonOutput))

      //console.log("Stringify", JSON.stringify(jsonOutput))


      ////console.log(jsonOutputModded)
    }
    fReader.readAsArrayBuffer(y)

    //console.log("inside api json data", jsonOutput)


    // if(jsonOutput.length < 0){
    //   //console.log("No Data")
    // }else{


    setTimeout(() => {
      this.uploadData(jsonOutput)
    }, 5000)

    // await fetch(productUpload, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     Pdata: this.state.csvData
    //   })
    // })
    //   .then(data => {
    //     //console.log("data", data)
    //     if (data.status == 200) {
    //       this.setState({
    //         Uploadmsg: "Data Uploaded Successfully",
    //       })
    //       setTimeout(()=>{
    //         window.location.reload()
    //         this.setState({Uploadmsg:""})
    //       },1000)
    //     } else {
    //       this.setState({ Uploadmsg: "Something went wrong" })
    //     }
    //     // return data.json();
    //   })
    //   .then(data => {
    //     //console.log("data", data)
    //   })

  }

  uploadData = (data) => {
    //console.log('data in upload ', data);
    fetch(productUpload, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Pdata: data
      })
    })
      .then(data => {
        //console.log("data", data)
        if (data.status == 200) {
          this.setState({
            Uploadmsg: "Data Uploaded Successfully",
          })
          setTimeout(() => {
            window.location.reload()
            this.setState({ Uploadmsg: "" })
          }, 1000)
        } else {
          this.setState({ Uploadmsg: "Something went wrong" })
        }
        // return data.json();
      })
      .then(data => {
        //console.log("data", data)
      })
  }




  //  requestData = (pageSize, page, sorted, filtered) => {
  //   return new Promise((resolve, reject) => {
  //     // You can retrieve your data however you want, in this case, we will just use some local data.
  //     let filteredData = this.state.clientData;

  //     // You can use the filters in your request, but you are responsible for applying them.
  //     if (filtered.length) {
  //       filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
  //         return filteredSoFar.filter(row => {
  //           return (row[nextFilter.id] + "").includes(nextFilter.value);
  //         });
  //       }, filteredData);
  //     }
  //     // You can also use the sorting in your request, but again, you are responsible for applying it.
  //     const sortedData = _.orderBy(
  //       filteredData,
  //       sorted.map(sort => {
  //         return row => {
  //           if (row[sort.id] === null || row[sort.id] === undefined) {
  //             return -Infinity;
  //           }
  //           return typeof row[sort.id] === "string"
  //             ? row[sort.id].toLowerCase()
  //             : row[sort.id];
  //         };
  //       }),
  //       sorted.map(d => (d.desc ? "desc" : "asc"))
  //     );

  //     // You must return an object containing the rows of the current page, and optionally the total pages number.
  //     const res = {
  //       rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
  //       pages: Math.ceil(filteredData.length / pageSize)
  //     };

  //     // Here we'll simulate a server response with 500ms of delay.
  //     setTimeout(() => resolve(res), 500);
  //   });
  // };


  updateQueryVertical = vertical => {
    //console.log('vertical', vertical);

    this.setState({ flag2: true })

    this.setState({ queryVertical: vertical })

    let vid
    this.state.verticalData.map(i => {
      if (i.vertical == vertical) {
        vid = i.id
      }
    })
    this.listGroup(vid)


    if (vertical.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(vertical), "i")
      let Filtereduserdata3 = this.state.clientData.filter(i => match.test(i.vertical))
      //console.log('Filtereduserdata lead', Filtereduserdata3);
      // this.state.clientData = Filtereduserdata3

      this.setState({ productData: Filtereduserdata3 })
    } else {
      //console.log("No data")
      this.setState({ productData: [] })

    }
  }



  updateQueryGroup = group => {
    //console.log('group', group);
    let gid
    this.state.groupData.filter(i => {
      if (i.name == group) {
        gid = i.id
      }
    })
    this.listSubGroup(gid);
    this.setState({ clientData: [] })


    if (group.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(group), "i")
      let Filtereduserdata4 = this.state.clientData.filter(i => match.test(i.groupName))
      //console.log('Filtereduserdata lead', Filtereduserdata4);
      // this.state.clientData = Filtereduserdata4
      this.setState({ productData: Filtereduserdata4 })

    } else {
      //console.log("No data")
      this.setState({ productData: [] })

    }

    // if (this.state.queryGroup.search(/[^a-zA-Z]+/) === -1) {
    //   const match = new RegExp(escapeRegExp(this.state.queryGroup), "i")
    //   let Filtereduserdata4 = listToShow.filter(i => match.test(i.groupName))
    //   //console.log('Filtereduserdata lead', Filtereduserdata4);
    //   listToShow = Filtereduserdata4
    // }else{
    //   //console.log("No data")
    // }

    this.setState({ queryGroup: group })
  }



  updateQuerySubGroup = subgrp => {
    //console.log('subgrp', subgrp);
    this.setState({ querySubGroup: subgrp })


    this.setState({ clientData: [] })


    if (subgrp.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(subgrp), "i")
      let Filtereduserdata5 = this.state.clientData.filter(i => match.test(i.subGroupName))
      //console.log('Filtereduserdata lead', Filtereduserdata5);
      // this.state.clientData = Filtereduserdata5
      // this.setState({clientData:Filtereduserdata5})
      this.setState({ productData: Filtereduserdata5 })


    } else {
      //console.log("No data")
      this.setState({ productData: [] })

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
      verticalData, groupData, subGroupData,
    } = this.state




    if (this.state.flag2 == true) {
      listToShow = this.state.productData
    }


    if (!flag) {
      listToShow = this.state.productData
      //console.log('listToShow - User', listToShow);
    }
    else {
      listToShow = this.state.productData
      //console.log('listToShow - list', listToShow);
    }


    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), "i")
      let Filtereduserdata1 = listToShow.filter(i => match.test(i.name))
      //console.log('Filtereduserdata lead', Filtereduserdata1);
      listToShow = Filtereduserdata1
    } else if (!listToShow) {
      //console.log("No data")
    } else {
      const match = new RegExp(escapeRegExp(query), "i")
      let Filtereduserdata2 = listToShow.filter(i => match.test(i.productId))
      //console.log('Filtereduserdata lead', Filtereduserdata2);
      listToShow = Filtereduserdata2
    }





    // if (query.search(/[^a-zA-Z]+/) === -1) {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   clientData = clientData.filter(i => match.test(i.name))
    // } else if (!clientData) {
    //   //console.log("No data")
    // } else {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   clientData = clientData.filter(i => match.test(i.productId))
    //   clientData = clientData
    // }

    // if (flag == false) {
    //   listData = clientData
    // }

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
                  <HeadingText>Product God's View</HeadingText>
                </HeadingDiv>
              </div>
              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
                <ContentArea style={{ justifyContent: "center" }}>
                  <TableDiv>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>



                      <Link to="/ProductInfo">
                        <Button
                          style={{
                            marginLeft: "3px",
                            backgroundColor: "#863577",
                            color: "#fff"
                          }}
                        >
                          Add Product
                      </Button>
                      </Link>
                    </div>

                    <br />
                    <br />
                    <div style={{ backgroundColor: "white" }}>

                      <ReactTable
                        data={clientData}
                        style={{ width: 1000 }}                 //Aishwarya 29 may
                        getTrProps={this.onRowClick}          //Aishwarya 29 may              
                        filterable
                        defaultFilterMethod={(filter, row) =>

                          String(row[filter.id]) === filter.value}
                        columns={[

                          {
                            Header: "",
                            columns: [
                              {
                                Header: <strong>Product-Id</strong>,
                                id: "productId",
                                accessor: d => d.productId,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["productId"] }),
                                filterAll: true,

                              },

                              {

                                Header: <strong>Product Name</strong>,
                                id: "name",
                                accessor: d => d.name,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["name"] }),
                                filterAll: true,

                              },
                              {
                                Header: <strong>Vertical Name</strong>,
                                id: "vertical",
                                accessor: d => d.vertical,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["vertical"] }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Group Name</strong>,
                                id: "groupName",
                                accessor: d => d.groupName,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["groupName"] }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Sub Group Name</strong>,
                                id: "subGroupName",
                                accessor: d => d.subGroupName,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["subGroupName"] }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Product Type</strong>,
                                id: "p_type",
                                accessor: d => d.p_type,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["p_type"] }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Product Number</strong>,
                                id: "productNumber",
                                accessor: d => d.productNumber,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["productNumber"] }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Modal Name</strong>,
                                id: "modalName",
                                accessor: d => d.modalName,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["modalName"] }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Vendor Name</strong>,
                                id: "vendor_name",
                                accessor: d => d.vendor_name,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, { keys: ["vendor_name"] }),
                                filterAll: true
                              },
                              //           {
                              //             Header: <strong>Action</strong>,
                              //             id: "id",
                              //             accessor: d => d.id,
                              //             Cell: row => (
                              //               <Button
                              //                 style={{
                              //                   backgroundColor: "#863577",
                              //                   color: "#ffffff"
                              //                 }}
                              //                 name="edit"
                              //                 size="large"
                              //                 onClick={() => this.EditTicket(row.original)}
                              //               >
                              //                 Edit
                              // </Button>
                              //             )
                              //           },

                              //           {
                              //             Header: "",
                              //             id: "id",
                              //             accessor: d => d.id,
                              //             Cell: row => (
                              //               <Button
                              //                 style={{
                              //                   backgroundColor: "#863577",
                              //                   color: "#ffffff"
                              //                 }}
                              //                 name="user"
                              //                 size="large"
                              //                 onClick={() => this.ViewTicket(row.original)}
                              //               >
                              //                 View
                              //                 </Button>


                              //             ),

                              //           },
                              //           {

                              //             id: "id",
                              //             accessor: d => d.id,
                              //             Cell: row => (
                              //               <Button
                              //                 style={{
                              //                   backgroundColor: "#863577",
                              //                   color: "#ffffff"
                              //                 }}
                              //                 name="user close"
                              //                 size="large"
                              //                 onClick={() => this.show("tiny", row.original)}
                              //               >
                              //                 Delete
                              // </Button>


                              //             ),

                              //           }


                            ]
                          },



                        ]}
                        defaultPageSize={10}
                      />
                    </div>
                    <br />
                    <br />

                    <Workbook filename="ProductReport.xlsx" element={<Button
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
                      <Workbook.Sheet data={clientData} name="Sheet A">
                        <Workbook.Column label="productId" value="productId" />
                        <Workbook.Column label="Product Name" value="name" />
                        <Workbook.Column label="Star" value="star" />
                        <Workbook.Column label="Last Action" value="lastActionTime" />
                        <Workbook.Column label="Part No." value="productNumber" />
                        <Workbook.Column label="Product Type." value="p_type" />
                        <Workbook.Column label="Hsn Code" value="hsnCode" />
                        <Workbook.Column label="Stock Qty" value="stock_qty" />
                        <Workbook.Column label="Purchase Qty" value="purchase_qty" />
                        <Workbook.Column label="Modal No." value="modalName" />
                        <Workbook.Column label="Vertical" value="vertical" />
                        <Workbook.Column label="Group Name" value="groupName" />
                        <Workbook.Column label="Sub Group Name" value="subGroupName" />
                        <Workbook.Column label="Vendor Id" value="vendorId" />
                        <Workbook.Column label="Vendor Name" value="vendor_name" />
                        <Workbook.Column label="Vendor Type" value="type" />
                        <Workbook.Column label="Address" value="address" />
                        <Workbook.Column label="Primary Email" value="email" />
                        <Workbook.Column label="Primary Phone Number" value="number" />
                        <Workbook.Column label="Secondary Phone Number" value="number2" />
                        <Workbook.Column label="Owner" value="owner" />
                        <Workbook.Column label="Pan No." value="panNo" />
                        <Workbook.Column label="Gst No." value="gstNo" />
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
            </PageContainer>

            {this.state.redirectToEdit && <Redirect to="/EditProduct" />}

            {this.state.redirectToview && <Redirect to="/ViewProduct" />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Modal
          size={size1}
          open={open1}
          onClose={() => this.close()}
          closeIcon
          className="alertOfFileds"
        >
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
            <button onClick={() => this.handleUpload()}>Submit</button><br />
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

export default Product
