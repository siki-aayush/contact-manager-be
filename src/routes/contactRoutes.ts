import { Router } from "express";
import upload from "../config/multer";
import * as contactController from "../controllers/contactsController";

const router = Router();

router.get("/", contactController.getAllContact);
router.get("/:id", contactController.getContactById);
router.put(
  "/:id",
  upload.single("photograph"),
  contactController.updateContact
);
router.delete("/:id", contactController.deleteContact);
router.post("/", upload.single("photograph"), contactController.createContact);
router.post("/name", contactController.getContactByName);

export default router;
