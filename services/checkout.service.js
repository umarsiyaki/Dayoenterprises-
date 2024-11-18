// checkout.service.js
import axios from 'axios';

const checkoutEndpoint = '/api/checkout';

const checkoutService = {
  async checkout(cartData) {
    const response = await axios.post(checkoutEndpoint, cartData);
    return response.data;
  },
};

export default checkoutService;