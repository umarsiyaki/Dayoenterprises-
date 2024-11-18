import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (err) {
        setError('Failed to load cart items.');
        console.error('Cart fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );

  function handleRemove(itemId) {
    // Implement item removal logic
  }

  function handleCheckout() {
    // Implement checkout logic
  }
}

import React, { useState, useEffect } from 'react';
import cartService from './cart.service';

const CartComponent = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cartService.getCart().then((data) => {
      setCart(data);
      calculateTotal(data);
    });
  }, []);

  const handleAddToCart = (productId) => {
    cartService.addToCart(productId).then((data) => {
      setCart(data);
      calculateTotal(data);
    });
  };

  const handleRemoveFromCart = (productId) => {
    cartService.removeFromCart(productId).then((data) => {
      setCart(data);
      calculateTotal(data);
    });
  };

  const calculateTotal = (cartData) => {
    const total = cartData.reduce((acc, product) => acc + product.price, 0);
    setTotal(total);
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((product) => (
          <li key={itemId}>
            {product.name} - ${product.price}
            <button onClick={() => handleRemoveFromCart((link unavailable))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={() => handleCheckout()}>Checkout</button>
    </div>
  );
};

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
