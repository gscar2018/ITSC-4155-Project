import express from "express";
import ViteExpress from "vite-express";
import { posts } from "./model.js";
import router from "./routes.js";
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { testSchema } from './schemas/test.ts'; //for testing the image schema

const uri = "mongodb+srv://khoder23:ITSC-4155@cluster0.tcdyzkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use("/api", router);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//connect to the database
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on http://localhost:3000/")
);

/* THIS BLOCK OF CODE IS PURELY FOR TESTING A SCHEMA, do not uncomment the code unless you wish to test the schema.  

async function runSchemaTest() {
  try {
      await testSchema();
      console.log('Schema testing completed successfully');
  } catch (error) {
      console.error('Schema testing failed:', error);
  }
}

// Call the function to run the schema test
runSchemaTest();
*/