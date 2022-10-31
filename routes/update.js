const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const updateController = require("../controllers/update");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get("/:id", ensureAuth, updateController.getUpdate);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createUpdate", upload.single("file"), updateController.createUpdate);

//Enables user to like post. In controller, uses POST model to update likes by 1
router.put("/likePost/:id", updateController.likePost);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deletePost/:id", updateController.deletePost);

module.exports = router;
