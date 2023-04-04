import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";

const NavigationPanel = () => {

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        fetch('http://localhost:8080/api/v1/auth/logout', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({}),
        })
          .then((response) => {
            navigate("/");
            console.log('Response status:', response.status);
          })
          .catch((err) => {
            console.log('Error:', err.message);
          });
      };

  return (
    <div className="container">
            <div className="row">
                <Link to="/books" className="col btn btn-primary mx-1 my-1">
                    Books
                </Link>
                <Link to="/" className="col btn btn-info mx-1 my-1">
                    <b> My loans </b>
                </Link>
                <Link onClick={handleSubmit} className="col btn btn-danger mx-1 my-1">
                    Logout
                </Link>
            </div>
    </div>
  );
};

export default NavigationPanel;
