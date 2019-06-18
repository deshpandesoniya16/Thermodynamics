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
    verticalService,
    ticketMgmtCount
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
import YearPicker from "react-year-picker"


class Ticketmgmt extends Component {

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
     isClearable: true,
     isDisabled: false,
     isLoading: false,
     isRtl: false,
     isSearchable: true,
     customClient:[],
     totalCount:0,
     cid:'',
     aid:'',
     rejected1: 0,
     OnHold1: 0,
     Closed1: 0,
     UnderProgress1: 0,
     ticketData:[],
     ticketStatus:""
    }
    

    listTixyGodsView = ()=>{

      fetch("http://35.161.99.113:9000/webapi/t_ticket/list ", {
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
          console.log("Tixy data", data.records)
          if (data.records) {
            this.setState({ ticketData: data.records })
          } else {
            console.log("Tixy Client")
            this.setState({ ticketData: [] })
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

                let cdata = data.records

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
    

      this.listTixyGodsView()
        this.cutomerDetails()
        this.listVertical()
        this.listAsset()
        this.assignUser()
    
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
                  msg: "",
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
            assignEmpName: result.name,
            aid:result.id
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
    
    toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
    toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
    toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
    toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
    toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));

    handelCust=obj=>{
      const value = obj === null ? '' : obj

      console.log("selected value",obj)


      this.setState({
        cid:value.id
      })


    }



    handeleStatus=e=>{
      this.setState({ticketStatus:e.target.value})
    }

    genrateTicket=()=>{

      if(this.state.Vertical.length == 0 && this.state.SelectedAsset.length == 0 && this.state.aid.length == 0 && this.state.cid == 0 && this.state.SelectedTicket == 0){
        return  this.listTixyGodsView();      
      }


      fetch(ticketMgmtCount, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          verticalName: this.state.Vertical,
          assetName:this.state.SelectedAsset,
          monthyear:moment(this.state.month).format("YYYY-MM"),
          aid:this.state.aid,
          cid:this.state.cid,
          status:this.state.SelectedTicket
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          if(data.records){
            let tdata= data.records
            this.setState({ticketData:tdata,totalCount:data.count})
          }else{
            console.log("else data", data)
            this.setState({msg:"No data"})

            // this.setState({ticketData:[],totalCount:0})
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
       cid:'',
       aid:'',
       SelectedAsset:'',
       month:'',
       SelectedTicket:''
      })
    }

    handelassignUser=obj=>{
      this.setState({aid:obj.id, aname:obj.name})
    }
    
        render(){

        
    
            let {isLoading,results,value,
            Vertical,verticalData,AssetData,
            isLoadingAssign,valueAssign,resultsAssign,
            isClearable,
          isSearchable,
          isDisabled,
          isRtl,
          totalCount,
          rejected1,
          OnHold1,
          Closed1,
          UnderProgress1,
            }=this.state

            
    let rejected = 0
    let OnHold = 0
    let Closed = 0
    let UnderProgress = 0

    let rejectedCount = []
    let OnHoldCount = []
    let ClosedCount = []
    let UnderProgressCount = []

    rejected1 = rejected
    OnHold1 = OnHold
    Closed1 = Closed
    UnderProgress1 = UnderProgress
    console.log("ra is", rejected1)
    console.log("rm is", OnHold1)
    console.log("ch is", Closed1)
    console.log("Under Progress", UnderProgress1)

            this.state.ticketData.map(i => {
              if (i.status == "Rejected") {
                rejected++
                rejectedCount.push(i)
                console.log("rejected list", rejectedCount)
              } else if (i.status == "hold") {
                OnHold++
                OnHoldCount.push(i)
              } else if (i.status == "Closed") {
                Closed++
                ClosedCount.push(i)
              } else if (i.status == "UnderProgress") {
                UnderProgress++
                UnderProgressCount.push(i)
              }
            })
            ;(rejected1 = rejected),
              (OnHold1 = OnHold),
              (Closed1 = Closed),
              (UnderProgress1 = UnderProgress)
            console.log("ra is", rejected1)
            console.log("rm is", OnHold1)
            console.log("ch is", Closed1)
            console.log("Under Progress", UnderProgress1)
        
            let piedata = [
              {
                id: "Rejected",
                x: "Rejected",
                y: rejected1,
                color: "hsl(44, 100%, 58%)"
              },
              {
                id: "hold",
                x: "hold",
                y: OnHold1,
                color: "hsl(0, 75%, 50%)"
              },
              {
                id: "Closed",
                x: "Closed",
                y: Closed1,
                color: "hsl(128, 70%, 40%)"
              },
              {
                id: "UnderProgress",
                x: "UnderProgress",
                y: UnderProgress1,
                color: "hsl(40, 70%, 40%)"
              }
            ]
        

            return(
                <div>
       <ContentArea>
    
    
      
    
       <TableDiv>
       <Segment padded style={{ height: "100%" }}>
       <TixyContent style={{ flex: 1 }}>
    
              <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={this.state.clientData[0]}
              isDisabled={isDisabled}
              isLoading={isLoading}             
               isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={this.state.clientData}
              onChange={this.handelCust}
              getOptionLabel={(clientData) => (`${clientData.company_name}`)}

            />
            {/* <p Tag="label">
              <Checkbox
                checked={isClearable}
                onChange={this.toggleClearable}
                id="cypress-single__clearable-checkbox"
              />
              Clearable
            </p>
            <p Tag="label" style={{ marginLeft: '1em' }}>
              <Checkbox
                checked={isSearchable}
                onChange={this.toggleSearchable}
                id="cypress-single__searchable-checkbox"
              />
              Searchable
            </p> */}
           
           
           
                     {/* <div style={{ width: 400 }}>
                     <Search
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
                        <Form.Field label="Asset" />
                        <select
                          value={this.state.SelectedAsset}
                          onChange={this.handleAsset}
                        >
                          <option value="" disabled selected hidden>
                            Select Asset
                          </option>
                          {AssetData.map(i => (
                            <option value={i.name} key={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                        <br />
    
    
                        <Form.Field label="Select Ticket Status" />
                        <select
                          value={this.state.SelectedTicket}
                          onChange={this.handleTicketStatus}
                        >
                          <option value="" disabled selected hidden>
                          Select Ticket Status
                          </option>
                        
                            <option value="Closed">Closed</option>
                            
                            <option value="Rejected">Rejected</option>

                            <option value="hold">hold</option>

                            <option value="UnderProgress">UnderProgress</option>
                            
                        </select>
    
                      </div>
                      <br />
    
                    <br />
    
    
    
                 
    </Form>

    <div style={{ width: 400 }}>
    <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={this.state.clientData[0]}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={this.state.AssignedUser}
              onChange={this.handelassignUser}
              getOptionLabel={(AssignedUser) => (`${AssignedUser.name}: ${AssignedUser.mobile_num}`)}

            />
    </div>
    {/* 
    <label className="labelcolor">Assign User</label>
                        <Search
                          loading={isLoadingAssign}
                          onResultSelect={this.handleResultSelectAssign}
                          onSearchChange={this.handleSearchChangeAssign}
                          results={resultsAssign}
                          value={valueAssign}
                          resultRenderer={resultRendererAssign}
                          aligned="right"
                        />
                   </div>
                    <br/> */}
                    <br/>
    
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
                            <SubHeadingText>Rejected</SubHeadingText>
                          </div>
    
                          <div style={{ display: "flex", margin: "8px" }}>
                            <AssetDiv />
                            <SubHeadingText>Closed</SubHeadingText>
                          </div>
    
                          <div style={{ display: "flex", margin: "8px" }}>
                            <ProductDiv />
                            <SubHeadingText>On Hold</SubHeadingText>
                          </div>
                          <div style={{ display: "flex", margin: "8px" }}>
                            <Inprogress />
                            <SubHeadingText>In Progrss</SubHeadingText>
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
                                style={{ labels: { fontSize: 22 ,fill: "white"} }}
                                labelRadius={110}
                                colorScale={["orange","#00aa8a","#643C31","#6975A9" ]}
                                labels={d =>
                                  d.y == 0?( `${""}`):(`${d.y}`)
                                }
                            
                                events={[{
                                  target: "data",
                                  eventHandlers: {
                                    onClick: () => {
                                      let h,p,r,c;
                                      return [
                                        {
                                          target: "data",
                                          
                                          mutation: (props) => {
                                     // console.log(target)
                                      // console.log(props)
                                      
                                      
                                            // const fill = props.style && props.style.fill;
                                            // return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                                          }
                                        },
                                      ];
                                    }
                                  }
                                }]}
                            
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
    

    export default Ticketmgmt
    