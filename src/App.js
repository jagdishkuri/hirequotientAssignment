import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import HoldingsTable from './components/HoldingsTable';
import './App.css'; // Importing external CSS file

function App() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://canopy-frontend-task.now.sh/api/holdings')
      .then(response => {
        setHoldings(response.data.payload);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="app-container">
      <Typography variant="h4" className="app-heading">
      HireQuotient Assignment
      <hr/>
      </Typography>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <HoldingsTable holdings={holdings} />
      )}
    </Container>
  );
}

export default App;
