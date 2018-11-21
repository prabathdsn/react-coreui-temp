import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios"
import usersData from './UsersData'
import socketIOClient from "socket.io-client";

class User extends Component {
  constructor(props){
    super(props);
    this.state={
      token:localStorage.getItem('userToken'),
      users:[],
      togleUpdatePage:true,
      //for iso client
      response: false,
      endpoint: "http://192.168.0.66:9000"

    };
    this.getAllUsers = this.getAllUsers.bind(this);
    this.delUser = this.delUser.bind(this);
    this.updateUsr = this.updateUsr.bind(this);
    this.logout=this.logout.bind(this);
  }
//calls the methods inside from the start
  componentDidMount() {
    this.getAllUsers();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint,{transports:['websocket','polling','flashsocket']});
    socket.on("channel-list-user", data => {
      this.getAllUsers()
    });
 }
  getAllUsers(){
    console.log("toen in home page   "+this.state.token);
    axios.get(`http://192.168.0.66:8000/api/v1/users/`, {headers: { Authorization: "bearer "+this.state.token}})
      .then(res => {
        console.log(res.data);
        console.log(this.state.token);
        this.setState({users:res.data});
        
        if(res.data!=null){
          console.log(res);
          console.log(this.state.users[0].id);
        console.log(res.data[0].id);
        }
       
      },err=>{
        alert(JSON.stringify(err));
      });
  }
  delUser(user) {
    let userId = user.id;
    
    // make api call
    console.log("toen in home page   "+user.id);
    axios.delete(`http://192.168.0.66:8000/api/v1/users/`+user.id,
      {headers: { Authorization: "bearer "+this.state.token}})
      .then(res => {
        console.log(res.data);
       
        console.log(this.state.users[0].id);
      },err=>{
        alert(JSON.stringify(err));
      });
  }
  updateUsr(user){
    
    let userId = user.id;
    this.togleUpdatePage=true;
    alert(this.state.togleUpdatePage);
    this.render();
    window.location.href = "../update";
    
  }
  logout(event){
    localStorage.removeItem('userToken');
    window.location.href = "../login";
  }
  render() {

    const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    if(localStorage.getItem('userToken')!=null){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                  <thead>
                  <tr>
                    <th className="tableheder1">ID</th>
                    <th className="tableheder1">Email</th>
                    <th className="tableheder1">First Name</th>
                    <th className="tableheder1">Last Name</th>
                    <th className="tableheder1">Mobile</th>
                    <th className="tableheder1">Email Verified At</th>
                    <th className="tableheder1">Created At</th>
                    <th className="tableheder1">Updated At</th>
                    <th colSpan="2" className="tableheder1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.users.map((user, i) => <TableRow key = {i} 
                  data = {user} actionDel={this.delUser} actionUp={this.updateUsr}/>)}
                </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
  else{
        window.location.href = "../login";
  }
  }
}
class TableRow extends React.Component {
  render() {
     return (
        <tr>
           <td>{this.props.data.id}</td>
           <td>{this.props.data.email}</td>
           <td>{this.props.data.firstname}</td>
           <td>{this.props.data.lastname}</td>
           <td>{this.props.data.mobile}</td>
           <td>{this.props.data.email_verified_at}</td>
           <td>{this.props.data.created_at}</td>
           <td>{this.props.data.updated_at}</td>
           <td><button onClick={() => this.props.actionDel(this.props.data)} className="delBtn"> Delete  </button></td>
           <td><button onClick={() => this.props.actionUp(this.props.data)} className="upBtn"> Update  </button></td>
           
        </tr>
     );
  }
}
export default User;
