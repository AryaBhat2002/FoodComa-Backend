const express = require('express');
const serverConfig = require('./config/serverConfig');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoutes');


const app = express();

app.use(cors({
    origin: serverConfig.FRONTEND_URL,
    methods: ["GET","POST","DELETE","PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.use('/users' , userRouter); //Connects the router to the server
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/ping', (req,res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({
        message: "pong"
    });
})


app.listen(serverConfig.PORT, async() => { 
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!`);
})