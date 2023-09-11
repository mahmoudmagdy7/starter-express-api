import joi from 'joi'

const addPostValidation = joi.object({
    title: joi.string().min(5).max(50),
    description: joi.string().min(2).max(100),
    category: joi.array(),
    video: joi.string(),
    image: joi.string(),
})

const updatePostValidation = joi.object({
    id: joi.string().hex().length(24).required(),
    title: joi.string().required().min(10).max(50),
    description: joi.string().min(2).max(100).required(),

    video: joi.string(),
    image: joi.string(),
})

const deletePostValidation = joi.object({
    id: joi.string().hex().length(24).required()
})

export {
    addPostValidation,
    updatePostValidation,
    deletePostValidation
}