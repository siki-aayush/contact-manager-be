import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import logger from "./misc/logger";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import appRouter from "./routes/index";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.clear();
  logger.info(`Server is running on port ${PORT}`);
});
