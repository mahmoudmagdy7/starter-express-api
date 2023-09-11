import express from "express";
import * as category from "./controller/category.js";
import { validation } from "../../middleware/validation.js";
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from "./category.validation.js";

const categoryRouter = express.Router();


// categoryRouter.use('/:categoryId/subcategories', subCategoryRouter);
categoryRouter.route("/") // /api/v1/categories
    .post(validation(addCategoryValidation), category.addCategory)
    .get(category.getAllCategories);

categoryRouter.route("/:id") // /api/v1/categories/:id
    .put(validation(updateCategoryValidation), category.updateCategory)
    .delete(validation(deleteCategoryValidation), category.deleteCategory);

export default categoryRouter;
