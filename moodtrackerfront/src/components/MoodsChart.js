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

    const labels = moodData.map(mood => new Date(mood.date).toLocaleDateString());
    // Assuming you have a 'date' field in mood objects
    const averageMood = moodData.map(mood => (mood.high + mood.low) / 2); // Calculate average mood
    const hoursOfSleep = moodData.map(mood => mood.sleep); // Assuming you have a 'sleep' field in mood objects
    const minutesOfPhysicalActivity = moodData.map(mood => mood.move); // Assuming you have a 'move' field in mood objects

    // Chart.js setup
    const ctx = document.getElementById('moodsChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Mood',
          data: averageMood,
          borderColor: 'rgb(54, 162, 235)', // You can customize the color as needed
          tension: 0.1,
          yAxisID: 'mood'
        }, {
          label: 'Hours of Sleep',
          data: hoursOfSleep,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          yAxisID: 'hoursOfSleep'
        }, {
          label: 'Minutes of Physical Activity',
          data: minutesOfPhysicalActivity,
          borderColor: 'rgb(255, 205, 86)',
          tension: 0.1,
          yAxisID: 'minutesOfPhysicalActivity'
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days of the Month'
            }
          },
          mood: {
            position: 'left',
            title: {
              display: true,
              text: 'Mood'
            },
            min: -5,
            max: 5
          },
          hoursOfSleep: {
            position: 'right',
            title: {
              display: true,
              text: 'Hours of Sleep'
            }
          },
          minutesOfPhysicalActivity: {
            position: 'right',
            title: {
              display: true,
              text: 'Minutes of Physical Activity'
            }
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
