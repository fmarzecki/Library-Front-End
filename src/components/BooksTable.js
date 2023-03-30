import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const BooksTable = (props) => {
  const books = [
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', available: true },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', available: false },
    { title: '1984', author: 'George Orwell', available: true },
    { title: 'Pride and Prejudice', author: 'Jane Austen', available: false }
  ];

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
    })
    .catch(error => console.error(error));

  },[])

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
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td > {book.available ? 'Yes' : 'No'}</td>
              <td><button class='btn btn-primary'> borrow </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;