import express from "express";
import subscribeEmail from "../controller/subscribe.controller.js";
import subscribeEmailMiddleware from "../middlewares/subscribeEmail.middleware.js";

const subscribeRoute = express.Router();

subscribeRoute.post("/subscribe", subscribeEmailMiddleware, subscribeEmail);

export default subscribeRoute;
