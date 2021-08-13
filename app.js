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
app.use(cookieParser(process.env.CPSEC));

//Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT , POST , PATCH , DELETE , GET");
        return res.status(200)
    }
})

//Routes
app.use("/api/auth/", registerRoute);
app.use("/api/auth/", loginRoute);

//Mongodb Setup And Listen
try {
    const connect = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
} catch (err) {
    console.log(err.message);
}