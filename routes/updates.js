const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const updatesController = require("../controllers/updates");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get("/:id", ensureAuth, updatesController.getUpdate);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createUpdate", upload.single("file"), updatesController.createUpdate);

//Enables user to like post. In controller, uses POST model to update likes by 1
router.put("/likeUpdate/:id", updatesController.likeUpdate);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deleteUpdate/:id", updatesController.deleteUpdate);

module.exports = router;
