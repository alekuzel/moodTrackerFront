import React from 'react';
import MoodsList from '../components/MoodsList';


function Home() {
  return (
    <div style={{ marginLeft: '15vw', paddingTop: '15vh' }}>
      <h2 style={{ color: 'black' }}>This is the Home page</h2>
      <MoodsList />
    </div>
  );
}

export default Home;
