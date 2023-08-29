import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();


export const useCartContext = () => {
  const context = useContext(CartContext);    
    return context
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  
  const [fullPrice, setFullPrice] = useState()
  
  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.wine.price * item.quantity;
    }, 0);
    setFullPrice(totalPrice);
  }, [cart]);



  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.wine.price * item.quantity;
    }, 0);
  
    setFullPrice(totalPrice);
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = (wine) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.wine._id === wine._id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { wine, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (wine) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.wine._id === wine._id
      );
      if (existingProductIndex !== -1 && prevCart[existingProductIndex].quantity > 1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity - 1,
        };
        return updatedCart;
      } else {
        return prevCart.filter((item) => item.wine._id !== wine._id);
      }
    });
  };
  

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, fullPrice }}>
      {children}
    </CartContext.Provider>
  );
};
