import React from 'react';
import MoodsChart from '../components/MoodsChart';
import MoodForm from '../components/MoodForm'; // Import the MoodForm component

function Home() {
  return (
    <div style={{ marginLeft: '15vw', paddingTop: '15vh' }}>
      <h2 style={{ color: 'black' }}>This is the Home page</h2>
      
      <MoodsChart />
      
      {/* Insert the MoodForm component here */}
      <MoodForm />
    </div>
  );
}

export default Home;
