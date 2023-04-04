import React, { useState } from "react";
import {Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    alert('clicked');
    e.preventDefault();

    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
       })
       .catch((err) => {
        console.log('Error:', err.message);
      });

  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="border p-5 rounded">
        <h3 className="mb-4">Register:</h3>

        <div className="form-group">
          <label>Username:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your name"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last name:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your last name"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-control"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">Submit</button>

        <div className="mt-3">
          <p><b> Click to <Link to="/"> login </Link> </b></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
