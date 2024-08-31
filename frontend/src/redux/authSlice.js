// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    User: null,  // or any initial state
  },
  reducers: {
    // Define your reducers here
    setUser(state, action) {
      state.User = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
