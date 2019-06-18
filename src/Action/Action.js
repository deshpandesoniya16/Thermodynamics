import React, { Component } from 'react'
import '../App.css'
import '../dashboard.css'
import 'semantic-ui-css/semantic.min.css'
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
  Divider,
  Popup
} from 'semantic-ui-react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import Side from '../component/Sidenav'
//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker.css"
//import moment from "moment"
import { VictoryPie } from 'victory'
import escapeRegExp from 'escape-string-regexp'
// import { auth,ref,app } from "./base"
import fb from 'firebase'
import ReactDOMServer from 'react-dom/server'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import matchSorter from 'match-sorter'

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
  TextColor
} from '../styledComps'
import { Scrollbars } from 'react-custom-scrollbars'
import { actionlist, changeStatus, deleteAction } from '../component/Api'

class Action extends Component {
  state = {
    menuVisible: false,
    startdate: '',
    dataList: [],
    date: '',
    msg: '',
    size: '',
    open: false,
    query: '',

    TixyData: [
      { no: 1, name: 'Ford' },
      { no: 2, name: 'BMW' },
      { no: 3, name: 'Fiat' }
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
    upFile: '',
    isupload: false,
    fileData: '',
    queryTicket: '',
    queryLead: '',
    //Soniya Changes
    modalSize: '',

    Modalopen: false,
    UserData: []
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidMount() {
    fetch(actionlist, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('action data', data.records)

        let callrecord = []
        let meetingRecords = []
        let visitRecord = []
        let finalActionData = []
        if (!data.callRecord || !data.meetingRecords || !data.visitRecords) {
          console.log('No records are here')
          console.log('No action')
          this.setState({ clientData: [] })
        } else {
          callrecord = data.callRecord
          meetingRecords = data.meetingRecords
          visitRecord = data.visitRecords
          finalActionData = [...callrecord, ...meetingRecords, ...visitRecord]
          console.log('finalActionData', finalActionData)

          this.setState({ clientData: finalActionData })
        }
      })
  }

  handleStatus = i => {
    if (i.status == 'Approved') {
      fetch(changeStatus, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'Denie',
          actionId: i.action_id
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          console.log('data', data.records)
          this.close()
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
    } else {
      fetch(changeStatus, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'Approved',
          actionId: i.action_id
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log('data', data)
          console.log('data', data.records)
          this.close()
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
    }
  }

  ///   console.log(moment().format('YYYY-MM-DD'))
  // let currDate = moment().format('YYYY-MM-DD')

  //this.setState({date:currDate})
  updateQuery = query => {
    this.setState({ query: query.trim() })
  }

  updateQueryTicket = query => {
    let qt = query

    this.setState({ queryTicket: qt.trim() })
    // if (qt > 0) {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   this.state.clientData = this.state.clientData.filter(i => match.test(i.ticket_id))
    //   this.setState({clientData:this.state.clientData,queryTicket: qt.trim()})
    // // } else {
    // //   const match = new RegExp(escapeRegExp(query), "i")
    // //   this.state.clientData.filter(i => match.test(i.ticket_id))
    // //   console.log('this.state.clientData', this.state.clientData);
    // //   this.setState({clientData:this.state.clientData})
    // // }
    // }else{
    //   qt = ''
    //   this.setState({ queryTicket: qt.trim() })
    // }
  }

  updateQueryLead = query => {
    let qt = query

    this.setState({ queryLead: qt.trim() })

    // if (qt > 0) {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   this.state.clientData = this.state.clientData.filter(i => match.test(i.lead_id))
    //   this.setState({clientData:this.state.clientData,queryLead: qt.trim()})

    // }else{
    //   qt = 0
    //   this.setState({ queryLead: '' })
    //   // this.setState({clientData:this.state.clientData})
    // }
  }

  handlestartdate = date => {
    this.setState({
      startdate: date
    })
  }

  // close = () => this.setState({ open: false, open1: false })

  add = (size, Ticketdata) => {
    //  this.setState({redirectToView:true})
    this.setState({ size, open: true })
    this.setState({ SelectedTicket: Ticketdata })
  }
  download = () => {
    console.log('download')
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
    this.JSONToCSVConvertor(this.state.clientData, 'Data', true)
  }
  JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData

    var CSV = ''
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n'

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = ''

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ','
      }

      row = row.slice(0, -1)

      //append Label row with line break
      CSV += row + '\r\n'
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = ''

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",'
      }

      row.slice(0, row.length - 1)

      //add a line break after each row
      CSV += row + '\r\n'
    }

