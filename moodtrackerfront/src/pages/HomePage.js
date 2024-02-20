import React from 'react';
import MoodsChart from '../components/MoodsChart';


function Home() {
  return (
    <div style={{ marginLeft: '15vw', paddingTop: '15vh' }}>
      <h2 style={{ color: 'black' }}>This is the Home page</h2>
      <MoodsChart />
    </div>
  );
}

export default Home;
