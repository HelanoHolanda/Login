import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";

interface UserLogin {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: UserLogin) {
    const prismaClient = new PrismaClient();
    // Validacoes
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return "Email nao cadastrado!";
    }
    // Verificar se as senhas sao as mesmas
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return "Senha incorreta!";
    }

    const token = sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "5d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
