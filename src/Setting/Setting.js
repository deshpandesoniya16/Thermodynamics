import React, { Component } from "react"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Button,
  Input,
  Container,
  Card,
  Rating,
  Dropdown,
  Header,
  Modal,
  List,
  Form,
  TextArea,
  Grid,
  Image,
  Navbar,
  Menu,
  Icon,
  Sidebar,
  Segment,
  Table,
  Divider,
  Loader,
  Dimmer
} from "semantic-ui-react"
import { Route, Switch, Link, Redirect } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import Side from "./../component/Sidenav"
import { Scrollbars } from "react-custom-scrollbars"
import GenricModal from "../component/GenricModal";
import GenrericDelete from "../component/GenrericDelete"

import {
  industryAdd,
  industryList,
  industryDelete,
  SubIndustryadd,
  SubIndustrylist,
  addProductService,
  pslist,
  deletePS,
  AssetTypeList,
  verticallist,
  addVertical,
  deleteVertical,
  deleteAssetType,
  deleteSubInd,
  grouplist,
  addGroup,
  deleteGroup,
  subgrplist,
  addSubgrp,
  deletSubGrp,
  leadSourcelist,
  addleadSource,
  deleteleadSource,
  fuelTypelist,
  fuelTypeadd,
  fuelTypedelete,
  fuelNamelist,
  fuelNameAdd,
  deletefuelName,
  serieslist,
  seriesadd,
  seiesdelete,
  callTypelist,
  addcallType,
  deleteCallType,
  visitTypeList,
  addvisitTypeadd,
  deleteVisitType,
  meetingTypeList,
  addMeetingType,
  deleteMeeting,
  addLead_Contract,
  deleteLead_Contract,
  listLead_Contract,
  

} from ".././component/Api"

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

