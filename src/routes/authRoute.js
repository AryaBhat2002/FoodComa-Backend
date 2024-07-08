const express = require('express');
const { login, logout } = require('../contrrollers/authController');

// We have to initialize a router object to add routes in a new file
// Routers are used for segregrating ur routes in different modules
const authRouter = express.Router();

authRouter.post('/login', login); //This is a route registration
// userRouter.get('/',getUser);

authRouter.post('/logout', logout);


module.exports = authRouter; // exporting the router