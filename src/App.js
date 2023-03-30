import { useState } from 'react';
import './App.css';
import {LoginForm} from './components/LoginForm'
import {BooksTable} from './components/BooksTable'
import {RegisterForm} from './components/RegisterForm'


function App() {
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
