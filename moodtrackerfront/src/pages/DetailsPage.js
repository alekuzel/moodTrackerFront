import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNotes();
  }, [currentPage]); // Fetch notes when page changes

  const fetchNotes = async () => {
    const userId = localStorage.getItem('userid');
    try {
      // Fetch user-specific notes for the current page
      const response = await axios.get(`http://localhost:3000/notes/users/${userId}`, {
        params: {
          page: currentPage,
          limit: 15 // Limit to 15 notes per page
        }
      });
      console.log('Response data:', response.data); // Add this line
      console.log('Notes:', response.data.notes); // Add this line
      console.log('Total pages:', response.data.totalPages); // Add this line
      setNotes(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage);
  };

  return (
    <div>
      <h1>User Notes</h1>
      <div>
        {notes.map(note => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>Date: {new Date(note.date).toLocaleDateString()}</p>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
    </div>
  );
}

export default Notes;
