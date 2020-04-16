import React from "react"
import { Button } from 'react-bootstrap'

class AddUser extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e)
    {
        e.preventDefault();
        this.props.onAddUser();
    }
    render() {
        return (
            <div className="card" >
                <div className="card-header">Add User</div>
                <div className="card-body">
                    <div className="card-title">Welcome {this.props.username}</div>
                    <div className="card-text">
                        You are not registered with us, please click on 
                        <Button onClick={this.handleSubmit}>Register Me</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUser