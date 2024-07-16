import { json } from "express";
import express from "express";
import { router } from "./routes/routes";
import cors from "cors";
import "./auth";
import passport from "passport";
import session from "express-session";
require("dotenv").config();
const server = express();

server.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

server.use(express.json());
server.use(cors());
server.use(passport.initialize());
server.use(passport.session());
server.use(router);

server.listen(process.env.PORT, () => {
  console.log("server is running!!");
});
