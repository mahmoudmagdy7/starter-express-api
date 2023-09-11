import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'too short Category name']
    },
    description: {
        type: String,
        maxlength: [100, 'too long product title'],
        minlength: [10, 'too short product title'],
        required: true,
        trim: true
    },
    video: {
        type: String,
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }],
    image: {
        type: String,
    }
}, { timestamps: true });

export const postModel = model('post', postSchema);