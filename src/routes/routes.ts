import { Router } from "express";
import { CreatUserController } from "../controllers/CreatUserController";

const router = Router();

router.post("/creatusers", new CreatUserController().handle);

export { router };
