const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "..", "frontend")));

// API routes
console.log("Montando rutas...");
app.use("/api/auth", authRoutes);
console.log("authRoutes montadas");
app.use("/api/posts", postRoutes);
console.log("postRoutes montadas");

// Serve the frontend application
console.log("\nRutas registradas:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`  ${r.route.path}`);
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Error conectando a MongoDB:", err));
