import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedText, setEditedText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, [currentPage]); // Fetch notes when page changes

  const fetchNotes = async () => {
    const userId = localStorage.getItem('userid');
    try {
      // Check if the user is authenticated
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Redirect to login page if not authenticated
        navigate('/login');
        return;
      }

      // Fetch user-specific notes for the current page
      const response = await axios.get(`http://localhost:3000/notes/users/${userId}`, {
        params: {
          page: currentPage,
          limit: 15 // Limit to 15 notes per page
        },
        headers: {
          'Authorization': `Bearer ${accessToken}` // Include authentication token
        }
      });
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

  const handleEdit = (noteId, title, text) => {
    setEditingNoteId(noteId);
    setEditedTitle(title);
    setEditedText(text);
  };

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

  return (
    <Container>
      <h1 className="my-4">User Notes</h1>
      {notes.map(note => (
        <Card key={note._id} className="mb-3">
          <Card.Body>
            {editingNoteId === note._id ? (
              <Form.Group>
                <Form.Control
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </Form.Group>
            ) : (
              <Card.Title>{note.title}</Card.Title>
            )}
            <Card.Text>Date: {new Date(note.date).toLocaleDateString()}</Card.Text>
            {editingNoteId === note._id ? (
              <Form.Group>
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
            {editingNoteId === note._id ? (
              <Button variant="success" className="me-2" onClick={() => handleSave(note._id)}>Save</Button>
            ) : (
              <Button variant="primary" className="me-2" onClick={() => handleEdit(note._id, note.title, note.text)}>Edit</Button>
            )}
            <Button variant="danger" onClick={() => handleDelete(note._id)}>Delete</Button>
          </Card.Body>
        </Card>
      ))}
      <Row className="my-3">
        <Col className="text-center">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</Button>
          <span className="mx-2"> Page {currentPage} of {totalPages} </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Notes;
