const { loginUser } = require("../services/authService");

async function login(req,res) {
    try{
        const loginPayload = req.body;

        // auth service
        const response = await loginUser(loginPayload);

        res.cookie("authToken",response.token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
            error: {}
        })
        } catch(error){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            })
        }
    
}

async function logout(req,res){
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

module.exports = {
    login,
    logout
}