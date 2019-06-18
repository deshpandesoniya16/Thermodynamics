import React, { Component } from "react"
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
  Segment,
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
  Form,Label,Progress
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import escapeRegExp from "escape-string-regexp"
import _ from "lodash"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete"
import matthew from "../component/Image/matthew.png"
import Select from "react-select"
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {fbs} from "../component/base"
import ErrorModal from '../component/ErrorModal'
import SuccessModal from "../component/SuccessModal"
import { Teamrole } from "../component/Api";


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
  TableContent
} from "../styledComps.js"


class EditTeam extends Component {
  state = {
    menuVisible: false,
    lastAction: "",
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
    email: "",
    Name: "",
    empCode: "",
    address: "",
    password: "",
    btnvisi:false,
    role :
    [ 
      {
        name:"Admin"
       },
      {
     name:"CEO/Director"
    },
    {
      name:"Business Manager"
     },
     {
      name:"Service Manager"
     },
     {
      name:"Sales Manager"
     },
     {
      name:"Sales Engineer"
     },
     {
      name:"Service Engineer"
     },
     {
      name:"Back Office Executive"
     },
     {
      name:"Back Office Support"
     },
     {
      name:"HR/IT Manager"
     },
     {
      name:"HR Executive"
     },
     {
      name:"Accounts Manager"
     },
     {
      name:"Accounts Executive"
     },
     {
      name:"Operation Manger"
     },
     {name:"Atlas Sales- HOD"}, 
     {name:"Thermax Sales - HOD"}, 
     {name:"Buhler Sales - HOD"}, 
     {name:"Atlas Service-HOD"}, 
     {name:"Thermax Service-HOD"},
     {name:"Buhler Service-HOD"},
    ],

    SelectedRole : [],
    AssignedRole:[],
    selectedFile:null,
    file: '',
    imagePreviewUrl: '',

    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
    action:"",
    checked:true,
    teaminfo:{},
    isopen:false,
    uploadedfileurl:"",
    btndisable:false,
    isSucess:false,
    Smsg:"",
    roleData:[]
  }


  getRoles = (id)=>{

    fetch(Teamrole, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId:id
      })
  }).then(data => {
      return data.json();
  }).then(data => {
       console.log("data",data)
       console.log("role array",data.records)
       if(data.records){
         this.setState({roleData:data.records})

         let rolearr = data.records

         let roleData=[]
         rolearr.map(i=>{
            if(i.role){
              roleData.push(i.role)
            }
         })

         console.log("role array data is",roleData)
         this.setState({AssignedRole:roleData})
         //this.setState({AssignedRole:data.records})
       }else{
         console.log("No Client")
         this.setState({roleData:[]})
       }
  })
  }




  componentDidMount() {

     let teamdetails = JSON.parse(sessionStorage.getItem("editTicket"))
         if (teamdetails) {
           this.setState({teaminfo:teamdetails})
          console.log("In Team List", teamdetails)
         this.getRoles(teamdetails.id)
          this.setState({
           Name:teamdetails.name,
           Phno:teamdetails.mobile_num,
           email:teamdetails.email,
           Address:teamdetails.Address,
           empCode:teamdetails.empcode,
           password:teamdetails.password,
           uploadedfileurl:teamdetails.link,
           //role:teamdetails.role
          })

          this.state.AssignedRole.push(teamdetails.role)
        } else {
          console.log("No User here")
        }
        console.log("user is",this.state.prduct)
        
        

  }

  validateEmail = email => {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return re.test(email)
  }

  onChange = Address => {
    console.log("Address is", Address)
    this.setState({ Address })
  }


  // handleClick = async(i) => {
  //   console.log("name of role is",i.name)
  //   let assignedRole=[]
  //   assignedRole.push(i)
  //   await this.setState({SelectedRole:assignedRole})
  // }

  handleClick = (i) => {
    console.log("name of role is",i.name)
    this.state.SelectedRole.push(i.name)
    console.log("roles are",this.state.SelectedRole)
    this.setState({AssignedRole:this.state.SelectedRole})

    fetch("http://35.161.99.113:9000/webapi/t_team/addRole ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       memberId :this.state.teaminfo.id,
       role:i.name

       // assigneId: this.state.SelectedResultAssign.id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("data", data.records)
      
      })


  }

