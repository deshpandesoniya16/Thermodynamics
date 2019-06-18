import React, { Component } from 'react'
import Side from '../component/Sidenav'
import '../App.css'
import '../dashboard.css'
import 'semantic-ui-css/semantic.min.css'
import {
  Sidebar,
  Search,
  Divider,
  Container,
  Grid,
  Rating,
  Card,
  Segment,
  Popup,
  Button,
  TextArea,
  Menu,
  Image,
  Progress,
  Icon,
  Header,
  Input,
  Table,
  Modal,
  Form
} from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import _ from 'lodash'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import ErrorModal from '../component/ErrorModal'
import SuccessModal from '../component/SuccessModal'
import Carousel from 'nuka-carousel'
import SmartUpload from '../component/SmartUpload'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import { tixy_fbs } from '../component/base'
import { productListapi, AssetList } from '../component/Api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import Select from '../../node_modules/semantic-ui-react/dist/commonjs/addons/Select/Select'
import { Lead_fbs, visit_fbs, meeting_fbs, call_fbs } from '../component/base'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import { contract } from '../component/base'

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
  verticalService
} from '../component/Api'

import styled from 'styled-components'

import {
  PageContainer,
  IconDiv,
  HeadingDiv,
  HeadingText,
  FormDiv,
  FormBorder,
  MainDiv,
  Form1Div,
  IconDivShare,
  FormText,
  ContentArea,
  Form2Div,
  TixyContent,
  PageContainer2,
  TableContent,
  TabHolder,
  TabClick1,
  MainDivHolder,
  MainDiv2,
  Box,
  Box2,
  TextColor //Aishwarya 30 may
} from '../styledComps.js'

import StarRatingComponent from 'react-star-rating-component'
import RawCarousel from '../component/RawCarousel'

class LeadView extends Component {
  state = {
    activeItem: 'Create a lead',
    Name: '',
    address: '',
    Phno: '',
    discription: '',
    email: '',
    clientData: [],
    isLoading: false,
    value: '',
    results: [],
    SelectedResult: {},
    uploadedfileurl: '',
    isOpen: false,
    uploadedFile: [],
    activeItem: 'Create a lead',
    activeBackColor: '#863577',
    activeTextColor: '#ffffff',
    leadDate: '',
    leadTime: '',
    vertical: '',
    custinquiry: '',
    custId: '',
    leadsrc: '',
    leadsourceData: [],
    Clientmsg: '',
    msg: '',
    leadreviewdate: '',
    industry: '',
    product: '',
    salezone: '',
    leadDetails: '',
    leadstatus: '',
    assign: '',
    leadId: '',
    techReviewDate: '',
    techFreez: '',
    group: '',
    subgroup: '',
    techstatus: '',
    model: '',
    capacity: '',
    techdescription: '',
    quantity: '',
    quotation: '',
    projectReviewDate: '',
    projectPlanDate: '',
    projectActualDate: '',
    typeofProject: '',
    projectTargetDate: '',
    projectLeadTime: '',
    projectLand: '',
    civilWork: '',
    financeMode: '',
    financeStatus: '',
    projectedDate: '',
    projectStatus: '',
    manReviewDate: '',
    manSiteImage: '',
    oem: '',
    oemname: '',
    oemdetails: '',
    qualified: '',
    qualifiedName: '',
    qualifiedDetails: '',
    influencer: '',
    influencerName: '',
    influencerDetails: '',
    orderReviewDate: '',
    orderCompetitor: '',
    orderStatus: '',
    orderanalysis: '',
    refReviewDate: '',
    refArea: '',
    refVisitSite: '',
    refPlanDate: '',
    refActualDate: '',
    refAfterVisit: '',
    refNextLevelDiscussion: '',
    refNextMeeting: '',
    objectionReviewDate: '',
    objectionCustRaised: '',
    objectionStatus: '',
    objectionPlaceOrder: '',
    objectionPayment: '',
    objectionPaymentTerms: '',
    objectionPaymentAccept: '',
    saleReviewDate: '',
    saleNegPrice: '',
    saleFinalPrice: '',
    saleOrderClose: '',
    saleOrderLostDetails: '',
    saleCompetitor: '',
    saleNormalPrice: '',
    salePaymentTerms: '',
    saleOrder: '',
    saleSystemDate: '',
    saleImage: '',
    ImageData: [],
    ImageData1: [],
    leadPhase: '',
    showImg: [],
    finalprice: '',
    open: false, //Aishwarya 30 May
    open1: false, //Aishwarya 30 May
    SelectedTicket: '', //aishwarya 30 may
    LeadId: 0, //Aishwarya 29 may
    redirectToLead: false, //aishwarya 29 may
    isSucess: false //aishwarya 29 may
  }

