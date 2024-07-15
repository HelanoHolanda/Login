import { Request, Response } from "express";
import { Router } from "express";
import { CreatUserController } from "../controllers/CreatUserController";
import { AuthUserController } from "../controllers/AuthUserController";
import { MyUserInfoController } from "../controllers/MyUserInfoController";
import { IsAuthenticator } from "../middlewares/IsAuthenticator";
import passport from "passport";

const router = Router();

// rota google
router.get("/login", (req: Request, res: Response) => {
  res.send("<a href='/auth/google'> login com google </a>");
});
router.get("/logout", (req, res) => {
  req.logout({}, (err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.redirect("/login");
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/google");
  }
  res.json(`Hello ${req.user?.displayName}`);
});

//-- Rotas User --
router.post("/creatusers", new CreatUserController().handle);
router.post("/login", new AuthUserController().handle);
//-- Rotas privadas
router.get("/myacount", IsAuthenticator, new MyUserInfoController().handle);

export { router };
