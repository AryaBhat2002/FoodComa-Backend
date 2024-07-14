const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req,res,next) {
    const token = req.cookies['authToken'];
    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        
        if(!decoded){
            throw new UnauthorisedError
        }
        // if reached here then user is authenticated

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            res.cookie("authToken", "", {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                success: true,
                message: 'Log out successfully',
                data: {},
                error: {}
            })
        }
        
    }
}


// This function checks if the authenticated user is admin or not
// Because we will call isAdmin after loggedIn thats why we will receive user details
async function isAdmin(req,res,next) {
    const loggedInUser = req.user;
    if(loggedInUser.role === 'ADMIN'){
        next();
    }
    else{
    return res.status(401).json({
        success: false,
        data: {},
        message: "You are not authorized for this action",
        error: {
            statusCode: 401,
            reason: "Unauthorised user for this action"
        }
    })
}
}

module.exports = {
    isLoggedIn,
    isAdmin
}