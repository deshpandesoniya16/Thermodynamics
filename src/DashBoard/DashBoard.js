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
  Divider,Search
} from "semantic-ui-react"
import { Route, Redirect, Switch, Link } from "react-router-dom"
import Side from "../component/Sidenav"
import { VictoryPie } from "victory"
import escapeRegExp from "escape-string-regexp"
import { auth, ref, app } from "../component/base"
import SmartUpload from "../component/SmartUpload"
import ErrorModal from "../component/ErrorModal"
import ReactTable from "react-table"
import "react-table/react-table.css"
import matchSorter from "match-sorter"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { tixy_fbs } from "../component/base"
import {
    verticallist,
    grouplist,
    subgrplist,
    verticalBasedgrp,
    grpBasedsubgrp,
    callTypelist,
    addcallType,
    deleteCallType,
    visitTypeList,
    addvisitTypeadd,
    deleteVisitType,
    meetingTypeList,
    addMeetingType,
    deleteMeeting,
    tixy_Action,
    verticalAsset,
    assetGrp,
    verticalService,TixyEscalantion,listLead_Contract,
    verticalBaseOit,verticalBaseBreak,verticalBaseOverhual
  } from "../component/Api"
import styled from "styled-components"
import { Scrollbars } from "react-custom-scrollbars"
import _ from "lodash"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
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
  TextColor,TixyContent,
  
} from "../styledComps.js"

import Select from 'react-select'
import Ascmgmt from "./AscMgmt";
import Leadmgmt from "./LeadMgmt";
import Ticketmgmt from "./TicketMgmt";



class DashBoard extends Component {


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
        csvData:[],
        activeItem:'TicketMgmt',
       
       
      }

      handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render(){

        const { activeItem } = this.state

     return(
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
                  <HeadingText>DashBoard</HeadingText>
                </HeadingDiv>
                


              </div>
              <div style={{display:'flex'}}>
<Menu fluid widths={3}  pointing secondary>
        <Menu.Item name='TicketMgmt' active={activeItem === 'TicketMgmt'} onClick={this.handleItemClick} />
        <Menu.Item name='LeadMgmt' active={activeItem === 'LeadMgmt'} onClick={this.handleItemClick} />
        <Menu.Item name='AscMgmt' active={activeItem === 'AscMgmt'} onClick={this.handleItemClick} />
      </Menu>

</div>

              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
                <ContentArea>

                {activeItem === "TicketMgmt" && (
            <div>
                <Ticketmgmt/>
                </div>
                )}

{activeItem === "LeadMgmt" && (
            <div>
                <Leadmgmt/>
                </div>
                )}


{activeItem === "AscMgmt" && (
            <div>
                <Ascmgmt/>
                </div>
                )}

                  
                  <TableDiv>
                   </TableDiv>
                   </ContentArea>
                   </Scrollbars>
                   </PageContainer>
                   </Sidebar.Pusher>
                   </Sidebar.Pushable>
                   </div>



     )   

    }
}






export default DashBoard