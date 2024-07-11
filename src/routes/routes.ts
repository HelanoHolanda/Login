import { Router } from "express";
import { CreatUserController } from "../controllers/CreatUserController";
import { AuthUserController } from "../controllers/AuthUserController";
import { MyUserInfoController } from "../controllers/MyUserInfoController";
import { IsAuthenticator } from "../middlewares/IsAuthenticator";

const router = Router();

//-- Rotas User --
router.post("/creatusers", new CreatUserController().handle);
router.post("/api/authsession", new AuthUserController().handle);
//-- Rotas privadas
router.get("/myacount", IsAuthenticator, new MyUserInfoController().handle);

export { router };
