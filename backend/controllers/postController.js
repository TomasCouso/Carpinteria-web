const Post = require("../models/Post");
const cloudinary = require("../utils/cloudinary");

const createPost = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, modelo } = req.body;
    const imagenes = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "carpinteria",
      });
      imagenes.push(result.secure_url);
    }

    const nuevoPost = new Post({ titulo, descripcion, categoria, modelo, imagenes });
    await nuevoPost.save();
    res.status(201).json(nuevoPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al crear publicación" });
  }
};

const getPosts = async (req, res) => {
  const { categoria } = req.query;
  const filtro = categoria ? { categoria } : {};

  try {
    const posts = await Post.find(filtro).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener publicaciones" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar publicación" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ msg: "Publicación eliminada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar publicación" });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };