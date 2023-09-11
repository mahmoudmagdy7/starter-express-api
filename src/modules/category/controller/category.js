import { categoryModel } from './../../../../database/models/category.model.js';
import { asyncHandler } from "../../../utils/errorHandling.js";
import { ApiFeatures } from "../../../utils/apiFeatures.js";



const addCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body

    const result = await categoryModel({ name })

    await result.save()
    res.status(201).json({ message: " Category Added Successfully", result })

})

const getAllCategories = asyncHandler(async (req, res, next) => {

    let apiFeatures = new ApiFeatures(categoryModel.find(), req.query).paginate().sort().search().fields().filter()

    const data = await apiFeatures.mongooseQuery

    res.status(200).json({ message: " Fetch Successfully", page: apiFeatures.page, data })
})

const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const result = await categoryModel.findByIdAndUpdate(id, req.body, { new: true })
    !result && next(new Error(`Category Not Found`, { cause: 404 }))
    result && res.status(200).json({ message: "Category Updated Successfully", result })
})

const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const result = await categoryModel.findByIdAndDelete(id)
    !result && next(new Error(`Category Not Found`, { cause: 404 }))
    result && res.status(200).json({ message: "Category Deleted Successfully", result })
})


export {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory

}




