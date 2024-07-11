import { PrismaClient } from "@prisma/client";

class MyUserInfoService {
  async execute(user_ID: string) {
    const prismaClient = new PrismaClient();

    const user = prismaClient.user.findFirst({
      where: {
        id: user_ID,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        update_at: true,
      },
    });
    return user;
  }
}

export { MyUserInfoService };
