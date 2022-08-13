import { Router } from "express";
import * as userController from "../controllers/userController";
import * as loginController from "../controllers/loginController";
import * as tokenController from "../controllers/tokenController";
import userRoutes from "./userRoutes";
import contactRoutes from "../routes/contactRoutes";
import auth from "../middlewares/auth";

const router = Router();

router.post("/login", loginController.login);
router.post("/refresh", tokenController.generateToken);
router.post("/register", userController.createUser);

router.use(auth);

router.use("/users", userRoutes);
router.use("/contacts", contactRoutes);

export default router;
