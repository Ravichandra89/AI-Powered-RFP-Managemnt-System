import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { Rfp, ParsedRfpPayload } from "../../types/rfp.types";

import {
  parseRfpFromTextService,
  createRfpService,
  getAllRfpsService,
} from "../../services/rfp.service";

interface RfpState {
  rfps: Rfp[];
  parsedRfp: ParsedRfpPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: RfpState = {
  rfps: [],
  parsedRfp: null,
  loading: false,
  error: null,
};

// async Thunk

export const parseRfpFromText = createAsyncThunk(
  "rfp/parse",
  async (description: string, { rejectWithValue }) => {
    try {
      return await parseRfpFromTextService(description);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data?.message ?? "Parse failed");
      }
      return rejectWithValue("Parse failed");
    }
  }
);

// Create structured RFP
export const createRfp = createAsyncThunk(
  "rfp/create",
  async (payload: ParsedRfpPayload, { rejectWithValue }) => {
    try {
      return await createRfpService(payload);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Create RFP failed"
        );
      }
      return rejectWithValue("Create RFP failed");
    }
  }
);

// Fetch all saved RFPs
export const fetchRfps = createAsyncThunk(
  "rfp/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllRfpsService();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Failed to fetch RFPs"
        );
      }
      return rejectWithValue("Failed to fetch RFPs");
    }
  }
);

// Slice

const rfpSlice = createSlice({
  name: "rfp",
  initialState,
  reducers: {
    resetParsedRfp(state) {
      state.parsedRfp = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(parseRfpFromText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        parseRfpFromText.fulfilled,
        (state, action: PayloadAction<ParsedRfpPayload>) => {
          state.loading = false;
          state.parsedRfp = action.payload;
        }
      )
      .addCase(parseRfpFromText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create RFP
      .addCase(createRfp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRfp.fulfilled, (state, action: PayloadAction<Rfp>) => {
        state.loading = false;
        state.rfps.push(action.payload);
        state.parsedRfp = null;
      })
      .addCase(createRfp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All RFPs
      .addCase(fetchRfps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRfps.fulfilled, (state, action: PayloadAction<Rfp[]>) => {
        state.loading = false;
        state.rfps = action.payload;
      })
      .addCase(fetchRfps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetParsedRfp } = rfpSlice.actions;
export default rfpSlice.reducer;
