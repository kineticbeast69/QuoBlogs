import express from "express";
import { AuthUser, LoginUser, Logout } from "../controller/auth.controller.js";
import LoginMiddlewares from "../middlewares/login.middleware.js";
import VerifyToken from "../middlewares/verifyToken.middleware.js";
const AuthRoute = express.Router();

AuthRoute.post("/login", LoginMiddlewares, LoginUser);
AuthRoute.get("/auth-user", VerifyToken, AuthUser);
AuthRoute.delete("/logout", Logout);
export default AuthRoute;
