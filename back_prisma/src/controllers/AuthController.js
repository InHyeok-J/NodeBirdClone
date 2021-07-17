import express from "express";
import * as AuthServices from "../services/AuthServices";
const Router = express.Router();

Router.post("/signup", AuthServices.SingUp);

export default Router;
