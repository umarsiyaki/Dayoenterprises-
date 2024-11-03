const db = require('../config/database');

exports.getProduct = async (req, res) => {
  const [products] = await db.execute('SELECT * FROM Products');
  res.render('products', { products });
};

exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  await db.execute('INSERT INTO Products SET ?', { name, price });
  res.redirect('/products');
};const Product = require('../models/Product');

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, description, price } = req.body;
      const product = await Product.create({ name, description, price });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product' });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        await product.update({ name, description, price });
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating product' });
    }
  }
}
const db = require('../db/db');

// controller/productController.js
const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

const getAllProducts = (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json(rows);
    });
};

const getProductById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json(row);
    });
};

const createProduct = (req, res) => {
    const { name, price, category, stock } = req.body;
    db.run('INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)', [name, price, category, stock], function (err) {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.status(201).json({ id: this.lastID, name, price, category, stock });
    });
};

const searchProducts = (req, res) => {
    const { q } = req.query;
    db.all('SELECT * FROM products WHERE name LIKE ?', [`%${q}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json(rows);
    });
};

module.exports = { getAllProducts, getProductById, createProduct, searchProducts };
