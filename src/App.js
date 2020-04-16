import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FromRegister from "./components/FromRegister";
import AddUser from "./components/AddUser"
import { Nav, Navbar, Modal } from 'react-bootstrap'
import UserService from "./userService";
import Chart from "./components/Chart"



class App extends Component {
  constructor(props) {
    super(props);
    this.userName = "Sudha";
    this.state = { isUserRegistered: false, isNewUser: false, users: [] };
    this.userService = new UserService();
    this.verifyUser = this.verifyUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  componentDidMount() {
    this.verifyUser();
    this.getUsers();
  }

  verifyUser() {
    this.userService.verifyUser(this.userName)
      .then(result => {
        this.setState({ isUserRegistered: result.Registered });
        console.log(result.Registered)
      })
      .catch(error => {
        this.setState({ isUserRegistered: false });
        console.log('Error in verifying user from API:' + error);
      });
  }

  getUsers() {
    this.userService.getUsers()
      .then(result => {
        this.setState({ users: result });
        console.log(result)
      })
      .catch(error => {
        console.log('Error in getting users from API:' + error);
      });
  }

  addUser() {
    this.setState({ isNewUser: true });
  }

  onSubmitUser() {
    this.setState({ isNewUser: false, isUserRegistered: true });
  }

  showEditForm(value) {
    this.setState({
      showEdit: value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="#home">Employee Management</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end .navbar-nav">
                <Navbar.Text>
                  <span>Welcome {this.userName} | <Nav.Link href="#home" onClick={() => this.showEditForm(true)}>Edit Profile</Nav.Link></span>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p>&nbsp;</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            &nbsp;
          </div>
          <div className="col-sm-8">
            {
              this.state.isUserRegistered ?
                <Chart users={this.state.users} /> :
                (this.state.isNewUser ? <FromRegister username={this.userName} title='Add User' addMode={this.state.isNewUser} onSubmit={this.onSubmitUser} /> : <AddUser username={this.userName} onAddUser={this.addUser} />)
            }

          </div>
          <div className="col-sm-2">
            &nbsp;
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Modal  show={this.state.showEdit} onHide={() => this.showEditForm(false)} closeButton>
              {/* <Modal.Header closeButton>
                <Modal.Title><h2>Edit Profile</h2></Modal.Title>
              </Modal.Header> */}
              <Modal.Body>
                <FromRegister username={this.userName} title='Edit User' addMode={this.state.isNewUser} onSubmit={this.onSubmitUser} />
              </Modal.Body>
            </Modal>  
          </div>
        </div>
      </div>

    );
  }
}

export default App;
