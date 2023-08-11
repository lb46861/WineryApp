import React, { useState, useEffect, useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import { Card, CardContent, Grid, Typography, TextField } from '@mui/material';
import { ApiContext } from '../context/apiConext';
import { WINE_PATH } from '../utils/constants';

const ITEMS_PER_PAGE = 25;

function Home() {
  const apiContext = useContext(ApiContext);
  const [wines, setWines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiContext.apiCall('get', WINE_PATH).then(response => {
      if(response?.data?.data) setWines(response.data.data);
    });
  }, [apiContext]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredWines = wines.filter(wine =>
    wine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedWines = filteredWines.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Grid container spacing={2}>
        {paginatedWines.map(wine => (
          <Grid item key={wine.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {wine.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Price: {wine.price} €
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Alc./vol. {wine.alcoholPercentage}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredWines.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
}

export default Home;
