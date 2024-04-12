import express from "express";
import ViteExpress from "vite-express";
import router from "./apiRoutes.js";
import databaseConnect from "./database.ts";
<<<<<<< HEAD
import compression from "compression";
import cacheControl from "express-cache-controller";

=======
>>>>>>> parent of f17a602 (added user signup and login)
const app = express();
ViteExpress.config({ mode: "development" });
const timeToLive = 1000 * 60 * 5; // 5 minutes

<<<<<<< HEAD
//middleware
app.use("/uploads", express.static("uploads"));
app.use(ViteExpress.static());
app.use(cacheControl({ maxAge: timeToLive }));
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

=======
>>>>>>> parent of f17a602 (added user signup and login)
//refactoring database connection to use mongoose
databaseConnect();

//if page is blank first time, just refresh to have it normal again
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on http://localhost:3000/")
);

// adds dummy posts to database,
//ONLY uncomment if no posts in database
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
