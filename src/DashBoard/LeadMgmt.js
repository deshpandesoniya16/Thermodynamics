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
  
    verticalAsset,
  
    verticalService,listLead_Contract,leadMgmt,
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
  SalesManger,
  SalesEngg,
  Back_off_Ex,
  Service_Engg,
  BackOfficeSupport,
  HTM,
  
} from "../styledComps.js"

import Select from 'react-select'
import YearPicker from "react-year-picker"







class Leadmgmt extends Component {

    state={  
      value:'',
      result:[],
   clientData : [] ,
   Vertical: "",
   isHOD: false,
   verticalServiceHodData: [],
   aname: "",
   AssetData: [],
   verticalData:[],
   SelectedAsset:'',
   SelectedTicket:'',
   AssignedUser:[],
   isLoadingAssign: false,
   valueAssign: "",
   resultsAssign: [],
   month:'',
   year:moment(),
   leadQualiIndustry: [],
   leadSaleZone:[],
   salezone:'',
   industry:'',
   leadMgmtData:[],
totalCount:0,   
cid:0,
typeofProject:'',
leadStatus:'',
isClearable: true,
isDisabled: false,
isLoading: false,
isRtl: false,
isSearchable: true,
  }
  
  
  leadMgmtGodsview = () =>{
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
        console.log("lead data", data.records)
        if (data.records) {
          this.setState({ leadMgmtData: data.records })
        } else {
          console.log("No lead")
          this.setState({ leadMgmtData: [] })
        }
      })
  }
  
  
  listLeadForSelect = () => {
    fetch(listLead_Contract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tablename: "industry"
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("type of industry", data.records)
        if (data.records) {
          this.setState({ leadQualiIndustry: data.records })
        } else {
          console.log("No lead source")
          this.setState({ leadQualiIndustry: [] })
        }
      })
  }
  
  
  listLeadSaleZone = () => {
    fetch(listLead_Contract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tablename: "zone"
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("product", data.records)
        if (data.records) {
          this.setState({ leadSaleZone: data.records })
        } else {
          console.log("No lead source")
          this.setState({ leadSaleZone: [] })
        }
      })
  }
  
  
  
  listVertical = () => {
      fetch(verticallist, {
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
          console.log("vertical list", data.records)
          if (data.records) {
            this.setState({ verticalData: data.records })
            let vid
            data.records.map(i => {
              if (i.vertical == this.state.Vertical) {
                vid = i.id
              }
            })
            this.listAsset(this.state.Vertical)
          } else {
            console.log("No vertical")
            this.setState({ verticalData: [] })
          }
        })
    }
  
  
    verticalHod = roleName => {
      fetch(verticalService, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          role: roleName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("Service Hod ", data.records)
          if (data.records) {
            this.setState({ verticalServiceHodData: data.records })
          } else {
            console.log("No Hod")
            this.setState({ verticalServiceHodData: [] })
          }
        })
    }
  
  
    listAsset = id => {
      fetch(verticalAsset, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          verticalName: id
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          console.log("asset list", data.records)
          if (data.records) {
            let gid
            data.records.map(i => {
              if (i.name == this.state.SelectedAsset) {
                gid = i.id
              }
            })
          //   this.listGroup(gid)
            this.setState({ AssetData: data.records })
          } else {
            console.log("No vertical")
            this.setState({ AssetData: [] })
          }
        })
    }
  
  
  
  
  
  cutomerDetails =()=>{
      fetch("http://35.161.99.113:9000/webapi/t_client/list ", {
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
  
  assignUser=()=>{
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
            console.log("Assigned User", data.records)
            if (data.records) {
              this.setState({ AssignedUser: data.records })
            } else {
              console.log("No user")
              this.setState({ AssignedUser: [] })
            }
          })
  }
  
  
  async componentDidMount() {
  
    this.leadMgmtGodsview();
      this.cutomerDetails()
      this.listVertical()
      this.listAsset()
      this.assignUser()
      this.listLeadSaleZone()
      this.listLeadForSelect()
  
  }
  
  
  handleVertical = e => {
      let vname = e.target.value
      let vid
      this.state.verticalData.map(i => {
        if (i.vertical == vname) {
          vid = i.id
        }
      })
      // this.listGroup(vid)
      this.listAsset(vname)
      this.setState({ Vertical: e.target.value, isHOD: true })
  
      switch (vname) {
        case "Thermax":
          let thod = vname + " " + "Service-HOD"
          console.log("thod", thod)
  
          this.verticalHod(thod)
          break
  
        case "Atlas Copco":
          let splitString = vname.substring(0, 5)
          console.log("splitString Atlas", splitString)
          let finalString = splitString + " " + "Service-HOD"
          console.log("finalString Atlas", finalString)
          this.verticalHod(finalString)
  
          break
  
        case "Buhler":
          let bsplitString = vname.substring(0, 6)
          console.log("splitString Buhler", bsplitString)
          let bfinalString = bsplitString + " " + "Service-HOD"
          console.log("finalString Buhler", bfinalString)
          this.verticalHod(bfinalString)
  
          break
  
        default:
          break
      }
    }
  
  
    handleAsset = e => {
      let aname = e.target.value
      let aid
      this.state.AssetData.map(i => {
        if (i.name == aname) {
          aid = i.id
        }
      })
      // this.listGroup(aid)
      this.setState({ SelectedAsset: aname })
    }
  
      resetComponent = () => {
          this.setState({ isLoading: false, results: [], value: "" })
        }
      
        handleResultSelect = (e, { result }) => {
          this.setState({ value: result.company_name, cid: result.id })
          this.setState({ SelectedResult: result })
          setTimeout(() => {
            // let active=true
            if (this.state.SelectedResult) {
              this.setState({
                Name: this.state.SelectedResult.company_name,
                Phno: this.state.SelectedResult.number,
                address: this.state.SelectedResult.address,
                //rating:this.state.SelectedResult.star,
                email: this.state.SelectedResult.email,
                msg: ""
              })
            }
          }, 1000)
        }
      
        handleSearchChange = (e, { value }) => {
          this.setState({ isLoading: true, value: value })
      
          setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()
      
            const re = new RegExp(_.escapeRegExp(this.state.value), "i")
            const isMatch = result => re.test(result.company_name)
      
            this.setState({
              isLoading: false,
              results: _.filter(this.state.clientData, isMatch)
            })
          }, 500)
        }
  
        handleTicketStatus=e=>{
            this.setState({SelectedTicket:e.target.value})
        }
  
  
        //AssignedUser
    resetComponentAssign = () => {
      this.setState({
        isLoadingAssign: false,
        resultsAssign: [],
        valueAssign: ""
      })
    }
  
    handleResultSelectAssign = (e, { result }) => {
      console.log("result", result)
      this.setState({
        valueAssign: result.name,
        aid: result.id,
        aname: result.name
      })
      this.setState({ SelectedResultAssign: result })
      if (result) {
        this.setState({
          assignEmpName: result.name
        })
      }
    }
  
    handleSearchChangeAssign = (e, { value }) => {
      this.setState({ isLoadingAssign: true, valueAssign: value })
  
      setTimeout(() => {
        if (this.state.valueAssign.length < 1) return this.resetComponentAssign()
  
        const re = new RegExp(_.escapeRegExp(value), "i")
        const isMatch = result => re.test(result.name)
  
        this.setState({
          isLoadingAssign: false,
          resultsAssign: _.filter(this.state.AssignedUser, isMatch)
        })
      }, 500)
    }
  
  
    handelMonth=date=>{
        this.setState({month:date})
    }
  
    handelYear=date=>{
      this.setState({year:date})
  }
  
        
  
  handleIndustry = e => {
    this.setState({ industry: e.target.value })
  }
  
  handleSalezone = e => {
    this.setState({ salezone: e.target.value })
  }

  handleLeadOrderStatus=e=>{
    this.setState({leadOrderStatus:e.target.value})
  }



  genrateTicket=()=>{

    if(this.state.Vertical.length == 0 && this.state.salezone.length == 0 && this.state.industry.length == 0 && this.state.leadStatus == 0 && this.state.leadOrderStatus && this.state.cid){
        this.leadMgmtGodsview();      
    }


    fetch(leadMgmt, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        verticalName: this.state.Vertical,
        saleZone:this.state.salezone,
        industry_type:this.state.industry,
        monthyear:moment(this.state.month).format("YYYY-MM"),
        leadStatus:this.state.leadStatus,
        orderRecieved:this.state.leadOrderStatus,
        cid:this.state.cid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        if(data.records){
          let tdata= data.records
          this.setState({leadMgmtData:tdata,totalCount:data.count})
        }else{

          this.setState({msg:"No data"})
          this.setState({leadMgmtData:[],totalCount:0})

        }

        this.empty()
        // console.log("asset list", data.records)
        // if (data.records) {
        //   let gid
        //   data.records.map(i => {
        //     if (i.name == this.state.SelectedAsset) {
        //       gid = i.id
        //     }
        //   })
        // //   this.listGroup(gid)
        //   this.setState({ AssetData: data.records })
        // } else {
        //   console.log("No vertical")
        //   this.setState({ AssetData: [] })
        // }
      })
  }


  empty = () =>{
      

    this.setState({
     Vertical :'',
     salezone:'',
     breakDownName:'',
     month:'',
     leadStatus:'',
     leadOrderStatus:'',
     cid:'',
     industry:''

    })
  }

  handletypeofproject = e => {
    this.setState({ typeofProject: e.target.value })
  }

  handleLeadStatus=e=>{
    this.setState({leadStatus:e.target.value})
  }


  handelCust=obj=>{
    console.log("selected value",obj)
    this.setState({
      cid:obj.id
    })
  }


      render(){
  
  
          const {isLoading,results,value,
          Vertical,verticalData,AssetData,
          isLoadingAssign,valueAssign,resultsAssign,
          industry,salezone,typeofProject,
          isClearable,
          isSearchable,
          isDisabled,
          isRtl,
          }=this.state


          
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




          this.state.leadMgmtData.map(i => {
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



          return(
              <div>
     <ContentArea>
  
  
    
  
     <TableDiv>
     <Segment padded style={{ height: "100%" }}>
     <TixyContent style={{ flex: 1 }}>
                   <div style={{ width: 400 }}>

                   <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={this.state.clientData[0]}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={this.state.clientData}
              onChange={this.handelCust}
              getOptionLabel={(clientData) => (`${clientData.company_name}`)}

            />
            </div>


                   {/* <Search
                     loading={isLoading}
                     onResultSelect={this.handleResultSelect}
                     onSearchChange={this.handleSearchChange}
                     results={results}
                     value={value}
                     resultRenderer={resultRenderer}
                     aligned="right"
                   />
                 </div>
                  <br/> */}
                  <br/>
             
                  <Form>
                    <div>
                      <Form.Field label="Vertical" required />
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1, marginRight: 12 }}>
                          <select value={Vertical} onChange={this.handleVertical}>
                            <option value="" disabled selected hidden>
                              Select Vertical
                            </option>
                            {verticalData.map(i => (
                              <option value={i.vertical} key={i.id}>
                                {i.vertical}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
  
                      <br />
                    
  
  
                      <Form.Field>
                          <label>Sale Zone</label>
                          <select value={salezone} onChange={this.handleSalezone}>
                            <option value="" disabled selected hidden>
                              Select sale zone
                            </option>
                            {this.state.leadSaleZone.map(i => (
                              <option value={i.name} key={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </Form.Field>
  
  
                      <Form.Field>
                          <label>Type of industry</label>
                          <select value={industry} onChange={this.handleIndustry}>
                            <option value="" disabled selected hidden>
                              Select industry
                            </option>
                            {this.state.leadQualiIndustry.map(i => (
                              <option value={i.name} key={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </Form.Field>
  
  
                        <Form.Field>
                        <label>Type of project</label>
                        <select
                          value={typeofProject}
                          onChange={this.handletypeofproject}
                        >
                          <option value="" disabled selected hidden>
                            Select Project
                          </option>
                          <option value="New" key="">
                            New
                          </option>
                          <option value="Expansion" key="">
                            Expansion
                          </option>
                          <option value="Modernization" key="">
                            Modernization
                          </option>
                          <option value="Up-gradation" key="">
                            Up-gradation
                          </option>
                          <option value="Replacement" key="">
                            Replacement
                          </option>
                        </select>
                      </Form.Field>
  
                    </div>
                    <br />
  
  </Form>
  
  <Form>
                     
                  <div>
                        <label className="labelcolor">Month:</label>
                      </div>
                      <DatePicker
                        selected={this.state.month}
                        onChange={this.handelMonth}
                        onFocus={e => e.target.blur()}
                        showYearDropdown
                        dateFormat="MM/YYYY"
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                      />
  
  
                      {/* <div>
                        <label className="labelcolor">Year :</label>
                      </div>
                      <YearPicker
                      onChange={this.handelYear}
                    />
     */}
  <br/>
  
  <Form.Group inline widths={3}>
  
  <label>Lead Status :</label>
                      <input
                        type="radio"
                        id="radio5"
                        name="radio5"
                        value="Active"
                        onChange={this.handleLeadStatus}
                        required
                      />
                      <label htmlFor="radio5">Active</label>
                      <input
                        type="radio"
                        id="radio5"
                        name="radio5"
                        value="Inactive"
                        onChange={this.handleLeadStatus}
                        required
                      />
                      <label htmlFor="radio5">Inactive</label>
                    </Form.Group>
  
  
                    <Form.Group inline widths={3}>
  
  <label>Order Recieved : </label>
                      <input
                        type="radio"
                        id="radio1"
                        name="radio1"
                        value="orderyes"
                        onChange={this.handleLeadOrderStatus}
                        required
                      />
                      <label htmlFor="radio1">Yes</label>
                      <input
                        type="radio"
                        id="radio2"
                        name="radio1"
                        value="orderno"
                        onChange={this.handleLeadOrderStatus}
                        required
                      />
                      <label htmlFor="radio2">No</label>

                      <input
                        type="radio"
                        id="radio3"
                        name="radio3"
                        value="hold"
                        onChange={this.handleLeadOrderStatus}
                        required
                      />
                      <label htmlFor="radio3">hold</label>
                    </Form.Group>
  </Form>
  
  <br/>

  <Button   style={{
                        backgroundColor: "#863577",
                        color: "#ffffff"
                      }} 
                      
                      onClick={()=>this.genrateTicket()}>Genrate</Button>

                 
  
  
  
              </TixyContent>
                </Segment>
                    </TableDiv>
  
  
  
  
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
                                     

                                      // const fill = props.style && props.style.fill;
                                      // return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                                    }
                                  },
                               
                                ]
                              }
                            }
                          }
                        ]}
                      />
                    </svg>
                  </GraphDiv>
 
                     </ContentArea>
  
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

  const resultRendererAssign = ({ name, mobile_num, role }) => (
    <span>
      <Header as="h4">{name}</Header>
      <p>{mobile_num}</p>
      <p>{role}</p>
    </span>
  )

  export default Leadmgmt