import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Col, Container, Row } from 'react-bootstrap';

function MoodsChart({ updateGraph }) {
  const [moodData, setMoodData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const chartRef = useRef(null);
  const currentMonth = selectedMonth.toLocaleString('default', { month: 'long' }); 

  const fetchMoodData = () => {
    let startDate, endDate;

    if (selectedMonth.getMonth() + 1 < 10) {
      startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
      endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    } else {
      startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
      endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    }

    const userId = localStorage.getItem('userid');

    axios
      .get(`http://localhost:3000/moods/users/${userId}`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      })
      .then((response) => {
        setMoodData(response.data);
        updateGraph();
      })
      .catch((error) => {
        console.error('Error fetching mood data:', error);
      });
  };

  const renderChart = () => {
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const filteredMoodData = moodData.filter((mood) => {
      const moodDate = new Date(mood.date);
      return moodDate.getMonth() === selectedMonth.getMonth() && moodDate.getFullYear() === selectedMonth.getFullYear();
    });

    const numDaysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();

    const labels = Array.from({ length: numDaysInMonth }, (_, index) => index + 1);

    const averageMood = new Array(numDaysInMonth).fill(null);
    const hoursOfSleep = new Array(numDaysInMonth).fill(null);
    const minutesOfPhysicalActivity = new Array(numDaysInMonth).fill(null);

    filteredMoodData.forEach((mood) => {
      const dayOfMonth = new Date(mood.date).getDate();
      averageMood[dayOfMonth - 1] = (mood.high + mood.low) / 2;
      hoursOfSleep[dayOfMonth - 1] = mood.sleep;
      minutesOfPhysicalActivity[dayOfMonth - 1] = mood.move;
    });

    const ctx = document.getElementById('moodsChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Mood',
            data: averageMood,
            borderColor: 'rgb(199, 0, 57)',
            tension: 0.1,
            yAxisID: 'mood',
          },
          {
            label: 'Hours of Sleep',
            data: hoursOfSleep,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            yAxisID: 'hoursOfSleep',
          },
          {
            label: 'Minutes of Physical Activity',
            data: minutesOfPhysicalActivity,
            borderColor: 'rgb(255, 205, 86)',
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

  useEffect(() => {
    fetchMoodData();
  }, [selectedMonth]);

  useEffect(() => {
    if (moodData.length > 0) {
      renderChart();
    }
  }, [moodData, selectedMonth]);

  const handlePrevMonth = () => {
    setSelectedMonth(prevMonth(selectedMonth));
  };

  const handleNextMonth = () => {
    setSelectedMonth(nextMonth(selectedMonth));
  };

  const prevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  };

  const nextMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

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
            <h1>Mood Chart: {currentMonth}</h1>
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

export default MoodsChart;
