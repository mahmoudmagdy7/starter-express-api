import express from "express";
import * as postCtrl from "./controller/post.js";
import { validation } from './../../middleware/validation.js';
import { addPostValidation, updatePostValidation, deletePostValidation } from "./post.validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.cloud.js";
const postRouter = express.Router();

postRouter.route("/") // /api/v1/categories
    .post(validation(addPostValidation),fileUpload(fileValidation.image).single("image"), postCtrl.addPost)
    .get(postCtrl.getAllPosts);

postRouter.route("/:id") // /api/v1/categories/:id
    .put(validation(updatePostValidation), postCtrl.updatePost)
    .delete(validation(deletePostValidation), postCtrl.deletePost);

///
postRouter.get("/:id", postCtrl.getSpecificPost);

// custom upload
// postRouter.post('/upload/video', fileUpload(fileValidation.video).single("video"), postCtrl.uploadVideo);
// postRouter.post('/upload/image', fileUpload(fileValidation.image).array("image"), postCtrl.uploadImage);


export default postRouter;
