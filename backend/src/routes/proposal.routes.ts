import { Router } from "express";
import {
  createProposalFromEmailController,
  getProposalsForRfpController,
  getAllProposalsController,
} from "../controllers/proposal.controller";
import { getAllProposals } from "../services/proposal.service";

const proposalRouter = Router();

proposalRouter.post("/parse-email", createProposalFromEmailController);
proposalRouter.get("/:rfpId", getProposalsForRfpController);
proposalRouter.get("/", getAllProposalsController);

export default proposalRouter;
