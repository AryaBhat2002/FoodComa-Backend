const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../contrrollers/productController');
const uploader = require('../middlewares/multerMiddleware');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct );
// GET/product/:id
productRouter.get('/:id', getProduct );

// DELETE/product/:id
productRouter.delete('/:id', deleteProduct );

module.exports = productRouter;