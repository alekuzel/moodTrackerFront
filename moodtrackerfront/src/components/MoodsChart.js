import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function MoodsChart() {
  const [moodData, setMoodData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Initially set to current month
  const chartRef = useRef(null);

  useEffect(() => {
    fetchMoodData();
  }, [selectedMonth]);

  const fetchMoodData = () => {
    // Calculate start and end dates for the selected month
    let startDate, endDate;

    if (selectedMonth.getMonth() + 1 < 10) {
      startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
      endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    } else {
      startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
      endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    }

    // Fetch mood data for the selected month from your REST API
    axios.get('http://localhost:3000/moods', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    })
    .then(response => {
      // Assuming response.data is an array of mood objects
      setMoodData(response.data);
    })
    .catch(error => {
      console.error('Error fetching mood data:', error);
    });
};


  useEffect(() => {
    // Render or update chart when moodData or selectedMonth changes
    if (moodData.length > 0) {
      renderChart();
    }
  }, [moodData, selectedMonth]);

  const renderChart = () => {
    // Destroy previous chart instance if it exists
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }
  
    // Filter mood data for the selected month
    const filteredMoodData = moodData.filter(mood => {
      const moodDate = new Date(mood.date);
      return moodDate.getMonth() === selectedMonth.getMonth() && moodDate.getFullYear() === selectedMonth.getFullYear();
    });
  
    // Get the number of days in the selected month
    const numDaysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
  
    // Generate labels for all the days of the month
    const labels = Array.from({ length: numDaysInMonth }, (_, index) => index + 1);
  
    const averageMood = new Array(numDaysInMonth).fill(null); // Initialize array for average mood
    const hoursOfSleep = new Array(numDaysInMonth).fill(null); // Initialize array for hours of sleep
    const minutesOfPhysicalActivity = new Array(numDaysInMonth).fill(null); // Initialize array for minutes of physical activity
  
    // Fill in mood data for days where data is available

    filteredMoodData.forEach(mood => {
      const dayOfMonth = new Date(mood.date).getDate();
      averageMood[dayOfMonth - 1] = (mood.high + mood.low) / 2;
      hoursOfSleep[dayOfMonth - 1] = mood.sleep;
      minutesOfPhysicalActivity[dayOfMonth - 1] = mood.move;
    });
  
    // Chart.js setup
    const ctx = document.getElementById('moodsChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Mood',
          data: averageMood,
          borderColor: 'rgb(54, 162, 235)',
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

  

  const handlePrevMonth = () => {
    setSelectedMonth(prevMonth(selectedMonth));
  };

  const handleNextMonth = () => {
    setSelectedMonth(nextMonth(selectedMonth));
  };

  // Utility functions to get previous and next month
  const prevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  };

  const nextMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

  return (
    <div>
      <div>
        <button onClick={handlePrevMonth}>Previous Month</button>
        <span>{selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>
      <h1>Mood Chart</h1>
      <canvas id="moodsChart" width="400" height="200"></canvas>
    </div>
  );
}

export default MoodsChart;
