import React, { Component } from 'react';
import axios from "axios"
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'admin1@gmail.com',
      password:'password',
      redirect: false
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleClick =() =>{
   console.log(this.props);
    this.props.history.push('/register');
  }
  
  handleSubmit(event){
    console.log("clicked");
    event.preventDefault();
    const user = {
      email:this.state.email,
      password: this.state.password
    };
  
    
    axios.post(`http://192.168.0.66:8000/api/v1/user/login`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(" before storing "+res.data.token);
        localStorage.setItem('userToken', res.data.token);
        console.log("storage token "+localStorage.getItem('userToken'));
        
        console.log(this.props);
        
        return <Redirect to="/" />
       
        
        
      },err=>{
        alert(JSON.stringify(err));
      });

  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText >
                            <i className="icon-user"></i>
                          </InputGroupText >
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" 
                        value={this.state.email}  
                        onChange={this.handleInputChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password"
                          name="password"
                        value={this.state.password}  
                        onChange={this.handleInputChange} 
                        autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleSubmit} >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" onClick={this.handleClick}  active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
