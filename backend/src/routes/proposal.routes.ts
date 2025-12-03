import { Router } from "express";
import {
  createProposalFromEmailController,
  getProposalsForRfpController,
} from "../controllers/proposal.controller";

const proposalRouter = Router();

proposalRouter.post("/parse-email", createProposalFromEmailController);
proposalRouter.get("/:rfpId", getProposalsForRfpController);

export default proposalRouter;
