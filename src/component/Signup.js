import React, { Component } from 'react';
import '../App.css';
import '../dashboard.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Header ,Form , Grid, Image,Modal,Input} from 'semantic-ui-react'
import {Route, Switch,Link , Redirect} from "react-router-dom"
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

class Signup extends Component {
    state ={ 
        s_name:"",
        address:"",
        district:"",
        message:"",
        state:"",
        pincode:"",
        mobile_no:"",
        email_id:"",
        password:"",
        shop_type:"",
        type_of_service_provided:"",
        shop_owner:"",
        shop_owner_mobile_no:"",
        shop_owner_email_id:"",
        shop_act_no:"",
        shop_details:"",
        loading:true,
        selectedOption:"",
        showOptionArrays : [],
        selectedSubCategory :"",
        msg:"",
        size:"",
        open:"",
        Name:"",
        empCode:"",
        role:"",
        email:""
      }
    
      // handleName = e => {
      //   this.setState({Name:e.target.value})
      // } 

      onChange = (address) =>{
        console.log("Address is",address)
                this.setState({ address ,msg:""})
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
    
      handleName = e =>{
        this.setState({Name:e.target.value})
      }
    

    
      handleaddress = e =>{
        this.setState({address:e.target.value})
      }
    
      handleEmp = e =>{
        this.setState({empCode:e.target.value})
      }
    
     
      handlemobile = e =>{
        if(this.validateNumber(e.target.value)){
          this.setState({mobile_no:e.target.value})
        }    
        //this.setState({mobile_no:e.target.value})
      }
    
    
      validateEmail = (email_id , email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email_id ,email);
      }
    
      handlepass = e =>{
        this.setState({password:e.target.value})
      }
    
