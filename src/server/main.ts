import express from "express";
import multer from 'multer';
import ViteExpress from "vite-express";
import router from "./apiRoutes.js";
import { testSchema } from "./schemas/test.ts"; //for testing the image schema
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const uri =
  "mongodb+srv://khoder23:ITSC-4155@cluster0.tcdyzkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use("/api", router);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connect to the database
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    await mongoose.connect(
      "mongodb+srv://khoder23:ITSC-4155@cluster0.tcdyzkj.mongodb.net/ImgTag"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// adds dummy posts to database,
//ONLY unccomment if no posts in database
// async function runSchemaTest() {
//   try {
//     await testSchema();
//     console.log("Schema testing completed successfully");
//   } catch (error) {
//     console.error("Schema testing failed:", error);
//   }
// }

// // Call the function to run the schema test
// runSchemaTest();

//if page is blank first time, just refresh to have it normal again
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on http://localhost:3000/")
);
