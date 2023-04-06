import './App.css';
import LoginForm from './components/authenticate/LoginForm'
import RegisterForm from './components/authenticate/RegisterForm'
import BooksTable from './components/book/BooksTable'
import LoanTable from './components/loan/LoanTable'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';

export const url = "http://192.168.1.211:8080/" ;

function App() {

  return (
    <div className="container">
      <BrowserRouter>
      {/* <NavigationPanel /> */}
      <NavBar/>
        <Routes>
          <Route exact path="/"  element={<LoginForm />} />
          <Route path="/books"   element={<BooksTable />} />
          <Route path="/loans"   element={<LoanTable />} />
          <Route path="/register"   element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </div>

  );

  
}

export default App;
