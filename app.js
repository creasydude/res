import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

//Import Routes
import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js';
import todoRoute from './routes/todo.js';

//Dependencies
const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.CPSEC));

//React Deploy
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

//Cors
app.use(cors({
    origin: '*'
}));

//Routes
app.use("/api/auth/", registerRoute);
app.use("/api/auth/", loginRoute);
app.use("/api/todo/", todoRoute)

//Mongodb Setup And Listen
try {
    const connect = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
} catch (err) {
    console.log(err.message);
}