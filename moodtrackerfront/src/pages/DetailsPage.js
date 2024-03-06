import React, { useState, useEffect } from 'react'; // Importing React and necessary hooks
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'; // Importing Bootstrap components for styling

function Notes() {
  // State variables for managing notes and pagination
  const [notes, setNotes] = useState([]); // Array to store notes
  const [currentPage, setCurrentPage] = useState(1); // Current page of notes
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [editingNoteId, setEditingNoteId] = useState(null); // ID of note being edited
  const [editedTitle, setEditedTitle] = useState(''); // Edited title of the note
  const [editedText, setEditedText] = useState(''); // Edited text of the note
  const navigate = useNavigate(); // Navigation hook

  // Use effect hook to fetch notes when the current page changes
  useEffect(() => {
    fetchNotes();
  }, [currentPage]);

  // Function to fetch notes from the server
  const fetchNotes = async () => {
    const userId = localStorage.getItem('userid'); // Get user ID from local storage
    try {
      // Check if the user is authenticated
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Redirect to login page if not authenticated
        navigate('/login');
        return;
      }
  
      // Fetch user-specific notes for the current page, sorted by newest first
      const response = await axios.get(`http://localhost:3000/notes/users/${userId}`, {
        params: {
          page: currentPage,
          limit: 15, // Limit to 15 notes per page
          sort: '-date' // Sort by date in descending order (newest first)
        },
        headers: {
          'Authorization': `Bearer ${accessToken}` // Include authentication token
        }
      });
  
      // Sort notes from new to old based on their date
      const sortedNotes = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setNotes(sortedNotes); // Update notes state
      setTotalPages(response.data.totalPages); // Update total pages
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  

  // Function to handle navigation to the previous page
  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  };

  // Function to handle navigation to the next page
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage);
  };

  // Function to handle editing a note
  const handleEdit = (noteId, title, text) => {
    setEditingNoteId(noteId); // Set the ID of the note being edited
    setEditedTitle(title); // Set the edited title
    setEditedText(text); // Set the edited text
  };

  // Function to handle saving an edited note
  const handleSave = async (noteId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Redirect to login page if not authenticated
        navigate('/login');
        return;
      }

      // Update the note with the edited title and text
      await axios.put(`http://localhost:3000/notes/${noteId}`, {
        title: editedTitle,
        text: editedText,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // Clear the editing state
      setEditingNoteId(null);
      setEditedTitle('');
      setEditedText('');

      // After successful update, refetch notes to update the UI
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // Function to handle deleting a note
  const handleDelete = async (noteId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Redirect to login page if not authenticated
        navigate('/login');
        return;
      }

      // Delete the note with the provided noteId
      await axios.delete(`http://localhost:3000/notes/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // After successful deletion, refetch notes to update the UI
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Return JSX for rendering the component
  return (
    <Container style={{ marginTop: '12vh' }}>
      <h1 className="my-4">User Notes</h1>
      {/* Rendering notes */}
      <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2} className="g-4">
        {notes.map(note => (
          <Col key={note._id}>
            <Card className="mb-3" style={{ backgroundColor: '#F3F2E8' }}>
              <Card.Body>
                {/* Conditional rendering for editing mode */}
                {editingNoteId === note._id ? (
                  <Form.Group>
                    {/* Input for editing title */}
                    <Form.Control
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  </Form.Group>
                ) : (
                  <Card.Title>{note.title}</Card.Title>
                )}
                {/* Displaying note date */}
                <Card.Text>Date: {new Date(note.date).toLocaleDateString()}</Card.Text>
                {/* Conditional rendering for editing mode */}
                {editingNoteId === note._id ? (
                  <Form.Group>
                    {/* Textarea for editing text */}
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                  </Form.Group>
                ) : (
                  <Card.Text>{note.text}</Card.Text>
                )}
                {/* Conditional rendering for buttons */}
                {editingNoteId === note._id ? (
                  // Button for saving edited note
                  <Button variant="success" className="me-2" onClick={() => handleSave(note._id)}>Save</Button>
                ) : (
                  // Button for editing note
                  <Button variant="primary" className="me-2" onClick={() => handleEdit(note._id, note.title, note.text)}>Edit</Button>
                )}
                {/* Button for deleting note */}
                <Button variant="danger" onClick={() => handleDelete(note._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Pagination */}
      <Row className="my-3">
        <Col className="text-center">
          {/* Button for previous page */}
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</Button>
          {/* Display current page and total pages */}
          <span className="mx-2"> Page {currentPage} of {totalPages} </span>
          {/* Button for next page */}
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Notes; // Exporting Notes component
