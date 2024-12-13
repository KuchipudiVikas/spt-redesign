import { PayloadAction } from "@reduxjs/toolkit/src/createAction";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface SnackBarState {
  isOpen?: boolean;
  title: string;
  message: string;
  timeout?: number;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const initialState: SnackBarState = {
  isOpen: false,
  title: "Error Occurred",
  message: "Something went wrong",
  timeout: 5000,
  severity: undefined,
};

// snackbar
export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    openSnackBar: (state, action: PayloadAction<SnackBarState>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.timeout = action.payload.timeout;
    },
    closeSnackBar: (state) => {
      state.isOpen = false;
      state.title = "";
      state.message = "";
      state.severity = undefined;
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
