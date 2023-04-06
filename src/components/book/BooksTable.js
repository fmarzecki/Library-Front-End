import React, {useEffect, useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextInput from "./SearchInput";

  export const BooksTable = (props) => {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();

    const url = 'http://localhost:8080/books';
    const token = localStorage.getItem('token');

    useEffect(() => {
      if (books.length === 0) {
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
      alert(target.id);
      
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
        setFilteredBooks(data);
      })
      .catch((err) => {
        console.log(err.message);
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
  