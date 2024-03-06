// Importing necessary libraries and components
import React, { useState, useEffect, useRef } from 'react'; // React library and hooks
import axios from 'axios'; // Library for making HTTP requests
import Chart from 'chart.js/auto'; // Library for creating charts
import { Col, Container, Row } from 'react-bootstrap'; // Bootstrap components for layout

// Function component for displaying a mood chart
function MoodsChart({ updateGraph }) {
  // State variables
  const [moodData, setMoodData] = useState([]); // Array to hold mood data
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Date object for the selected month
  const chartRef = useRef(null); // Reference to the chart object
  const currentMonth = selectedMonth.toLocaleString('en-US', { month: 'long' }); // String representation of the current month

  // Function to fetch mood data from the server
  const fetchMoodData = () => {
    // Variables for the start and end dates of the selected month
    let startDate, endDate;

    // Setting the start and end dates based on the selected month
    startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

    // Fetching the user ID from local storage
    const userId = localStorage.getItem('userid');

    // Making a GET request to the server to fetch mood data for the selected month
    axios
      .get(`http://localhost:3000/moods/users/${userId}`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      })
      .then((response) => {
        // Updating the mood data state variable with the fetched data
        setMoodData(response.data);
      })
      .catch((error) => {
        // Logging any errors to the console
        console.error('Error fetching mood data:', error);
      });
  };

  // Function to render the mood chart
  const renderChart = () => {
    // Destroying the current chart if it exists
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    // Filtering the mood data for the selected month
    const filteredMoodData = moodData.filter((mood) => {
      const moodDate = new Date(mood.date);
      return moodDate.getMonth() === selectedMonth.getMonth() && moodDate.getFullYear() === selectedMonth.getFullYear();
    });

    // Getting the number of days in the selected month
    const numDaysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();

    // Creating arrays for the chart labels and data
    const labels = Array.from({ length: numDaysInMonth }, (_, index) => index + 1);
    const lowMood = new Array(numDaysInMonth).fill(null);
    const highMood = new Array(numDaysInMonth).fill(null);
    const hoursOfSleep = new Array(numDaysInMonth).fill(null);
    const minutesOfPhysicalActivity = new Array(numDaysInMonth).fill(null);

    // Populating the data arrays with the filtered mood data
    filteredMoodData.forEach((mood) => {
      const dayOfMonth = new Date(mood.date).getDate();
      lowMood[dayOfMonth - 1] = mood.low;
      highMood[dayOfMonth - 1] = mood.high;
      hoursOfSleep[dayOfMonth - 1] = mood.sleep;
      minutesOfPhysicalActivity[dayOfMonth - 1] = mood.move;
    });

    // Creating the chart
    const ctx = document.getElementById('moodsChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Low Mood',
            data: lowMood,
            borderColor: 'rgb(241, 22, 8)',
            borderWidth: 1,
            tension: 0.1,
            yAxisID: 'mood',
          },
          {
            label: 'High Mood',
            data: highMood,
            borderColor: 'rgb(58, 240, 4)',
            borderWidth: 1,
            tension: 0.1,
            yAxisID: 'mood',
          },
          {
            label: 'Hours of Sleep',
            data: hoursOfSleep,
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
            tension: 0.1,
            yAxisID: 'hoursOfSleep',
          },
          {
            label: 'Minutes of Physical Activity',
            data: minutesOfPhysicalActivity,
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            tension: 0.1,
            yAxisID: 'minutesOfPhysicalActivity',
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days of the Month',
            },
          },
          mood: {
            position: 'left',
            title: {
              display: true,
              text: 'Mood',
            },
            min: -5,
            max: 5,
          },
          hoursOfSleep: {
            position: 'right',
            title: {
              display: true,
              text: 'Hours of Sleep',
            },
          },
          minutesOfPhysicalActivity: {
            position: 'right',
            title: {
              display: true,
              text: 'Minutes of Physical Activity',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  // Fetching mood data when the selected month changes
  useEffect(() => {
    fetchMoodData();
  }, [selectedMonth]);

  // Rendering the chart when the mood data or selected month changes
  useEffect(() => {
    if (moodData.length > 0) {
      renderChart();
    }
  }, [moodData, selectedMonth]);

  // Rendering the chart when the updateGraph prop changes
  useEffect(() => {
    renderChart();
  }, [updateGraph]);

  // Functions to handle the previous and next month buttons
  const handlePrevMonth = () => {
    setSelectedMonth(prevMonth(selectedMonth));
  };
  const handleNextMonth = () => {
    setSelectedMonth(nextMonth(selectedMonth));
  };

  // Functions to calculate the previous and next months
  const prevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  };
  const nextMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

  // Rendering the component
  return (
    <div className="chart-container" style={{ overflowX: 'auto', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px', width: '80%', margin: '0 auto', marginBottom: '2vh' }}>
      <Container className="mt-5">
        <Row className="mb-3">
          <Col xs={4}>
            <button className="btn btn-primary" onClick={handlePrevMonth}>
              &lt; Previous Month
            </button>
          </Col>
          <Col xs={4} className="d-flex justify-content-center align-items-center">
            <h1>{currentMonth}</h1>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleNextMonth}>
              Next Month &gt;
            </button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <canvas id="moodsChart" width="400" height="200"></canvas>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// Exporting the component
export default MoodsChart;