const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");


async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. Check if there is a registered user with this email
    const user = await findUser({ email });

    if(!user){
        throw { message: "No user found with the given email" , statusCode: 404}
    }

    // 2. If user is found we need to comapre plain incoming paswword with hash password
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);
    if(!isPasswordValidated){
        throw { message: "Invalid Password please try again" , statusCode:401};
    }

    const userRole = user.role ? user.role : "USER";

    // 3.If password is validated create a token and return
    const token = jwt.sign({ email: user.email, id: user._id, role: user.role } , JWT_SECRET , {
        expiresIn: JWT_EXPIRY
    });

    return token;

}

module.exports = {
    loginUser
}