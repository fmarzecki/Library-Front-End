import { useState, useEffect} from 'react';
import './App.css';
import {LoginForm} from './components/LoginForm'
import {BooksTable} from './components/BooksTable'
import {RegisterForm} from './components/RegisterForm'


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
      setAuthorized(true);
      setLoginForm(false);
    })
    .catch(error => console.error(error));
  },[])


  const [authorized, setAuthorized] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div>
      { loginForm &&
      <LoginForm 
      setRegister={setRegisterForm} 
      setAuthorized={setAuthorized}
      setLogin={setLoginForm}
      />}


      { registerForm &&
      <RegisterForm  
      setRegister={setRegisterForm}
      setLogin={setLoginForm}
      />}

      {authorized &&
      <BooksTable />
      }
    </div>
  );

  
}

export default App;
