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
      setComponents((prev) => {
        return {
          ...prev,
          // loginForm : false,
          // authorized: true
        }
      })
    })
    .catch(error => console.error(error));
  },[])


  const [components, setComponents] = useState( {
      loginForm : true,
      registerForm: false,
      authorized: false
  });

  return (
    <div>
      { components.loginForm &&
      <LoginForm 
      setComponents={setComponents}
      />}


      {components.registerForm &&
      <RegisterForm  
      setComponents={setComponents}
      />}

      {components.authorized &&
      <BooksTable />
      }
    </div>
  );

  
}

export default App;
