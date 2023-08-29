import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HOME_PATH, WINE_PATH } from '../utils/constants';
import { ApiContext } from '../context/ApiContext';
import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

function WineDetails() {
  const apiContext = useContext(ApiContext);
  const [wine, setWine] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    apiContext.apiCall('get', `${WINE_PATH}/${id}`).then(response => {
        if (response?.data?.data) {
          setWine(response.data.data);
        } else {
          navigate(HOME_PATH); 
        }
    });
  }, [id, apiContext, navigate]); 

  
  const generateBuffer = (wine) => {
    const uint8Array = new Uint8Array(wine.image.data.data);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String
  }


  return (
    wine ? (
        <Grid container spacing={2}  style={{padding: "50px 10%"}}>
            <Grid item xs={12} sm={6} md={6}>
            <Card
            sx={{
                maxWidth: '100%',
                minHeight: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
                }}
            >

                <CardContent>
                <img src={`data:${wine.image.contentType};base64,${generateBuffer(wine)}`}  alt="Wine" />
                </CardContent>
            </Card>
        </Grid>

        
        <Grid item key={wine._id} xs={12} sm={6} md={6}>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div">
                        <strong>Wine:</strong>
                    </Typography>
                    <Typography variant="h5" component="div">
                        {wine.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Price: {wine.price} €
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Alc./vol. {wine.alcoholPercentage}
                    </Typography>
                
                    <Typography variant="h6" color="text.secondary">
                        Color: {wine.color}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Type {wine.type}
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{marginTop: 2}}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h6" component="div">
                        <strong>Producer:</strong>
                    </Typography>
                    <Typography variant="h5" component="div">
                        {wine.producer.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Founded: {wine.producer.founded} 
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Country: {wine.producer.country}
                    </Typography>
                
                    <Typography variant="h6" color="text.secondary">
                        Description: {wine.producer.description}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        url: <a href={`https://${wine.producer.url}`}>website</a>
                    </Typography>   
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    ) :
    <CircularProgress />
  );
}

export default WineDetails;
