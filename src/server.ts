import { json } from "express";
import express from "express";
import { router } from "./routes/routes";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(3333, () => {
  console.log("server is running!");
});
