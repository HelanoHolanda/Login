import { Request, Response, NextFunction, RequestHandler } from "express";
import { verify } from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

function IsAuthenticator(req: Request, res: Response, next: NextFunction) {
  //Pegando token do usuario
  const getToken = req.headers.authorization;

  // validando o token
  if (!getToken) {
    return res.json("token invalido");
  }
  // Separando o token
  const token = getToken.split(" ")[1];
  // Usando o verify
  try {
    const { id } = verify(token, process.env.SECRET_KEY) as JwtPayload;
  } catch (error) {
    return res.status(401).json("Usuario nao autorizado!");
  }

  return next();
}

export { IsAuthenticator };
