import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { url } from '../../App';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url+ 'user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setIsLoading(false);
      setUser(data);
    })
    .catch((err) => {
      console.log(err.message);
      navigate("/");
   });;
    
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>My Account</Card.Header>
            <Card.Body>
              <Card.Title>{`${user.firstname} ${user.lastname}`}</Card.Title>
              <Card.Text>
                Books borrowed: <b>{user.booksBorrowed}</b>
                <br />
                Account status: <b>{user.enabled ? 'Active' : 'Inactive'}</b> 
                <br />
                Account role: <b>{user.role === "ROLE_ADMIN" ? "ADMIN" : "USER"} </b>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
