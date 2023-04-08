import './App.css';
import LoginForm from './components/authenticate/LoginForm'
import RegisterForm from './components/authenticate/RegisterForm'
import BooksTable from './components/book/BooksTable'
import LoanTable from './components/loan/LoanTable'
import UserDetails from './components/user/UserDetails';
import NavBar from './components/navigation/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const url = "http://localhost:8080/";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route exact path="/"  element={<LoginForm />} />
          <Route path="/books"   element={<BooksTable />} />
          <Route path="/loans"   element={<LoanTable />} />
          <Route path="/register"   element={<RegisterForm />} />
          <Route path="/myAccount"   element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;