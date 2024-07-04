const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute');

// Const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

// Routing middleware
// If your req route starts with /user then it handles that
app.use('/users' , userRouter); //Connects the router to the server
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/ping', isLoggedIn, (req,res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({
        message: "pong"
    });
})

/*app.post('/photo', uploader.single('incomingFile'), async (req,res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Rsult from couldinary",result);
    await fs.unlink(req.file.path);
    return res.json({message: 'ok'})
})
*/


app.listen(serverConfig.PORT, async() => { 
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!`);
})