import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mailVerifySchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        expires: 600,
    },
});

const mailVerify = mongoose.model("verifyCodes", mailVerifySchema);
export default mailVerify;