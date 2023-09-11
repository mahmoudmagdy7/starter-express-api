import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { asyncHandler } from "../../../utils/errorHandling.js";
import Jwt from 'jsonwebtoken';
import { userModel } from './../../../../database/models/user.model.js';


// signUp 

const signUp = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body;
        const cheekUser = await userModel.findOne({ email });
        if (cheekUser) {
            return next(new Error('User already exists'));
        }
        const hash = bcrypt.hashSync(password, +process.env.SALT_HASH);

        const user = await userModel.insertMany({

            email,
            password: hash,

        })
        return res.status(201).json({ message: 'User created successfully', user })
    }

)

// logIn 
const logIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
        const match = await bcrypt.compareSync(password, user.password);

        if (match) {
            await userModel.findByIdAndUpdate(user._id);

            let token = Jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ message: "User logged in successfully", token });
        } else {
            return next(new Error("Password incorrect"));
        }

    } else {
        return next(new Error("User not found"));
    }
});




export {
    signUp,
    logIn,

}