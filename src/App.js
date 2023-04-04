import { useState, useEffect} from 'react';
import './App.css';
import LoginForm from './components/authenticate/LoginForm'
import BooksTable from './components/book/BooksTable'
import RegisterForm from './components/authenticate/RegisterForm'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NavigationPanel from './components/navigation/NavigationPanel';


function App() {

  return (
    
    <BrowserRouter>
    <NavigationPanel />
      <Routes>
        <Route exact path="/"  element={<LoginForm />} />
        <Route path="/books"   element={<BooksTable />} />
        <Route path="/register"   element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );

  
}

export default App;
