const express = require('express');
const { createUser } = require('../contrrollers/userController');

// We have to initialize a router object to add routes in a new file
// Routers are used for segregrating ur routes in different modules
const userRouter = express.Router();

userRouter.post('/',createUser); //This is a route registration
// userRouter.get('/',getUser);


module.exports = userRouter; // exporting the router