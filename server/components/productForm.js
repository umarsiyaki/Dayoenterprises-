
import React, { useState } from 'react';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price, category, quantity, image };

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added:', data);
        // Reset form fields
        setName('');
        setPrice('');
        setCategory('');
        setQuantity('');
        setImage('');
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
// ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', { name, description, price });
      history.push('/products');
    } catch (err) {
      setError('Failed to create product.');
      console.error('Product creation error:', err);
    }
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}


export default ProductForm;

// AddProductForm.js
import React, { useState } from 'react';

const AddProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    image: '',
    description: '',
    price: '',
    quantity: '',
    vendor: '',
    category: '',
    size: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
  };

  return (
    <form id="product-form" onSubmit={handleSubmit}>
      <input type="text" name="id" placeholder="Product ID" onChange={handleChange} required />
      <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
      <input type="text" name="vendor" placeholder="Vendor" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
      <input type="text" name="size" placeholder="Size" onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;