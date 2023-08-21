import React, { useState, useEffect, useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import { Card, CardContent, Grid, Typography, TextField, CircularProgress } from '@mui/material';
import { ApiContext } from '../context/apiContext';
import { WINE_PATH } from '../utils/constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserContext } from '../context/userContext';
import PromptDialog from '../component/Dialog';


const ITEMS_PER_PAGE = 25;

function Home() {
  const apiContext = useContext(ApiContext);
  const { user } = useUserContext();
  const [wines, setWines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedWine, setSelectedWine] = useState()


  useEffect(() => {
    apiContext.apiCall('get', WINE_PATH).then(response => {
      if(response?.data?.data) setWines(response.data.data);
    });
  }, [apiContext]);

  const handleDeleteClick = (event) => {
    event.preventDefault();
    apiContext.apiCall('delete', `${WINE_PATH}/${selectedWine}`).then(() => {
      const updatedWines = wines.filter(wine => wine._id !== selectedWine);
      setWines(updatedWines);
      handleClose()
    });
  }

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

  const handleClickOpenUpdate = () => {

  }

  const handleClickOpenDelete = (wineId) => {
    setSelectedWine(wineId);
    setOpenDelete(true);
  }

  const handleClose = () => {
    // setOpenUpdate(false);
    setOpenDelete(false);
  };


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


                
                {
                ((user) && (user.role ==='administrator')) &&
                (
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <EditIcon sx={{cursor: 'pointer', fill: '#54626F'}} onClick={() => handleClickOpenUpdate(wine._id)}></EditIcon>
                  </Grid>   

                  <Grid item>
                  <DeleteIcon  sx={{cursor: 'pointer', fill: '#EE4B2B'}} onClick={() => handleClickOpenDelete(wine._id)}></DeleteIcon>
                  </Grid>
                </Grid>
                )
                }

              </CardContent>
            </Card>

          </Grid>
        ))
        )
        : <CircularProgress />
      }

      <PromptDialog
        open={openDelete}
        onClose={handleClose}
        title={'Delete Wine'}
        body={'Are you sure you want delete this wine?'}
        handleCancel={handleClose}
        handleConfirm={handleDeleteClick}
      />
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