  handleItemClick = e => this.setState({ activeItem: e.target.name })

  componentDidMount() {
    let data = JSON.parse(sessionStorage.getItem('viewLead'))
    sessionStorage.setItem('editLead', sessionStorage.getItem('viewLead')) //Aishwarya 30 may

    console.log('viewLead', data)
    this.setState({
      Name: data.company_name,
      email: data.email,
      Phno: data.number,
      address: data.address,
      leadPhase: data.leadPhase,
      leadDate: moment(data.date).format('DD-MM-YYYY'),
      discription: data.description,
      // custinquiry: data.custEnquiryNo,
      vertical: data.vertical,
      leadsrc: data.leadSource,
      leadreviewdate: moment(data.leadReviewDate).format('DD-MM-YYYY'),
      industry: data.typeofIndustry,
      product: data.productManufacture,
      salezone: data.saleZone,
      leadDetails: data.leadDetails,
      leadstatus: data.leadPayment,
      assign: data.assignTo,
      techReviewDate: moment(data.techReviewDate).format('DD-MM-YYYY'),
      techFreez: data.techRequirnment,
      group: data.techGroup,
      subgroup: data.techSubGroup,
      techstatus: data.techStatus,
      model: data.model,
      capacity: data.capacity,
      techdescription: data.description,
      quantity: data.quantity,
      quotation: data.quotation,
      projectReviewDate: moment(data.projectReviewDate).format('DD-MM-YYYY'),
      projectPlanDate: moment(data.projectPlannedDate).format('DD-MM-YYYY'),
      projectActualDate: moment(data.projectActualDate).format('DD-MM-YYYY'),
      typeofProject: data.typeofProject,
      projectTargetDate: moment(data.projCommissionDate).format('DD-MM-YYYY'),
      projectLeadTime: moment(data.projLeadTime).format('DD-MM-YYYY'),
      projectLand: data.land,
      civilWork: data.civilWork,
      financeMode: data.modeofFinance,
      financeStatus: data.statusofFinance,
      projectedDate: moment(data.projectFinalDate).format('DD-MM-YYYY'),
      projectStatus: data.projectStatus,
      manReviewDate: moment(data.manReviewDate).format('DD-MM-YYYY'),
      oem: data.identifiedOEM,
      oemname: data.identifiedName,
      oemdetails: data.identifiedDetails,
      qualified: data.qualifiedConsultant,
      qualifiedName: data.qualifiedName,
      qualifiedDetails: data.qualifiedDetails,
      influencer: data.identifiedInfluencer,
      influencerName: data.influencerName,
      influencerDetails: data.influencerDetails,
      orderReviewDate: moment(data.orderReviewDate).format('DD-MM-YYYY'),
      orderCompetitor: data.nameofCompetitor,
      orderStatus: data.orderStatus,
      orderanalysis: data.orderAnalysisStatus,
      refReviewDate: moment(data.refReviewDate).format('DD-MM-YYYY'),
      refArea: data.refArea,
      refVisitSite: data.refSite,
      refPlanDate: moment(data.refPlannedDate).format('DD-MM-YYYY'),
      refActualDate: moment(data.refActualDate).format('DD-MM-YYYY'),
      refAfterVisit: data.custResponse,
      refNextLevelDiscussion: data.discussion,
      refNextMeeting: moment(data.discussionStatus).format('DD-MM-YYYY'),
      objectionReviewDate: moment(data.objectionReviewDate).format(
        'DD-MM-YYYY'
      ),
      objectionCustRaised: data.custObjRaised,
      objectionStatus: data.objStatus,
      objectionPlaceOrder: data.custPlaceOrder,
      objectionPayment: data.custAcceptedPayment,
      objectionPaymentTerms: data.custAnotherPayment,
      objectionPaymentAccept: data.paymentTerms,
      saleReviewDate: moment(data.saleReviewDate).format('DD-MM-YYYY'),
      saleNegPrice: data.salePriceNeg,
      saleFinalPrice: data.mutuallyPriceStatus,
      saleOrderClose: data.orderFavour,
      saleOrderLostDetails: data.orderLostDetails,
      saleCompetitor: data.orderCompetitor,
      saleNormalPrice: data.salePrice,
      salePaymentTerms: data.salePaymentTerms,
      saleOrder: data.generateSaleOrder || '',
      saleSystemDate: moment(data.generateSaleDate).format('DD-MM-YYYY'),
      finalprice: data.final_price,
      LeadId: data.id //Aishwarya 30 may
    })
    //console.log("session data",data.custId)

    fetch('http://35.161.99.113:9000/webapi/leadmgmt/getImageLink', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: data.id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('image data', data.records)
        this.setState({ showImg: data.records })
      })
  }
  //Aishwarya 30 may
  close = () => this.setState({ open: false, open1: false })
  //Aishwarya 30 may
  show = (size1, i) => {
    this.setState({ size1, open1: true })
    this.setState({ SelectedTicket: i })
    console.log('i', i)
  }

  //Aishwarya 30 may
  delete = () => {
    console.log('Slected product', this.state.SelectedTicket)

    fetch('http://35.161.99.113:9000/webapi/leadmgmt/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.SelectedTicket
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
          // window.location.reload()
          this.setState({ isSucess: true, redirectToLead: true })
        }, 1000)
      })
  }
  EditLead = () => {
    this.setState({ redirectToEdit: true })
  }

  render() {
    const {
      Name,
      value,
      isLoading,
      results,
      SelectedResult,
      activeItem,
      email,
      discription,
      Phno,
      address,
      custId,
      custinquiry,
      leadDate,
      leadsrc,
      leadTime,
      vertical,
      leadsourceData,
      Clientmsg,
      msg,
      leadreviewdate,
      industry,
      product,
      salezone,
      leadDetails,
      leadstatus,
      assign,
      techReviewDate,
      techFreez,
      techdescription,
      techstatus,
      group,
      subgroup,
      model,
      capacity,
      description,
      quantity,
      quotation,
      projectReviewDate,
      projectPlanDate,
      projectActualDate,
      typeofProject,
      projectTargetDate,
      projectLeadTime,
      projectLand,
      civilWork,
      financeMode,
      financeStatus,
      projectedDate,
      projectStatus,
      oem,
      oemname,
      oemdetails,
      qualified,
      qualifiedName,
      qualifiedDetails,
      influencer,
      influencerName,
      influencerDetails,
      orderReviewDate,
      orderCompetitor,
      orderStatus,
      orderanalysis,
      refReviewDate,
      refArea,
      refVisitSite,
      refPlanDate,
      refActualDate,
      refAfterVisit,
      refNextLevelDiscussion,
      refNextMeeting,
      objectionReviewDate,
      objectionCustRaised,
      objectionStatus,
      objectionPlaceOrder,
      objectionPayment,
      objectionPaymentTerms,
      objectionPaymentAccept,
      saleReviewDate,
      saleNegPrice,
      saleFinalPrice,
      saleOrderClose,
      saleOrderLostDetails,
      saleCompetitor,
      saleNormalPrice,
      salePaymentTerms,
      saleOrder,
      saleSystemDate,
      saleImage,
      ImageData,
      ImageData1,
      manReviewDate,
      leadPhase,
      showImg,
      open, //Aishwarya 30 May
      open1, //Aishwarya 30 May
      size1 //Aishwarya 30 may
    } = this.state

    console.log('Selected Result', activeItem)

    return (
      <div>
        <PageContainer2>
          <div style={{ display: 'flex', borderBottom: '2px solid #863577' }}>
            <Link to="/LeadMgmt">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Lead Managment</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            {/*  <Link to="/EditLeadMgmt">*/}
            <Button
              size="small"
              floated="right"
              style={{
                // marginRight: "20px",
                margin: '10px',
                backgroundColor: '#863577',
                color: '#fff'
              }}
              onClick={() => this.EditLead()}
            >
              Edit
            </Button>
            {this.state.redirectToEdit && <Redirect to="/EditLeadMgmt" />}
            {/*    </Link>*/}
            {/*Aishwarya 29 May*/}
            <Button
              size="small"
              floated="right"
              style={{
                margin: '10px',
                marginRight: '40px',
                backgroundColor: '#863577',
                color: '#fff'
              }}
              onClick={() => this.show('tiny', this.state.LeadId)} //Aishwarya 30 may
            >
              Delete
            </Button>
            {this.state.redirectToLead && <Redirect to="/LeadMgmt" push />}{' '}
            {/*Aishwarya 30 May*/}
          </div>
          <br />
          <HeadingDiv>
            <TabHolder>
              <TabClick
                style={
                  activeItem === 'Create a lead'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Create a lead"
                onClick={this.handleItemClick}
              />
              <TabClick
                style={
                  activeItem === 'Lead Qualification'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Lead Qualification"
                onClick={this.handleItemClick}
              />
              <TabClick
                style={
                  activeItem === 'Tech Specification'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Tech Specification"
                onClick={this.handleItemClick}
              />
              <TabClick
                style={
                  activeItem === 'Project Feasibility'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Project Feasibility"
                onClick={this.handleItemClick}
              />
              <TabClick
                style={
                  activeItem === 'KYC'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="KYC"
                onClick={this.handleItemClick}
              />
              {/* <TabClick name="Order Analysis" onClick={this.handleItemClick} /> */}
              <TabClick
                style={
                  activeItem === 'Ref Showcasing'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Ref Showcasing"
                onClick={this.handleItemClick}
              />
              <TabClick
                style={
                  activeItem === 'Objection Handling'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Objection Handling"
                onClick={this.handleItemClick}
              />
              <TabClick
                style={
                  activeItem === 'Sales Order'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Sales Order"
                onClick={this.handleItemClick}
              />
              <TabClick
                style={
                  activeItem === 'Order Analysis'
                    ? {
                      backgroundColor: this.state.activeBackColor,
                      color: this.state.activeTextColor,
                      fontWeight: 'bold',
                      borderRadius: '.28571429rem'
                    }
                    : {}
                }
                name="Order Analysis"
                onClick={this.handleItemClick}
              />
            </TabHolder>
          </HeadingDiv>

          <br />

          <div>
            {activeItem === 'Create a lead' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Lead Information"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Name :</span>
                              </Box>
                              <Box2>
                                <span>{Name}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>E-mail :</span>
                              </Box>
                              <Box2>
                                <span>{email}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Phone Number :</span>
                              </Box>
                              <Box2>
                                <span>{Phno}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Address :</span>
                              </Box>
                              <Box2>
                                <span>{address}</span>
                              </Box2>
                            </MainDiv2>
                            <br />

                            <MainDiv2>
                              <Box>
                                <span>Description :</span>
                              </Box>
                              <Box2>
                                <span>{discription}</span>
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Date :</span>
                              </Box>
                              <Box2>
                                <span>{leadDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Vertical :</span>
                              </Box>
                              <Box2>
                                <span>{vertical}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            {/**  <MainDiv2 hidden>
                        <Box>
                          <span>Customer Enquiry no. :</span>
                        </Box>
                        <Box2>
                          <span>{custinquiry}</span>
                        </Box2>
                      </MainDiv2>
                      <br />*/}
                            <MainDiv2>
                              <Box>
                                <span>Lead Source :</span>
                              </Box>
                              <Box2>
                                <span>{leadsrc}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <br />
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/*Soniya commented 29/05/19
                     <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Lead Information</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Name :</span>
                        </Box>
                        <Box2>
                          <span>{Name}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>E-mail :</span>
                        </Box>
                        <Box2>
                          <span>{email}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Phone Number :</span>
                        </Box>
                        <Box2>
                          <span>{Phno}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Address :</span>
                        </Box>
                        <Box2>
                          <span>{address}</span>
                        </Box2>
                      </MainDiv2>
                      <br />

                      <MainDiv2>
                        <Box>
                          <span>Description :</span>
                        </Box>
                        <Box2>
                          <span>{discription}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Date :</span>
                        </Box>
                        <Box2>
                          <span>{leadDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Vertical :</span>
                        </Box>
                        <Box2>
                          <span>{vertical}</span>
                        </Box2>
                      </MainDiv2>
                      <br /> */}
                    {/**  <MainDiv2 hidden>
                        <Box>
                          <span>Customer Enquiry no. :</span>
                        </Box>
                        <Box2>
                          <span>{custinquiry}</span>
                        </Box2>
                      </MainDiv2>
                      <br />*/}
                    {/*Soniya commented 29/05/19
                       <MainDiv2>
                        <Box>
                          <span>Lead Source :</span>
                        </Box>
                        <Box2>
                          <span>{leadsrc}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Lead Qualification' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Lead Qualification"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{leadreviewdate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Type of industry :</span>
                              </Box>
                              <Box2>
                                <span>{industry}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Product Manufacturers</span>
                              </Box>
                              <Box2>
                                <span>{product}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Sales Zone :</span>
                              </Box>
                              <Box2>
                                <span>{salezone}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Details :</span>
                              </Box>
                              <Box2>
                                <span>{leadDetails}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Assign to :</span>
                              </Box>
                              <Box2>
                                <span>{assign}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer Visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>

                            <br />
                            <br />
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* Soniya commented 29/05/19
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Lead Qualification</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{leadreviewdate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Type of industry :</span>
                        </Box>
                        <Box2>
                          <span>{industry}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Product Manufacturers</span>
                        </Box>
                        <Box2>
                          <span>{product}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Sales Zone :</span>
                        </Box>
                        <Box2>
                          <span>{salezone}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Details :</span>
                        </Box>
                        <Box2>
                          <span>{leadDetails}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Assign to :</span>
                        </Box>
                        <Box2>
                          <span>{assign}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer Visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Tech Specification' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Tech Specification"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{techReviewDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Technical requirnment freezed :</span>
                              </Box>
                              <Box2>
                                <span>{techFreez}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Group</span>
                              </Box>
                              <Box2>
                                <span>{group}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Sub group :</span>
                              </Box>
                              <Box2>
                                <span>{subgroup}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Model :</span>
                              </Box>
                              <Box2>
                                <span>{model}</span>
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Capacity :</span>
                              </Box>
                              <Box2>
                                <span>{capacity}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Description :</span>
                              </Box>
                              <Box2>
                                <span>{techdescription}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Quantity :</span>
                              </Box>
                              <Box2>
                                <span>{quantity}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Send Quatation :</span>
                              </Box>
                              <Box2>
                                <span>{quotation}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/*Soniya commented 29/05/19
                     <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Tech Specification</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{techReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Technical requirnment freezed :</span>
                        </Box>
                        <Box2>
                          <span>{techFreez}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Group</span>
                        </Box>
                        <Box2>
                          <span>{group}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Sub group :</span>
                        </Box>
                        <Box2>
                          <span>{subgroup}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Model :</span>
                        </Box>
                        <Box2>
                          <span>{model}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Capacity :</span>
                        </Box>
                        <Box2>
                          <span>{capacity}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Description :</span>
                        </Box>
                        <Box2>
                          <span>{techdescription}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Quantity :</span>
                        </Box>
                        <Box2>
                          <span>{quantity}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Send Quatation :</span>
                        </Box>
                        <Box2>
                          <span>{quotation}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Project Feasibility' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Project Feasibility"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{projectReviewDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Date of contract with customer :</span>
                              </Box>
                              <Box2>
                                <span>{projectPlanDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Type of project</span>
                              </Box>
                              <Box2>
                                <span>{typeofProject}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>
                                  Target date of commissioning of plant :
                                </span>
                              </Box>
                              <Box2>
                                <span>{projectTargetDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>
                                  Approx lead time of other plant
                                  machinery(months) :
                                </span>
                              </Box>
                              <Box2>
                                <span>{projectLeadTime}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Lead / PCB NOC :</span>
                              </Box>
                              <Box2>
                                <span>{projectLand}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Civil work :</span>
                              </Box>
                              <Box2>
                                <span>{civilWork}</span>
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Mode of finance of project :</span>
                              </Box>
                              <Box2>
                                <span>{financeMode}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>If on Loan,status of finance :</span>
                              </Box>
                              <Box2>
                                <span>{financeStatus}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Project date of finaalisation :</span>
                              </Box>
                              <Box2>
                                <span>{projectedDate}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* Soniya commented 29/05/19
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Project Feasibility</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{projectReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Date of contract with customer :</span>
                        </Box>
                        <Box2>
                          <span>{projectPlanDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Type of project</span>
                        </Box>
                        <Box2>
                          <span>{typeofProject}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Target date of commissioning of plant :</span>
                        </Box>
                        <Box2>
                          <span>{projectTargetDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>
                            Approx lead time of other plant machinery(months) :
                          </span>
                        </Box>
                        <Box2>
                          <span>{projectLeadTime}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Lead / PCB NOC :</span>
                        </Box>
                        <Box2>
                          <span>{projectLand}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Civil work :</span>
                        </Box>
                        <Box2>
                          <span>{civilWork}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Mode of finance of project :</span>
                        </Box>
                        <Box2>
                          <span>{financeMode}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>If on Loan,status of finance :</span>
                        </Box>
                        <Box2>
                          <span>{financeStatus}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Project date of finaalisation :</span>
                        </Box>
                        <Box2>
                          <span>{projectedDate}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'KYC' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="KYC"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{manReviewDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Image :</span>
                              </Box>
                              <Box2>
                                <RawCarousel
                                  imageData={
                                    (showImg &&
                                      showImg.length >= 0 &&
                                      showImg) ||
                                    []
                                  }
                                />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Identified OEM :</span>
                              </Box>
                              <Box2>
                                <span>{oem}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>If yes,Name :</span>
                              </Box>
                              <Box2>
                                <span>{oemname}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Contact Details :</span>
                              </Box>
                              <Box2>
                                <span>{oemdetails}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Qualified Consultant :</span>
                              </Box>
                              <Box2>
                                <span>{qualified}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>If yes,Name :</span>
                              </Box>
                              <Box2>
                                <span>{qualifiedName}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Contact Details :</span>
                              </Box>
                              <Box2>
                                <span>{qualifiedDetails}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Identified Influencer :</span>
                              </Box>
                              <Box2>
                                <span>{influencer}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>If yes,Name :</span>
                              </Box>
                              <Box2>
                                <span>{influencerName}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Contact Details :</span>
                              </Box>
                              <Box2>
                                <span>{influencerDetails}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* Soniya commented 29/05/19
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>KYC</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{manReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Image :</span>
                        </Box>
                        <Box2>
                          <RawCarousel
                            imageData={
                              (showImg && showImg.length >= 0 && showImg) || []
                            }
                          />
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Identified OEM :</span>
                        </Box>
                        <Box2>
                          <span>{oem}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>If yes,Name :</span>
                        </Box>
                        <Box2>
                          <span>{oemname}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Contact Details :</span>
                        </Box>
                        <Box2>
                          <span>{oemdetails}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Qualified Consultant :</span>
                        </Box>
                        <Box2>
                          <span>{qualified}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>If yes,Name :</span>
                        </Box>
                        <Box2>
                          <span>{qualifiedName}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Contact Details :</span>
                        </Box>
                        <Box2>
                          <span>{qualifiedDetails}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Identified Influencer :</span>
                        </Box>
                        <Box2>
                          <span>{influencer}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>If yes,Name :</span>
                        </Box>
                        <Box2>
                          <span>{influencerName}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Contact Details :</span>
                        </Box>
                        <Box2>
                          <span>{influencerDetails}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {/* {activeItem === "Order Analysis" && (
              <ContentArea>
                <TixyContent style={{ height: "100vh" }}>
                  <Segment>
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Order Analysis</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{orderReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Name of the competitor :</span>
                        </Box>
                        <Box2>
                          <span>{orderCompetitor}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Status :</span>
                        </Box>
                        <Box2>
                          <span>{orderStatus}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Loss of order Analysis :</span>
                        </Box>
                        <Box2>
                          <span>{orderanalysis}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>
                      <br />
                      <br />
                    </MainDivHolder>
                  </Segment>
                </TixyContent>
              </ContentArea>
            )} */}

            {activeItem === 'Ref Showcasing' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Reference Showcasing"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{refReviewDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>
                                  Do we have working reference in the area ? :
                                </span>
                              </Box>
                              <Box2>
                                <span>{refArea}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Reference site visit required ? </span>
                              </Box>
                              <Box2>
                                <span>{refVisitSite}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Planned date :</span>
                              </Box>
                              <Box2>
                                <span>{refPlanDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Actual Date :</span>
                              </Box>
                              <Box2>
                                <span>{refActualDate}</span>
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Customer response offer visit :</span>
                              </Box>
                              <Box2>
                                <span>{refAfterVisit}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>
                                  Is customer ready to move to next level of
                                  discussion ? :
                                </span>
                              </Box>
                              <Box2>
                                <span>{refNextLevelDiscussion}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>
                                  If yes,tentative date of next meeting :
                                </span>
                              </Box>
                              <Box2>
                                <span>{refNextMeeting}</span>
                              </Box2>
                            </MainDiv2>

                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* Soniya commented 29/05/19
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Reference Showcasing</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{refReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>
                            Do we have working reference in the area ? :
                          </span>
                        </Box>
                        <Box2>
                          <span>{refArea}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Reference site visit required ? </span>
                        </Box>
                        <Box2>
                          <span>{refVisitSite}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Planned date :</span>
                        </Box>
                        <Box2>
                          <span>{refPlanDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Actual Date :</span>
                        </Box>
                        <Box2>
                          <span>{refActualDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer response offer visit :</span>
                        </Box>
                        <Box2>
                          <span>{refAfterVisit}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>
                            Is customer ready to move to next level of
                            discussion ? :
                          </span>
                        </Box>
                        <Box2>
                          <span>{refNextLevelDiscussion}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>If yes,tentative date of next meeting :</span>
                        </Box>
                        <Box2>
                          <span>{refNextMeeting}</span>
                        </Box2>
                      </MainDiv2>

                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}

            {activeItem === 'Objection Handling' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Objection Handling"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{objectionReviewDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer objection raised :</span>
                              </Box>
                              <Box2>
                                <span>{objectionCustRaised}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Status of objection : </span>
                              </Box>
                              <Box2>
                                <span>{objectionStatus}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>
                                  Is customer ready to place order ? :
                                </span>
                              </Box>
                              <Box2>
                                <span>{objectionPlaceOrder}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>
                                  Payment terms accepted by customers :
                                </span>
                              </Box>
                              <Box2>
                                <span>{objectionPayment}</span>
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>
                                  If no,What alternative payment terms ,proposed
                                  by customers? :
                                </span>
                              </Box>
                              <Box2>
                                <span>{objectionPaymentTerms}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Payment terms acceptable to us :</span>
                              </Box>
                              <Box2>
                                <span>{objectionPaymentAccept}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer Visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* Soniya commented 29/05/19
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Objection Handling</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{objectionReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer objection raised :</span>
                        </Box>
                        <Box2>
                          <span>{objectionCustRaised}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Status of objection : </span>
                        </Box>
                        <Box2>
                          <span>{objectionStatus}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Is customer ready to place order ? :</span>
                        </Box>
                        <Box2>
                          <span>{objectionPlaceOrder}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Payment terms accepted by customers :</span>
                        </Box>
                        <Box2>
                          <span>{objectionPayment}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>
                            If no,What alternative payment terms ,proposed by
                            customers? :
                          </span>
                        </Box>
                        <Box2>
                          <span>{objectionPaymentTerms}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Payment terms acceptable to us :</span>
                        </Box>
                        <Box2>
                          <span>{objectionPaymentAccept}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer Visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}
            {activeItem === 'Sales Order' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Sales Order"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{saleReviewDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Price negotiation :</span>
                              </Box>
                              <Box2>
                                <span>{saleNegPrice}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Final price mutually accepted :</span>
                              </Box>
                              <Box2>
                                <span>{saleFinalPrice}</span>
                              </Box2>
                            </MainDiv2>
                            <br />

                            {saleFinalPrice == 'priceyes' && (
                              <MainDiv2>
                                <Box>
                                  <span>Final price :</span>
                                </Box>
                                <Box2>
                                  <span>{this.state.finalprice}</span>
                                </Box2>
                              </MainDiv2>
                            )}

                            <br />

                            <MainDiv2>
                              <Box>
                                <span>Order closed in our favour :</span>
                              </Box>
                              <Box2>
                                <span>{saleOrderClose}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>If no,order lost details :</span>
                              </Box>
                              <Box2>
                                <span>{saleOrderLostDetails}</span>
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow:
                              ' 5px 5px 10px 6px rgba(117,124,129,.12)',
                            marginLeft: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Payment terms :</span>
                              </Box>
                              <Box2>
                                <span>{salePaymentTerms}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>If yes,generate sales order ? :</span>
                              </Box>
                              <Box2>
                                <span>{saleOrder}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Sales order generated system date :</span>
                              </Box>
                              <Box2>
                                <span>{saleSystemDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Image :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer Visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/*Soniya commented 29/05/19
                     <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Sales Order</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{saleReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Price negotiation :</span>
                        </Box>
                        <Box2>
                          <span>{saleNegPrice}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Final price mutually accepted  :</span>
                        </Box>
                        <Box2>
                          <span>{saleFinalPrice}</span>
                        </Box2>
                      </MainDiv2>
                      <br />


{saleFinalPrice == "priceyes" &&(

  <MainDiv2>
  <Box>
    <span>Final price :</span>
  </Box>
  <Box2>
    <span>{this.state.finalprice}</span>
  </Box2>
</MainDiv2>
)}
                     
                     <br />


                      <MainDiv2>
                        <Box>
                          <span>Order closed in our favour  :</span>
                        </Box>
                        <Box2>
                          <span>{saleOrderClose}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>If no,order lost details :</span>
                        </Box>
                        <Box2>
                          <span>{saleOrderLostDetails}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Payment terms :</span>
                        </Box>
                        <Box2>
                          <span>{salePaymentTerms}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>If yes,generate sales order ? :</span>
                        </Box>
                        <Box2>
                          <span>{saleOrder}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Sales order generated system date :</span>
                        </Box>
                        <Box2>
                          <span>{saleSystemDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Image :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer Visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>

                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}
            {activeItem === 'Order Analysis' && (
              <ContentArea>
                <TixyContent style={{ height: '100vh' }}>
                  <Segment>
                    <Form.Field
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }} //Soniya 29/05/19
                      className="labelcolor"
                      label="Order Analysis"
                      required
                    />
                    <hr />
                    <ContentArea>
                      <TixyContent>
                        <Segment
                          padded
                          style={{
                            height: '100%',
                            boxShadow: ' 5px 5px 8px 6px rgba(117,124,129,.12)',
                            marginRight: '5%'
                          }}
                        >
                          <MainDivHolder>
                            <MainDiv2>
                              <Box>
                                <span>Review Date :</span>
                              </Box>
                              <Box2>
                                <span>{orderReviewDate}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Name of the competitor :</span>
                              </Box>
                              <Box2>
                                <span>{orderCompetitor}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Status :</span>
                              </Box>
                              <Box2>
                                <span>{orderStatus}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Loss of order Analysis :</span>
                              </Box>
                              <Box2>
                                <span>{orderanalysis}</span>
                              </Box2>
                            </MainDiv2>
                            <br />
                            <MainDiv2>
                              <Box>
                                <span>Customer visit :</span>
                              </Box>
                              <Box2>
                                <span />
                              </Box2>
                            </MainDiv2>
                          </MainDivHolder>
                        </Segment>
                      </TixyContent>
                    </ContentArea>
                    {/* Akash */}
                    {/* Soniya commented 29/05/19
                    <MainDivHolder>
                      <MainDiv2>
                        <Box>
                          <h4>Order Analysis</h4>
                        </Box>
                        <Box2 />
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Review Date :</span>
                        </Box>
                        <Box2>
                          <span>{orderReviewDate}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Name of the competitor :</span>
                        </Box>
                        <Box2>
                          <span>{orderCompetitor}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Status :</span>
                        </Box>
                        <Box2>
                          <span>{orderStatus}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Loss of order Analysis :</span>
                        </Box>
                        <Box2>
                          <span>{orderanalysis}</span>
                        </Box2>
                      </MainDiv2>
                      <br />
                      <MainDiv2>
                        <Box>
                          <span>Customer visit :</span>
                        </Box>
                        <Box2>
                          <span />
                        </Box2>
                      </MainDiv2>
                      <br />
                      <br />
                    </MainDivHolder> */}
                  </Segment>
                </TixyContent>
              </ContentArea>
            )}
          </div>
          {/*aishwarya 30 may*/}
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
        </PageContainer2>
      </div>
    )
  }
}

const TabClick = props => {
  return <TabClick1 {...props}>{props.name}</TabClick1>
}

const searchStyle = {
  width: '19em'
}
const resultRenderer = ({ company_name, number }) => (
  <span>
    <Header as="h4">{company_name}</Header>
    <p>{number}</p>
  </span>
)

const resultRendererAssign = ({ name, mobile_num, role }) => (
  <span>
    <Header as="h4">{name}</Header>
    <p>{mobile_num}</p>
    <p>{role}</p>
  </span>
)

const formInput = {
  background: 'transparent',
  boxShadow: '0 0 0 1px #ffffff inset',
  color: '#ffffff',
  padding: '14px',
  width: '31em'
}

const btnColor = {
  backgroundColor: '#863577',
  color: 'white'
}

export default LeadView
