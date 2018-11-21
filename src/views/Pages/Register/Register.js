import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from "axios"
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'admin5@gmail.com',
      password:'password',
      lastname:'namelast',
      firstname:'first name',
      mobile:'071'
      
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    
    
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  registerUser(){
    
    const user = {
      email:this.state.email,
      password: this.state.password,
      firstname:this.state.firstname
    };
    alert(user.email);
   console.log(user);
    axios.post(`http://192.168.0.66:8000/api/v1/users/`, user)
      .then(res => {
        console.log(res.data);
        if(res.data!=null){
          alert("data added success");
        }
       
      },err=>{
        alert(JSON.stringify(err));
      });
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="firstname" 
                      name="firstname" 
                      value={this.state.firstname}  
                      onChange={this.handleInputChange}
                      autoComplete="firstname" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="lastname" 
                      name="lastname" 
                      value={this.state.lastname}  
                      onChange={this.handleInputChange}
                      autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="email" 
                      name="email" 
                      value={this.state.email}  
                      onChange={this.handleInputChange} 
                      autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="password" 
                      name="password" 
                      value={this.state.password}  
                      onChange={this.handleInputChange} 
                      autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Conform  password" 
                      name="confirmPassword" 
                      value={this.state.password}  
                      onChange={this.handleInputChange}
                      autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" placeholder="Mobile" 
                      name="mobile1" 
                      value={this.state.mobile}  
                      onChange={this.handleInputChange} 
                      autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
