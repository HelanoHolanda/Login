import { MyUserInfoService } from "../services/MyUserInfoService";
import { Request, Response } from "express";
class MyUserInfoController {
  async handle(req: Request, res: Response) {
    const user_ID = req.user_id;

    const myUser = new MyUserInfoService();

    const user = await myUser.execute(user_ID);

    return res.json(user);
  }
}

export { MyUserInfoController };
