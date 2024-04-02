import mongoose from "mongoose";
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const imgTag = process.env.IMG_TAG;
const mongoURI = process.env.MONGO_URI;

async function databaseConnect() {
  try {
    const client = new MongoClient(mongoURI!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    //ping the database
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    await mongoose.connect(imgTag!);

    //closes client when you stop the server
    process.on("SIGINT", () => {
      client.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

export default databaseConnect;
