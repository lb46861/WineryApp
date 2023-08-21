import React, { useState, useEffect, useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import { Card, CardContent, Grid, Typography, TextField, CircularProgress } from '@mui/material';
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



  const generateBuffer = (wine) => {
    const uint8Array = new Uint8Array(wine.image.data.data);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String
  }


  return (
    <>
      <Grid container spacing={2}  style={{padding: "50px 10%"}}>
        <Grid item xs={12}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
       </Grid>
        {wines?.length ? (paginatedWines.map(wine => (
          <Grid item key={wine._id} xs={12} sm={3} md={2}>

            <Card
              sx={{
                position: 'relative',
                maxWidth: '100%',
                minHeight: 400,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '00%',
                  left: '10%',
                  right: '10%',
                  bottom: '10%',
                  backgroundImage: `url(data:${wine.image.contentType};base64,${generateBuffer(wine)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  opacity: 0.6,  
                }}
              />
    
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" component="div">
                  {wine.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Price: {wine.price} €
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Alc./vol. {wine.alcoholPercentage}%
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  More info
                </Typography>
              </CardContent>
            </Card>

          </Grid>
        ))
        )
        : <CircularProgress />
      }
      <Grid item xs={12}>
        <Pagination
          count={Math.ceil(filteredWines.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
      </Grid>
    </>
  );
}

export default Home;
