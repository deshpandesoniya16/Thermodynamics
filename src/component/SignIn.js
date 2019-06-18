import React, { Component } from 'react';
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Header,Responsive ,Form , Grid, Image,Modal} from 'semantic-ui-react'
import {Route, Switch,Link,Redirect} from "react-router-dom"
//import logo from "./component/Image/logo"
import ErrorModal from "./ErrorModal"
import SuccessModal from "./SuccessModal"
import {getroles,roleBasedInfo} from "./Api"


class SignIn extends Component {

  state = {
    mobile_no :"",
    password:"",
    warning:"",
    open:"",
    size:"",
    open1:"",
    size1:"",
    otp:"",
    open2:"",
    size2:"",
    pass:"",
    errorMsg:"",
    isopen:false,
    isSucess:false,
    SuccessMsg:"",
    error:false,
    roleData:[],
    ceoData:[]
  }

  roleBasedData = () =>{
    fetch(roleBasedInfo,{
      method:'POST',
      headers :{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        role:'CEO/Director'
      })
    }).then(data =>{
      return data.json()
    }).then(data=>{
      console.log('data of based on role', data.records);
      let ceodetails= data.records[0]
      console.log('ceodetails', ceodetails);
      sessionStorage.setItem("ceoDetails",JSON.stringify(ceodetails))
      this.setState({ceoData:data.records[0]})
    })
  }


  componentDidMount(){


    sessionStorage.setItem("Role","")
    console.log("role is",this.state.roleData)
  
    this.roleBasedData()
  }
 
  validatephno = mbno => {
    if (!isNaN(mbno)) {
      return true
    }
    return false
  }

  validateNumber = input => {
      if(input === ""){
        return true
      }
      let pattern = /^\d+(\.\d{1,2})?$/
      return pattern.test(input)
  }

  handleMobile = e =>{
      if(this.validateNumber(e.target.value)){
          this.setState({mobile_no:e.target.value ,errorMsg:"" ,error:false,isopen:false})
      }    
  }

  handlePass = e =>{
      this.setState({password:e.target.value,errorMsg:"" ,error:false,isopen:false})
  }

  getRoles = (id) =>{
    fetch(getroles, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        u_id:id
      })
    }).then(data => {
        return data.json();
  }).then(data =>{
      console.log("data of role is",data)

      if(!data.role){
        console.log("Role is Not Assigned for that user")
      }else{
        let roles = data.role

        sessionStorage.setItem("Role",JSON.stringify(roles))
        this.setState({roleData:roles})
      }
  })
}

  loggedIn = () => {
    console.log("login")
    if (!this.state.mobile_no) {
        this.setState({ errorMsg: "Please enter mobile no", error:true,isopen:true})
    }else if(!this.state.password){
        this.setState({ errorMsg: "Please enter password" ,error:true,isopen:true})
    }else{
      fetch('http://35.161.99.113:9000/webapi/t_login/sign_in', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_number:this.state.mobile_no,
          u_pass:this.state.password
        })
      }).then(data => {
          return data.json();
    }).then( async (data) =>{
        console.log("data",data)
        console.log("user is",data.user)
        if(data.message == "Log in Done"){
          let userInfo = data.user[0]
          this.setState({SuccessMsg:data.message,isSucess:true})
          //  let userObj = { user: data.user[0].mobile_num, userRole:data.user[0].role, loggedIn:true, loading:false }
          //   //console.log(userObj)
          //  this.props.signInUser(userObj)

          await this.getRoles(data.user[0].id);

          sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
        this.setState({redirectToTixy:true})
          //this.props.history.push('/Tixy')
        }else{
          this.setState({errorMsg:data.message,error:true,isopen:true})
          //sessionStorage.setItem("userInfo",null)
        }
        //this.verifyOtp()
    })

        
    }
  }
  close = () => this.setState({ open: false ,isopen:false,isSucess:false})

  show = (size) => {
    if(!this.state.mobile_no){
      this.setState({warning:"Please enter mobile number"})
    }else{

      fetch('http://35.161.99.113:9000/webapi/t_login/forget_password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              u_number: this.state.mobile_no
            })

            }).then(data => {
              return data.json();
              }).then(data => {
                console.log("data",data.message)
                if(data.message === 'Correct number'){
                  this.setState({ size, open: true })          
                }else{
                  this.setState({warning:"Please enter valid mobile number" })                            
                }
              })
      //this.setState({ size, open: true })
    }
  }

  close1 = () => this.setState({ open1: false })

  reset = (size1) => {
    this.close()
    this.setState({ size1, open1: true })

    let random
    let max = 1000
    let min = 9000
    random = Math.floor(Math.random() * (max - min + 1)) + min
    console.log(random)

    let authkey = "133779ATT6JFXy0k5850e783"
    let sender = "SHMGMT"
    let route = "4"
    let number = this.state.mobile_no
    let message = "Hey there, here is ur otp" + random

    let url='http://control.msg91.com/api/sendhttp.php?authkey='+authkey+'&mobiles='+number+'&message='+message+'&sender='+sender+'&route='+route+'&country=91';

    fetch(url, {mode: 'no-cors'}).then(response =>{
      //console.log(response)
      fetch('http://35.161.99.113:9000/webapi/t_login/verifyOtp', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          u_number:this.state.mobile_no,  
          otp:random
          })
      }).then(result =>{
          console.log("verify",result)
      })
 })

  }

  handleotp = e => {
    this.setState({ otp: e.target.value })
  }

  close2 = () => this.setState({ open2: false })

  verify = (size) => {
    this.close2()
    this.setState({ size, open2: true })

    if(!this.state.otp){
      this.setState({warning:"Please enter otp"})
    }else{
        fetch('http://35.161.99.113:9000/webapi/t_login/otpCheck', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          u_number:this.state.mobile_no,  
          otp:this.state.otp
          })
      }).then(result =>{
          console.log("result",result)
       //   this.verifyOtp()
      })
    }

    
  }

  handlepass = e => {
    this.setState({ pass: e.target.value })
  }

  update = (size) => {
    this.close2()

    fetch('http://35.161.99.113:9000/webapi/t_login/changePass', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        u_number:this.state.mobile_no,  
        u_pass:this.state.pass
        })
    }).then(result =>{
        console.log("update",result)
        //this.verifyOtp()
    })
  }

  render() {
    const{
      mobile_no,
      password,
      warning,
      open,
      size,
      open1,
      size1,
      otp,
      open2,
      size2,
      pass,
      isSucess,error,roleData
  } = this.state


    return (
      <div className="App" style={{ marginTop: "10px" }}>

      <Grid columns="two">
          <Grid.Row>
            <Grid.Column>
              <Image
                style={{ marginTop: "-20px", marginBottom: "-20px" }}
                src="/assets/img/signinBackground.png"
                fluid
              />
            </Grid.Column>
            <Grid.Column>
              <Container style={{ marginTop: "15em" }}>
                <Grid textAlign="center">
                  <Grid.Row>
                    <font
                      style={{
                        textTransform: "uppercase",
                        fontSize: "xx-large"
                      }}
                    >
                   <Image src='/assets/images/logo.png' />
                    </font>
                  </Grid.Row>
                  <Grid.Row>

                    
                    <font color="grey">
                      Welcome back! Please login to your account.
                    </font>
                  </Grid.Row>
                  <Grid.Row>
                  <Form>
            <Form.Field>
              <label style={formLabel}>Mobile Number</label>
              <div className="space"></div>
              <input placeholder='Enter Mobile number' 
              style={formInput}
              ref={input => (this.mbno = input)}
              value={mobile_no} 
              onChange={this.handleMobile}
              maxLength="10"
              />
            </Form.Field>
            <div className="space"></div>
            <Form.Field>
              <label style={formLabel}>Password</label>
              <div className="space"></div>
              <input placeholder='Enter Password Here' 
              placeholder='Password'
              type='password'
              value={password}
              onChange={this.handlePass}
              style={formInput}
              />
            </Form.Field>
          </Form>

          <p style={{ color: "red" }}>{this.state.message}</p>

          <br/>
          <br/><br/>
          
                  </Grid.Row>
                  <Grid.Row>
          <div className="">
          <Button style={logButton} onClick={()=>this.loggedIn()}>LOG IN</Button>
           <p style={{ color: "red" }}>{this.state.warning}</p>
           </div>
                  </Grid.Row>
                  <Grid.Row>
          
          <br/>
            <center><Link to ="/Signup" as ="a"><span>New user? </span><span className="amt">Register here..</span></Link></center>
                    
                  </Grid.Row>
                  <Grid.Row>
                  <p className="" style={{ float: "right",color:"#4183c4" }} onClick={() =>this.show('tiny')}>Forgot Password?</p>
                  </Grid.Row>
                </Grid>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>




      

      <Modal size={size} open={open} onClose={this.close}>
        {/*<Header icon='arrow left' content='Reset Password' />*/}
        <Modal.Content>  
         <p className="gold">Do you want to reset password via OTP verification {mobile_no} ?</p> 
         <div className="space"></div>
         <p>Via OTP Verification.</p>

          <Grid centered columns={2}>
            <Grid.Column>
              <div className="inline fields">
                <div className="eight wide field">
                  <Button type='submit' style={resetStyle1} className="ui button" onClick={this.close}>Cancel</Button>
                  <Button type='submit' style={resetStyle} className="ui button" onClick={()=> this.reset('tiny')}>Ok</Button>            
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Modal.Content>
     </Modal>


     <Modal size={size1} open={open1} onClose={this.close1}>
        <Modal.Content>  
         <Grid.Column mobile={16} tablet={8} computer={4}>

        <center><p className="gold" style={w1}>A message with a otp is on its way </p></center> 
        <center><p className="gold" style={w1}>just stay put...</p></center>
        <div className="space"></div>
          <Form>
            <Form.Field>
              <Grid centered columns={2}>
                <Grid.Column>
                    <input placeholder='Enter Otp received here'  
                        value={otp}
                        onChange={this.handleotp}
                        required
                        style={formInput}
                    />
                  </Grid.Column>
              </Grid>
            </Form.Field>
          </Form>                       
         </Grid.Column>
          <br/>
          <Grid centered columns={2}>
            <Grid.Column>
              <div className="inline fields">
                <div className="eight wide field">
                  <Button type='submit' style={resetStyle1} className="ui button" onClick={this.close1}>Cancel</Button>
                  <Button type='submit' style={resetStyle} className="ui button" onClick={this.verify}>Verify</Button>            
                </div>
              </div>

              <p style={{color:"red"}}>{warning}</p>
            </Grid.Column>
          </Grid>
        </Modal.Content>
     </Modal>


    <Modal size={size2} open={open2} onClose={this.close2}>
      <br/>
        <center><Modal.Header style={header}>Change Password</Modal.Header></center>
      <br/>
      <div className="content_border"></div>
      <Modal.Content>  
      <Grid centered columns={2}>
      <Grid.Column>
        <p className="gold" style={w1}>Sweet ! OTP verified.</p> 
        <p className="gold" style={w1}>Change your password below.</p> 
        <p className="gold" style={w1}>Try not to forget it this time.</p> 

        <Grid.Column mobile={16} tablet={8} computer={4}>

        <Grid columns={4}>
          <Grid.Row>
              <Grid.Column>
                <p className="white">Username :</p>
              </Grid.Column>
              <Grid.Column>
                <p>{mobile_no}</p>
              </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="space"></div>
        <Form>
          <Form.Field>
              <label>Enter new password</label>
              <input placeholder='Enter new password' 
                  type="password" 
                  value={pass}
                  onChange={this.handlepass}
                  required
                  style={formInput}
              />
          </Form.Field>

          <Form.Field>
              <label >Retype password</label>
              <input placeholder='Retype password'  
                  type="password"
                  value={pass}
                  onChange={this.handlepass}
                  required
                  style={formInput}
              />
          </Form.Field>
        </Form>                       
        </Grid.Column>
        
        <br/>
        <div className="inline fields">
          <div className="eight wide field">
            <Button type='submit'  style={resetStyle1} className="ui button" onClick={this.close2}>Cancel</Button>
            <Button type='submit' style={resetStyle} className="ui button" onClick={this.update}>Update</Button>            
          </div>
        </div>
        <br/>

        <p>For Queries and Questions feel free to call our customer care facility</p>

        <span>+91 7861998866</span>
        <br/>
        <br/>
        <div className="content_border"></div>
        </Grid.Column>
          </Grid>
      </Modal.Content>
    </Modal>


  
    {this.state.redirectToTixy  && <Redirect to="/DashBoard" push/>}
      
    {error == true ?(
    <ErrorModal isopen={this.state.isopen} msg={this.state.errorMsg} onClose={this.close}/>
  ):(
    <div>
    </div>
  )}

    {isSucess == true ?(
    <SuccessModal isopen={this.state.isSucess} msg={this.state.SuccessMsg} onClose={this.close}/>
  ):(
    <div>
    </div>
  )}
      
      </div>

      
    );
  }
}


const logButton = {
   background: "#863577",
  boxShadow: "0 0 0 1px #D7A01D inset",
  //padding: "16px 16%",
  color: "#ffffff"
}

const formInput = {

boxShadow: "0 0 0 1px #ffffff inset",
padding:"14px"
}

const formLabel = {
fontWeight:"400",
fontSize:"16px"
}

const resetStyle = {
backgroundColor: "#D7A01D",
padding: "14px 10%",
color:"#863577",
fontSize:"20px",
fontWeight:"300"
}

const resetStyle1 = {
backgroundColor: "transparent",
padding: "14px 6%",
color:"#863577",
fontSize:"20px",
fontWeight:"300"
}

const white = {
fontSize:"18px"
}

const header = {
color:"#ffffff",
fontSize:"16px"
}

const w1 = {
fontSize:"16px"
}
export default SignIn;
