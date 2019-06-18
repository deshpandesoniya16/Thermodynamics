import React, { Component } from "react"
import "../App.css"
import "../dashboard.css"
import "semantic-ui-css/semantic.min.css"
import {
  Button,
  Container,
  Header,
  Form,
  Grid,
  Image,
  Navbar,
  Menu,
  Icon,
  Sidebar,
  Segment,
  Table,
  Divider
} from "semantic-ui-react"
import { Route, Switch, Link, Redirect } from "react-router-dom"

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
  Inprogress
} from "../styledComps.js"

class Side extends Component {
  state = {
    name: "",
    userInfo: {},
    notAuthorized: false,
    admin: false,
    CEO: false,
    serviceManager: false,
    serviceEngg: false,
    BM: false,
    SM: false,
    SE: false,
    BOE: false,
    BOS: false,
    HTM: false,
    HE: false,
    AM: false,
    AE: false,
    OM: false,
    userrole: [],
    AS: false,
    TS: false,
    BS: false,
    Atlas_Service: false,
    Thermax_Service: false,
    Bhular_Service: false

  }

  async componentDidMount() {
    if (JSON.parse(sessionStorage.getItem("userInfo")) == null) {
      console.log("Data Not Available")
    } else {
      let userInfo = await JSON.parse(sessionStorage.getItem("userInfo"))
      console.log('userInfo', userInfo);

      await this.setState({ userInfo })
      try {
        setTimeout(() => {
          // this.state.userrole = sessionStorage.getItem("Role")
          this.state.userrole = JSON.parse(sessionStorage.getItem("Role"))
          console.log("role is", JSON.stringify(this.state.userrole))

          if (this.state.userrole.length > 0) {
            for (let i = 0; i < this.state.userrole.length; i++) {
              switch (this.state.userrole[i].role) {
                case "Admin":
                  console.log("in Admin", this.state.userrole[i].role)
                  this.setState({ admin: true })
                  break

                case "CEO/Director":
                  console.log("in CEO", this.state.userrole[i].role)
                  this.setState({ CEO: true })
                  break

                case "Business Manager":
                  console.log("in BM", this.state.userrole[i].role)
                  this.setState({ BM: true })
                  break

                case "Service Manager":
                  console.log("in serviceManager", this.state.userrole[i].role)
                  this.setState({ serviceManager: true })
                  break

                case "Sales Manager":
                  console.log("in SM", this.state.userrole[i].role)
                  this.setState({ SM: true })
                  break

                case "Sales Engineer":
                  console.log("in sE", this.state.userrole[i].role)
                  this.setState({ SE: true })
                  break

                case "Service Engineer":
                  console.log("in serviceEngg", this.state.userrole[i].role)
                  this.setState({ serviceEngg: true })
                  break

                case "Back Office Executive":
                  console.log("in BOE", this.state.userrole[i].role)
                  this.setState({ BOE: true })
                  break

                case "Back Office Support":
                  console.log("in BOS", this.state.userrole[i].role)
                  this.setState({ BOS: true })
                  break

                case "HR/ IT Manager":
                  console.log("in HTM", this.state.userrole[i].role)
                  this.setState({ HTM: true })
                  break

                case "HR Executive":
                  console.log("in He", this.state.userrole[i].role)
                  this.setState({ HE: true })
                  break

                case "Accounts Manager":
                  console.log("in AM", this.state.userrole[i].role)
                  this.setState({ AM: true })
                  break

                case "Accounts Executive":
                  console.log("in AE", this.state.userrole[i].role)
                  this.setState({ AE: true })
                  break

                case "Operations Manager":
                  console.log("in OM", this.state.userrole[i].role)
                  this.setState({ OM: true })
                  break


                case "Atlas Sales- HOD":
                  console.log("in Atlas Sales- HOD", this.state.userrole[i].role)
                  this.setState({ AS: true })
                  break

                case "Thermax Sales - HOD":
                  console.log("in Thermax Sales - HOD", this.state.userrole[i].role)
                  this.setState({ TS: true })
                  break

                case "Buhler Sales - HOD":
                  console.log("in Buhler Sales - HOD", this.state.userrole[i].role)
                  this.setState({ BS: true })
                  break


                case "Atlas Service- HOD":
                  console.log("Atlas Service- HOD", this.state.userrole[i].role)
                  this.setState({ Atlas_Service: true })
                  break


                case "Thermax Service- HOD":
                  console.log("in Thermax Service- HOD", this.state.userrole[i].role)
                  this.setState({ Thermax_Service: true })
                  break


                case "Buhler Service-HOD":
                  console.log("in Buhler Service-HOD", this.state.userrole[i].role)
                  this.setState({ Bhular_Service: true })
                  break

                default:
                  console.log("Role is not there")
              }
            }
          } else {
            console.log("User has not roles")
          }
        }, 1000)
      } catch (e) {
        console.log("exption is", e)
        //window.location.reload()
      }

      console.log("props is", this.state.props)

      console.log("user info is", this.state.userInfo)
    }
  }

