import React, {useEffect, useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { url } from '../../App';

  export const LoanTable = (props) => {
    const [loans, setloans] = useState([]);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
      fetch(url+'loans', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setloans(data);
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/");
     });;
      
    }, []);
  
    const loading =  (loans.length === 0);
    if (loading) {
      return (
        <div className="container text-center">
          <h1> loading...</h1>
        </div>
      )
    }
    return (
      <div className="">
        <div className=''>
        {/* {loans && <h1> Hello {loans[0].user.firstname} {loans[0].user.lastname}!</h1>} */}
        <h1>Loans</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Return date</th>
              <th>Returned</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.book.title}</td>
                <td>{loan.book.author}</td>
                <td>{loan.dateDue}</td>
                <td>{loan.returned === true ? "Yes" : "No" }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default LoanTable;
  