import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodsChart from '../components/MoodsChart';
import MoodForm from '../components/MoodForm';

function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user-specific data from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if the user is authenticated
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          // Redirect to login page if not authenticated
          navigate('/login');
          return;
        }

        // Make a request to your backend API to fetch user data
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}` // Include authentication token
          }
        });

        if (!response.ok) {
          // Handle unauthorized or other errors
          throw new Error('Failed to fetch user data');
        }

        // Parse the response JSON
        const data = await response.json();

        // Set the user data in state
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Redirect to login page if unauthorized or other errors occur
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Function to update the graph data
  const updateGraph = async () => {
    try {
      // Refetch mood data from the backend API
      const response = await fetch('http://localhost:3000/moods'); // Assuming this is the endpoint to fetch mood data
      
      if (!response.ok) {
        throw new Error('Failed to fetch mood data');
      }

      // Parse the response JSON
      const data = await response.json();

      // Update the mood chart with the new data (not implemented here)
      console.log('New mood data:', data);
    } catch (error) {
      console.error('Error updating graph data:', error);
    }
  };

  return (
    <div style={{ marginLeft: '2vw', paddingTop: '10vh' }}>
      <h2 style={{ color: 'black' }}>Welcome!</h2>
      
      {/* Display user-specific data if available */}
      {userData && (
        <>
          <MoodsChart updateGraph={updateGraph} />
          {/* Pass the updateGraph function to the MoodForm component */}
          <MoodForm updateGraph={updateGraph} />
        </>
      )}

      {/* Display a loading indicator while fetching data */}
      {!userData && <p>Loading user data...</p>}
    </div>
  );
}

export default Home;
