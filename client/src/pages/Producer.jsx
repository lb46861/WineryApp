import React, { useState, useEffect, useContext, useRef } from 'react';
import Pagination from '@mui/material/Pagination';
import { Card, CardContent, Grid, Typography, TextField, CircularProgress, Box, Select, MenuItem } from '@mui/material';
import { ApiContext } from '../context/ApiContext';
import { PRODUCER_PATH, countries } from '../utils/constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserContext } from '../context/UserContext';
import PromptCrud from '../component/PromptCRUD';


const ITEMS_PER_PAGE = 25;

function Producer() {
  const apiContext = useContext(ApiContext);
  const { user } = useUserContext();
  const [producers, setProducers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false)
  const [selectedProducer, setSelectedProducer] = useState()
  const [formData, setFormData] = useState('');
  const divRef = useRef();
  const [recall, setRecall] = useState(false);



  useEffect(() => {
    apiContext.apiCall('get', PRODUCER_PATH).then(response => {
      if(response?.data?.data) setProducers(response.data.data);
    });
  }, [apiContext, recall]);

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    await apiContext.apiCall('delete', `${PRODUCER_PATH}/${selectedProducer}`).then((response) => {
      if(response?.status === 200){
        const updatedProducers = producers.filter(producer => producer._id !== selectedProducer);
        setProducers(updatedProducers);
      }
      handleClose()
    });
  }

  const handleUpdateClick = async(event)=> {
    event.preventDefault();
    const data = new FormData(divRef.current);
    const objectToUpdate = {
      ...(data.get('name') && { name: data.get('name') }),
      ...(data.get('founded') && { founded: data.get('founded') }),
      ...(data.get('country') && { country: data.get('country') }),
      ...(data.get('description') && { description: data.get('description') }),
      ...(data.get('url') && { url: data.get('url') }),
    };

    await apiContext.apiCall('patch', `${PRODUCER_PATH}/${selectedProducer}`, objectToUpdate).then(() => {
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

  const filteredProducers = producers.filter(producer =>
    producer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducers = filteredProducers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );


  const handleClickOpenUpdate = (producer) => {
    setFormData(producer);
    setSelectedProducer(producer._id);
    setOpenUpdate(true);
  }

  const handleClickOpenDelete = (producerId) => {
    setSelectedProducer(producerId);
    setOpenDelete(true);
  }

  const handleClose = () => {
    setOpenUpdate(false);
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
        {producers?.length ? (paginatedProducers.map(producer => (
          <Grid item key={producer._id} xs={12} sm={3} md={2}>

            <Card
              sx={{
                maxWidth: '100%',
                minHeight: 200,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >

              <CardContent>
                <Typography variant="h5" component="div">
                  {producer.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Founded: {producer.founded}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Country {producer.country}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Description {producer.description}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  url: <a href={`https://${producer.url}`}>website</a>
                </Typography>
              </CardContent>


              <CardContent>
                {
                ((user) && (user.role ==='administrator')) &&
                (
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <EditIcon sx={{cursor: 'pointer', fill: '#54626F'}} onClick={() => handleClickOpenUpdate(producer)}></EditIcon>
                  </Grid>   

                  <Grid item>
                  <DeleteIcon  sx={{cursor: 'pointer', fill: '#EE4B2B'}} onClick={() => handleClickOpenDelete(producer._id)}></DeleteIcon>
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
        title={'Delete Producer'}
        body={'Are you sure you want delete this producer?'}
        handleCancel={handleClose}
        handleConfirm={handleDeleteClick}
      />

      <PromptCrud
        open={openUpdate}
        onClose={handleClose}
        title={'Update Producer'}
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
              defaultValue={formData.founded || ''}
              id="founded"
              label="Founded"
              name="founded"
              type="number"
            />

            <Select
              fullWidth
              label="Country"
              sx={{ textAlign: 'left' }}
              required
              defaultValue={formData.country || countries[0]}
              name="country"
              >
              {countries.map((item) => (
                  <MenuItem key={item} value={item}>
                  {item}
                  </MenuItem>
              ))}
            </Select>

          
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={formData.description || ''}
              id="description"
              label="Description"
              name="description"
              multiline
            />

            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={formData.url || ''}
              id="url"
              label="URL"
              name="url"
            />
          </Box>
        }
        handleCancel={handleClose}
        handleConfirm={handleUpdateClick}
      />


      
      <Grid item xs={12}>
        <Pagination
          count={Math.ceil(filteredProducers.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
      </Grid>
    </>
  );
}

export default Producer;
