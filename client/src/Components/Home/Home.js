import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    subject: '',
    publish_date: ''
  });

  const [allBooks, setAllBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [filters, currentPage]);

  useEffect(() => {
    populateDropdownOptions();
  }, [allBooks]);

  const fetchBooks = () => {
    let filteredBooks = allBooks.filter(book => {
      return (
        book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
        book.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
        book.publish_date.toLowerCase().includes(filters.publish_date.toLowerCase())
      );
    });
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    setTotalPages(totalPages);

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const slicedBooks = filteredBooks.slice(startIndex, endIndex);
    setBooks(slicedBooks);
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handlePageChange = direction => {
    setCurrentPage(prevPage => {
      if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1;
      } else if (direction === 'next' && prevPage < totalPages) {
        return prevPage + 1;
      } else {
        return prevPage;
      }
    });
  };

  const handleGetAllBooks = () => {
    axios.get('https://library-management-1-swlh.onrender.com/books/all')
      .then(response => {
        setAllBooks(response.data);
        fetchBooks(); // Fetch books after getting all books
      })
      .catch(error => {
        console.error('Error fetching all books: ', error);
      });
  };

  const populateDropdownOptions = () => {
    const authors = Array.from(new Set(allBooks.map(book => book.author)));
    const publishDates = Array.from(new Set(allBooks.map(book => book.publish_date)));
    const subjects = Array.from(new Set(allBooks.map(book => book.subject)));

    setDropdownOptions({
      authors: authors,
      publishDates: publishDates,
      subjects: subjects
    });
  };

  const [dropdownOptions, setDropdownOptions] = useState({
    authors: [],
    publishDates: [],
    subjects: []
  });

  return (
    <div className='bg'>
      <div className='top_cont'>
        <h1 className='head'>Library Management System</h1>
        <button className='top_btn'><Link to='/invent'>Inventory</Link></button>
      </div>
      <div className='bottom_cont'>
        <div className='search'>
          <input type="text" name="title" onChange={handleFilterChange} className='input_field' placeholder='Search The Books' />
        </div>
        <div className='filters'>
          <div className='filter_top'>
            <h3 className='filter_head'>Filters</h3>
          </div>
          <div className='filter_criteria'>
            <div className='filter_dropdown'>
              <label>Publish Date:</label>
              <select value={filters.publish_date} onChange={handleFilterChange} name="publish_date">
                <option value="">All</option>
                {dropdownOptions.publishDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            <div className='filter_dropdown'>
              <label>Author:</label>
              <select value={filters.author} onChange={handleFilterChange} name="author">
                <option value="">All</option>
                {dropdownOptions.authors.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>
            <div className='filter_dropdown'>
              <label>Subject:</label>
              <select value={filters.subject} onChange={handleFilterChange} name="subject">
                <option value="">All</option>
                {dropdownOptions.subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='Table'>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Subject</th>
                <th>Publish Date</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.subject}</td>
                  <td>{book.publish_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
        <button onClick={handleGetAllBooks}>Get Books</button>
      </div>
    </div>
  );
};

export default Home;
