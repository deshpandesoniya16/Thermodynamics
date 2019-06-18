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
  Form, Label, Progress, List
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
import { fbs } from "../component/base"
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
  Box,
  Box2,
  MainDiv2,
  MainDivHolder,
  TextColor
} from "../styledComps.js"


class ViewTeam extends Component {
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
    email: "",
    Name: "",
    empCode: "",
    address: "",
    password: "",
    btnvisi: false,
    role:
      [
        {
          name: "CEO/Director"
        },
        {
          name: "Business Manager"
        },
        {
          name: "Service Manager"
        },
        {
          name: "Sales Manager"
        },
        {
          name: "Sales Engineer"
        },
        {
          name: "Service Engineer"
        },
        {
          name: "Back Office Executive"
        },
        {
          name: "Back Office Support"
        },
        {
          name: "HR/IT Manager"
        },
        {
          name: "HR Executive"
        },
        {
          name: "Accounts Manager"
        },
        {
          name: "Accounts Executive"
        },
        {
          name: "Operation Manger"
        },
        { name: "Atlas Sales- HOD" },
        { name: "Thermax Sales - HOD" },
        { name: "Buhler Sales - HOD" },
        { name: "Atlas Service-HOD" },
        { name: "Thermax Service-HOD" },
        { name: "Buhler Service-HOD" },
      ],

    SelectedRole: [],
    AssignedRole: [],
    selectedFile: null,
    file: '',
    imagePreviewUrl: '',

    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
    action: "",
    checked: true,
    role: "",
    open: false,                        //Aishwarya 30 May
    open1: false,              //Aishwarya 30 May
    SelectedTicket: "",         //aishwarya 30 may
    TeamId: 0,         //Aishwarya 29 may
    redirectToTeam: false, //aishwarya 29 may
    isSucess: false,           //aishwarya 29 may
  }

  getRoles = (id) => {

    fetch(Teamrole, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id
      })
    }).then(data => {
      return data.json();
    }).then(data => {
      console.log("data", data)
      console.log("role array", data.records)
      if (data.records) {
        this.setState({ roleData: data.records })

        let rolearr = data.records

        let roleData = []
        rolearr.map(i => {
          if (i.role) {
            roleData.push(i.role)
          }
        })

        console.log("role array data is", roleData)
        this.setState({ AssignedRole: roleData })
        //this.setState({AssignedRole:data.records})
      } else {
        console.log("No Client")
        this.setState({ roleData: [] })
      }
    })
  }

  componentDidMount() {


    let teamdetails = JSON.parse(sessionStorage.getItem("editTicket"))
    if (teamdetails) {
      this.setState({ teaminfo: teamdetails })
      console.log("In Team List", teamdetails)
      this.getRoles(teamdetails.id)
      this.setState({
        Name: teamdetails.name,
        Phno: teamdetails.mobile_num,
        email: teamdetails.email,
        Address: teamdetails.Address,
        empCode: teamdetails.empcode,
        password: teamdetails.password,
        uploadedfileurl: teamdetails.link,
        role: teamdetails.role,
        TeamId: teamdetails.id
      })
    } else {
      console.log("No User here")
    }
    console.log("user is", this.state.prduct)



  }




  handleChangeUsername = (event) => this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({ uploadedfileName: filename, progress: 100, isUploading: false });
    fbs.child(filename).getDownloadURL().then(url => this.setState({ uploadedfileurl: url }));
  };

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
    fetch("http://35.161.99.113:9000/webapi/t_team/t_deleteMember", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        memberId: this.state.SelectedTicket
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
          this.setState({ isSucess: true, redirectToTeam: true })
        }, 1000)
      })
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
      active1,
      btnvisi, role, SelectedRole, AssignedRole, selectedFile, imagePreviewUrl, uploadedfileurl,
      open,         //Aishwarya 30 May
      open1,        //Aishwarya 30 May
      size1,             //Aishwarya 30 may
    } = this.state

    console.log("Selected Result", SelectedResult)

    let active = false

    if (!SelectedResult.company_name) {
      active = false
    } else {
      active = true
    }


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
              <HeadingText>View Team</HeadingText>
            </HeadingDiv>
            {/*Aishwarya 29 May*/}
            <Link to="/EditTeam">
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
              onClick={() => this.show("tiny", this.state.TeamId)}
            >
              Delete Team
       </Button>
            {this.state.redirectToTeam && <Redirect to="/MyTeam" push />}            {/*Aishwarya 30 May*/}
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
              </Segment>
            </TixyContent>
            <TixyContent>
              <Segment padded>
                <label>Team Member Info</label>
                <hr />
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
                      <span>Mobile Number :</span>
                    </Box>
                    <Box2>
                      <span>{Phno}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Email :</span>
                    </Box>
                    <Box2>
                      <span>{email}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Password :</span>
                    </Box>
                    <Box2>
                      <span>{password}</span>
                    </Box2>
                  </MainDiv2>
                  <br />
                  <MainDiv2>
                    <Box>
                      <span>Emp Code :</span>
                    </Box>
                    <Box2>
                      <span>{empCode}</span>
                    </Box2>
                  </MainDiv2>
                  <br />

                  <MainDiv2>
                    <Box>
                      <span>Address :</span>
                    </Box>
                    <Box2>
                      <span>{Address}</span>
                    </Box2>
                  </MainDiv2>
                </MainDivHolder>
              </Segment>
            </TixyContent>
          </ContentArea>
          <ContentArea>

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



export default ViewTeam
