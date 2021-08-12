import express from 'express';
import userSchema from '../dbSchemas/user.js';
import { makeAccessToken, makeRefreshToken } from '../utils/jwtSign.js';
import bcrypt from 'bcrypt';
const Router = express.Router();


Router.post('/login', async (req, res) => {
    //Getting specs from request body
    const { email, password } = req.body;
    //Checking specs from db
    const getSpec = userSchema.findOne({ email: email });
    if (!getSpec) return res.status(404).json({ message: "No User Found!" });
    //If user not verified
    if (getSpec?.status === "pending") return res.status(401).json({message : "Your Account Not Verified!"})
    //Compare Hashed Pw
    const comparedPw = await bcrypt.compare(password, getSpec?.password);
    if (!comparedPw) return res.status(401).json({ message: "Your Password is wrong!" });
    //Make access and refresh token
    const accessToken = makeAccessToken(getSpec);
    const refreshToken = makeRefreshToken(getSpec);
    //Store Ref token in db
    const saveRefTokenToDb = await userSchema.findOne({ email: email }, { rt: refreshToken });
    //Store it on cookie
    let options = {
        maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1month
        httpOnly: true,
        signed: true
    };
    res.cookie('rt',refreshToken, options);
    //Send access token response
    res.status(200).json({accessToken : accessToken});

})

export default Router;