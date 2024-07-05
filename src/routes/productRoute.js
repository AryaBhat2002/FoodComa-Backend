const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../contrrollers/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');

const productRouter = express.Router();

productRouter.post('/',isLoggedIn, isAdmin , uploader.single('productImage'), addProduct );

// GET/product/:id
productRouter.get('/:id', getProduct );

// DELETE/product/:id
productRouter.delete('/:id', deleteProduct );

module.exports = productRouter;