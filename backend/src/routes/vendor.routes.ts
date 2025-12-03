import { Router } from "express";
import {
  parseRfpFromText,
  createRfpController,
  getAllRfps,
  getRfpController,
  sendRfpToSelectedVendors,
  compareRfpController,
} from "../controllers/rfp.controller";

const vendorRouter = Router();

vendorRouter.post("/parse", parseRfpFromText);
vendorRouter.post("/", createRfpController);
vendorRouter.get("/", getAllRfps);
vendorRouter.get("/:rfpId", getRfpController);
vendorRouter.post("/:rfpId/send", sendRfpToSelectedVendors);
vendorRouter.post("/:rfpId/compare", compareRfpController);

export default vendorRouter;
