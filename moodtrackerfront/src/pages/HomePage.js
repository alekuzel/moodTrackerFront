import React, { useState, useEffect } from 'react';
import MoodsChart from '../components/MoodsChart';
import MoodForm from '../components/MoodForm';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user-specific data from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to your backend API to fetch user data
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Include authentication token
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

  return (
    <div style={{ marginLeft: '15vw', paddingTop: '15vh' }}>
      <h2 style={{ color: 'black' }}>This is the Home page</h2>
      
      {/* Display user-specific data if available */}
      {userData && (
        <>
          <MoodsChart userData={userData} />
          {/* Insert other components to display user-specific data */}
          <MoodForm />
        </>
      )}

      {/* Display a loading indicator while fetching data */}
      {!userData && <p>Loading user data...</p>}
    </div>
  );
}

export default Home;
