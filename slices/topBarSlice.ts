
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopBarState {
  isOpen: boolean;
}

const initialState: TopBarState = {
  isOpen: false,
};

export const topBarSlice = createSlice({
  name: 'topBar',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = topBarSlice.actions;

export default topBarSlice.reducer;
