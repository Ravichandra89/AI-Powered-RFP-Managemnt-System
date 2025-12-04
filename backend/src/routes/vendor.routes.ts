import { Router } from "express";
import {
  createVendorController,
  getVendorListController,
  getVendorByIdController,
  deactivateVendorController,
} from "../controllers/vendor.controller";

const vendorRouter = Router();

vendorRouter.post("/", createVendorController);
vendorRouter.get("/", getVendorListController);
vendorRouter.get("/:vendorId", getVendorByIdController);
vendorRouter.patch("/:vendorId/deactivate", deactivateVendorController);

export default vendorRouter;
