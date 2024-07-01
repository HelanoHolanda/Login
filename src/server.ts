import { json } from "express";
import express from "express";

const server = express();

server.use(express.json());

server.listen(3333, () => {
  console.log("server is running@##!");
});
