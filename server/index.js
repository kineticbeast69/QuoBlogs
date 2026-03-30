import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import requestIp from "request-ip";
import dbConnect from "./config/dbConnect.js";
// routes are here
import subscribeRoute from "./routes/subscribeEmail.route.js";
import AdminRoute from "./routes/admin.route.js";
import AuthorRoutes from "./routes/author.route.js";
import AuthRoute from "./routes/auth.routes.js";
import QuoRoutes from "./routes/quoblogs.route.js";

// dot env config
dotenv.config({ path: ".env.local" });

// instance of express
const app = express();

// security and global middlewares
app.use(helmet()); //helmet middleware
app.use(compression()); //compression middleware
app.use(requestIp.mw()); //request-ip middleware
app.use(express.json()); //json middleware
app.use(express.urlencoded({ extended: true })); //parser middleware
app.use(cookieParser()); //cookie middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //cors middleware

// connecting db and starting server
await dbConnect();
app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log(`Server Start Succesfully 🛜🛜🛜`);
});

// subscribe email route
app.use("/api", subscribeRoute);

// author routes
app.use("/api/author", AuthorRoutes);

// quoblog routes
app.use("/api/quoblogs", QuoRoutes);

// admin routes
app.use("/api/admin", AdminRoute);

// auth routes
app.use("/api/auth", AuthRoute);
