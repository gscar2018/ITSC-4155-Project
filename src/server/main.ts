import express from "express";
import ViteExpress from "vite-express";
import { posts } from "./model.js";
import router from "./routes.js";
const app = express();

app.use("/api", router);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on http://localhost:3000/")
);
