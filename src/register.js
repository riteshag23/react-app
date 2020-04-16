import React, {Component} from "react"
import UserService from "./userService";


class Registration extends Component
{          
    constructor(props)
    {
        super(props);
        this.state = this.getDefault();
        this.submitClick = this.submitClick.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        this.userService = new UserService();
        this.validate = this.validate.bind(this);
    }

    getDefault()
    {
        return {userName: "", email: "", designation:"", department:"",reporting:"", 
        emailError: "",
        users:[], departments:[],designations:[]};
    }

    componentDidMount()
    {   
        console.log("Calling API...");  
        this.retrieveUsers();
        this.retrieveDepartments();
        this.retrieveDesignations();
        console.log("Calling API Ended...")
    }

    validate()
    {
        if(!this.state.email.includes("@"))
        {
            this.setState({emailError : "email is not valid!"});
            return false;
        }

        return true;
    }

    retrieveUsers()
    {
        this.userService.getUsers()
        .then(result => {
            this.setState({ 
                users: result
            }); 
            console.log('Fetched users from API')
        })
        .catch(error => console.log('Error in getting users from API:' + error));
    }

    retrieveDepartments()
    {
        this.userService.getDepartments()
        .then(result => {
            this.setState({ 
                departments: result
            }); 
            console.log('Fetched departments from API')
        })
        .catch(error => console.log('Error getting departments from API:' + error));
    }

    retrieveDesignations()
    {
        this.userService.getDesignations()
        .then(result => {
            this.setState({ 
                designations: result
            }); 
            console.log('Fetched designations from API')
        })
        .catch(error => console.log('Error in getting designations from API:' + error));
    }

    

    reload()
    {
        this.setState({users:this.userStore.getUsersById()}) ; 
    }

    handleChange(event)
    {
        const name =event.target.name;
        this.setState({
            [name] : event.target.value
        });        
    }
    submitClick(event)
    {
        const isValid = this.validate();
        if(isValid)
        {
            console.log("Value:" + this.state.userName + " " + this.state.email + " " + this.state.designation);
            let len = this.state.users.length;
            let userId = this.state.users[len-1].UserId +1 
            const user = {
                UserId: userId,
                UserName: this.state.userName,
                Email:this.state.email,
                DesignationId: this.state.designation,
                DepartmentId: this.state.department,
                ReportingManagerId:this.state.reporting,
                IsRegistered: 1,
                IsActive: 1
            };

            this.userService.saveUser(user)
                .then(result => {
                // this.setState({ 
                //     users: result
                // }); 
                console.log('Saving user using API:' + result)
            })
            .catch(error => console.log('Error in saving user using API:' + error));

            this.setState(this.getDefault());
        }
        event.preventDefault();
    }
    render()
    {        
        const userList = this.state.users.map((item)=><option key={item.UserId} value={item.UserId}>{item.UserName}</option> );
        const departmentList = this.state.departments.map((item)=><option key={item.DepartmentId} value={item.DepartmentId}>{item.DepartmentCode}</option> );
        const designationList = this.state.designations.map((item)=><option key={item.DesignationId} value={item.DesignationId}>{item.DesignationName}</option> );

        return(
            <form onSubmit={this.submitClick}>
                <label>User Name:</label>
                <input name="userName" type="text" onChange={this.handleChange}/>               
                <br/>
                <label>Email:</label>
                <input name="email" type="text" onChange={this.handleChange} />
                <div style={{color:'red'}}>{this.state.emailError}</div>
                <br/>
                <label>Designation:</label>
                <select name="designation" value={this.state.designation} onChange={this.handleChange}>
                    <option value="">-Selct-</option>
                    {
                        designationList
                    }                    
                </select>
                <br/>
                <label>Department:</label>
                <select name="department" value={this.state.department} onChange={this.handleChange}>
                    <option value="">-Selct-</option>
                    {
                        departmentList
                    } 
                </select>
                <br/>
                <label>Reporting Person:</label>
                <select name="reporting" value={this.state.reporting} onChange={this.handleChange}>
                    <option value="">-Selct-</option>
                    {
                        userList
                    } 
                </select>
                <br/>
                <input type="submit" value="Save" />
                <br />
                <span>{this.state.value}</span>
            </form>
        );
    }
}

export default Registration