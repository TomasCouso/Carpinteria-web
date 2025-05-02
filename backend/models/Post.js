const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String },
    categoria: {
      type: String,
      enum: ["cocina", "dormitorio", "living", "baño"],
      required: true,
    },
    modelo: { type: String },
    imagenes: [{ type: String }], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);