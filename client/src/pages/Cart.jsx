import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCartContext } from '../context/CartContext';
import { HOME_PATH } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../utils/ToastNotif'


function Cart() {
  const { cart, addToCart, setCart, removeFromCart, fullPrice } = useCartContext();

  const navigate = useNavigate();

  const generateBuffer = (wine) => {
    const uint8Array = new Uint8Array(wine.image.data.data);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String
  }

  const handleAddToCart = (wine) => {
    addToCart(wine);
  }

  const handleRemoveFromCart = (wine) => {
    removeFromCart(wine);
  }

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCart([]);
    successToast('Congratulations! Your purchase was successful.')
    navigate(HOME_PATH);
  }
  

  return (
    <Grid container spacing={2} style={{ padding: "50px 10%" }}>
    {Object.keys(cart).length && fullPrice ? (
      <>
       {cart.map((item) => (
          <Grid item key={item.wine._id} xs={12} sm={3} md={2}>
            <Card
              sx={{
                position: 'relative',
                maxWidth: '100%',
                minHeight: 350,
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
                  backgroundImage: `url(data:${item.wine.image.contentType};base64,${generateBuffer(item.wine)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  opacity: 0.6,  
                }}
              />
    
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" component="div">
                  {item.wine.name}
                </Typography>
                <Typography variant="h5">
                  QTY: {item.quantity}
                </Typography>
                <Typography variant="h5">
                  Price: {item.wine.price * item.quantity} €
                </Typography>
            

                <Grid container justifyContent="space-between">
                  <Grid item>
                    <AddIcon sx={{cursor: 'pointer', fill: '#54626F'}} onClick={() => handleAddToCart(item.wine)}></AddIcon>
                  </Grid>   

                  <Grid item>
                    <RemoveIcon  sx={{cursor: 'pointer', fill: '#EE4B2B'}} onClick={() => handleRemoveFromCart(item.wine)}></RemoveIcon>
                  </Grid>
                </Grid>


              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={12} textAlign="right">
            <h2>Total Price: {fullPrice.toFixed(2)} €</h2>
            <Button 
                sx={{marginTop: 1, marginBottom: 3}} 
                variant="contained"
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </Grid>
      </>
    ) : (
      <h1>There are no items in your cart!</h1>
    )}
  </Grid>

  );
}

export default Cart;
