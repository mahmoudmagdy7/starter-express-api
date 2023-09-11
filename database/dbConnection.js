import mongoose from "mongoose"


export const dbConnection = async () => {
    return await mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Could not connect to MongoDB");
        });
};