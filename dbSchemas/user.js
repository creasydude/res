import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255,
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 8024
    },
    isChecked: {
        type: Boolean,
        default: false,
    }
})

const userSchema = Schema({
    email: {
        type: String,
        minLength: 6,
        maxLength: 255,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 1024,
    },
    status: {
        type: String,
        default: "pending",
    },
    todos: {
        type: [todoSchema],
        required: false,
    },
    rt: {
        type: String,
        default: null,
    }
})

const user = mongoose.model("users", userSchema);
export default user;