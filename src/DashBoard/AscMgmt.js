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
    verticalService,TixyEscalantion,listLead_Contract,acsMgmt,
    verticalBaseOit,verticalBaseBreak,verticalBaseOverhual,listtennure_srno
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
  CircleDiv
  
} from "../styledComps.js"

import Select from 'react-select'
import YearPicker from "react-year-picker"



class Ascmgmt extends Component {

    state={

        isLoading:false,
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

     overhaulingName:'',
     breakDownName:'',
     oitName:'',
     oitDetails:[],
     breakDownData:[],
     OverHulingDetails:[],
     TableList :["oit","overhauling","breakdown"],
    
     AscMgmtData:[],
     totalCount:0,   
     cid:0,
     isClearable: true,
     isDisabled: false,
     isLoading: false,
     isRtl: false,
     isSearchable: true,
     t_contract:'',
     n_contract:'',
    tenuureDate:[],
    srnoList:[],
    Selectedsrno:'',
    t_date:''

    }
    

    listsrno=()=>{
      fetch(listtennure_srno, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data)
          
          if(data.records){
            let list =data.records 

           let datelist=[]
        
           let srno=[]
            list.map(i=>{
              datelist.push(i.tenureTo)
              srno.push(i.srno)

            })
            // console.log('datelist:', datelist)
            // console.log('srno:', srno)

            this.setState({tenuureDate:datelist,srnoList:srno})

            // this.setState({oitName:data.oitData.name})
          }else{
            console.log("No Oit data")
          }
        
        })
    }





    verticalBasedOitData =(id)=>{

        fetch(verticalBaseOit, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            vid:id
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
    
            if(data.oitData){
              this.setState({oitName:data.oitData.name})
            }else{
              console.log("No Oit data")
            }
          
          })
    
      }
    
    
      verticalBasedbreakData = (id)=>{
    
        fetch(verticalBaseBreak, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            vid:id
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            if(data.breakData){
              this.setState({breakDownName:data.breakData.name})
            }else{
              console.log("No Break data")
            }
          
          })
    
      }
    
    
    
      verticalBasedOverHualData = (id)=>{
    
        fetch(verticalBaseOverhual, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            vid:id
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("data", data)
            if(data.overhualData){
              this.setState({overhaulingName:data.overhualData.name})
            }else{
              console.log("No overhual data")
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
    

  lead_ContractList=(tableName)=>{
    fetch(listLead_Contract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tablename:tableName    
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
      
        if (data.message == "Data available") {


          switch (tableName) {
            case 'oit':
              this.setState({oitDetails:data.records})
              console.log('Oit Data', data.records);
              break;

              case 'overhauling':
              this.setState({OverHulingDetails:data.records})
              console.log('OverHuling', data.records);
              break;
          
              case 'breakdown':
              this.setState({breakDownData:data.records})
              console.log('breakdown', data.records);
              break;
          }
        }  else {
            console.log("Something went wrong !!!!!!!")
          }
        })
      }
    
    
    async componentDidMount() {
      
        this.cutomerDetails()
        this.listVertical()
        this.listAsset()
        this.assignUser()
        this.listsrno()

        
  this.state.TableList.map(i=>{
    console.log('i', i);
    
    switch (i) {
      case 'oit':
        this.lead_ContractList(i)
        break;
    
        case 'overhauling':
        this.lead_ContractList(i)

            break;
        
            case 'breakdown':
            this.lead_ContractList(i)

            break;
            default:
            console.log("No Matching Table Data")
              break;
          }
        })
    
    }
    
    
    handleVertical = e => {
        let vname = e.target.value
        let vid
        this.state.verticalData.map(i => {
          if (i.vertical == vname) {
            vid = i.id
          }
        })
        this.setState({ Vertical:vname, isHOD: true })
    
        // this.listGroup(vid)
        this.verticalBasedOitData(vid)
        this.verticalBasedOverHualData(vid)
        this.verticalBasedbreakData(vid)        
        
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
    


    
  handleOit = e => {
    this.setState({ oitName: e.target.value })
  }

  handleBreakDown = e => {
    this.setState({ breakDownName: e.target.value })
  }

  handleOverHuling = e => {
    this.setState({ overhaulingName: e.target.value })
  }


  
  genrateTicket=()=>{
    fetch(acsMgmt, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vertical: this.state.Vertical,
        oitName:this.state.oitName,
        breakdown:this.state.breakDownName,
        monthyear:moment(this.state.month).format("YYYY-MM"),
        overhaulingName:this.state.overhaulingName,
        cid:this.state.cid,
        toc:this.state.t_contract,
        noc:this.state.n_contract,
        unitModelNo:this.state.Selectedsrno,
        tenureDate:this.state.t_date
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        if(data.records){
          let tdata= data.records
          this.setState({AscMgmtData:tdata,totalCount:data.count})
        }else{

          this.setState({msg:"No data"})
          // this.setState({AscMgmtData:[],totalCount:0})

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
     oitName:'',
     breakDownName:'',
     month:'',
     overhaulingName:'',
     cid:'',
     t_contract:'',n_contract:'',Selectedsrno:'',t_date:''

    })
  }
  handelCust=obj=>{
    const value = obj === null ? '' : obj

    console.log("selected value",obj)


    this.setState({
      cid:value.id
    })


  }


  handleTypeofContract=e=>{
    this.setState({t_contract:e.target.value})
  }

  handelNatureOfContract=e=>{
    this.setState({n_contract:e.target.value})
  }


  handleSrno=e=>{
    this.setState({Selectedsrno:e.target.value})
  }


  handleTdate=e=>{
    this.setState({t_date:e.target.value})
  }






    render() {
                   
        const {isLoading,results,value,
            Vertical,verticalData,AssetData,
            isLoadingAssign,valueAssign,resultsAssign,
            isSearchable,
          isDisabled,
          isRtl, 
            }=this.state

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
               isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={this.state.clientData}
              onChange={this.handelCust}
              getOptionLabel={(clientData) => (`${clientData.company_name}`)}

            />
               </div>
                <br/>
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
                    <Form.Field label="Unit Model" />
                    <select
                      value={this.state.Selectedsrno}
                      onChange={this.handleSrno}
                    >
                      <option value="" disabled selected hidden>
                      Unit Model
                      </option>
                      
                      {this.state.srnoList.map(i=>(
                        <option value={i}>{i}</option>
                      ))}

                      
                    </select>
                    <br />


                    <Form.Field label="Type of Contract" />
                    <select
                      value={this.state.t_contract}
                      onChange={this.handleTypeofContract}
                    >
                      <option value="" disabled selected hidden>
                      Type of Contract
                      </option>
                    
                      <option value="new">New</option>
                        <option value="renew">Renew</option>
                        <option value="gpm">GPM</option>
                    </select>


                    <Form.Field label="Nature of Contract" />
                    <select
                      value={this.state.n_contract}
                      onChange={this.handelNatureOfContract}
                    >
                      <option value="" disabled selected hidden>
                      Nature of Contract
                      </option>
                    
                      <option value="service">Service</option>
                        <option value="comp">Comprehensive</option>
                    </select>


                    <Form.Field>
                        <label>OIT(Once in 2 months) : </label>
                        <select
                          value={this.state.oitName}
                          onChange={this.handleOit}
                        >
                          <option value="" disabled selected hidden>
                            Different Visit for different verticals
                          </option>
                          {this.state.oitDetails.map(i => (
                               <option value={i.name} key={i.id}>
                               {i.name}
                             </option>
                          ))}
                        </select>

                      </Form.Field>





                    <Form.Field>
                        <label>Breakdown : </label>
                        <select
                          value={this.state.breakDownName}
                          onChange={this.handleBreakDown}
                        >
                          <option value="" disabled selected hidden>
                            Different breakdown for different verticals
                          </option>
                          {this.state.breakDownData.map(i => (
                            <option value={i.name} key={i.id}>
                            {i.name}
                          </option>
                          ))}
                        </select>
                      </Form.Field>



                    <Form.Field>
                        <label>Overhuling (O/H) : </label>
                        <select
                          value={this.state.overhaulingName}
                          onChange={this.handleOverHuling}
                        >
                          <option value="" disabled selected hidden>
                            Different breakdown for different verticals
                          </option>
                          {this.state.OverHulingDetails.map(i => (
                            <option value={i.name} key={i.id}>
                            {i.name}
                          </option>
                          ))}
                        </select>
                      </Form.Field>


                      <Form.Field>
                        <label>Contract Expired : </label>
                        <select
                          value={this.state.t_date}
                          onChange={this.handleTdate}
                        >
                          <option value="" disabled selected hidden>
                          Contract Expired :                           </option>
                     
                     {this.state.tenuureDate.map(i=>(
                            <option value={i}>{i}</option>

                     ))}
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

                
   </Form>

<br/>
   <Button   style={{backgroundColor: "#863577",
                        color: "#ffffff"}} 
                     onClick={()=>this.genrateTicket()}>Genrate</Button>

              

                    </TixyContent>
                    </Segment>
                    </TableDiv>
                    
<GraphDiv>

    <div   style={{
                        display: "flex",
                        justifyContent: "center",
                       margin:'auto',
                       marginLeft:'25rem'

                      }}>

<HIWItem number={this.state.totalCount}/>
         </div>          
                  </GraphDiv>
</ContentArea>
</div>
        )
    }
}


const HIWItem = props => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 12
        }}
      >
        <CircleDiv>
          <span
            style={{
              color: "palevioletred",
              fontWeight: 600,
              fontSize: 48
            }}
          >
            {props.number}
          </span>
        </CircleDiv>
        <span
          style={{
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: 2,
            marginTop: 30
          }}
        >
          {props.title}
        </span>
        <span style={{ fontWeight: 300 }}>{props.text}</span>
      </div>
    )
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


export default Ascmgmt