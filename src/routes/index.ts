import { Router } from "express";
import * as userController from "../controllers/userController";
import * as loginController from "../controllers/loginController";
import userRoutes from "./userRoutes";
import contactRoutes from "../routes/contactRoutes";
import auth from "../middlewares/auth";

const router = Router();

router.post("/login", loginController.login);
router.post("/register", userController.createUser);

router.use(auth);

router.use("/users", userRoutes);
router.use("/contacts", contactRoutes);

export default router;
