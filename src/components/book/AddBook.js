import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { url } from '../../App';
import { Form } from 'react-bootstrap';

const AddBook = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        available: "",
      });
    
    const { title, author, availableAt } = formData;
      
    useEffect(() => {
        fetch(url+"test/admin", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setIsAdmin(true);
        })
        .catch((err) => {
          console.log(err.message);
      });
    }, []);

    const handleRefresh = () => {
        window.location.reload();
      };

    const handleSubmit = () => {
        fetch(url+'books', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then(data => {
          })
          .catch((err) => {
            alert("Provide proper details");
        });

        handleRefresh();
        
    }

    const handleChange = ({target}) => {
        setFormData({ ...formData, [target.name]: target.value });
    };

    if (!isAdmin) {
        return ;
    }

    return (
        <tr >
            <td>
            <Form.Control className="form-control mb-2 mb-sm-0" 
                type="text" placeholder='Title' name='title'
                onChange={handleChange}
                value={title}
                required />
                </td>
            <td>
            <Form.Control  className="form-control mb-2 mb-sm-0" 
                type="text" placeholder='Author' name='author'
                onChange={handleChange}
                value={author}
                required /> 
                </td>
                
            <td>
            <Form.Control className="form-control mb-2 mb-sm-0"
                type="text" placeholder='How many?' name='available'
                onChange={handleChange} 
                value={availableAt}
                required />
                </td>
            <td>
            <button
            className='btn btn-primary'
            onClick={handleSubmit}> Add&nbsp;&nbsp; </button>
            </td>
        </tr>
    )
}

export default AddBook;