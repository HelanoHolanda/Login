import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

interface User {
  name: string;
  email: string;
  password: string;
}

class CreatUserService {
  async execute({ name, email, password }: User) {
    const prismaClient = new PrismaClient();

    const passwordHash = await hash(password, 8);

    const creatUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return creatUser;
  }
}

export { CreatUserService };
