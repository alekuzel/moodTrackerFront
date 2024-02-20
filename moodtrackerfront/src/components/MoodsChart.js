import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function MoodsChart() {
  const [moodData, setMoodData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch mood data from your REST API
    axios.get('http://localhost:3000/moods')
      .then(response => {
        // Assuming response.data is an array of mood objects
        setMoodData(response.data);
      })
      .catch(error => {
        console.error('Error fetching mood data:', error);
      });
  }, []);

  useEffect(() => {
    // Render chart when moodData changes
    if (moodData.length > 0) {
      renderChart();
    }
  }, [moodData]);

  const renderChart = () => {
    // Destroy previous chart instance if it exists
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const labels = moodData.map(mood => mood.date); // Assuming you have a 'date' field in mood objects
    const data = moodData.map(mood => mood.mood); // Assuming you have a 'mood' field in mood objects

    // Chart.js setup
    const ctx = document.getElementById('moodsChart');
    chartRef.current = new Chart(ctx, {
      type: 'line', // Change to 'bar' for a bar chart
      data: {
        labels: labels,
        datasets: [{
          label: 'Mood',
          data: data,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            min: -5,
            max: 5
          }
        }
      }
    });
  };

  return (
    <div>
      <h1>Mood Chart</h1>
      <canvas id="moodsChart" width="400" height="200"></canvas>
    </div>
  );
}

export default MoodsChart;
