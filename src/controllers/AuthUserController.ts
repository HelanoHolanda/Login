import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    // Pegar os Dados do Body
    const { email, password } = req.body;
    // Acionar meu servico

    const authUserService = new AuthUserService();
    // Usar a funcao do sevice

    const userService = await authUserService.execute({ email, password });

    // Retornar no meu front
    return res.status(200).json(userService);
  }
}

export { AuthUserController };
