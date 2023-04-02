import { useState, useEffect} from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import BooksTable from './components/BooksTable'
import RegisterForm from './components/RegisterForm'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  const url = 'http://localhost:8080/test/admin';
  const token = localStorage.getItem('token');

  useEffect( () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // przekieruj do /books
    })
    .catch(error => console.error(error));
  },[])


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"  element={<LoginForm />} />
        <Route path="/books"   element={<BooksTable />} />
        <Route path="/register"   element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );

  
}

export default App;
