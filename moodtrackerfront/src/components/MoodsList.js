import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MoodsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make GET request to your MongoDB REST API
    axios.get('http://localhost:3000/moods')
      .then(response => {
        // Handle successful response
        setData(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div>
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map(mood => (
          <li key={mood._id}>{mood.high}</li>
        ))}
      </ul>
    </div>
  );
}

export default MoodsList;
