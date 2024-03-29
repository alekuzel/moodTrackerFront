import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import '../MoodForm.css'; // Import the CSS file for styling

function MoodForm({ updateGraph }) {
  const [low, setLowMood] = useState(0);
  const [high, setHighMood] = useState(0);
  const [sleep, setHoursOfSleep] = useState(0); // Initialize as a number
  const [move, setPhysicalActivity] = useState(0); // Initialize as a number
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [text, setNotes] = useState('');

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve userId from local storage
    let userid = localStorage.getItem('userid');
  
    // Check if userId is retrieved from local storage
    if (!userid) {
      console.error('User ID not found in local storage');
      return; // Exit the function if userId is not found
    }
  
    // Send mood data to moods API along with userId
    const moodData = {
      low: low,
      high: high,
      sleep: parseFloat(sleep),
      move: parseInt(move),
      date: date,
      userid: userid, // Use correct casing for userId
    };
  
    try {
      // Save mood data
      const moodResponse = await fetch('http://localhost:3000/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moodData),
      });
  
      // Check if mood data is saved successfully
      if (!moodResponse.ok) {
        throw new Error('Failed to save mood data');
      }
  
      // Update the graph after successful save
      updateGraph(); // Call the updateGraph function here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();

    // Only save notes if the text field has more than 10 characters
    if (text.length <= 10) {
      console.log('Note must have more than 10 characters to be saved');
      return;
    }

    // Retrieve userId from local storage
    let userid = localStorage.getItem('userid');

    // Check if userId is retrieved from local storage
    if (!userid) {
      console.error('User ID not found in local storage');
      return; // Exit the function if userId is not found
    }

    // Send notes data to notes API along with userId
    const notesData = {
      title: title,
      text: text,
      date: date,
      userid: userid, // Use correct casing for userId
    };

    try {
      // Save notes data only if the text field has more than 10 characters
      if (text.length > 10) {
        const notesResponse = await fetch('http://localhost:3000/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notesData),
        });

        // Check if notes data is saved successfully
        if (!notesResponse.ok) {
          throw new Error('Failed to save notes data');
        }
        setTitle('');
        setNotes('');
      }

      // Update the graph after successful save
     
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mood-form-container">
      <div className="instruction-container">
        <p className="instruction">
          Evaluate your best and worst mood during the day from -5 (extremely depressed) to 5 (extremely elevated mood). Write also how many hours did you sleep the night before and how many minutes did you motion (everything counts - training, walking, taking stairs etc) during the day. Write your notes if you feel like it. Keep track of your mood changes, motion and sleeping routine and feel good!
        </p>
      </div>
      <Form className="mood-form">
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Low Mood (-5 to 5):</Form.Label>
              <Form.Control type="range" value={low} onChange={(e) => setLowMood(e.target.value)} min={-5} max={5} />
              <Form.Label className="slider-value">{low}</Form.Label>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>High Mood (-5 to 5):</Form.Label>
              <Form.Control type="range" value={high} onChange={(e) => setHighMood(e.target.value)} min={-5} max={5} />
              <Form.Label className="slider-value">{high}</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Hours of Sleep:</Form.Label>
              <Form.Control type="number" value={sleep} onChange={(e) => setHoursOfSleep(e.target.value)} min={0} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Physical Activity (min):</Form.Label>
              <Form.Control type="number" value={move} onChange={(e) => setPhysicalActivity(e.target.value)} min={0} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button type="submit" onClick={handleMoodSubmit}>Save Mood</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Note:</Form.Label>
              <Form.Control as="textarea" value={text} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <Button type="submit" onClick={handleNoteSubmit}>Save Note</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MoodForm;
