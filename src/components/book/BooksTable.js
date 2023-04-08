import React, {useEffect, useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextInput from "./SearchInput";
import { url } from '../../App';
import AddBook from './AddBook';

  export const BooksTable = (props) => {

    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
      if (books.length === 0) {
        fetch(url+"books", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setBooks(data);
          setFilteredBooks(data);
        })
        .catch((err) => {
          console.log(err.message);
          navigate("/");
      });
    }
      loadFilter();
    }, [filter]);
  
    function loadFilter () {
      const newBooks = books.filter(
        (book) => 
          book.title.toLowerCase().includes(filter) ||
          book.author.toLowerCase().includes(filter)
      );
      setFilteredBooks(newBooks);
    }

    const loading = (books.length === 0);
    if (loading) {
      return (
        <div className="container text-center">
          <h1> </h1>
        </div>
      )
    }

    const handleClick = ({target}) => {
      fetch(url+'loans', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: target.id})
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          navigate("/loans")
        })
        .catch((err) => {
          alert("Book already borrowed");
      });
    }

    return (
      <div className="">
        <TextInput setFilter={setFilter}/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Available at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AddBook /> 
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.availableAt}</td>
                <td><button
                id={book.id} 
                onClick={handleClick}
                disabled={book.available <= 0} 
                className='btn btn-primary'> Order </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );


  };
  

  export default BooksTable;
  