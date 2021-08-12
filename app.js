import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//Import Routes
import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js';

//Dependencies
const app = express();
dotenv.config();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/auth/" registerRoute);
app.use("/api/auth/" loginRoute);

//Mongodb Setup And Listen
try {
    const connect = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true ,  useUnifiedTopology: true });
    app.listen(process.env.PORT, () => console.log(`Server is listening on por ${process.env.PORT}`));
} catch (err) {
    console.log(err.message);
}