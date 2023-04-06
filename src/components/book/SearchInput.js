import React from "react";

function TextInput(props) {
  return (
    <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand"><h1>Books</h1></a>
      <form class="d-flex" role="search">
        <input class="form-control me-2"
              type="text"
              placeholder="Search" 
              aria-label="Search"
              onChange={(e) => props.setFilter(e.target.value.toLowerCase())}/>
        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
      </form>
    </div>
  </nav>
  );
}

export default TextInput;
