// wishlist.service.js
import axios from 'axios';
import storage from './localStorage';

const wishlistEndpoint = '/api/wishlist';

const wishlistService = {
  async getWishlist() {
    const wishlist = storage.get('wishlist');
    if (!wishlist) {
      const response = await axios.get(wishlistEndpoint);
      storage.set('wishlist', response.data);
      return response.data;
    }
    return wishlist;
  },

  async addToWishlist(productId) {
    const response = await axios.post(`${wishlistEndpoint}/${productId}`);
    const updatedWishlist = storage.get('wishlist');
    updatedWishlist.push(productId);
    storage.set('wishlist', updatedWishlist);
    return response.data;
  },

  async removeFromWishlist(productId) {
    const response = await axios.delete(`${wishlistEndpoint}/${productId}`);
    const updatedWishlist = storage.get('wishlist');
    const index = updatedWishlist.indexOf(productId);
    if (index !== -1) {
      updatedWishlist.splice(index, 1);
    }
    storage.set('wishlist', updatedWishlist);
    return response.data;
  },
};

export default wishlistService;