handleRemove = (i) =>{
  console.log("name of role is",i)
  let a=this.state.AssignedRole.indexOf(i)
  if(a > -1){
    this.state.AssignedRole.splice(a,1)
    }
  this.setState({AssignedRole:this.state.AssignedRole})
 
  console.log("after delete assignedRole",this.state.AssignedRole)


  fetch("http://35.161.99.113:9000/webapi/t_team/deleteRole ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       memberId :this.state.teaminfo.id,
       role:i

       // assigneId: this.state.SelectedResultAssign.id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
        console.log("data", data.records)
      
      })

}


  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false, isOpenReject: false })
    }, 2000)
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
      isOpenHold: false,
      isOpenReject: false,
      isOpenClose: false,
      isopen:false
    })
    clearTimeout(this.timeout)
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value })
  }

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
    this.setState({ search: "", value: geocodedPrediction.formatted_address })
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
    console.log(`Selected: ${selectedOption.label}`)
  }

  handleName = e => {
    this.setState({ Name: e.target.value })
  }

  validateNumber = input => {
    if (input === "") {
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
    console.log("email", e.target.value)

    setTimeout(() => {
      if (this.validateEmail(this.state.email)) {
        this.setState({ email: this.state.email, EmailMsg: "" })
      } else {
        this.setState({ EmailMsg: "Please Enter Valid Email." })
      }
    }, 1000)
  }

  handlepass = e => {
    this.setState({ password: e.target.value })
  }

  handlephno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ Phno: e.target.value })
    }
  }

  handleDiscribe = e => {
    this.setState({ discription: e.target.value })
  }

  handlelastSolved = e => {
    this.setState({ lastsolved: e.target.value })
  }

  handleSubmit = () => {
    if (!this.state.Name) {
      this.setState({msg1:"Please Enter Name"})
   } else if(!this.state.Phno && this.state.Phno.length < 10){
     this.setState({ msg1: "Please Enter Phone No." })
   }else if (!this.state.password) {
     this.setState({ msg1: "Please Enter Password" })
   } else if(!this.state.Address) {
     this.setState({ msg1: "Please Enter Address" })
   }else if(!this.state.empCode){
     this.setState({ msg1: "Please Enter Emp Code" })
   }else{
     console.log("selected roles indide submit",this.state.AssignedRole)
     fetch("http://35.161.99.113:9000/webapi/t_team/updateMember ", {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
        memberId :this.state.teaminfo.id,
         name: this.state.Name,
         mobile_num: this.state.Phno,
         password: this.state.password,
         Address: this.state.Address,
         empcode: this.state.empCode,
         link:this.state.uploadedfileurl,
         status:this.state.teaminfo.status,
         role:this.state.AssignedRole,
         email:this.state.email

        // assigneId: this.state.SelectedResultAssign.id
       })
     })
       .then(data => {
         return data.json()
       })
       .then(data => {
         console.log("data", data)
         console.log("data", data.records)
         
          // window.location.reload()
          if (data.message == "Member Updated") {

            this.setState({btndisable:true})
            this.setState({isSucess:true ,Smsg:data.message})
            setTimeout(()=>{
            this.setState({isSucess:false,redirectToTeam:true})
            },1000)


            let authkey = "133779ATT6JFXy0k5850e783"
            let sender = "SHMGMT"
            let route = "4"
            let number = this.state.Phno
            let message = "Hi Team member is updated :"
            let url =
              "http://bhashsms.com/api/sendmsg.php?" +
              "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
              message +
              "&sender=MHOURZ&phone=" +
              number +
              "&priority=ndnd&stype=normal"
            console.log("url", url)
            fetch(url, { mode: "no-cors" }).then(response => {
              console.log(response)
              this.setState({ redirectToTeam: true })
            })
          } else {
            this.setState({isopen:true})
            console.log("No User")
            this.setState({ msg: data.error })
          }
        })
    }
  }

 
  handleRate = (e, { rating, maxRating }) => {
    console.log("Rating given by", rating)
    this.setState({ rating, maxRating })
  }

  handleSolveDiscribe = e => {
    this.setState({ Solvediscription: e.target.value })
  }

  handleAvatar =e=>{
    console.log("image is",e.target.files[0])
    this.setState({selectedFile:e.target.files[0]})

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

  }


  handleChangeUsername = (event) => this.setState({username: event.target.value});
        handleUploadStart = () => this.setState({isUploading: true, progress: 0});
        handleProgress = (progress) => this.setState({progress});
        handleUploadError = (error) => {
          this.setState({isUploading: false});
          console.error(error);
        }
        handleUploadSuccess = (filename) => {
          this.setState({uploadedfileName: filename, progress: 100, isUploading: false});
          fbs.child(filename).getDownloadURL().then(url => this.setState({uploadedfileurl: url}));
          setTimeout(()=>{
      
            if(this.state.progress == 100){
             this.setState({filename:"", progress:0})
           }else{
             console.log("error in upload")
           }
          },1000)
        };

        handleEmp=e=>{
          this.setState({empCode:e.target.value,msg1:""})
        }


  render() {
    const inputProps = {
      value: this.state.Address,
      onChange: this.onChange
    }
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
      email,
      selectedOption,
      empCode,
      password,
      active1,link,
      btnvisi,role,SelectedRole,AssignedRole,selectedFile,imagePreviewUrl,uploadedfileurl,isopen,roleData,
      isSucess,btndisable
    } = this.state

    console.log("Assigned Role is", AssignedRole)

    let active = false
    // if(SelectedResult){
    //     Name=SelectedResult.company_name
    //    Phno=SelectedResult.number
    //    Address=SelectedResult.address
    //    rating=SelectedResult.star
    // }

    if (!SelectedResult.company_name) {
      active = false
    } else {
      active = true
    }

    //console.log("role are",role[0].name)

    // role.map(i=>{
    //   console.log("all role are",i.name)
    // })

    // console.log("Selected Role is",this.state.AssignedRole)

    return (
      <div>
  <PageContainer2>
          <div style={{ display: "flex", borderBottom: "2px solid #863577" }}>
            <Link to="/MyTeam">
              <IconDiv>
                <Icon name="arrow left" />
              </IconDiv>
            </Link>
            <HeadingDiv>
              <HeadingText>Update Team</HeadingText>
            </HeadingDiv>
          </div>
          <ContentArea>
            <TixyContent>
              <Segment padded style={{ height: "100%" }}>
              <Image
                        style={{ marginLeft: "16%" }}
                        centered
                        size="medium"
                        circular
                        src={uploadedfileurl}
                      />
                <label>Upload photo Here !!!</label>
                <hr />
                <form>
                  {this.state.isUploading && (
                    <p>Progress: {this.state.progress}</p>
                  )}
                  {this.state.avatarURL && <img src={this.state.avatarURL} />}
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    multiple
                    randomizeFilename
                    storageRef={fbs}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </form>
                <br />
                <Progress percent={this.state.progress} active color="green">
                  Smart Speed
                </Progress>
              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded>
                <label>Update Team</label>
                <hr />
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field className="label">
                      <label>Name</label>
                      <input
                        placeholder="Enter Name"
                        value={Name}
                        onChange={this.handleName}
                      />
                    </Form.Field>
                  </Form.Group>
                  <div className="space" />
                  <Form.Group widths="equal">
                    <Form.Field className="label">
                      <label className="label">Mobile Number</label>
                      <input
                        placeholder="Enter mobile number"
                        ref={input => (this.mbno = input)}
                        value={Phno}
                        onChange={this.handlephno}
                        maxLength="10"
                        required
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field className="label">
                      <label className="label">Email</label>
                      <input
                        placeholder="Enter Email"
                        type="email"
                        value={email}
                        onChange={this.handleEmail}
                        required
                      />
                    </Form.Field>
                  </Form.Group>
                  <p style={{color:"red"}}>{this.state.EmailMsg}</p>


                  <Form.Group widths="equal">
                    <Form.Field className="label">
                      <label>Password</label>
                      <input
                        placeholder="Enter password"
                        type="password"
                        value={password}
                        onChange={this.handlepass}
                        required
                      />
                    </Form.Field>
                  </Form.Group>

                  
                  <div className="space" />
                  <Form.Group widths="equal">
                    <Form.Field className="label">
                      <label>Emp Code</label>
                      <input
                        placeholder="Enter Emp code"
                        value={empCode}
                        onChange={this.handleEmp}
                        required
                      />
                    </Form.Field>
                  </Form.Group>


                  <Form.Group widths="equal">
                    <Form.Field className="label">
                      <label>Address</label>
                      <PlacesAutocomplete inputProps={inputProps} />
                    </Form.Field>
                  </Form.Group>

               
                </Form>
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea>
            <TixyContent>
              <Segment padded>
                <label>Adds Role Here</label>
                <hr />

                <Form>
                  <Grid columns={3} relaxed>
                    {role.map(i => (
                      <Grid.Column>
                        <Button
                          circular
                          color="green"
                          onClick={() => this.handleClick(i)}
                        >
                          {i.name}
                        </Button>
                      </Grid.Column>
                    ))}
                  </Grid>
                </Form>
              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded>
                <label>Assigned User Role</label>
                <hr />

                <Form>
                  <Grid columns={3} relaxed>
                    {AssignedRole.map(i => (
                      <Grid.Column>
                        <Button
                          circular
                          color="purple"
                          onClick={() => this.handleRemove(i)}
                        >
                          {i}
                        </Button>
                      </Grid.Column>
                    ))}
                  </Grid>
                  <p>
                    <font color="red">{this.state.assignedMsg}</font>
                  </p>
                </Form>
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea style={{ justifyContent: "flex-end", padding: 24 }}>
            <font color="red">{this.state.msg1}</font>
            <Button disabled={this.state.btndisable}
              style={{ backgroundColor: "#863577", color: "#ffffff" }}
              onClick={() => this.handleSubmit()}
            >
              Update Team Member
            </Button>
          </ContentArea>
          {this.state.redirectToTeam && <Redirect to="/MyTeam" />}
        </PageContainer2>






{isopen == true ?(
  <ErrorModal isopen={this.state.isopen} msg={this.state.msg} onClose={this.handleClose}/>
):(
  <div>
  </div>
)}


{isSucess == true ?(
  <SuccessModal isopen={this.state.isSucess} msg={this.state.Smsg} onClose={this.handleClose}/>
):(
  <div>
  </div>
)}

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



export default EditTeam
