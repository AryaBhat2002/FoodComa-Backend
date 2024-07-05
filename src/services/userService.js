const {findUser,createUser}= require("../repositories/userRepository");
const {createCart} = require('../repositories/cartRepository');

    async function registerUser(userDetails){
        console.log("Hitting service layer");
        // It will create a brand new user in the data base

        //1. We need to check if the user with his email and mobile number already exits or not
        const user = await findUser({
            email: userDetails.email,
            mobileNumber : userDetails.mobileNumber
        })

        if(user){
            throw{ reason: 'User with the given email or mobile number already exist', statusCode: 400}
        }
        
        //2. If not the create the user in the database
        const newUser = await createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        })

        if(!newUser){
            throw { reason: "Something went wrong.. Cannot create user", statusCode: 500}
        }

        await createCart(newUser._id);

        // 3. If user is created a new cart should also be created in his name

        return newUser;
    }

module.exports = {
    createUser,
    registerUser
};