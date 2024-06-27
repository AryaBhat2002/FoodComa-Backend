const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.listen(serverConfig.PORT, async() => { 
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!`);

    const newuser = await User.create({
        email: 'a@b.com',
        password: '123456',
        firstName: 'Jhonathan',
        lastName: 'Mathias',
        mobileNumber: '1234567890'
    });

    console.log("Created new user");
    console.log(newuser);
})