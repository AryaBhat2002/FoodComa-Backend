const express = require('express');
const { getCartByUser } = require('../contrrollers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/',isLoggedIn, getCartByUser );

module.exports = cartRouter