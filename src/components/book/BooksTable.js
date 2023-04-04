import React, {useEffect, useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

  export const BooksTable = (props) => {
    const [books, setBooks] = useState([]);

    const url = 'http://localhost:8080/books';
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBooks(data);
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/");
     });;
      
    }, []);
  
    if (books.length === 0) {
      return <div>Loading...</div>
    }
  
    return (
      <div className="container">
        <h1>Books</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Available</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td > <center>{book.available}</center></td>
                <td><button disabled={book.available <= 0} className='btn btn-primary'> borrow </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default BooksTable;
  