class Setting extends Component {
  state = {
    menuVisible: false,
    psData: [],
    industryData: [],
    subindustryData: [],
    verticalData: [],
    iname: "",
    isIndustry: false,
    isSubIndustry: false,
    ProducrService: false,
    open1: false,
    size: "",
    pstype: "",
    size2: "",
    vname: "",
    Vertical: "",
    open3: false,
    AssetData: [],
    atype: "",
    isOpenAsset: false,
    open4: false,
    size4: "",
    istype: "",
    size5: "",
    industryId: "",
    disablesubind: true,
    groupData: [],
    grpid: "",
    grpadd: false,
    open6: false,
    subGroupData: [],
    subgrpid: "",
    subgrpadd: false,
    open7: false,
    subgrpName: "",
    disablesubgrp: true,
    size7: "",
    leadsourceData: [],
    leadid: "",
    leadmodal: false,
    size8: "",
    open8: false,
    fuelTypeData: [],
    ftid: "",
    addfuelTypeModal: false,
    ftype: "",
    size9: "",
    open9: false,
    fuelNameData: [],
    fuelNameId: "",
    fuel_name: "",
    fuelNameModal: false,
    seriesData: [],
    seriesId: "",
    series_name: "",
    seriesModal: false,

    callTypeData: [],
    meetingTypeData: [],
    visitTypeData: [],
    calltypeid: "",
    callTypeModal: false,
    open12: false,
    size12: "",
    vsittypeId: "",
    size13: "",
    meetingTypeName: "",
    size14: "",
    open14: false,
    meetingTypeModal: false,
    meetingtypeId: "",
    tableName:'',

     TableList :["oit","overhauling","breakdown","zone","competitor","statusObjection",
                  "productManufacturers","objectionRaised","priceNegotiation",'compititorStatus','productType'],
     oitData:[],
     overHaulingData:[],
     breakdownData:[],
     productManufacturersData:[],
     zoneData:[],
     productTypeData:[],
     competitorData:[],
     objectionRaisedData:[],
     priceNegotiationData:[],
     statusObjectionData:[],

     isopenGenricModal:false,
     genDelete:false,
     deleteTableName:'',
     genBreakDownDelete:false,
     isopenOverhulingModal:false,
     genOverhulingDelete:false,
     genCompDelete:false,
     statusObjection:'',
     s_objectionModal:false,
     s_objectioDelete:false,
     price_Negotitation:'',
     p_NegotitationModal:false,
     p_NegotitationDelete:false,
     CORModal:false,
     CORDelete:false,
     cor:'',
     PM:false,
     PMDelete:false,
     zmodal:false,
     zmodalDelete:false,
     productTypemodal:false,
     productTypeModalDelete:false,
     cosData:[],
     isLoading:true,
     isOpenVisit:false,
     visitName:''
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
        //console.log("data", data)
        //console.log("vertical list", data.records)
        if (data.records) {
          this.setState({ verticalData: data.records })
        } else {
          //console.log("No vertical")
          this.setState({ verticalData: [] })
        }
      })
  }

  assetTypeList = () => {
    fetch(AssetTypeList, {
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
        //console.log("Asset data", data.records)
        if (data.records) {
          this.setState({ AssetData: data.records })
        } else {
          //console.log("No Assets")
          this.setState({ AssetData: [] })
        }
      })
  }

  IndustryList = () => {
    fetch(industryList, {
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
        //console.log("industry List ", data.records)
        if (data.records) {
          this.setState({ industryData: data.records })
        } else {
          //console.log("No vertical")
          this.setState({ industryData: [] })
        }
      })
  }

  listGroup = () => {
    fetch(grouplist, {
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
        //console.log("Group List ", data.records)
        if (data.records) {
          this.setState({ groupData: data.records })
        } else {
          //console.log("No Group")
          this.setState({ groupData: [] })
        }
      })
  }

  listSubGroup = () => {
    fetch(subgrplist, {
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
        //console.log("Sub Group List ", data.records)
        if (data.records) {
          this.setState({ subGroupData: data.records })
        } else {
          //console.log("No Sub Group")
          this.setState({ subGroupData: [] })
        }
      })
  }

  handleIndustry = () => {
    this.setState({ isIndustry: true })
  }

  subIndustrylist = () => {
    fetch(SubIndustrylist, {
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
        //console.log("Sub industry List ", data.records)
        if (data.records) {
          this.setState({ subindustryData: data.records })
        } else {
          //console.log("No industry")
          this.setState({ subindustryData: [] })
        }
      })
  }

  productServiceList = () => {
    fetch(pslist, {
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
        //console.log("Product Service List ", data.records)
        if (data.records) {
          this.setState({ psData: data.records })
        } else {
          //console.log("No Product Service")
          this.setState({ psData: [] })
        }
      })
  }

  lead_s_list = () => {
    fetch(leadSourcelist, {
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
        //console.log("lead source List ", data.records)
        if (data.records) {
          this.setState({ leadsourceData: data.records })
        } else {
          //console.log("No lead source")
          this.setState({ leadsourceData: [] })
        }
      })
  }

  list_of_fuelType = () => {
    fetch(fuelTypelist, {
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
        //console.log("Fuel Type List ", data.records)
        if (data.records) {
          this.setState({ fuelTypeData: data.records })
        } else {
          //console.log("No Fuel Type")
          this.setState({ fuelTypeData: [] })
        }
      })
  }

  list_of_fuelName = () => {
    fetch(fuelNamelist, {
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
        //console.log("Fuel Name List ", data.records)
        if (data.records) {
          this.setState({ fuelNameData: data.records })
        } else {
          //console.log("No Fuel Name")
          this.setState({ fuelNameData: [] })
        }
      })
  }

  listSeries = () => {
    fetch(serieslist, {
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
        //console.log("Series Name List ", data.records)
        if (data.records) {
          this.setState({ seriesData: data.records })
        } else {
          //console.log("No Series Name")
          this.setState({ seriesData: [] })
        }
      })
  }

  listcallType = () => {
    fetch(callTypelist, {
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
        //console.log("call Type List ", data.records)
        if (data.records) {
          this.setState({ callTypeData: data.records })
        } else {
          //console.log("No call type Name")
          this.setState({ callTypeData: [] })
        }
      })
  }

  listmeetingType = () => {
    fetch(meetingTypeList, {
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
        //console.log("meeting Type List ", data.records)
        if (data.records) {
          this.setState({ meetingTypeData: data.records })
        } else {
          //console.log("No meeting type Name")
          this.setState({ meetingTypeData: [] })
        }
      })
  }

  listVisitType = () => {
    fetch(visitTypeList, {
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
        //console.log("visit Type List ", data.records)
        if (data.records) {
          this.setState({ visitTypeData: data.records })
        } else {
          //console.log("No visit type Name")
          this.setState({ visitTypeData: [] })
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
        //console.log("data", data)
      
        if (data.message == "Data available") {


          switch (tableName) {
            case 'oit':
              this.setState({oitData:data.records})
              //console.log('Oit Data', data.records);
              break;

              case 'overhauling':
              this.setState({overHaulingData:data.records})
              //console.log('OverHuling', data.records);
              break;
          
              case 'breakdown':
              this.setState({breakdownData:data.records})
              //console.log('breakdown', data.records);
              break;

              case 'productManufacturers':
              this.setState({productManufacturersData:data.records})
              //console.log('productManufacturers', data.records);
              break;

              case 'zone':
              this.setState({zoneData:data.records})
              //console.log('zone Data', data.records);
              break;

              case 'productType':
              console.log('i am inside productType');
              this.setState({productTypeData:data.records})

              console.log('productTypeData Data', data.records);
              break;

              case 'competitor':
              this.setState({competitorData:data.records})
              //console.log('competitor', data.records);
              break;
          
              
              case 'objectionRaised':
              this.setState({objectionRaisedData:data.records})
              //console.log('objectionRaised', data.records);
              break;

              case 'priceNegotiation':
              this.setState({priceNegotiationData:data.records})
              //console.log('priceNegotiation', data.records);
              break;

              case 'statusObjection':
              this.setState({statusObjectionData:data.records})
              //console.log('statusObjection', data.records);
              break;

              case 'compititorStatus':
              this.setState({cosData:data.records})
              //console.log('cosData', data.records);
              break;


              default:
              //console.log("No Matching Table Data")
              break;
          }

        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }


  handleSelectOiId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
      this.setState({oitId:e.target.value,
      deleteTableName:'oit'
      })
   
  }

  handleSelectBreakdown=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
      this.setState({breakDownId:e.target.value,
      deleteTableName:'breakdown'
      })
   
  }




  componentDidMount() {
    this.IndustryList()

    this.subIndustrylist()

    this.productServiceList()

    this.listVertical()

    this.assetTypeList()

    this.listGroup()

    this.listSubGroup()

    this.lead_s_list()

    this.list_of_fuelType()

    this.list_of_fuelName()

    this.listSeries()

    this.listVisitType()
    this.listmeetingType()
    this.listcallType()

    this.state.TableList.map(i=>{
      //console.log('i', i);
      
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


              case 'zone':
              this.lead_ContractList(i)

              break;

              case 'competitor':
              this.lead_ContractList(i)

              break;
          
              case 'productManufacturers':
              this.lead_ContractList(i)
              break;


              case 'objectionRaised':
              this.lead_ContractList(i)
              break;

              case 'priceNegotiation':
              this.lead_ContractList(i)
              break;

              case 'statusObjection':
              this.lead_ContractList(i)
              break;

              case 'productType':
              this.lead_ContractList(i)
              break;

              case 'compititorStatus':
              this.lead_ContractList(i)
              break;

        default:
        //console.log("No Matching Table Data")
          break;
      }
    })

    setTimeout(()=>{
      this.setState({isLoading:false})
    },5000)
  }

  addVertical = () => {
    if (!this.state.vname) {
      this.setState({
        msg: "Please Enter Name of Vertical"
      })
    } else {
      fetch(addVertical, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vertical: this.state.vname
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          ////console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Vertical Added") {
            this.setState({ msg: data.message })

            setTimeout(() => {
              this.listVertical()

              this.setState({ isOpenVeritcal: false, msg: "" })
            }, 1000)
          } else {
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleAddVertical = () => {
    this.setState({ isOpenVeritcal: true })
  }

  handleItype = e => {
    //console.log("id of industry is", e.target.value)
    this.setState({ iname: e.target.value })
  }

  handleIndustry = () => {
    this.setState({ isIndustry: true })
  }

  handleSubIndustry = () => {
    this.setState({ isSubIndustry: true })
  }

  handleProductService = () => {
    this.setState({ ProducrService: true })
  }

  handleIndustryName = e => {
    this.setState({ IndustryName: e.target.value })
  }

  handleSubIndustryName = e => {
    this.setState({ SubIndustryName: e.target.value })
  }

  handleProductServiceName = e => {
    this.setState({ ProducrServiceName: e.target.value })
  }

  handleIndustryType = () => {
    if (!this.state.IndustryName) {
      this.setState({ industrymsg: "Please Enter Industry Name" })
    } else {
      fetch(industryAdd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.IndustryName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Industry Added") {
            this.setState({ industrymsg: data.message })
            setTimeout(() => {
              this.IndustryList()
              this.setState({ isIndustry: false, industrymsg: "" })
            }, 1000)
          } else {
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  addProductservice = () => {
    if (!this.state.ProducrServiceName) {
      this.setState({ psmsg: "Please Enter Product/Service" })
    } else {
      fetch(addProductService, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.ProducrServiceName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          if (data.message == "Product / Services  Added") {
            this.setState({ psmsg: data.message })
            setTimeout(() => {
              this.productServiceList()
              this.setState({ ProducrService: false, psmsg: "" })
            }, 1000)
          } else {
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  handleDeleteIndustry = () => {
    fetch(industryDelete, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ind_id: this.state.iname
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        if (data.message == "Industry Deleted") {
          this.setState({ psmsg: data.message })
          setTimeout(() => {
            this.IndustryList()
            this.setState({ psmsg: "", open1: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  deletehandle = size1 => {
    this.setState({ size1, open1: true })
  }

  deletePS = size2 => {
    this.setState({ size2, open2: true })
  }

  deleteVerticalhandle = size3 => {
    this.setState({ size3, open3: true })
  }

  






  close = () =>
    this.setState({
      open: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
      open8: false,
      open9: false,
      open10: false,
      open11: false,
      open12: false,
      open13: false,
      open14: false,

    })


   

  handleClose = () => {
    this.setState({
      open: false,
      isIndustry: false,
      isSubIndustry: false,
      ProducrService: false,
      isOpenVeritcal: false,
      isOpenAsset: false,
      grpadd: false,
      subgrpadd: false,
      leadmodal: false,
      addfuelTypeModal: false,
      fuelNameModal: false,
      seriesModal: false,
      callTypeModal: false,
      visitTypeModal: false,
      meetingTypeModal: false,
      isOpenVisit:false
    })
  }

  handlePStype = e => {
    this.setState({ pstype: e.target.value })
  }

  deletePShandle = () => {
    fetch(deletePS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ps_id: this.state.pstype
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        if (data.message == "Industry Deleted") {
          this.setState({ industrymsg: data.message })
          setTimeout(() => {
            this.productServiceList()
            this.setState({ industrymsg: "", open2: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleSelectvertical = e => {
    this.setState({ Vertical: e.target.value, isHOD: true })
  }

  handleVerticalModal = () => {
    this.setState({ isOpenVeritcal: true })
  }

  handleVerticalName = e => {
    this.setState({ vname: e.target.value })
  }

  verticalDelete = () => {
    fetch(deleteVertical, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        v_id: this.state.Vertical
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        if (data.message == "Data available") {
          this.setState({ verticalMsg: data.message })
          setTimeout(() => {
            this.listVertical()
            this.setState({ verticalMsg: "", open3: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  assetTypeModal = () => {
    this.setState({ isOpenAsset: true })
  }

  handleAsset = e => {
    this.setState({ assetName: e.target.value, msg1: "" })
  }

  handleAddAssetType = () => {
    if (this.state.assetName.length < 0) {
      this.setState({ msg1: "Please Enter Asset Type Name", isopen: true })
    } else {
      fetch("http://35.161.99.113:9000/webapi/t_asset/t_typeAdd ", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: this.state.assetName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Type Added") {
            this.setState({ amsg: data.message })
            setTimeout(() => {
              this.assetTypeList()
              this.setState({ isOpenAsset: false })
            }, 1000)
          } else {
            this.setState({ amsg: "Something went wrong !!!!!!!" })
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  assetDelete = () => {
    fetch(deleteAssetType, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type_id: this.state.atype
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        if (data.message == "Type Deleted") {
          this.setState({ amsg: data.message })
          setTimeout(() => {
            this.assetTypeList()
            this.setState({ amsg: "", open4: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleSelectCallId = e => {
    let cid = e.target.value
    this.setState({ calltypeid: cid })
  }

  deleteAssetModal = size4 => {
    this.setState({ size4, open4: true })
  }

  handleAssets = e => {
    this.setState({ atype: e.target.value })
  }

  handleStype = e => {
    this.setState({ istype: e.target.value })
  }

  handleSubIndustry = () => {
    this.setState({ isSubIndustry: true })
  }

  handleSubIndustryName = e => {
    this.setState({ SubIndustryName: e.target.value })
  }

  handleSubIndustryType = () => {
    //console.log("industryId", this.state.industryId)

    if (!this.state.SubIndustryName) {
      this.setState({ subIndustrymsg: "Please Enter Industry Name" })
    } else {
      fetch(SubIndustryadd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.SubIndustryName,
          IndustryId: this.state.industryId
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Sub Industry Added") {
            this.setState({ subIndustrymsg: data.message })
            setTimeout(() => {
              this.subIndustrylist()
              this.setState({
                subIndustrymsg: "",
                SubIndustryName: "",
                isSubIndustry: false,
                disablesubind: true
              })
            }, 1000)
          } else {
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteSubindustryhandle = size5 => {
    this.setState({ size5, open5: true })
  }

  subIndustryDelete = () => {
    fetch(deleteSubInd, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ind_id: this.state.istype
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Sub Industry Deleted") {
          this.setState({ subIndustrymsg: data.message })
          setTimeout(() => {
            this.subIndustrylist()
            this.setState({
              subIndustrymsg: "",
              isSubIndustry: false,
              open5: false
            })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleItypeCheck = e => {
    let indid = e.target.value
    //console.log("indid", indid)
    this.setState({ industryId: indid, disablesubind: false })
  }

  handlegrpid = e => {
    let gid = e.target.value
    //console.log("gid", gid)
    this.setState({ grpid: gid, disablesubgrp: false })
  }

  handleGroupModule = e => {
    this.setState({ grpadd: true })
  }

  handleGroupName = e => {
    this.setState({ grpname: e.target.value, grpmsg: "" })
  }

  addGroup = () => {
    if (this.state.Vertical.length <= 0) {
      this.setState({ grpmsg: "Please Select Vertical" })
      return
    }
    if (!this.state.grpname) {
      this.setState({ grpmsg: "Please Enter Group Name" })
    } else {
      fetch(addGroup, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.grpname,
          vid: this.state.Vertical
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Group Added") {
            this.setState({ grpmsg: data.message })
            setTimeout(() => {
              this.listGroup()
              this.setState({ grpmsg: "", grpadd: false, grpname: "" })
            }, 1000)
          } else {
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteGroupModal = size6 => {
    this.setState({ size6, open6: true, disablesubgrp: false })
  }

  grpdelete = () => {
    fetch(deleteGroup, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grp_id: this.state.grpid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Group Deleted") {
          this.setState({ grpmsg: data.message })
          setTimeout(() => {
            this.listGroup()
            this.setState({ grpmsg: "", open6: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handlesubGroupModule = () => {
    this.setState({ subgrpadd: true })
  }

  handleSubgrpId = e => {
    let gid = e.target.value
    //console.log("gid", gid)
    this.setState({ subgrpid: e.target.value, disablesubgrp: false })
  }

  handleSubgrpName = e => {
    this.setState({ subgrpName: e.target.value })
  }

  subGroupadd = () => {
    if (!this.state.subgrpName) {
      this.setState({ subgrpmsg: "Please Enter Sub Group Name" })
    } else {
      fetch(addSubgrp, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.subgrpName,
          grpid: this.state.grpid
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Sub Group Added") {
            this.setState({ subgrpmsg: data.message })
            setTimeout(() => {
              this.listSubGroup()
              this.setState({
                subgrpmsg: "",
                subgrpName: "",
                subgrpadd: false,
                disablesubgrp: true
              })
            }, 1000)
          } else {
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deletesubGroupModal = size7 => {
    this.setState({ size7, open7: true })
  }

  subGrpdelete = () => {
    fetch(deletSubGrp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sgrp_id: this.state.subgrpid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Sub Group Deleted") {
          this.setState({ subgrpmsg: data.message })
          setTimeout(() => {
            this.listSubGroup()
            this.setState({ subgrpmsg: "", open7: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleSelectLead = e => {
    let lid = e.target.value
    this.setState({ leadid: lid })
  }

  addLeadModal = () => {
    this.setState({ leadmodal: true })
  }

  handleLeadSourceName = e => {
    this.setState({ leadsourcename: e.target.value })
  }

  addleadSourceData = () => {
    if (!this.state.leadsourcename) {
      this.setState({ msg: "Please Enter lead source Name" })
    } else {
      fetch(addleadSource, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.leadsourcename
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "source Added") {
            this.setState({ lsmsg: data.message })
            setTimeout(() => {
              this.lead_s_list()
              this.setState({ leadmodal: false, lsmsg: "", leadsourcename: "" })
            }, 1000)
          } else {
            this.setState({ lsmsg: "Something went wrong !!!!!!!" })
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteLeadModal = size8 => {
    this.setState({ size8, open8: true })
  }

  deletelead = () => {
    fetch(deleteleadSource, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_id: this.state.leadid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Source Deleted") {
          this.setState({ lsmsg: data.message })
          setTimeout(() => {
            this.lead_s_list()
            this.setState({ lsmsg: "", open8: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleSelectFuelType = e => {
    let ft = e.target.value
    //console.log("ft", ft)

    this.setState({ ftid: ft })
  }

  addFuelTypeModal = () => {
    this.setState({ addfuelTypeModal: true })
  }

  handleaddVertical = e => {
    this.setState({ vname: e.target.value })
  }

  handleFuelTypeName = e => {
    this.setState({ ftype: e.target.value, ftmsg: "" })
  }

  addFuelTypehandle = () => {
    if (!this.state.ftype) {
      this.setState({ ftmsg: "Please Enter Fuel type Name" })
    } else {
      fetch(fuelTypeadd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.ftype
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Fuel Type Added") {
            this.setState({ ftmsg: data.message })
            setTimeout(() => {
              this.list_of_fuelType()
              this.setState({ addfuelTypeModal: false, ftmsg: "", ftype: "" })
            }, 1000)
          } else {
            this.setState({ lsmsg: "Something went wrong !!!!!!!" })
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteFuelModal = size9 => {
    this.setState({ size9, open9: true })
  }

  deleteFuelType = () => {
    fetch(fuelTypedelete, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fueltypeid: this.state.ftid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Fuel Type Deleted") {
          this.setState({ ftmsg: data.message })
          setTimeout(() => {
            this.list_of_fuelType()
            this.setState({ ftmsg: "", open9: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  addFuelNameModal = () => {
    this.setState({ fuelNameModal: true })
  }

  handlefuelName = e => {
    this.setState({ fuel_name: e.target.value })
  }

  addFuelName = () => {
    if (!this.state.fuel_name) {
      this.setState({ fnmsg: "Please Enter Fuel type Name" })
    } else {
      fetch(fuelNameAdd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.fuel_name
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Fuel Name Added") {
            this.setState({ ftmsg: data.message })
            setTimeout(() => {
              this.list_of_fuelName()
              this.setState({ fuelNameModal: false, fnmsg: "", fuel_name: "" })
            }, 1000)
          } else {
            this.setState({ lsmsg: "Something went wrong !!!!!!!" })
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteFuelNameModal = size10 => {
    this.setState({ size10, open10: true })
  }

  handleSelectFuelName = e => {
    this.setState({ fuelNameId: e.target.value })
  }

  deletFuelName = () => {
    fetch(deletefuelName, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fuelNameID: this.state.fuelNameId
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Fuel Name Deleted") {
          this.setState({ fnmsg: data.message })
          setTimeout(() => {
            this.list_of_fuelName()
            this.setState({ fnmsg: "", open10: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleSeriesModal = () => {
    this.setState({ seriesModal: true })
  }

  handleSeriesName = e => {
    this.setState({ series_name: e.target.value })
  }

  addSeries = () => {
    if (!this.state.series_name) {
      this.setState({ smsg: "Please Enter Series Name" })
    } else {
      fetch(seriesadd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.series_name
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Series Name Added") {
            this.setState({ smsg: data.message })
            setTimeout(() => {
              this.listSeries()
              this.setState({ seriesModal: false, smsg: "", series_name: "" })
            }, 1000)
          } else {
            this.setState({ smsg: "Something went wrong !!!!!!!" })
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteSeriesModal = size11 => {
    this.setState({ size11, open11: true })
  }

  seriesDelete = () => {
    fetch(seiesdelete, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        SeriesId: this.state.seriesId
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Series Name Deleted") {
          this.setState({ smsg: data.message })
          setTimeout(() => {
            this.listSeries()
            this.setState({ smsg: "", open11: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleSelectSeriesId = e => {
    this.setState({ seriesId: e.target.value })
  }

  handleCallModal = () => {
    this.setState({ callTypeModal: true })
  }
  handleCallTypeName = e => {
    this.setState({ callTypeName: e.target.value })
  }

  addCallType = () => {
    if (!this.state.callTypeName) {
      this.setState({ smsg: "Please Enter call Type Name" })
    } else {
      fetch(addcallType, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.callTypeName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Call Type Added") {
            this.setState({ cmsg: data.message })
            setTimeout(() => {
              this.listcallType()
              this.setState({
                callTypeModal: false,
                cmsg: "",
                callTypeName: ""
              })
            }, 1000)
          } else {
            this.setState({ cmsg: "Something went wrong !!!!!!!" })
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteCallModal = size12 => {
    this.setState({ size12, open12: true })
  }

  deletecallType = () => {
    fetch(deleteCallType, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        callid: this.state.calltypeid
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Call Type Deleted") {
          this.setState({ cdmsg: data.message })
          setTimeout(() => {
            this.listcallType()
            this.setState({ cdmsg: "", open12: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleVisitModal = () => {
    this.setState({ visitTypeModal: true })
  }

  handleVisiTypeId = e => {
    let vid = e.target.value
    this.setState({ vsittypeId: vid })
  }

  deleteVisitModal = size13 => {
    this.setState({ size13, open13: true })
  }

  deleteVisitTypeModal = () => {
    fetch(deleteVisitType, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vid: this.state.vsittypeId
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Visit Type Deleted") {
          this.setState({ vmsg: data.message })
          setTimeout(() => {
            this.listVisitType()
            this.setState({ vmsg: "", open13: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  //meeting type

  handleMeetingModal = () => {
    this.setState({ meetingTypeModal: true })
  }

  handleSelectMeetingId = e => {
    let mid = e.target.value
    this.setState({ meetingtypeId: mid })
  }
  handleMeetingTypeName = e => {
    this.setState({ meetingTypeName: e.target.value })
  }

  addMeetingType = () => {
    if (!this.state.meetingTypeName) {
      this.setState({ smsg: "Please Enter Meeting Type" })
    } else {
      fetch(addMeetingType, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.meetingTypeName
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("data", data)
          //console.log("data", data.records)

          if (data.message == "Meeting Type Added") {
            this.setState({ mtmsg: data.message })
            setTimeout(() => {
              this.listmeetingType()
              this.setState({
                meetingTypeModal: false,
                mtmsg: "",
                meetingTypeName: ""
              })
            }, 1000)
          } else {
            this.setState({ mtmsg: "Something went wrong !!!!!!!" })
            //console.log("Something went wrong !!!!!!!")
          }
        })
    }
  }

  deleteMeetingModal = size14 => {
    this.setState({ size14, open14: true })
  }

  deleteMeetingTypeModal = () => {
    fetch(deleteMeeting, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mid: this.state.meetingtypeId
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Meeting Type Deleted") {
          this.setState({ mtmsg: data.message })
          setTimeout(() => {
            this.listmeetingType()
            this.setState({ mtmsg: "", open14: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }



  lead_Contractadd = (name,tableName) =>{
    //console.log('tableName', tableName);
    //console.log('name', name);
    fetch(addLead_Contract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name :name,
        tablename:tableName      
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        if (data.message == "item added") {
          this.setState({ psmsg: data.message })
          setTimeout(() => {
            this.IndustryList()
            this.setState({ psmsg: "", open1: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  lead_ContractDelete=()=>{
    fetch(deleteLead_Contract, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id :"",
        tablename :""    
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        if (data.message == "Item added") {
          this.setState({ psmsg: data.message })
          setTimeout(() => {
            this.setState({ psmsg: "", open1: false })
          }, 1000)
        } else {
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }

  handleGenricModal=()=>{
    this.setState({isopenGenricModal:true,label:'Enter OIT',placeholderText:'Enter OIT',tableName:'oit',})
  }


  handleGenricBreakDownModal=()=>{
    this.setState({isopenGenricBreakdownModal:true,label:'Enter BreakDown',tableName:'breakdown'})

  }



  handleGenricClose=()=>{
    this.setState({
      isopenGenricModal:false,
      isopenGenricBreakdownModal:false,
      isopenOverhulingModal:false,
      isopenCompModal:false,
      PM:false,
      zmodal:false,
      productTypemodal:false,
      compStatus:false
    })
  }

  handleNameOf=e=>{
    this.setState({name:e.target.value})
  }

  genericDeleteModal=()=>{
    this.setState({genDelete:true})
   }

   genericDeleteModalClose=()=>{
    this.setState({genDelete:false})
   }

   genricBreakDownDelte=()=>{
    this.setState({genBreakDownDelete:!this.state.genBreakDownDelete})

   }


   handleSelectOverHulingId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
      this.setState({overhulingId:e.target.value,
      deleteTableName:'overhauling'
      })
   }

   handleOverhulingModal=()=>{
    this.setState({isopenOverhulingModal:true,label:'Enter OverHuling',tableName:'overhauling'})

   }

   deleteOverhulingModal=()=>{
    this.setState({genOverhulingDelete:!this.state.genOverhulingDelete})

   }


   handleSelectCompititorId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
      this.setState({compititorId:e.target.value,
      deleteTableName:'competitor'
      })
   }

   handleCompModal=()=>{
    this.setState({isopenCompModal:true,label:'Enter competitor',tableName:'competitor'})

   }

   deleteCompModal=()=>{
    this.setState({genCompDelete:!this.state.genCompDelete})

   }


   handleSelectstatusObjectiongId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
     this.setState({
      statusObjection:e.target.value,
      deleteTableName:'statusObjection'
     })
   }

   handlestatusObjectionModal=()=>{
    this.setState({s_objectionModal:true,label:'Enter Status Objection',tableName:'statusObjection'})

   }

   deletestatusObjectionModal=()=>{
    this.setState({s_objectioDelete:!this.state.s_objectioDelete})
   }


   handleSelecprice_NegotitationgId=e=>{

    let value = parseInt(e.target.value)
    //console.log('value', value);
     this.setState({
      price_Negotitation:e.target.value,
      deleteTableName:'priceNegotiation'
     })
   }


   handlep_NModal=()=>{
    this.setState({p_NegotitationModal:true,label:'Enter Price Negotiation',tableName:'priceNegotiation'})
   }

   deletep_NModal=()=>{
    this.setState({p_NegotitationDelete:!this.state.p_NegotitationDelete})
   }
   

   handleSelectCORId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
     this.setState({
      cor:e.target.value,
      deleteTableName:'objectionRaised'
     })
   }


   handleCORModal=()=>{
    this.setState({CORModal:true,label:'Enter Customer Objection Raised',tableName:'objectionRaised'})
   }

   deleteCORModal=()=>{
    this.setState({CORDelete:!this.state.CORDelete})
   }


   
   handleSelectPMId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
     this.setState({
      pmid:e.target.value,
      deleteTableName:'productManufacturers'
     })
   }

   handlePMModal=()=>{
    this.setState({PM:true,label:'Enter Product Manufacture',tableName:'productManufacturers'})
   }

   deletePMModal=()=>{
 this.setState({PMDelete:!this.state.PMDelete})
   }


   handleSelectZoneId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
     this.setState({
      zid:e.target.value,
      deleteTableName:'zone'
     })
   }

   handeleZoneModal=()=>{
    this.setState({zmodal:true,label:'Enter Zone',tableName:'zone'})
   }

   deleteZonemodal=()=>{
    this.setState({zmodalDelete:!this.state.zmodalDelete})

   }


   
   handleSelectProductTypeId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
     this.setState({
      productTypeid:e.target.value,
      deleteTableName:'productType'
     })
   }


   
   handleProductTypeModal=()=>{
    this.setState({productTypemodal:true,label:'Enter Product Type',tableName:'productType'})
   }

   
   deleteProductTypemodal=  ()=>{
    this.setState({productTypeModalDelete:!this.state.productTypeModalDelete})

   }


   handleSelectCOSId=e=>{
    let value = parseInt(e.target.value)
    //console.log('value', value);
     this.setState({
      cosid:e.target.value,
      deleteTableName:'compititorStatus'
     })
   }

   handleCompStausModal=()=>{
    this.setState({compStatus:true,label:'Enter Competitor Status',tableName:'compititorStatus'})
   }


   deleteCOSModal=()=>{
    this.setState({compStatusDelete:!this.state.compStatusDelete})
   }

   handleVisitName=e=>{
     this.setState({visitName:e.target.value})
   }


addVisit=()=>{
  if (!this.state.visitName) {
    this.setState({ smsg: "Please Enter visit type" })
  } else {
    fetch(addvisitTypeadd, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.visitName
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("data", data)
        //console.log("data", data.records)

        if (data.message == "Visit Type Added") {
          this.setState({ vtmsg: data.message })
          setTimeout(() => {
            this.listVisitType()
            this.setState({
              visitTypeModal: false,
              vtmsg: "",
              visitName: ""
            })
          }, 1000)
        } else {
          this.setState({ mtmsg: "Something went wrong !!!!!!!" })
          //console.log("Something went wrong !!!!!!!")
        }
      })
  }
}

  render() {
    const {
      industryData,
      iname,
      isIndustry,
      IndustryName,
      isSubIndustry,
      SubIndustryName,
      ProducrService,
      ProducrServiceName,
      open1,
      size1,
      psData,
      size2,
      open2,
      isOpenVeritcal,
      vname,
      Vertical,
      verticalData,
      size3,
      open3,
      AssetData,
      atype,
      isOpenAsset,
      assetName,
      size4,
      open4,
      subindustryData,
      istype,
      size5,
      open5,
      industryId,
      disablesubind,
      groupData,
      grpadd,
      grpname,
      size6,
      subGroupData,
      subgrpName,
      disablesubgrp,
      subgrpadd,
      size7,
      leadsourceData,
      leadid,
      leadsourcename,
      size8,
      open8,
      fuelTypeData,
      ftid,
      size9,
      open9,
      fuelNameData,
      fuelNameId,
      size10,
      size11,
      open11,
      seriesData,
      seriesId,
      callTypeData,
      visitTypeData,
      meetingTypeData,
      calltypeid,
      size12,
      visitTypeid,
      meetingTypeid,
      size13,
      size14,
      isopenGenricModal,
      isLoading
    } = this.state

   
    return (
      <div>
        <Dimmer active={isLoading}>
      <Loader />
    </Dimmer>
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
                  <HeadingText>Setting</HeadingText>
                </HeadingDiv>
              </div>
              <Scrollbars style={{ display: "flex", flex: 1, height: 500 }}>
                <ContentArea style={{ justifyContent: "center" }}>
                  <TableDiv>
                    <div>
                      <Table celled style={table_structure} style={{ fontSize: "16px" }}>     {/*Aishwarya 18/5/19*/}
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>List</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Vertical" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19
                                value={Vertical}
                                onChange={this.handleSelectvertical}
                              >
                                <option value="" disabled selected hidden>
                                  Select Vertical
                                </option>
                                {verticalData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.vertical}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleVerticalModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() =>
                                  this.deleteVerticalhandle("tiny")
                                }
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Asset Type" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={atype}
                                onChange={this.handleAssets}
                                required
                              >
                                <option value="" disabled selected hidden>
                                  Select Asset
                                </option>
                                {AssetData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.type}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.assetTypeModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteAssetModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Type Of Industry :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={iname} onChange={this.handleItype}>
                                <option value="" disabled selected hidden>
                                  type of industry
                                </option>

                                {industryData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleIndustry}
                                style={btnColor}
                              >
                                Add
                              </Button>
                              <Button
                                onClick={() => this.deletehandle("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Sub Industry :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={istype}
                                onChange={this.handleStype}
                              >
                                <option value="">
                                  Select Sub Type of Industry
                                </option>
                                {subindustryData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleSubIndustry}
                                style={btnColor}
                              >
                                Add
                              </Button>
                              <Button
                                onClick={() =>
                                  this.deleteSubindustryhandle("tiny")
                                }
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Product/Service :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.pstype}
                                onChange={this.handlePStype}
                              >
                                <option value="" disabled selected hidden>
                                  Select Product/Service
                                </option>
                                {psData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleProductService}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deletePS("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Group :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.grpid}
                                onChange={this.handlegrpid}
                              >
                                <option value="" disabled selected hidden>
                                  Select Group
                                </option>
                                {groupData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleGroupModule}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteGroupModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Sub Group :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.subgrpid}
                                onChange={this.handleSubgrpId}
                              >
                                <option value="" disabled selected hidden>
                                  Select Sub Group
                                </option>
                                {subGroupData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handlesubGroupModule}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deletesubGroupModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Lead Source :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={leadid}
                                onChange={this.handleSelectLead}
                              >
                                <option value="" disabled selected hidden>
                                  Select lead Source
                                </option>
                                {leadsourceData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.addLeadModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteLeadModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Fuel Type :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={ftid}
                                onChange={this.handleSelectFuelType}
                              >
                                <option value="" disabled selected hidden>
                                  Select Fuel Type
                                </option>
                                {fuelTypeData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.addFuelTypeModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteFuelModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Fuel Name :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={fuelNameId}
                                onChange={this.handleSelectFuelName}
                              >
                                <option value="" disabled selected hidden>
                                  Select Fuel Name
                                </option>
                                {fuelNameData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.addFuelNameModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteFuelNameModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Series :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={seriesId}
                                onChange={this.handleSelectSeriesId}
                              >
                                <option value="" disabled selected hidden>
                                  Select Series Name
                                </option>
                                {seriesData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleSeriesModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteSeriesModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Type Of Call :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={calltypeid}
                                onChange={this.handleSelectCallId}
                              >
                                <option value="" disabled selected hidden>
                                  Type Of Call
                                </option>
                                {callTypeData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleGenricModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteCallModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Type Of Visit :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={visitTypeid}
                                onChange={this.handleVisiTypeId}
                              >
                                <option value="" disabled selected hidden>
                                  Type Of Visit
                                </option>
                                {visitTypeData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleVisitModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteVisitModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Type Of Meeting :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={meetingTypeid}
                                onChange={this.handleSelectMeetingId}
                              >
                                <option value="" disabled selected hidden>
                                  Type Of Meeting
                                </option>
                                {meetingTypeData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleMeetingModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteMeetingModal("tiny")}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>



                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="OIT(Once In Two Month) :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.oitId}
                                onChange={this.handleSelectOiId}
                              >
                                <option value="" disabled selected hidden>
                                  Select OIT
                                </option>
                                {this.state.oitData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={()=>this.handleGenricModal()}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.genericDeleteModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>


                    <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="BreakDown :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.breakDownId}
                                onChange={this.handleSelectBreakdown}
                              >
                                <option value="" disabled selected hidden>
                                  Type Of BreakDown
                                </option>
                                {this.state.breakdownData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleGenricBreakDownModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.genricBreakDownDelte()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>


                           <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Overhuling (O/H) :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.overhulingId}
                                onChange={this.handleSelectOverHulingId}
                              >
                                <option value="" disabled selected hidden>
                                  Type Of Overhauling
                                </option>
                                {this.state.overHaulingData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleOverhulingModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteOverhulingModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>


                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Competitior :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19
                                value={this.state.compititorId}
                                onChange={this.handleSelectCompititorId}
                              >
                                <option value="" disabled selected hidden>
                               Select  Competitior Data
                                </option>
                                {this.state.competitorData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handleCompModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteCompModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>




                        <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="status Objection :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.statusObjection}
                                onChange={this.handleSelectstatusObjectiongId}
                              >
                                <option value="" disabled selected hidden>
                               Select status Objection
                                </option>
                                {this.state.statusObjectionData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={this.handlestatusObjectionModal}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deletestatusObjectionModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>




                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Price Negotiation :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.price_Negotitation}
                                onChange={this.handleSelecprice_NegotitationgId}
                              >
                                <option value="" disabled selected hidden>
                               Select price Negotiation
                                </option>
                                {this.state.priceNegotiationData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={()=>this.handlep_NModal()}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deletep_NModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>



 <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Customer Objection Raised :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.cor}
                                onChange={this.handleSelectCORId}
                              >
                                <option value="" disabled selected hidden>
                               Select Customer Objection RaisedData
                                </option>
                                {this.state.objectionRaisedData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={()=>this.handleCORModal()}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteCORModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>



 <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Product Manufacture:" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.pmid}
                                onChange={this.handleSelectPMId}
                              >
                                <option value="" disabled selected hidden>
                               Select Product Manufacture:
                                </option>
                                {this.state.productManufacturersData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={()=>this.handlePMModal()}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deletePMModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>


                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label=" Zone" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.zid}
                                onChange={this.handleSelectZoneId}
                              >
                                <option value="" disabled selected hidden>
                                Select Zone
                                </option>
                                {this.state.zoneData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={()=>this.handeleZoneModal()}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteZonemodal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>




 <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Competitor status :" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.cosid}
                                onChange={this.handleSelectCOSId}
                              >
                                <option value="" disabled selected hidden>
                               Select Competitor status
                                </option>
                                {this.state.cosData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={()=>this.handleCompStausModal()}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteCOSModal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>




                      

                          <Table.Row>
                            <Table.Cell className="table_border">
                              <Form.Field label="Product Type" required />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <select
                                style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                                value={this.state.productTypeid}
                                onChange={this.handleSelectProductTypeId}
                              >
                                <option value="" disabled selected hidden>
                               Select Product Type
                                </option>
                                {this.state.productTypeData.map(i => (
                                  <option value={i.id} key={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Table.Cell>
                            <Table.Cell className="table_border">
                              <Button
                                onClick={()=>this.handleProductTypeModal()}
                                style={btnColor}
                              >
                                Add
                              </Button>

                              <Button
                                onClick={() => this.deleteProductTypemodal()}
                                style={btnColor}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>




                        </Table.Body>
                      </Table>
                    </div>
                  </TableDiv>
                </ContentArea>
              </Scrollbars>
            </PageContainer>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Modal
          open={isOpenVeritcal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Vertical</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Vertical"
                  placeholder="Enter Vertical Name"
                  value={vname}
                  onChange={this.handleVerticalName}
                  required
                />
                <font color="red">{this.state.msg}</font>                    {/*Aishwarya  18/5/19*/}
              </Form.Group>
              {/*<font color="red">{this.state.msg}</font>*/}             {/*Aishwarya  18/5/19*/}
              <br />
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addVertical()}
              >
                Add Vertical
              </Button>
            </Form>
          </Modal.Content>
        </Modal>


        <Modal
          open={this.state.visitTypeModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Visit</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add visit"
                  placeholder="Enter Visit Type"
                  value={this.state.visitName}
                  onChange={this.handleVisitName}
                  required
                />
                <font color="red">{this.state.vtmsg}</font>                    {/*Aishwarya  18/5/19  */}
              </Form.Group>
              {/* <font color="red">{this.state.vtmsg}</font>*/}             {/*Aishwarya  18/5/19*/}

              <br />
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addVisit()}
              >
                Add visit
              </Button>
            </Form>
          </Modal.Content>
        </Modal>



        <Modal
          open={isIndustry}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Industry</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Industry "
                  placeholder="Enter Industry "
                  value={IndustryName}
                  onChange={this.handleIndustryName}
                  required
                />
                <font color="red">{this.state.industrymsg}</font>                 {/*Aishwarya  18/5/19*/}
              </Form.Group>
            </Form>
            { /* <p>
              <font color="red">{this.state.industrymsg}</font>               
          </p>*/}                              {/*Aishwarya  18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleIndustryType()}
            >
              Add Industry Type
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={isSubIndustry}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Sub Industry</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Field label="Select Industry" required />
                <br />
                <select
                  style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                  value={industryId} onChange={this.handleItypeCheck}>
                  <option value="" disabled selected hidden>
                    type of industry
                  </option>

                  {industryData.map(i => (
                    <option value={i.id} key={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
                <br />
              </Form.Group>

              <Form.Group widths={1}>
                <Form.Input
                  label="Add Sub Industry "
                  placeholder="Enter  Sub Industry "
                  value={SubIndustryName}
                  onChange={this.handleSubIndustryName}
                  required
                  disabled={disablesubind}
                />
                <font color="red">{this.state.subIndustrymsg}</font>          {/*Aishwarya 18/5/19*/}
              </Form.Group>
            </Form>
            {/*<p>
              <font color="red">{this.state.subIndustrymsg}</font>
            </p>*/}                       {/*Aishwarya 18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubIndustryType()}
              disabled={disablesubind}
            >
              Add Sub Industry Type
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={ProducrService}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Product/Service</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Product/Service "
                  placeholder="Enter Product/Service Name "
                  value={ProducrServiceName}
                  onChange={this.handleProductServiceName}
                  required
                />
                <font color="red">{this.state.psmsg}</font>                                     {/*Aishwarya 18/5/19*/}
              </Form.Group>
            </Form>
            {/* <p>
              <font color="red">{this.state.psmsg}</font>
            </p>*/ }                     {/*Aishwarya 18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addProductservice()}
            >
              Add Product/Service
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={isOpenAsset}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Asset Type</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Asset Type"
                  placeholder="Enter Asset Type"
                  value={assetName}
                  onChange={this.handleAsset}
                  required
                />
                <font color="red">{this.state.amsg}</font>              {/*Aishwarya  18/5/19 error*/}
              </Form.Group>

            </Form>
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleAddAssetType()}
            >
              Add Asset Type
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={grpadd}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Group</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Field label="Select Vertical" required />
                <br />
                <select
                  style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                  value={Vertical} onChange={this.handleSelectvertical}>
                  <option value="" disabled selected hidden>
                    Select Vertical
                  </option>
                  {verticalData.map(i => (
                    <option value={i.id} key={i.id}>
                      {i.vertical}
                    </option>
                  ))}
                </select>
                <br />
              </Form.Group>

              <Form.Group widths={1}>
                <Form.Input
                  label="Add Group"
                  placeholder="Enter Group Name"
                  value={grpname}
                  onChange={this.handleGroupName}
                  required
                />
                <font color="red">{this.state.grpmsg}</font>                   {/*Aishwarya  18/5/19*/}
              </Form.Group>
              {/* <font color="red">{this.state.grpmsg}</font>*/}               {/*Aishwarya  18/5/19*/}
              <br />
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addGroup()}
              >
                Add Group
              </Button>
            </Form>
          </Modal.Content>
        </Modal>

        <Modal
          open={subgrpadd}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Sub Group</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Field label="Select Group" required />
                <br />
                <select
                  style={{ width: "290px", fontSize: "15px", height: "40px" }}          //Aishwarya 18/5/19  
                  value={this.state.grpid} onChange={this.handlegrpid}>
                  <option value="" disabled selected hidden>
                    Group
                  </option>

                  {groupData.map(i => (
                    <option value={i.id} key={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
                <br />
              </Form.Group>

              <Form.Group widths={1}>
                <Form.Input
                  label="Add Sub Group "
                  placeholder="Enter Sub Group Name "
                  value={subgrpName}
                  onChange={this.handleSubgrpName}
                  required
                  disabled={disablesubgrp}
                />
                <font color="red">{this.state.subgrpmsg}</font>                   {/*Aishwarya  18/5/19*/}
              </Form.Group>
            </Form>
            {/* <p>
              <font color="red">{this.state.subgrpmsg}</font>
           </p>*/}                        {/*Aishwarya  18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.subGroupadd()}
              disabled={disablesubgrp}
            >
              Add Sub Group
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={this.state.addfuelTypeModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Fuel Type</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Fuel Type "
                  placeholder="Enter Fuel type"
                  value={this.state.ftype}
                  onChange={this.handleFuelTypeName}
                  required
                />
                <font color="red">{this.state.ftmsg}</font>                            {/*Aishwarya  18/5/19*/}
              </Form.Group>
            </Form>
            {/* <p>
              <font color="red">{this.state.ftmsg}</font>
            </p>*/}                          {/*Aishwarya  18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addFuelTypehandle()}
            >
              Add Fuel Type
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={this.state.fuelNameModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Fuel Name</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Fuel Name "
                  placeholder="Enter Fuel Name"
                  value={this.state.fuel_name}
                  onChange={this.handlefuelName}
                  required
                />
                <font color="red">{this.state.fnmsg}</font>               {/*Aishwarya  18/5/19*/}
              </Form.Group>
            </Form>
            {/*  <p>
              <font color="red">{this.state.fnmsg}</font>
          </p>*/}                                   {/*Aishwarya  18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addFuelName()}
            >
              Add Fuel Name
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={this.state.seriesModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Series Name</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Series Name "
                  placeholder="Enter Series Name"
                  value={this.state.series_name}
                  onChange={this.handleSeriesName}
                  required
                />
                <font color="red">{this.state.smsg}</font>                        {/*Aishwarya  18/5/19*/}
              </Form.Group>
            </Form>
            { /*<p>
              <font color="red">{this.state.smsg}</font>
            </p>*/}                                  {/*Aishwarya  18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addSeries()}
            >
              Add Series
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={this.state.meetingTypeModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Meeting Type</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Meeting Type "
                  placeholder="Enter Meeting Name"
                  value={this.state.meetingTypeName}
                  onChange={this.handleMeetingTypeName}
                  required
                />
                <font color="red">{this.state.mtmsg}</font>                              {/*Aishwarya  18/5/19*/}
              </Form.Group>
            </Form>
            {/*  <p>
              <font color="red">{this.state.mtmsg}</font>
            </p>*/}                                    {/*Aishwarya  18/5/19*/}
            <Button
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.addMeetingType()}
            >
              Add Meeting
            </Button>
          </Modal.Content>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size1}
          open={open1}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.handleDeleteIndustry()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size2}
          open={open2}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.deletePShandle()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size3}
          open={open3}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.verticalDelete()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size4}
          open={open4}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.assetDelete()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          open={this.state.leadmodal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Lead Source</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Lead Source "
                  placeholder="Enter Lead Name "
                  value={leadsourcename}
                  onChange={this.handleLeadSourceName}
                  required
                />
                <font color="red">{this.state.lsmsg}</font>                   {/*Aishwarya  18/5/19*/}
              </Form.Group>
              {/*<p>
                <font color="red">{this.state.lsmsg}</font>
              </p>*/}                                 {/*Aishwarya  18/5/19*/}
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addleadSourceData()}
              >
                Add Lead Source
              </Button>
            </Form>
          </Modal.Content>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size5}
          open={open5}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.subIndustryDelete()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          open={this.state.callTypeModal}
          onClose={this.handleClose}
          className="alertOfFileds"
          closeIcon
        >
          <Modal.Header>
            <p>Add Call Type</p>
          </Modal.Header>
          <Modal.Content>
            <Form style={{ fontSize: "16px" }}>                   {/*Aishwarya  18/5/19*/}
              <Form.Group widths={1}>
                <Form.Input
                  label="Add Call Type "
                  placeholder="Enter Call Type "
                  value={this.state.callTypeName}
                  onChange={this.handleCallTypeName}
                  required
                />
                <font color="red">{this.state.cmsg}</font>                         {/*Aishwarya  18/5/19*/}
              </Form.Group>
              {/*<p>
                <font color="red">{this.state.cmsg}</font>
              </p>*/ }                               {/*Aishwarya  18/5/19*/}
              <Button
                style={{ backgroundColor: "#863577", color: "#ffffff" }}
                onClick={() => this.addCallType()}
              >
                Add Call Type
              </Button>
            </Form>
          </Modal.Content>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size6}
          open={this.state.open6}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.grpdelete()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size7}
          open={this.state.open7}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.subGrpdelete()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size8}
          open={this.state.open8}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.deletelead()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size9}
          open={this.state.open9}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.deleteFuelType()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size10}
          open={this.state.open10}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.deletFuelName()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size11}
          open={this.state.open11}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.seriesDelete()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size12}
          open={this.state.open12}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.deletecallType()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size13}
          open={this.state.open13}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.deleteVisitTypeModal()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>

        <Modal
          className="alertOfFileds"
          size={size14}
          open={this.state.open14}
          onClose={() => this.close()}
          closeIcon
        >
          <Modal.Content>
            <TextColor>Do you want to delete this item</TextColor>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.close()}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={() => this.deleteMeetingTypeModal()}
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>






         {isopenGenricModal == true ?(
            <GenricModal isopen={this.state.isopenGenricModal} verticalData={this.state.verticalData} onedit={this.handleNameOf} label={this.state.label} placeholderText={this.state.placeholderText}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}

          {this.state.genDelete == true ?(
            <GenrericDelete isopen={this.state.genDelete} id={this.state.oitId}  tableName={this.state.deleteTableName}  onClose={this.genericDeleteModalClose}/>
          ):(
            <div>
            </div>
          )}

         

         {this.state.isopenGenricBreakdownModal == true ?(
            <GenricModal isopen={this.state.isopenGenricBreakdownModal} verticalData={this.state.verticalData} label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.genBreakDownDelete == true ?(
           <GenrericDelete isopen={this.state.genBreakDownDelete} id={this.state.breakDownId}  tableName={this.state.deleteTableName}  onClose={this.genricBreakDownDelte}/>

         ):(
          <div>
          </div>
         )}





          {this.state.isopenOverhulingModal == true ?(
            <GenricModal isopen={this.state.isopenOverhulingModal} verticalData={this.state.verticalData}   label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.genOverhulingDelete == true ?(
           <GenrericDelete isopen={this.state.genOverhulingDelete} id={this.state.overhulingId}  tableName={this.state.deleteTableName}  onClose={this.deleteOverhulingModal}/>

         ):(
          <div>
          </div>
         )}


         
         {this.state.isopenCompModal == true ?(
            <GenricModal isopen={this.state.isopenCompModal}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.genCompDelete == true ?(
           <GenrericDelete isopen={this.state.genCompDelete} id={this.state.compititorId}  tableName={this.state.deleteTableName}  onClose={this.deleteCompModal}/>
         ):(
          <div>
          </div>
         )}



          {this.state.s_objectionModal == true ?(
            <GenricModal isopen={this.state.s_objectionModal}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.s_objectioDelete == true ?(
           <GenrericDelete isopen={this.state.genCompDelete} id={this.state.compititorId}  tableName={this.state.deleteTableName}  onClose={this.deleteCompModal}/>
         ):(
          <div>
          </div>
         )}



          {this.state.p_NegotitationModal == true ?(
            <GenricModal isopen={this.state.p_NegotitationModal}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.p_NegotitationDelete == true ?(
           <GenrericDelete isopen={this.state.p_NegotitationDelete} id={this.state.price_Negotitation}  tableName={this.state.deleteTableName}  onClose={this.deletep_NModal}/>
         ):(
          <div>
          </div>
         )}


             {this.state.CORModal == true ?(
            <GenricModal isopen={this.state.CORModal}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.CORDelete == true ?(
           <GenrericDelete isopen={this.state.CORDelete} id={this.state.cor}  tableName={this.state.deleteTableName}  onClose={this.deleteCORModal}/>
         ):(
          <div>
          </div>
         )}


         {this.state.PM == true ?(
            <GenricModal isopen={this.state.PM}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.PMDelete == true ?(
           <GenrericDelete isopen={this.state.PMDelete} id={this.state.pmid}  tableName={this.state.deleteTableName}  onClose={this.deletePMModal}/>
         ):(
          <div>
          </div>
         )}


          {this.state.zmodal == true ?(
            <GenricModal isopen={this.state.zmodal}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.zmodalDelete == true ?(
           <GenrericDelete isopen={this.state.zmodalDelete} id={this.state.zid}  tableName={this.state.deleteTableName}  onClose={this.deleteZonemodal}/>
         ):(
          <div>
          </div>
         )}


          {this.state.compStatus == true ?(
            <GenricModal isopen={this.state.compStatus}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.compStatusDelete == true ?(
           <GenrericDelete isopen={this.state.compStatusDelete} id={this.state.cosid}  tableName={this.state.deleteTableName}  onClose={this.deleteCOSModal}/>
         ):(
          <div>
          </div>
         )}
    {this.state.productTypemodal == true ?(
            <GenricModal isopen={this.state.productTypemodal}  label={this.state.label} placeholderText={this.state.label}  tableName={this.state.tableName}  onClose={this.handleGenricClose}/>
          ):(
            <div>
            </div>
          )}
          
         {this.state.productTypeModalDelete == true ?(
           <GenrericDelete isopen={this.state.productTypeModalDelete} id={this.state.productTypeid}  tableName={this.state.deleteTableName}  onClose={this.deleteProductTypemodal}/>
         ):(
          <div>
          </div>
         )}



      </div>
    )
  }
}

const table_structure = {
  height: "600px",
  maxWidth: "100%",
  backgroundColor: "#ffffff",
  overflow: "scroll",
  display: "block"
}

const btnColor = {
  backgroundColor: "#863577",
  color: "white"
}

export default Setting
