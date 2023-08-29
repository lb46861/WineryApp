import React, { useState, useEffect, useContext, useRef } from 'react';
import Pagination from '@mui/material/Pagination';
import { Card, CardContent, Grid, Typography, TextField, CircularProgress, Box, Select, MenuItem, Button } from '@mui/material';
import { ApiContext } from '../context/ApiContext';
import { PRODUCER_PATH, WINE_PATH } from '../utils/constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PromptCrud from '../component/PromptCRUD';
import { useUserContext } from '../context/UserContext';
import { useCartContext } from '../context/CartContext';
import { successToast } from '../utils/ToastNotif'
import { Link } from 'react-router-dom';


const ITEMS_PER_PAGE = 25;

function Home() {
  const apiContext = useContext(ApiContext);
  const { user } = useUserContext();  const { addToCart } = useCartContext();
  const [wines, setWines] = useState([]);
  const [producers, setProducers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false)
  const [selectedWine, setSelectedWine] = useState()
  const [formData, setFormData] = useState('');
  const divRef = useRef();
  const [recall, setRecall] = useState(false);

  useEffect(() => {
    apiContext.apiCall('get', PRODUCER_PATH).then(response => {
      if(response?.data?.data) setProducers(response.data.data);
    });
    apiContext.apiCall('get', WINE_PATH).then(response => {
      if(response?.data?.data) setWines(response.data.data);
    });
  }, [apiContext, recall]);

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    await apiContext.apiCall('delete', `${WINE_PATH}/${selectedWine}`).then(() => {
      const updatedWines = wines.filter(wine => wine._id !== selectedWine);
      setWines(updatedWines);
      handleClose()
    });
  }

  const handleUpdateClick = async(event)=> {
    event.preventDefault();
    const data = new FormData(divRef.current);
    const objectToUpdate = {
      ...(data.get('name') && { name: data.get('name') }),
      ...(data.get('price') && { price: data.get('price') }),
      ...(data.get('alcoholPercentage') && { alcoholPercentage: data.get('alcoholPercentage') }),
      ...(data.get('color') && { color: data.get('color') }),
      ...(data.get('type') && { type: data.get('type') }),
      ...(data.get('image') && { image: data.get('image') }),
      ...(data.get('producer') && { producer: data.get('producer') })
    };

    await apiContext.apiCall('patch', `${WINE_PATH}/${selectedWine}`, objectToUpdate, 'multipart/form-data').then(() => {
      setRecall(!recall);
      handleClose()
    });
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_event, value) => {
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

  const handleClickOpenUpdate = (wine) => {
    setFormData(wine);
    setSelectedWine(wine._id);
    setOpenUpdate(true);
  }

  const handleClickOpenDelete = (wineId) => {
    setSelectedWine(wineId);
    setOpenDelete(true);
  }

  const handleClose = () => {
    setOpenUpdate(false);
    setOpenDelete(false);
  };

  const handleAddToCart = (wine) => {
    successToast('Item successfully added to cart!')
    addToCart(wine);
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
                 <Link  to={`${WINE_PATH}/${wine._id}`}>More info</Link>
                </Typography>


                <Button 
                  sx={{marginTop: 1, marginBottom: 3}} 
                  variant="contained"
                  onClick={() => handleAddToCart(wine)}
                >
                  Add to Cart
                </Button>
                
                {
                ((user) && (user.role ==='administrator')) &&
                (
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <EditIcon sx={{cursor: 'pointer', fill: '#54626F'}} onClick={() => handleClickOpenUpdate(wine)}></EditIcon>
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

      <PromptCrud
        open={openDelete}
        onClose={handleClose}
        title={'Delete Wine'}
        body={'Are you sure you want delete this wine?'}
        handleCancel={handleClose}
        handleConfirm={handleDeleteClick}
      />

      <PromptCrud
        open={openUpdate}
        onClose={handleClose}
        title={'Update Wine'}
        body={
          <Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={formData.name || ''}
              id="name"
              label="Name"
              name="name"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={formData.price || ''}
              id="price"
              label="Price €"
              name="price"
              type="number"
              inputProps={{
                  step: 0.01,
              }}
            />


            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={formData.alcoholPercentage || ''}
              id="alcoholPercentage"
              label="Alcohol Percentage"
              name="alcoholPercentage"
              type="number"
              inputProps={{
                  step: 0.1,
              }}
            />

          
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={formData.color || ''}
              id="color"
              label="Color"
              name="color"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={formData.type || ''}
              id="type"
              label="Type"
              name="type"
            />


            <TextField
              margin="normal"
              required
              fullWidth
              id="image"
              name="image"
              type="file"
            />

            <Select
              fullWidth
              label="Select Producer"
              required
              defaultValue={formData?.producer?._id || ''}
              name="producer"
              >
              {producers.map((producer) => (
                  <MenuItem key={producer._id} value={producer._id}>
                  {producer.name}
                  </MenuItem>
              ))}
            </Select>


          </Box>
        }
        handleCancel={handleClose}
        handleConfirm={handleUpdateClick}
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
