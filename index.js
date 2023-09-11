import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from "./src/modules/auth/auth.routes.js";
import { dbConnection } from "./database/dbConnection.js";
import postRouter from "./src/modules/post/post.routes.js";
import categoryRouter from "./src/modules/category/category.routes.js";
import { globalErrorHandling } from "./src/utils/errorHandling.js";

const app = express();

//Cors Front End
app.use(cors())

//config
dotenv.config()
// database connection
dbConnection()
//middleware
app.use(express.json())

// app.use('/auth', authRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/categories', categoryRouter)

app.use('*', (req, res, next) => {
    next(new Error('Route Not Found', { cause: 404 }));
})
// Global error handling 
app.use(globalErrorHandling)


app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
);