      handleRole = e =>{
        console.log("role is",e.target.value)
        this.setState({role:e.target.value})
      }
  
    
      handleSubmit = () => {
    
        console.log("category",this.state.selectedOption)
        console.log("subcategory",this.state.selectedSubCategory)


          if(!this.state.Name){
            this.setState({message:"Please enter Name"})
          }else if(!this.state.mobile_no){
            this.setState({message:"Please enter mobile number"})
          }
          else if(!this.state.role){
            this.setState({message:"Please Select Role"})
          }else if(!this.state.address){
            this.setState({message:"Please enter address"})
          }else if(!this.state.empCode){
            this.setState({message:"Please enter Emp Code"})
          }else if(!this.state.password){
            this.setState({message:"Please enter password"})
          }else{
            fetch('http://35.161.99.113:9000/webapi/t_login/new_user', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: this.state.Name,
                Address: this.state.address, 
                empcode:this.state.empCode,
                mobile_num:this.state.mobile_no,
                password:this.state.password,
                role:this.state.role,
                email:this.state.email

              })
            }).then(adddata =>{
              console.log("result",adddata)
                adddata.json().then(data => { 
                   console.log("final data",data) 

                   if(data.message === 'User Created'){
                      this.setState({msg:data.message})
                      setTimeout(() => {
                        this.show('small')
                      }, 2000);
                      
                   }else{
                    return
                   }

                });
            })
          }
      }

      show = (size) => {
        this.setState({ size, open: true })          
      }
    
      close1 = () => this.setState({ open1: false })


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



  render() {


    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    const { 
        Name,
        address,
        empCode,
        state ,
        pincode,
        mobile_no,
        email_id,
        password,
        shop_type,
        type_of_service_provided,
        shop_owner,
        shop_owner_mobile_no,
        shop_owner_email_id,
        shop_act_no,
        shop_details,
        selectedOption,
        msg,
        open,
        size,
        role,
        email
      } = this.state

      
    return (
      <div className="App " style={{ marginTop: "10px" }}>
        <Grid centered columns={2}>
            <Grid.Column>
              <div className="shop">
               <center><p className="mhourz">Thermodynamic Services</p></center>
           
               <div className="content_border" />
                  <center><p style={caStyle}>Create Account</p></center>
               <div className="content_border" />

              <Form>
                <div className="space"></div>
                <Form.Group widths='equal'>
                <Form.Field className="label">
                <label>Name</label>
                <input placeholder='Enter Name' 
                value={Name}
                onChange={this.handleName}
                style={formInput}
                />
            </Form.Field>

            </Form.Group>
                  <div className="space"></div>
                  <Form.Group widths='equal'>
                    <Form.Field className="label">
                      <label className="label">Mobile Number</label>
                      <input placeholder='Enter mobile number' 
                      ref={input => (this.mbno = input)}
                      value={mobile_no} 
                      onChange={this.handlemobile}
                      maxLength="10"
                      style={formInput}
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

                <Form.Group widths='equal'>
                  <Form.Field className="label">
                    <label>Password</label>
                    <input placeholder='Enter password' type="password"
                    value={password}
                    onChange={this.handlepass}
                    style={formInput}
                    required
                    />
                  </Form.Field>
                  </Form.Group>

                  <Form.Field className="label">
                  </Form.Field>
                  <Form.Group widths='equal'>
                  <Form.Field className="label">
                    <label>Address</label>
                    <PlacesAutocomplete inputProps={inputProps} />
                  </Form.Field>
                </Form.Group>

                <div className="space"></div>
                <Form.Group widths='equal'>
                <Form.Field className="label">
                <label>Emp Code</label>
                <input placeholder='Enter Emp code' 
                value={empCode}
                onChange={this.handleEmp}
                style={formInput}
                required
                />
            </Form.Field>

            </Form.Group>

            <Form.Group widths='equal'>
            <Form.Field className="label">
            <label>Role</label>
          
              <select value={role} onChange={this.handleRole} required>
              <option value="" disabled selected hidden>
              Select Role
               </option>
              <option value="Admin">Admin</option>
              <option value="CEO/Director">CEO/Director</option>
              <option value="Business Manager">Business Manager</option>
              <option value="Service Manager">Service Manager</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Sales Engineer">Sales Engineer</option>
              <option value="Service Engineer">Service Engineer</option>
              <option value="Back Office Executive">Back Office Executive</option>
              <option value="Back Office Support">Back Office Support</option>
              <option value="HR/IT Manager">HR/IT Manager</option>
              <option value="SHR Executive<">HR Executive</option>
              <option value="Accounts Manager">Accounts Manager</option>
              <option value="Accounts Executive">Accounts Executive</option>
              <option value="Operation Manger">Operation Manger</option>

              <option value="Atlas Sales- HOD">Atlas Sales- HOD</option>

              <option value="Thermax Sales - HOD">Thermax Sales - HOD</option>

              <option value="Buhler Sales - HOD">Buhler Sales - HOD</option>

              <option value="Atlas Service- HOD">Atlas Service- HOD</option>

              <option value="Thermax Service- HOD">Thermax Service- HOD</option>
              <option value="Buhler Service-HOD">Buhler Service-HOD</option>

              </select>
              </Form.Field>
                </Form.Group>
              
                </Form>
              
                <div className="">
                <p style={{ color: "red" }}>{this.state.message}</p>
                     <center> <Button type='submit' style={logButton} className="ui button" onClick={this.handleSubmit}>SIGN UP</Button></center>
                     <p className="amt">{msg}</p>
                     </div>
                <center><span style={caStyle}>Already Registered ?</span><Link as="a" to="/" style={caStyle} className="linkClr"> Click here to Sign In...</Link></center>
              </div>
            </Grid.Column>
        </Grid>

        <Modal size={size} open={open} onClose={this.close} style={{background:"#111111"}}>

          <div className="space"></div>
          <center><Modal.Header className="white" style={f1}>Account Created</Modal.Header></center>
          <div className="space"></div>
          <div className="content_border"></div>

            <Modal.Content>  
              <center><p className="gold" style={f2}>Your ThermoDynamic account has been created,</p></center>
              <center><p className="gold" style={f2}>Please wait for approval from our side</p></center>
              <div className="space"></div>
              <div className="space"></div>
              <div className="space"></div>
            
              <center><p style={f3} className="gClr">Thanks for Signing Up with US !</p></center>
              <div className="content_border"></div>
              <center><p style={f3} className="linkClr">Welcome to <span style={f3} className="gold">ThermoDynamic </span>family...</p></center>
              <div className="space"></div>
              <div className="space"></div>

              <center><Link as="a" to="/" style={logButton} className="ui button gold"><p>Jump to Log in Page</p></Link></center>
            </Modal.Content>

          <Modal.Actions>
           <center><p className="white" style={f3}>For any Questions and Queries Feel Free to contact us on</p></center>
           <center><p style={f3} className="gold">info@thermodynamic.co.in  </p></center>
          </Modal.Actions>
        </Modal>



        {this.state.redirectTologin && (
          <Redirect to="/" push/>
        )}
      </div>
    );
  }
}


const f1 ={
  fontSize:"3em"
}

const f2 ={
  fontSize:"2em"
}
const f3 ={
  fontSize:"1.5em"
}


const w1 = {
  fontSize:"17px",
  color:"#4183c4"
}

const caStyle = {
  fontSize:"16px",
}

const formInput = {
 
  boxShadow: "0 0 0 1px #ffffff inset",
 
  padding:"12px"
}

const logButton = {
  background: "#863577",
  boxShadow: "0 0 0 1px #D7A01D inset",
  padding: "16px 16%",
  color: "#ffffff"
}

export default Signup;
