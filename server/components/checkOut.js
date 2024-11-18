// CheckoutComponent.js
import React, { useState, useEffect } from 'react';
import checkoutService from './checkout.service';
import cartService from './cart.service';

const CheckoutComponent = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cartService.getCart().then((data) => setCart(data));
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await checkoutService.checkout(cart);
      // Handle successful checkout
      console.log(response);
    } catch (error) {
      // Handle checkout error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={() => handleCheckout()}>Checkout</button>
      )}
    </div>
  );
};

export default CheckoutComponent;