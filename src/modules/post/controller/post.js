import { asyncHandler } from './../../../utils/errorHandling.js';
import { ApiFeatures } from '../../../utils/apiFeatures.js';
import { postModel } from '../../../../database/models/post.model.js';
import cloudinary from './../../../utils/cloudinary.js';

const addPost = asyncHandler(async (req, res, next) => {
    const { title, description, category, video, image } = req.body
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: 'images' });

    const post = await postModel.insertMany({
        title,
        description,
        category,
        video,
        image: secure_url
    })
    res.status(201).json({ message: " Post Added Successfully", post })

})

// const uploadVideo = asyncHandler(async (req, res, next) => {
//     const { video } = req.body
//     const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: 'videos' })
//     const post = await postModel.insertMany({
//         video: secure_url
//     })
//     res.status(201).json({ message: " Video Uploaded Successfully", post })
// })
// const uploadImage = asyncHandler(async (req, res, next) => {
//     const { image } = req.body
//     const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: 'images' })
//     const post = await postModel.insertMany({
//         image: secure_url
//     })
//     res.status(201).json({ message: " image Uploaded Successfully", post })
// })

/////
const getAllPosts = asyncHandler(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(postModel.find(), req.query).paginate().sort().search().fields().filter()

    const post = await apiFeatures.mongooseQuery.populate('category', 'name')

    res.status(200).json({ message: " Fetch Successfully", page: apiFeatures.page, post })
})


const getSpecificPost = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const result = await postModel.findById(id).populate('category', 'name')
    !result && next(new Error(`User Not Found`, { cause: 404 }))
    result && res.status(200).json({ message: "Post Found Successfully", result })
})

const updatePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const result = await postModel.findByIdAndUpdate(id, req.body, { new: true })
    !result && next(new Error(`Post Not Found`, { cause: 404 }))
    result && res.status(200).json({ message: "Post Updated Successfully", result })
})

const deletePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const result = await postModel.findByIdAndDelete(id)
    !result && next(new Error(`Post Not Found`, { cause: 404 }))
    result && res.status(200).json({ message: "Post Deleted Successfully", result })
})

export {
    addPost,
    getAllPosts,
    updatePost,
    deletePost,
    getSpecificPost
}