  signOutUser = () => {
    this.setState({
      user: "",
      userRole: "",
      loggedIn: false
    })
  }

  handleLogOut = () => {
    this.signOutUser()
    sessionStorage.setItem("userInfo", "")
    sessionStorage.setItem("Role", "")
    this.setState({ redirectToLogin: true })
  }

  render() {
    const {
      userInfo,
      notAuthorized,

      admin,
      CEO,
      BM,
      SM,
      SE,
      BOE,
      BOS,
      HTM,
      HE,
      AM,
      AE,
      OM,
      serviceEngg,
      serviceManager,
      AS, BS, TS,
      Atlas_Service, Thermax_Service, Bhular_Service
    } = this.state

    return (
      <div>
        <Sidebar
          width="thin"
          style={{ border: "2px #863577 solid" }}
          className="demo"
          as={Menu}
          animation="side along"
          visible={this.props.menuVisible}
          icon="labeled"
          vertical
          inline
        >
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column />
            </Grid.Row>
          </Grid>

          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column style={{ marginTop: "5%" }}>
                <p>
                  <font color="black" style={{ marginTop: "5%" }}>
                    <span>Welcome,</span> {this.state.userInfo.name}
                  </font>
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <hr />
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Link to="/DashBoard" as="a">
                  <span className="Sbutton" style={health}>Dashboard</span>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <hr />




          {/* <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Link to="/"><Button  className="Sbutton" style={health}>Executive Dashboard</Button></Link>
                    </Grid.Column>
                </Grid.Row>
    </Grid>  */}

          {/* <Menu pointing secondary vertical>
          <Link to="/Tixy"><Menu.Item name="home"  /></Link>
            <Menu.Item name="messages"  />
            <Menu.Item name="friends"  />
         </Menu>*/}

          {/*{admin == true ||
          CEO == true ||
          BM == true ||
          serviceManager == true ||
          SM == true ||
          BOE == true ||
          HTM == true ||
          AM == true ||
          OM == true ? (
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Link to="/ClientGodView" as="a">
                    <Button className="Sbutton" style={health}>
                      Client
                    </Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            <div />
          )}*/}

          {admin == true ||
            CEO == true ||
            BM == true ||
            serviceManager == true ||
            SM == true ||
            SE == true ||
            serviceEngg == true ||
            BOE == true ||
            BOS == true ||
            OM == true || AS == true || TS == true || BS == true || Atlas_Service == true || Thermax_Service == true || Bhular_Service == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/Tixy">
                      <span className="Sbutton" style={health}>
                        Tixy
                    </span>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />

          {admin == true ||
            CEO == true ||
            BM == true ||
            serviceManager == true ||
            SM == true ||
            BOE == true ||
            HTM == true ||
            AM == true ||
            OM == true || AS == true || TS == true || BS == true || Atlas_Service == true || Thermax_Service == true || Bhular_Service == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/ClientGodView" as="a">
                      <span className="Sbutton" style={health}>
                        Client
                    </span>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />

          {admin == true ||
            CEO == true ||
            BOE == true ||
            AM == true ||
            AE == true ||
            OM == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/VendorView" as="a">
                      <span className="Sbutton" style={health}>
                        Vendor
                    </span>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />

          {/*{admin == true ||
          // CEO == true ||
          // BM == true ||
          // SM == true ||
          // BOE == true ||
          // OM == true || AS==true || TS==true ||BS==true ? (
          //   <Grid columns="equal">
          //     <Grid.Row>
          //       <Grid.Column>
          //         <Link to="/Lead">
          //           <span className="Sbutton" style={health}>
          //             Lead
          //           </span>
          //         </Link>
          //       </Grid.Column>
          //     </Grid.Row>
          //   </Grid>
          // ) : (
          //   <div />
          // )}<hr />*/}

          {admin == true ||
            BM == true ||
            SM == true ||
            BOE == true ||
            BOS == true ||
            OM == true || AS == true || TS == true || BS == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/Product" as="a">
                      <span className="Sbutton" style={health}>
                        Product
                    </span>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />



          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Link to="/LeadMgmt" as="a">
                  <span className="Sbutton" style={health}>Lead Managment</span>

                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>






          {admin == true ||
            BM == true ||
            serviceManager == true ||
            BOE == true ||
            BOS == true || AS == true || TS == true || BS == true || Atlas_Service == true || Thermax_Service == true || Bhular_Service == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/Assets" as="a">
                      <span className="Sbutton" style={health}>
                        Assets
                    </span>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />


          {admin == true
            // CEO == true ||
            // BM == true ||
            // SM == true ||
            // SE == true ||
            // BOE == true ||
            // BOS == true ||
            // HTM == true ||
            // HE == true ||
            // AM == true ||
            // AE == true ||
            // OM == true 
            ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/Contract" as="a">
                      <span className="Sbutton" style={health}>ASC Managment</span>

                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />


          {/* Aishwarya 30 May*/}
          {/*  {admin == true ||
            CEO == true ||
            BM == true ||
            SM == true ||
            SE == true ||
            BOE == true ||
            HE == true ||
            HTM == true ||
            OM == true || AS == true || TS == true || BS == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/Sale" as="a">
                      <span className="Sbutton" style={health}>
                        Sale
                    </span>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />*/}

          {admin == true ||
            CEO == true ||
            BM == true ||
            serviceManager == true ||
            SM == true ||
            SE == true ||
            serviceEngg == true ||
            BOE == true ||
            BOS == true ||
            HTM == true ||
            HE == true ||
            OM == true || AS == true || TS == true || BS == true || Atlas_Service == true || Thermax_Service == true || Bhular_Service == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/Action" as="a">
                      <span className="Sbutton" style={health}>Action</span>

                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />

          {admin == true ||
            HTM == true ||
            HE == true ||
            AM == true ||
            AE == true ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/MyTeam">
                      <span className="Sbutton" style={health}>My Team</span>

                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />

          {admin == true || CEO == true || BOE == true || HTM == true ? (
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Link to="/DocumentManagement">
                    <span className="Sbutton" style={health}>Document Managment</span>

                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
              <div />
            )}<hr />

          {admin == true
            // CEO == true ||
            // BM == true ||
            // SM == true ||
            // SE == true ||
            // BOE == true ||
            // BOS == true ||
            // HTM == true ||
            // HE == true ||
            // AM == true ||
            // AE == true ||
            // OM == true 
            ? (
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/Setting" as="a">
                      <span className="Sbutton" style={health}>Setting</span>

                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <div />
            )}<hr />




          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <span className="Sbutton" style={health} onClick={() => this.handleLogOut()}>Logout</span>
                {/*<Button
                    className="Sbutton"
                    style={health}
                    onClick={() => this.handleLogOut()}
                  >
                    Logout
                  </Button>*/}

                {this.state.redirectToLogin && <Redirect to="/" />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Sidebar>
      </div>
    )
  }
}

const compname = {
  height: "6em",
  paddingTop: "3em",
  borderBottom: "2px solid #fff",
  fontFamily: "Times New Roman",
  fontSize: "15px",
  background: "white"
}

const executiveDash = {
  width: "10em",
  marginTop: "2em",
  borderRadius: "10px",
  padding: "16px",
  fontSize: "17px",
  background: "#FFD966",
  fontFamily: "Monospace821BT"
}

const health = {
  padding: "16px",
  fontSize: "15px"
  //fontFamily: "Times New Roman"
}
export default Side
