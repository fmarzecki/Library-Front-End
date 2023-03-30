import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function LoginForm(props) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const url = 'http://localhost:8080/api/v1/auth/authenticate'; // replace with your API endpoint
  const data = {email, password};

  const handleSubmit = (event) => {
    console.log(data);
    event.preventDefault();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // Save token in local storage
      console.log(data);
      localStorage.setItem('token', data.token);
      props.setLogin(false);
      props.setAuthorized(true);
    })
    .catch(error => console.error(error));

  };

  const handleFormChange = () => { 
    props.setRegister(true);
    props.setLogin(false);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="border p-5 rounded">
        <h3 className="mb-4">Login Form</h3>

        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>

        <div className="mt-3">
          <p> <b>Click to <a onClick={handleFormChange} href="#"> register </a> </b> </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
