import express from 'express';
import authUser from '../utils/authUser.js';
import userSchema from '../dbSchemas/user.js';
const Router = express.Router();

Router.get("/todos", authUser, async (req, res) => {
    //Get User From jwt middleware
    const user = req.user;
    //Get the todos from db
    try {
        const getUser = await userSchema.find({ _id: user._id });
        res.status(200).json(getUser[0].todos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

Router.post("/addTodo", authUser, async (req, res) => {
    //Get Specs from body
    const { title, description } = req.body;
    //Add todo to the db
    try {
        const addTodo = await userSchema.updateOne({ _id: req.user._id }, {
            $push: {
                todos: [
                    {
                        title: title,
                        description: description,
                    }
                ]
            }
        })
        res.status(200).json({ message: "Todo Added!" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

Router.post("/checkTodo", authUser, async (req, res) => {
    //Get Specs from body
    const { objId, isChecked } = req.body;
    //Update Is Checked From The Db
    try {
        const checkTodo = await userSchema.updateOne({ "todos._id": objId }, {
            $set: {
                "todos.$.isChecked": !isChecked,
            }
        });
        res.status(200).json({ message: "Checked/Unchecked The Todo!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default Router;