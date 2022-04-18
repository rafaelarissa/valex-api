import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import cardRouter from "./routes/cardRouter.js";
import handleErrorsMiddleware from "./middlewares/handleErrors.js";

const app = express();
app.use(json());
app.use(cors());
app.use(cardRouter);
app.use(handleErrorsMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running on " + PORT);
});
