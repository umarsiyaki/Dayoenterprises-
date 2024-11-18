// cart.service.js
import axios from 'axios';
import storage from './localStorage';

const cartEndpoint = '/api/cart';

const cartService = {
  async getCart() {
    const cart = storage.get('cart');
    if (!cart) {
      const response = await axios.get(cartEndpoint);
      storage.set('cart', response.data);
      return response.data;
    }
    return cart;
  },

  async addToCart(productId) {
    const response = await axios.post(`${cartEndpoint}/${productId}`);
    const updatedCart = storage.get('cart');
    updatedCart.push(productId);
    storage.set('cart', updatedCart);
    return response.data;
  },

  async removeFromCart(productId) {
    const response = await axios.delete(`${cartEndpoint}/${productId}`);
    const updatedCart = storage.get('cart');
    const index = updatedCart.indexOf(productId);
    if (index !== -1) {
      updatedCart.splice(index, 1);
    }
    storage.set('cart', updatedCart);
    return response.data;
  },
};
const cartService = {
  async addToCart(productId, variantId) {
    // Add product variant to cart
  },
  async updateCartQuantity(cartItemId, quantity) {
    // Update cart item quantity
  },
  async removeCartItem(cartItemId) {
    // Remove cart item
  },
};
export default cartService;