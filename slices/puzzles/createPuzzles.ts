import { PayloadAction } from "@reduxjs/toolkit/src/createAction";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface ICreatePuzzleState {
  fD?: any;
  data?: any;
}

const initialState: ICreatePuzzleState = {
  fD: null,
  data: null,
};

// snackbar
export const createPuzzleState = createSlice({
  name: "createPuzzle",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ICreatePuzzleState>) {
      state.fD = action.payload.fD;
      state.data = action.payload.data;
    },
  },
});

export const { setData } = createPuzzleState.actions;

export default createPuzzleState.reducer;
