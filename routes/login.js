import express from 'express';
import userSchema from '../dbSchemas/user.js';
import { makeAccessToken, makeRefreshToken } from '../utils/jwtSign.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const Router = express.Router();


Router.post('/login', async (req, res) => {
    //Getting specs from request body
    const { email, password } = req.body;
    try {
        //Checking specs from db
        const getSpec = await userSchema.findOne({ email: email });
        if (!getSpec) return res.status(404).json({ message: "No User Found!" });
        //If user not verified
        if (getSpec?.status === "pending") return res.status(401).json({ message: "Your Account Not Verified!" })
        //Compare Hashed Pw
        const comparedPw = await bcrypt.compare(password, getSpec?.password);
        if (!comparedPw) return res.status(401).json({ message: "Your Password is wrong!" });
        //Make access and refresh token
        const accessToken = makeAccessToken(getSpec);
        const refreshToken = makeRefreshToken(getSpec);
        //Store Ref token in db
        const saveRefTokenToDb = await userSchema.updateOne({ email: email }, { rt: refreshToken });
        //Store it on cookie
        let options = {
            maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1month
            httpOnly: true,
            signed: true
        };
        res.cookie('rt', refreshToken, options);
        //Send access token response
        res.status(200).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

})

Router.post('/refreshToken', async (req, res) => {
    //Get Token From Cookie
    const { rt } = req.signedCookies;
    if (!rt) return res.status(400).json({ message: "No Rt Found ! You Should Login Again!" });
    try {
        //Verify Refresh Token From Db
        const userSpecs = await userSchema.findOne({ rt: rt });
        if (!userSpecs) return res.status(400).json({ message: "No Rt Found ! You Should Login Again!" });
        //Compare Cookie Refresh token against db refresh token
        const compareRefTokens = userSpecs?.rt === rt;
        if (!compareRefTokens) return res.status(400).json({ message: "Can't Match Tokens! You Should Login Again!" })
        //Verify Ref Token To Get Specs from it
        const verifyRefToken = await jwt.verify(userSpecs?.rt, process.env.RTPKEY);
        //Make access and refresh token
        const accessToken = makeAccessToken(verifyRefToken);
        const refreshToken = makeRefreshToken(verifyRefToken);
        //Store ref token in db
        const saveRefTokenToDb = await userSchema.updateOne({ _id: verifyRefToken._id }, { rt: refreshToken });
        //Store it on cookie
        let options = {
            maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1month
            httpOnly: true,
            signed: true
        };
        res.cookie('rt', refreshToken, options);
        //Send access token response
        res.status(200).json({ accessToken: accessToken });


    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

})

export default Router;