    if (CSV == '') {
      alert('Invalid data')
      return
    }

    //Generate a file name
    var fileName = 'ActionReport_'
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, '_')

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV)

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement('a')
    link.href = uri

    //set the visibility hidden so it will not effect on your web-layout
    link.style = 'visibility:hidden'
    link.download = fileName + '.csv'

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  EditVisit = i => {
    sessionStorage.setItem('editTicket', JSON.stringify(i))
    this.setState({ redirectToEdit: true })
  }

  ViewVisit = i => {
    console.log('user edit', this.state.SelectedUser)
    sessionStorage.setItem('editTicket', JSON.stringify(i))
    this.setState({ redirectToview: true })
  }

  show = (size1, i) => {
    console.log('i', i)
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
  }

  delete = () => {
    console.log('selected id', this.state.SelectedTicket.action_id)
    console.log('selected action', this.state.SelectedTicket.type_of_action)

    fetch(deleteAction, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        v_id: this.state.SelectedTicket.action_id,
        type_of_action: this.state.SelectedTicket.type_of_action,
        visitId: this.state.SelectedTicket.visitId,
        meetingId: this.state.SelectedTicket.meetingId,
        callId: this.state.SelectedTicket.callId
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('data', data)
        console.log('data', data.records)
        this.close()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
  }

  // switch (this.state.SelectedTicket.type_of_action) {
  //   case 'visit':
  //   fetch(deleteAction, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       v_id: this.state.SelectedTicket.id,
  //       type_of_action:this.state.SelectedTicket.type_of_action,
  //       visitId:this.state.SelectedTicket.visitId,
  //       meetingId:this.state.SelectedTicket.meetingId,
  //       callId:this.state.SelectedTicket.callId
  //     })
  //   })
  //     .then(data => {
  //       return data.json()
  //     })
  //     .then(data => {
  //       console.log("data", data)
  //       console.log("data", data.records)
  //       this.close()
  //       setTimeout(() => {
  //        // window.location.reload()
  //       }, 1000)
  //     })

  //     break;

  //     case 'call':

  //     fetch(deleteAction, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         v_id: this.state.SelectedTicket.id,
  //         type_of_action:this.state.SelectedTicket.type_of_action,
  //         visitId:this.state.SelectedTicket.visitId,
  //         meetingId:this.state.SelectedTicket.meetingId,
  //         callId:this.state.SelectedTicket.callId
  //       })
  //     })
  //       .then(data => {
  //         return data.json()
  //       })
  //       .then(data => {
  //         console.log("data", data)
  //         console.log("data", data.records)
  //         this.close()
  //         setTimeout(() => {
  //          // window.location.reload()
  //         }, 1000)
  //       })

  //     break;

  //     case 'meeting':

  //     fetch(deleteAction, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         v_id: this.state.SelectedTicket.id,
  //         type_of_action:this.state.SelectedTicket.type_of_action,
  //         visitId:this.state.SelectedTicket.visitId,
  //         meetingId:this.state.SelectedTicket.meetingId,
  //         callId:this.state.SelectedTicket.callId
  //       })
  //     })
  //       .then(data => {
  //         return data.json()
  //       })
  //       .then(data => {
  //         console.log("data", data)
  //         console.log("data", data.records)
  //         this.close()
  //         setTimeout(() => {
  //          // window.location.reload()
  //         }, 1000)
  //       })

  //     break;

  //   default:
  //     break;
  // }

  upload = () => {
    this.setState({ isupload: true })
  }

  handleClose = () => {
    this.setState({ isupload: false })
  }

  handleSmartUpload = e => {
    //  e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log('file value which is uploaded', e.target.value)

      console.log('file which is uploaded', e.target.files)
      console.log('file which is uploaded', e.target.files[0])
      let filedata = e.target.value

      const data = new FormData()
      data.append('file', e.target.files[0])
      data.append('name', 'some value user types')
      data.append('description', 'some value user types')
      console.log('data is', data)
    }
  }

  //Soniya Changes
  //Aishwarya 29 may
  onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        this.ViewVisit(rowInfo.original)

        // console.log('A Td Element was clicked!')
        // console.log('it produced this event:', e)
        // console.log('It was in this column:', column)
        // console.log('It was in this row:', rowInfo.original)
        // console.log('It was in this table instance:', instance)
      }
    }
  }

  UserAction = (modalSize, userData) => {
    this.setState({ modalSize, Modalopen: true })
    this.setState({ UserData: userData })
  }
  close = () => {
    this.setState({ open: false, open1: false })
    this.setState({
      Modalopen: false,

    })
  }



  render() {
    let listToShow = []

    //Soniya Changes
    let { modalSize, Modalopen } = this.state

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
      isupload,
      fileData,
      queryLead,
      queryTicket
    } = this.state

    if (!flag) {
      listToShow = clientData
      console.log('listToShow - User', listToShow)
    } else {
      listToShow = listData
      console.log('listToShow - list', listToShow)
    }

    if (query.search(/[^a-zA-Z]+/) === -1) {
      const match = new RegExp(escapeRegExp(query), 'i')
      let Filtereduserdata = listToShow.filter(i => match.test(i.company_name))
      listToShow = Filtereduserdata
    } else if (!listToShow) {
      console.log('No data')
    } else {
      const match = new RegExp(escapeRegExp(query), 'i')
      let Filtereduserdata = listToShow.filter(i => match.test(i.action_id))
      listToShow = Filtereduserdata
    }

    if (queryLead > 0) {
      const match = new RegExp(escapeRegExp(queryLead), 'i')
      let Filtereduserdata = listToShow.filter(i => match.test(i.lead_id))
      console.log('Filtereduserdata lead', Filtereduserdata)
      listToShow = Filtereduserdata
    } else {
      console.log('No data')
    }

    if (queryTicket > 0) {
      console.log('queryTicket', parseInt(queryTicket))
      const match = new RegExp(escapeRegExp(queryTicket), 'i')
      let Filtereduserdata = listToShow.filter(i => match.test(i.ticket_id))
      console.log('Filtereduserdata ticket', Filtereduserdata)
      listToShow = Filtereduserdata
    } else {
      console.log('No data')
    }

    // if (query.search(/[^a-zA-Z]+/) === -1) {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   clientData = clientData.filter(i => match.test(i.company_name))
    // } else if (!clientData) {
    //   console.log("No data")
    // } else {
    //   const match = new RegExp(escapeRegExp(query), "i")
    //   clientData = clientData.filter(i => match.test(i.action_id))
    //   clientData = clientData
    // }

    let call = 0
    let meeting = 0
    let visit = 0
    let UnderProgress = 0

    let callCount = []
    let meetingCount = []
    let visitCount = []
    let UnderProgressCount = []

    console.log('flag', flag)
    console.log('list data', listData)

    this.state.clientData.map(i => {
      if (i.type_of_action == 'call') {
        call++
        callCount.push(i)
        //console.log("rejected list", callCount)
      } else if (i.type_of_action == 'meeting') {
        meeting++
        meetingCount.push(i)
      } else if (i.type_of_action == 'visit') {
        visit++
        visitCount.push(i)
      }
    })
    // ;(rejected1 = rejected),
    //   (OnHold1 = OnHold),
    //   (Closed1 = Closed),
    //   (UnderProgress1 = UnderProgress)
    // console.log("ra is", rejected1)
    // console.log("rm is", OnHold1)
    // console.log("ch is", Closed1)
    // console.log("Under Progress", UnderProgress1)

    let piedata = [
      {
        id: 'call',
        x: 'call',
        y: call,
        color: 'hsl(44, 100%, 58%)'
      },
      {
        id: 'meeting',
        x: 'meeting',
        y: meeting,
        color: 'hsl(0, 75%, 50%)'
      },
      {
        id: 'visit',
        x: 'visit',
        y: visit,
        color: 'hsl(128, 70%, 40%)'
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
            style={{ background: '#111111' }}
          >
            <PageContainer3>
              <Scrollbars style={{ display: 'flex', flex: 1, height: 500 }}>
                <div
                  style={{ display: 'flex', borderBottom: '2px solid #863577' }}
                >
                  <IconDiv
                    onClick={() =>
                      this.setState({ menuVisible: !this.state.menuVisible })
                    }
                  >
                    <Icon name="sidebar" />
                  </IconDiv>
                  <HeadingDiv>
                    <HeadingText>Action</HeadingText>
                  </HeadingDiv>
                </div>
                <ContentArea>
                  <GraphDiv>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', margin: '8px' }}>
                        <NewLeadDiv />
                        <SubHeadingText>Call</SubHeadingText>
                      </div>

                      <div style={{ display: 'flex', margin: '8px' }}>
                        <AssetDiv />
                        <SubHeadingText>Visit</SubHeadingText>
                      </div>

                      <div style={{ display: 'flex', margin: '8px' }}>
                        <ProductDiv />
                        <SubHeadingText>Meeting</SubHeadingText>
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
                        style={{ labels: { fontSize: 22, fill: 'white' } }}
                        labelRadius={110}
                        colorScale={['orange', '#00aa8a', '#643C31', '#6975A9']}
                        labels={d => (d.y == 0 ? `${''}` : `${d.y}`)}
                        events={[
                          {
                            target: 'data',
                            eventHandlers: {
                              onClick: () => {
                                let h, p, r, c
                                return [
                                  {
                                    target: 'data',

                                    mutation: props => {
                                      // console.log(target)
                                      console.log(props)
                                      switch (props.datum.id) {
                                        case 'call':
                                          if (props.datum.id == 'call') {
                                            // hold=OnHoldCount

                                            this.setState({
                                              flag: true,
                                              listData: callCount
                                            })

                                            console.log('flag', flag)
                                          } else {
                                            this.setState({ msg: 'No data' })
                                          }

                                          break
                                        case 'meeting':
                                          if (props.datum.id == 'meeting') {
                                            this.setState({
                                              flag: true,
                                              listData: meetingCount
                                            })
                                            console.log('flag', flag)
                                            // if(p){
                                            //   this.setState({clientData:p})
                                            // }else{
                                            //   console.log("NO Data here")
                                            //   // this.setState({msg:"N"})
                                            // }
                                          } else {
                                            this.setState({ msg: 'No data' })
                                          }

                                          break
                                        case 'visit':
                                          if (props.datum.id == 'visit') {
                                            this.setState({
                                              flag: true,
                                              listData: visitCount
                                            })
                                            console.log('flag', flag)
                                            // if(r){
                                            //   this.setState({clientData:r})
                                            // }else{
                                            //   console.log("NO Data here")
                                            //   // this.setState({msg:"N"})
                                            // }
                                          } else {
                                            this.setState({ msg: 'No data' })
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      {/* <Input
                      type="text"
                      placeholder="Search By Action Id Or company Name!!!"
                      size="small"
                      value={query}
                      onChange={event => this.updateQuery(event.target.value)}
                    />
                        <label>OR</label>
                     <Input
                      type="text"
                      placeholder="Search By Ticket Id!!!"
                      size="small"
                      value={queryTicket}
                      onChange={event => this.updateQueryTicket(event.target.value)}
                    />
                        <label>OR</label>
                     <Input
                      type="text"
                      placeholder="Search By leadId Id!!!"
                      size="small"
                      value={queryLead}
                      onChange={event => this.updateQueryLead(event.target.value)}
                    /> */}
                      <Link to="/AddAction">
                        <Button
                          style={{
                            marginLeft: '120px',
                            backgroundColor: '#863577',
                            color: '#fff'
                          }}
                        >
                          Add Action
                        </Button>
                      </Link>
                    </div>
                    <br />
                    <br />

                    <div style={{ backgroundColor: 'white', marginLeft: "120px" }}>
                      <ReactTable
                        data={listToShow}

                        //Soniya Changes 23 May 2019
                        getTrProps={this.onRowClick}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                          String(row[filter.id]) === filter.value
                        }
                        columns={[
                          {
                            Header: '',
                            columns: [
                              {
                                Header: <strong>Action Id</strong>,
                                id: 'action_id',
                                accessor: d => d.action_id,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['action_id']
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Ticket Id</strong>,
                                id: 'ticket_id',
                                accessor: d => d.ticket_id,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['ticket_id']
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Lead Id</strong>,
                                id: 'lead_id',
                                accessor: d => d.lead_id,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['lead_id']
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Asc Id</strong>,
                                id: 'ascId',
                                accessor: d => d.ascId,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['ascId']
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Client Name</strong>,
                                id: 'company_name',
                                accessor: d => d.company_name,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['company_name']
                                  }),
                                filterAll: true
                              },
                              {
                                Header: <strong>Assigned Employee</strong>,
                                id: 'AssignId',
                                accessor: d => d.AssignId,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['AssignId']
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Date</strong>,
                                id: 'fromDate',
                                accessor: d => d.fromDate,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['fromDate']
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Type Of Action</strong>,
                                id: 'type_of_action',
                                accessor: d => d.type_of_action,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['type_of_action']
                                  }),
                                filterAll: true
                              },

                              {
                                Header: <strong>Status</strong>,
                                id: 'status',
                                accessor: d => d.status,
                                filterMethod: (filter, rows) =>
                                  matchSorter(rows, filter.value, {
                                    keys: ['status']
                                  }),
                                filterAll: true,
                                Cell: row => {
                                  if (row.original.status == 'Approved')
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

                                  if (row.original.status == 'Denie')
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
                              }

                              //Soniya Changes 23 May 2019

                              // {
                              // Header: <strong>Action</strong>,
                              // id:"id",
                              // accessor: d => d.id,
                              // Cell: row =>(
                              // <Button
                              // style={{
                              // backgroundColor: "#863577",
                              // color: "#ffffff"
                              // }}
                              // name="edit"
                              // size="large"
                              // onClick={() => this.EditVisit(row.original)}
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
                              //              onClick={() => this.ViewVisit(row.original)}
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
                          }
                        ]}
                        defaultPageSize={10}
                      />
                    </div>

                    <br />
                    <br />
                    <Button
                      style={{
                        marginLeft: '120px',
                        backgroundColor: '#863577',
                        color: '#ffffff'
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
                        backgroundColor: '#863577',
                        color: '#ffffff',
                        float: 'right'
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
            {this.state.redirectToview && <Redirect to="/ViewAction" />}

            {this.state.redirectToEdit && <Redirect to="/EditAction" />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        {/* Soniya Changes 23 May 2019*/}
        <Modal
          size={modalSize}
          style={{ width: '38em', height: '10em', left: '40%', top: '50%' }}
          open={Modalopen}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>
            <Header as="h3" content="User Action">
              User Action
            </Header>
          </Modal.Header>

          <Modal.Content>
            <div style={{ display: 'flex' }}>
              <div>
                <Button
                  style={{
                    backgroundColor: '#863577',
                    color: '#ffffff'
                  }}
                  name="edit"
                  size="large"
                  onClick={() => this.EditVisit(this.state.UserData)}
                >
                  Edit
                </Button>
              </div>

              <div style={{ flex: '1' }} />

              <div>
                <Button
                  style={{
                    backgroundColor: '#863577',
                    color: '#ffffff'
                  }}
                  name="user"
                  size="large"
                  onClick={() => this.ViewVisit(this.state.UserData)}
                >
                  View
                </Button>
              </div>

              <div style={{ flex: '1' }} />

              <div>
                <Button
                  style={{
                    backgroundColor: '#863577',
                    color: '#ffffff'
                  }}
                  name="user close"
                  size="large"
                  onClick={() => this.show('tiny', this.state.UserData)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal.Content>
        </Modal>
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
  width: '50em',
  borderBottom: '1px solid #863577',
  //  color:"#D7A01D",
  fontSize: '16px',
  fontWeight: '400'
}

const tableRow = {
  //  color:"#ffffff"
}

const formInput = {
  background: 'transparent',
  boxShadow: '0 0 0 1px #ffffff inset',
  color: '#ffffff',
  padding: '14px',
  width: '20em'
}

const resultRenderer = ({ company_name, number }) => (
  <span>
    <Header as="h4">{company_name}</Header>
    <p>{number}</p>
  </span>
)

export default Action
