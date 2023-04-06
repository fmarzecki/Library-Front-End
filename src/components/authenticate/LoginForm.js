import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginErrorPrompt from "../error/LoginErrorPrompt"

const LoginForm = (props) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const url = "http://localhost:8080/api/v1/auth/authenticate"; // replace with your API endpoint
  const data = { email, password };
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/test/authCheck", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/books");
      })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  }, []);

  const handleSubmit = (event) => {
    console.log(data); 
    event.preventDefault();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/books");
      })
      .catch((err) => {
        console.log('Error:', err.message);
        setLoginError(true);
      });
  };
  return (
    <div className="container d-flex justify-content-center py-5 my-5">
      <form onSubmit={handleSubmit} className="border p-5 rounded">
        <h3 className="mb-4">Login !</h3>

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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>

        <div className="mt-3">
          <p>
            <b>
              {" "}
              Click to <Link to="/register">register </Link>{" "}
            </b>
          </p>
        </div>
        {loginError && <LoginErrorPrompt error="Invalid password or username"/>}
      </form>
    </div>
  );
}

export default LoginForm;
