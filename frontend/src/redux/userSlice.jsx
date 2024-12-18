import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '', // Store user's email
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = userSlice.actions;
export default userSlice.reducer;
