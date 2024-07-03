const express = require('express');
const { getCartById } = require('../contrrollers/cartController');

const cartRouter = express.Router();

cartRouter.get('/:id', getCartById );

module.exports = cartRouter