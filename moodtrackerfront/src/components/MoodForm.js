import React, { useState } from 'react';

function MoodForm() {
  const [lowMood, setLowMood] = useState(0);
  const [highMood, setHighMood] = useState(0);
  const [hoursOfSleep, setHoursOfSleep] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to backend
    const data = {
      lowMood: lowMood,
      highMood: highMood,
      hoursOfSleep: parseFloat(hoursOfSleep),
      physicalActivity: parseInt(physicalActivity),
      date: date,
      title: title,
      notes: notes
    };
    console.log(data); // Just for testing
    // You can send this data to your backend using fetch or axios
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Low Mood (-5 to 5):
        <input type="number" value={lowMood} onChange={(e) => setLowMood(e.target.value)} min={-5} max={5} required />
      </label>
      <label>
        High Mood (-5 to 5):
        <input type="number" value={highMood} onChange={(e) => setHighMood(e.target.value)} min={-5} max={5} required />
      </label>
      <label>
        Hours of Sleep:
        <input type="number" value={hoursOfSleep} onChange={(e) => setHoursOfSleep(e.target.value)} min={0} required />
      </label>
      <label>
        Minutes of Physical Activity:
        <input type="number" value={physicalActivity} onChange={(e) => setPhysicalActivity(e.target.value)} min={0} required />
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
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default MoodForm;
