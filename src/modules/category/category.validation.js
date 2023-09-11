import joi from 'joi'

const addCategoryValidation = joi.object({
    name: joi.array().required().max(100),
})

const updateCategoryValidation = joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().required().min(10).max(50),
})

const deleteCategoryValidation = joi.object({
    id: joi.string().hex().length(24).required()
})

export { addCategoryValidation, updateCategoryValidation, deleteCategoryValidation }