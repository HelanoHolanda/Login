import { Request, Response } from "express";
import { CreatUserService } from "../services/CreatUserService";
import { PrismaClient } from "@prisma/client";

class CreatUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body; // Pegar os dados do Body

    const creatUser = new CreatUserService(); // Instanciar o meu Service

    const prismaClient = new PrismaClient(); // Instanciar meu PrismaClient

    // Validacao
    if (!name) {
      return res.json("Digite seu Nome");
    }

    // Verificar se o email ja existe
    const emailExist = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      return res.json("Email ja existente!");
    }

    // Executar o meu service passando os dados do body
    const user = await creatUser.execute({ name, email, password });

    return res.json(user);
  }
}

export { CreatUserController };
