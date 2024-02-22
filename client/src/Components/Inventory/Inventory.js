import React, { useState } from 'react';
import axios from 'axios';
import './Inventory.css';

const Inventory = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    publish_date: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://library-management-1-swlh.onrender.com/books', formData)
      .then(response => {
        console.log(response.data);
   
        setFormData({
          title: '',
          author: '',
          subject: '',
          publish_date: ''
        });
        alert("Book Added Successful");
      })
      .catch(error => {
        console.error('Error adding book: ', error);
        alert("Error in adding the Book")
      });
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-header"> Inventory </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input className="form-input" type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Author:</label>
          <input className="form-input" type="text" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Subject:</label>
          <input className="form-input" type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Publish Date:</label>
          <input className="form-input" type="date" name="publish_date" value={formData.publish_date} onChange={handleChange} />
        </div>
        <button className="submit-button" type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default Inventory;
