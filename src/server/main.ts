import express from "express";
import ViteExpress from "vite-express";
import router from "./apiRoutes.ts";
import authRoutes from "./authRoutes.ts";
import userRoutes from "./userRoutes.ts";
import databaseConnect from "./database.ts";
import session from "express-session";
import MongoStore from "connect-mongo";
import compression from "compression";
declare module "express-session" {
	interface SessionData {
		userId: string;
	}
}

const app = express();
const timeToLive = 1000 * 60 * 30; // 30 minutes

// 1. Compression middleware (should be one of the first middleware)
app.use(compression());

// 2. Static file serving middleware
app.use("/uploads", express.static("uploads"));

// 3. JSON parsing middleware
app.use(express.json());

// 4. URL-encoded form data parsing middleware
app.use(express.urlencoded({ extended: true }));

// 5. Session middleware (should be after parsing middleware)
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI || "",
		}),
		cookie: {
			maxAge: timeToLive,
			httpOnly: true,
			sameSite: "strict",
		},
	}),
);

// 6. Router middleware
app.use("/api", router);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//Database connection (should be before starting the server)
databaseConnect();

//Start the server
ViteExpress.listen(app, 3000, () =>
	console.log("Server is listening on http://localhost:3000/"),
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
