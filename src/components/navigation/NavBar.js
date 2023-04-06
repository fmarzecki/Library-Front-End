import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/books">Books</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/loans">Loans</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
                </li>
            </ul>
            <form className="d-flex" role="search">
                <button className="btn btn-outline-success" onClick={handleSubmit}>Log out</button>
            </form>
            </div>
        </div>
        </nav>
  );
};

export default NavBar;