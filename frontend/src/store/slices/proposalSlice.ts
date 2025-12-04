import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type {
  Proposal,
  ParseProposalPayload,
} from "../../types/proposal.types";

import {
  parseProposalFromEmailService,
  getProposalsByRfpIdService,
} from "../../services/proposal.service";

interface ProposalState {
  proposals: Proposal[];
  loading: boolean;
  error: string | null;
}

const initialState: ProposalState = {
  proposals: [],
  loading: false,
  error: null,
};

// ---------------------- ASYNC THUNKS ----------------------

export const parseProposalFromEmail = createAsyncThunk(
  "proposal/parseEmail",
  async (payload: ParseProposalPayload, { rejectWithValue }) => {
    try {
      const proposal = await parseProposalFromEmailService(payload);
      return proposal;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Failed to parse proposal"
        );
      }
      return rejectWithValue("Failed to parse proposal");
    }
  }
);

export const fetchProposalsByRfpId = createAsyncThunk(
  "proposal/fetchByRfp",
  async (rfpId: string, { rejectWithValue }) => {
    try {
      const proposals = await getProposalsByRfpIdService(rfpId);
      return proposals;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Failed to fetch proposals"
        );
      }
      return rejectWithValue("Failed to fetch proposals");
    }
  }
);

// ---------------------- SLICE ----------------------

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    clearProposals(state) {
      state.proposals = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Parse Email Proposal
      .addCase(parseProposalFromEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        parseProposalFromEmail.fulfilled,
        (state, action: PayloadAction<Proposal>) => {
          state.loading = false;
          state.proposals.push(action.payload);
        }
      )
      .addCase(parseProposalFromEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch proposals by RFP
      .addCase(fetchProposalsByRfpId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProposalsByRfpId.fulfilled,
        (state, action: PayloadAction<Proposal[]>) => {
          state.loading = false;
          state.proposals = action.payload;
        }
      )
      .addCase(fetchProposalsByRfpId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ---------------------- EXPORTS ----------------------

export const { clearProposals } = proposalSlice.actions;
export default proposalSlice.reducer;
