import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { Vendor, CreateVendorPayload } from "../../types/vendor.types";

import {
  createVendorService,
  getAllVendorsService,
  getVendorByIdService,
  deactivateVendorService,
} from "../../services/vendor.service";

interface VendorState {
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  loading: boolean;
  error: string | null;
}

const initialState: VendorState = {
  vendors: [],
  selectedVendor: null,
  loading: false,
  error: null,
};

// ---------------------- ASYNC THUNKS ----------------------

// Create Vendor
export const createVendor = createAsyncThunk(
  "vendor/create",
  async (payload: CreateVendorPayload, { rejectWithValue }) => {
    try {
      return await createVendorService(payload);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Failed to create vendor"
        );
      }
      return rejectWithValue("Failed to create vendor");
    }
  }
);

// Fetch Vendors
export const fetchVendors = createAsyncThunk(
  "vendor/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllVendorsService();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Failed to fetch vendors"
        );
      }
      return rejectWithValue("Failed to fetch vendors");
    }
  }
);

// Fetch Vendor by ID
export const fetchVendorById = createAsyncThunk(
  "vendor/fetchById",
  async (vendorId: string, { rejectWithValue }) => {
    try {
      return await getVendorByIdService(vendorId);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Failed to fetch vendor"
        );
      }
      return rejectWithValue("Failed to fetch vendor");
    }
  }
);

// Deactivate Vendor
export const deactivateVendor = createAsyncThunk(
  "vendor/deactivate",
  async (vendorId: string, { rejectWithValue }) => {
    try {
      return await deactivateVendorService(vendorId);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message ?? "Failed to deactivate vendor"
        );
      }
      return rejectWithValue("Failed to deactivate vendor");
    }
  }
);

// Slice

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    resetSelectedVendor(state) {
      state.selectedVendor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Vendor
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createVendor.fulfilled,
        (state, action: PayloadAction<Vendor>) => {
          state.loading = false;
          state.vendors.push(action.payload);
        }
      )
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Vendors
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVendors.fulfilled,
        (state, action: PayloadAction<Vendor[]>) => {
          state.loading = false;
          state.vendors = action.payload;
        }
      )
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Vendor By ID
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVendorById.fulfilled,
        (state, action: PayloadAction<Vendor>) => {
          state.loading = false;
          state.selectedVendor = action.payload;
        }
      )
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Deactivate Vendor
      .addCase(deactivateVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deactivateVendor.fulfilled,
        (state, action: PayloadAction<Vendor>) => {
          state.loading = false;
          state.vendors = state.vendors.map((v) =>
            v._id === action.payload._id ? action.payload : v
          );
        }
      )
      .addCase(deactivateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exports

export const { resetSelectedVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
