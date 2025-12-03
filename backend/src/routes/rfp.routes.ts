import { Router } from "express";
import {
  parseRfpFromText,
  createRfpController,
  getAllRfps,
  getRfpController,
  sendRfpToSelectedVendors,
  compareRfpController,
} from "../controllers/rfp.controller";

const rfpRouter = Router();

rfpRouter.post("/parse", parseRfpFromText);
rfpRouter.post("/", createRfpController);
rfpRouter.get("/", getAllRfps);
rfpRouter.get("/:rfpId", getRfpController);
rfpRouter.post("/:rfpId/send", sendRfpToSelectedVendors);
rfpRouter.post("/:rfpId/compare", compareRfpController);

export default rfpRouter;
