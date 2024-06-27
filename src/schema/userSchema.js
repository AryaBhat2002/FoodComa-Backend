const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: [5, "First name must be atleast 5 character long"],
        lowercase: true,
        trime: true, // it will remove the extra spaces given by user
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minlength: [5, "Last name must be atleast 5 character long"],
        lowercase: true,
        trime: true, // it will remove the extra spaces given by user
        maxlength: [20, "Last name should be less than or equal to 20 characters"]
    },

    mobileNumber: {
        type: String,
        maxlength:[10, "Phone number should be of length 10"],
        minlength:[10, "Phone number should be of length 10"],
        unique:[true, "Phone number is already in use"],
        trime: true, // it will remove the extra spaces given by user
        required: [true, "Phone number should be provided"]
    },

    email:{
        type: String,
        trim: true,
        required: [true, "Email should be provided"],
        unique: [true, "Email already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password:{
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "password should be minimun six character long"]
    }
    
}, {
    timestamps: true
});

const User = mongoose.model("User" , userSchema);
module.exports = User;