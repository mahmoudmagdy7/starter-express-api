import express from "express"
import * as authController from './controller/auth.js'

const authRouter = express.Router()

authRouter.post('/signUp', authController.signUp)
authRouter.post('/logIn', authController.logIn)


export default authRouter;
