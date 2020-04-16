import React from 'react'
import { Card } from 'react-bootstrap'

const UserDetail = (props) => {    

    const {userName, email, photo, department, designation, office} = props.user;
    const editProfile = (e) =>{
        alert('clicked');
    };
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="`data:image/jpeg;base64,${photo}`" />
            <Card.Body>
                <Card.Title>{userName}</Card.Title>
                <Card.Text>
                   {
                       email + '<br />' + department + '<br />' + designation + '<br />' + office
                   }
                </Card.Text>
                <Button variant="primary" onClick={editProfile}>Edit Profile</Button>
            </Card.Body>
        </Card>
    );

}

export default UserDetail