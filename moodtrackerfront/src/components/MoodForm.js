import React, { useState } from 'react';
import '../MoodForm.css'; // Import the CSS file for styling

function MoodForm() {
  const [low, setLowMood] = useState(0);
  const [high, setHighMood] = useState(0);
  const [sleep, setHoursOfSleep] = useState(0); // Initialize as a number
  const [move, setPhysicalActivity] = useState(0); // Initialize as a number
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [text, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send mood data to moods API
    const moodData = {
      low: low,
      high: high,
      sleep: parseFloat(sleep),
      move: parseInt(move),
      date: date
    };

    // Send notes data to notes API
    const notesData = {
      title: title,
      text: text
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

      // Save notes data
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

      // Update the graph after successful save
      updateGraph();
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateGraph = () => {
    // Fetch updated data and update the graph
    // Example: Fetch data using fetch or axios, then update the graph
    console.log('Updating graph...');
  };

  return (
    <form className="mood-form" onSubmit={handleSubmit}>
      <label>
        Low Mood (-5 to 5):
        <input type="range" value={low} onChange={(e) => setLowMood(e.target.value)} min={-5} max={5} className="slider" />
        <span className="slider-value">{low}</span>
      </label>
      <label>
        High Mood (-5 to 5):
        <input type="range" value={high} onChange={(e) => setHighMood(e.target.value)} min={-5} max={5} className="slider" />
        <span className="slider-value">{high}</span>
      </label>
      <label>
        Hours of Sleep:
        <input type="number" value={sleep} onChange={(e) => setHoursOfSleep(e.target.value)} min={0} required />
      </label>
      <label>
        Minutes of Physical Activity:
        <input type="number" value={move} onChange={(e) => setPhysicalActivity(e.target.value)} min={0} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Notes:
        <textarea value={text} onChange={(e) => setNotes(e.target.value)}></textarea>
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default MoodForm;
