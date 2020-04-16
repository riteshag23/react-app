import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Modal } from 'react-bootstrap'
import UserService from "../userService";

class FromRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getDefault();
        this.userService = new UserService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onHide = this.onHide.bind(this);
        this.photoChange = this.photoChange.bind(this);
    }

    getDefault() {
        return {
            userId: 0,
            userName: "",
            email: "",
            photo: null,
            designation: "",
            department: "",
            reportingManager: "",
            region: "",
            office: "",
            users: [],
            managers: [],
            departments: [],
            designations: [],
            regions: [],
            validated: false,
            showPopup: false
        };
    }

    setUser(user) {
        return {
            userName: user.userName,
            email: user.email,
            designation: user.designation,
            department: user.department,
            reportingManager: user.reportingManager,
            region: user.region,
            office: user.office
        };
    }

    componentDidMount() {
        if (this.props.addMode)
            this.retrieveADUser(this.props.username);
        else
            this.getUser(this.props.username);
        this.retrieveReportingManagers();
        this.retrieveDepartments();
        this.retrieveDesignations();
        this.retrieveRegions();
    }

    getUser(username) {
        this.userService.getUser(username).then(result => {
            this.setState(this.setUser(result))
        });
    }

    retrieveADUser(username) {
        this.userService.getAdUser(username)
            .then(result => {
                this.setState(this.setUser(result));
                console.log('Fetched AD user from API')
            })
            .catch(error => console.log('Error in getting users from API:' + error));
    }

    retrieveReportingManagers() {
        this.userService.getReportingMangers()
            .then(result => {
                this.setState({
                    managers: result
                });
                console.log('Fetched reporting managers from API')
            })
            .catch(error => console.log('Error in getting reporting managers from API:' + error));
    }
    retrieveDepartments() {
        this.userService.getDepartments()
            .then(result => {
                this.setState({
                    departments: result
                });
                console.log('Fetched departments from API')
            })
            .catch(error => console.log('Error getting departments from API:' + error));
    }

    retrieveDesignations() {
        this.userService.getDesignations()
            .then(result => {
                this.setState({
                    designations: result
                });
                console.log('Fetched designations from API')
            })
            .catch(error => console.log('Error in getting designations from API:' + error));
    }

    retrieveRegions() {
        this.userService.getRegions()
            .then(result => {
                this.setState({
                    regions: result
                });
                console.log('Fetched regions from API')
            })
            .catch(error => console.log('Error in getting regions from API:' + error));
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }
    fileChange(e) {
        this.setState({ photo: e.target.files[0] });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            let userId = this.state.userId;
            const user = {
                _id: this.state.userId,
                userName: this.state.userName,
                email: this.state.email,
                designation: this.state.designation,
                department: this.state.department,
                reportingManager: this.state.reportingManager,
                region: this.state.region,
                office: this.state.office,
                photo: "",
                isRegistered: 1,
                isActive: 1
            };

            const { userName, photo } = this.state;
            const {props } = this.props;
            const service = this.userService;
            const formData = new FormData();
            formData.append("photo", photo, userName);

            this.userService.saveUser(user)
                .then(result => {
                    console.log('Saving user using API:' + result);                    
                }).then(rs=>{
                    
                    service.uploadPhoto(formData).then(res => {
                        console.log('Uploading photo using API:' + res);
                    });

                    //this.setState({ showPopup: true });
                    alert("Information has been saved successfully!");
                    props.onSubmit();
                })
                .catch(error => console.log('Error in saving user using API:' + error));
        }
        event.preventDefault();
        this.setState({ validated: true });
    }

    onHide() {
        this.setState({ showPopup: false });
        this.props.onSubmit();
    }

    photoChange(e) {
        this.setState({ photo: e.target.files[0] });
    }

    render() {
        const { username } = this.props;
        let userList = this.state.managers.filter(function (p) { return p.userName != username }).map((item) => <option key={item.userName} value={item.userName}>{item.userName}</option>);
        const departmentList = this.state.departments.map((item) => <option key={item.code} value={item.code}>{item.code}</option>);
        const designationList = this.state.designations.map((item) => <option key={item.Name} value={item.Name}>{item.Name}</option>);
        const regionList = this.state.regions.map((item) => <option key={item.Name} value={item.Name}>{item.Name}</option>);


        return (
            <div className="card" >
                <div className="card-header"><h3>{this.props.title}</h3></div>
                <div className="card-body">
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} method="POST">
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    readOnly
                                    name="userName"
                                    type="text"
                                    placeholder="User name"
                                    defaultValue={this.state.userName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    readOnly
                                    name="email"
                                    type="text"
                                    placeholder="Email Id"
                                    defaultValue={this.state.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a email id.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Report Manager</Form.Label>
                                <Form.Control as="select" placeholder="Report Manager" required
                                    name="reportingManager"
                                    value={this.state.reportingManager}
                                    onChange={this.handleChange}>
                                    <option value="">--Select--</option>
                                    {userList}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select report manager.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Photo</Form.Label>
                                <Form.File id="formcheck-api-custom" name="photo" custom  >
                                    <Form.File.Input onChange={this.photoChange} />
                                    <Form.File.Label data-browse="Browse Photo">

                                    </Form.File.Label>
                                    <Form.Control.Feedback type="invalid">Please select image</Form.Control.Feedback>
                                </Form.File>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label>Department</Form.Label>
                                <Form.Control as="select" placeholder="Department" required
                                    name="department"
                                    value={this.state.department}
                                    onChange={this.handleChange}>
                                    <option value="">--Select--</option>
                                    {departmentList}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select department.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom06">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control as="select" placeholder="Designation" required
                                    name="designation"
                                    value={this.state.designation}
                                    onChange={this.handleChange}>
                                    <option value="">--Select--</option>
                                    {designationList}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select designation.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom07">
                                <Form.Label>Region</Form.Label>
                                <Form.Control as="select" placeholder="Region" required
                                    name="region"
                                    value={this.state.region}
                                    onChange={this.handleChange}>
                                    <option value="">--Select--</option>
                                    {regionList}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select region.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom08">
                                <Form.Label>Office</Form.Label>
                                <Form.Control as="select" placeholder="office" required
                                    name="office"
                                    value={this.state.office}
                                    onChange={this.handleChange}>
                                    <option value="">--Select--</option>
                                    <option>Sitapura</option>
                                    <option>City office</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select office.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Button type="submit" className="btn btn-primary btn-block">Submit</Button>
                    </Form>

                    {/* <Modal show={this.state.showPopup} onHide={this.onHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thanks for Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Thanks to register with you!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.onHide}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal> */}

                </div>
            </div>
        );
    }

}

export default FromRegister