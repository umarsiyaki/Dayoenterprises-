// WishlistComponent.js
import React, { useState, useEffect } from 'react';
import wishlistService from './wishlist.service';

const WishlistComponent = () => {
const [wishlist, setWishlist] = useState([]);

useEffect(() => {
wishlistService.getWishlist().then((data) => setWishlist(data));
}, []);

const handleAddToWishlist = (productId) => {
wishlistService.addToWishlist(productId).then((data) => {
setWishlist(data);
});
};

const handleRemoveFromWishlist = (productId) => {
wishlistService.removeFromWishlist(productId).then((data) => {
setWishlist(data);
});
};

return (
<div>
  <h1>Wishlist</h1>
  <ul>
    {wishlist.map((product) => (
    <li key={(link unavailable)}>
      {product.name}
      <button onClick={()=> handleRemoveFromWishlist((link unavailable))}>
        Remove
      </button>
    </li>
    ))}
  </ul>
</div>
);
};

export default WishlistComponent;