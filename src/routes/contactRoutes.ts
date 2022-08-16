import { Router } from "express";
import upload from "../config/multer";
import * as contactController from "../controllers/contactsController";

const router = Router();

router.post("/", contactController.getAllContact);
router.post(
  "/add",
  upload.single("photograph"),
  contactController.createContact
);
router.get("/:id", contactController.getContactById);
router.put(
  "/:id",
  upload.single("photograph"),
  contactController.updateContact
);
router.patch("/:id", contactController.updateContactFavourite);
router.delete("/:id", contactController.deleteContact);
router.post("/name", contactController.getContactByName);

export default router;
