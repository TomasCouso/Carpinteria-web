const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const auth = require("../middlewares/authMiddleware");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.post("/", auth, upload.array("imagenes"), createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;