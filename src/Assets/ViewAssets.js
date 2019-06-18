import React, { Component } from "react"
import Side from "../component/Sidenav"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Sidebar,
  Search,
  Divider,
  Container,
  Grid,
  Rating,
  Card,
  List,
  Radio,
  Segment,
  Progress,
  Popup,
  Button,
  TextArea,
  Menu,
  Image,
  Icon,
  Header,
  Input,
  Table,
  Modal,
  Form
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import Carousel from "nuka-carousel"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import SmartUpload from "../component/SmartUpload"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader"
import { Asset_fbs } from "../component/base"
import { vendorGodview, VendorBasedProduct, verticallist, addVertical, StakeList, StakeImage, updateStack } from "../component/Api"
import RawCarousel from "../component/RawCarousel"
import StarRatingComponent from 'react-star-rating-component';


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
  Box,
  Box2,
  MainDiv2,
  MainDivHolder,
  TextColor
} from "../styledComps.js"


class ViewAssets extends Component {
  state = {
    menuVisible: false,
    lastAction: moment(),
    Name: "",
    Address: "",
    Phno: "",
    discription: "",
    lastsolved: "",
    search: "",
    isLoading: false,
    value: "",
    results: [],
    SelectedResult: {},

    isOpen: false,
    status: "",
    solution: "",
    clientData: [],
    rating: 0,
    maxRating: 0,
    Solvediscription: "",

    isLoadingAssign: false,
    valueAssign: "",
    resultsAssign: [],
    SelectedResultAssign: {},
    isOpenHold: false,
    isOpenReject: false,
    isOpenClose: false,
    AssignedUser: [],
    ProductType: "",
    group: "",
    Machnie: "",

    aname: "",
    srno: "",


    startDate: "",
    ToDate: "",
    doc: "",

    TotalPrice: "",
    pname: "",
    assetName: "",
    isOpenAsset: false,
    ptype: "",
    qty: true,
    AssetData: [],
    ProductData: [],
    asset_status: "",
    isopen: false,
    Vname: "",
    unitPrice: "",

    AssetImage: [],
    uploadedfileurl: "",

    clientData: [],
    owner: "",
    AssetDetails: {},

    StackData: [],
    Stackholderdata: [],
    StackListData: [],
    stackImages: [],
    asid: "",

    next: 0,
    prev: 0, fdate: "", tdate: "",
    count: 0,

    auname: "",
    cid: "",
    vid: "",
    vendor_name: "", ProductUpdate: false, vendorUpdate: false,
    ImageData: [],
    prevdisable: true,
    nxtdisable: true,
    verticalData: [],
    vertical: "",
    serialCode: "",
    groupData: [],
    subGroupData: [],
    grpid: "",
    sgrpid: "",
    GrupName: "",
    fuelTypeData: [],
    fuelNameData: [],
    fuelname: "",
    ftype: "",
    seriesData: [],
    product_name: "",
    finalsrno: "",
    fuelCombuster: "",
    fuelFieding: "",
    verticalName: "",
    open1: false,              //Aishwarya 30 May
    open: false,                        //Aishwarya 30 May
    SelectedTicket: "",         //aishwarya 30 may
    AssetNo: 0,            //aishwarya 30 may
    isSucess: false,           //aishwarya 30 may
    redirectToAsset: false, //aishwarya 29 may
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
      console.log("data", data)
      console.log("vertical list", data.records)
      if (data.records) {
        this.setState({ verticalData: data.records })
        let Asset = JSON.parse(sessionStorage.getItem("editTicket"))

        data.records.map(i => {
          if (i.id == Asset.vertical) {
            this.setState({ verticalName: i.vertical })
          }
        })
      } else {
        console.log("No vertical")
        this.setState({ verticalData: [] })
      }
    })

  }




  stackImages = (sid) => {

    console.log("Stack holder id", this.state.Stackholderdata)
    window.dispatchEvent(new Event('resize'));
    fetch(StakeImage, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assetStake: sid
      })
    }).then(data => {
      return data.json();
    }).then(data => {
      console.log("Stack images data", data)
      console.log("Stack images", data.records)
      if (data.records) {
        this.setState({ ImageData: data.records })

      } else {
        console.log("No vendor")
        this.setState({ ImageData: [] })
      }
    })
  }


  componentDidMount() {

    let Asset = JSON.parse(sessionStorage.getItem("editTicket"))
    let sid;
    if (Asset) {
      console.log("In User List", Asset)

      this.setState({
        AssetDetails: Asset,
        //assetId:Asset.id,
        //asset_status:Asset.assetStatus,
        //vid:Asset.vid,
        vendor_name: Asset.vendor_name,
        product_Name: Asset.name,
        Vname: Asset.vendor_name,
        atype: Asset.asset_type,
        ptype: Asset.name,
        unitPrice: Asset.unitPrice,
        srno: Asset.serialNumber,
        rating: Asset.star,
        vertical: Asset.vertical,
        GrupName: Asset.groupName,
        sgrpid: Asset.subGroupName,
        seriesId: Asset.series,
        AssetNo: Asset.id,            //Aishwarya 30 may
      })
    } else {
      console.log("No User here")
    }


    fetch(StakeList, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assetId: Asset.id
      })
    }).then(data => {
      return data.json();
    }).then(data => {
      console.log(" data Stack data", data)
      console.log("Stack data", data.records)
      if (data.records) {
        let Stackholderdata1 = data.records

        this.setState({ Stackholderdata: data.records, prev: data.records - 1 })



        let nxtdisable = true

        if (data.records.length > 1) {
          nxtdisable = false
        }



        sid = Stackholderdata1[0].id
        let date = this.state.Stackholderdata[0].fromDate
        let fdates = moment(date, 'DD-MM-YYYY')

        console.log("fdates is", fdates)
        console.log("sid", sid)

        this.setState({
          asid: Stackholderdata1[0].id,
          assetId: Stackholderdata1[0].assetId,
          cid: Stackholderdata1[0].clientId,
          auname: Stackholderdata1[0].assignee,
          valueAssign: Stackholderdata1[0].assignee,
          value: Stackholderdata1[0].company_name,
          TotalPrice: Stackholderdata1[0].totalPrice,
          startDate: Stackholderdata1[0].fromDate,
          ToDate: Stackholderdata1[0].toDate,
          aqty: Stackholderdata1[0].stockQty,
          asset_status: Stackholderdata1[0].service,
          astatus: Stackholderdata1[0].installed,
          Name: Stackholderdata1[0].company_name,
          Phno: Stackholderdata1[0].number,
          owner: Stackholderdata1[0].owner,
          doc: Stackholderdata1[0].doc,
          ftype: Stackholderdata1[0].fuel_Type,
          fuelname: Stackholderdata1[0].fuelName,
          fuelFieding: Stackholderdata1[0].fuelFieding,
          fuelCombuster: Stackholderdata1[0].fuelCombuster,
          nxtdisable
        })

      } else {
        console.log("No Stackholder")
        this.setState({ Stackholderdata: [] })
      }

      console.log("asid", this.state.asid)
    })



    setTimeout(() => {

      fetch(StakeImage, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assetStake: this.state.asid
        })
      }).then(data => {
        return data.json();
      }).then(data => {
        console.log("Stack images data", data)
        console.log("Stack images", data.records)
        if (data.records) {
          this.setState({ ImageData: data.records })

        } else {
          console.log("No vendor")
          this.setState({ ImageData: [] })
        }
      })


    }, 1500)


    this.listVertical();


  }



  Previous = async () => {

    let prevdisable = false

    if (this.state.Stackholderdata.length > 0) {

      let count1 = this.state.count
      console.log("count in prev in if ", count1, this.state.count)

      if (count1 > 0 && count1 < this.state.Stackholderdata.length) {
        count1--
      }
      else {
        count1 = 0

        this.setState({ msg: "Previous Limit is Exceded", isopen: true })
        // console.log(this.state.Stackholderdata[next])

      }

      if (count1 == 0) {
        prevdisable = true
      }
      console.log(this.state.Stackholderdata[count1])
      this.setState({ count: count1 })

      this.setState({
        asid: this.state.Stackholderdata[count1].id,
        assetId: this.state.Stackholderdata[count1].assetId,
        auname: this.state.Stackholderdata[count1].assignee,
        valueAssign: this.state.Stackholderdata[count1].assignee,
        cid: this.state.Stackholderdata[count1].clientId,
        value: this.state.Stackholderdata[count1].company_name,
        TotalPrice: this.state.Stackholderdata[count1].totalPrice,
        startDate: this.state.Stackholderdata[count1].fromDate,
        ToDate: this.state.Stackholderdata[count1].toDate,
        aqty: this.state.Stackholderdata[count1].stockQty,
        asset_status: this.state.Stackholderdata[count1].service,
        astatus: this.state.Stackholderdata[count1].installed,
        doc: this.state.Stackholderdata[count1].doc,
        Name: this.state.Stackholderdata[count1].company_name,
        Phno: this.state.Stackholderdata[count1].number,
        owner: this.state.Stackholderdata[count1].owner,
        nxtdisable: false,
        prevdisable
      })

      await
        console.log("assert status is ", this.state.asset_status)
      console.log("assert status  service is ", this.state.astatus)

      this.stackImages(this.state.Stackholderdata[count1].id);
      // let pc =0
      // for(let i=0;i<this.state.Stackholderdata.length;i++){
      //   if(this.state.Stackholderdata[i] <= pc){
      //     pc++

      //     this.state.StackListData.push(this.state.Stackholderdata[i])
      //   }
      //}


    }
    else {
      // Modal 

    }

  }

  Next = async () => {

    let count2 = this.state.count
    console.log('count2', count2);
    let nxtdisable = false

    console.log('this.state.Stackholderdata.length', this.state.Stackholderdata.length);

    if (this.state.Stackholderdata.length > 0) {
      if (count2 >= 0 && count2 < this.state.Stackholderdata.length) {
        count2++
        console.log("Count in if is", count2)
      }
      else {
        count2 = 0
        console.log("Count in else")
        //this.setState({msg:"Next Limit is Exceded",isopen:true})

        // console.log(this.state.Stackholderdata[next])
      }

      console.log(this.state.Stackholderdata[count2])

      let a = count2
      console.log('a', a);
      let b = this.state.Stackholderdata.length - 1
      console.log('b', b);
      if (a == b) {
        nxtdisable = true
        console.log('nxtdisable', nxtdisable);
      }


      this.setState({
        asid: this.state.Stackholderdata[count2].id,
        assetId: this.state.Stackholderdata[count2].assetId,
        auname: this.state.Stackholderdata[count2].assignee,
        valueAssign: this.state.Stackholderdata[count2].assignee,
        cid: this.state.Stackholderdata[count2].clientId,
        value: this.state.Stackholderdata[count2].company_name,
        TotalPrice: this.state.Stackholderdata[count2].totalPrice,
        startDate: this.state.Stackholderdata[count2].fromDate,
        ToDate: this.state.Stackholderdata[count2].toDate,
        aqty: this.state.Stackholderdata[count2].stockQty,
        asset_status: this.state.Stackholderdata[count2].service,
        astatus: this.state.Stackholderdata[count2].installed,
        doc: this.state.Stackholderdata[count2].doc,
        Name: this.state.Stackholderdata[count2].company_name,
        Phno: this.state.Stackholderdata[count2].number,
        owner: this.state.Stackholderdata[count2].owner,
        count: count2,
        prevdisable: false,
        nxtdisable
      })

      await
        console.log("assert status is ", this.state.asset_status)
      console.log("assert status  service is ", this.state.astatus)

      this.stackImages(this.state.Stackholderdata[count2].id);

    }
    else {
      //Warning Model
    }



    // console.log("next value is ",this.state.next)
    // for(let i=0;i<this.state.Stackholderdata.length;i++){
    // if(this.state.next <= this.state.Stackholderdata[i].id){
    //   this.state.StackListData.push(this.state.Stackholderdata[i])
    // }
    // }

    // const iter = this.state.Stackholderdata[Symbol.iterator]();
    // let result
    // while (!(this.state.next = iter.next()).done) {
    //   console.log(result.value)
    // }

    // console.log("stack List data is",this.state.StackListData)

    //   for(let i=0;i<this.state.Stackholderdata.length;i++){
    //     if(this.state.Stackholderdata[i] >= nc){
    //       nc++

    //       this.state.StackListData.push(this.state.Stackholderdata[i])
    //     }
    // }

    //console.log("Next data",this.state.StackListData)

    // let click =0
    // let count=this.state.Stackholderdata.length
    // let findex=0,lindex=0
    // this.state.Stackholderdata.map(i,v=>{

    //   let index = i;
    //   if(index == 0){
    //     findex=v.id
    //   }
    //   if(index==count-1){
    //     lindex=v.id
    //   }

    //   //next

    //   //on butoon click increase the count
    //   click++
    //   if(click < findex){
    //     click=findex
    //   }

    // })
  }


  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
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

    console.log(this.state.SelectedTicket)
    fetch("http://35.161.99.113:9000/webapi/t_asset/t_deleteAsset", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        a_id: this.state.SelectedTicket
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
          // window.location.reload()
          this.setState({ isSucess: true, redirectToAsset: true })
        }, 1000)
      })
  }

  render() {

    console.log("props", this.props)

    let {
      lastAction,
      Name,
      Phno,
      Address,
      discription,
      lastsolved,
      search,
      value,
      isLoading,
      results,
      SelectedResult,
      status,
      clientData,
      Solvediscription,
      rating,
      isLoadingAssign,
      valueAssign,
      resultsAssign,
      isOpen,
      aname,
      srno,
      ToDate,
      startDate,
      TotalPrice,
      atype,
      isOpenAsset,
      pname,
      assetName,
      ptype,
      aqty,
      qty,
      AssetData, assetId, isSucess, VendorData, asset_status, astatus, fdate, tdate, stackImages,
      ProductData, isopen, Vname, unitPrice, AssetImage, uploadedfileurl, owner, ImageData,
      nxtdisable, prevdisable, seriesId, verticalName,
      size1,             //Aishwarya 30 may
      open1,        //Aishwarya 30 May
      open,         //Aishwarya 30 May
    } = this.state

    // console.log("Selected Result", AssetImage)

    let active = false


    if (!SelectedResult.company_name) {
      active = false
    } else {
      active = true
    }

    return (
      <div>

        <PageContainer>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/Assets">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>View Asset</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditAssets">
              <Button
                size='small'
                floated='right'
                style={{
                  // marginRight: "20px",
                  margin: "10px",
                  backgroundColor: "#863577",
                  color: "#fff"
                }}
              >
                Edit
           </Button>
            </Link>
            {/*Aishwarya 29 May*/}
            <Button
              size='small'
              floated='right'
              style={{
                margin: "10px",
                marginRight: "40px",
                backgroundColor: "#863577",
                color: "#fff"
              }}
              onClick={() => this.show("tiny", this.state.AssetNo)}         //Aishwarya 30 may
            >
              Delete
       </Button>
       {this.state.redirectToAsset && <Redirect to="/Assets" push />}            {/*Aishwarya 30 May*/}     
          </div>
          <ContentArea>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}                //Aishwarya   17/5/19    
                >View Asset</label>
                <hr />
                <div>

                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    className="dv-star-rating-input"
                  />
                </div>
                <hr />

                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Vendor: </span>                     {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{Vname}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Product: </span>                       {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{ptype}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Vertical: </span>                            {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.vertical}</span>
                    </Box2>
                  </MainDiv2>
                  <br />


                  <MainDiv2>
                    <Box>
                      <span>Group: </span>                             {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.GrupName}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>SubGroup: </span>                            {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.sgrpid}</span>
                    </Box2>
                  </MainDiv2>
                  <br />



                  <MainDiv2>
                    <Box>
                      <span>Asset Type: </span>                      {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{atype}</span>
                    </Box2>
                  </MainDiv2>
                  <br />


                  <MainDiv2>
                    <Box>
                      <span>Series: </span>                      {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{seriesId}</span>
                    </Box2>
                  </MainDiv2>
                  <br />


                  <MainDiv2>
                    <Box>
                      <span>Asset No. : </span>                    {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{srno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  {/* <MainDiv2>
                    <Box>
                      <span>Unit Price </span>
                    </Box>
                    <Box2>
                      <span>{unitPrice}</span>
                    </Box2>
                  </MainDiv2>
                  <br /> */}


                  {/* <MainDiv2>
                    <Box>
                      <span>Asset Application :</span>
                    </Box>
                    <Box2>
                      <span>{ptype}</span>
                    </Box2>
                  </MainDiv2>
                  <br /> */}

                </MainDivHolder>
              </Segment>
            </TixyContent>
            <TixyContent style={{ flex: 1 }}>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold" }}                //Aishwarya   17/5/19     
                >Asset Stackholder</label>
                <br />
                <hr />
                <MainDivHolder>
                  <MainDiv2>
                    <Box>
                      <span>Client: </span>               {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.value}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Name:  </span>                      {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.Name}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Contact No: </span>                   {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.Phno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Assign To:  </span>                                 {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{owner}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Assign By: </span>                            {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{valueAssign}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>From Date: </span>                          {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.startDate}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>To Date: </span>                    {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.ToDate}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  {/* <MainDiv2>
                    <Box>
                      <span>Asset Qty </span>
                    </Box>
                    <Box2>
                      <span>{this.state.aqty}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Total Price </span>
                    </Box>
                    <Box2>
                      <span>{TotalPrice}</span>
                    </Box2>
                  </MainDiv2> */}

                  <br />

                  <Form.Group inline widths={3}>
                    {astatus == "Installed" && (
                      <div style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          id="Machnieradio1"
                          name="Machnieradio1"
                          value="Installed"
                          onChange={this.handleAssetStatus}
                          defaultChecked
                        />
                        <label htmlFor="Machnieradio1">Installed</label>
                      </div>
                    )}

                    {astatus == "Not Installed" && (
                      <div>
                        <input
                          type="radio"
                          id="radio2"
                          name="Machnieradio1"
                          value="Not Installed"
                          onChange={this.handleAssetStatus}
                          defaultChecked
                        />
                        <label htmlFor="radio2">Not Installed</label>
                      </div>
                    )}

                  </Form.Group>

                  <br />
                  <Form.Group inline widths={3}>
                    {asset_status == "IN Service" && (
                      <div style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          id="radio1"
                          name="radio1"
                          value="IN Service"
                          onChange={this.handleMachnie}
                          defaultChecked
                        />
                        <label htmlFor="radio1">IN Service</label>
                      </div>
                    )}

                    {asset_status == "Not in Service" && (
                      <div>
                        <input
                          type="radio"
                          id="radio2"
                          name="radio1"
                          value="Not in Service"
                          onChange={this.handleMachnie}
                          defaultChecked
                        />
                        <label htmlFor="radio2">Not in Service</label>
                      </div>
                    )}
                  </Form.Group>


                  <br />
                  <MainDiv2>
                    <Box>
                      <span>DOC: </span>              {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.doc}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Type Of Fuel: </span>                   {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.ftype}</span>
                    </Box2>
                  </MainDiv2>
                  <br />


                  <MainDiv2>
                    <Box>
                      <span>Fuel name: </span>                  {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.fuelname}</span>
                    </Box2>
                  </MainDiv2>
                  <br />


                  <MainDiv2>
                    <Box>
                      <span>Type Of Fuel Fieding: </span>               {/*Aishwarya 17/5/19*/}
                    </Box>
                    <Box2>
                      <span>{this.state.fuelFieding}</span>
                    </Box2>
                  </MainDiv2>
                  <br />                                    {/*Aishwarya 17/5/19*/}
                  <MainDiv2>
                    <Box>
                      <span>Type Of Combuster: </span>                      {/*Aishwarya 17/5/19*/}
                      <br />
                    </Box>
                    <Box2>
                      <span>{this.state.fuelCombuster}</span>
                    </Box2>
                  </MainDiv2>
                  <br />




                </MainDivHolder>
              </Segment>
              <Button disabled={prevdisable} floated="left" style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={() => this.Previous()}>Prev</Button>
            </TixyContent>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
                <label
                  style={{ fontSize: "16px", fontWeight: "bold " }}                    //Aishwarya   17/5/19   
                >Image</label>

                <hr />
                <RawCarousel imageData={ImageData && ImageData.length >= 0 && ImageData || []} />

              </Segment>
              <Button disabled={nxtdisable} floated="right" style={{ backgroundColor: "#863577", color: "#ffffff" }} onClick={() => this.Next()}>Next</Button>

            </TixyContent>
          </ContentArea>
          <br />

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
        </PageContainer>
      </div>
    )
  }
}

// AddTixy.propTypes = {
//     googleMaps: PropTypes.object,
//   }

const searchStyle = {
  width: "19em"
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
  background: "transparent",
  boxShadow: "0 0 0 1px #ffffff inset",
  color: "#ffffff",
  padding: "14px",
  width: "31em"
}

export default ViewAssets
