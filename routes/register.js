import express from 'express';
import userSchema from '../dbSchemas/user.js';
import joiValidate from '../utils/joiVerification.js';
import mailVerifySchema from "../dbSchemas/mailVerify.js";
import makeVerifyLink from '../utils/makeVerifyLink.js';
import bcrypt from 'bcrypt';
const Router = express.Router();

Router.post('/register', async (req, res) => {
    //Get email and pw from body
    const { email, password } = req.body;
    //Check if email exist
    const mailExist = await userSchema.findOne({ email: email });
    if (mailExist) return res.status(400).json({ message: "Mail Exist!" });
    //Validate the email and password
    const { error } = joiValidate(email, password)
    if (error) return res.status(400).json({ message: error.details[0].message });
    //bcrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(password, salt);
    //Write email and password to the db
    const newUser = new userSchema({
        email: email,
        password: hashPw,
    });
    //Saving to the db
    try {
        const saveUserToDb = await newUser.save();
        //Make Mail Verification Logic
        const verifyMail = await makeVerifyLink(req, saveUserToDb);
        res.status(201).json({ message: "User Successfuly Created!, Now It Needs Email Verification!" })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

})

Router.post('/verifyEmail/:email/:code', async (req, res) => {
    //Get info from params
    const { email, code } = req.params;
    //Check If Mail And Code Is Right
    const checkSpecs = await mailVerifySchema.findOne({ email: email });
    if (!checkSpecs) return res.status(400).json({ message: "Invalid Email!" });
    if (checkSpecs?.code !== code) return res.status(400).json({ message: "Invalid Code!" });
    //Changing status of user to active from pending.
    try {
        const updateStatus = await userSchema.updateOne({ email: email }, { status: "active" });
        res.status(201).json({ message: "You Account Verified Successfuly!You Can Now Login!" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
})

Router.post('/verifyMail', async (req, res) => {
    //Get Specs from req body
    const { email } = req.body;
    //Make Mail Verification Logic
    try {
        const verifyMail = await makeVerifyLink(req, email);
        res.status(201).json({ message: "Verify Link Sent!" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default Router;